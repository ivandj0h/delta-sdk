import axios from "axios";
import type { AxiosInstance } from "axios";

export class ApiClient {
  private client: AxiosInstance;

  constructor(
    private baseUrl: string,
    private apiKey: string,
  ) {
    this.client = axios.create({
      baseURL: this.baseUrl,
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        "Content-Type": "application/json",
      },
    });
  }

  public async get<T>(url: string): Promise<T> {
    const response = await this.client.get<T>(url);
    return response.data;
  }

  public async post<T>(url: string, data: any): Promise<T> {
    const response = await this.client.post<T>(url, data);
    return response.data;
  }
}
