import fastify from 'fastify'
import { reportModule } from './modules/report-module'

const app = fastify()

app.get('/', () => {
  return 'Hello, World!'
})

app.register(reportModule, {
  prefix: '/reports',
})

app.listen({ port: 3000 }, () => {
  console.log('🔥 API rodando em http://localhost:3000')
})
