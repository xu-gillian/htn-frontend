import React, { Fragment, MouseEvent } from 'react';
import ReactDOM from 'react-dom';
import '../../assets/css/DetailsModal.css';

type BackdropProps = {
    onClose: any;
}

type ModalOverlayProps = {
    children: any;
}
type DetailsModalProps = {
    onClose: any;
    children: any;
};


const Backdrop: React.FC<BackdropProps> = (props) => {
    return (
        <div className="backdrop" onClick={props.onClose}></div>
    );
}

const ModalOverlay: React.FC<ModalOverlayProps> = (props) => {
    return (
        <div className="modal-wrapper">
            <div className="modal">
                {props.children}
            </div>
        </div>

    );
}

const portalElement = document.getElementById('overlays')!;


const DetailsModal: React.FC<DetailsModalProps> = (props) => {
    return (
        <Fragment>
            {ReactDOM.createPortal(<Backdrop onClose={props.onClose} ></Backdrop>, portalElement)}
            {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElement)}
        </Fragment>
    )
}

export default DetailsModal;