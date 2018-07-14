const router = require("express").Router();
const userService = require("../../services/user");

router.get("/", (req, res, next) => {
  userService.findAll((err, data) => {
    if (!err) {
      res.data = data;
      res.json(res.data);
    } else {
      res.status(400);
      res.end();
    }
  });
});

router.get("/:id", (req, res, next) => {
  userService.findOne(Number(req.params.id), (err, data) => {
    if (!err) {
      res.data = data;
      res.json(res.data);
    } else {
      res.status(400);
      res.end();
    }
  });
});

router.post("/", (req, res, next) => {
  userService.create(req.body, (err, data) => {
    if (!err) {
      res.data = data;
      res.json(res.data);
    } else {
      res.status(400);
      res.end();
    }
  });
});

router.put("/:id", (req, res, next) => {
  userService.update(Number(req.params.id), req.body, (err, data) => {
    if (!err) {
      res.data = data;
      res.json(res.data);
    } else {
      res.status(400);
      res.json({
        err: err.message
      })
      res.end();
    }
  });
});

router.delete("/:id", (req, res, next) => {
  userService.delete(Number(req.params.id), (err) => {
    if (!err) {
      res.status(200);
      res.end();
    } else {
      res.status(400);
      res.json({
        err: err.message
      })
    }
  });
});

router.get("/:id/penfriends", (req, res, next) => {
  userService.getUserContacts(Number(req.params.id), (err, data) => {
    if (!err) {
      res.status(200);
      res.json(data);
      res.end();
    } else {
      res.status(400);
      res.json({
        err: err.message
      });
    }
  });
});

module.exports = router;
