// data保管庫
export const state = () => ({
  cart: []
});

// mutations: stateの上書き(代入)
export const mutations = {
  add(state, { userId, productId, quantity }) {
    state.cart.push({
        user_id: userId,
        product_id: productId,
        quantity: quantity,
      })
    },
    remove(state, { product }) {
        state.cart.splice(state.cart.indexOf(product), 1)
    },
}

// getters: stateの情報を取得。別gettersの呼び出しも可能
export const getters = {
  getCart (state) {
      return state.cart
  }
}

// actions: storeの上書き以外の処理や非同期通信。別actionsの呼び出しも可能
export const actions = {
  setCart(vuexContext, { userId, productId, quantity }) {
    vuexContext.commit('add', { userId, productId, quantity })
  },
  remove(vuexContext, product) {
    vuexContext.commit('remove', product)
  }
}