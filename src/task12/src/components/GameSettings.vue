<template>
  <h2>Настройки</h2>
  <form>
    <label class="range-container">
      <input type="range" id="duration" v-model="settings.duration"
             min="1" max="15" @input="updateDuration">
      Длительность: {{ settings.duration }} минут
    </label>
    <label class="range-container">
      <input type="range" id="complexity" v-model="settings.complexity"
             min="1" max="10" @input="updateComplexity">
      Сложность: {{ settings.complexity }}
    </label>
    <label class="checkbox-container">Суммирование
      <input type="checkbox" id="sum" value="+" v-model="settings.operations" @input="updateOptions">
      <span class="checkmark"></span>
    </label>
    <label class="checkbox-container">Разность
      <input type="checkbox" id="residual" value="-" v-model="settings.operations" @input="updateOptions">
      <span class="checkmark"></span>
    </label>
    <label class="checkbox-container">Умножение
      <input type="checkbox" id="multiplication" value="*" v-model="settings.operations" @input="updateOptions">
      <span class="checkmark"></span>
    </label>
    <label class="checkbox-container">Деление
      <input type="checkbox" id="division" value="/" v-model="settings.operations" @input="updateOptions">
      <span class="checkmark"></span>
    </label>
    <label class="checkbox-container">Возведение в степень
      <input type="checkbox" id="exponentiation" value="^" v-model="settings.operations" @input="updateOptions">
      <span class="checkmark"></span>
    </label>
  </form>
  <v-btn class="play-button" @click="playClick">
    Play!
  </v-btn>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { settingsService } from "@/services/SettingsService";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "GameSettings",
  setup() {
    const settings = ref(settingsService.getSettings());

    const router = useRouter();

    function updateDuration(event: any) {
      settings.value.duration = parseInt(event.target.value);
      settingsService.setSettings(settings.value);
    }

    function updateComplexity(event: any) {
      settings.value.complexity = parseInt(event.target.value);
      settingsService.setSettings(settings.value);
    }

    function updateOptions(event: any) {
      if(event.target.checked) {
        settings.value.operations.push(event.target.value);
      }
      else {
        settings.value.operations = settings.value.operations.filter(o => o !== event.target.value);
      }
      settingsService.setSettings(settings.value);
    }

    function playClick() {
      router.push('game');
    }

    return {
      settings,
      updateDuration,
      updateComplexity,
      updateOptions,
      playClick
    }

  },
  methods: {
  }
})
</script>

<style scoped>
h2 {
  text-align: left;
}

.range-container {
  display: flex;
  flex-direction: column;
  align-items: start;
  margin: 15px 0;
}

.range-container input {
  margin-bottom: 15px;
  width: 250px;
  accent-color: #2196F3;
}

.checkbox-container {
  text-align: left;
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.checkbox-container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 20px;
  width: 20px;
  background-color: #eee;
}

.checkbox-container:hover input ~ .checkmark {
  background-color: #ccc;
}

.checkbox-container input:checked ~ .checkmark {
  background-color: #2196F3;
}

.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

.checkbox-container input:checked ~ .checkmark:after {
  display: block;
}

.checkbox-container .checkmark:after {
  left: 7px;
  top: 3px;
  width: 4px;
  height: 7px;
  border: solid white;
  border-width: 0 2px 2px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}

.play-button {
  position: absolute;
  bottom: 10px;
  left: 99%;
  margin-left: -104.5px; /*104.5px is half of the button width*/
}

</style>