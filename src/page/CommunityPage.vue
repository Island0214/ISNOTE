<template>

  <div>
    <Nav/>
    <Community/>
    <Footer/>
  </div>

</template>

<script>
  import Nav from '../components/Nav/Nav'
  import Community from '../components/Community/Community'
  import Footer from '../components/Footer/Footer'
  export default {
    components: {
      Nav,
      Community,
      Footer
    }
  }
</script>
