import mongoose from "mongoose";

const scoreSchema = new mongoose.Schema({
    type: { type: String, required:true  },
    score: { type: Number, required:true  }
})

const gradeSchema = new mongoose.Schema({
  scores: [scoreSchema],
  class_id: {
    type: Number,
    required: true,
  },
  learner_id: {
    type: Number,
    required: true,
  }
}, {versionKey: false});

export default mongoose.model("Grade", gradeSchema);
