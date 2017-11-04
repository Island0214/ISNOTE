<template>

  <div>
    <Nav/>
    <User/>
    <Footer/>
  </div>

</template>

<script>
  import Nav from '../components/Nav/Nav'
  import User from '../components/User/User'
  import Footer from '../components/Footer/Footer'
  export default {
    name: 'HelloWorld',
    components: {
      Nav,
      User,
      Footer
    },
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    }
  }
</script>
