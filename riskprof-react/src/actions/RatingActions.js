import dispatcher from '../dispatcher';

export function createRating(rating) {
    fetch("http://rating.141.riskprof.ru/ajax/create/rating" +
        "?parentId=" + rating.parentId.toString() +
        "&title=" + rating.title +
        "&key=" + rating.key,
        { method: 'POST' }
    )
        .then(response => {
            console.log("response: ", response);
            if (response.status === 200) {
                dispatcher.dispatch({
                    type: 'RATING_CREATED',
                    rating
                });
            }
        });
}


export function deleteRating(rating) {
    fetch("http://rating.141.riskprof.ru/ajax/delete/rating?id=" + rating.id,
        { method: 'POST' }
    )
        .then(response => {
            console.log("response: ", response);
            if (response.status === 200) {
                dispatcher.dispatch({
                    type: 'RATING_DELETED',
                    rating
                });
            }
        });
}


export function updateRating(rating) {
    fetch("http://rating.141.riskprof.ru/ajax/update/rating" +
        "?id=" + rating.id.toString() +
        "&parentId=" + rating.parentId.toString() +
        "&title=" + rating.title +
        "&key=" + rating.key,
        { method: 'POST' }
    )
        .then(response => response.json())
        .then(json => {
            console.log(json);

            dispatcher.dispatch({
                type: 'RATING_UPDATED',
                rating
            });
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
