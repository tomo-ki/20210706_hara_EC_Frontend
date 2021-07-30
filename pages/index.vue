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
        <div
          v-for="product in sortProductLists" :key="product.id"
          class="product" @click="toDetailPage( product.id )"
        >
          <img :src="`${$axios.defaults.baseURL}`+ product.image_path" alt="" class="product__img">
          <p class="product__name">{{ product.name }}</p>
          <p class="product__fee">¥{{ product.price | addComma }}(税込)</p>
        </div>
      </div>
      <Pagination
        query="pages"
        :length="Math.ceil(productLists.length/8)"
        :now="Number($route.query.pages) || 1"
        class="page-nav"
        @changePage="getProduct"
      />
    </div>
    <Footer/>
  </div>
</template>

<script>
import Header from '../components/Header'
import Footer from '../components/Footer'
import Pagination from '../components/Pagination'
export default {
  components: {
    Header,
    Footer,
    Pagination,
  },
  data(){
    return {
      productLists: [],
      sortProductLists:[],
      nowPage: Number(this.$route.query.pages),
    };
  },
  methods: {
    async getProduct(){
      const resData = await this.$axios.get(
        "http://127.0.0.1:8000/api/product/"
      );
      this.productLists = resData.data.data;
      if(this.nowPage){
        this.sortProduct();
      }else{
        this.nowPage = 1;
        this.sortProduct();
      }
    },
    sortProduct(){
      this.sortProductLists = this.productLists.slice(8*(this.nowPage -1), 8*this.nowPage);
    },
    toDetailPage( product_id ){
      this.$router.push({ path: '/detail' , query :{ product_id: product_id }});
    },
    alertAAA(){
      alert('個数');
    }
  },
  created() {
    this.getProduct();
  },
}
</script>
