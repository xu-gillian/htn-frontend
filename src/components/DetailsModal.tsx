import React, { Fragment, MouseEvent } from 'react';
import ReactDOM from 'react-dom';
import '../css/DetailsModal.css';

type ModalOverlayProps = {
    children: any;
}
type DetailsModalProps = {
    onClose: any;
    children: any;
};


const Backdrop: React.FC = () => {
    return (
        <div className="backdrop"></div>
    );
}

const ModalOverlay: React.FC<ModalOverlayProps> = (props) => {
    return (
        <div className="modal">
            <div className="content">{props.children}</div>
        </div>
    );
}

const portalElement = document.getElementById('overlays')!;


const DetailsModal: React.FC<DetailsModalProps> = (props, onClose) => {
    return (
        <Fragment>
            {ReactDOM.createPortal(<Backdrop ></Backdrop>, portalElement)}
            {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElement)}
        </Fragment>
    )
}

export default DetailsModal;