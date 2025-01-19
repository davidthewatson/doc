import { readFileSync, statSync, existsSync } from "fs";
import { join } from "path";

// Get the directories from the environment variables
const docsDir = process.env.DOCS;
const staticDir = process.env.STATIC;

if (!docsDir || !staticDir) {
  console.error("Error: The $DOCS or $STATIC environment variable is not set.");
  process.exit(1);
}

const port = 4000;

// Serve HTML files and static assets
const server = Bun.serve({
  fetch(req) {
    const url = new URL(req.url);

    // Determine the file path based on the request URL
    let filePath: string;
    if (url.pathname.startsWith("/static/")) {
      // Serve static files from $STATIC
      filePath = join(staticDir, url.pathname.slice("/static".length));
    } else {
      // Serve HTML files from $DOCS
      if (url.pathname === "/") {
        filePath = join(docsDir, "index.html");
      } else if (!url.pathname.includes(".")) {
        filePath = join(docsDir, `${url.pathname}.html`);
      } else {
        filePath = join(docsDir, url.pathname);
      }
    }

    try {
      if (existsSync(filePath) && statSync(filePath).isFile()) {
        const fileContent = readFileSync(filePath);

        // Determine the Content-Type based on file extension
        const extension = filePath.split(".").pop()?.toLowerCase();
        let contentType = "application/octet-stream";
        if (extension === "html") {
          contentType = "text/html; charset=utf-8";
        } else if (extension === "css") {
          contentType = "text/css";
        } else if (extension === "js") {
          contentType = "application/javascript";
        } else if (["jpg", "jpeg"].includes(extension!)) {
          contentType = "image/jpeg";
        } else if (extension === "png") {
          contentType = "image/png";
        } else if (extension === "gif") {
          contentType = "image/gif";
        }

        return new Response(fileContent, { headers: { "Content-Type": contentType } });
      } else {
        return new Response("File not found", { status: 404 });
      }
    } catch (err) {
      console.error(`Error serving file: ${filePath}`, err);
      return new Response("Internal Server Error", { status: 500 });
    }
  },
  port,
});

console.log(`Server running at http://localhost:${port}/`);
