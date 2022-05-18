<template>
  <div class='txt-center container' v-if='streamers.length > 0'>
    <div class='divider mb-5' />
    <h1 class='font-s7 txt-grey txt-dark-4 mb-5'>Currently streaming : </h1>
    <a v-for='streamer of streamers' :key='streamer.id' :href='"https://www.twitch.tv/" + streamer.user_name' target='_blank'>
      {{ streamer.user_name }} <span v-if='streamer.user_name !== streamers[streamers.length - 1].user_name'>•</span>
    </a>

    <div class='divider mt-5' />

  </div>
</template>

<script>
export default {
  name: 'StreamingList',
  data() {
    return {
      streamers: [],
    }
  },
  async mounted() {
    const config = this.$store.state.store.config
    let req;
    if (config.domain === "localhost:3000") {
      req = await this.$store.$axios.$get(`http://${config.domain}/api/streamers`)
    } else {
      req = await this.$store.$axios.$get(`https://${config.domain}/api/streamers`)
    }
    const data = await req.data
    this.streamers = data
  }
}
</script>

<style scoped>

</style>
