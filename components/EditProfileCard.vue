<template>
  <div class='d-flex fx-center mt-5 mb-5'>
    <div class='card shadow-1 rounded-2 grey light-4 px-5 py-4' @keypress.enter='submit'>
      <p class='txt-center txt-red m-0' v-for='key of Object.keys(errors)' :key='key'>
        {{ errors[key].length > 0 ? errors[key][0] : null }}</p>
      <p class='txt-center txt-green m-0' v-for='key of success' :key='key'>
        {{ success.length > 0 ? key : null }}</p>
      <div>
        <label for='img' class='btn rounded-4'>
          <p>Profile Picture</p>
          <img :src='previewImage' alt='profile picture' width='50' class='light-hoverable-5 rounded-4' />
        </label>
        <input id='img' class='hide' type='file' name='img' accept='image/*' @change='uploadImage' />
      </div>
      <div class='form-field'>
        <label for='name'>Username</label>
        <input id='name' v-model='edit.username' class='form-control rounded-1' type='text' />
      </div>
      <div class='form-field'>
        <label for='name'>Email</label>
        <input id='email' v-model='edit.email' class='form-control rounded-1' type='email' />
      </div>
      <div class='form-field'>
        <label for='name'>Twitch Username</label>
        <input id='twitch_username' v-model='edit.twitch_username' class='form-control rounded-1' type='text' />
      </div>
      <div class='grix xs1 sm2 md3'>
        <div class='form-field col-sm2 col-md1'>
          <label for='password'>Previous password</label>
          <input id='password' v-model='edit.previousPassword' class='form-control rounded-1' type='password' />
        </div>
        <div class='form-field'>
          <label for='new-password'>New password</label>
          <input id='new-password' v-model='edit.newPassword' class='form-control rounded-1' type='password' />
        </div>
        <div class='form-field'>
          <label for='confirm-new-password'>Confirm new password</label>
          <input id='confirm-new-password' v-model='edit.confirmNewPassword' class='form-control rounded-1'
                 type='password' />
        </div>
      </div>
      <slot></slot>
      <div class='btn shadow-1 rounded-1 grey light-3 ml-auto mr-auto mt-4 mb-4' @click='submit'>Submit</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EditProfileCard',
  data() {
    return {
      edit: {
        username: '',
        email: '',
        twitch_username: '',
        previousPassword: '',
        newPassword: '',
        confirmNewPassword: ''
      },
      previewImage: '/default_pp.png',
      member: {},
      errors: {},
      success: []
    }
  },
  async mounted() {
    this.id = window.location.href.split('id=')[1]
    const config = this.$store.state.store.config

    let member;
    if (config.domain === "localhost:3000") {
      member = await this.$store.$axios.$get(`http://${config.domain}/api/users/${this.id}`)
    } else {
      member = await this.$store.$axios.$get(`https://${config.domain}/api/users/${this.id}`)
    }
    this.edit.username = member.name
    this.edit.email = member.email
    this.previewImage = member.profile_picture_link
    this.edit.twitch_username = member.twitch_username
  },
  methods: {
    async uploadImage(event) {
      const domain = this.$store.state.store.config.domain
      const file = event.target.files[0]
      this.previewImage = URL.createObjectURL(file)

      const fd = new FormData()
      fd.append('image', file, file.name)

      let response;
      if (domain === "localhost:3000") {
        response = await this.$axios.post(`http://${domain}/api/avatar`, fd)
      } else {
        response = await this.$axios.post(`https://${domain}/api/avatar`, fd)

      }
      this.success.push(response.data.success)

      await this.$auth.setUserToken(response.data.token)
    },
    async submit() {
      if (this.$auth.user.admin) {
        // eslint-disable-next-line no-useless-catch
        try {
          this.edit.verified = parseInt(document.getElementById('verified').value)
          this.edit.pointercrate = parseInt(document.getElementById('pointercrate-id').value)
          this.edit.admin = parseInt(document.getElementById('admin').value)
        } catch (e) {
          console.error(e)
        }
        this.edit.userToEditId = this.id
      }
      const domain = this.$store.state.store.config.domain

      let response;
      if (domain === "localhost:3000") {
        response = await this.$axios.patch(`http://${domain}/api/users`, this.edit)
      } else {
        response = await this.$axios.patch(`https://${domain}/api/users`, this.edit)
      }

      if (this.$auth.user.admin !== 1 || response.data.user.id === this.$auth.user.id) {
        await this.$auth.setUserToken(response.data.token)
      }
      this.errors = response.data.errors
      this.success = response.data.success
    }
  }

}
</script>

<style scoped>
.card {
  width: 90%;
  max-width: 600px;
}

ul {
  list-style: none;
}

</style>
