import { User } from 'src/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginDto } from './dto/login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<{ token: string }> {
    const user = await this.userRepository.findOneBy({ email: loginDto.email });
    if(!user){
      throw new Error('User not found')
    }
    if (!(await bcrypt.compare(loginDto.password, user.password))) {
      throw new Error('The password is incorrect');
    }
    const payload = { userId: user.id, role: user.role };
    const token = this.jwtService.sign(payload)
    return { token };
  }
}
