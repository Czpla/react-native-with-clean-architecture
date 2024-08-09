import { type Account } from '@/domain/entities/account-entitie';

export interface Authentication {
    auth(params: Authentication.Params): Promise<Account>;
}

export namespace Authentication {
    export interface Params {
        email: string;
        password: string;
    }
}
