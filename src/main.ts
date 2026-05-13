import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/middleware/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Se activa el filtro global
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(3000);
  console.log('La API protegida se encuentra en: http://localhost:3000');
}
bootstrap();
