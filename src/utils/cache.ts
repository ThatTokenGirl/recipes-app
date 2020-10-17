type BasicAccessor = string | number | symbol;

interface Storage<TKey, TValue> {
  get(key: TKey): TValue | undefined;
  set(key: TKey, value: TValue): void;
  has(key: TKey): boolean;
}

export class Cache<TKey = any, TValue = any> implements Storage<TKey, TValue> {
  private basicStorage: BasicStorage<
    TKey extends BasicAccessor ? TKey : never,
    TValue
  > | null = null;
  private complexStorage: ComplexStorage<
    TKey extends Object ? TKey : never,
    TValue
  > | null = null;

  get(key: TKey): TValue | undefined {
    return this._getStorage(key).get(key);
  }

  set(key: TKey, value: TValue) {
    this._getStorage(key).set(key, value);
  }

  has(key: TKey) {
    return this._getStorage(key).has(key);
  }

  private _getStorage(key: TKey): Storage<any, any> {
    if (typeof key === "string" || typeof key === "number")
      return (this.basicStorage = this.basicStorage ?? new BasicStorage());

    return (this.complexStorage = this.complexStorage ?? new ComplexStorage());
  }
}

class BasicStorage<TKey extends BasicAccessor, TValue>
  implements Storage<TKey, TValue> {
  private basicStorage: { [key in BasicAccessor]: TValue } = {};

  get(key: TKey): TValue | undefined {
    return this.has(key) ? this.basicStorage[key] : undefined;
  }

  set(key: TKey, value: TValue): void {
    this.basicStorage[key] = value;
  }

  has(key: TKey): boolean {
    return key in this.basicStorage;
  }
}

class ComplexStorage<TKey extends Object, TValue>
  implements Storage<TKey, TValue> {
  private _map = new WeakMap<TKey, TValue>();

  get(key: TKey): TValue | undefined {
    return this._map.has(key) ? this._map.get(key) : undefined;
  }

  set(key: TKey, value: TValue): void {
    this._map.set(key, value);
  }

  has(key: TKey): boolean {
    return this.has(key);
  }
}
