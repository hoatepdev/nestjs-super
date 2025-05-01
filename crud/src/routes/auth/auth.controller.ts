import {
  Controller,
  Post,
  Body,
  // UseInterceptors, ClassSerializerInterceptor, SerializeOptions
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { RegisterBodyDto, RegisterResponseDto } from './auth.dto'
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

  //   @Post('login')
  //   login(@Body() body: any) {
  //     return this.authService.login(body)
  //   }
}
