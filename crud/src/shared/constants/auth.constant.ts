export const REQUEST_USER_KEY = 'user'

export const AuthType = {
  Bearer: 'bearer',
  APIKey: 'api_key',
  None: 'none',
} as const

export type AuthTypeType = (typeof AuthType)[keyof typeof AuthType]

export const ConditionalGuard = {
  And: 'and',
  Or: 'or',
} as const

export type ConditionalGuardType = (typeof ConditionalGuard)[keyof typeof ConditionalGuard]
