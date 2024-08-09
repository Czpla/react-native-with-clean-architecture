export class Account {
    public readonly accessToken: string;

    constructor(params: Account.Params) {
        this.accessToken = params.accessToken;
    }
}

export namespace Account {
    export interface Params {
        accessToken: string;
    }
}
