// import { getOnlineStatus } from "@services/network/networl-detector";

interface ILocalStorageData {
  expiration: string | null;
  data: Record<string, unknown>;
}

export class LocalStorageService {
  storage: Storage;

  expirationTimeInHours = 24;

  constructor() {
    this.storage = window.localStorage;
  }

  private getExpirationTime(): string {
    const expires = new Date();
    expires.setTime(expires.getTime() + this.expirationTimeInHours * 60 * 60 * 1000);
    return expires.toISOString();
  }

  setLocalStorage(key: string, data: Record<string, unknown>, expiring: boolean): void {
    this.storage.setItem(
      key,
      JSON.stringify({
        expiration: expiring ? this.getExpirationTime() : null,
        data,
      })
    );
  }

  getLocalStorage(key: string): Record<string, unknown> | null {
    const dataStorage: string | null = this.storage.getItem(key);

    if (dataStorage) {
      const data: ILocalStorageData = JSON.parse(dataStorage);
      // TODO
      // if (getOnlineStatus()) {
      //   if (data.expiration && new Date(data.expiration) < new Date()) {
      //     this.removeLocalStorage(key);
      //     return null;
      //   }
      // }

      return data.data;
    }

    return null;
  }

  existLocalStorage(key: string): boolean {
    const dataStorage: string | null = this.storage.getItem(key);

    if (dataStorage) {
      return true;
    }

    return false;
  }

  removeLocalStorage(key: string): void {
    this.storage.removeItem(key);
  }

  removeAllLocalStorage(): void {
    this.storage.clear();
  }
}

export default new LocalStorageService();
