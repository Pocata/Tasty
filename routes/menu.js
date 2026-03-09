const router = require("express").Router();
/*嘗美食*/
router.get("/list", (req, res) => {
  res.render("這是menu page", { title: "TASTy西堤牛排", bannerTitle: "MENU" });
});
// app.get("/content/:menu", (req, res) => {
//   !req.query
//     ? res.send("這是menu輪換圖片頁面")
//     : res.send("現在在gid=" + req.query.gid + "&pid=" + req.query.pid);
// });

module.exports = router;
