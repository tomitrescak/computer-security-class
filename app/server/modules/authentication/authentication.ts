import MongoEntity from '../../connectors/mongo_entity';
import DataLoader = require('dataloader');
import * as Random from 'meteor-random';
// import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt-nodejs';
import * as jwt from 'jsonwebtoken';
import config from './config';

import sha256 = require('meteor-sha256');

import { sendMail, mailTemplates } from './postman';

export interface Token {
  hashedToken: HashedToken;
  user: User;
  expires: Date;
}

export interface HashedToken {
  userId: string;
  roles: string[];
  type: string;
  email?: string;
}

// export interface Password = {
//   bcrypt: string;
// }

export interface PasswordService {
  bcrypt: string;
}

export interface EmailService {
  verificationTokens: string;
}

export interface ResumeService {
  loginTokens: HashedToken[];
}

export interface AccountsServices {
  password: PasswordService;
  email: EmailService;
  resume: ResumeService;
}

export interface Profile {
  name: string;
}

export interface Email {
  address: string;
  verified: boolean;
}

export interface UserEntity {
  _id: string;
  createdAt: Date;
  services: AccountsServices;
  emails: Email[];
  profile: Profile;
  roles: string[];
}

// helper functions

function calculateHash(text: string): string {
  // let hash = crypto.createHash('sha256');
  // hash.update(text);
  // return hash.digest('base64');
  return sha256(text);
}

function hashPassword(password: string) {
  password = calculateHash(password);
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};

function checkPassword(user: UserEntity, password: string) {
  let result: { userId: string, error?: Error } = {
    userId: user._id
  };

  password = calculateHash(password);

  if (!bcrypt.compareSync(password, user.services.password.bcrypt)) {
    result.error = new Error('Incorrect password');
  }
  return result;
};

function createToken(user: UserEntity, type: string, expirationInHours: number, email?: string) {
  // const hashedToken = calculateHash(Random.secret());
  const expires = new Date(new Date().getTime() + expirationInHours * 60 * 60 * 1000);

  const token: HashedToken = {
    userId: user._id,
    roles: user.roles,
    type
  };

  if (email) {
    token.email = email;
  }

  const hashedToken = jwt.sign(
    token,
    config.jwtSecret,
    { expiresIn: expirationInHours + 'h' }
  );

  return {
    hashedToken,
    expires,
    user: {
      _id: user._id,
      profile: user.profile,
      roles: user.roles,
      emails: user.emails
    }
  };
}

export default class User extends MongoEntity<UserEntity> {

  static options: {
    sendVerificationMail: boolean
  };

  userLoader: any;

  modifyContext(hashedToken: string, context: any) {
    let token: HashedToken;
    try {
      token = jwt.verify(hashedToken, config.jwtSecret);
      context.userId = token.userId;
      context.userRoles = token.roles;
    } catch (err) {
      console.error(err);
    }
  }

  async create(username: string, email: string, password: string, profile: Profile) {
    if (!username && !email) {
      throw new Error('Need to set a username or email');
    }

    let user: any = {
      _id: Random.id(),
      createdAt: new Date(),
      services: {}
    };
    if (password) {
      let hashed = hashPassword(password);
      user.services.password = { bcrypt: hashed };
    }

    if (username) {
      user.username = username;
    }
    if (email) {
      user.emails = [{ address: email, verified: false }];
    }

    const value = await this.collection.findOne({ 'emails.address': email });
    if (value != null) {
      throw new Error('User with this email already exists!');
    }
    await this.collection.insertOne(user);
    return user;
  }

  async login(email: string, password: string) {
    const user = await this.collection.findOne({ 'emails.address': email });

    // possibly there is no user
    if (!user) {
      throw new Error('User with that email address not found.');
    };

    let result = checkPassword(user, password);

    if (result.error) {
      throw new Error('Invalid credentials');
    }

    // find email and check if it is verified
    if (config.requireVerification) {
      const userEmail = user.emails.find((e) => e.address === email);
      if (!userEmail.verified) {
        throw new Error('Email not verified');
      }
    }

    return createToken(user, 'resume', 168);
  }

  async sendEmailToUser(to: string, type: string, template: Function) {
    const user = await this.collection.findOne({ 'emails.address': to });
    if (!user) {
      throw new Error('User email does not exist');
    }

    let token = createToken(user, type, 1, to).hashedToken;

    // create url
    let url = `${process.env.ROOT_URL}?${type}=${token}`;
    let email = template({ url, to });

    return await sendMail(email);
  }

  requestVerification(email: string) {
    // insert verification token to database and send email
    return this.sendEmailToUser(email, 'verifyEmail', mailTemplates.sendVerification);
  }

  async verify(hashedToken: string) {
    let token: HashedToken;
    try {
      token = jwt.verify(hashedToken, config.jwtSecret);
    } catch (err) {
      throw err;
    }

    if (token.type !== 'verifyEmail') {
      throw new Error('This is not a verify email token');
    }

    // now login
    const user = await this.collection.findOne(({ _id: token.userId }));
    if (!user) {
      throw new Error('User does not exist!');
    }

    const emailIndex = user.emails.findIndex((e) => e.address === token.email);

    // create a new password and update collection
    this.collection.updateOne({ _id: token.userId }, { $set: { ['emails.' + emailIndex + '.verified']: true } });
    return createToken(user, 'resume', 168);
  }

  async resume(hashedToken: string) {
    let token: HashedToken;
    try {
      token = jwt.verify(hashedToken, config.jwtSecret);
    } catch (err) {
      // This could be any number of reasons but in short: user not authed.
      // JsonWebTokenError: invalid signature
      // JsonWebTokenError: invalid token
      // TokenExpiredError: jwt expired
      // Passed as context.jwtError for debugging but can be safely ignored.
      throw err;
    }

    if (token.type !== 'resume') {
      throw new Error('This is not a resume token');
    }
    // now login
    const user = await this.findOneCachedById(token.userId);
    if (!user) {
      throw new Error('User does not exist!');
    }
    return createToken(user, 'resume', 168);
  }

  requestResetPassword(email: string) {
    return this.sendEmailToUser(email, 'resetPassword', mailTemplates.resetPassword);
  }

  async resetPassword(hashedToken: string, newPassword: string) {

    let token: HashedToken;
    try {
      token = jwt.verify(hashedToken, config.jwtSecret);
    } catch (err) {
      // This could be any number of reasons but in short: user not authed.
      // JsonWebTokenError: invalid signature
      // JsonWebTokenError: invalid token
      // TokenExpiredError: jwt expired
      // Passed as context.jwtError for debugging but can be safely ignored.
      throw err;
    }

    if (token.type !== 'resetPassword') {
      throw new Error('This is not a reset token');
    }

    // create a new password and update collection
    let hashed = hashPassword(newPassword);
    this.collection.updateOne({ _id: token.userId }, { $set: { 'services.password.bcrypt': hashed } });

    // now login
    const user = await this.collection.findOne(({ _id: token.userId }));
    if (!user) {
      throw new Error('User does not exist!');
    }
    return createToken(user, 'resume', 168);
  }

  getUser(id: string) {
    return this.collection.findOne({ _id: id });
  }

  async getUsers() {
    return this.collection.find().toArray();
  }

  getCachedUsers() {
    if (!this.userLoader) {
      this.userLoader = new DataLoader((param) => {
        return Promise.all([this.collection.find().toArray()]);
      });
    }
    return this.userLoader.load(0);
  }

  fixtures() {
    this.collection.count({}, (err, num) => {
      if (num === 0) {
        this.collection.insert({ _id: this.random.id(), name: 'Tomas Trescak ' });
      }
    });
  }
}
