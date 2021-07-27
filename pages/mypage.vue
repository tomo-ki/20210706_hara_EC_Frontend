<template>
  <div id="mypage">
    <Header/>
    <div class="mypage flex-column">
      <h2 class="mypage__title">購入履歴</h2>
      <div class="mypage__historys">
        <div v-for="history in reverseHistories" :key="history.id" class="mypage__history flex">
          <img :src="`${$axios.defaults.baseURL}`+ history.image_path" alt="" class="mypage__history-img">
          <div class="mypage__history-textarea flex-column">
            <div class="mypage__history-top">
              <p class="mypage__history-top--uuid">注文番号:{{ history.order_uuid }}</p>
            </div>
            <div class="mypage__history-center flex">
              <div class="mypage__history-center--left">
                <p class="mypage__history-center--name">{{ history.name }}</p>
              </div>
              <div class="mypage__history-center--right flex">
                <p class="mypage__history-center--date">{{$dateFns.format(new Date(history.created_at), 'yyyy年MM月dd日')}}</p>
                <p class="mypage__history-center--quantity">合計{{ history.quantity }}個</p>
                <p class="mypage__history-center--price">¥{{history.price}}(税込)</p>
              </div>
            </div>
            <div class="mypage__history-bottom">
              <div class="mypage__history-bottom--rebuy hover" @click="toDetailPage( history.id )">もう一度購入する</div>
            </div>
          </div>
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
  data(){
    return {
      historyLists: [],
    };
  },
  computed: {
    reverseHistories() {
      return this.historyLists.slice().reverse();
    },
  },
  methods: {
    async getHistory(){
      const resData = await this.$axios.get(
        "http://127.0.0.1:8000/api/history/" + this.$auth.user.id
      );
      this.historyLists = resData.data.data;
    },
    toDetailPage( history_id ){
      this.$router.push({ path: '/detail' , query :{ product_id: history_id }});
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
