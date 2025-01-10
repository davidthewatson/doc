// Copyright (c) 2025, David Watson
import { marked } from 'marked';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, relative, dirname } from 'path';
import { config } from 'dotenv';
import { glob } from 'glob';
import nunjucks from 'nunjucks';

// Load environment variables from .env file
config();

// Define environment variables type
interface EnvVariables {
  SITEROOT: string;
  SRC: string;
  STATIC: string;
  DOCS: string;
}

// Get paths from environment variables
const { SITEROOT, SRC, STATIC, DOCS } = process.env as EnvVariables;

// Configure nunjucks
nunjucks.configure(join(SITEROOT, 'templates'), { autoescape: true });

// Function to get all Markdown files in a directory
const getMarkdownFiles = (dir: string): string[] => {
  return glob.sync(join(dir, '**/*.md'));
};

// Function to convert Markdown to HTML and render with template
const convertMarkdownToHtml = (filePath: string) => {
  console.log(`Processing: ${filePath}`);
  const markdown = readFileSync(filePath, 'utf-8');
  const post_content_html = marked(markdown);
  console.log(`post_content_html: ${post_content_html}`);

  // Render the HTML with the Jinja2 template
  const html = nunjucks.render('_base.html', { post_content_html });
  console.log(`Rendered HTML: ${html}`);

  const outputFilePath = join(DOCS, relative(SRC, filePath).replace('.md', '.html'));
  console.log(`Output: ${outputFilePath}`);

  // Create the output subdirectory if it doesn't exist
  const outputDir = dirname(outputFilePath);
  if (!existsSync(outputDir)) {
    console.log(`Creating output directory: ${outputDir}`);
    mkdirSync(outputDir, { recursive: true });
  }

  writeFileSync(outputFilePath, html);
};

// Create the output directory if it doesn't exist
if (!existsSync(DOCS)) {
  console.log(`Creating output directory: ${DOCS}`);
  mkdirSync(DOCS, { recursive: true });
}

// Process all Markdown files in the source directory
const markdownFiles = getMarkdownFiles(SRC);
markdownFiles.forEach(convertMarkdownToHtml);

console.log('Markdown files have been converted to HTML.');

