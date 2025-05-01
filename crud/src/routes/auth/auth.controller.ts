import {
  Controller,
  Post,
  Body,
  SerializeOptions,
  // UseInterceptors, ClassSerializerInterceptor, SerializeOptions
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { RegisterBodyDto, RegisterResponseDto } from './auth.dto'
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @UseInterceptors(ClassSerializerInterceptor)
  @SerializeOptions({
    type: RegisterResponseDto,
  })
  @Post('register')
  register(@Body() body: RegisterBodyDto) {
    return this.authService.register(body)
  }

  //   @Post('login')
  //   login(@Body() body: any) {
  //     return this.authService.login(body)
  //   }
}
