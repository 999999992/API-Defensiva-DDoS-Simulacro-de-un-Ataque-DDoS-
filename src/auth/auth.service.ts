import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
    validateUser(username: string, pass: string): any {
        return { id: 1, username: 'admin'};
    }
}