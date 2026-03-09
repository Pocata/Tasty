const router = require("express").Router();
const Activity = require("../models/news-model");

/*最新消息 */
router.get("/list", (req, res) => {
  res.render("pages/news/list", {
    title: "TASTy西堤牛排",
    bannerTitle: "NEWS",
  });
});
router.get("/content/:newsurl", (req, res) => {
  res.render("pages/news/content", {
    title: "TASTy西堤牛排",
    bannerTitle: "NEWS",
  });
});

module.exports = router;
