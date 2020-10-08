
export default {
    getRootRatings({ commit, state }) {
        fetch(state.host + '/list/rating?isroot=1')
            .then(response => response.json())
            .then((ratings) => {
                var rootRatings = ratings
                    .filter(r => r.ParentId === null)
                    .map(r => {
                        r['parent'] = null;
                        return r;
                    });

                console.log("Response: ", rootRatings);
                commit("GET_ROOT_RATINGS", rootRatings);
            })
            .catch((error) => {
                console.log(error.statusText)
            });
    },

    getRatingChildren({ commit, state }, rating) {
        fetch(state.host + "/list/rating?parentId=" + rating.Id)
            .then(response => response.json())
            .then(ratings => {
                var children = ratings.map(r => {
                    r['parent'] = rating;
                    return r;
                });
                console.log(children);
                commit("GET_RATING_CHILDREN", children);
            });
    }

}