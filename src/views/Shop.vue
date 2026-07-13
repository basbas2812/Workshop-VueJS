<template>
  <v-container class="mt-5">
    <h1 class="text-h4 font-weight-bold mb-4">สินค้าทั้งหมด</h1>
    <v-text-field
      v-model="search"
      label="ค้นหาสินค้า..."
      outlined
      dense
      clearable
      class="mb-4"
    ></v-text-field>
    <v-row>
      <v-col
        cols="12" sm="6" md="4" lg="3"
        v-for="item in filteredProducts"
        :key="item._id"
      >
        <v-card @click="$router.push('/shop/' + item._id)" hover>
          <v-img
            :src="imageUrl(item.productImage)"
            height="200"
            contain
            class="grey lighten-3"
          ></v-img>
          <v-card-title class="text-subtitle-1 font-weight-bold">
            {{ item.productName }}
          </v-card-title>
          <v-card-subtitle class="text-h6 font-weight-bold primary--text">
            ฿{{ item.price.toLocaleString() }}
          </v-card-subtitle>
          <v-card-text>
            <v-chip
              small
              :color="item.quantity > 0 ? 'green' : 'red'"
              text-color="white"
            >
              {{ item.quantity > 0 ? 'คงเหลือ ' + item.quantity + ' ชิ้น' : 'หมด' }}
            </v-chip>
          </v-card-text>
          <v-card-actions>
            <v-btn
              block
              color="primary"
              depressed
              @click.stop="addToCart(item)"
              :disabled="item.quantity <= 0"
            >
              + เพิ่มลงตะกร้า
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import api, { imageUrl } from '@/api'

export default {
  name: 'Shop',
  data() {
    return {
      products: [],
      search: ''
    }
  },
  computed: {
    filteredProducts() {
      if (!this.search) return this.products
      return this.products.filter(p =>
        p.productName.toLowerCase().includes(this.search.toLowerCase())
      )
    }
  },
  created() {
    this.fetchProducts()
  },
  methods: {
    imageUrl,
    fetchProducts() {
      api.get('/products')
        .then(res => {
          this.products = res.data.products
        })
        .catch(err => {
          console.error(err)
          this.products = []
        })
    },
    addToCart(product) {
      this.$store.dispatch('cart/addToCart', { product, quantity: 1 })
    }
  }
}
</script>
