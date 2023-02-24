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

    console.log(event.public_url);

    return (
        <div className="card card-margin">
            <div className="widget-49">
                <div className="widget-49-title-wrapper">
                    <div className="widget-49-date-primary">
                        <span className="widget-49-date-day">{startDate.getDate()}</span>
                        <span className="widget-49-date-month">{months[startDate.getMonth()]}</span>
                        <span className="widget-49-pro-title">{startDate.getFullYear()}</span>
                    </div>
                    <div className="widget-49-meeting-info">
                        <span className="widget-49-pro-title">{event.name}</span>
                        <span className="widget-49-pro-title">{event.event_type}</span>
                        <span className="widget-49-pro-title"><button className="seeDetails" onClick={() => { onShowDetails(); setEventId(event.id) }}>See Details</button></span>
                    </div>
                    <div className='test'></div>
                    <span className="widget-49-meeting-time">{startDate.getHours()}:{startDate.getMinutes() === 0
                        ? '00' : startDate.getMinutes()} {startDate.getHours() < 12 ? 'AM' : 'PM'} - {endDate.getHours()}:{endDate.getMinutes() === 0 ? '00'
                            : endDate.getMinutes()} {endDate.getHours() < 12 ? 'AM' : 'PM'}</span>
                </div>
            </div>
        </div>

    )
}


export default Event;