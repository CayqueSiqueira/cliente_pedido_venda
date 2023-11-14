import { FastifyInstance } from 'fastify'

import { z } from 'zod'

import { prisma } from '../lib/prisma'

export async function salesOrdersRoutes(app: FastifyInstance) {

  app.get('/salesOrders', async () => {
    const salesOrders = await prisma.salesOrder.findMany()
    return salesOrders
  })

  app.post('/salesOrders', async request => {
    const bodySchema = z.object({
        product_name: z.string(),
        sales_order_data: z.coerce.date(),
        amount: z.number(),
        unitary_value: z.number(),
        clientId: z.string()
    })

    const { product_name, sales_order_data, amount, unitary_value, clientId } = bodySchema.parse(request.body)

    const salesOrder = await prisma.salesOrder.create({
      data: {
        product_name,
        sales_order_data,
        amount,
        unitary_value,
        clientId
      }
    })
    return salesOrder
  })

  app.put('/salesOrders/:id', async request => {
    const paramSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramSchema.parse(request.params)

    const bodySchema = z.object({
        product_name: z.string(),
        sales_order_data: z.coerce.date(),
        amount: z.number(),
        unitary_value: z.number(),
        clientId: z.string()
    })

    const { product_name, sales_order_data, amount, unitary_value, clientId } = bodySchema.parse(request.body)

    const salesOrder = await prisma.salesOrder.update({
      where: {
        id
      },
      data: {
        product_name,
        sales_order_data,
        amount,
        unitary_value,
        clientId
      }
    })
    return salesOrder
  })

  app.delete('/salesOrders/:id', async request => {
    const paramSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramSchema.parse(request.params)

    await prisma.salesOrder.delete({
      where: {
        id
      }
    })
  })

}