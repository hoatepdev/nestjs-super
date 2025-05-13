import { Controller, Post, Body, HttpCode, HttpStatus, UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service'
import {
  LoginBodyDto,
  LoginResponseDto,
  LogoutBodyDTO,
  LogoutResponseDTO,
  RefreshTokenBodyDto,
  RefreshTokenResponseDTO,
  RegisterBodyDto,
  RegisterResponseDto,
} from './auth.dto'
import { AccessTokenGuard } from 'src/shared/guards/access-token.guard'
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @UseInterceptors(ClassSerializerInterceptor)
  // @SerializeOptions({
  //   type: RegisterResponseDto,
  // })
  @Post('register')
  async register(@Body() body: RegisterBodyDto) {
    const user = await this.authService.register(body)
    return new RegisterResponseDto(user)
  }

  @Post('login')
  async login(@Body() body: LoginBodyDto) {
    const tokens = await this.authService.login(body)
    return new LoginResponseDto(tokens)
  }

  @Post('refresh-token')
  @UseGuards(AccessTokenGuard)
  @HttpCode(HttpStatus.OK)
  async refreshToken(@Body() body: RefreshTokenBodyDto) {
    const tokens = await this.authService.refreshToken(body.refreshToken)
    return new RefreshTokenResponseDTO(tokens)
  }

  @Post('logout')
  async logout(@Body() body: LogoutBodyDTO) {
    return new LogoutResponseDTO(await this.authService.logout(body.refreshToken))
  }
}
