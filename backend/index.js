const express = require("express");
const cors = require("cors");
const app = express();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

app.use(express.json());
app.use(cors());

app.get("/items", async (req, res) => {
  try {
    const items = await prisma.item.findMany();
    res.json(items);
  } catch (error) {
    console.error("Failed to fetch items:", error);
    res.status(500).send("Error retrieving items from the database");
  }
});

app.listen(4000, () => {
  console.log("Server is Listening");
});
