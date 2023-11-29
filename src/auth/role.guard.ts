import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable, SetMetadata, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

export const Roles = ( ...roles ) => SetMetadata('roles', roles) 

@Injectable()
export class RoleGuard implements CanActivate {

    constructor(private jwtService: JwtService, private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        try{
            const requiredRoles = this.reflector.getAllAndOverride('roles', [
                context.getHandler(),
                context.getClass()
            ]);

            console.log(requiredRoles, 'requiredRoles')

            if( !requiredRoles ) {
                return true
            }

            const req = context.switchToHttp().getRequest()
            const token = req.headers.authorization.split(/\s/)[1];
            

            if( !token ) {
                throw new UnauthorizedException({message: 'Unauthorized!'})
            }
            console.log(this.jwtService)
            const user = this.jwtService.verify(token);
            console.log('reached')
            console.log('user Verified ', user)

            req.user = user;

            return user.roles.some((role) => requiredRoles.includes(role.value))

        }catch(e) {
            console.log(e)
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN)
        }

    }

}

