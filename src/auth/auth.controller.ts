import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { LoginDto } from './dtos/login.dto';
import { AuthService } from './auth.service';
import { LoginResponseDto } from './dtos/login-response.dto';
import { Public } from '../utils/public.decorator';
import { RegisterUserDto } from './dtos/register-user.dto';
import { RegistrationResponseDto } from './dtos/registration-response.dto';
import { UserService } from '../user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<LoginResponseDto> {
    const accessToken = await this.authService.login(loginDto);
    return { accessToken };
  }

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('register')
  async register(
    @Body() dto: RegisterUserDto,
  ): Promise<RegistrationResponseDto> {
    const user = await this.userService.createUser(dto);
    // can use registrationToken to activate account
    const registrationToken = await this.authService.generateToken(user);
    return { registrationToken };
  }
}
