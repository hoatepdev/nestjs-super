import { SetMetadata } from '@nestjs/common'
import { AuthType, AuthTypeType, ConditionalGuard, ConditionalGuardType } from '../constants/auth.constant'

export const AUTH_TYPE_KEY = 'auth_type'

export type AuthTypeDecoratorPayload = {
  authTypes: AuthTypeType[]
  options: { conditional: ConditionalGuardType }
}

export const Auth = (
  authTypes: AuthTypeType[],
  options: { conditional: ConditionalGuardType } = { conditional: ConditionalGuard.And },
) => SetMetadata(AUTH_TYPE_KEY, { authTypes, options })
