import { InvalidCredentialsError } from '@/domain/errors/invalid-credentials-error';
import { HttpStatusCode } from '@/business/protocols/http/http-response';
import { type HttpPostClient } from '@/business/protocols/http/http-post-client';
import { type Authentication } from '@/domain/usecases/authentication';

export class RemoteAuthentication {
    constructor(private readonly url: string, private readonly httpPostClient: HttpPostClient) {}

    async auth(params: Authentication.Params): Promise<void> {
        const response = await this.httpPostClient.post({
            url: this.url,
            body: params,
        });

        switch (response.statusCode) {
            case HttpStatusCode.unauthorized:
                throw new InvalidCredentialsError();
        }
    }
}
