import type { item } from "../Types/ShoppingListTypes.js";

let items: item[] = [];

let currentId = 0;

// get all the Items in the shopping list, basically we are are reading the items array and returning it to the user
export const getItems = (): item[] => {
  return items;
};

// get an item by its ID
export const getItemById = (id: number): item | undefined => {
  return items.find((item) => item.id === id);
};

// add a new item to the shopping list
export const addItem = (name: string, quantity: number): item => {
  const newItem: item = {
    id: currentId++,
    name,
    quantity,
    purchased: false,
  };

  items.push(newItem);
  return newItem;
};

// update an item by its ID
export const updateItem = (
  id: number,
  name?: string,
  quantity?: number,
  purchased?: boolean,
): item | undefined => {
  const item = getItemById(id);

  if (item) {
    if (name !== undefined) {
      item.name = name;
    }

    if (quantity !== undefined) {
      item.quantity = quantity;
    }

    if (purchased !== undefined) {
      item.purchased = purchased;
    }
  }
  return item;
};

// delete an item by its ID
export const deleteItem = (id: number): boolean => {
  const index = items.findIndex((item) => item.id === id);

  if (index !== -1) {
    items.splice(index, 1);
    return true;
  }
  return false;
};
