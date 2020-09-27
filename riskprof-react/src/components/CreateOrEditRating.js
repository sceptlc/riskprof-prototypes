import React from 'react';
import Modal from "react-bootstrap/Modal";


class CreateOrEditRating extends React.Component {

    constructor (props) { 
        super(props);

        this.state = {
            isOpen: false
        }
    }

    show = () => {
        this.setState({ isOpen: true });
    }

    hide = () => {
        this.setState({ isOpen: false });
    }

    onHide = () => {
        this.hide();
    }

    render() {
        return (
            <Modal show={this.state.isOpen} onHide={this.onHide}>
                <Modal.Header>
                    <Modal.Title>Новый рейинг</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input/>
                </Modal.Body>
                <Modal.Footer>
                    <button onClick={this.hide}>Cancel</button>
                    <button>Save</button>
                </Modal.Footer>
            </Modal>
        )
    }

}

export default CreateOrEditRating;
