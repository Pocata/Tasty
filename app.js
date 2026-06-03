const express = require("express");
const app = express();
const port = 3000;
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const buyRoutes = require("./routes/buy");
const newsRoutes = require("./routes/news");
const menuRoutes = require("./routes/menu");
const adminRoutes = require("./routes/admin");
const indexRoutes = require("./routes/index");
const path = require("path");
/*連結資料庫*/
async function start() {
  try {
    await mongoose.connect(
      "mongodb+srv://happy80194_db_user:4OVE11KcRapxIX0j@cluster0.sawbyvg.mongodb.net/TastyDB",
    );
    console.log("conneting to mongodb...TastyDB");
  } catch (err) {
    console.log(err);
  }
}
start();

/*express middlewares */
app.use(express.json()); //http req content-type json to jsobject
app.use(express.urlencoded({ extended: true })); //http req content-type form-data to jsobject
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
/*express ejs layouts middlewares  */
app.use(expressLayouts); // 啟用layout功能
app.set("layout", "layouts/main"); //指定預設的殼子檔案
// 掛載路由
app.use("/admin", adminRoutes);
app.use("/news", newsRoutes); // 只要網址開頭是 /news，就會進去 news.js 找
app.use("/menu", menuRoutes);
app.use("/inline.app", buyRoutes);
app.use("/", indexRoutes);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
