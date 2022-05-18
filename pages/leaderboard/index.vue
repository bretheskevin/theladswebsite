<template>
  <div>
    <Navbar />
    <div class='container'>
      <div class='d-flex fx-center'>
        <svg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg' class='mr-2'>
          <g opacity='0.6'>
            <circle cx='12.5' cy='12.5' r='8.75' stroke='#0F0F2B' stroke-width='1.875' stroke-linecap='round'
                    stroke-linejoin='round' />
            <path d='M26.25 26.25L18.75 18.75' stroke='#0F0F2B' stroke-width='1.875' stroke-linecap='round'
                  stroke-linejoin='round' />
          </g>
        </svg>
        <input id='filter' v-model='filter' type='text' class='bd-0' placeholder='Search a player'>
      </div>
      <div class='divider mt-4 mx-5'></div>

      <h1 class='txt-center mb-5'>Leaderboard</h1>
      <Loading v-if="members.length === 0" class="mx-auto"/>
      <PlayerCard
        v-for='member of filteredMembers'
        :key='member.user_id' :member='member'>
      </PlayerCard>
    </div>
  </div>
</template>

<style>
textarea:focus, input:focus {
  outline: none;
}

ul {
  list-style: none;
}
</style>

<script>
export default {
  name: 'index.vue',
  data() {
    return {
      counter: 1,
      filter: '',
      members: [],
    }
  },
  computed: {
    filteredMembers() {
      return this.members.filter(member => {
        return member.name.toLowerCase().includes(this.filter.toLowerCase())
      })
    }
  },
  async mounted() {
    const config = this.$store.state.store.config
    let members;

    if (config.domain === "localhost:3000") {
      members = await this.$store.$axios.$get(`http://${config.domain}/api/members`)
    } else {
      members = await this.$store.$axios.$get(`https://${config.domain}/api/members`)
    }

    members = members.sort(function(a, b) {
      return a.rank - b.rank
    })
    for (let i = 1; i < members.length + 1; i++) {
      members[i - 1].ladsRank = i
    }

    this.members = members;
  },
  auth: false
}
</script>
