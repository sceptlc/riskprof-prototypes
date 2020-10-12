
<script>
    import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'sveltestrap';

    export let open = false;
    export let rating = {};
    export let saved = () => {};

    const toggle = () => {
        open = !open;
    }

    const save = () => {
        toggle();
        saved(rating);
    }

</script>


<Modal isOpen={open} {toggle}>
    <ModalHeader {toggle}>{ rating ? "Редактировать рейтинг" :"Новый рейтинг" }</ModalHeader>
    <ModalBody>
        {#if rating}
            <div class="form-group">
                <label for="title">Title</label>
                <input
                    id="title"
                    bind:value={ rating.title }
                    type="text"
                    class="form-control"
                />
                <label for="key">Key</label>
                <input
                    bind:value={ rating.key }
                    id="key"
                    type="text"
                    class="form-control"
                />
            </div>
        {/if}
    </ModalBody>
    <ModalFooter>
      <Button color="primary" on:click={save}>Сохранить</Button>
    </ModalFooter>
</Modal>

