import { BadRequestException, Injectable, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common'
import { HashingService } from 'src/shared/services/hashing.service'
import { LoginBodyDto, RegisterBodyDto } from './auth.dto'
import { PrismaService } from 'src/shared/services/prisma.service'
import { Prisma } from '@prisma/client'
import { TokenService } from 'src/shared/services/token.service'
@Injectable()
export class AuthService {
  constructor(
    private readonly hashingService: HashingService,
    private readonly prismaService: PrismaService,
    private readonly tokenService: TokenService,
  ) {}

  async register(body: RegisterBodyDto) {
    const hashedPassword = await this.hashingService.hashPassword(body.password)

    try {
      return this.prismaService.user.create({
        data: {
          ...body,
          password: hashedPassword,
        },
      })
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new BadRequestException('User already exists')
        }
      }
      throw error
    }
  }

  async login(body: LoginBodyDto) {
    const user = await this.prismaService.user.findUnique({
      where: { email: body.email },
    })

    if (!user) {
      throw new UnauthorizedException('Account does not exist')
    }

    const isPasswordValid = await this.hashingService.comparePassword(body.password, user.password)

    if (!isPasswordValid) {
      throw new UnprocessableEntityException([{ field: 'password', error: 'Invalid password' }])
    }

    return this.generateTokens({ userId: user.id })
  }

  async generateTokens({ userId }: { userId: number }) {
    const [accessToken, refreshToken] = await Promise.all([
      this.tokenService.signAccessToken({ userId }),
      this.tokenService.signRefreshToken({ userId }),
    ])

    const decodedRefreshToken = await this.tokenService.verifyRefreshToken(refreshToken)

    await this.prismaService.refreshToken.create({
      data: {
        token: refreshToken,
        userId,
        expiredAt: new Date(decodedRefreshToken.exp * 1000),
      },
    })

    return { accessToken, refreshToken }
  }

  async refreshToken(refreshToken: string) {
    try {
      const { userId } = await this.tokenService.verifyRefreshToken(refreshToken)

      await this.prismaService.refreshToken.findUniqueOrThrow({
        where: { token: refreshToken },
      })

      await this.prismaService.refreshToken.delete({
        where: { token: refreshToken },
      })

      return await this.generateTokens({ userId })
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        throw new UnauthorizedException('Refresh token has been revoked')
      }
      throw new UnauthorizedException('Invalid refresh token')
    }
  }
}
