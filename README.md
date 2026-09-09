# Shopping List API

A RESTful API built with Node.js and TypeScript for managing a shopping list. It allows users to add, view, update, and delete grocery items.

## Features

- View all items on the shopping list
- View a specific item by its ID
- Add new items (defaults to not purchased)
- Update an item's name, quantity, or purchased status
- Delete an item from the list

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) installed
- TypeScript installed globally or as a dev dependency

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Omphile-coder/shopping-list-api.git
   cd shopping-list-api
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Compile and run the server:
   ```bash
   npm run dev
   ```
   _(Ensure you have a dev script configured in your `package.json` that uses `ts-node` or compiles to JS and runs)._

## API Documentation

### Base URL

`http://localhost:3000`

### Endpoints

#### 1. Get All Items

- **Endpoint:** `GET /items`
- **Description:** Retrieves all items currently on the shopping list.
- **Success Response:** `200 OK`
- **Response Body:** Array of item objects.

#### 2. Get Single Item

- **Endpoint:** `GET /items/:id`
- **Description:** Retrieves a single item by its ID.
- **Success Response:** `200 OK`
- **Error Response:** `404 Not Found` (if item doesn't exist)

#### 3. Add an Item

- **Endpoint:** `POST /items`
- **Description:** Adds a new item to the shopping list.
- **Request Body (JSON):**
  ```json
  {
    "name": "Milk",
    "quantity": 2
  }
  ```
- **Success Response:** `201 Created`
- **Error Response:** `400 Bad Request` (if validation fails)

#### 4. Update an Item

- **Endpoint:** `PUT /items/:id`
- **Description:** Updates the properties of an existing item.
- **Request Body (JSON):**
  ```json
  {
    "name": "Almond Milk",
    "purchased": true
  }
  ```
  _(You can pass `name`, `quantity`, and/or `purchased`)_
- **Success Response:** `200 OK`
- **Error Response:** `404 Not Found` (if item doesn't exist)

#### 5. Delete an Item

- **Endpoint:** `DELETE /items/:id`
- **Description:** Removes an item from the list.
- **Success Response:** `204 No Content`
- **Error Response:** `404 Not Found` (if item doesn't exist)

## Data Model

**Item**

```typescript
{
  id: number; // Unique identifier
  name: string; // Name of the grocery item
  quantity: number; // Amount needed
  purchased: boolean; // Whether the item has been bought
}
```
