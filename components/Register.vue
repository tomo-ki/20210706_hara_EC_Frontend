<template>
  <validation-observer ref="obs" v-slot="ObserverProps" class="auth__register flex-column">
    <h2 class="auth__heading">新規会員登録</h2>
    <h3 class="auth__heading-discri">初めてご利用の方・会員以外の方</h3>
    <div class="auth__formarea flex-column">
      <p class="auth__form-desc">初めてご利用のお客様は、こちらから会員登録を行って下さい。</p>
      <validation-provider v-slot="ProviderProps" rules="required|email" class="auth__form">
        <div class="auth__error error">{{ ProviderProps.errors[0] }}</div>
        <div class="auth__form flex">
          <label for="r-email">メールアドレス:</label>
          <input type="email" v-model="email" name="メールアドレス" id="r-email" placeholder="email">
        </div>
      </validation-provider>
      <validation-provider v-slot="ProviderProps" rules="required|min:6" class="auth__form">
        <div class="auth__error error">{{ ProviderProps.errors[0] }}</div>
        <div class="auth__form flex">
          <label for="r-password">パスワード:</label>
          <input type="password" v-model="password" name="パスワード" id="r-password" placeholder="password">
        </div>
      </validation-provider>
      <validation-provider v-slot="ProviderProps" rules="required|min:4" class="auth__form">
        <div class="auth__error error">{{ ProviderProps.errors[0] }}</div>
        <div class="auth__form flex">
          <label for="r-name">お名前:</label>
          <input type="text" v-model="userName" name="お名前" id="r-name" placeholder="name">
        </div>
      </validation-provider>
    </div>
    <button
      @click="register" class="auth__button green-button" type="button"
      :disabled="ObserverProps.invalid || !ObserverProps.validated"
    >
      新規会員登録
    </button>
  </validation-observer>
</template>
<script>
export default {
  auth: false,
  data() {
    return {
      userName: null,
      email: null,
      password: null,
    }
  },
  methods: {
    async register() {
      try {
        await this.$axios.post("http://localhost:8000/api/auth/register", {
          name: this.userName,
          email: this.email,
          password: this.password,
        });
        alert('新規会員登録が完了しました.ログインしてください');
        this.$router.push("/auth");
      } catch {
        alert("メールアドレスがすでに登録されています");
      }
    },
  },
}
</script>