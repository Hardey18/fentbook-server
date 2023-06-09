import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
  service: process.env.TRANSPORT_SERVICE,
  auth: {
    user: process.env.TRANSPORT_USERNAME,
    pass: process.env.TRANSPORT_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export = {
  sendEmail(from: string, to: string, subject: string, html: string): Promise<unknown> {
    return new Promise((resolve, reject) => {
      transport.sendMail({ from, subject, to, html }, (err: any, info: any) => {
        if (err) reject(err);
        resolve(info);
      });
      transport.verify(function (error, success) {
        if (error) {
          console.log("BIG ERROR", error);
        } else {
          console.log("Server is ready to take our messages");
        }
      });
    });
  },
};
