import { ApiClient } from "../services/apiClient";

export class ApiController {
    private apiClient: ApiClient;
    private pageSize: number = 2;

    constructor(private baseUrl: string) {
        this.apiClient = new ApiClient(baseUrl);
    }

    private paginate<T>(data: T[], page: number): T[] {
        const startIndex = (page - 1) * this.pageSize;
        const endIndex = startIndex + this.pageSize;
        return data.slice(startIndex, endIndex);
    }

    public async getUsers(req: Request): Promise<any> {
        const users = await this.apiClient.get("/users");
        const url = new URL(req.url);
        const page: number = parseInt(url.searchParams.get("page") || "1", 10);

        if (Array.isArray(users)) {
            return this.paginate(users, page);
        } else {
            throw new Error("Invalid data: users should be an array");
        }
    }

    public async getPosts(req: Request): Promise<any> {
        const posts = await this.apiClient.get("/posts");
        const url = new URL(req.url);
        const page: number = parseInt(url.searchParams.get("page") || "1", 10);

        if (Array.isArray(posts)) {
            return this.paginate(posts, page);
        } else {
            throw new Error("Invalid data: posts should be an array");
        }
    }

    public async getComments(req: Request): Promise<any> {
        const comments = await this.apiClient.get("/comments");
        const url = new URL(req.url);
        const page: number = parseInt(url.searchParams.get("page") || "1", 10);
        if (Array.isArray(comments)) {
            return this.paginate(comments, page);
        } else {
            throw new Error("Invalid data: comments should be an array");
        }
    }

}
