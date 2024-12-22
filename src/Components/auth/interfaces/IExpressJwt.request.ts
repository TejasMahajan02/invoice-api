import { Request } from 'express';
import { IPayload } from 'src/Shared/Ipayload';

export interface ExpressJWTRequest extends Request {
    user: { tokenDetails: IPayload };
}