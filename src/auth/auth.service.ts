import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { UserService } from 'src/user/user.service';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    private userService: UserService,
    private prisma: PrismaService,
  ) {}

  // Логин пользователя
  async login(dto: AuthDto) {
    const user = await this.validateUser(dto);
    const tokens = this.issueToken(user.id);

    return { user, ...tokens };
  }

  // Регистрация пользователя
  async register(dto: AuthDto) {
    const oldUser = await this.userService.getByEmail(dto.email);

    if (oldUser) throw new NotFoundException('Пользователь уже существует');

    const user = await this.userService.create(dto);
    const tokens = this.issueToken(user.id);

    return { user, ...tokens };
  }

  async getNewTokens(refreshToken: string) {
    const result = await this.jwt.verifyAsync(refreshToken);

    if (!result) throw new UnauthorizedException('Невалидные refresh токены');

    const user = await this.userService.getById(result.id);
    const tokens = this.issueToken(user.id);

    return { user, ...tokens };
  }

  // Генерация токенов
  issueToken(userId: string) {
    const data = { id: userId };

    // Генерация токена через метод sign из библы, который будет жить 1h
    const accessToken = this.jwt.sign(data, { expiresIn: '1h' });

    const refreshToken = this.jwt.sign(data, { expiresIn: '1h' });

    return { accessToken, refreshToken };
  }

  //Валидация пользователя
  private async validateUser(dto: AuthDto) {
    const user = await this.userService.getByEmail(dto.email);

    if (!user) throw new NotFoundException('Пользователь не найден');

    return user;
  }
}
