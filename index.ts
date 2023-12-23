import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";

const prisma = new PrismaClient();
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.post("/api", async (req, res) => {
  const { name, email } = req.body;

  if (!email || !name) {
    return res.status(400).json({ message: "Email and name required!" });
  }

  try {
    const createdRow = await prisma.dataList.create({
      data: {
        email,
        name,
      },
    });

    res.json(createdRow);
  } catch (error) {
    res.status(400).send({ message: error });
  }
});

const server = app.listen(PORT, () => {
  console.log(`СЛушаем порт ${PORT}`);
});
