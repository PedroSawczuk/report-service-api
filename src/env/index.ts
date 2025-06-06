import { z } from 'zod';
import 'dotenv/config';

const envSchema = z.object({
    DATABASE_URL: z.string(),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
    console.error('ERRO! As variáveis de ambiente estão inválidas.');
    throw new Error('Variáveis de ambiente inválidas')
}

export const env = _env.data;