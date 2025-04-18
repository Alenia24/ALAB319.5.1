import express from "express";

import Grade from "../modules/gradeModule.mjs";

const router = express.Router();

//✅
// Create a single grade entry
router.post("/", async (req, res) => {
  try {
    const newDocument = req.body;

    if(newDocument.student_id) {
      newDocument.learner_id = newDocument.student_id;
      delete newDocument.student_id;
    }

    const result = await Grade.create(newDocument);
    res.json(result)
  } catch(err) {
    res.status(400).json(err.message);
  }
});

//✅
// Get a single grade entry
router.get("/:id", async (req, res) => {
  try {
    const result = await Grade.findById(req.params.id);
    if (!result) {
      res.status.apply(404).json({ message: "No Grade found" });
    }

    res.json(result);
  } catch {
    res.status(400).json({ message: "Invalid ID" });
  }
});

//✅
// Add a score to a grade entry
router.patch("/:id/add", async (req, res) => {
  try {
    const result = await Grade.findByIdAndUpdate(
      req.params.id,
      { $push: { scores: req.body } },
      { new: true }
    );

    if (!result) {
      res.status(404).json({ message: "No Grade found" });
    }

    res.json(result);
  } catch {
    res.status(400).json({ message: "Invalid ID" });
  }
});

//✅
// Remove a score from a grade entry
router.patch("/:id/remove", async (req, res) => {
  try {
    const result = await Grade.findByIdAndUpdate(
      req.params.id,
      { $pull: { scores: req.body } },
      { new: true }
    );

    if (!result) {
      res.status(404).json({ message: "No Grade found" });
    }

    res.json(result);
  } catch {
    res.status(400).json({ error: error.message });
  }
});

//✅
// Delete a single grade entry
router.delete("/:id", async (req, res) => {
  try {
    const result = await Grade.findByIdAndDelete(req.params.id);

    if (!result) {
      res.status(404).json({ message: "No Grade found" });
    }

    res.json(result);
  } catch {
    res.status(400).json({ error: error.message });
  }
});

// Get route for backwards compatibility
router.get("/student/:id", async (req, res) => {
  res.redirect(`learner/${req.params.id}`);
});

//✅
// Get a learner's grade data
router.get("/learner/:id", async (req, res) => {
  try {
    const query = { learner_id: Number(req.params.id) };

    if (req.query.class) {
      query.class_id = Number(req.query.class);
    }

    const result = await Grade.find(query);
    if (!result) {
      res.status(404).json("No learner grade found");
    }

    res.json(result);
  } catch (error) {
    res.status(400).json({ message: "No learner found" });
  }
});

//✅
// Delete a learner's grade data
router.delete("/learner/:id", async (req, res) => {
  try {
    const result = await Grade.deleteMany({
      learner_id: Number(req.params.id),
    });

    if (!result) {
      res.status(404).json("Not found");
    }

    res.json(result);
  } catch (err) {
    res.status(400).send("Invalid ID");
  }
});

//✅
// Get a class's grade data
router.get("/class/:id", async (req, res) => {
  try {
    const query = { class_id: Number(req.params.id) };

    if (req.query.learner) {
      query.learner_id = Number(req.query.class);
    }

    const result = await Grade.find(query);
    if (!result) {
      res.status(404).json("No class grade found");
    }

    res.json(result);
  } catch (error) {
    res.status(400).json({ message: "No class found" });
  }
});

//✅
// Update a class id
router.patch("/class/:id", async (req, res) => {
  try {
    const result = await Grade.updateMany(
      { class_id: Number(req.params.id)},
      { $set: { class_id: req.body.class_id}}
    );

    if (!result) {
      res.status(404).json({ message: "No Class Found" });
    }

    res.json(result);
  } catch {
    res.status(400).json({ error: error.message });
  }
});

//✅
// Delete a class
router.delete("/class/:id", async (req, res) => {
  try {
    const result = await Grade.deleteMany({
      class_id: Number(req.params.id),
    });

    if (!result) {
      res.status(404).json("Not found");
    }

    res.json(result);
  } catch (err) {
    res.status(400).send("Invalid ID");
  }
});

export default router;
