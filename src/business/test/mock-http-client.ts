import { type HttpPostClient } from 'business/protocols/http/http-post-client';

export class HttpPostClientSpy implements HttpPostClient {
    public url?: string;
    public body?: object;

    public async post(params: HttpPostClient.Params): Promise<void> {
        this.url = params?.url;
        this.body = params?.body;

        await Promise.resolve();
    }
}
