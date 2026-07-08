<template>
  <v-container class="mt-5">
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-card class="pa-6" elevation="8">
          <v-card-title class="justify-center text-h4 font-weight-bold mb-4">
            <v-icon large left color="primary">mdi-calculator</v-icon>
            ตรวจเกรด
          </v-card-title>

          <v-card-text>
            <v-text-field
              v-model.number="score"
              label="กรุณากรอกคะแนน (0 - 100)"
              type="number"
              min="0"
              max="100"
              outlined
              clearable
              :error-messages="errorMessage"
              @input="clearError"
            ></v-text-field>

            <v-btn
              block
              large
              color="primary"
              @click="calculateGrade"
              :disabled="score === null || score === ''"
            >
              <v-icon left>mdi-check-circle</v-icon>
              ตรวจเกรด
            </v-btn>

            <v-alert
              v-if="grade"
              :type="grade === 'F' ? 'error' : 'success'"
              class="mt-4 text-center"
              prominent
              transition="scale-transition"
            >
              <div class="text-h5 font-weight-bold">{{ grade }}</div>
              <div class="subtitle-1">
                คะแนน <strong>{{ numberResult }}</strong> ได้เกรด <strong>{{ grade }}</strong>
              </div>
            </v-alert>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "GradeExecute",
  data() {
    return {
      score: null,
      numberResult: null,
      grade: null,
      errorMessage: "",
    };
  },
  methods: {
    clearError() {
      this.errorMessage = "";
    },
    calculateGrade() {
      this.errorMessage = "";
      this.grade = null;
      this.numberResult = null;

      const val = Number(this.score);

      if (this.score === null || this.score === "") {
        this.errorMessage = "กรุณากรอกคะแนน";
        return;
      }

      if (isNaN(val) || !Number.isFinite(val)) {
        this.errorMessage = "กรุณากรอกเฉพาะตัวเลข";
        return;
      }

      if (val < 0 || val > 100) {
        this.errorMessage = "กรุณากรอกคะแนนในช่วง 0 - 100 เท่านั้น";
        return;
      }

      this.numberResult = val;

      if (val >= 80) this.grade = "A";
      else if (val >= 70) this.grade = "B";
      else if (val >= 60) this.grade = "C";
      else if (val >= 50) this.grade = "D";
      else this.grade = "F";
    },
  },
};
</script>
