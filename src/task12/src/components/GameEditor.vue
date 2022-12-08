<template>
  <v-container fluid ma-0 pa-0 fill-height v-if="operations.length > 0">
    <v-row>
      <v-col class="d-flex justify-start">
        <v-btn x-large @click="cancelGame">
          <v-icon color="lightgray">mdi-window-close</v-icon>
          Отмена
        </v-btn>
      </v-col>
      <v-col class="d-flex justify-end mb-6">
        <TimerComponent :durationInMinutes="duration" @completed="onTimeComplete" />
      </v-col>
    </v-row>
    <v-row class="d-flex justify-center">
      <v-col cols="auto" class="value-field">
        <div class="value-field" v-for="(_, index) in values" :key="index" :id="index">
          <v-text-field
              single-line
              outlined
              v-model="values[index]"
              @focus="changeEditorFocus(index)"
              @change.prevent ="changeEditorValue"
              ref="valuesInputsRef">
          </v-text-field>
          <p class="ma-4 mb-8" v-if="index < operations.length">{{ operations[index] }}</p>
        </div>
        <p class="ma-4 mb-8"> = {{ resultValue }}</p>
      </v-col>
    </v-row>
    <v-row>
      <v-row class="d-flex justify-center">
        <v-col cols="4">
          <GameKeyboard @digitEnter="updateValue" @operationEnter="processOperation" />
        </v-col>
      </v-row>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { settingsService } from "@/services/SettingsService";
import { gameAttemptService } from "@/services/GameAttemptService";
import { calculateExpression } from "@/services/CalculateExpression";
import { useRouter } from "vue-router";
import TimerComponent from "@/components/TimerComponent.vue";
import GameKeyboard from "@/components/GameKeyboard.vue";


export default defineComponent({
  name: "GameEditor",
  components: {
    GameKeyboard,
    TimerComponent
  },
  setup() {
    const settings = settingsService.getSettings();
    const attempt = gameAttemptService.generateAttempt(settings);
    const values = ref<Array<number | null>>(attempt.values.map((value, index) => index === 0 ? value : null));
    const valuesInputsRef = ref<Array<HTMLElement> | null>(null);
    const router = useRouter();
    let currentIndex = ref(0);

    onMounted(() => {
      valuesInputsRef.value?.[0].focus();
    })

    function cancelGame() {
      router.push('/');
    }

    function onTimeComplete() {
      gameAttemptService.saveAttempt(attempt);
      alert(`Время истекло. Правильный ответ: ${attempt.expressionString}`);
      router.push('/');
    }

    function validateValue(value: number) {
      return value > 0 && value < 100;
    }
    function updateValue(digit: number) {
      const newValue = parseInt(`${values.value[currentIndex.value]?.toString() ?? ""}${digit.toString()}`);
      if(validateValue(newValue))
      {
        values.value[currentIndex.value] = newValue;
      }
    }

    function processOperation(operation: string) {
      let currentExpression : string;
      let expressionResult : number;
      switch (operation) {
        case "Left":
          currentIndex.value = Math.max(currentIndex.value - 1, 0);
          valuesInputsRef.value?.[currentIndex.value].focus();
          break;
        case "Right":
          currentIndex.value = Math.min(currentIndex.value + 1, values.value.length - 1);
          valuesInputsRef.value?.[currentIndex.value].focus();
          break;
        case "Submit":
          if(!values.value[0]) {
            return;
          }

          currentExpression = values.value[0]?.toString();
          for (let i = 1; i < values.value.length; i ++) {
            if(!values.value[i]) {
              return;
            }
            currentExpression += `${attempt.operations[i - 1]}${values.value[i]?.toString()}`
          }
          expressionResult = parseInt(calculateExpression(currentExpression));
          attempt.result = expressionResult === attempt.resultValue;
          gameAttemptService.saveAttempt(attempt);
          alert(attempt.result ? "Правильный ответ!" : `Неверный ответ. Правильный: ${attempt.expressionString}`);
          router.push('/');
          break
        default:
          throw Error(`Unexpected operation ${operation}`);
      }
    }

    function changeEditorFocus(index: number) {
      currentIndex.value = index;
    }

    function changeEditorValue(e: any) {
      const numValue = parseInt(e.target.value);
      if(!validateValue(numValue)) {
        values.value[currentIndex.value] = null;
      }
    }

    return {
      resultValue: attempt.resultValue.toString(),
      operations: attempt.operations,
      duration: settings.duration,
      values,
      currentIndex,
      valuesInputsRef: valuesInputsRef,
      cancelGame,
      onTimeComplete,
      updateValue,
      processOperation,
      changeEditorFocus,
      changeEditorValue,
    }
  }
})
</script>

<style scoped>
v-text-field{
  min-width: 400px!important;
}
.value-field {
  display: flex;
  flex-direction: row;
}
</style>