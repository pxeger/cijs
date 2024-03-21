export default class HTTPError extends Error {
  code: number;
  body: object;
  constructor(code: number, body: object) {
    super();
    this.code = code;
    this.body = body;
  }
}
