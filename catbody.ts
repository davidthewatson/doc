import { parseHTML } from "linkedom";

// Get the URL from the command line arguments
const url = process.argv[2];

if (!url) {
  console.error("Error: Please provide a URL as an argument.");
  console.error("Usage: bun run catbody.ts <URL>");
  process.exit(1);
}

async function fetchBodyText(url: string): Promise<void> {
  try {
    console.log(`Fetching URL: ${url}`);

    // Fetch the HTML content from the URL
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch URL. Status: ${response.status}`);
    }
    const html = await response.text();

    // Parse the HTML using linkedom
    const { document } = parseHTML(html);

    // Extract the <body> content as plain text
    const bodyText = document.body?.textContent?.trim() || "No body content found.";

    // Output the plain text content
    console.log(bodyText);
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
}

// Run the function
fetchBodyText(url);

