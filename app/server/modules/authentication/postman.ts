const nodemailer = require('nodemailer');

let transporter: any = null;

// setup e-mail data with unicode symbols
const defaultMailOptions = {
  from: '"Site Admin 👥" <noreply@gmail.com>', // sender address
};

export const mailTemplates = {
  resetPassword(options: any) {
    const { to, url} = options;
    return {
      from: defaultMailOptions.from,
      to,
      subject: `Reset password`,
      text: `Dear User

To reset your password, simply click the link below.

${url}

Thanks.


`
    };
  },
  sendVerification(options: any) {
    const { to, url} = options;
    return {
      from: defaultMailOptions.from,
      to,
      subject: `Verify account`,
      text: `Dear User

To verify your account, simply click the link below.

${url}

Thanks.


`
    };
  }
};

// send mail with defined transport object

export function sendMail(mailOptions: any) {
  if (!transporter) {
    if (!process.env.MAIL_URL) {
      console.error('You need to set environment variable: MAIL_URL');
      return;
    } else {
      console.log('Mail URL: ' + process.env.MAIL_URL);
    }
    transporter = nodemailer.createTransport(process.env.MAIL_URL);
  }
  return new Promise((resolve: Function, reject: Function) => {
    transporter.sendMail(mailOptions, function (error: any, info: any) {
      if (error) {
        return reject(error);
      }
      resolve('Message sent: ' + info.response);
    });

  });
}

exports = {
  defaultMailOptions,
  mailTemplates,
  sendMail
};
