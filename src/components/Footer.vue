<script setup></script>

<template>
  <footer>
    <div>
      <p>Contact us</p>
      <p>brianchan9061@gmail.com</p>
    </div>
    <div>
      <p>About us</p>
      <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ullam, consequatur?</p>
    </div>
  </footer>
</template>

<style scoped>
footer {
  width: 100%;
  text-align: center;
  background-color: rgb(0, 0, 0);
  position: absolute;
  display: grid;
  grid-template-rows: repeat(2, 1fr);
}
.info {
  font-family: Arial, Helvetica, sans-serif;
  color: white;
  margin-right: 70%;
  border-width: 4px;
  padding: 3px;
  margin-left: 5px;
}

p {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 18px;
  margin-left: 5px;
  color: white;
  padding-top: 10px;
  padding-bottom: 10px;
}
</style>
