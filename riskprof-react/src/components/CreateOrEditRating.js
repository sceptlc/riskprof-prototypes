import React from 'react';
import { Button } from 'react-bootstrap';
import Modal from "react-bootstrap/Modal";


class CreateOrEditRating extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            isNewRating: true,
            rating: null
        }
    }

    show = (rating = null, parent = null) => {
        var isNewRating = rating === null;
        rating = rating || {
            id: -1,
            parent,
            parentId: parent?.id,
            title: "",
            key: ""
        };

        this.setState({
            isOpen: true,
            isNewRating,
            rating,
            children: []
        });
    }

    hide = () => {
        this.setState({ isOpen: false });
    }

    onHide = () => {
        this.hide();
    }

    handleInputChange = (event) => {
        const target = event.target;
        var rating = this.state.rating;
        rating[target.name] = target.value;
        this.setState({ rating });
    }

    save = () => {
        this.props.onSave(this.state.rating);
        this.hide();
    }

    render() {
        return (
            <Modal show={this.state.isOpen} onHide={this.onHide}>
                <Modal.Header>
                    <Modal.Title>{this.state.isNewRating ? 'Новый рейтинг' : 'Редактировать рейтинг'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input onChange={this.handleInputChange} 
                               value={this.state.rating?.title || ""} 
                               type="text" className="form-control" name="title" id="title"/>
                        <label htmlFor="key">Key</label>
                        <input onChange={this.handleInputChange} 
                               value={this.state.rating?.key || ""}
                               type="text" className="form-control" name="key" id="key"/>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.save}>Сохранить</Button>
                </Modal.Footer>
            </Modal>
        )
    }

}

export default CreateOrEditRating;
