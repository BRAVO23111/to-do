import express from "express";
import { TaskModel } from "../model/Tasks.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const allTask = await TaskModel.find();
  res.json(allTask);
});

router.get("/:id", async (req, res) => {
  const task = await TaskModel.findById(req.params.id);
  res.json(task);
});

router.post("/", async (req, res) => {
  const newTask = new TaskModel(req.body);
  await newTask.save();
  res.json(newTask);
});
router.put("/:id", async (req, res) => {
  const task = await TaskModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(task);
});

router.delete("/:id", async (req, res) => {
  const task = await TaskModel.findByIdAndDelete(req.params.id);
  res.json({
    message: "Deleted Successfully",
  });
});

export { router as TaskRouter };
