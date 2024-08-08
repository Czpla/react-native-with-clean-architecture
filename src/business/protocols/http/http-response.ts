export enum HttpStatusCode {
    noContent = 204,
    ok = 200,
    badRequest = 400,
    unauthorized = 401,
    notFound = 404,
    serverError = 500,
}

export type HttpResponse = {
    statusCode: HttpStatusCode;
    body?: any;
};
