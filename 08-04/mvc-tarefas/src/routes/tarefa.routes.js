import {
  listarTarefas,
  criarTarefa,
  obterResumoController,
  obterTarefa,
  atualizarTarefa,
  concluirTarefa,
  removerTarefa,
  listarTarefasPendentes
} from '../controllers/tarefa.controller.js'

export default async function tarefaRoutes(server, options) {

  server.get('/tarefas', listarTarefas)
  server.post('/tarefas', criarTarefa)
  server.get('/tarefas/resumo', obterResumoController)
  server.get('/tarefas/pendentes', listarTarefasPendentes)
  server.get('/tarefas/:id', obterTarefa)
  server.patch('/tarefas/:id', atualizarTarefa)
  server.patch('/tarefas/:id/concluir', concluirTarefa)
  server.delete('/tarefas/:id', removerTarefa)
}