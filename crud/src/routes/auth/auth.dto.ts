import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator'
import { Exclude } from 'class-transformer'
import { Match } from 'src/shared/decorators/custom.validator.decorator'
export class LoginBodyDto {
  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsNotEmpty()
  @IsString()
  @Length(6, 20, {
    message: 'Password must be between 6 and 20 characters',
  })
  password: string
}

export class LoginResponseDto {
  accessToken: string
  refreshToken: string

  constructor(partial: Partial<LoginResponseDto>) {
    Object.assign(this, partial)
  }
}

export class RegisterBodyDto extends LoginBodyDto {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsString()
  @Match('password')
  confirmPassword: string
}

export class RegisterResponseDto {
  id: number

  email: string

  name: string

  @Exclude()
  password: string

  //   @Expose()
  //   get type() {
  //     return 'register'
  //   }

  createdAt: Date

  updatedAt: Date

  constructor(partial: Partial<RegisterResponseDto>) {
    Object.assign(this, partial)
  }
}

export class RefreshTokenBodyDto {
  @IsNotEmpty()
  @IsString()
  refreshToken: string
}

export class RefreshTokenResponseDTO extends LoginResponseDto {
  constructor(partial: Partial<RefreshTokenResponseDTO>) {
    super(partial)
    Object.assign(this, partial)
  }
}

export class LogoutBodyDTO extends RefreshTokenBodyDto {}

export class LogoutResponseDTO {
  message: string
  constructor(partial: Partial<LogoutResponseDTO>) {
    Object.assign(this, partial)
  }
}
