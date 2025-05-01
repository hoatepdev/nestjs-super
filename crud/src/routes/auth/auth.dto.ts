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
