import { Injectable, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';

@Injectable()
export class LoginThrottlerGuard extends ThrottlerGuard {
    protected async throwThrottlingException(context: ExecutionContext): Promise<void> {
        const isProd = process.env.NODE_ENV === 'production';  

        const retryAfter = isProd ? 3600 : 60;
        throw new HttpException(
            {
                message: 'IP bloqueada',
                retryAfterSeconds: retryAfter,
            },
            HttpStatus.TOO_MANY_REQUESTS,
        );
    }
}