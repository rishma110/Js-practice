class Singleton {
  constructor(data) {
    if (Singleton.exists) {
      return Singleton.instance;
    }
    this._data = data;
    Singleton.instance = this;
    Singleton.exists = true;
    return this;
  }
}
