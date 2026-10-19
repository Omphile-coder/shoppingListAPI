import { IncomingMessage, ServerResponse } from "http";
import {
  addItem,
  updateItem,
  deleteItem,
  getItemById,
  getItems, // Make sure to import your function to get all items!
} from "../Controllers/ShoppingList.js";

export const shoppingListRoute = (
  req: IncomingMessage,
  res: ServerResponse,
) => {
  // Enforce the /items route
  if (!req.url?.startsWith("/items")) {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Invalid route. Use /items" }));
    return;
  }

  const parts = req.url.split("/");
  const id = parts[2] ? parseInt(parts[2]) : undefined;

  // GET: All Items (e.g., /items)
  if (req.method === "GET" && id === undefined) {
    const items = getItems(); // Assuming you have this function
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(items));
    return;
  }

  // GET: Single Item by ID (e.g., /items/1)
  if (req.method === "GET" && id !== undefined) {
    if (Number.isNaN(id)) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Invalid ID" }));
      return;
    }

    const item = getItemById(id);
    if (!item) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Item not found" }));
      return;
    }
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(item));
    return;
  }

  // Delete: An Item
  if (req.method === "DELETE" && id !== undefined) {
    if (Number.isNaN(id)) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Invalid ID" }));
      return;
    }

    const isDeleted = deleteItem(id);
    if (!isDeleted) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Item not found" }));
      return;
    }

    res.writeHead(204);
    res.end();
    return;
  }

  // Updating an Item and adding an item
  if (req.method === "POST" || req.method === "PUT") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      try {
        const parseBody = JSON.parse(body);

        // POST: Adding an Item (e.g., /items)
        if (req.method === "POST") {
          const { name, quantity } = parseBody;
          if (!name || typeof name !== "string") {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Invalid item name" }));
            return;
          }

          if (!quantity || typeof quantity !== "number") {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Invalid item quantity" }));
            return;
          }

          const newItem = addItem(name, quantity);
          res.writeHead(201, { "Content-Type": "application/json" });
          res.end(JSON.stringify(newItem));
          return;
        }

        // PUT: Updating an Item (e.g., /items/1)
        if (req.method === "PUT" && id !== undefined) {
          if (Number.isNaN(id)) {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Invalid ID" }));
            return;
          }

          const { name, quantity, purchased } = parseBody;

          // check if the item exists first
          const existingItem = getItemById(id);
          if (!existingItem) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Item not found" }));
            return;
          }

          const updatedItem = updateItem(id, name, quantity, purchased);
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify(updatedItem));
          return;
        }
      } catch (error) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Invalid JSON payload" }));
        return;
      }
    });
    return;
  }

  // Fallback for unsupported methods
  // Note: 405 is the proper HTTP status code for "Method Not Allowed"
  res.writeHead(405, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "Method Not Allowed" }));
};