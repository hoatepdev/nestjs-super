import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class LoginBodyDto {
  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsNotEmpty()
  @IsString()
  password: string
}

export class RegisterBodyDto extends LoginBodyDto {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsString()
  confirmPassword: string
}

export class SignupBodyDto {
  @IsEmail()
  @IsNotEmpty()
  email: string
}

export class SignupResponseDto {
  @IsEmail()
  @IsNotEmpty()
  email: string
}
