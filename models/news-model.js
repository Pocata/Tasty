/*news-model.js*/
const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
  news_title: {
    type: String,
    required: [true, "必須有活動日期"],
  },
  start_date: {
    type: Date,
    required: [true, "必須有活動開始日"],
  },
  end_date: {
    type: Date,
  },
  news_description: {
    type: String,
    required: [true, "必須有活動概述"],
  },
  details: {
    type: String,
    required: [true, "必須有活動細項"],
  },
  news_img: {
    type: String,
    required: [true, "必須有活動宣傳照"],
  },
});

module.exports = mongoose.model("Activity", newsSchema);
