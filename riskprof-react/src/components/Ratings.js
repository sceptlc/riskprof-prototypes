import React, { Fragment } from 'react';
import RatingStore from '../stores/RatingStore';
import * as RatingActions from '../actions/RatingActions';
import '../styles/Ratings.scss';
import CreateOrEditRating from './CreateOrEditRating';


class Ratings extends React.Component {

    constructor () {
        super();

        this.state = {
            ratings: [],
            activeRating: null,
            status: "Root"
        };

        this.modalRef = React.createRef();
    }

    componentDidMount () {
        RatingStore.on("change", () => {
            this.setState({
                ratings: RatingStore.getRatingChilden(this.state.activeRating)
            })
        });

        RatingActions.getRootRatings();
    }

    loadRating(rating, event) {
        this.setState({
            activeRating: rating, 
            status: rating.title
        });
        RatingActions.getRatingChildren(rating);
        // event.stopPropagation();
    }

    goUp() {
        var parent = this.state.activeRating?.parent;

        this.setState({
            activeRating: parent, 
            status: parent?.title || "Root"
        });
        if (parent)
            RatingActions.getRatingChildren(parent.id)
        else 
            RatingActions.getRootRatings();

    }

    render() {
        return (
            <Fragment>
                <div className="col-12 mt-4">
                    <h2>{ this.state.status }</h2>
                </div>
                <div className="col-12 mt-1">
                    <button className="btn btn-outline-primary"
                        onClick={this.goUp.bind(this)}>
                        Вверх
                    </button>
                    <button className="btn btn-outline-primary ml-2"
                            onClick={ () => { this.modalRef.current.show() } }>
                            Создать новый
                    </button>
                </div>
                <div className="col-12 mt-2">
                    <div className="list-group">
                        { this.state.ratings.map(rating => 
                            (
                                <li key={ rating.id }
                                    className="list-group-item rating-li"
                                    onClick={ (e) => this.loadRating(rating, e) }>
                                    { rating.title }
                                </li>
                            )
                        )}
                    </div>
                </div>
                <CreateOrEditRating ref={this.modalRef} />
            </Fragment>
        );
    }
}

export default Ratings;
