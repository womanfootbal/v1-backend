import * as bcrypt from 'bcryptjs';

export class Crypto {
  static async encrypt(password: string) {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    return bcrypt.hash(password, salt);
  }
}
