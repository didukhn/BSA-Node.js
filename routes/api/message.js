const router = require("express").Router();
const messageService = require("../../services/message");

router.get("/", (req, res, next) => {
  messageService.findAll((err, data) => {
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
  messageService.findOne(Number(req.params.id), (err, data) => {
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
  messageService.create(req.body, (err, data) => {
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
  messageService.update(Number(req.params.id), req.body, (err, data) => {
    if (!err) {
      res.data = data;
      res.json(res.data);
    } else {
      res.status(400);
      res.json({
        err: err.message
      });
    }
  });
});

router.delete("/:id", (req, res, next) => {
  messageService.delete(Number(req.params.id), (err) => {
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


module.exports = router;
