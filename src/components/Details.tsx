import { useState, useEffect } from "react";
import DetailsModal from "./DetailsModal";
import classes from "../css/Details.module.css";
import { TEvent } from "../types/Events.types";
import RelatedEvent from "./RelatedEvents";
import { useEventId } from "../context/eventId-context";

type DetailsProps = {
    login: Boolean,
    onHideDetails: any,
    allEvents: TEvent[],
    onShowDetails: any,
};

const Details: React.FC<DetailsProps> = (props) => {
    const [eventDetail, setEventDetail] = useState<TEvent>();
    const [error, setError] = useState([]);
    const { eventId, setEventId } = useEventId();

    useEffect(() => {
        fetch(`https://api.hackthenorth.com/v3/events/${eventId}`)
            .then(response => response.json())
            .then((res) => { setEventDetail(res); })
            .catch(err => setError(err));
    }, [eventId])

    return (
        <DetailsModal onClose={props.onHideDetails}>
            <div className={classes.total}>
                <span>{eventDetail?.name}</span>

            </div>
            <div className={classes.event_type}>{eventDetail?.event_type}</div>
            <div className={classes.description}>{eventDetail?.description}</div>

            <div className={classes.information}>
                <div>Guest Speaker{eventDetail!?.speakers.length === 1 ? "" : "s"}:</div>
                {eventDetail!?.speakers.length > 0 ? eventDetail?.speakers.map((speaker) => <span>{speaker.name}</span>) : (<div />)}
            </div>

            <div>{props.login ? "" : "Follow the link below to the event!"}</div>
            <div><a href={props.login ? (eventDetail?.public_url) : (eventDetail?.private_url)}>{props.login ? (eventDetail?.public_url) : (eventDetail?.private_url)}</a></div>

            <div className={classes.information}>
                <div>Other Related Events : </div>
                {eventDetail!?.related_events.length > 0
                    ? eventDetail?.related_events.map((rid) =>
                        <RelatedEvent allEvents={props.allEvents} rid={rid} onShowDetails={props.onShowDetails} onHideDetails={props.onHideDetails}></RelatedEvent>)
                    : (<div />)}
            </div>

            <div className={classes.closeButton}><button onClick={props.onHideDetails}>Close</button></div>
        </DetailsModal>
    );
};

export default Details;