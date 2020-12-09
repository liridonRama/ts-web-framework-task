import axios, { AxiosPromise } from "axios"
import { nanoid } from "nanoid";

import { HasId } from "../interfaces/HasId"

export class Sync<T extends HasId> {
  constructor(private rootUrl: string) { }

  fetch = (id: string): AxiosPromise => {
    return axios.get(`${this.rootUrl}/users/${id}`);
  }

  save = (data: T): AxiosPromise => {
    const { id } = data;

    if (id) {
      return axios.put(`${this.rootUrl}/users/${id}`, data);
    } else {
      return axios.post(`${this.rootUrl}/users`, { ...data, id: nanoid(7) });
    }
  }
}