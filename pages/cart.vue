<template>
  <div id="cart">
    <Header/>
    <div class="cart">
      <h2>ショッピングカート</h2>
      <div class="cart__order flex">
        <div class="cart__order-left">
          <div v-for="cart in reverseCloneCart" :key="cart.id">
            <div v-if="cart.user_id == $auth.user.id">
              <div v-for="product in productLists" :key="product.id" class="flex-column">
                <div v-if="cart.product_id == product.id" class="cart__order-list flex">
                  <img :src="`${$axios.defaults.baseURL}`+ product.image_path" @click="toDetailPage(product.id)" alt="" class="cart__order-img hover">
                  <validation-provider v-slot="ProviderProps" rules="required|integer" class="cart__order-item flex">
                    <div class="cart__order-item--left">
                      <p @click="toDetailPage(product.id)" class="cart__order-item--name hover">{{product.name}}</p>
                      <div @click="removeCart(cart)" class="cart__order-item--delete">削除する</div>
                    </div>
                    <div class="cart__order-quantity flex-column">
                      <div class="cart__error error">{{ ProviderProps.errors[0] }}</div>
                      <div class="cart__order-formarea flex">
                        <label for="quantity" class="cart__order-quantity--label">個数</label>
                        <input type="number" min="1" v-model="cart.quantity" id="quantity" name="個数" class="cart__order-quantity--form">
                        <p class="cart__order-item--fee">¥{{ product.price | addComma }}(税込)</p>
                      </div>
                    </div>
                  </validation-provider>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="cart__order-right flex-column">
          <p class="cart__order-sum">合計：¥{{ totalPrice | addComma }} 税込</p>
          <button
            class="cart__order-button button" @click="toThanksPage()"
          >注文する</button>
        </div>
      </div>
    </div>
    <Footer class="footer"/>
  </div>
</template>

<script>
import Header from '../components/Header'
import Footer from '../components/Footer'
import { v4 as uuidv4 } from 'uuid'
export default {
  components: {
    Header,
    Footer,
  },
  data(){
    return {
      productLists: [],
      cloneCart:[],
      reverseCloneCart: [],
      uuid: uuidv4(),
    }
  },
  computed: {
    carts: {
      get() {
        return this.$store.getters['cart/getCart'];
      },
    },
    totalPrice(){
      let sum = 0;
      for(const cart of this.cloneCart){
        for( const product of this.productLists ){
          if( cart.product_id == product.id ){
            sum += (Number(product.price) * Number(cart.quantity));
          }
        }
      }
      return sum;
    },
    cloneCartLength(){
      return this.cloneCart.length;
    }
  },
  methods: {
    async getCart(){
      const resData = await this.$axios.get(
        "http://127.0.0.1:8000/api/product/"
      );
      this.productLists = resData.data.data;
    },
    async registerOrder(){
      const sendData = {
        uuid: this.uuid,
        user_id: this.$auth.user.id,
      };
      await this.$axios.post("http://127.0.0.1:8000/api/order/", sendData);
    },
    async insertHistory(){
      for(const cart of this.cloneCart){
        const sendData = {
          order_uuid: this.uuid,
          product_id: cart.product_id,
          quantity: cart.quantity,
        }
        await this.$axios.post("http://127.0.0.1:8000/api/history/", sendData);
      };
    },
    makecloneCart() {
      this.carts.forEach((n) => {
        this.cloneCart.push(Object.assign({},n))
      });
    },
    duplicateCloneCart() {
      if(Number(this.cloneCart.length) > 1){
        let newCart = this.cloneCart[Number(this.cloneCart.length)-1];
        for(const cart of this.cloneCart.slice(0,Number(this.cloneCart.length)-1)){
          if(newCart.product_id == cart.product_id){
            cart.quantity = Number(cart.quantity);
            cart.quantity += Number(newCart.quantity);
            this.removeCart(newCart);
          }
        }
      };
    },
    reverseCart() {
      this.reverseCloneCart = this.cloneCart.slice().reverse();
    },
    removeCart(cart) {
      // this.$store.dispatch('cart/remove', cart);
      this.cloneCart.splice(this.cloneCart.indexOf(cart), 1);
    },
    updateCart(){
      this.$store.dispatch('cart/updateCart', this.cloneCart);
    },
    toDetailPage( product_id ){
      this.$router.push({ path: '/detail' , query :{ product_id: product_id }});
    },
    toThanksPage(){
      this.registerOrder();
      this.insertHistory();
      this.$router.push({ path: '/thanks' , query :{ id: this.uuid }});
    },
  },
  created(){
    if(this.$auth.user){
      this.getCart();
      this.makecloneCart();
      this.duplicateCloneCart();
      this.reverseCart();
    }else{
      this.$router.push("/auth");
    }
  },
  beforeRouteLeave (to, from, next) {
    this.updateCart();
    next();
  },
}
</script>