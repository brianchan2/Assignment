<script setup>
import Header from "../components/Header.vue";

</script>

<template>
  <Header />
  <div id="hero">
    <div id="content">
      <h1>Enjoy Your Movies Anytime</h1>
      <p id="description">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Exercitationem,
        asperiores?
      </p>
      <button>Browse</button>
      <a href="./Login"><p id="prompt">New to the site? Create a new account!</p></a>
    </div>
  </div>
  <footer>
    <h1>Random Footer text</h1>
  </footer>
</template>

<style scoped>
#hero {
  background-color: black;
  max-height: 20rem;
  height: 200vw;
  width: 100%;
}
footer {
  position: fixed;
  width: 100%;
  text-align: center;
  display: flex;
  background-color: rgb(0, 0, 0);
  bottom: 0;
}
h1 {
  display: inline;
  font-size: 2.3rem;
  font-weight: bold;
  font-family: "helvetica";
}
#hero #description {
  font-size: 1rem;
  font-weight: bold;
  font-family: "helvetica";
}
#hero button {
  border-style: none;
  margin-top: 15px;
  width: 10rem;
  height: 1.2rem;
  border-radius: 5px;
  color: black;
  font-weight: bold;
  background-color: white;
}

#hero button:hover {
  background-color: rgb(230, 230, 230);
}

#hero button:active {
    background-color: gray;
}

#hero #prompt {
  margin-top: 15px;
  font-size: 11px;
  font-weight: lighter;
  text-decoration: underline;
}

#hero #prompt:active {
  color: grey;
}

#content {
  padding-top: 2rem;
  padding-left: 1.5%;
  height: 50rem;
}

@media (max-width: 1000px) {
  h1 {
    font-size: 3.6vw;
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
