import React from 'react';
import { TEvent } from '../../types/Events.types';
import "../../assets/css/Events.css";
import { useEventId } from '../../context/eventId-context';

type Props = {
    event: TEvent,
    login: Boolean,
    onShowDetails: any
}

const Event: React.FC<Props> = ({ event, login, onShowDetails }) => {

    const { eventId, setEventId } = useEventId();
    const startDate = new Date(event.start_time);
    const endDate = new Date(event.end_time);
    const months: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    return (
        <div className="card card-margin">
            <div className="date-wrapper">
                <a className="date">{startDate.getDate()}</a>
                <a className="date">{months[startDate.getMonth()]}</a>
            </div>
            <div className="information-wrapper">
                <a className="information-name">{event.name}</a>
                <a className="information-type">{event.event_type}</a>
                <a ><button className="seeDetails" onClick={() => { onShowDetails(); setEventId(event.id) }}>See Details</button></a>

            </div>
            <div className="event-time">{startDate.getHours()}:{startDate.getMinutes() === 0
                ? '00'
                : startDate.getMinutes()} {startDate.getHours() < 12 ? 'AM' : 'PM'} - {endDate.getHours()}:{endDate.getMinutes() === 0 ? '00'
                    : endDate.getMinutes()} {endDate.getHours() < 12 ? 'AM' : 'PM'}
            </div>
        </div>

    )
}

export default Event;