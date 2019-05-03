var router = require('express').Router();
var Company = require('../models/company');
const bcrypt = require('bcrypt');
const JWT_SIGN_SECRET = 'KJN4511qkqhxq5585x5s85f8f2x8ww8w55x8s52q5w2q2';
const saltRounds = 10;
var User = require('../models/user');
var passport = require('passport');
const multer = require("multer");
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var ObjectID = mongoose.Types.ObjectId;
var mailer = require("nodemailer");

var transporter = mailer.createTransport({
  service: 'gmail',
  port: 25,
  secure: false,
  auth: {
    user: "andolsiayoub@gmail.com",
    pass: "wxcv1234"
  },
  tls: {
    rejectUnauthorized: false
  }
})

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})

var upload = multer({ storage: storage });

router.post('/addCompany', upload.single('logo'), function (req, res) {
  motpass = req.body.password;
  var hash = bcrypt.hashSync(motpass, saltRounds);
  req.body.password = hash;
  req.body.logo = req.file.filename;
  var company = new Company(req.body);
  company.save(function (err, company) {
    if (err) {
      res.send(err);
    }
    var user = new User(req.body);
    user.company = company._id;
    user.save(async function (err2, user) {
      if (err2) {
        res.send(err2);
      }
      var mail = {
        from: "ADMIN AYOUB <andolsiayoub@gmail.com>",
        to: user.email,
        subject: "Your account has been created succefully !!",
        text: `Welcome ${company.nameCompany} to our WEB APP hope you enjoy your time here !!`,
        html: `<b>Welcome <strong>${company.nameCompany}</strong> to our WEB APP hope you enjoy your time here !!</b>`
      }
      await transporter.sendMail(mail, function(error, response) {
        if (error) {
          console.log("email error: " + error);
        } else {
          console.log("Message sent: " + response.message);
        }
        transporter.close();
      })
      res.send(user);
    })
  })
})

router.get('/getCompany/:id', passport.authenticate('bearer', { session: false }), function (req, res) {
  var id = ObjectID(req.params.id);
  Company.findById(id).exec((err, company) => {
    if (err) {
      res.send(err);
    }
    res.send(company);
  })
})

router.post('/updateCompany/:id', upload.single('logo'), passport.authenticate('bearer', {session: false}), function (req, res) {
  var id = req.params.id
  req.body.logo = req.file.filename;
  Company.findByIdAndUpdate({"_id": id}, {$set: req.body}).exec(function (err, company) {
    if (err) {
      res.send(err)
    }
    else {
      User.findOneAndUpdate({"company": company._id }, {$set: req.body}).exec(function (err, user) {
        if (err) {
          res.send(err);
        }
        User.findById(user._id).exec(function (err, user2) {
          const token = jwt.sign({data: user2},
            JWT_SIGN_SECRET, {
            expiresIn: '1h'
            });
          res.send({
            Message: 'Update token ',
            access_token: token,
          })
        })
      })
    }
  })
})

router.post('/removeNotifications/:companyId', function (req, res) {
  Company.findByIdAndUpdate({_id: req.param.companyId}, {$set: {notificationsNumber: 0}}, function(err, notf) {
    if (err) {
      res.send(err);
    }
    res.send(notf);
  })
})

module.exports = router;
