const express = require("express");
const app = express();
const port = 3000;
/*middlewares */
app.use(express.json()); //http req content-type json to jsobject
app.use(express.urlencoded({ extended: true })); //http req content-type form to jsobject
app.use(express.static("public"));
app.set("view engine", "ejs");
/*首頁*/
app.get("/", (req, res) => {
  res.send("Hello World!");
});
/*首頁*/
app.get("/index", (req, res) => {
  res.render("index");
});
/*最新消息 */
app.get("/news/list", (req, res) => {
  res.send("這是news page");
});
app.get("/news/content/:newsurl", (req, res) => {
  res.send("這是news_content page");
});
/*嘗美食*/
app.get("/menu/list", (req, res) => {
  res.send("這是menu page");
});
app.get("/menu/content/:menu", (req, res) => {
  !req.query
    ? res.send("這是menu輪換圖片頁面")
    : res.send("現在在gid=" + req.query.gid + "&pid=" + req.query.pid);
});
/*找門市*/
app.get("/shop", (req, res) => {
  res.send("這是shop page");
});
/* 線上訂位*/
app.get("/inline.app/booking", (req, res) => {
  res.sendFile("booking.html", { root: __dirname });
});
/*線上點餐*/
app.get("/inline.app/order", (req, res) => {
  res.sendFile("order.html", { root: __dirname });
});
/*會員中心*/
app.get("/member", (req, res) => {
  res.send("這是member page");
});
/*捐血公益*/
app.get("/event", (req, res) => {
  res.send("這是event page");
});
app.all("{/*any}", (req, res) => {
  res.status(404).send("你所找頁面不存在");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
