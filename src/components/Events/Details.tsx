import { useState, useEffect } from "react";
import DetailsModal from "./DetailsModal";
import "../../assets/css/Details.css";
import { TEvent } from "../../types/Events.types";
import RelatedEvent from "./RelatedEvents";
import { useEventId } from "../../context/eventId-context";
import DetailsTime from "./DetailsModal/DetailsTime";
import DetailsSpeaker from "./DetailsModal/DetailsSpeakers";

type DetailsProps = {
    login: Boolean,
    onHideDetails: any,
    allEvents: TEvent[],
    onShowDetails: any,
};

// displays the details of each event
const Details: React.FC<DetailsProps> = (props) => {
    const [eventDetail, setEventDetail] = useState<TEvent>();
    const [error, setError] = useState([]);
    const { eventId, setEventId } = useEventId();

    // fetches data based on the eventId they want to view
    useEffect(() => {
        fetch(`https://api.hackthenorth.com/v3/events/${eventId}`)
            .then(response => response.json())
            .then((res) => { setEventDetail(res); })
            .catch(err => setError(err));
    }, [eventId])

    return (
        <DetailsModal onClose={props.onHideDetails}>
            <div className="all-information">
                <div>
                    <span>{eventDetail?.name}</span>
                    <DetailsTime startTime={eventDetail?.start_time} endTime={eventDetail?.end_time}></DetailsTime>
                    <div className="event_type">{eventDetail?.event_type}</div>

                    <div className="description">{eventDetail?.description}</div>
                    <div>{props.login ? "" : "Follow the link below to the event!"}</div>
                    <div><a href={props.login ? (eventDetail?.public_url) : (eventDetail?.private_url)}>{props.login ? (eventDetail?.public_url) : (eventDetail?.private_url)}</a></div>

                    <div className="related-events">
                        <div>Other Related Events: </div>
                        {eventDetail!?.related_events.length > 0
                            ? eventDetail?.related_events.map((rid) =>
                                <RelatedEvent allEvents={props.allEvents} rid={rid} onShowDetails={props.onShowDetails} onHideDetails={props.onHideDetails}></RelatedEvent>)
                            : (<div />)}
                    </div>
                </div>

                <DetailsSpeaker eventSpeakers={eventDetail?.speakers}></DetailsSpeaker>
            </div>

            <div className="closeButton"><button onClick={props.onHideDetails}>Close</button></div>
        </DetailsModal>
    );
};

export default Details;