import { Injectable } from '@nestjs/common'
import { HashingService } from 'src/shared/services/hashing.service'
import { RegisterBodyDto } from './auth.dto'
import { PrismaService } from 'src/shared/services/prisma.service'
@Injectable()
export class AuthService {
  constructor(
    private readonly hashingService: HashingService,
    private readonly prismaService: PrismaService,
  ) {}

  async register(body: RegisterBodyDto) {
    const hashedPassword = await this.hashingService.hashPassword(body.password)
    return this.prismaService.user.create({
      data: {
        ...body,
        password: hashedPassword,
      },
    })
  }
}
