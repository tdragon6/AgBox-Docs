<template>
  <img :src="src" @click="previewImage = true" class="image" />
  <Teleport v-if="previewImage === true" to="body">
    <div @click="previewImage = false" class="preview-modal">
      <img :src="src" class="preview-image" />
    </div>
  </Teleport>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  const props = defineProps<{ src: string }>();

  const previewImage = ref(false);
</script>

<style scoped>
  .image {
    border-radius: 8px;
    transition: transform 0.2s;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.15);
    cursor: zoom-in;
  }

  .image:hover {
    transform: scale(1.02);
    box-shadow: 0 0 12px rgba(0, 0, 0, 0.3);
  }

  .preview-modal {
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.85);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    cursor: zoom-out;
  }

  .preview-image {
    max-width: 95vw;
    max-height: 95vh;
    border-radius: 8px;
  }
</style>