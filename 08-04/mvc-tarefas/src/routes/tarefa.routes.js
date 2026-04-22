import controller from '../controllers/tarefa.controller.js'

export default async function tarefaRoutes(server, options) {

  server.get('/tarefas', async (request, reply) => {
    controller.listarTarefas(request, reply)
  })

  server.post('/tarefas', async (request, reply) => {
    controller.criarTarefa(request, reply)
  })

  server.get('/tarefas/resumo', async (request, reply) => {
    controller.obterResumoController(request, reply)
  })

  server.get('/tarefas/pendentes', async (request, reply) => {
    controller.listarTarefasPendentes(request, reply)
  })

  server.get('/tarefas/:id', async (request, reply) => {
    controller.obterTarefa(request, reply)
  })

  server.patch('/tarefas/:id', async (request, reply) => {
    controller.atualizarTarefa(request, reply)
  })

  server.patch('/tarefas/:id/concluir', async (request, reply) => {
    controller.concluirTarefa(request, reply)
  })

  server.delete('/tarefas/:id', async (request, reply) => {
    controller.removerTarefa(request, reply)
  })
}