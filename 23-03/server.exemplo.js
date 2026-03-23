import fastify from "fastify";

const server = fastify({
    logger:true
})
 
server.get('/', async (request, reply) =>{
     console.log('Requisição recebida')
     reply.send('oi')
})

server.get('/json', async (request,reply) =>{
     console.log('Requisição recebida')
     reply.type('application/json').send({nome:'yas'})
})
    
server.get('/html', async (request,reply) =>{
     console.log('Requisição recebida')
     reply.send('<h1> ola, mundo</h1>') 
})

try{
    await server.listen({port:3028})
    console.log('Servidor rodando na porta 3028')

}catch(erro){
    console.error('Erro ao iniciar', erro)
}