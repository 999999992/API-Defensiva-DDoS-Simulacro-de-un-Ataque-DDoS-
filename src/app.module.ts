import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { APP_GUARD, Reflector } from '@nestjs/core';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { AuthModule } from './auth/auth.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { RATE_LIMITS } from './common/constants';

@Module({
  imports: [
    ThrottlerModule.forRoot([{
      // En Nest 11 se usa 'ttl' en segundos (o milisegundos según la versión exacta)
      // Si RATE_LIMITS.GLOBAL_TTL es 60000.
      ttl: 60000, 
      limit: 10,
    }]),
    AuthModule,
  ],
  providers: [
    Reflector, // Esto soluciona el error de dependencias
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}