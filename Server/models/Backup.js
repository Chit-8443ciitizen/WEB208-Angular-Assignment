const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const postSchema = Schema({
  // Định nghĩa cấu trúc của dữ liệu backup
  // Ví dụ:
  name: String,
  age: Number,
  // Thêm các trường khác cần backup
});

module.exports = mongoose.model("Backup", postSchema);
