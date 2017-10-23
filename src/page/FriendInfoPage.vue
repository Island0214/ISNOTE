<template>

  <div>
    <Nav/>
    <FriendsInfo/>
    <Footer/>
  </div>

</template>

<script>
  import Nav from '../components/Nav/Nav'
  import FriendsInfo from '../components/Info/FriendsInfo'
  import Footer from '../components/Footer/Footer'
  export default {
    name: 'HelloWorld',
    components: {
      Nav,
      FriendsInfo,
      Footer
    },
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    }
  }
</script>
