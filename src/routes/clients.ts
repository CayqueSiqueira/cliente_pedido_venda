import { FastifyInstance } from 'fastify'

import { z } from 'zod'

import { prisma } from '../lib/prisma'

import { valTot, valTotImp } from '../util/calculate'

export async function clientsRoutes(app: FastifyInstance) {

  app.get('/clients', async () => {
    const clients = await prisma.client.findMany()
    return clients
  })

  app.post('/clients', async request => {
    const bodySchema = z.object({
      nome_cliente: z.string(),
      email: z.string(),
      cpf: z.string(),
      telephone: z.string()
    })

    const { nome_cliente, email, cpf, telephone } = bodySchema.parse(request.body)

    const client = await prisma.client.create({
      data: {
        nome_cliente,
        email,
        cpf,
        telephone
      }
    })
    return client
  })

  app.put('/clients/:id', async request => {
    const paramSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramSchema.parse(request.params)

    const bodySchema = z.object({
        nome_cliente: z.string(),
        email: z.string(),
        cpf: z.string(),
        telephone: z.string()
    })

    const { nome_cliente, email, cpf, telephone } = bodySchema.parse(request.body)

    const client = await prisma.client.update({
      where: {
        id
      },
      data: {
        nome_cliente,
        email,
        cpf,
        telephone
      }
    })
    return client
  })

  app.delete('/clients/:id', async request => {
    const paramSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramSchema.parse(request.params)

    await prisma.client.delete({
      where: {
        id
      }
    })
  })

  app.get('/clients/salesorder', async ()=> {
    const client = await prisma.client.findMany({
      include: {
        SalesOrder: true,
      }
  })
  return client
  })

  app.get('/clients/salesordeunit', async ()=> {
    const client = await prisma.client.findMany({
      include: {
        SalesOrder: true,
      }
  })
  return client.map(client => {
    return{
      id: client.id,
      nome: client.nome_cliente,
      cpf: client.cpf,
      SalesOrder: client.SalesOrder.map(SalesOrder => {
      return {
        product_name: SalesOrder.product_name,
        sales_order_data: SalesOrder.sales_order_data,
        amount: SalesOrder.amount,
        unitary_value: SalesOrder.unitary_value
      }
    })
    }
  })
})

app.get('/clients/salesordertotal', async () => {
    const client = await prisma.client.findMany({
        include: {
          SalesOrder: true,
        }
    })
    return client.map(client => {
      return{
        id: client.id,
        nome: client.nome_cliente,
        cpf: client.cpf,
        SalesOrder: client.SalesOrder.map(sal => {
  return{
    id: sal.id,
    product_name: sal.product_name,
    sales_order_data: sal.sales_order_data,
    amount: sal.amount,
    unitary_value: sal.unitary_value,
    valor_total: valTot(sal.amount, sal.unitary_value),
    total_com_imposto: valTotImp(sal.amount, sal.unitary_value)
  }
})
} 
})
})

  app.get('/clients/customer_sales_order/:cpf', async request => {
    const paramSchema = z.object({
      cpf: z.string()
    })
    const { cpf } = paramSchema.parse(request.params)
    const client = await prisma.client.findFirstOrThrow({
      include: {
        SalesOrder: true,
      },

      where: {
        cpf
      }
    })
    return client
  })
}

