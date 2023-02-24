import React from "react";
import { TEvent } from "../../types/Events.types";

type DetailsTimeProps = {
    startTime: number | undefined,
    endTime: number | undefined,
}

const DetailsTime: React.FC<DetailsTimeProps> = (props) => {
    const startDate = new Date(props.startTime!);
    const endDate = new Date(props.endTime!);
    return (
        <div>{startDate.getHours()}:{startDate.getMinutes() === 0
            ? '00'
            : startDate.getMinutes()} {startDate.getHours() < 12 ? 'AM' : 'PM'} - {endDate.getHours()}:{endDate.getMinutes() === 0 ? '00'
                : endDate.getMinutes()} {endDate.getHours() < 12 ? 'AM' : 'PM'}</div>
    );
}

export default DetailsTime;