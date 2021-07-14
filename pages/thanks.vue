<template>
  <div id="thanks">
    <Header/>
    <div class="thanks flex-column">
      <h2 class="thanks__heading">ありがとうございます。注文が確定されました。</h2>
      <p class="thanks__desc">注文内容と配送状況についてはEメールでお知らせをご確認ください。</p>
      <div class="thanks__square flex-column">
        <p class="thanks__square-p1">注文番号</p>
        <p class="thanks__square-p2">ajdsafh-dsajf-asdfb-afdsnfb</p>
        <p class="thanks__square-p3">で承りました</p>
        <button class="thanks__button button" @click="$router.push('/')">ショッピングを続ける</button>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script>
import Header from '../components/Header'
import Footer from '../components/Footer'
export default {
  components: {
    Header,
    Footer,
  },
}
</script>

<style scoped>
#thanks{
  position: relative;
  height: 100vh;
}
.footer{
  position: absolute;
  width: 100vw;
  bottom: 0;
}
</style>