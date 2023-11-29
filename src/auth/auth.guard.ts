import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private jwtService: JwtService) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest()
        try{
            
            const token = req.headers.authorization.split(/\s/)[1];
            

            if( !token ) {
                throw new UnauthorizedException({message: 'Unauthorized!'})
            }
            console.log(this.jwtService)
            const user = this.jwtService.verify(token);
            console.log('reached')
            console.log('user Verified ', user)

            req.user = user;

            return true

        }catch {

            throw new UnauthorizedException({message: 'Unauthorized!'})
        }

    }

}   