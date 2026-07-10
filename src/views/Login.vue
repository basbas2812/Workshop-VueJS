<template>
  <v-container class="mt-5">
    <v-row justify="center">
      <v-col cols="12" md="4">
        <v-card class="pa-6">
          <v-card-title class="justify-center text-h4 font-weight-bold mb-4">
            <v-icon large left color="primary">mdi-login</v-icon>
            เข้าสู่ระบบ
          </v-card-title>
          <v-card-text>
            <v-text-field
              v-model="name"
              label="ชื่อผู้ใช้"
              outlined
              prepend-icon="mdi-account"
            ></v-text-field>
            <v-text-field
              v-model="password"
              label="รหัสผ่าน"
              type="password"
              outlined
              prepend-icon="mdi-lock"
              @keyup.enter="login"
            ></v-text-field>
            <v-btn
              block
              x-large
              color="primary"
              @click="login"
              :loading="loading"
              :disabled="!name || !password"
            >
              เข้าสู่ระบบ
            </v-btn>
            <div class="text-center mt-4">
              <span>ยังไม่มีบัญชี?</span>
              <v-btn text color="primary" to="/register">สมัครสมาชิก</v-btn>
            </div>
            <v-alert
              v-if="error"
              type="error"
              class="mt-4"
              dismissible
            >
              {{ error }}
            </v-alert>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      name: '',
      password: '',
      loading: false,
      error: ''
    }
  },
  methods: {
    async login() {
      this.error = ''
      this.loading = true
      try {
        const res = await this.axios.post('http://localhost:3000/api/v1/users/login', {
          name: this.name,
          password: this.password
        })
        localStorage.setItem('token', res.data.token)
        localStorage.setItem('username', this.name)
        this.$router.push('/admin')
      } catch (err) {
        this.error = err.response?.data || 'เข้าสู่ระบบไม่สำเร็จ'
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
