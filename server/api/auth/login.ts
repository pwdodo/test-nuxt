import { defineEventHandler, readBody } from 'h3'
import { z } from 'zod'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(5),
})

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const result = loginSchema.safeParse(body)

  if (!result.success) {
    return { statusCode: 400, body: result.error.format() }
  }

  const { email, password } = result.data
  if (email === 'admin@test.com' && password === 'password') {
    return { role: 'admin' }
  } else if (email === 'employee@test.com' && password === 'password') {
    return { role: 'employee' }
  } else {
    return { statusCode: 401, message: 'Invalid credentials' }
  }
})
