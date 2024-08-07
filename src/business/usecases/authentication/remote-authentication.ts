import { type HttpPostClient } from '@/business/protocols/http/http-post-client';
import { type Authentication } from '@/domain/usecases/authentication';

export class RemoteAuthentication {
    constructor(private readonly url: string, private readonly httpPostClient: HttpPostClient) {}

    async auth(params: Authentication.Params): Promise<void> {
        await this.httpPostClient.post({
            url: this.url,
            body: params,
        });
    }
}
