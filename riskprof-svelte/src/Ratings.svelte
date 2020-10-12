
<script>
    import CreateOrEditRating from './CreateOrEditRating.svelte';
    import { ratingStore } from './store';
    import { Button } from 'sveltestrap';
    import { onMount } from 'svelte';

    var ratings = [];
    var status = "Root";
    var activeRating = null;
    var modalOpened = false;
    var ratingToEdit = null;

    onMount (() => {
        ratingStore.subscribe(value => {
            ratings = value;
        });
        ratingStore.getRatings(null);
    })

    function goUp() {
        if (activeRating !== null) {
            activeRating = activeRating.parent;
            status = activeRating?.title || "Root";
            ratingStore.getRatings(activeRating);
        }
    }

    function loadRating(rating) {
        activeRating = rating;
        status = rating.title;
        ratingStore.getRatings(rating);
    }

    function editRating(rating, e) {
        e.stopPropagation();
        modalOpened = true;
        ratingToEdit = rating;
    }

    function deleteRating(rating, e) {
        e.stopPropagation();
        if (confirm(`Удалить рейтинг ${rating.title}?`))
            ratingStore.deleteRating(rating);
    }

    function createRating() {
        modalOpened = true;
        ratingToEdit = {
            id: null, 
            key: "",
            title: "",
            parent: activeRating,
            parentId: activeRating?.id
        }
    }

    function saveRating(rating) {
        console.log(rating);
        ratingToEdit = rating;
        if (rating.id)
            ratingStore.updateRating(rating);
        else 
            ratingStore.createRating(rating);
    }

</script>

<div className="col-12 mt-4">
    <h2>{ status }</h2>
</div>
<div className="col-12 mt-1">
    <Button on:click={ goUp } color="primary">Вверх</Button>
    <Button on:click={ createRating } color="primary">Создать новый</Button>
</div>

<ul class="list-group">
    {#each ratings as rating}
        <li class="list-group-item list-group-item-action"
            on:click={() => loadRating(rating)}>
            { rating.title }
            <Button color="danger" on:click={(e) => deleteRating(rating, e)}>Удалить</Button>
            <Button color="light" on:click={(e) => editRating(rating, e)}>Изменить</Button>
        </li>
    {/each}
</ul>


<CreateOrEditRating open={modalOpened} rating={ratingToEdit} saved={saveRating}/>
