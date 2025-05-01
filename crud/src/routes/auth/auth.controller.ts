import { Controller, Post, Body } from '@nestjs/common'
import { AuthService } from './auth.service'
import { RegisterBodyDto } from './auth.dto'
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() body: RegisterBodyDto) {
    console.log('⭐ body', body)

    return this.authService.register(body)
  }

  //   @Post('login')
  //   login(@Body() body: any) {
  //     return this.authService.login(body)
  //   }
}
