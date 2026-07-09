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

      <v-btn
        text
        to="/login"
      >
        <span class="mr-2">Login</span>
      </v-btn>

      <v-btn
        text
        to="/register"
      >
        <span class="mr-2">Register</span>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>
