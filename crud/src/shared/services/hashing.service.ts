import { Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'

const saltOrRounds = 10

@Injectable()
export class HashingService {
  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, saltOrRounds)
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash)
  }
}
