import { Controller, Post, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { LoginThrottlerGuard } from './guards/login-throttler.guard';

@Controller('auth')
export class AuthController {
  
  @UseGuards(LoginThrottlerGuard)
  @Throttle({ default: { limit: 5, ttl: 60000 } }) 
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login() {
    return { message: 'Credenciales válidas' };
  }
}