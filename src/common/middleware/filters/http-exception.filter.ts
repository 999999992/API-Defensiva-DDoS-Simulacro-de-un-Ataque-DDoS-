import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from "@nestjs/common";
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();
        const exceptionResponse: any = exception.getResponse();

        // Estructurar la respuesta JSON 
        response.status(status).json({
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            // Si el guard envio un objeto (como el de IP bloqueada), lo desestructuramos aca.
            ...(typeof exceptionResponse === 'object'
                ? exceptionResponse
                : { message: exceptionResponse }),
            });
        }
    }