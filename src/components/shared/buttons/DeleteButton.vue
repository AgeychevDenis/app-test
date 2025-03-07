<template>
  <Button variant="ghost" @click="handleRemove">
    <Trash2 />
  </Button>
</template>

<script setup lang="ts">
import { Trash2 } from 'lucide-vue-next'

import { Button } from '@/components/ui/button'

import { useCredentialStore } from '@/stores/credential'
import type { Account } from '@/types'

const { account } = defineProps<{
  account: Account
}>()

const store = useCredentialStore()

const handleRemove = () => store.deleteAccount(account.id)
</script>
