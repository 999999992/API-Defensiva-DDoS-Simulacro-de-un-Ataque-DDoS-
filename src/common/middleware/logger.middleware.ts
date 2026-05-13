import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger('API-DEFENSA');

  use(req: Request, res: Response, next: NextFunction) {
    const { ip, method, url } = req;
    
    res.on('finish', () => {
      const { statusCode } = res;
      if (statusCode >= 400) {
        this.logger.warn(
          `⚠️ ALERTA DE SEGURIDAD - IP: ${ip} | Método: ${method} | Ruta: ${url} | Status: ${statusCode}`
        );
      }
    });

    next();
  }
}