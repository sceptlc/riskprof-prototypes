<template>
    <div class="row">
        <div class="col-12 mt-4">
            <h3>{{ status }}</h3>
        </div>
    </div>
    <div class="row">
        <div class="col-12 mt-2 mb-2">
            <button class="btn btn-outline-primary"
                    @click="goUp()">Вверх</button>
            <button class="btn btn-outline-primary ml-2"
                    @click="createRating()">Создать новый</button>
        </div>
    </div>
    <div class="row">
        <div class="col-12">
            <ul class="list-group">
                <a class="list-group-item list-group-item-action"
                   v-for="rating in ratings"
                   @click="loadRating(rating)"
                   :key="rating.id">
                   {{ rating.Title }}
                </a>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        goUp: function() {
            if (this.activeRating !== null) {
                this.activeRating = this.activeRating.parent;

                if (this.activeRating === null)
                    this.$store.dispatch("getRootRatings");
                else
                    this.$store.dispatch("getRatingChildren", this.activeRating);
            }
        },

        loadRating: function(rating) {
            this.activeRating = rating;
            this.$store.dispatch("getRatingChildren", this.activeRating);
        },
        
        createRating: function() {

        }
    },
    name: "ratings",
    data() {
        return {
            status: "Root",
            activeRating: null,
        };
    },
    computed: {
        ratings() {
            return this.$store.getters.ratings;
        },
    },
    created() {
        this.$store.dispatch("getRootRatings");
    }
};
</script>

<style lang="scss">
</style>
