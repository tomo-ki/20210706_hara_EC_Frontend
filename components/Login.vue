<template>
  <validation-observer ref="obs" v-slot="ObserverProps" class="auth__login flex-column">
    <h2 class="auth__heading">ログイン</h2>
    <h3 class="auth__heading-discri">会員のお客さま</h3>
    <div class="auth__formarea flex-column">
      <p class="auth__form-desc">メールアドレスとパスワードを入力してください。</p>
      <validation-provider v-slot="ProviderProps" rules="required|email" class="auth__form">
        <div class="auth__error error">{{ ProviderProps.errors[0] }}</div>
        <div class="auth__form flex">
          <label for="l-email">メールアドレス:</label>
          <input type="email" v-model="email" name="メールアドレス" id="l-email" placeholder="email">
        </div>
      </validation-provider>
      <validation-provider v-slot="ProviderProps" rules="required|min:6" class="auth__form">
        <div class="auth__error error">{{ ProviderProps.errors[0] }}</div>
        <div class="auth__form flex">
          <label for="l-password">パスワード:</label>
          <input type="password" @keyup.enter="login" v-model="password" name="パスワード" id="l-password" placeholder="password">
        </div>
      </validation-provider>
    </div>
    <button
      @click="login" class="auth__button black-button" type="button"
      :disabled="ObserverProps.invalid || !ObserverProps.validated"
    >
      ログイン
    </button>
  </validation-observer>
</template>
<script>
export default {
  data() {
    return {
      email: null,
      password: null,
    }
  },
  methods: {
    async login() {
      try {
        await this.$auth.loginWith("laravelJWT", {
          data: {
            email: this.email,
            password: this.password,
          },
        });
        alert('ログインが完了しました')
        this.$router.push("/");
      } catch {
        alert("メールアドレスまたはパスワードが間違っております");
      }
    },
  },
}
</script>