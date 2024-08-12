import { type HttpPostClient, type HttpResponse, HttpStatusCode } from '@/business/protocols/http';

export class HttpPostClientSpy<T, R> implements HttpPostClient<T, R> {
    public url?: string;
    public body?: T;
    public response: HttpResponse<R> = {
        statusCode: HttpStatusCode.ok,
    };

    public async post(params: HttpPostClient.Params<T>): Promise<HttpResponse<R>> {
        this.url = params?.url;
        this.body = params?.body;

        return await Promise.resolve(this.response);
    }
}
