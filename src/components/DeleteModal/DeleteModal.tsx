import React from 'react';
import ReactDOM from 'react-dom';
import { Button, ComposedModal, ModalBody, ModalHeader, ModalFooter } from 'carbon-components-react';
import { TrashCan32 } from '@carbon/icons-react';

interface IDeleteModalProps {
    handleCloseDeleteModal: (confirmDelete: boolean) => void;
    isOpen: boolean;
    numRows: number;
}

const DeleteModal: React.FC<IDeleteModalProps> = (props: IDeleteModalProps) => {
    return (
        <>
            {typeof document === 'undefined'
                ? null
                : ReactDOM.createPortal(
                    <ComposedModal open={props.isOpen} onClose={() => props.handleCloseDeleteModal(false)}>
                        <ModalHeader label="Confirm Delete" />
                        <ModalBody aria-label="delete confirmation" hasScrollingContent>
                            <h2>
                                Are you sure you want to delete {props.numRows} row(s)?
                            </h2>
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                kind="secondary"
                                onClick={() => { props.handleCloseDeleteModal(false); }}>
                                Cancel
                            </Button>
                            <Button
                                kind="danger"
                                renderIcon={TrashCan32}
                                iconDescription="Delete"
                                onClick={() => { props.handleCloseDeleteModal(true); }}>
                                Delete
                            </Button>
                        </ModalFooter>
                    </ComposedModal>,
                    document.body
                )}
        </>
    );
}


export default DeleteModal