<template>
  <v-container class="mt-5">
    <h1 class="text-h4 font-weight-bold mb-4">ตะกร้าสินค้า</h1>

    <v-row v-if="items.length === 0">
      <v-col class="text-center">
        <v-icon size="100" color="grey lighten-1">mdi-cart-off</v-icon>
        <p class="text-h5 grey--text mt-4">ตะกร้าว่างเปล่า</p>
        <v-btn color="primary" to="/shop">ไปเลือกสินค้า</v-btn>
      </v-col>
    </v-row>

    <v-row v-else>
      <v-col cols="12" md="8">
        <v-simple-table>
          <thead>
            <tr>
              <th class="text-left">สินค้า</th>
              <th class="text-center">ราคา/ชิ้น</th>
              <th class="text-center">จำนวน</th>
              <th class="text-center">รวม</th>
              <th class="text-center"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in items" :key="item.productId">
              <td>{{ item.productName }}</td>
              <td class="text-center">฿{{ item.price.toLocaleString() }}</td>
              <td class="text-center">
                <v-btn icon small @click="updateQty(item.productId, item.quantity - 1)" :disabled="item.quantity <= 1">
                  <v-icon small>mdi-minus</v-icon>
                </v-btn>
                <span class="mx-2">{{ item.quantity }}</span>
                <v-btn icon small @click="updateQty(item.productId, item.quantity + 1)" :disabled="item.quantity >= maxQty(item.productId)">
                  <v-icon small>mdi-plus</v-icon>
                </v-btn>
              </td>
              <td class="text-center font-weight-bold">
                ฿{{ (item.price * item.quantity).toLocaleString() }}
              </td>
              <td class="text-center">
                <v-btn icon small color="error" @click="removeItem(item.productId)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </td>
            </tr>
          </tbody>
        </v-simple-table>
      </v-col>

      <v-col cols="12" md="4">
        <v-card class="pa-4">
          <h2 class="text-h5 font-weight-bold mb-4">รายละเอียดการสั่งซื้อ</h2>
          <v-divider class="mb-4"></v-divider>

          <v-text-field
            v-model="customerName"
            label="ชื่อผู้รับ"
            outlined
            required
          ></v-text-field>
          <v-text-field
            v-model="customerPhone"
            label="เบอร์โทรศัพท์"
            outlined
            required
            type="number"
            min="0"
            :rules="[v => !v || (v.length <= 10 && v.length >= 9) || 'เบอร์โทรต้อง 9-10 หลัก']"
            oninput="if(this.value.length > 10) this.value = this.value.slice(0, 10)"
          ></v-text-field>
          <v-textarea
            v-model="customerAddress"
            label="ที่อยู่จัดส่ง"
            outlined
            required
          ></v-textarea>

          <v-divider class="mb-4"></v-divider>

          <div class="d-flex justify-space-between text-h6 mb-4">
            <span>ราคารวม</span>
            <span class="font-weight-bold primary--text">
              ฿{{ cartTotal.toLocaleString() }}
            </span>
          </div>

          <v-btn
            block
            x-large
            color="success"
            @click="checkout"
            :loading="loading"
            :disabled="!isFormValid"
          >
            📦 สั่งซื้อ
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import api from '@/api'

export default {
  name: 'Cart',
  data() {
    return {
      customerName: '',
      customerPhone: '',
      customerAddress: '',
      loading: false,
      stockMap: {}
    }
  },
  computed: {
    ...mapGetters('cart', ['cartItems', 'cartCount', 'cartTotal']),
    items() {
      return this.cartItems
    },
    isFormValid() {
      return this.customerName && this.customerPhone && this.customerAddress
    }
  },
  created() {
    this.fetchStock()
  },
  methods: {
    fetchStock() {
      api.get('/products')
        .then(res => {
          const map = {}
          res.data.products.forEach(p => { map[p._id] = p.quantity })
          this.stockMap = map
        })
        .catch(err => console.error(err))
    },
    maxQty(productId) {
      return this.stockMap[productId] || 0
    },
    updateQty(productId, qty) {
      this.$store.dispatch('cart/updateQuantity', { productId, quantity: qty })
    },
    removeItem(productId) {
      this.$store.dispatch('cart/removeFromCart', productId)
    },
    async checkout() {
      this.loading = true
      try {
        const payload = {
          items: this.items.map(i => ({
            productId: i.productId,
            productName: i.productName,
            price: i.price,
            quantity: i.quantity
          })),
          customerName: this.customerName,
          customerPhone: this.customerPhone,
          customerAddress: this.customerAddress
        }
        await api.post('/orders', payload)
        alert('สั่งซื้อสำเร็จ!')
        this.$store.dispatch('cart/clearCart')
        this.customerName = ''
        this.customerPhone = ''
        this.customerAddress = ''
        this.$router.push('/admin')
      } catch (err) {
        console.error(err)
        alert('สั่งซื้อไม่สำเร็จ: ' + (err.response?.data?.message || err.message))
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
