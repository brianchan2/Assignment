<script setup>
    import Header from "../components/Header.vue"
</script>

<template>
    <Header />
    <div id="hero">
        <div id="content">
            <h1>Enjoy Your Movies Anytime</h1>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Exercitationem, asperiores?</p>
        </div>
    </div>
</template>

<style scoped>
    #hero {
        background-color: black;
        max-height: 20rem;
        height: 100vw;
        width: 100%;
    }
    h1 {
        display: inline;
        font-size: 2.3rem;
        font-weight: bold;
        font-family: "helvetica"
    }
    p {
        font-size: 1rem;
        font-weight: bold;
        font-family: "helvetica"
    }

    #content {
        margin-top: 2rem;
        margin-left: 1%;
        height: 50rem;
    }

    @media (max-width: 1000px) {
        h1 {
            font-size: 4.6vw;
        }
        p {
            font-size: 2.6vw;
        }
    }

    @media (max-width: 425px) {
        h1 {
            font-size: 2rem;
        }
        p {
            font-size: 1rem;
        }
    }
    
</style>