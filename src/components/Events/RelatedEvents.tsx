import React, { useEffect } from 'react';
import { TEvent } from '../../types/Events.types';
import { useEventId } from '../../context/eventId-context';

type RelatedEventProps = {
    allEvents: any;
    rid: number;
    onShowDetails: any;
    onHideDetails: any;
}

const RelatedEvent: React.FC<RelatedEventProps> = (props) => {
    const { eventId, setEventId } = useEventId();
    const event = props.allEvents.find((ev: TEvent) => ev.id === props.rid);

    useEffect(() => {

    }, [eventId])

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