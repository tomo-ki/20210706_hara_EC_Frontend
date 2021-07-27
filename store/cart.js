// data保管庫
export const state = () => ({
  cart: []
});

// mutations: stateの上書き(代入)
export const mutations = {
  add(state, cartData ) {
    state.cart.push({
      id: state.cart.length + 1,
      user_id: cartData.user_id,
      product_id: cartData.product_id,
      quantity: cartData.quantity,
    });
  },
  update(state, updateCartData) {
    let cart = [];
    updateCartData.forEach((n) => {
      cart.push(Object.assign({},n))
    });
    state.cart = cart;
  },
  remove(state, { cart }) {
    state.cart.splice(state.cart.indexOf(cart), 1);
  },
  allRemove(state) {
    state.cart.splice(-state.cart.length);
  },
}

// getters: stateの情報を取得。別gettersの呼び出しも可能
export const getters = {
  getCart(state) {
    return state.cart;
  }
}

// actions: storeの上書き以外の処理や非同期通信。別actionsの呼び出しも可能
export const actions = {
  setCart(vuexContext, cartData) {
    vuexContext.commit('add', cartData);
  },
  updateCart(vuexContext, updateCartData) {
    vuexContext.commit('update', updateCartData);
  },
  remove(vuexContext, cart) {
    vuexContext.commit('remove', cart);
  },
  allRemove(vuexContext) {
    vuexContext.commit('allRemove');
  },
}