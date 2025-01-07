// Copyright (c) 2025, David Watson
import { marked } from 'marked';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, relative, dirname } from 'path';
import { config } from 'dotenv';
import { glob } from 'glob';
import nunjucks from 'nunjucks';

// Load environment variables from .env file
config();

// Get paths from environment variables
const { SITEROOT, SRC, STATIC, DOCS } = process.env;

// Configure nunjucks
nunjucks.configure(join(SITEROOT, 'templates'), { autoescape: true });

// Function to get all Markdown files in a directory
const getMarkdownFiles = (dir) => {
  return glob.sync(join(dir, '**/*.md'));
};

// Function to convert Markdown to HTML and render with template
const convertMarkdownToHtml = (filePath, outputDir) => {
  console.log(`Processing: ${filePath}`);
  const markdown = readFileSync(filePath, 'utf-8');
  const post_content_html = marked(markdown);
  console.log(`post_content_html: ${post_content_html}`);

  // Render the HTML with the Jinja2 template
  const html = nunjucks.render('_base.html', { post_content_html });
  console.log(`Rendered HTML: ${html}`);

  const outputFilePath = join(outputDir, relative(SRC, filePath).replace('.md', '.html'));
  console.log(`Output: ${outputFilePath}`);

  // Create the output subdirectory if it doesn't exist
  const outputDirPath = dirname(outputFilePath);
  if (!existsSync(outputDirPath)){
    console.log(`Creating output directory: ${outputDirPath}`);
    mkdirSync(outputDirPath, { recursive: true });
  }

  writeFileSync(outputFilePath, html);
};

// Create the output directory if it doesn't exist
const outputDir = join('tests', 'output');
if (!existsSync(outputDir)){
    console.log(`Creating output directory: ${outputDir}`);
    mkdirSync(outputDir, { recursive: true });
}

// Process all Markdown files in the source directory
const markdownFiles = getMarkdownFiles(SRC);
markdownFiles.forEach(filePath => convertMarkdownToHtml(filePath, outputDir));

console.log('Markdown files have been converted to HTML.');
