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
          <validation-provider v-slot="ProviderProps" rules="integer" class="detail__quantity flex-column">
            <div class="detail__error error">{{ ProviderProps.errors[0] }}</div>
            <div class="detail__formarea">
              <label for="quantity" class="detail__quantity-label">個数</label>
              <input type="number" min="0" step="1" v-model="quantity" name="個数" id="quantity" class="detail__quantity-form">
            </div>
          </validation-provider>
          <button
            class="detail__button button flex" @click="addCart(product)" type="button"
          >
            <img src="/images/whitecart.png" alt="">
            <p class="detail__button-text">カートに入れる</p>
          </button>
        </div>
      </div>
      <div class="detail__bottom">
        <h2 class="detail__bottom-title">{{ product.heading }}</h2>
        <p class="detail__bottom-desc">{{ product.description }}</p>
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
  data() {
    return {
      productId: this.$route.query.product_id,
      product:[],
      quantity: 1,
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
      if(this.quantity == 0 || this.quantity == null){
        alert('個数が0個です');
      }else if(!Number.isInteger(Number(this.quantity))) {
        alert('個数を正しく入力してください');
      }
      else{
        const cartData = {
          user_id:this.$auth.user.id,
          product_id:this.productId,
          quantity:this.quantity,
        };
        this.$store.dispatch('cart/setCart', cartData);
        this.$router.push("/cart");
      }
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