<template>
  <div id="detail">
    <Header/>
    <div class="detail">
      <div class="detail__upper flex">
        <div class="detail__imgarea">
          <img :src="`${$axios.defaults.baseURL}`+ product.image_path" alt="" class="detail__imgarea-img">
        </div>
        <div class="detail__upper-right">
          <p class="detail__name">{{ product.name }}</p>
          <p class="detail__fee">¥{{ product.price | addComma }}(税込)</p>
          <div class="detail__quantity">
            <label for="quantity" class="detail__quantity-label">個数</label>
            <input type="number" min="0" step="1" v-model="quantity" name="個数" id="quantity" class="detail__quantity-form">
          </div>
          <button class="detail__button button flex">
            <img src="/images/whitecart.png" alt="">
            <p class="detail__button-text" @click="addCart(product)">カートに入れる</p>
          </button>
        </div>
      </div>
      <div class="detail__bottom">
        <h2 class="detail__bottom-title">{{ product.heading }}</h2>
        <p class="detail__bottom-desc">{{ product.description }}</p>
      </div>
    </div>
    <p>
      {{carts}}
    </p>
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
  data() {
    return {
      productId: this.$route.query.product_id,
      product:[],
      quantity: 0,
    }
  },
  computed: {
    carts() {
      return this.$store.getters['cart/getCart'];
    }
  },
  methods: {
    async getDitail() {
      const resData = await this.$axios.get(
        "http://127.0.0.1:8000/api/product/" + this.productId
      );
      this.product = resData.data.data;
    },
    addCart(){
      this.$store.dispatch('cart/setCart', {user_id:this.$auth.user.id, product_id:this.productId, quantity:this.quantity});
      this.quantity = 0;
      // this.$router.push("/mypage");
    },
  },
  created(){
    if(this.$auth.user){
      this.getDitail();
    }else{
      this.$router.push("/auth");
    }
  }

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