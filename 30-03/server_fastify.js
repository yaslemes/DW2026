import Fastify from 'fastify'
import cors from '@fastify/cors'

const server = Fastify()

await server.register(cors, { origin: '*' })

let tarefas = []
let idAtual = 1

server.get('/tarefas', async (request) => {
  const { busca, concluido } = request.query

  let resultado = tarefas

  if (busca) {
    resultado = resultado.filter(t =>
      t.descricao.toLowerCase().includes(busca.toLowerCase())
    )
  }

  if (concluido !== undefined && concluido !== '') {
    const status = concluido === 'true'
    resultado = resultado.filter(t => t.concluido === status)
  }

  return resultado
})

server.post('/tarefas', async (request, reply) => {
  const { descricao } = request.body

  if (!descricao || descricao.trim() === '') {
    return reply.code(400).send({ message: 'A descrição da tarefa é obrigatória' })
  }

  const nova = {
    id: idAtual++,
    descricao,
    concluido: false
  }

  tarefas.push(nova)

  return reply.code(201).send(nova)
})

server.patch('/tarefas/:id/concluir', async (request, reply) => {
  const id = Number(request.params.id)

  const tarefa = tarefas.find(t => t.id === id)

  if (!tarefa) {
    return reply.code(404).send({ message: 'Tarefa não encontrada' })
  }

  tarefa.concluido = !tarefa.concluido

  return tarefa
})

server.delete('/tarefas/:id', async (request, reply) => {
  const id = Number(request.params.id)

  const index = tarefas.findIndex(t => t.id === id)

  if (index === -1) {
    return reply.code(404).send({ message: 'Tarefa não encontrada' })
  }

  tarefas.splice(index, 1)

  return { message: 'Tarefa removida' }
})

server.get('/resumo', async () => {
  const total = tarefas.length
  const concluidas = tarefas.filter(t => t.concluido).length
  const pendentes = total - concluidas

  return { total, concluidas, pendentes }
})

server.listen({ port: 3002 })