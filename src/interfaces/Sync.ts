import { AxiosPromise } from 'axios';

export interface Sync<T> {
  fetch(id: string): AxiosPromise;
  save(data: T): AxiosPromise;
}