const express = require("express");
const router = express.Router();
/* 線上訂位*/
router.get("/booking", (req, res) => {
  res.sendFile("booking.html", { root: __dirname });
});
/*線上點餐*/
router.get("/order", (req, res) => {
  res.sendFile("order.html", { root: __dirname });
});
module.exports = router;
