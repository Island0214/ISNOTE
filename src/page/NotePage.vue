<template>

  <div>
    <Nav/>
    <Note/>
    <Footer/>
  </div>

</template>

<script>
  import Nav from '../components/Nav/Nav'
  import Note from '../components/Note/Note'
  import Footer from '../components/Footer/Footer'
  export default {
    name: 'HelloWorld',
    components: {
      Nav,
      Note,
      Footer
    }
  }
</script>
