
export class UserModel {
  constructor (
    public email: string,
    public id: string,
    private _token: string,
    // private _tokenExpirationDate: Date
  ) {}

  // getter is a special type of property that does something exra (that you defined in the brackets) on the background when accessing it
  get token() {
    // if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) return null; // in case token  does not exist or if it is expired
    return this._token;
  }
}
