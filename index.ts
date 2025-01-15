import fs from 'fs-extra';
import path from 'path';

// Function to generate the markdown link format with capitalization and hyphen-to-space conversion
const generateLink = (file: string): string => {
    // Remove the '.md' extension
    const filename = path.basename(file, '.md');
    
    // Replace hyphens and underscores with spaces
    const spaceSeparated = filename.replace(/[-_]/g, ' ');

    // Capitalize the first letter of each word
    const capitalized = spaceSeparated
        .split(' ')  // Split by space
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))  // Capitalize each word
        .join(' ');  // Join them back with spaces
    
    // Create the markdown link using the formatted filename
    return `- [${capitalized}](${filename}.html)`;
};

// Function to read directory recursively and get all markdown files
const getMarkdownFiles = async (dirPath: string): Promise<string[]> => {
    const files: string[] = [];
    
    // Read all items in the directory
    const items = await fs.readdir(dirPath);
    
    for (const item of items) {
        const fullPath = path.join(dirPath, item);
        
        const stat = await fs.stat(fullPath);
        
        if (stat.isDirectory()) {
            // If it's a directory, recurse into it
            const nestedFiles = await getMarkdownFiles(fullPath);
            files.push(...nestedFiles);
        } else if (item.endsWith('.md')) {
            // If it's a markdown file, add it to the list
            files.push(fullPath);
        }
    }

    return files;
};

// Main function to generate the index file
const generateIndex = async (dirPath: string): Promise<void> => {
    try {
        // Get all markdown files
        const markdownFiles = await getMarkdownFiles(dirPath);
        
        // Generate links for each file
        const links = markdownFiles.map(generateLink);
        
        // Create the index content
        const indexContent = links.join('\n');
        
        // Write the index to a file (index.md)
        const indexFilePath = path.join(dirPath, 'index.md');
        await fs.writeFile(indexFilePath, indexContent);
        
        console.log('Index file generated successfully at', indexFilePath);
    } catch (error) {
        console.error('Error generating index:', error);
    }
};

// Get the directory path from command line arguments
const directory = process.argv[2];

if (!directory) {
    console.error('Please provide a directory path.');
    process.exit(1);
}

// Generate the index for the given directory
generateIndex(directory);
