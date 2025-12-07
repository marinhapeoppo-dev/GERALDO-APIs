// Data contoh untuk API
const items = [
  {
    id: 1,
    name: "Item 1",
    description: "Ini adalah item pertama",
    price: 10000,
    category: "Elektronik",
    createdAt: "2023-10-01T10:30:00Z"
  },
  {
    id: 2,
    name: "Item 2",
    description: "Ini adalah item kedua",
    price: 25000,
    category: "Pakaian",
    createdAt: "2023-10-02T14:45:00Z"
  },
  {
    id: 3,
    name: "Item 3",
    description: "Ini adalah item ketiga",
    price: 15000,
    category: "Makanan",
    createdAt: "2023-10-03T09:15:00Z"
  }
];

const users = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    age: 28,
    city: "Jakarta"
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    age: 32,
    city: "Bandung"
  }
];

module.exports = { items, users };