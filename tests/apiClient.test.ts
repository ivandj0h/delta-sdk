import { ApiClient } from "../src/apiClient";
import axios from "axios";

// Mock axios
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Mock axios.create untuk mengembalikan instance yang di-mock
mockedAxios.create = jest.fn(() => mockedAxios);

describe("ApiClient", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Reset semua mock sebelum setiap test
  });

  it("should make a GET request to /users", async () => {
    // Mock return value for GET request
    mockedAxios.get.mockResolvedValueOnce({
      data: [{ id: 1, name: "John Doe" }],
    });

    const client = new ApiClient("https://jsonplaceholder.typicode.com");
    const result = await client.get("/users");

    // Expectation untuk memeriksa apakah hasil sesuai
    expect(result).toEqual([{ id: 1, name: "John Doe" }]);
    // Memastikan axios.get dipanggil dengan argumen yang tepat
    expect(mockedAxios.get).toHaveBeenCalledWith("/users");
  });

  it("should make a POST request to /posts", async () => {
    // Mock return value for POST request
    mockedAxios.post.mockResolvedValueOnce({
      data: { id: 101, title: "New Post" },
    });

    const client = new ApiClient("https://jsonplaceholder.typicode.com");
    const result = await client.post("/posts", { title: "New Post" });

    // Expectation untuk memeriksa apakah hasil sesuai
    expect(result).toEqual({ id: 101, title: "New Post" });
    // Memastikan axios.post dipanggil dengan argumen yang tepat
    expect(mockedAxios.post).toHaveBeenCalledWith("/posts", {
      title: "New Post",
    });
  });
});
