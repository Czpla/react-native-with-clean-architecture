import { type HttpPostClient } from '@/business/protocols/http/http-post-client';
import axios from 'axios';

export class AxiosHttpClient {
    async post(params: HttpPostClient.Params<any>): Promise<void> {
        await axios(params.url);
    }
}
