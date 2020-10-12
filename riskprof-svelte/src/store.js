import { writable } from 'svelte/store'

const host = "http://rating.141.riskprof.ru/ajax/";


function createRatingStore(initial) {

    const store = writable(initial)

    store.getRatings = async (parent = null) => {
        store.set([]);

        const url = new URL(host + 'list/rating');
        const params = (parent === null) ? 
            { isRoot: true } : 
            { parentId: parent.id };
        url.search = new URLSearchParams(params).toString();

        fetch(url)
            .then(response => response.json())
            .then(json => {
                console.log("Ratings: ", json);
        
                var ratings = json.map(item => {
                    return {
                        id: item['Id'],
                        parent,
                        parentId: item['ParentId'],
                        title: item['Title'],
                        key: item['Key']
                    }
                });

                store.set(ratings);
            });
    }

    store.updateRating = async (rating) => {
        const url = new URL(host + 'update/rating');
        const method = "POST";
        const body = {};
        const params = { 
            id: rating.id,
            parentId: rating.parentId,
            title: rating.title,
            key: rating.key
        };
        url.search = new URLSearchParams(params).toString();

        fetch(url, { method, body })
            .then(response => {
                if (response.ok) {
                    store.update(ratings => {
                        ratings.map(r => r.id === rating.id ? rating : r);
                        return ratings;
                    });
                    console.log("Rating updated");
                } else 
                    alert("Error!");
            });
    }

    store.createRating = async (rating) => {
        const url = new URL(host + 'create/rating');
        const method = "POST";
        const body = {};
        const params = { 
            parentId: rating.parentId,
            title: rating.title,
            key: rating.key
        };
        url.search = new URLSearchParams(params).toString();

        fetch(url, { method, body })
            .then(response => {
                if (response.ok) {
                    store.update(ratings => {
                        ratings.push(rating);
                        return ratings;
                    });
                    console.log("Rating created!");
                }
                else {
                    alert("Error!");
                }
            });
    }
 
    store.deleteRating = async (ratingToDelete) => {
        const url = new URL(host + 'delete/rating');
        const method = "POST";
        const body = {};
        const params = { 
            id: ratingToDelete.id
        };
        url.search = new URLSearchParams(params).toString();

        fetch(url, { method, body })
            .then(response => {
                if (response.ok) {
                    store.update(ratings => 
                        ratings.filter(r => r.id !== ratingToDelete.id));
                    console.log("Rating deleted!");
                }
                else {
                    alert("Error!");
                }
            });
    }
    

    
    return store;
}

export const ratingStore = createRatingStore([]);
