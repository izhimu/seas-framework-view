# @izhimu/seas-ai-view

AI integration components providing chat interfaces, prompt management, and AI-powered features for SEAS applications.

## Overview

`@izhimu/seas-ai-view` provides comprehensive AI integration components including chat interfaces, prompt engineering tools, AI-assisted workflows, and integration with popular AI services (OpenAI, Claude, etc.).

## Installation

```bash
# For SEAS framework packages (using workspace protocol)
pnpm add @izhimu/seas-ai-view

# For external projects
pnpm add @izhimu/seas-ai-view --registry=https://izhimu-npm.pkg.coding.net/seas/npm-releases/
```

## Key Features

### 1. Chat Interface

#### ChatBox

```vue
<script setup lang="ts">
import { ChatBox } from '@izhimu/seas-ai-view'

const messages = ref([
  {
    id: '1',
    role: 'assistant',
    content: 'Hello! How can I help you today?'
  }
])

const loading = ref(false)

const handleSend = async (content: string) => {
  // Add user message
  messages.value.push({
    id: Date.now().toString(),
    role: 'user',
    content
  })

  loading.value = true

  // Call AI API
  const response = await aiApi.chat({
    messages: messages.value
  })

  // Add assistant response
  messages.value.push({
    id: Date.now().toString(),
    role: 'assistant',
    content: response.message
  })

  loading.value = false
}
</script>

<template>
  <ChatBox
    :messages="messages"
    :loading="loading"
    @send="handleSend"
  />
</template>
```

#### Message Types

```typescript
interface ChatMessage {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp?: Date
  metadata?: {
    model?: string
    tokens?: number
    cost?: number
  }
}
```

### 2. Prompt Management

#### PromptEditor

```vue
<script setup lang="ts">
import { PromptEditor } from '@izhimu/seas-ai-view'

const prompt = ref({
  name: 'Code Review',
  description: 'Review code for best practices',
  template: 'Please review the following code:\n\n{code}\n\nFocus on:\n- Code quality\n- Performance\n- Security',
  variables: ['code']
})

const handleSave = async (prompt: Prompt) => {
  await promptApi.save(prompt)
}
</script>

<template>
  <PromptEditor
    v-model="prompt"
    @save="handleSave"
  />
</template>
```

#### PromptLibrary

```vue
<script setup lang="ts">
import { PromptLibrary } from '@izhimu/seas-ai-view'

const prompts = ref([])

onMounted(async () => {
  prompts.value = await promptApi.getList()
})

const handleUse = async (prompt: Prompt) => {
  // Apply prompt to chat
  console.log('Using prompt:', prompt.template)
}
</script>

<template>
  <PromptLibrary
    :prompts="prompts"
    @use="handleUse"
  />
</template>
```

### 3. AI-Assisted Features

#### CodeAssistant

```vue
<script setup lang="ts">
import { CodeAssistant } from '@izhimu/seas-ai-view'

const code = ref('function hello() {\n  console.log("Hello")\n}')

const handleGenerate = async (instruction: string) => {
  const result = await aiApi.generateCode({
    instruction,
    context: code.value
  })
  code.value = result.code
}

const handleExplain = async () => {
  const explanation = await aiApi.explainCode({
    code: code.value
  })
  console.log('Explanation:', explanation)
}

const handleReview = async () => {
  const review = await aiApi.reviewCode({
    code: code.value
  })
  console.log('Review:', review)
}
</script>

<template>
  <CodeAssistant
    v-model="code"
    @generate="handleGenerate"
    @explain="handleExplain"
    @review="handleReview"
  />
</template>
```

#### TextCompletion

```vue
<script setup lang="ts">
import { TextCompletion } from '@izhimu/seas-ai-view'

const text = ref('')
const suggestions = ref([])

const handleComplete = async (input: string) => {
  suggestions.value = await aiApi.complete({
    text: input,
    maxSuggestions: 5
  })
}
</script>

<template>
  <TextCompletion
    v-model="text"
    :suggestions="suggestions"
    @input="handleComplete"
  />
</template>
```

### 4. AI Models Integration

#### ModelSelector

```vue
<script setup lang="ts">
import { ModelSelector } from '@izhimu/seas-ai-view'

const models = [
  {
    id: 'gpt-4',
    name: 'GPT-4',
    provider: 'openai',
    capabilities: ['chat', 'completion']
  },
  {
    id: 'claude-3-opus',
    name: 'Claude 3 Opus',
    provider: 'anthropic',
    capabilities: ['chat', 'analysis']
  }
]

const selectedModel = ref(models[0])

const handleModelChange = (model: AIModel) => {
  selectedModel.value = model
  // Update AI API to use new model
  aiApi.setModel(model.id)
}
</script>

<template>
  <ModelSelector
    :models="models"
    :model="selectedModel"
    @change="handleModelChange"
  />
</template>
```

### 5. Streaming Responses

#### StreamingChat

```vue
<script setup lang="ts">
import { StreamingChat } from '@izhimu/seas-ai-view'

const handleStream = async (message: string) => {
  const stream = await aiApi.streamChat({
    message,
    onChunk: (chunk) => {
      console.log('Received:', chunk)
    },
    onComplete: (fullMessage) => {
      console.log('Complete:', fullMessage)
    }
  })
}
</script>

<template>
  <StreamingChat @send="handleStream" />
</template>
```

### 6. AI Workflows

#### WorkflowBuilder

```vue
<script setup lang="ts">
import { WorkflowBuilder } from '@izhimu/seas-ai-view'

const workflow = ref({
  name: 'Document Analysis',
  steps: [
    {
      id: '1',
      type: 'input',
      name: 'Upload Document',
      config: {}
    },
    {
      id: '2',
      type: 'ai',
      name: 'Summarize',
      config: {
        model: 'gpt-4',
        prompt: 'Summarize this document'
      }
    },
    {
      id: '3',
      type: 'output',
      name: 'Save Summary',
      config: {}
    }
  ]
})

const handleExecute = async () => {
  const result = await workflowApi.execute(workflow.value)
  console.log('Workflow result:', result)
}
</script>

<template>
  <WorkflowBuilder
    v-model="workflow"
    @execute="handleExecute"
  />
</template>
```

### 7. Knowledge Base

#### KnowledgeBase

```vue
<script setup lang="ts">
import { KnowledgeBase } from '@izhimu/seas-ai-view'

const documents = ref([])

const handleUpload = async (file: File) => {
  await kbApi.upload(file)
  documents.value = await kbApi.list()
}

const handleQuery = async (question: string) => {
  const answer = await kbApi.query({
    question,
    documents: documents.value.map(d => d.id)
  })
  return answer
}
</script>

<template>
  <KnowledgeBase
    :documents="documents"
    @upload="handleUpload"
    @query="handleQuery"
  />
</template>
```

### 8. AI Analytics

#### UsageAnalytics

```vue
<script setup lang="ts">
import { UsageAnalytics } from '@izhimu/seas-ai-view'

const analytics = ref({
  totalRequests: 0,
  totalTokens: 0,
  totalCost: 0,
  byModel: {},
  byDate: []
})

onMounted(async () => {
  analytics.value = await aiApi.getAnalytics({
    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    endDate: new Date()
  })
})
</script>

<template>
  <UsageAnalytics :data="analytics" />
</template>
```

## Configuration

### AI Provider Setup

```typescript
// ai.config.ts
import { configureAI } from '@izhimu/seas-ai-view'

configureAI({
  defaultProvider: 'openai',
  providers: {
    openai: {
      apiKey: process.env.VITE_OPENAI_API_KEY,
      baseURL: 'https://api.openai.com/v1',
      models: ['gpt-4', 'gpt-3.5-turbo']
    },
    anthropic: {
      apiKey: process.env.VITE_ANTHROPIC_API_KEY,
      baseURL: 'https://api.anthropic.com/v1',
      models: ['claude-3-opus', 'claude-3-sonnet']
    }
  }
})
```

### Rate Limiting

```typescript
import { setRateLimit } from '@izhimu/seas-ai-view'

setRateLimit({
  maxRequestsPerMinute: 60,
  maxTokensPerMinute: 90000
})
```

## API Reference

### Components

| Component | Description |
|-----------|-------------|
| `ChatBox` | Chat interface with messages |
| `StreamingChat` | Chat with streaming responses |
| `PromptEditor` | Prompt template editor |
| `PromptLibrary` | Prompt template library |
| `CodeAssistant` | AI-assisted coding |
| `TextCompletion` | Text completion suggestions |
| `ModelSelector` | AI model selection |
| `WorkflowBuilder` | AI workflow builder |
| `KnowledgeBase` | Document knowledge base |
| `UsageAnalytics` | AI usage analytics |

### Composables

| Composable | Description |
|------------|-------------|
| `useAI` | AI API client |
| `useChat` | Chat state management |
| `usePrompt` | Prompt management |
| `useStream` | Streaming response handling |

## Use Cases

### 1. Customer Support Chat

```vue
<script setup lang="ts">
import { ChatBox } from '@izhimu/seas-ai-view'

const systemPrompt = `You are a customer support assistant.
Help users with their questions about our product.`

const handleSend = async (content: string) => {
  const response = await aiApi.chat({
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content }
    ]
  })
  return response.message
}
</script>
```

### 2. Code Review Assistant

```vue
<script setup lang="ts">
import { CodeAssistant } from '@izhimu/seas-ai-view'

const reviewCode = async (code: string) => {
  const review = await aiApi.reviewCode({
    code,
    focus: ['security', 'performance', 'best-practices']
  })
  return review
}
</script>
```

### 3. Document Summarization

```vue
<script setup lang="ts">
import { DocumentSummarizer } from '@izhimu/seas-ai-view'

const summarizeDocument = async (text: string) => {
  const summary = await aiApi.summarize({
    text,
    maxLength: 200,
    style: 'concise'
  })
  return summary
}
</script>
```

## Best Practices

1. **Validate user input** - Sanitize all input before sending to AI
2. **Implement rate limiting** - Control API costs and prevent abuse
3. **Cache responses** - Reduce redundant API calls
4. **Monitor usage** - Track tokens, costs, and performance
5. **Handle errors gracefully** - Provide fallback behavior
6. **Protect API keys** - Never expose keys in client code
7. **Use streaming for long responses** - Better user experience
8. **Implement content filtering** - Filter inappropriate content

## Security Considerations

1. **API Key Management**
   - Store keys in environment variables
   - Use backend proxy when possible
   - Rotate keys regularly

2. **Content Filtering**
   - Filter harmful content
   - Implement moderation
   - Rate limit per user

3. **Data Privacy**
   - Don't send sensitive data to AI
   - Anonymize user data
   - Comply with GDPR/privacy laws

## Cost Optimization

```typescript
import { optimizeCost } from '@izhimu/seas-ai-view'

// Use cheaper models for simple tasks
const modelSelector = optimizeCost({
  complexTasks: 'gpt-4',
  simpleTasks: 'gpt-3.5-turbo',
  threshold: 1000  // tokens
})
```

## See Also

- [`@izhimu/seas-core`](../core/seas-core.md) - Core functionality
- [`@izhimu/seas-base-view`](./seas-base-view.md) - Base UI components
- [`@izhimu/seas-security-view`](./seas-security-view.md) - Security components
