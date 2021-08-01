<template>
  <div class="pagination flex-column">
  <!-- ページ数が1より大きい、2ページ以上の時のみページネーションを表示 -->
    <div
      v-if="length > 1"
      class="list-item list-item-nav flex"
    >
      <button
        class="pagination-btn hover btn-prev"
        @click="changePage(`?${query}=${now - 1 || 1}`)"
        v-if="now!==1"
      >
        戻る
      </button>
      <!-- 1ページ目はどんな時でも固定表示のためif不要 -->
      <ul class="list flex">
        <!-- クラスバインディング、{ class名: 式 }でtrueの時にクラスがつく -->
        <!-- 1ページを押すとurlが~/1になる -->
        <li
          :class="{ now: now === 1 }"
          class="item item-link hover"
          @click="changePage(`?${query}=1`)"
        >
          <span class="text">
            1
          </span>
        </li>
        <!-- 🌟ここから分岐、最大ページ数が2より大きい3〜 -->
        <template v-if="length > 2">
          <!-- 3以上5以下(=最大ページ数3,4,5の時)
          5ページまでの場合は、最大ページ数に応じて該当ページ数を表示 -->
          <template v-if="length <= 5">
            <li
              :class="{ now: now === 2 }"
              class="item item-link hover"
              @click="changePage(`?${query}=2`)"
            >
              <span class="text">
                2
              </span>
            </li>
            <!-- 最大ページ数が3, 4, 5かつ3より大きい4, 5の時 -->
            <template v-if="length > 3">
              <li
                :class="{ now: now === 3 }"
                class="item item-link hover"
                @click="changePage(`?${query}=3`)"
              >
                <span class="text">
                  3
                </span>
              </li>
              <!-- 最大ページ数が3, 4, 5かつ3より大きい4, 5かつ4より大きい5の時 -->
              <template v-if="length > 4">
                <li
                  :class="{ now: now === 4 }"
                  class="item item-link hover"
                  @click="changePage(`?${query}=4`)"
                >
                  <span class="text">
                    4
                  </span>
                </li>
              </template>
            </template>
          </template>
          <!-- でなければ(=最大ページが5より大きい6〜) -->
          <template v-else>
            <!-- 最大ページ6〜かつ現在いるページが4より少ない(=1, 2, 3の時) -->
            <template v-if="now < 4">
              <li
                :class="{ now: now === 2 }"
                class="item item-link hover"
                @click="changePage(`?${query}=2`)"
              >
                <span class="text">
                  2
                </span>
              </li>
              <li
                :class="{ now: now === 3 }"
                class="item item-link hover"
                @click="changePage(`?${query}=3`)"
              >
                <span class="text">
                  3
                </span>
              </li>
              <!-- 現在いるページが4より少ないかつ、3ページ目にいる時 -->
              <li
                v-if="now === 3"
                class="item item-link hover"
                @click="changePage(`?${query}=4`)"
              >
                <span class="text">
                  4
                </span>
              </li>
              <li class="item item-dots flex">
                <div class="dot" />
                <div class="dot" />
                <div class="dot" />
              </li>
            </template>
            <!-- 最大ページ6〜かつ現在いるページが1, 2, 3でなく4で〜
            現在いるページに2を出しても最大ページ数と同じか少なければ
            (4ページ目にいるなら4 + 2、最大ページ7の方が大きいためfalse)
            (6ページ目にいるなら6 + 2、最大ページ7より大きいためtrue) -->
            <template v-else-if="length <= now + 2">
              <li class="item item-dots flex">
                <div class="dot" />
                <div class="dot" />
                <div class="dot" />
              </li>
              <!-- 最大ページ数から2を引いた数字が現在いるページだったら
              最大ページ数から3を引いたページ数を表示させる
              (5ページ目にいるなら7-2 =5でtrue、7-3 =4が表示される) -->
              <li
                v-if="now === length - 2"
                class="item item-link hover"
                @click="changePage(`?${query}=${length - 3}`)"
              >
                <span class="text">
                  {{ length - 3 }}
                </span>
              </li>
              <li
                :class="{ now: now === length - 2 }"
                class="item item-link hover"
                @click="changePage(`?${query}=${length - 2}`)"
              >
                <span class="text">
                  {{ length - 2 }}
                </span>
              </li>
              <li
                :class="{ now: now === length - 1 }"
                class="item item-link hover"
                @click="changePage(`?${query}=${length - 1}`)"
              >
                <span class="text">
                  {{ length - 1 }}
                </span>
              </li>
            </template>
            <!-- 最大ページ6〜かつ、今までのパターンに該当しない
            (上の🐥のfalse、現在4ページの場合) -->
            <template v-else>
              <li class="item item-dots flex">
                <div class="dot" />
                <div class="dot" />
                <div class="dot" />
              </li>
              <li
                class="item item-link hover"
                @click="changePage(`?${query}=${now - 1}`)"
              >
                <span class="text">
                  {{ now - 1 }}
                </span>
              </li>
              <li class="item item-link hover now">
                <span class="text">
                  {{ now }}
                </span>
              </li>
              <li
                class="item item-link hover"
                @click="changePage(`?${query}=${now + 1}`)"
              >
                <span class="text">
                  {{ now + 1 }}
                </span>
              </li>
              <li class="item item-dots flex">
                <div class="dot" />
                <div class="dot" />
                <div class="dot" />
              </li>
            </template>
          </template>
        </template>
        <li
          :class="{ now: now === length }"
          class="item item-link hover"
          @click="changePage(`?${query}=${length}`)"
        >
          <span class="text">
            {{ length }}
          </span>
        </li>
      </ul>
      <button
        class="pagination-btn hover btn-next"
        @click="changePage(`?${query}=${now + 1 <= length ? now + 1 : length}`)"
        v-if="now!==length"
      >
        次へ
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    query: {
      type: String,
      required: true,
    },
    length: {
      type: Number,
      required: true,
    },
    now: {
      type: Number,
      required: true,
    },
  },
  methods: {
    changePage(pageQuery){
      if( pageQuery !== `?pages=${this.now}`){
        this.$router.push(pageQuery);
        this.$parent('changePage');
      }
    }
  }
}
</script>

<style scoped>
.pagination{
  width: 100%;
  margin: 30px 0;
  align-items: center;
}
.item-link, .pagination-btn{
  border: 2px solid rgb(105, 159, 24);
  border-radius: 15px;
  background-color: white;
  width: 60px;
  height: 30px;
  text-align: center;
  margin: 0 5px;
  font-size: 14px;
}
.item-link{
  line-height: 30px;
}
.now{
  background-color: rgb(105, 159, 24);
  color: white;
}
.item-dots{
  align-items: flex-end;
  justify-content: space-between;
  width: 20px;
  height: 30px;
  margin: 0 10px;
  padding: 5px 0;
  font-size: 14px;
}
.dot{
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background-color: black;
}

</style>