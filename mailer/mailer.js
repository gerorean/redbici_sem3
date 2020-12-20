const nodemailer = require('nodemailer');

const mailConfig = {
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: 'sammie.trantow34@ethereal.email',
    pass: 'Q9X1j8Fskw34eYq7MK'
  }
};

module.exports = nodemailer.createTransport(mailConfig);