<template>
  <v-app>
    <v-app-bar app color="primary" dark elevate-on-scroll>
      <v-btn text to="/" class="text-h6 font-weight-bold">
        <v-icon left large>mdi-store</v-icon>
        MyShop
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn text to="/shop">
        <v-icon left>mdi-storefront</v-icon>
        <span class="d-none d-sm-flex">Shop</span>
      </v-btn>

      <v-btn text to="/cart">
        <v-badge :content="cartCount" :value="cartCount" color="red" overlap>
          <v-icon>mdi-cart</v-icon>
        </v-badge>
        <span class="ml-1 d-none d-sm-flex">Cart</span>
      </v-btn>

      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn text v-on="on">
            <v-icon left>mdi-dots-vertical</v-icon>
            <span class="d-none d-sm-flex">More</span>
          </v-btn>
        </template>
        <v-list dense>
          <v-list-item to="/aboutme" link>
            <v-list-item-icon><v-icon>mdi-account</v-icon></v-list-item-icon>
            <v-list-item-title>About Me</v-list-item-title>
          </v-list-item>
          <v-list-item to="/grade" link>
            <v-list-item-icon><v-icon>mdi-calculator</v-icon></v-list-item-icon>
            <v-list-item-title>Grade</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <template v-if="isLoggedIn">
        <v-btn text to="/admin">
          <v-icon left>mdi-cog</v-icon>
          <span class="d-none d-sm-flex">Manage</span>
        </v-btn>

        <v-menu offset-y min-width="180">
          <template v-slot:activator="{ on }">
            <v-btn text v-on="on" class="ml-2">
              <v-icon left>mdi-account-circle</v-icon>
              <span class="d-none d-sm-flex">{{ username }}</span>
              <v-icon right small>mdi-chevron-down</v-icon>
            </v-btn>
          </template>
          <v-list dense>
            <v-list-item @click="showLogoutDialog = true">
              <v-list-item-icon><v-icon color="error">mdi-logout</v-icon></v-list-item-icon>
              <v-list-item-title class="error--text">ออกจากระบบ</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
      <template v-else>
        <v-btn text to="/register">
          <v-icon left>mdi-account-plus</v-icon>
          <span class="d-none d-sm-flex">Register</span>
        </v-btn>
        <v-btn text to="/login">
          <v-icon left>mdi-login</v-icon>
          <span class="d-none d-sm-flex">Login</span>
        </v-btn>
      </template>
    </v-app-bar>

    <v-dialog v-model="showLogoutDialog" max-width="400">
      <v-card>
        <v-card-title class="text-h5">
          <v-icon left color="error">mdi-logout</v-icon>
          ออกจากระบบ
        </v-card-title>
        <v-card-text class="text-body-1">
          คุณต้องการออกจากระบบใช่หรือไม่?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="grey" @click="showLogoutDialog = false">ยกเลิก</v-btn>
          <v-btn text color="error" @click="confirmLogout" :loading="loggingOut">ออกจากระบบ</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex'

export default {
  name: 'App',
  data() {
    return {
      showLogoutDialog: false,
      loggingOut: false
    }
  },
  computed: {
    ...mapGetters('cart', ['cartCount']),
    ...mapState('auth', ['token', 'username']),
    isLoggedIn() {
      return !!this.token
    }
  },
  methods: {
    ...mapActions('auth', ['logout']),
    confirmLogout() {
      this.loggingOut = true
      setTimeout(() => {
        this.logout()
        this.showLogoutDialog = false
        this.loggingOut = false
        this.$router.push('/')
      }, 300)
    }
  }
};
</script>
