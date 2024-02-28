const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const apiRoutes = require("./routes/api");
const cors = require('cors');
const {showAllDatabase} = require("./connect_mongo")

const app = express();
const port = 4000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors({
  origin: '*', //  '*': tất cả các nguồn được phép , http://localhost:4200
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true
}));

app.use("/api", apiRoutes);

mongoose // MongoDB connection
  .connect(
    "mongodb+srv://admin0:Admin123@atlascluster.htffjso.mongodb.net/quanlydoanhnghiep?retryWrites=true&w=majority"
    )
  .then(() => {
    console.log("MongoDB is ready");

    app.get('/backup', async (req, res) => {
      // Tạo một tệp để lưu trữ dữ liệu backup
      const backupFile = 'backup.json';

      // Lấy tất cả các collection trong cơ sở dữ liệu
      mongoose.connection.db.collections(async function (err, collections) {
        if (err) {
          console.error("Error getting collections:", err);
          res.status(500).send('Error getting collections');
          return;
        }

        const data = {};

        // Lặp qua từng collection để lấy dữ liệu
        for (let collection of collections) {
          const docs = await collection.find({}).toArray();
          data[collection.collectionName] = docs;
        }

        // Lưu dữ liệu vào tệp JSON
        fs.writeFileSync(backupFile, JSON.stringify(data, null, 2));
        console.log(`Backup successful. Data saved to ${backupFile}`);

        // Gửi thông báo và cho phép tải xuống tệp backup.json
        res.download(backupFile, 'backup.json', (err) => {
          if (err) {
            console.error('Error downloading file:', err);
            res.status(500).send('Error downloading file');
          } else {
            console.log('Backup file sent successfully');
          }
        });
      });
    });
    
    app.listen(port, () => {
      console.log(`Server is running on port: http://localhost:${port}/`);
      // if(!showAllDatabase()){
      //   console.log("show not ok")
      // } else {
      //   console.log(" ok")
      // }
      
    });
  })
  .catch((err) => {
    console.log(`MongoDB error: ${err}`);
  });
