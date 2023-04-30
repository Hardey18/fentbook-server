import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "nurudeenadeolaa@gmail.com",
    pass: "npdyslajzxfgcajr",
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
    });
  },
};
