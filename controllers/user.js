var _ = require('lodash');
var async = require('async');
var crypto = require('crypto');
var nodemailer = require('nodemailer');
var passport = require('passport');
var User = require('../models/User');
var validator = require('validator');

/**
 * GET /login
 * Login page.
 */
exports.getLogin = function(req, res) {
  if (req.user) {
 return res.redirect('/admin');
}
  res.render('account/login', {
    title: 'Login'
  });

};

/**
*
*LoginBolum
*/
exports.getLoginBolum = function(req, res) {
  if (req.user) {
 return res.redirect('/logout');
}
  res.render('account/loginBolum', {
    title: 'LoginBolum'
  });

};

/**
 * GET /logout
 * Log out.
 */
exports.logout = function(req, res) {
  req.logout();
  res.redirect('/');
};

//Google logout
exports.glogout = function(req, res) {
  req.logout();
  res.redirect('/login');
};



/**
* GET /admin
*/
exports.isAdmin = function(req, res) {
  User.find({}, function(err, users) {

    if (req.user.email == 'zeynep.ucar016@gmail.com') {
      req.user.profile.name =  'admin';
    }
    if(req.user.email != 'zeynep.ucar016@gmail.com'){
      return res.redirect('/');
    }
    res.render('account/admin', {
      title: 'Admin',
      users: users
    })
  });
};

exports.isKisiler = function(req, res) {
  User.find({}, function(err, users) {

    if (req.user.email == 'zeynep.ucar016@gmail.com') {
      req.user.profile.name =  'admin';
    }
    if(req.user.email != 'zeynep.ucar016@gmail.com'){
      return res.redirect('/');
    }
    res.render('account/kisiler', {
      title: 'Admin',
      users: users
      })
      console.log(users);
  });
};

/**
 * GET /account
 * Profile page.
 */
exports.getAccount = function(req, res) {
  res.render('account/profile', {
    title: 'Hesab Yöneticisi'
  });
};

/**
 * POST /account/profile
 * Update profile information.
 */
exports.postUpdateProfile = function(req, res, next) {
  User.findById(req.user.id, function(err, user) {
    if (err) {
      return next(err);
    }
    user.email = req.body.email || '';
    user.profile.name = req.body.name || '';
    user.profile.location = req.body.location || '';
    user.profile.website = req.body.website || '';
    user.save(function(err) {
      if (err) {
        return next(err);
      }
      req.flash('success', { msg: 'Profile information updated.' });
      res.redirect('/account');
    });
  });
};


/**
 * POST /account/delete
 * Delete user account.
 */
exports.postDeleteAccount = function(req, res, next) {
  User.remove({ _id: req.user.id }, function(err) {
    if (err) {
      return next(err);
    }
    req.logout();
    req.flash('info', { msg: 'Your account has been deleted.' });
    res.redirect('/');
  });
};
