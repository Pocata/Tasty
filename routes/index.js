const router = require("express").Router();
const Activity = require("../models/news-model");
const multer = require("multer");
const upload = multer({ storage: storage }); //設定圖片存放在pubblic的uploads資料夾

/*首頁*/
router.get("/", (req, res) => {
  res.send("Hello World!");
});
/*首頁*/
router.get("/index", async (req, res) => {
  try {
    let newsFound = await Activity.find().lean().exec();

    // 💡 必須在 try 裡面渲染，否則拿不到 newsFound
    res.render("pages/index", {
      title: "TASTy西堤牛排",
      bannerTitle: "INDEX",
      cssName: "index",
      pageBg: "fixBg",
      ad: newsFound, // 這裡傳遞資料給 EJS
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send("資料讀取失敗");
  }
});

/*找門市*/
router.get("/shop", (req, res) => {
  res.send("這是shop page");
});

/*會員中心*/
router.get("/member", (req, res) => {
  res.render("pages/member", {
    title: "TASTy西堤牛排",
    bannerTitle: "MEMBER",
    cssName: "member",
    pageBg: "fixBg",
  });
});
/*捐血公益*/
router.get("/event", (req, res) => {
  res.send("這是event page");
});

router.all("{/*any}", (req, res) => {
  res.status(404).send("你所找頁面不存在");
});

module.exports = router;
