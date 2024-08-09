<!--suppress CssUnusedSymbol -->
<script setup lang="ts">
import MarkdownIt from "markdown-it";
import hljs from "highlight.js";
import "github-markdown-css";
import { useThemeStore } from "@izhimu/seas-core";

const themeStore = useThemeStore();

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
  <div
    :class="[
      'markdown-body',
      themeStore.themeRef === 'dark'
        ? 'markdown-body-dark'
        : 'markdown-body-light',
    ]"
    v-html="markdown.render(props.content)"
  />
</template>

<style scoped>
.markdown-body {
  background-color: unset;
  color: unset;
}

.markdown-body-dark {
  color-scheme: dark;
  --focus-outlineColor: #1f6feb;
  --fgColor-default: #e6edf3;
  --fgColor-muted: #8d96a0;
  --fgColor-accent: #4493f8;
  --fgColor-success: #3fb950;
  --fgColor-attention: #d29922;
  --fgColor-danger: #f85149;
  --fgColor-done: #ab7df8;
  --bgColor-default: #0d1117;
  --bgColor-muted: #161b22;
  --bgColor-neutral-muted: #6e768166;
  --bgColor-attention-muted: #bb800926;
  --borderColor-default: #30363d;
  --borderColor-muted: #30363db3;
  --borderColor-neutral-muted: #6e768166;
  --borderColor-accent-emphasis: #1f6feb;
  --borderColor-success-emphasis: #238636;
  --borderColor-attention-emphasis: #9e6a03;
  --borderColor-danger-emphasis: #da3633;
  --borderColor-done-emphasis: #8957e5;
  --color-prettylights-syntax-comment: #8b949e;
  --color-prettylights-syntax-constant: #79c0ff;
  --color-prettylights-syntax-constant-other-reference-link: #a5d6ff;
  --color-prettylights-syntax-entity: #d2a8ff;
  --color-prettylights-syntax-storage-modifier-import: #c9d1d9;
  --color-prettylights-syntax-entity-tag: #7ee787;
  --color-prettylights-syntax-keyword: #ff7b72;
  --color-prettylights-syntax-string: #a5d6ff;
  --color-prettylights-syntax-variable: #ffa657;
  --color-prettylights-syntax-brackethighlighter-unmatched: #f85149;
  --color-prettylights-syntax-brackethighlighter-angle: #8b949e;
  --color-prettylights-syntax-invalid-illegal-text: #f0f6fc;
  --color-prettylights-syntax-invalid-illegal-bg: #8e1519;
  --color-prettylights-syntax-carriage-return-text: #f0f6fc;
  --color-prettylights-syntax-carriage-return-bg: #b62324;
  --color-prettylights-syntax-string-regexp: #7ee787;
  --color-prettylights-syntax-markup-list: #f2cc60;
  --color-prettylights-syntax-markup-heading: #1f6feb;
  --color-prettylights-syntax-markup-italic: #c9d1d9;
  --color-prettylights-syntax-markup-bold: #c9d1d9;
  --color-prettylights-syntax-markup-deleted-text: #ffdcd7;
  --color-prettylights-syntax-markup-deleted-bg: #67060c;
  --color-prettylights-syntax-markup-inserted-text: #aff5b4;
  --color-prettylights-syntax-markup-inserted-bg: #033a16;
  --color-prettylights-syntax-markup-changed-text: #ffdfb6;
  --color-prettylights-syntax-markup-changed-bg: #5a1e02;
  --color-prettylights-syntax-markup-ignored-text: #c9d1d9;
  --color-prettylights-syntax-markup-ignored-bg: #1158c7;
  --color-prettylights-syntax-meta-diff-range: #d2a8ff;
  --color-prettylights-syntax-sublimelinter-gutter-mark: #484f58;
}

.markdown-body-light {
  color-scheme: light;
  --focus-outlineColor: #0969da;
  --fgColor-default: #1f2328;
  --fgColor-muted: #636c76;
  --fgColor-accent: #0969da;
  --fgColor-success: #1a7f37;
  --fgColor-attention: #9a6700;
  --fgColor-danger: #d1242f;
  --fgColor-done: #8250df;
  --bgColor-default: #ffffff;
  --bgColor-muted: #f6f8fa;
  --bgColor-neutral-muted: #afb8c133;
  --bgColor-attention-muted: #fff8c5;
  --borderColor-default: #d0d7de;
  --borderColor-muted: #d0d7deb3;
  --borderColor-neutral-muted: #afb8c133;
  --borderColor-accent-emphasis: #0969da;
  --borderColor-success-emphasis: #1a7f37;
  --borderColor-attention-emphasis: #bf8700;
  --borderColor-danger-emphasis: #cf222e;
  --borderColor-done-emphasis: #8250df;
  --color-prettylights-syntax-comment: #57606a;
  --color-prettylights-syntax-constant: #0550ae;
  --color-prettylights-syntax-constant-other-reference-link: #0a3069;
  --color-prettylights-syntax-entity: #6639ba;
  --color-prettylights-syntax-storage-modifier-import: #24292f;
  --color-prettylights-syntax-entity-tag: #0550ae;
  --color-prettylights-syntax-keyword: #cf222e;
  --color-prettylights-syntax-string: #0a3069;
  --color-prettylights-syntax-variable: #953800;
  --color-prettylights-syntax-brackethighlighter-unmatched: #82071e;
  --color-prettylights-syntax-brackethighlighter-angle: #57606a;
  --color-prettylights-syntax-invalid-illegal-text: #f6f8fa;
  --color-prettylights-syntax-invalid-illegal-bg: #82071e;
  --color-prettylights-syntax-carriage-return-text: #f6f8fa;
  --color-prettylights-syntax-carriage-return-bg: #cf222e;
  --color-prettylights-syntax-string-regexp: #116329;
  --color-prettylights-syntax-markup-list: #3b2300;
  --color-prettylights-syntax-markup-heading: #0550ae;
  --color-prettylights-syntax-markup-italic: #24292f;
  --color-prettylights-syntax-markup-bold: #24292f;
  --color-prettylights-syntax-markup-deleted-text: #82071e;
  --color-prettylights-syntax-markup-deleted-bg: #ffebe9;
  --color-prettylights-syntax-markup-inserted-text: #116329;
  --color-prettylights-syntax-markup-inserted-bg: #dafbe1;
  --color-prettylights-syntax-markup-changed-text: #953800;
  --color-prettylights-syntax-markup-changed-bg: #ffd8b5;
  --color-prettylights-syntax-markup-ignored-text: #eaeef2;
  --color-prettylights-syntax-markup-ignored-bg: #0550ae;
  --color-prettylights-syntax-meta-diff-range: #8250df;
  --color-prettylights-syntax-sublimelinter-gutter-mark: #8c959f;
}
</style>

<style>
pre code.hljs {
  display: block;
  overflow-x: auto;
  padding: 1em;
}

code.hljs {
  padding: 3px 5px;
}

.markdown-body-dark .hljs {
  color: #c9d1d9;
  background: #0d1117;
}

.markdown-body-dark .hljs-doctag,
.markdown-body-dark .hljs-keyword,
.markdown-body-dark .hljs-meta .hljs-keyword,
.markdown-body-dark .hljs-template-tag,
.markdown-body-dark .hljs-template-variable,
.markdown-body-dark .hljs-type,
.markdown-body-dark .hljs-variable.language_ {
  color: #ff7b72;
}

.markdown-body-dark .hljs-title,
.markdown-body-dark .hljs-title.class_,
.markdown-body-dark .hljs-title.class_.inherited__,
.markdown-body-dark .hljs-title.function_ {
  color: #d2a8ff;
}

.markdown-body-dark .hljs-attr,
.markdown-body-dark .hljs-attribute,
.markdown-body-dark .hljs-literal,
.markdown-body-dark .hljs-meta,
.markdown-body-dark .hljs-number,
.markdown-body-dark .hljs-operator,
.markdown-body-dark .hljs-selector-attr,
.markdown-body-dark .hljs-selector-class,
.markdown-body-dark .hljs-selector-id,
.markdown-body-dark .hljs-variable {
  color: #79c0ff;
}

.markdown-body-dark .hljs-meta .hljs-string,
.markdown-body-dark .hljs-regexp,
.markdown-body-dark .hljs-string {
  color: #a5d6ff;
}

.markdown-body-dark .hljs-built_in,
.markdown-body-dark .hljs-symbol {
  color: #ffa657;
}

.markdown-body-dark .hljs-code,
.markdown-body-dark .hljs-comment,
.markdown-body-dark .hljs-formula {
  color: #8b949e;
}

.markdown-body-dark .hljs-name,
.markdown-body-dark .hljs-quote,
.markdown-body-dark .hljs-selector-pseudo,
.markdown-body-dark .hljs-selector-tag {
  color: #7ee787;
}

.markdown-body-dark .hljs-subst {
  color: #c9d1d9;
}

.markdown-body-dark .hljs-section {
  color: #1f6feb;
  font-weight: 700;
}

.markdown-body-dark .hljs-bullet {
  color: #f2cc60;
}

.markdown-body-dark .hljs-emphasis {
  color: #c9d1d9;
  font-style: italic;
}

.markdown-body-dark .hljs-strong {
  color: #c9d1d9;
  font-weight: 700;
}

.markdown-body-dark .hljs-addition {
  color: #aff5b4;
  background-color: #033a16;
}

.markdown-body-dark .hljs-deletion {
  color: #ffdcd7;
  background-color: #67060c;
}

.markdown-body-light hljs {
  color: #24292e;
  background: #fff;
}

.markdown-body-light .hljs-doctag,
.markdown-body-light .hljs-keyword,
.markdown-body-light .hljs-meta .hljs-keyword,
.markdown-body-light .hljs-template-tag,
.markdown-body-light .hljs-template-variable,
.markdown-body-light .hljs-type,
.markdown-body-light .hljs-variable.language_ {
  color: #d73a49;
}

.markdown-body-light .hljs-title,
.markdown-body-light .hljs-title.class_,
.markdown-body-light .hljs-title.class_.inherited__,
.markdown-body-light .hljs-title.function_ {
  color: #6f42c1;
}

.markdown-body-light .hljs-attr,
.markdown-body-light .hljs-attribute,
.markdown-body-light .hljs-literal,
.markdown-body-light .hljs-meta,
.markdown-body-light .hljs-number,
.markdown-body-light .hljs-operator,
.markdown-body-light .hljs-selector-attr,
.markdown-body-light .hljs-selector-class,
.markdown-body-light .hljs-selector-id,
.markdown-body-light .hljs-variable {
  color: #005cc5;
}

.markdown-body-light .hljs-meta .hljs-string,
.markdown-body-light .hljs-regexp,
.markdown-body-light .hljs-string {
  color: #032f62;
}

.markdown-body-light .hljs-built_in,
.markdown-body-light .hljs-symbol {
  color: #e36209;
}

.markdown-body-light .hljs-code,
.markdown-body-light .hljs-comment,
.markdown-body-light .hljs-formula {
  color: #6a737d;
}

.markdown-body-light .hljs-name,
.markdown-body-light .hljs-quote,
.markdown-body-light .hljs-selector-pseudo,
.markdown-body-light .hljs-selector-tag {
  color: #22863a;
}

.markdown-body-light .hljs-subst {
  color: #24292e;
}

.markdown-body-light .hljs-section {
  color: #005cc5;
  font-weight: 700;
}

.markdown-body-light .hljs-bullet {
  color: #735c0f;
}

.markdown-body-light .hljs-emphasis {
  color: #24292e;
  font-style: italic;
}

.markdown-body-light .hljs-strong {
  color: #24292e;
  font-weight: 700;
}

.markdown-body-light .hljs-addition {
  color: #22863a;
  background-color: #f0fff4;
}

.markdown-body-light .hljs-deletion {
  color: #b31d28;
  background-color: #ffeef0;
}
</style>
