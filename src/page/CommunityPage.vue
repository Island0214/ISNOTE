<template>

  <div>
    <Nav/>
    <community/>
    <Footer/>
  </div>

</template>

<script>
  import Nav from '../components/Nav/Nav'
  import Community from '../components/Community/Commu.vue'
  import Footer from '../components/Footer/Footer'
  export default {
    components: {
      Nav,
      Community,
      Footer
    }
  }
</script>
