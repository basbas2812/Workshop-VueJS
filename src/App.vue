<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-btn
          text
          to="/"
        >
        <span class="mr-2">Home</span>
        </v-btn>
      </div>

      <v-spacer></v-spacer>

      <v-btn
        text
        to="/aboutme"
      >
        <span class="mr-2">About Me</span>
      </v-btn>

      <v-btn
        text
        to="/grade"
      >
        <span class="mr-2">Grade</span>
      </v-btn>

      <v-btn
        text
        to="/shop"
      >
        <span class="mr-2">Shop</span>
      </v-btn>

      <v-btn text to="/cart">
        <v-badge
          :content="cartCount"
          :value="cartCount"
          color="red"
          overlap
        >
          <v-icon>mdi-cart</v-icon>
        </v-badge>
        <span class="ml-1">Cart</span>
      </v-btn>

      <v-btn text to="/admin">
        <v-icon>mdi-cog</v-icon>
        <span class="ml-1">Manage</span>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'App',

  computed: {
    ...mapGetters('cart', ['cartCount'])
  }
};
</script>
