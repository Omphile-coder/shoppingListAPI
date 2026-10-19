import http, { IncomingMessage, ServerResponse } from "http";
import { shoppingListRoute } from "./Routes/ShoppingListRoute.js";

const PORT = 3000;

const requestListener = (req: IncomingMessage, res: ServerResponse) => {
  shoppingListRoute(req, res);
};
const server = http.createServer(requestListener);
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
