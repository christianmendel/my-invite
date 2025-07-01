import { Router } from "express";
import TransactionRoutes from "./invitationRoutes";

const routes = Router();

routes.use(TransactionRoutes);

//public test server
routes.get("/helloworld", (req, res) => {
    res.send("Olá Mundo!");
});

export default routes;
