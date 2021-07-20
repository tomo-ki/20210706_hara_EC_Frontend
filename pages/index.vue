<template>
  <div>
    <Header/>
    <div class="firstview">
      <h1 class="firstview__heading">New Arrivals</h1>
      <p class="firstview__text">for BOYS & GIRLS</p>
    </div>
    <div class="products__wrapper flex-column">
      <h2 class="products__heading">Products</h2>
      <div class="products flex">
        <div v-for="product in productLists" :key="product.id" class="product" @click="toDetailPage( product.id )">
          <img :src="`${$axios.defaults.baseURL}`+ product.image_path" alt="" class="product__img">
          <p class="product__name">{{ product.name }}</p>
          <p class="product__fee">¥{{ product.price | addComma }}(税込)</p>
        </div>
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
  data(){
    return {
      productLists: [],
    };
  },
  methods: {
    async getProduct(){
      const resData = await this.$axios.get(
        "http://127.0.0.1:8000/api/product/"
      );
      this.productLists = resData.data.data;
    },
    toDetailPage( product_id ){
      this.$router.push({ path: '/detail' , query :{ product_id: product_id }});
    },
  },
  created() {
    this.getProduct();
  },
}
</script>
