import { User } from 'src/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

interface LoginResponse {
  status: number;
  data: any;
  message: string;
}

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<LoginResponse> {
    try {
      const user = await this.userRepository.findOneBy({ email: loginDto.email });

      if (!user) {
        return {
          status: 404,
          data: null,
          message: "User not found."
        };
      }

      const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);

      if (!isPasswordValid) {
        return {
          status: 400,
          data: null,
          message: "The email or password is incorrect."
        };
      }

      const payload = { userId: user.id, role: user.role };
      const token = this.jwtService.sign(payload);

      return {
        status: 200,
        data: { token },
        message: "Login successful."
      };

    } catch (error) {
      return {
        status: 500,
        data: null,
        message: error.message || 'Login failed due to server error.'
      };
    }
  }
}
