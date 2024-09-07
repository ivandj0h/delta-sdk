import { ApiClient } from "../src/apiClient";
import axios from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("ApiClient", () => {
  it("should make a GET request", async () => {
    mockedAxios.get.mockResolvedValue({ data: { message: "success" } });

    const client = new ApiClient("https://api.example.com", "fake-api-key");
    const result = await client.get("/test");

    expect(result).toEqual({ message: "success" });
    expect(mockedAxios.get).toHaveBeenCalledWith("/test");
  });

  it("should make a POST request", async () => {
    mockedAxios.post.mockResolvedValue({ data: { message: "created" } });

    const client = new ApiClient("https://api.example.com", "fake-api-key");
    const result = await client.post("/test", { name: "delta-sdk" });

    expect(result).toEqual({ message: "created" });
    expect(mockedAxios.post).toHaveBeenCalledWith("/test", {
      name: "delta-sdk",
    });
  });
});
