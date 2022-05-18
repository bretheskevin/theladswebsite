<template>
  <nav class='navbar shadow-1 dark-3 mb-5'>
    <NuxtLink to='/' class='navbar-brand d-flex'>
      <img id='logo' class='rounded-4 vself-center' src='/logo.png' alt='logo' width='70' />
    </NuxtLink>
    <div class='navbar-menu ml-auto'>
      <NuxtLink v-if='$auth.user && $auth.user.admin' class='navbar-link mr-1 rounded-3 hide-xs' to='/admin'>
        Admin
      </NuxtLink>
      <NuxtLink class='navbar-link mr-1 rounded-3' to='/blackmg'>BlackMG</NuxtLink>
      <NuxtLink class='navbar-link mr-1 rounded-3' to='/leaderboard'>Leaderboard</NuxtLink>
      <div v-if='$auth.loggedIn' class='d-flex'>
        <NuxtLink class='navbar-link mr-1 rounded-3' to='/profile'>Profile</NuxtLink>
        <div @click='logout'>
          <NuxtLink class='navbar-link rounded-3' to='/'>Logout</NuxtLink>
        </div>
      </div>
      <div v-else class='d-flex'>
        <NuxtLink class='navbar-link rounded-3' to='/login'>Login</NuxtLink>
        <NuxtLink class='navbar-link rounded-3' to='/register'>Register</NuxtLink>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  methods: {
    async logout() {
      await this.$auth.logout()
    }
  }
}
</script>

<style>
.navbar {
  width: 100%;
  height: 80px;
  background-color: #f1fbfe;
}

#logo {
  margin-left: 20px;
}

@media screen and (max-width: 850px) {
  #logo {
    margin-left: 0px;
  }
}
</style>
