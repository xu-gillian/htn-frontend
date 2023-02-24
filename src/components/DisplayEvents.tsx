import React, { useState, useEffect } from 'react';
import Loader from './Loader';
import Event from './Event';
import '../css/DisplayEvents.css';
import { TEvent } from '../types/Events.types';
import Details from './Details';
import { EventIdProvider } from '../context/eventId-context';

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
    const handlerLogin = () => {
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
            <div className="wrapper">
                <button className="login" onClick={handlerLogin}>{loginText}</button>
                <main className="page-main">
                    <div>
                        <h1>HACK THE NORTH</h1>
                    </div>
                </main>
            </div>
            <header>Events Page</header>
            {displayEvents.length > 0 ? displayEvents.map((individualEvent: TEvent) => <Event event={individualEvent} login={loggedin} onShowDetails={showEventDetailsHandler} />) : (<Loader />)}

        </EventIdProvider>
    );
}


export default DisplayEvents;