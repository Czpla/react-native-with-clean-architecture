import { type HttpPostClient } from '@/business/protocols/http/http-post-client';
import { HttpStatusCode, type HttpResponse } from '@/business/protocols/http/http-response';

export class HttpPostClientSpy implements HttpPostClient {
    public url?: string;
    public body?: object;
    public response: HttpResponse = {
        statusCode: HttpStatusCode.ok,
    };

    public async post(params: HttpPostClient.Params): Promise<HttpResponse> {
        this.url = params?.url;
        this.body = params?.body;

        return await Promise.resolve(this.response);
    }
}
