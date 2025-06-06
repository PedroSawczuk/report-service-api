import fastify from "fastify";

const app = fastify()

app.get('/', () => {
    return 'Hello, World!';
})

app.listen({port: 3000}, () => {
    console.log('🔥 API rodando em http://localhost:3000')
})
