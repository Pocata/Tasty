/*admin.js */
require("dotenv").config();
const router = require("express").Router();
const Activity = require("../models/news-model");
const multer = require("multer");
const flash = require("connect-flash");
const bcrypt = require("bcrypt");
const Employee = require("../models/employees-model");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const joi = require("joi");
const saltRounds = 12;
/*存活動照 */
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
/*signed cookie and session*/
router.use(cookieParser(process.env.MYCOOKIESECRETKEY));
router.use(
  session({
    secret: process.env.MYSESSIONSECRETKEY,
    resave: false, //避免race codition
    saveUninitialized: false, //避免大量empty session object
    cookie: { secure: false }, //localhost ,https 則 true
  }),
);
/*驗證登入用middleware*/
// const authCheck = (req, res, next) => {
//   if (req.isAuthenticated()) {
//     next();
//   } else {
//     return res.redirect("/auth/login");
//   }
// };

const verifyUser = (req, res, next) => {
  if (req.session.isVerified) {
    next();
  } else {
    return res.send("請先登入系統");
  }
};
const userschema = joi.object({
  username: joi.string().alphanum().min(3).max(30).required().messages({
    "string.empty": "使用者名稱不能是空的喔！",
    "any.required": "請務必填寫使用者名稱",
    "string.min": "用戶名長度至少需要 3 個字元",
  }),
  password: joi.string().min(8).max(100).required().messages({
    "string.min": "密碼長度至少需要 8 個字元",
    "string.empty": "請輸入密碼",
  }),
});
const employeeSchema = joi.object({
  username: joi.string().alphanum().min(3).max(30).required(),
  password: joi.string().min(8).required(),
  email: joi.string().email().required(),
});
const activitySchema = joi.object({
  title: joi.string().min(3).required(),
  start_date: joi.date().required(),
  end_date: joi.date().greater(joi.ref("start_date")).required(),
  content: joi.string().required(),
  details: joi.string().allow(""),
});
router.use(flash()); //用於redirect後顯示成功/失敗提示訊息
// 活動發佈 Route
// 注意這裡的 "photo" 必須對應 HTML 裡的 name
router.get("/post-activity", verifyUser, (req, res) => {
  res.render("pages/admin/post-activity", {
    title: "TASTy西堤牛排|活動編輯頁面",
    bannerTitle: "ADMIN",
    cssName: "index",
    pageBg: "fixBg",
  });
});
router.post("/post-activity", upload.single("photo"), async (req, res) => {
  try {
    const { error, value } = activitySchema.validate(req.body);

    if (error) {
      return res.status(400).send(error.details[0].message);
    }
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
router.post("/add-employees", async (req, res) => {
  try {
    // 1. Joi 驗證
    const { error, value } = employeeSchema.validate(req.body);

    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    let { username, password, email } = value;
    // 2. 檢查帳號是否已存在 (建議加上，避免資料重複)
    const existingUser = await Employee.findOne({ username });
    if (existingUser) {
      return res.status(400).send("該用戶名已被使用");
    }
    // 3. 密碼加密
    let hashValue = await bcrypt.hash(password, saltRounds);
    // 4. 存入資料庫
    let newEmployee = new Employee({ username, password: hashValue, email });
    let savedEmployee = await newEmployee.save();
    return res.status(201).send({ message: "成功新增員工", savedEmployee });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});
router.get("/login", (req, res) => {
  if (req.query.logout) {
    req.flash("success", "登出成功");
  }
  res.render("pages/admin/login", {
    title: "TASTy西堤牛排",
    cssName: "admin",
    pageBg: "fixBg",
    errorMsg: req.flash("error"),
    successMsg: req.flash("success"),
  });
});
router.post("/login", async (req, res) => {
  try {
    /*先做joi驗證 如有錯則將驗證結果匯入flash並redirect*/
    const { error, value } = userschema.validate(req.body);

    if (error) {
      req.flash("error", error.details[0].message);
      return res.redirect("/admin/login");
    }
    /**joi驗證完 醬資料丟入db查詢 */
    let { username, password } = value;

    let foundEmployee = await Employee.findOne({ username });
    if (!foundEmployee) {
      req.flash("error", "使用者名稱錯誤，查無此帳號");
      return res.redirect("/admin/login");
    } else {
      let result = await bcrypt.compare(password, foundEmployee.password);
      if (result) {
        req.session.isVerified = true;
        req.flash("success", "歡迎登入tasty網頁操作介面");
        return res.redirect("/admin/index");
      } else {
        req.flash("error", "密碼錯誤");
        return res.redirect("/admin/login");
      }
    }
  } catch (err) {
    return res.status(400).send(err);
  }
});
router.get("/index", verifyUser, (req, res) => {
  res.render("pages/admin/index", {
    title: "TASTy西堤牛排",
    cssName: "admin",
    pageBg: "fixBg",
  });
});
router.get("/logout", (req, res) => {
  // 先把訊息存入 flash，因為 destroy 會清空所有 session 資料
  // 所以實務上通常是直接轉址後再處理，或者轉址到一個不需要 session 的頁面
  req.session.destroy(() => {
    res.clearCookie("connect.sid");
    // 注意：session 被銷毀後，req.flash 也會消失
    // 如果一定要顯示「登出成功」，通常是在 redirect 的網址加參數，例如 /login?logout=success
    res.redirect("/admin/login?logout=succcess");
  });
});
module.exports = router;
