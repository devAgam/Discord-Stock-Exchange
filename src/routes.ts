import {Application, Express} from "express";
import restRoutes from "./components/rest/rest.api.routes";

export function routes(app: Application): void {
    app.use("/rest", restRoutes);
}

