<template>
  <div>
    <Navbar />
    <div class='px-5 container red light-1 rounded-2 py-1 txt-white'>
      <p>Dear lads member, once you registered, send me a DM on discord Hikudo#1714, so I verify that
        you're from the
        lads and I can add you to the leaderboard</p>
    </div>
    <h1 class='txt-center mt-5'>Register</h1>
    <div id='dashboard-container' class='grix xs1 container mt-1' @keypress.enter='userRegister'>
      <p class='txt-red txt-center my-0'>{{ errorMessage }} &nbsp;
      </p>
      <div class='form-field'>
        <label for='email'>Email</label>
        <input id='email' v-model='register.email' class='form-control rounded-1' type='email' />
      </div>
      <div class='form-field'>
        <label for='name'>Username</label>
        <input id='name' v-model='register.username' class='form-control rounded-1' type='text' />
      </div>
      <div class='form-field'>
        <label class='txt-left hide-xs' for='password'>Password</label>
        <label class='txt-left hide-sm-up' for='password'>Password</label>
        <input id='password' v-model='register.password' class='form-control rounded-1' type='password' />
      </div>
      <div class='form-field'>
        <label class='txt-left hide-xs' for='password'>Confirm password</label>
        <label class='txt-left hide-sm-up' for='password'>Confirm password</label>
        <input id='confirm-password' v-model='register.confirmPassword' class='form-control rounded-1'
               type='password' />
      </div>
      <button class='btn rounded-1 ml-auto mr-auto' @click='userRegister'>Register</button>
    </div>
    <div class='px-5 container'>
      <p>You don't imagine how annoying is it to make something that send you a link to reset your password. Please
        just
        don't loose it because I'm too lazy to code this feature right now. If you have any issue with your account,
        just
        contact me on discord at Hikudo#1714</p>
    </div>
  </div>

</template>

<script>
export default {
  name: 'index',
  data() {
    return {
      register: {
        username: '',
        password: '',
        confirmPassword: '',
        email: ''
      },
      errorMessage: ''
    }
  },
  methods: {
    async userRegister() {
      if (this.register.password !== this.register.confirmPassword) {
        this.errorMessage = 'The passwords doesn\'t match'
        return
      }

      const response = await this.$axios.post('/api/auth/register', {
        data: {
          email: this.register.email,
          username: this.register.username,
          password: this.register.password
        }
      })

      if (response.data.message) {
        await this.$auth.loginWith('local', {
          data: this.register
        })
        await this.$router.push('/')
      } else {
        this.errorMessage = response.data.error
      }
    }
  },
  auth: false
}
</script>

<style>
#dashboard-container {
  max-width: 300px;
}
</style>
