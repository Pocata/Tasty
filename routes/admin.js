/*admin.js */
const router = require("express").Router();
const Activity = require("../models/news-model");
const multer = require("multer");
// 💡 1. 先定義儲存方式 (放在外面)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/upload/"); // 確保資料夾路徑正確
  },
  filename: (req, file, cb) => {
    // 💡 產生：時間戳記 + 原本檔名
    cb(null, Date.now() + "-" + file.originalname);
  },
});
// 💡 2. 初始化 upload
const upload = multer({ storage: storage });

/*驗證登入用middleware*/
// const authCheck = (req, res, next) => {
//   if (req.isAuthenticated()) {
//     next();
//   } else {
//     return res.redirect("/auth/login");
//   }
// };
// 活動發佈 Route
// 注意這裡的 "photo" 必須對應 HTML 裡的 name
router.get("/post-activity", (req, res) => {
  res.render("pages/admin/post-activity", {
    title: "TASTy西堤牛排|活動編輯頁面",
    bannerTitle: "ADMIN",
    cssName: "index",
    pageBg: "fixBg",
  });
});
router.post("/post-activity", upload.single("photo"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send("請上傳圖片");
    }

    let { title, start_date, end_date, content, details } = req.body;

    // 💡 關鍵：只存路徑到 MongoDB
    let imagePath = `/upload/${req.file.filename}`;

    let newActivity = new Activity({
      news_title: title,
      start_date,
      end_date,
      news_description: content,
      details,
      news_img: imagePath, // 存字串就好
    });

    let savedActivity = await newActivity.save();
    return res.send("活動發佈成功");
  } catch (err) {
    console.log(err);
    res.status(500).send("伺服器錯誤");
    //res.redirect("/");
  }
});

module.exports = router;
