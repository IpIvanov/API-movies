const userModel = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
  create: (req, res, next) => {
    userModel.find({}, (err, users) => {
      if (err) {
        next(err);
      } else {
        let userNameExists = false;
        let emailExists = false;

        users.forEach((user) => {
          if (user.name === req.body.name) {
            userNameExists = true;
          }

          if (user.email === req.body.email) {
            emailExists = true;
          }
        });

        if (!userNameExists && !emailExists) {
          userModel.create({ name: req.body.name, email: req.body.email, password: req.body.password }, (err, userInfo) => {
            if (err)
              next(err);
            else {
              const token = jwt.sign({ id: userInfo._id }, req.app.get('secretKey'), { expiresIn: '7d' });
              res.json({ status: "success", message: "User added", data: { user: userInfo, token: token } });
            }
          });
        } else {
          res.json({ status: "warning", message: "User already exists", data: { userNameExists, emailExists } })
        }
      }
    })
  },
  authenticate: (req, res, next) => {
    userModel.findOne({ email: req.body.email }, (err, userInfo) => {
      if (err) {
        next(err);
      } else {
        if (userInfo && bcrypt.compareSync(req.body.password, userInfo.password)) {
          const token = jwt.sign({ id: userInfo._id }, req.app.get('secretKey'), { expiresIn: '7d' });
          res.json({ status: "success", message: "User found", data: { user: userInfo, token: token } });
        } else {
          res.json({ status: "error", message: "Invalid credentials", data: null });
        }
      }
    });
  },
}
