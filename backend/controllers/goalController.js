class goalController {
  // @URI:      api/goals
  // @Method:   GET
  get = (req, res) => {
    res.json({ message: "GET goalcontroller" });
  };

  // @URI:      api/goals/:id
  // @Method:   GET
  getById = (req, res) => {
    res.json({ message: "GET goalcontroller", id: req.params.id });
  };

  // @URI:      api/goals
  // @Method:   POST
  add = (req, res) => {
    res.json({ ...req.body, message: "POST goalcontroller" });
  };

  // @URI:      api/goals/:id
  // @Method:   PUT
  update = (req, res) => {
    res.json({ ...req.body, id: req.params.id, message: "PUT goalcontroller" });
  };

  // @URI:      api/goals/:id
  // @Method:   DELETE
  delete = (req, res) => {
    res.json({ id: req.params.id, message: "DELETE goalcontroller" });
  };
}

module.exports = new goalController();
