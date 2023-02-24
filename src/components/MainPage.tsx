import React, { useState, useEffect } from 'react';
import Loader from './Loader';
import Event from './Events/Event';
import '../assets/css/MainPage.css';
import { TEvent } from '../types/Events.types';
import Details from './Events/Details';
import { EventIdProvider } from '../context/eventId-context';
import NavBar from './NavBar';

const DisplayEvents: React.FC = () => {
    const [events, setEvents] = useState([]);
    const [displayEvents, setDisplayEvents] = useState([]);
    const [error, setError] = useState([]);
    const [loggedin, setLoggedin] = useState(true); // have to set to true initially
    const [loginText, setLoginText] = useState("Login");
    const [showEventDetails, setShowEventDetails] = useState(false);

    useEffect(() => {
        fetch('https://api.hackthenorth.com/v3/events')
            .then(response => response.json())
            .then((res) => {
                setEvents(res);
                setDisplayEvents(res.filter((ev: TEvent) => ev.permission === "public"));
            })
            .catch(err => setError(err));
    }, []) // check how many times this reloads

    // handle the login stuff here and the login page -> when login setPublicEvents
    const loginHandler = () => {
        setLoggedin(!loggedin);
        if (loggedin) {
            setDisplayEvents(events);
            setLoginText("Logout");
        } else {
            setDisplayEvents(events.filter((ev: TEvent) => ev.permission === "public"));
            setLoginText("Login");
        }
    }

    const showEventDetailsHandler = () => {
        setShowEventDetails(true);
    }

    const hideEventDetailsHandler = () => {
        setShowEventDetails(false);
    }

    return (
        <EventIdProvider>
            {showEventDetails && <Details login={loggedin} onHideDetails={hideEventDetailsHandler} allEvents={events} onShowDetails={showEventDetailsHandler}></Details>}
            <NavBar loginHandler={loginHandler} loginText={loginText}></NavBar>
            <div className="wrapper">

                <h1>HACK THE NORTH</h1>
            </div>
            <header>Events Page</header>
            {displayEvents.length > 0 ? displayEvents.map((individualEvent: TEvent) => <Event event={individualEvent} login={loggedin} onShowDetails={showEventDetailsHandler} />) : (<Loader />)}
        </EventIdProvider>
    );
}


export default DisplayEvents;