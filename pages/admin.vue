<template>
  <div class="text-center py-10">
    <h1 class="text-4xl font-bold text-gray-800">This is admin page</h1>
    <p class="mt-4 text-lg text-gray-600">Access to this page is restricted to administrators only.</p>
  </div>
</template>
<script setup>
definePageMeta({
  middleware: 'auth' 
});
</script>