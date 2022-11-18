import { CustomError, HTTPError } from './error';

describe('Given', () => {
    let error: CustomError;
    beforeEach(() => {
        error = new HTTPError(418, 'Tea Pot', 'been there, donde that');
    });
    test('it should first', () => {
        expect(error).toBeInstanceOf(Error);
        expect(error).toBeInstanceOf(HTTPError);
        expect(error).toHaveProperty('statusCode', 418);
        expect(error).toHaveProperty('statusMessage', 'Tea Pot');
        expect(error).toHaveProperty('message', 'been there, donde that');
        expect(error).toHaveProperty('name', 'HTTPError');
    });
});
