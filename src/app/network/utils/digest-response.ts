export class DigestResponse {
  realm: string = '';
  qop: string = '';
  nonce: string = '';
  opaque: string = '';
  algorithm: string = '';
  stale: string = '';
  [key: string]: string;
}
