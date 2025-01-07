// Copyright (c) 2025, David Watson
import { serve } from 'bun';
import { join, resolve } from 'path';
import { readFileSync, existsSync } from 'fs';
import { config } from 'dotenv';
import mime from 'mime';

// Load environment variables from .env file
config();

// Get the DOCS directory from environment variables
const { DOCS } = process.env;

// Define the directory to serve
const docsDir = resolve(DOCS);

serve({
  fetch(request) {
    let url = new URL(request.url);
    let filePath = resolve(join(docsDir, url.pathname));

    console.log(`Request URL: ${url.pathname}`);
    console.log(`File Path: ${filePath}`);

    // Default to serving index.html for root and directories
    if (url.pathname === '/' || url.pathname.endsWith('/')) {
      filePath = join(filePath, 'index.html');
    }

    console.log(`Final File Path: ${filePath}`);

    // Check if the file exists
    if (existsSync(filePath)) {
      // Try to read and return the file content
      try {
        // Determine the content type based on file extension
        let contentType = mime.getType(filePath) || 'text/plain';

        // Read file contents as a buffer
        let content = readFileSync(filePath);
        return new Response(content, {
          headers: { 'Content-Type': contentType }
        });
      } catch (err) {
        console.error(`Error reading file: ${err}`);
        // If there's an error reading the file, return a 500 response
        return new Response('Internal Server Error', { status: 500 });
      }
    } else {
      console.error('File not found');
      // If the file does not exist, return a 404 response
      return new Response('File not found', { status: 404 });
    }
  },
  port: 8000, // You can change the port if needed
});

console.log(`Serving files from ${docsDir} on http://localhost:8000`);
