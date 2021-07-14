<template>
  <div id="detail">
    <Header/>
    <div class="detail">
      <div class="detail__upper flex">
        <div class="detail__imgarea">
          <img src="/images/beigesandal.jpg" alt="" class="detail__imgarea-img">
        </div>
        <div class="detail__upper-right">
          <p class="detail__name">sandal</p>
          <p class="detail__fee">¥3,000(税込)</p>
          <div class="detail__volume">
            <label for="volume" class="detail__volume-label">個数</label>
            <input type="number" min="0" step="1" name="個数" id="volume" class="detail__volume-form">
          </div>
          <button class="detail__button button flex">
            <img src="/images/whitecart.png" alt="">
            <p class="detail__button-text">カートに入れる</p>
          </button>
        </div>
      </div>
      <div class="detail__bottom">
        <h2 class="detail__bottom-title">毎日履きたくなる、スニーカー</h2>
        <p class="detail__bottom-desc">朝の支度が、格段にラクになる一足。シンプルで飽きのこないチームコートは、
          クリーンでモダンなデザインが魅力。合わせたいのは、デニムやバギースウェット。
          スタイリッシュなレザーアッパーとフレッシュなカラーが、どんなコーディネートも引き締めてくれる。
          もちろん、履き心地の良さもいうことなし。
        </p>
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
#detail{
  position: relative;
  height: 100vh;
}
.footer{
  position: absolute;
  width: 100vw;
  bottom: 0;
}
</style>