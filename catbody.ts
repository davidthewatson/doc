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

    // Extract the <main> content as plain text in TypeScript
    const mainText: string = document.querySelector('main')?.textContent?.trim() || "No main content found.";

    let text = mainText;
    const words = text.split(/\s+/).filter((word) => word.length > 0);
    const sentences = text.split(/[.!?]/).filter((sentence) => sentence.trim().length > 0);
    const paragraphs = text.split(/\n+/).filter((paragraph) => paragraph.trim().length > 0);

    text = `${text}\n\nWords:      ${words.length}`;
    text = `${text}\n\nSentences:  ${sentences.length}`;
    text = `${text}\n\nParagraphs: ${paragraphs.length}`;
    //text = 'Avg WPS: words.length / sentences.length);
    //Time to read (minutes):", (words.length / 200).toFixed(2)); // Assuming 200 WPM

    // Output the plain text content
    console.log(text);
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
}

// Run the function
fetchBodyText(url);

