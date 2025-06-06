import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  DATABASE_URL: z.string(),
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
  console.error('ERRO! As variáveis de ambiente estão inválidas.')
  throw new Error('Variáveis de ambiente inválidas')
}

export const env = _env.data
