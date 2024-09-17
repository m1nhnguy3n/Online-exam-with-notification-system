import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService
  ) {}

  async login(user: any) {
    const payload = { sub: user.id, role: user.role };

    return { access_token: this.jwtService.sign(payload) };
  }

  async validateUser(email, password) {
    const user = await this.usersService.findOneByEmail(email);

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!user || !isPasswordValid) {
      return null;
    }

    return user;
  }
}
