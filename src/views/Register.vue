<template>
  <v-container class="mt-5">
    <v-row justify="center">
      <v-col cols="12" md="4">
        <v-card class="pa-6">
          <v-card-title class="justify-center text-h4 font-weight-bold mb-4">
            <v-icon large left color="primary">mdi-account-plus</v-icon>
            สมัครสมาชิก
          </v-card-title>
          <v-card-text>
            <v-text-field
              v-model="name"
              label="ชื่อผู้ใช้"
              outlined
              prepend-icon="mdi-account"
              :rules="[v => !!v || 'กรุณากรอกชื่อผู้ใช้']"
            ></v-text-field>
            <v-text-field
              v-model="password"
              label="รหัสผ่าน"
              type="password"
              outlined
              prepend-icon="mdi-lock"
              :rules="[v => !!v || 'กรุณากรอกรหัสผ่าน']"
            ></v-text-field>
            <v-text-field
              v-model="confirmPassword"
              label="ยืนยันรหัสผ่าน"
              type="password"
              outlined
              prepend-icon="mdi-lock-check"
              :rules="[v => v === password || 'รหัสผ่านไม่ตรงกัน']"
            ></v-text-field>
            <v-btn
              block
              x-large
              color="primary"
              @click="register"
              :loading="loading"
              :disabled="!name || !password || password !== confirmPassword"
            >
              สมัครสมาชิก
            </v-btn>
            <div class="text-center mt-4">
              <span>มีบัญชีอยู่แล้ว?</span>
              <v-btn text color="primary" to="/login">เข้าสู่ระบบ</v-btn>
            </div>
            <v-alert
              v-if="error"
              type="error"
              class="mt-4"
              dismissible
            >
              {{ error }}
            </v-alert>
            <v-alert
              v-if="success"
              type="success"
              class="mt-4"
            >
              {{ success }}
            </v-alert>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import api from '@/api'

export default {
  name: 'Register',
  data() {
    return {
      name: '',
      password: '',
      confirmPassword: '',
      loading: false,
      error: '',
      success: ''
    }
  },
  methods: {
    async register() {
      this.error = ''
      this.success = ''
      this.loading = true
      try {
        await api.post('/users/register', {
          name: this.name,
          password: this.password
        })
        this.success = 'สมัครสมาชิกสำเร็จ! กำลังไปยังหน้าเข้าสู่ระบบ...'
        setTimeout(() => this.$router.push('/login'), 1500)
      } catch (err) {
        this.error = err.response?.data || 'สมัครสมาชิกไม่สำเร็จ'
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
