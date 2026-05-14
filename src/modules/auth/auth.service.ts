/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { CreateAuthDto } from './dto/create-auth.dto';
// import { UpdateAuthDto } from './dto/update-auth.dto';
import { RegisterDto } from './dto/register.dto';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}
  async register(registeredUser: RegisterDto) {
    const hashedPassword = await bcrypt.hash(registeredUser.password, 10);
    const user = await this.userService.create({
      ...registeredUser,
      password: hashedPassword,
    });
    return { message: 'User Created!', User: { name: user.name } };
  }

  async login(loginDto: LoginDto) {
    const user = await this.userService.findByEmail(loginDto.email);
    if (!user) {
      throw new UnauthorizedException('Invalid Email or Password');
    }
    console.log(user.password) 
    console.log(loginDto.password)
    console.log(user);
    const passwordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );
    if (!passwordValid) {
      throw new UnauthorizedException('Invalid Email or Password');
    }

    return this.generateToken(user);
  }

  private generateToken(user: any) {
    const payload = {
      email: user.email,
      role: user.role,
      id: user._id.toString(),
    };
    return {
      accessToken: this.jwtService.sign(payload),
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
        id: user._id.toString(),
      },
    };
  }
}