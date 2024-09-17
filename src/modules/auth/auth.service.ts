import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { MailDTO } from 'src/shared/interfaces/mail.dto';
import { MailService } from 'src/shared/services/mail.service';
import { ResetPasswordTemplate } from 'src/shared/template/reset-password.template';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly mailService: MailService
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

  async forgotPassword(userEmail: string) {
    const foundUser = await this.usersService.findOneByEmail(userEmail);
    const payload = {
      userId: foundUser.id
    };
    const token = this.jwtService.sign(payload);
    const resetLink = `${process.env.LINK_APP}?token=${token}`;
    const newTemplate = new ResetPasswordTemplate(resetLink);
    const dto: MailDTO = {
      from: 'Auth-backend service',
      to: userEmail,
      subject: 'Password reset',
      html: newTemplate.getTemplate()
    };
    await this.mailService.sendMail(dto);
  }

  async resetPassword(token: string, newPassword: string) {
    try {
      const payload = this.jwtService.verify(token, { secret: process.env.JWT_SECRET_KEY });
      const password = await bcrypt.hash(newPassword, 10);
      return await this.usersService.updatePassword(password, payload.userId);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
