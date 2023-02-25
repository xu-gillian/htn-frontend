import React, { useEffect } from 'react';
import { TEvent } from '../../types/Events.types';
import { useEventId } from '../../context/eventId-context';

type RelatedEventProps = {
    allEvents: any;
    rid: number;
    onShowDetails: any;
    onHideDetails: any;
}

// displays all related events as a button
// onClick - change the information that is displayed on the modal
const RelatedEvent: React.FC<RelatedEventProps> = (props) => {
    const { eventId, setEventId } = useEventId();
    const event = props.allEvents.find((ev: TEvent) => ev.id === props.rid);

    return (
        <div><button onClick={() => {
            setEventId(props.rid);
            props.onShowDetails();
        }}>
            {event?.name}
        </button></div>
    );
}

export default RelatedEvent;