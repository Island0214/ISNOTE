<template>

  <div>
    <Nav/>
    <Main/>
    <Footer/>
  </div>

</template>

<script>
  import Nav from '../components/Nav/Nav'
  import Main from '../components/Main/Main'
  import Footer from '../components/Footer/Footer'
  export default {
    name: 'HelloWorld',
    components: {
      Nav,
      Main,
      Footer
    },
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
