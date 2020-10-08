<template>
  <div class="modal fade show">
    <div @click="cancel()" class="backdrop"></div>
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ title }}</h5>
          <button @click="cancel()" class="close">
            <span>&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              v-model="rating.Title"
              id="title" type="text" className="form-control"
            />
            <label htmlFor="key">Key</label>
            <input
              v-model="rating.Key"
              id="key" type="text" className="form-control"
            />
          </div>
        </div>
        <div class="modal-footer">
          <button @click="save()" type="button" class="btn btn-primary">
            Save changes
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CreateOrEditRating",
  methods: {
    save: function () {
      this.$emit("saved", this.rating);
    },
    cancel: function () {
      this.$emit("canceled");
    },
  },
  data() {
    return {
      rating: {},
      opened: false,
    };
  },
  props: {
    model: Object,
  },
  computed: {
      title() {
          return (this.rating.Id === null) ? "Новый рейтинг" : "Редактировать рейтинг";
      }
  },
  mounted() {
    if (this.model === null)
      this.rating = {
        Id: null,
        Key: null,
        ParentId: null,
        Title: "",
        parent: null,
      };
    else this.rating = this.model;
  },
};
</script>

<style lang="scss">
.modal.show {
  display: block;
  .modal-dialog {
    z-index: 2;
  }
  .backdrop {
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.4);
  }
}
</style>