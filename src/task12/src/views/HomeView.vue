<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>Привет!</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <GameStatistics />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <GameSettings />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import GameSettings from "@/components/GameSettings.vue";
import GameStatistics from "@/components/GameStatistics.vue";

export default defineComponent({
  name: 'HomeView',

  components: {
    GameStatistics,
    GameSettings,
  },
});
</script>
