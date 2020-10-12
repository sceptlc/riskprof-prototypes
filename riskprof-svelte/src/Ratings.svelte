
<script>
    import { ratingStore } from './store';
    import { Button } from 'sveltestrap';
    import { onMount } from 'svelte';

    var ratings = [];
    var status = "Root";
    var activeRating = null;

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

    function updateRating(rating) {
        
    }

    function deleteRating(rating) {
        
    }

</script>

<div className="col-12 mt-4">
    <h2>{ status }</h2>
</div>
<div className="col-12 mt-1">
    <Button on:click={ goUp } color="primary">Вверх</Button>
    <Button color="primary">Создать новый</Button>
</div>

<ul class="list-group">
    {#each ratings as rating}
        <li class="list-group-item list-group-item-action"
            on:click={() => loadRating(rating)}>
            { rating.title }
            <Button color="danger" on:click={() => deleteRating(rating)}>Удалить</Button>
            <Button color="light" on:click={() => updateRating(rating)}>Изменить</Button>
        </li>
    {/each}
</ul>
