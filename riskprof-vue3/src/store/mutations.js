export default {
    GET_ROOT_RATINGS (state, ratings) {
        state.ratings = ratings;
    },

    GET_RATING_CHILDREN (state, ratings) {
        state.ratings = ratings;
    },

    CREATE_RATING (state, createdRating) {
        state.ratings = [...state.ratings, createdRating];
    },
    
    UPDATE_RATING (state, ratingToUpdate) {
        state.ratings = state.ratings.map(r => {
            return (r.Id === ratingToUpdate.Id ? ratingToUpdate : r);
        });
    },

    DELETE_RATING (state, idToDelete) {
        state.ratings = state.ratings.filter(r => r.Id !== idToDelete);
    }
    

};