<script setup lang="ts"></script>

<template>
  <router-view v-slot="{ Component }">
    <component :is="Component" />
  </router-view>
</template>

<style>
* {
  margin: 0;
  padding: 0;
}

#app {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.app-space {
  width: 100vw;
  height: 100vh;
  border-radius: unset;
}

/*noinspection CssUnusedSymbol*/
.box-content {
  padding: 16px;
}

.fill-width {
  width: 100%;
}

.state-box {
  margin: 10%;
}
</style>
