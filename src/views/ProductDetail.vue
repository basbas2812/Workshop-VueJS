<template>
  <v-container class="mt-5">
    <v-btn text @click="$router.push('/shop')" class="mb-4">
      ← กลับไปหน้ารายการสินค้า
    </v-btn>
    <v-row v-if="product">
      <v-col cols="12" md="6">
        <v-img
          :src="product.productImage || 'https://via.placeholder.com/500'"
          height="400"
          contain
          class="grey lighten-3"
        ></v-img>
      </v-col>
      <v-col cols="12" md="6">
        <h1 class="text-h4 font-weight-bold">{{ product.productName }}</h1>
        <div class="text-h3 font-weight-bold primary--text my-4">
          ฿{{ product.price.toLocaleString() }}
        </div>
        <v-chip
          :color="product.quantity > 0 ? 'green' : 'red'"
          text-color="white"
          class="mb-4"
        >
          {{ product.quantity > 0 ? '🟢 มีสินค้า ' + product.quantity + ' ชิ้น' : '🔴 สินค้าหมด' }}
        </v-chip>
        <p class="text-body-1 mt-4">
          {{ product.productDescription || 'ไม่มีรายละเอียดสินค้า' }}
        </p>
        <v-divider class="my-4"></v-divider>
        <div class="d-flex align-center mb-4">
          <span class="text-h6 mr-4">จำนวน:</span>
          <v-btn icon @click="qty > 1 && qty--" :disabled="qty <= 1">
            <v-icon>mdi-minus-circle</v-icon>
          </v-btn>
          <span class="text-h6 mx-4">{{ qty }}</span>
          <v-btn icon @click="qty < product.quantity && qty++" :disabled="qty >= product.quantity">
            <v-icon>mdi-plus-circle</v-icon>
          </v-btn>
        </div>
        <v-btn
          block
          x-large
          color="primary"
          @click="addToCart"
          :disabled="product.quantity <= 0"
        >
          🛒 เพิ่มลงตะกร้า ฿{{ (product.price * qty).toLocaleString() }}
        </v-btn>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col cols="12" class="text-center">
        <p class="text-h5">กำลังโหลด...</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'ProductDetail',
  data() {
    return {
      product: null,
      qty: 1
    }
  },
  created() {
    this.fetchProduct()
  },
  methods: {
    fetchProduct() {
      const id = this.$route.params.id
      this.axios.get('http://localhost:3000/api/v1/products/' + id)
        .then(res => {
          this.product = res.data.product
        })
        .catch(err => {
          console.error(err)
          this.$router.push('/shop')
        })
    },
    addToCart() {
      this.$store.dispatch('cart/addToCart', { product: this.product, quantity: this.qty })
      this.$router.push('/cart')
    }
  }
}
</script>
