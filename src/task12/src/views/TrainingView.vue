<template>
  <GameEditor />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import GameEditor from "@/components/GameEditor.vue";

export default defineComponent({
  name: 'HomeView',
  components: {
    GameEditor,
  },
});
</script>