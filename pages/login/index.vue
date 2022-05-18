<template>
  <div>
    <Navbar />

    <h1 class='txt-center mt-5'>Login</h1>
    <div id='dashboard-container' class='grix xs1 container mt-5' @keypress.enter='userLogin'>
      <div>
        <p class='txt-center txt-red'>{{ error }}<span v-if='counter > 1'> ({{ counter }})</span></p>
      </div>
      <div class='form-field'>
        <label for='name'>Username or email</label>
        <input id='name' v-model='login.username' class='form-control rounded-1' type='text' />
      </div>
      <div class='form-field'>
        <label class='txt-left hide-xs' for='password'>Password</label>
        <label class='txt-left hide-sm-up' for='password'>Password</label>
        <input id='password' v-model='login.password' class='form-control rounded-1' type='password' />
      </div>
      <button class='btn rounded-1 ml-auto mr-auto' @click='userLogin'>Login</button>
    </div>
    <div class='px-5 container'>
      <p>You don't imagine how annoying is it to make something that send you a link to reset your password. Please just
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
      login: {
        username: '',
        password: ''
      },
      error: '',
      counter: 0
    }
  },
  methods: {
    async userLogin() {
      try {
        await this.$auth.loginWith('local', {
          data: this.login
        })

        await this.$router.push('/')
      } catch (e) {
        this.error = 'Invalid credentials'
        this.counter++
      }
    }
  }
}
</script>

<style>
#dashboard-container {
  max-width: 300px;
}
</style>
