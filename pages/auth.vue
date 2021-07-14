<template>
  <div id="auth">
    <Header/>
    <div class="auth flex">
      <Login/>
      <Register/>
    </div>
    <Footer/>
  </div>
</template>

<script>
import Header from '../components/Header'
import Footer from '../components/Footer'
import Login from '../components/Login'
import Register from '../components/Register'
export default {
  components: {
    Header,
    Footer,
    Login,
    Register,
  },
  data() {
    return {
    }
  },
  methods: {
  }
}
</script>

<style scoped>
#auth{
  position: relative;
  height: 100vh;
}
.footer{
  position: absolute;
  width: 100vw;
  bottom: 0;
}
</style>