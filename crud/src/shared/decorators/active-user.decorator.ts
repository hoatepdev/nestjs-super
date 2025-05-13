import { REQUEST_USER_KEY } from '../constants/auth.constant'
import { TokenPayload } from './../types/jwt.type'
import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export const ActiveUser = createParamDecorator((field: keyof TokenPayload | undefined, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest()
  const user: TokenPayload = request[REQUEST_USER_KEY]

  return field ? user[field] : user
})
