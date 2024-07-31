import { type HttpPostClient } from 'business/protocols/http/http-post-client';

export class HttpPostClientSpy implements HttpPostClient {
    public url?: string;

    public async post(url: string): Promise<void> {
        this.url = url;
        await Promise.resolve();
    }
}
