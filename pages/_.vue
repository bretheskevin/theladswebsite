<template>
<div class='container d-flex fx-col'>
  <h1 class='txt-center mt-5 txt-red'>404 NOT FOUND</h1>
  <a class='txt-center' href='/'>Click to go back to the home page</a>
</div>
</template>

<script>
export default {
  asyncData ({ redirect }) {
    return redirect('/')
  },
  auth: false
}
</script>

<style scoped>
a {
  text-decoration: underline;
}
</style>
