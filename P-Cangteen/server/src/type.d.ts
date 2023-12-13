import { Request, Response } from "express";


declare module "jsonwebtoken" {
    export interface JwtPayload {
        role: string;
        id: string
    }
}

declare global {
    namespace Express {
        interface Request {
            user?: Record<string, any>
            userId?: string
        }
    }
}

// declare namespace Express {
//     export interface Request {
//         userId?: string
//     }
//     export interface Response {
//         userId?: string
//     }
//     export interface RequestHandler {
//         userId?: string

//     }
// }



interface Controller {
    (req: Request, res: Response): Promise<any>;
}
