<template>
  <div class="flex items-center justify-center h-screen bg-gray-100">
    <form @submit.prevent="handleSubmit" class="p-6 bg-white rounded shadow-md w-80">
      <h2 class="text-2xl font-semibold mb-4">Login</h2>
      
      <div v-if="errorMessage" class="mb-4 bg-red-100 text-red-700 p-2 rounded text-sm">
        {{ errorMessage }}
      </div>

      <div class="mb-4">
        <label for="email" class="block mb-1 text-sm">Username</label>
        <input v-model="email" type="email" id="email" class="input-field" />
        <p v-if="errors.email" class="text-red-500 text-xs">{{ errors.email }}</p>
      </div>
      <div class="mb-6">
        <label for="password" class="block mb-1 text-sm">Password</label>
        <input v-model="password" type="password" id="password" class="input-field" />
        <p v-if="errors.password" class="text-red-500 text-xs">{{ errors.password }}</p>
      </div>
      <button type="submit" class="btn-primary">Login</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import * as yup from 'yup'
import { useRouter } from 'vue-router'

type LoginResponse = 
  | { role: 'admin' | 'employee' }
  | { statusCode: number; body: { email?: { _errors: string[] }; password?: { _errors: string[] }; _errors: string[] } }
  | { statusCode: number; message: string }

const router = useRouter()
const email = ref('')
const password = ref('')
const errors = ref<Record<string, string>>({})
const errorMessage = ref('') 

watch(email, () => {
  errors.value.email = ''
  errorMessage.value = '' 
})
watch(password, () => {
  errors.value.password = ''
  errorMessage.value = '' 
})

const schema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
})

async function handleSubmit() {
  errorMessage.value = '' 
  try {
    await schema.validate({ email: email.value, password: password.value }, { abortEarly: false })
    
    const response: LoginResponse = await $fetch('/api/auth/login', {
      method: 'POST',
      body: { email: email.value, password: password.value },
    })

    if ('role' in response) {
      useCookie('userRole').value = response.role
      if (response.role === 'admin') router.push('/admin')
      else router.push('/')
    } else if ('body' in response) {
      if (response.body.email?._errors) errors.value.email = response.body.email._errors.join(', ')
      if (response.body.password?._errors) errors.value.password = response.body.password._errors.join(', ')
    } else if ('message' in response) {
      errorMessage.value = response.message
    }
  } catch (err) {
    if (err instanceof yup.ValidationError) {
      err.inner.forEach((e) => {
        if (e.path) {
          errors.value[e.path] = e.message
        }
      })
    }
  }
}
</script>

<style scoped>
.input-field { width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; }
.btn-primary { background-color: #4a90e2; color: white; padding: 10px; border-radius: 4px; width: 100%; }
</style>
