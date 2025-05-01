import { Injectable } from '@nestjs/common'
import { HashingService } from 'src/shared/services/hashing.service'
import { RegisterBodyDto } from './auth.dto'
@Injectable()
export class AuthService {
  constructor(private readonly hashingService: HashingService) {}

  async register(body: RegisterBodyDto) {
    const hashedPassword = await this.hashingService.hashPassword(body.password)
    return {
      ...body,
      password: hashedPassword,
    }
  }
}
