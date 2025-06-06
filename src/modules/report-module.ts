import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { knex } from '../database'

export async function reportModule(app: FastifyInstance) {
  app.get('/', async () => {
    const reports = await knex('reports').select('*')
    return reports
  })

  app.get('/:id', async (request, reply) => {
    const getReportParamsSchema = z.object({
      id: z.string().uuid('ID inválido'),
    })

    const { id } = getReportParamsSchema.parse(request.params)

    const report = await knex('reports').where({ id }).first()

    if (!report) {
      return reply.status(404).send('Relatório não encontrado')
    }

    return report
  })

  app.post('/', async (request, reply) => {
    const createReportBodySchema = z.object({
      title: z.string().min(1, 'Título é obrigatório'),
      description: z.string().optional(),
      urlPath: z.string().url('URL inválida').optional(),
    })

    const { title, description, urlPath } = createReportBodySchema.parse(
      request.body,
    )

    await knex('reports').insert({
      id: crypto.randomUUID(),
      title,
      description,
      url_path: urlPath,
    })

    return reply.status(201).send(
      `Relatório criado com sucesso! \n\n 
        Título: ${title} 
          \n\n 
        Descrição: ${description || 'Nenhuma descrição fornecida'} 
          \n\n 
        URL: ${urlPath || 'Nenhuma URL fornecida'}`,
    )
  })
}
