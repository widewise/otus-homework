<template>
  <v-container>
    <v-row>
      <v-col class="d-flex justify-center"><v-btn class="keyboard-btn digits-btn" @click="digitBtnClick">1</v-btn></v-col>
      <v-col class="d-flex justify-center"><v-btn class="keyboard-btn digits-btn" @click="digitBtnClick">2</v-btn></v-col>
      <v-col class="d-flex justify-center"><v-btn class="keyboard-btn digits-btn" @click="digitBtnClick">3</v-btn></v-col>
      <v-col class="d-flex justify-center"><v-btn class="keyboard-btn operation-btn" @click="operationBtnClick">&lt;</v-btn></v-col>
    </v-row>
    <v-row>
      <v-col class="d-flex justify-center"><v-btn class="keyboard-btn digits-btn" @click="digitBtnClick">4</v-btn></v-col>
      <v-col class="d-flex justify-center"><v-btn class="keyboard-btn digits-btn" @click="digitBtnClick">5</v-btn></v-col>
      <v-col class="d-flex justify-center"><v-btn class="keyboard-btn digits-btn" @click="digitBtnClick">6</v-btn></v-col>
      <v-col class="d-flex justify-center"><v-btn class="keyboard-btn operation-btn" @click="operationBtnClick">&gt;</v-btn></v-col>
    </v-row>
    <v-row>
      <v-col class="d-flex justify-center"><v-btn class="keyboard-btn digits-btn" @click="digitBtnClick">7</v-btn></v-col>
      <v-col class="d-flex justify-center"><v-btn class="keyboard-btn digits-btn" @click="digitBtnClick">8</v-btn></v-col>
      <v-col class="d-flex justify-center"><v-btn class="keyboard-btn digits-btn" @click="digitBtnClick">9</v-btn></v-col>
      <v-col class="d-flex justify-center"><v-btn class="keyboard-btn operation-btn" @click="operationBtnClick">=</v-btn></v-col>
    </v-row>
    <v-row>
      <v-col class="d-flex justify-center"><v-btn class="keyboard-btn digits-btn" @click="digitBtnClick">0</v-btn></v-col>
    </v-row>
  </v-container>
</template>

<script>

export default {
  name: "GameKeyboard",
  emits: ['digitEnter', 'operationEnter'],
  methods: {
    digitBtnClick(e) {
      const digit = parseInt(e.target.innerText);
      this.$emit('digitEnter', digit);
    },
    operationBtnClick(e) {
      switch (e.target.innerText){
        case "<":
          this.$emit('operationEnter', "Left");
          break;
        case ">":
          this.$emit('operationEnter', "Right");
          break;
        case "=":
          this.$emit('operationEnter', "Submit");
          break;
      }
    }
  }
}
</script>

<style scoped>
.keyboard-btn {
  min-width: 37px!important;
  max-width: 37px!important;
  border-radius: 20px;
}
.digits-btn {
  background-color: #ee7a4e;
}
.operation-btn {
  background-color: #7a7a7a;
}
</style>