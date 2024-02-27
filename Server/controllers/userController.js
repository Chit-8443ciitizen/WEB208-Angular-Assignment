const User = require("../models/User");

exports.getUserId = async (req, res, next) => {
  try {
    const userId = await User.findOne({ username:  req.params.username });
    res.status(200).json(userId);
  } catch (error) {
    console.log(error);
  }
};

exports.getUserLevel = async (req, res, next) => {
  try {
    const userLevel = await User.findOne({ username:  req.params.level });
    res.status(200).json(userLevel);
  } catch (error) {
    console.log(error);
  }
};

// exports.getUserbyUsername = async (req, res, next) => {
//   try {
//     const userName = await User.findOne({ username:  req.params.username });
//     res.status(200).json(userName);
//   } catch (error) {
//     console.log(error);
//   }
// };

exports.updateUser = async (req, res, next) => {
  const _id = req.params.id;
  const { level, status } = req.body;
  User.findById(_id)
    .then((user) => {
      user.level = level;
      user.status = status;
      return user.save();
    })
    .then((result) => {
      res.status(200).json({
        status: true,
        message: "Cập Nhật Thành Viên Thành Công",
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.deleteUser = (req, res, next) => {
  const _id = req.params.id;
  Area.deleteOne({ _id: _id })
    .then((post) => {
      if (post.deletedCount > 0) {
        res.status(200).json({ status: true, message: "Xóa user Thành Công" });
      } else {
        const error = new Error("Không tìm thấy danh mục này");
        error.statusCode = 404;
        throw error;
      }
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
