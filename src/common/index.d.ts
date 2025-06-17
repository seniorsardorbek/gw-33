import { Request } from "express";
import { Roles } from '../auth/roles.decorator';

export interface CRequest extends Request {
    user: {
        id: string,
        role: 'admin' | "client"
    }
} 