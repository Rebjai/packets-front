<template>
  <div class="home">
    
    <NewForm/>
    <div class="logo"><img alt="Vue logo" src="../assets/img/packet.png" width="100" height="100"></div>
    
  </div>
</template>

<script>
// @ is an alias to /src
import NewForm from '@/components/NewForm.vue'

export default {
  name: 'home',
  components: {
    NewForm
  }
}
</script>
<style>
.logo{
  background: linear-gradient(to bottom, rgba(0,0,0,0) 0%,rgba(0,0,0,0.65) 100%);
  background-size: cover;
}
</style>

