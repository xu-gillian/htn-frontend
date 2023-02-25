import React, { useState, useEffect } from 'react';
import Loader from './Loader';
import Event from './Events/Event';
import '../assets/css/MainPage.css';
import { TEvent } from '../types/Events.types';
import Details from './Events/Details';
import { EventIdProvider } from '../context/eventId-context';
import NavBar from './NavBar';
import LoginStateProvider from '../context/loginState-context';

const DisplayEvents: React.FC = () => {
    const [events, setEvents] = useState([]);
    const [displayEvents, setDisplayEvents] = useState([]);
    const [error, setError] = useState([]);
    const [loggedin, setLoggedin] = useState(true); // have to set to true initially
    const [showEventDetails, setShowEventDetails] = useState(false);

    // fetch all event data and store it into events 
    useEffect(() => {
        fetch('https://api.hackthenorth.com/v3/events')
            .then(response => response.json())
            .then((res) => {
                setEvents(res);
                setDisplayEvents(res.filter((ev: TEvent) => ev.permission === "public"));
            })
            .catch(err => setError(err));
    }, [])

    // toggles the modal display for details on each event
    const showEventDetailsHandler = () => {
        setShowEventDetails(true);
    }
    const hideEventDetailsHandler = () => {
        setShowEventDetails(false);
    }

    return (
        <EventIdProvider>
            <LoginStateProvider>
                {showEventDetails && <Details login={loggedin} onHideDetails={hideEventDetailsHandler} allEvents={events} onShowDetails={showEventDetailsHandler}></Details>}
                <NavBar allEvents={events} setDisplayEvents={setDisplayEvents}></NavBar>
                <div className="wrapper" >
                    <a className="event-title">TECH</a>
                    <a className="event-title">CONFERENCE</a>
                    <p className="event-date">SOME DATES</p>
                    <p>Event description :{')'}</p>
                </div>
                <div className="title">Events Page</div>
                <div>
                    {displayEvents.length > 0 ? displayEvents.map((individualEvent: TEvent) => <Event event={individualEvent} login={loggedin} onShowDetails={showEventDetailsHandler} />) : (<Loader />)}
                </div>
            </LoginStateProvider>
        </EventIdProvider>
    );
}


export default DisplayEvents;