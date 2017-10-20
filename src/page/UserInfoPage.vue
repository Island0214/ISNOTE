<template>

  <div>
    <Nav/>
    <UserInfo/>
    <Footer/>
  </div>

</template>

<script>
  import Nav from '../components/Nav/Nav'
  import UserInfo from '../components/UserInfo/UserInfo'
  import Footer from '../components/Footer/Footer'
  export default {
    name: 'HelloWorld',
    components: {
      Nav,
      UserInfo,
      Footer
    },
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    }
  }
</script>
