import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from './role.enum';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    console.log('in authorization guard');
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    // console.log({ requiredRoles });
    if (!requiredRoles) {
      return false;
    }
    const { user } = context.switchToHttp().getRequest();
    // console.log({ user });
    return requiredRoles.some((role) => user.role?.includes(role));
  }
}
