<script setup lang="ts">
import MarkdownIt from "markdown-it";
import "github-markdown-css";
import "highlight.js/styles/github.min.css";
import hljs from "highlight.js";

const props = withDefaults(
  defineProps<{
    content: string | null;
  }>(),
  {
    content: "",
  },
);

const markdown = new MarkdownIt({
  highlight: (code: string, lang: string) => {
    // 此处判断是否有添加代码语言
    if (lang && hljs.getLanguage(lang)) {
      try {
        // 得到经过highlight.js之后的html代码
        const preCode = hljs.highlight(code, {
          language: lang,
          ignoreIllegals: true,
        }).value;
        // 以换行进行分割
        const lines = preCode.split(/\n/).slice(0, -1);
        // 添加自定义行号
        let html = lines
          .map((item, index) => {
            return `<li><span class="line-num" data-line="${
              index + 1
            }"></span>${item}</li>`;
          })
          .join("");
        html = `<ol>${html}</ol>`;
        // 添加代码语言
        if (lines.length) {
          html += `<b class="name">${lang}</b>`;
        }
        return `<pre class="hljs"><code>${html}</code></pre>`;
      } catch (__) {}
    }
    // 未添加代码语言，此处与上面同理
    const preCode = markdown.utils.escapeHtml(code);
    const lines = preCode.split(/\n/).slice(0, -1);
    let html = lines
      .map((item: string, index: number) => {
        return `<li><span class="line-num" data-line="${index + 1}"></span>${
          item
        }</li>`;
      })
      .join("");
    html = `<ol>${html}</ol>`;
    return `<pre class="hljs"><code>${html}</code></pre>`;
  },
});
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
