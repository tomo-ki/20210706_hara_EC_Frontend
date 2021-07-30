<template>
  <div id="mypage">
    <Header/>
    <div class="mypage flex-column">
      <h2 class="mypage__title">購入履歴</h2>
      <div class="mypage__historys">
        <div v-for="history in sortHistoryLists" :key="history.id" >
          <div v-if="history.user_id == $auth.user.id" class="mypage__history flex">
            <img :src="`${$axios.defaults.baseURL}`+ history.image_path" @click="toDetailPage(history.product_id)" alt="" class="mypage__history-img hover">
            <div class="mypage__history-textarea flex-column">
              <div class="mypage__history-top">
                <p class="mypage__history-top--uuid">注文番号:{{ history.order_uuid }}</p>
              </div>
              <div class="mypage__history-center flex">
                <div class="mypage__history-center--left">
                  <p @click="toDetailPage( history.product_id )" class="mypage__history-center--name hover">{{ history.name }}</p>
                </div>
                <div class="mypage__history-center--right flex">
                  <p class="mypage__history-center--date">{{$dateFns.format(new Date(history.created_at), 'yyyy年MM月dd日')}}</p>
                  <p class="mypage__history-center--quantity">合計{{ history.quantity }}個</p>
                  <p class="mypage__history-center--price">¥{{history.price}}(税込)</p>
                </div>
              </div>
              <div class="mypage__history-bottom">
                <div class="mypage__history-bottom--rebuy hover" @click="toDetailPage( history.product_id )">もう一度購入する</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Pagination
      query="pages"
      :length="Math.ceil(historyListsLength/8)"
      :now="Number($route.query.pages) || 1"
      class="page-nav"
      @changePage="getHistory"
    />
    <Footer class="footer"/>
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
      historyLists: [],
      reverseLists: [],
      sortHistoryLists: [],
      nowPage: Number(this.$route.query.pages),
    };
  },
  computed: {
    historyListsLength(){
      let sum = 0;
      for(const history of this.historyLists){
        if( history.user_id == this.$auth.user.id){
          sum += 1;
        }
      }
      return sum;
    },
  },
  methods: {
    async getHistory(){
      const resData = await this.$axios.get(
        "http://127.0.0.1:8000/api/history/"
      );
      this.historyLists = resData.data.data;
      this.reverseLists = this.historyLists.slice().reverse();
      if(this.nowPage){
        this.sortHistory();
      }else{
        this.nowPage = 1;
        this.sortHistory();
      }
    },
    sortHistory(){
      this.sortHistoryLists = this.reverseLists.slice(8*(this.nowPage-1), 8*this.nowPage);
    },
    toDetailPage( product_id ){
      this.$router.push({ path: '/detail' , query :{ product_id: product_id }});
    },
  },
  created(){
    if(this.$auth.user){
      this.getHistory();
    }else{
      this.$router.push("/auth");
    }
  },
}
</script>
