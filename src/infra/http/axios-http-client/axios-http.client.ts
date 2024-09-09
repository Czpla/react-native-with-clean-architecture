import { type HttpResponse } from '@/business/protocols/http';
import { type HttpPostClient } from '@/business/protocols/http/http-post-client';
import axios from 'axios';

export class AxiosHttpClient implements HttpPostClient<any, any> {
    async post(params: HttpPostClient.Params<any>): Promise<HttpResponse<any>> {
        const httpResponse = await axios.post(params.url, params.body);

        return {
            statusCode: httpResponse.status,
            body: httpResponse.data,
        };
    }
}
