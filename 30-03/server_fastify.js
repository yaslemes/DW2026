import Fastify from 'fastify'
import cors from '@fastify/cors'

const server = Fastify({ logger: false })

await server.register(cors, {
  origin: '*'
})

server.get('/', async (request, reply) => {
  return 'Bem-vindo!'
})

server.get('/tasks', async () => {
  return [{ id: 1, title: "Teste" }]
})

await server.listen({ port: 3002 })
console.log("Rodando na 3002")