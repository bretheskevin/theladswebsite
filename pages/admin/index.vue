<template>
  <div v-show='$auth.user.admin === 1'>
    <Navbar />
    <div class='d-flex fx-col txt-center grey light-4 container rounded-3 py-5'>
      <div v-for='member in members' :key='member.id'>
        <div class='d-flex fx-center'>
          <div class='card d-flex shadow-1 rounded-2 grey light-4 px-5'>
            <div class='grix xs2 card-container'>
              <div class='mr-auto'>
                <p>ID: {{ member.id }}</p>
                <p>Name: {{ member.name }}</p>
              </div>
              <div class='d-flex'>
                <NuxtLink :to='"/admin/edit-user?id="+member.id'
                          class='relative-pos btn vself-center ml-auto p-0 light-hoverable-1 grey light-2 rounded-1 p-3'
                >
                  Modify
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'index',
  async asyncData({ store }) {
    const config = store.state.store.config

    let members;
    if (config.domain === "localhost:3000") {
      members = await store.$axios.$get(`http://${config.domain}/api/users`)
    } else {
      members = await store.$axios.$get(`https://${config.domain}/api/users`)
    }

    return { members }
  },
  async mounted() {
    if (this.$auth.user.admin !== 1) {
      await this.$router.push('/')
    }
  }
}
</script>

<style scoped>
.container {
  width: 80%;
  min-width: 400px;
}

.card {
  width: 400px;
}

</style>
