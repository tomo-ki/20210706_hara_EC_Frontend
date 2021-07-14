<template>
  <div id="cart">
    <Header/>
    <div class="cart">
      <div>ショッピングカート</div>
      <div class="cart__order flex">
        <div class="cart__order-left flex">
          <img src="/images/beigesandal.jpg" alt="" class="cart__order-img">
          <div class="cart__order-item flex">
            <div class="cart__order-item--left">
              <p class="cart__order-item--name">sandal</p>
              <div class="cart__order-item--delete">削除する</div>
            </div>
            <div class="cart__order-volume flex">
              <label for="volume" class="cart__order-volume--label">個数</label>
              <input type="number" min="0" id="volume" name="個数" class="cart__order-volume--form">
              <p class="cart__order-item--fee">¥3,000(税込)</p>
            </div>
          </div>
        </div>
        <div class="cart__order-right flex-column">
          <p class="cart__order-sum">合計：¥9,000 税込</p>
          <button class="cart__order-button button" @click="$router.push('/thanks')">注文する</button>
        </div>
      </div>
    </div>
    <Footer class="footer"/>
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
