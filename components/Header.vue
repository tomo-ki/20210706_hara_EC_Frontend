<template>
  <div class="header flex">
    <div class="header__logo" @click="$router.push('/')">Trace</div>
    <nav class="header__right flex">
      <div class="header__username" v-if="$auth.loggedIn">Name：{{ $auth.user.name }}</div>
      <img src="/images/cart.png" alt="" class="header__logo" @click="$router.push('/cart')">
      <img src="/images/user.png" alt="" class="header__logo" @click="$router.push('/mypage')">
      <img src="/images/logout.png" alt="" class="header__logo" @click="logout" v-if="$auth.loggedIn">
    </nav>
  </div>
</template>

<script>
export default {
  methods: {
    async logout() {
      try {
        await this.$auth.logout();
        alert('ログアウトしました');
        this.$router.push("/auth");
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>