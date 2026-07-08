<template>
  <v-container class="mt-5">
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card class="pa-6" elevation="8">
          <v-row align="center" justify="center">
            <v-col cols="auto">
              <v-avatar size="120" color="primary" class="mb-4">
                <span class="white--text text-h3">ช</span>
              </v-avatar>
            </v-col>
          </v-row>

          <v-card-title class="justify-center text-h4 font-weight-bold">
            ชัยณัฐ ลัมยศ
          </v-card-title>

          <v-divider class="mb-4"></v-divider>

          <v-list-item>
            <v-list-item-icon>
              <v-icon color="primary">mdi-school</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="font-weight-medium"
                >การศึกษา</v-list-item-title
              >
              <v-list-item-subtitle>มหาวิทยาลัยแม่โจ้</v-list-item-subtitle>
              <v-list-item-subtitle>สาขาเทคโนโลยีสารสนเทศ</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon color="primary">mdi-gamepad-variant</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="font-weight-medium"
                >งานอดิเรก</v-list-item-title
              >
              <v-list-item-subtitle>ดูหนัง เล่นเกม</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon color="primary">mdi-star</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="font-weight-medium"
                >จุดแข็ง</v-list-item-title
              >
              <v-list-item-subtitle>เรียนรู้เร็ว</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon color="primary">mdi-alert</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="font-weight-medium"
                >จุดอ่อน</v-list-item-title
              >
              <v-list-item-subtitle>พูดไม่เก่ง</v-list-item-subtitle>
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
