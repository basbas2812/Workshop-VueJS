const CART_STORAGE_KEY = 'shop_cart'

export default {
  namespaced: true,
  state: {
    items: JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || '[]')
  },
  getters: {
    cartItems: state => state.items,
    cartCount: state => state.items.reduce((sum, item) => sum + item.quantity, 0),
    cartTotal: state => state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  },
  mutations: {
    SET_ITEMS(state, items) {
      state.items = items
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
    }
  },
  actions: {
    addToCart({ commit, state }, { product, quantity = 1 }) {
      let items = [...state.items]
      let exist = items.find(i => i.productId === product._id)
      if (exist) {
        exist.quantity += quantity
      } else {
        items.push({
          productId: product._id,
          productName: product.productName,
          price: product.price,
          productImage: product.productImage || '',
          quantity
        })
      }
      commit('SET_ITEMS', items)
    },
    updateQuantity({ commit, state }, { productId, quantity }) {
      let items = [...state.items]
      let item = items.find(i => i.productId === productId)
      if (item) {
        if (quantity <= 0) {
          items = items.filter(i => i.productId !== productId)
        } else {
          item.quantity = quantity
        }
      }
      commit('SET_ITEMS', items)
    },
    removeFromCart({ commit, state }, productId) {
      let items = state.items.filter(i => i.productId !== productId)
      commit('SET_ITEMS', items)
    },
    clearCart({ commit }) {
      commit('SET_ITEMS', [])
    }
  }
}
