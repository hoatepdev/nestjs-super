import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { AUTH_TYPE_KEY, AuthTypeDecoratorPayload } from '../decorators/auth.decorator'
import { AccessTokenGuard } from './access-token.guard'
import { APIKeyGuard } from './api-key.guard'
import { AuthType, ConditionalGuard } from '../constants/auth.constant'

@Injectable()
export class AuthenticationGuard implements CanActivate {
  private readonly authTypeGuardMap: Record<string, CanActivate>

  constructor(
    private readonly reflector: Reflector,
    private readonly accessTokenGuard: AccessTokenGuard,
    private readonly apiKeyGuard: APIKeyGuard,
  ) {
    this.authTypeGuardMap = {
      [AuthType.Bearer]: this.accessTokenGuard,
      [AuthType.APIKey]: this.apiKeyGuard,
      [AuthType.None]: { canActivate: () => true },
    }
  }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const authTypeValues = this.reflector.getAllAndOverride<AuthTypeDecoratorPayload | undefined>(AUTH_TYPE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]) ?? { authTypes: [AuthType.None], options: { conditional: ConditionalGuard.And } }

    const guards = authTypeValues.authTypes.map((authType) => this.authTypeGuardMap[authType])

    let error = new UnauthorizedException()

    if (authTypeValues.options?.conditional === ConditionalGuard.Or) {
      for (const instance of guards) {
        const canActive = await Promise.resolve(instance.canActivate(context)).catch((err) => {
          error = err
          return false
        })
        if (canActive) return true
      }
      throw error
    } else {
      for (const instance of guards) {
        const canActive = await Promise.resolve(instance.canActivate(context)).catch((err) => {
          error = err
          return false
        })

        if (!canActive) throw error
      }
      return true
    }
  }
}
