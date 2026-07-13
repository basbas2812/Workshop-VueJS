<template>
  <v-container class="mt-5">
    <h1 class="text-h4 font-weight-bold mb-4">จัดการระบบ</h1>

    <v-tabs v-model="tab">
      <v-tab key="products">สินค้า</v-tab>
      <v-tab key="orders">ออเดอร์</v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item key="products">
        <v-btn color="primary" class="my-4" @click="openNewProduct">
          + เพิ่มสินค้า
        </v-btn>
        <v-data-table
          :headers="productHeaders"
          :items="products"
          :loading="loadingProducts"
          loading-text="กำลังโหลด..."
          no-data-text="ไม่มีสินค้า"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <v-btn icon small color="primary" @click="openEditProduct(item)">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn icon small color="error" @click="deleteProduct(item._id)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </template>
          <template v-slot:[`item.price`]="{ item }">
            ฿{{ item.price.toLocaleString() }}
          </template>
        </v-data-table>
      </v-tab-item>

      <v-tab-item key="orders">
        <v-data-table
          :headers="orderHeaders"
          :items="orders"
          :loading="loadingOrders"
          loading-text="กำลังโหลด..."
          no-data-text="ไม่มีออเดอร์"
        >
          <template v-slot:[`item.totalPrice`]="{ item }">
            ฿{{ item.totalPrice.toLocaleString() }}
          </template>
          <template v-slot:[`item.status`]="{ item }">
            <v-chip
              small
              :color="statusColor(item.status)"
              text-color="white"
            >
              {{ statusText(item.status) }}
            </v-chip>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-select
              v-model="item.status"
              :items="statusOptions"
              dense
              solo
              @change="updateOrderStatus(item._id, item.status)"
            ></v-select>
          </template>
        </v-data-table>
      </v-tab-item>
    </v-tabs-items>

    <v-dialog v-model="dialog" max-width="600">
      <v-card>
        <v-card-title class="text-h5">
          {{ editId ? 'แก้ไขสินค้า' : 'เพิ่มสินค้าใหม่' }}
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12">
              <v-text-field v-model="form.productName" label="ชื่อสินค้า" outlined></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field v-model.number="form.price" label="ราคา" type="number" outlined min="1" :rules="[v => (v && v > 0) || 'ต้องมากกว่า 0']"></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field v-model.number="form.quantity" label="จำนวนในสต็อก" type="number" outlined min="1" :rules="[v => (v && v > 0) || 'ต้องมากกว่า 0']"></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-file-input
                v-model="file"
                label="เลือกรูปภาพ"
                accept="image/*"
                outlined
                dense
                prepend-icon="mdi-camera"
                @change="previewImage"
              ></v-file-input>
              <v-img
                v-if="preview"
                :src="preview"
                max-height="200"
                contain
                class="grey lighten-3 mb-2"
              ></v-img>
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="form.productDescription" label="รายละเอียดสินค้า" outlined></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="form.category" label="หมวดหมู่" outlined></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="error" @click="closeDialog">ยกเลิก</v-btn>
          <v-btn text color="primary" @click="saveProduct" :loading="saving">บันทึก</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import api, { imageUrl } from '@/api'

export default {
  name: 'Admin',
  data() {
    return {
      tab: null,
      products: [],
      loadingProducts: false,
      dialog: false,
      editId: '',
      saving: false,
      file: null,
      preview: '',
      form: {
        productName: '',
        price: 0,
        quantity: 0,
        productDescription: '',
        category: ''
      },
      formDefault: {
        productName: '',
        price: 0,
        quantity: 0,
        productDescription: '',
        category: ''
      },
      productHeaders: [
        { text: 'ชื่อ', value: 'productName' },
        { text: 'ราคา', value: 'price' },
        { text: 'สต็อก', value: 'quantity' },
        { text: 'หมวดหมู่', value: 'category' },
        { text: 'จัดการ', value: 'actions', sortable: false }
      ],
      orders: [],
      loadingOrders: false,
      orderHeaders: [
        { text: 'รหัส', value: '_id' },
        { text: 'ลูกค้า', value: 'customerName' },
        { text: 'วันที่', value: 'createdAt' },
        { text: 'ยอดรวม', value: 'totalPrice' },
        { text: 'สถานะ', value: 'status' },
        { text: 'จัดการ', value: 'actions', sortable: false }
      ],
      statusOptions: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled']
    }
  },
  created() {
    api.get('/users/me').then(() => {
      this.fetchProducts()
      this.fetchOrders()
    }).catch(() => {})
  },
  methods: {
    imageUrl,
    previewImage(file) {
      if (file) {
        this.preview = URL.createObjectURL(file)
      } else if (!this.editId) {
        this.preview = ''
      }
    },
    fetchProducts() {
      this.loadingProducts = true
      api.get('/products')
        .then(res => { this.products = res.data.products })
        .catch(err => console.error(err))
        .finally(() => { this.loadingProducts = false })
    },
    openNewProduct() {
      this.editId = ''
      this.file = null
      this.preview = ''
      this.form = { ...this.formDefault }
      this.dialog = true
    },
    openEditProduct(item) {
      this.editId = item._id
      this.file = null
      this.preview = imageUrl(item.productImage)
      this.form = {
        productName: item.productName,
        price: item.price,
        quantity: item.quantity,
        productDescription: item.productDescription || '',
        category: item.category || ''
      }
      this.dialog = true
    },
    closeDialog() {
      this.dialog = false
      this.editId = ''
      this.file = null
      this.preview = ''
      this.form = { ...this.formDefault }
    },
    async saveProduct() {
      if (this.form.price <= 0 || this.form.quantity <= 0) {
        alert('ไม่สามารถบันทึกได้ ราคาและจำนวนต้องมากกว่า 0')
        return
      }
      this.saving = true
      try {
        const formData = new FormData()
        formData.append('productName', this.form.productName)
        formData.append('price', this.form.price)
        formData.append('quantity', this.form.quantity)
        formData.append('productDescription', this.form.productDescription)
        formData.append('category', this.form.category)
        if (this.file) {
          formData.append('productImage', this.file)
        }
        if (this.editId) {
          await api.put('/products/' + this.editId, formData)
        } else {
          await api.post('/products', formData)
        }
        this.fetchProducts()
        this.closeDialog()
      } catch (err) {
        alert('Error: ' + (err.response?.data?.message || err.message))
      } finally {
        this.saving = false
      }
    },
    async deleteProduct(id) {
      if (!confirm('แน่ใจว่าต้องการลบสินค้านี้?')) return
      try {
        await api.delete('/products/' + id)
        this.fetchProducts()
      } catch (err) {
        alert('Error: ' + (err.response?.data?.message || err.message))
      }
    },
    fetchOrders() {
      this.loadingOrders = true
      api.get('/orders')
        .then(res => { this.orders = res.data.orders })
        .catch(err => console.error(err))
        .finally(() => { this.loadingOrders = false })
    },
    async updateOrderStatus(id, status) {
      try {
        await api.put('/orders/' + id, { status })
      } catch (err) {
        alert('Error: ' + (err.response?.data?.message || err.message))
        this.fetchOrders()
      }
    },
    statusColor(status) {
      const map = { pending: 'orange', confirmed: 'blue', shipped: 'purple', delivered: 'green', cancelled: 'red' }
      return map[status] || 'grey'
    },
    statusText(status) {
      const map = { pending: 'รอดำเนินการ', confirmed: 'ยืนยันแล้ว', shipped: 'กำลังจัดส่ง', delivered: 'จัดส่งแล้ว', cancelled: 'ยกเลิก' }
      return map[status] || status
    }
  }
}
</script>
