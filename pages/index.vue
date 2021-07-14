<template>
  <div>
    <Header/>
    <div class="firstview">
      <img src="/images/sandal.jpg" alt="" class="firstview__img">
    </div>
    <div class="products__wrapper flex-column">
      <h2 class="products__heading">Products</h2>
      <div v-for="product in productLists" :key="product.id" class="products flex">
        <div class="product">
          <img v-bind:src="product.image_path" alt="" class="product__img">
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
    }
  },
  created() {
    this.getProduct();
  },
}
</script>
