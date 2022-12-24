const Goal = require("../models/Goal");
const asyncHandler = require("express-async-handler");

class goalController {
  // @URI:      api/goals
  // @Method:   GET
  get = asyncHandler(async (req, res) => {
    const goals = await Goal.find({});
    res.json(goals);
  });

  // @URI:      api/goals/:id
  // @Method:   GET
  getById = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id);

    if (!goal) {
      res.status(400);
      throw new Error("Unable to find data");
    }

    res.json(goal);
  });

  // @URI:      api/goals
  // @Method:   POST
  add = asyncHandler(async (req, res) => {
    if (!req.body.text) {
      res.status(400);
      throw new Error("Please enter text");
    }

    const newGoal = await Goal.create({
      text: req.body.text,
    });

    res.json(newGoal);
  });

  // @URI:      api/goals/:id
  // @Method:   PUT
  update = asyncHandler(async (req, res) => {
    if (!req.body.text) {
      res.status(400);
      throw new Error("Please enter text");
    }

    const updatedGoal = await Goal.findByIdAndUpdate(
      req.params.id,
      {
        text: req.body.text,
      },
      { new: true } // return updated object
    );

    if (!updatedGoal) {
      res.status(400);
      throw new Error("Unable to update data");
    }

    res.json(updatedGoal);
  });

  // @URI:      api/goals/:id
  // @Method:   DELETE
  delete = asyncHandler(async (req, res) => {
    const result = await Goal.findByIdAndDelete(req.params.id);
    if (!result) {
      res.status(400);
      throw new Error("Unable to delete data");
    }
    res.json({ id: req.params.id });
  });
}

module.exports = new goalController();
