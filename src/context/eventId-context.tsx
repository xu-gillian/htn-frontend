import React, { useState } from 'react';

// EventId-context: manages the eventId that the user wants to view
type EventIdType = {
    eventId: number;
    setEventId: React.Dispatch<React.SetStateAction<number>>;
};

type eventIdProviderProps = {
    children: any;
}

const Context = React.createContext<EventIdType>({} as EventIdType);

export const EventIdProvider: React.FC<eventIdProviderProps> = (props) => {
    const [eventId, setEventId] = useState(-1);

    return (
        <Context.Provider value={{ eventId, setEventId }}>
            {props.children}
        </Context.Provider>
    );
};

export default EventIdProvider;

export const useEventId = () => React.useContext(Context);