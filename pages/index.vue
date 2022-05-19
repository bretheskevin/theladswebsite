<template>
  <div>
    <Navbar />
    <StreamingList />

    <div class='container grey light-4 p-4 pt-1 mt-5 rounded-2'>
      <h1 class='font-s6 txt-grey txt-dark-4 txt-center'>The Lads</h1>
      <p>Welcome to The Lads Website ! A separate form of paradox is the definition.
        Everything we do is connected with happiness: futility, politics, harmony, afterlife.
        You have to listen, and absorb booda-hood by your disappearing.
        Occult angers shapes most dogmas !</p>

      <div class='divider p-2 mb-4 px-5' />

      <p>This website is not intended to be useful for the community, I just made it for fun for the lads private
        server. So
        if you're not a member of this "clan", don't look for something interesting on this site.</p>
    </div>

    <div class='container txt-center mt-5 mb-5'>
      <h1 class='font-s7 txt-grey txt-dark-4 txt-center'>Join the public discord server NOW</h1>
      <div class='container px-5 grix xs1 sm2 gutter-xs5'>
        <p class='font-s3 txt-grey txt-dark-4 txt-center'><span class='font-w900'>Why should you join ?</span>
          <br /><br />
          Because there is blackmg in it ! If you still don't want to join, I'm sorry to tell you that you're racist...
        </p>
        <div class='d-flex vcenter mx-auto'>
          <a href='https://www.youtube.com/channel/UCLV6yyF2oflwWbokSTILASQ' target='_blank'>
            <img src='/blackmg.png' alt='blackmg' width='70' class='rounded-2' />
          </a>
        </div>
      </div>
      <a href='https://discord.gg/nqVfDxd7rs' target='_blank'>
        <img src='/discord.png' alt='discord logo' class='mt-2 rounded-2 cursor-pointer' width='300'>
      </a>
    </div>
  </div>
</template>

<script>

export default {
  auth: false
}
</script>

<style>
* {
  font-family: Avenir, Helvetica, HelveticaNeue, Helvetica Neue, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.container {
  max-width: 800px;
}

</style>

