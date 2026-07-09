<template>
  <v-container class="mt-5">
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card class="pa-6" elevation="8">
          <v-row align="center" justify="center">
            <v-col cols="auto">
              <v-avatar size="130" class="mb-4">
                <img :src="require('@/assets/ProfileMeme.png')" alt="Profile" />
              </v-avatar>
            </v-col>
          </v-row>

          <v-card-title class="justify-center text-h4 font-weight-bold">
            ชัยณัฐ ลัมยศ
          </v-card-title>

          <v-card-subtitle class="text-center text-subtitle-1 mb-2">
            ชื่อเล่น บาส
          </v-card-subtitle>

          <v-divider class="mb-4"></v-divider>

          <v-list-item>
            <v-list-item-icon>
              <v-icon color="primary">mdi-school</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="font-weight-medium">การศึกษา</v-list-item-title>
              <v-list-item-subtitle>มหาวิทยาลัยแม่โจ้</v-list-item-subtitle>
              <v-list-item-subtitle>สาขาเทคโนโลยีสารสนเทศ</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon color="primary">mdi-gamepad-variant</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="font-weight-medium">งานอดิเรก</v-list-item-title>
              <v-list-item-subtitle>ดูหนัง เล่นเกม</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon color="primary">mdi-star</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="font-weight-medium">จุดแข็ง</v-list-item-title>
              <v-list-item-subtitle>เรียนรู้เร็ว</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon color="primary">mdi-alert</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="font-weight-medium">จุดอ่อน</v-list-item-title>
              <v-list-item-subtitle>พูดไม่เก่ง</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-divider class="my-4"></v-divider>

          <v-card-title class="justify-center text-h6 font-weight-medium mb-2">
            ช่องทางติดต่อ
          </v-card-title>

          <v-row justify="center" class="px-4">
            <v-col cols="6">
              <v-btn
                block
                outlined
                color="primary"
                href="https://www.facebook.com/bas.bas.524/"
                target="_blank"
                class="mb-2"
              >
                <v-icon left>mdi-facebook</v-icon>
                Facebook
              </v-btn>
            </v-col>
            <v-col cols="6">
              <v-btn
                block
                outlined
                color="primary"
                href="https://github.com/basbas2812"
                target="_blank"
                class="mb-2"
              >
                <v-icon left>mdi-github</v-icon>
                GitHub
              </v-btn>
            </v-col>
          </v-row>

          <v-list-item>
            <v-list-item-icon>
              <v-icon color="primary">mdi-email</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="font-weight-medium">Email</v-list-item-title>
              <v-list-item-subtitle>basbas2812@gmail.com</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon color="primary">mdi-message-text</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="font-weight-medium">Line ID</v-list-item-title>
              <v-list-item-subtitle>basbas2684</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "AboutMe",
};
</script>
