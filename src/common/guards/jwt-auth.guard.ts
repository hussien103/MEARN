/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException('You have to Login First');
    }
    const [type, token] = authHeader.split(' ');
    if (!token || type !== 'Bearer') {
      throw new UnauthorizedException('Not a valid authorization format!');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token);
      (request as any).user = payload;
      console.log('payload', payload);

      return true;
    } catch (error) {
      throw new UnauthorizedException('invalid or expired token');
    }
  }
}
