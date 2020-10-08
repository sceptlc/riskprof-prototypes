
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
    },

    createRating({ commit, state }, rating) {
        fetch(state.host + "/create/rating" +
            "?parentId=" + rating.ParentId.toString() +
            "&title=" + rating.Title +
            "&key=" + rating.Key,
            { method: 'POST' }
        )
        .then(response => {
            console.log("response: ", response);
            // API doesnt return id of new rating!!
            if (response.status === 200) {
                commit("CREATE_RATING", rating);
            }
        });
    },

    updateRating({ commit, state }, rating) {
        fetch(state.host + "/update/rating" +
            "?id=" + rating.Id.toString() +
            "&parentId=" + rating.ParentId.toString() +
            "&title=" + rating.Title +
            "&key=" + rating.Key,
            { method: 'POST', mode: 'no-cors' }
        )
        .then(response => {
            console.log("response: ", response);
            if (response.status === 200) {
                commit("UPDATE_RATING", rating);
            }
        });
    },

     deleteRating({ commit, state }, idToDelete) {
        fetch(state.host + "/delete/rating?id=" + idToDelete,
            { method: 'POST' }
        )
        .then(response => {
            console.log("response: ", response);
            if (response.status === 200) {
                commit("DELETE_RATING", idToDelete);
            }
        });
    }
    

}