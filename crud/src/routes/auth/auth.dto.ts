import { IsEmail, IsNotEmpty, IsString } from 'class-validator'
import {
  Exclude,
  //  Expose
} from 'class-transformer'
export class LoginBodyDto {
  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsNotEmpty()
  @IsString()
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

export class RefreshTokenResponseDto extends LoginResponseDto {
  constructor(partial: Partial<RefreshTokenResponseDto>) {
    super(partial)
    Object.assign(this, partial)
  }
}
