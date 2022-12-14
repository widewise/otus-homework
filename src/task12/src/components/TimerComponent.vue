<template>
  <div class="timer-container">
    {{ minutes }} : {{ seconds }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: "TimerComponent",
  props: {
    durationInMinutes: {
      type: Number,
      required: true
    }
  },
  emits: ['completed'],
  data: function () {
    const currentDate = new Date();
    const dTime = new Date();
    dTime.setMinutes(currentDate.getMinutes() + this.durationInMinutes);
    return {
      currentTime: dTime.getTime() - currentDate.getTime(),
      deadline: dTime
    }
  },
  mounted() {
    setTimeout(this.countDown, 1000);
  },
  computed: {
    seconds() {
      return Math.floor((this.currentTime / 1000) % 60);
    },
    minutes() {
      return Math.floor((this.currentTime / 1000 / 60) % 60);
    }
  },
  methods: {
    countDown() {
      this.currentTime = this.deadline.getTime() - new Date().getTime();
      if(this.currentTime > 0) {
        setTimeout(this.countDown, 1);
      }
      else {
        this.currentTime = 0;
        this.$emit('completed');
      }
    }
  }
})
</script>

<style scoped>
.timer-container {
  width: 160px;
  min-width: 80px;
  background-color: #f7f6f6;
  color: gray;
  border: 2px solid #d8e3fa;
  border-right: 30px solid #d8e3fa;
  padding: 5px;
  font-size: 20px;
  text-align: end;
}
</style>