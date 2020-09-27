import dispatcher from '../dispatcher';

export function createRating(rating) {
    dispatcher.dispatch({
        type: 'CREATE_RATING',
        rating
    });
}

export function deleteRating(rating) {
    dispatcher.dispatch({
        type: 'DELETE_RATING',
        rating
    });
}

export function updateRating(rating) {
    dispatcher.dispatch({
        type: 'UPDATE_RATING',
        rating
    });
}

export function getRatingChildren(rating) {

    fetch("http://rating.141.riskprof.ru/ajax/list/rating?parentId=" + rating.id)
        .then(response => response.json())
        .then(json => {
            console.log(json);
            var children = json.map(item => {
                return {
                    id: item['Id'],
                    parent: rating,
                    parentId: item['ParentId'],
                    title: item['Title'],
                    key: item['Key']
                }
            });

            dispatcher.dispatch({
                type: 'SET_RATING_CHILDREN',
                rating,
                children
            });
        });
}



export function getRootRatings() {

    fetch("http://rating.141.riskprof.ru/ajax/list/rating?isRoot=true")
        .then(response => response.json())
        .then(json => {
            console.log(json);
            var ratings = json.map(item => {
                return {
                    id: item['Id'],
                    parent: null,
                    parentId: item['ParentId'],
                    title: item['Title'],
                    key: item['Key']
                }
            });

            dispatcher.dispatch({
                type: 'SET_ROOT_RATINGS',
                ratings
            });
        });
}
