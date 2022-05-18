<template>
  <div v-show='$auth.user.admin === 1'>
    <Navbar />
    <div class='d-flex fx-col txt-center'>
      <h1>Edit profile</h1>
      <EditProfileCard>
        <div class='grix xs1 sm2 md3'>
          <div class='form-field'>
            <label for='admin'>Admin</label>
            <input id='admin' v-model='edit.admin' class='form-control rounded-1' type='text' />
          </div>
          <div class='form-field'>
            <label for='verified'>Verified</label>
            <input id='verified' v-model='edit.verified' class='form-control rounded-1' type='text' />
          </div>
          <div class='form-field'>
            <label for='pointercrate-id'>Pointercrate ID</label>
            <input id='pointercrate-id' v-model='edit.pointercrate' class='form-control rounded-1' type='text' />
          </div>
        </div>
      </EditProfileCard>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  data() {
    return {
      edit: {
        verified: 0,
        admin: 0,
        pointercrate: 0
      }
    }
  },
  async mounted() {
    if (this.$auth.user.admin !== 1) {
      await this.$router.push('/')
    }

    const id = window.location.href.split('id=')[1]
    const config = this.$store.state.store.config

    const member = await this.$store.$axios.$get(`http://${config.domain}/api/users/${id}`)

    this.edit.verified = member.verified
    this.edit.admin = member.admin
    this.edit.pointercrate = member.pointercrate_id
  }
}
</script>
