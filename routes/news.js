const router = require("express").Router();
const Activity = require("../models/news-model");

/*最新消息 */
router.get("/list", (req, res) => {
  res.render("pages/news/list", {
    title: "TASTy西堤牛排",
    bannerTitle: "NEWS",
    pageBg: "fixBg",
    cssName: "news",
  });
});
router.get("/content/:newsurl", (req, res) => {
  res.render("pages/news/content", {
    title: "TASTy西堤牛排",
    bannerTitle: "NEWS",
    cssName: "news",
    pageBg: "fixBg",
  });
});
router.get("/news/content/:id", async (req, res) => {
  try {
    let activityId = req.params.id; // 從網址抓取 ID
    let activity = await Activity.findById(activityId).lean().exec();

    if (!activity) {
      return res.status(404).send("找不到該活動內容");
    }

    res.render("pages/activity-detail", {
      title: activity.news_title,
      cssName: "news-detail",
      item: activity, // 將該筆活動詳細資料傳給 EJS
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("伺服器錯誤");
  }
});

module.exports = router;
