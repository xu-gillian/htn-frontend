import React from "react";
import { TSpeaker } from "../../../types/Events.types";
import '../../../assets/css/DetailSpeaker.css';

type DetailsSpeakerType = {
    eventSpeakers: TSpeaker[] | undefined,
}

const DetailsSpeaker: React.FC<DetailsSpeakerType> = (props) => {
    return (
        <div className="container">
            <div className="speaker-image"></div>

            {(props.eventSpeakers)!?.length == 0
                ? <div></div>
                : <div className="speakers">
                    <div>Guest Speaker{(props.eventSpeakers)!?.length === 1 ? "" : "s"}:</div>
                    {(props.eventSpeakers)!?.length > 0 ? props.eventSpeakers!.map((speaker) => <span>{speaker.name}</span>) : (<div />)}
                </div>
            }

        </div>
    );
}

export default DetailsSpeaker;