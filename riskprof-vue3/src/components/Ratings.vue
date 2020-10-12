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
                   :key="rating.Id">
                   {{ rating.Title }}
                    <button className="btn btn-outline-danger btn-sm ml-1 float-right"
                        @click.stop="deleteRating(rating)">Удалить</button>
                    <button className="btn btn-secondary btn-sm float-right"
                        @click.stop="updateRating(rating)">Изменить</button>
                </a>
            </ul>
        </div>
    </div>
    <CreateOrEditRating 
        v-if="modalOpened" 
        :model="ratingToEdit" 
        @saved="onModalSaved"
        @canceled="onModalCancel"/>
</template>

<script>
import CreateOrEditRating from './CreateOrEditRating';

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
            this.modalOpened = true;
            this.ratingToEdit = null;
        },

        updateRating: function(rating) {
            this.modalOpened = true;
            this.ratingToEdit = rating;
        },

        deleteRating: function(rating) {
            if (window.confirm("Удалить рейтинг " + rating.Title + "?"))
                this.$store.dispatch("deleteRating", rating.Id);
        },

        onModalSaved: function (savedRating) {
            if (savedRating.Id === null) {
                // CREATE
                savedRating.parent = this.activeRating;
                savedRating.ParentId = this.activeRating.Id;
                this.$store.dispatch("createRating", savedRating);
            } else {
                // UPDATE
                this.$store.dispatch("updateRating", savedRating);
            }

            this.modalOpened = false;
            this.ratingToEdit = null;
        },
        
        onModalCancel: function () {
            this.modalOpened = false;
            this.ratingToEdit = null;
        }
    },
    
    name: "Ratings",
    
    data() {
        return {
            activeRating: null,
            ratingToEdit: null,
            modalOpened: false
        };
    },
    
    computed: {
        status() {
            return this.activeRating?.Title || "Root";
        },
        ratings() {
            return this.$store.getters.ratings;
        },
    },
    
    created() {
        this.$store.dispatch("getRootRatings");
    },

    components: {
        CreateOrEditRating
    }
};
</script>
