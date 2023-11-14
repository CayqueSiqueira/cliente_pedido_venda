import fastify from "fastify";

//import { funcionariosRoutes } from "./routes/funcionarios";
import { clientsRoutes } from "./routes/clients";
import { salesOrdersRoutes } from "./routes/salesorder";

const app = fastify();

//app.register(funcionariosRoutes)
app.register(clientsRoutes,salesOrdersRoutes)

app.listen({
  port: 3333,
}).then(() => {
  console.log('HTTP Server running on port 3333')
})
