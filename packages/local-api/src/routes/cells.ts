import express from "express";
import path from "path";
import fs from "fs/promises";

interface Cell {
  id: string;
  content: string;
  type: string;
}

export const createCellsRouter = (filename: string, dir: string) => {
  const router = express.Router();

  router.use(express.json());

  const fullPath = path.join(dir, filename);

  router.get("/cells", async (req, res) => {
    try {
      const result = await fs.readFile(fullPath, { encoding: "utf8" });

      res.send(JSON.parse(result));
    } catch (error) {
      if (error.code === "ENOENT") {
        await fs.writeFile(fullPath, "[]", "utf-8");
        res.send([]);
      } else {
        throw error;
      }
    }
  });

  router.post("/cells", async (req, res) => {
    const { cells }: { cells: Cell[] } = req.body;

    await fs.writeFile(fullPath, JSON.stringify(cells), "utf8");

    res.send({ status: 200 });
  });

  return router;
};
