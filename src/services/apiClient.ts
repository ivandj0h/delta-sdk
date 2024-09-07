import axios from "axios";
import type { AxiosInstance, AxiosError } from "axios";

export class ApiClient {
  private client: AxiosInstance;

  constructor(private baseUrl: string) {
    this.client = axios.create({
      baseURL: this.baseUrl,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  public async get<T>(url: string): Promise<T | null> {
    try {
      const response = await this.client.get<T>(url);
      return response.data;
    } catch (error) {
      if (this.isAxiosError(error)) {
        this.handleError(error);
      }
      return null;
    }
  }

  public async post<T>(url: string, data: any): Promise<T | null> {
    try {
      const response = await this.client.post<T>(url, data);
      return response.data;
    } catch (error) {
      if (this.isAxiosError(error)) {
        this.handleError(error);
      }
      return null;
    }
  }

  private isAxiosError(error: any): error is AxiosError {
    return error.isAxiosError === true;
  }

  private handleError(error: AxiosError) {
    if (error.response) {
      console.error(
          `Error: ${error.response.status} - ${error.response.statusText}`
      );
    } else if (error.request) {
      console.error("No response received from server.");
    } else {
      console.error("Error setting up the request.");
    }
  }
}
