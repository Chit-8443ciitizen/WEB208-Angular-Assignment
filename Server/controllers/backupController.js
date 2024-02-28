const Backup = require("../models/Backup");

exports.backupData = async (req, res) => {
    try {
      // Truy vấn tất cả dữ liệu từ database
      const data = await Backup.find({});
  
      // Lưu dữ liệu vào file .json
      fs.writeFileSync("backup.json", JSON.stringify(data, null, 2));
  
      res.status(200).json({ message: "Backup successful" });
    } catch (error) {
      console.error("Backup error:", error);
      res.status(500).json({ error: "Backup error" });
    }
  };