<script setup>

</script>

<template>
    <div id="shadow">

    </div>
    <div id="modal">

    </div>
</template>

<style scoped>
    * {
        position: absolute;
        top: 0;
        z-index: 1;
    }
    #shadow {
        height: 100%;
        width: 100%;
        background-color: rgba(0, 0, 0, 0.5);
    }
    #modal {
        right: 0;
        width: 50%;
        height: 100%;
        background-color: rgb(0, 0, 0);
    }
</style>