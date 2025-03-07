<template>
  <div>
    <Input v-model="labelsInput" @blur="handleLabelsBlur" placeholder="Значение" maxlength="50" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { Input } from '@/components/ui/input'

import { useCredentialStore } from '@/stores/credential'
import type { Account } from '@/types'

const { account } = defineProps<{
  account: Account
}>()

const store = useCredentialStore()

const labelsInput = ref(account.labels.map((label) => label.text).join('; '))
const handleLabelsBlur = () => {
  const normalizedLabels = labelsInput.value
    .split(';')
    .map((text) => text.trim())
    .filter((text) => text)
    .map((text) => ({ text }))
    .slice(0, 50)

  if (JSON.stringify(normalizedLabels) !== JSON.stringify(account.labels)) {
    store.modifyAccount(account.id, { labels: normalizedLabels })
  }
}
</script>
