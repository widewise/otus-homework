<template>
  <p class="statistics-text">
    Добро пожаловать на {{ day }} тренировочный день,<br>
    Ваш последний результат - решено {{ successCount }} из {{ totalCount }}.<br>
    Общая точность {{ successPercent }}%.
  </p>
</template>

<script lang="ts">
import { gameAttemptService } from "@/services/GameAttemptService";

export default {
  name: "GameStatistics",
  setup() {
    const statistics = gameAttemptService.getStatistics();
    return {
      day: statistics.TotalCount -1,
      successCount: statistics.SuccessCount,
      totalCount: statistics.TotalCount,
      successPercent: statistics.SuccessPercent
    }
  }
}
</script>

<style scoped>
</style>