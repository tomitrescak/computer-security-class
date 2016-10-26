declare module 'nodemailer-direct-transport' {
  namespace nodeMailer {
    export class DirectOptions {};
  }
  export = nodeMailer;
}

declare module 'nodemailer-smtp-transport' {
  namespace nodeMailer {
    export class SmtpOptions {};
  }
  export = nodeMailer;
}

declare module 'bluebird' {
  var a: any;
  export = a;
}