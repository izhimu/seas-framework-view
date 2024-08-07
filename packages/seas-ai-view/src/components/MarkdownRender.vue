<script setup lang="ts">
import MarkdownIt from "markdown-it";
import "github-markdown-css";

const props = withDefaults(
  defineProps<{
    content: string | null;
  }>(),
  {
    content: "",
  },
);

const markdown = new MarkdownIt();
</script>

<template>
  <div class="markdown-body" v-html="markdown.render(props.content)" />
</template>

<style scoped>
.markdown-body {
  background-color: unset;
  color: unset;
}
</style>
