// Utility function to store data in the client's browser using localStorage
export function storeData(key: any, data: any) {
  if (typeof key !== "string") {
    throw new Error("Key must be a string");
  }
  localStorage.setItem(key, JSON.stringify(data));
}

// Utility function to retrieve stored data from localStorage
export function getData(key: any): any {
  if (typeof key !== "string") {
    throw new Error("Key must be a string");
  }
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
}
