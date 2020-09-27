import { EventEmitter } from 'events';
import dispatcher from '../dispatcher';


class RatingStore extends EventEmitter {
    constructor () {
        super();

        // { parentId => [ children ]}
        // {'root' => [ root ratings ]}
        this.ratings = {
            // {
            //     id: 2, 
            //     parentId: null,
            //     title: "This is rating",
            //     key: "my-key",
            //     children: [],
            //     parent: null
            // }
        }
    }

    handleActions(action) {
        console.log("Received an action!");

        switch (action.type) {
            case "RATING_CREATED": 
                this.createRating(action.rating);
                break;
            case "RATING_DELETED":
                this.deleteRating(action.rating);
                break;
            case "RATING_UPDATED":
                this.updateRating(action.rating);
                break;
            case "SET_RATING_CHILDREN":
                this.setRatingChildren(action.rating, action.children);
                break;
            case "SET_ROOT_RATINGS":
                this.setRootRatings(action.ratings);
                break;
            default: 
                break;
        }
    }

    createRating(rating) {

    }

    deleteRating(rating) {

    }

    updateRating(rating) {
        this.emit("change");
    }

    setRatingChildren(rating, children) {
        this.ratings[rating.id] = [...children];
        this.emit("change");
    }

    getRatingChilden(rating) {
        return this.ratings[rating?.id || "root"];
    }

    setRootRatings(ratings) {
        this.ratings['root'] = [...ratings];
        this.emit("change");
    }
    
    getRootRatings() {
        return this.ratings["root"];
    }
}


const ratingStore = new RatingStore();
dispatcher.register(ratingStore.handleActions.bind(ratingStore));

export default ratingStore;
