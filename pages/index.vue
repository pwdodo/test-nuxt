<template>
  <div class="text-center py-10">
    <h1 class="text-4xl font-bold text-gray-800">Home Page</h1>
    <p class="mt-4 text-lg text-gray-600">Welcome to the default landing page.</p>
    <p class="mt-4 text-lg text-gray-600" v-if="userRole">
      You are <b>{{ userRole }}</b>
    </p>
  </div>
</template>

<script setup lang="ts">
import { useCookie } from 'nuxt/app'

const userRole = useCookie('userRole').value 
</script>
