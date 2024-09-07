import { serve } from "bun";
import { ApiController } from "./src/controllers/ApiController";
import chalk from "chalk";

const port = process.env.PORT || 3000;
const baseUrl = process.env.BASE_URL || "https://jsonplaceholder.typicode.com";
const apiController = new ApiController(baseUrl);

const server = serve({
  fetch: async (req) => {
    const url = new URL(req.url);

    console.log(chalk.blue(`Accessing Endpoint: ${url.pathname}`));

    let responseData;
    let statusCode = 200;

    if (url.pathname === "/users") {
      responseData = await apiController.getUsers(req);
    } else if (url.pathname === "/posts") {
      responseData = await apiController.getPosts(req);
    } else if (url.pathname === "/comments") {
      responseData = await apiController.getComments(req);
    } else {
      responseData = { message: "Not found" };
      statusCode = 404;
    }

    const prettyJson = JSON.stringify(responseData, null, 2);
    console.log(chalk.green("Response:"));
    console.log(chalk.yellow(prettyJson));

    return new Response(prettyJson, {
      headers: { "Content-Type": "application/json" },
      status: statusCode,
    });
  },
  port: +port,
});

console.log(chalk.cyan(`Server running on port ${port}`));
