# Bun SSG

This is a static site generator built with Bun. It converts Markdown files to HTML and applies templates for consistent styling.

## Features

- Converts Markdown to HTML
- Supports GitHub-flavored Markdown
- Generates HTML from templates
- Pico.css styling
- Automated tests

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/)

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/davidthewatson/doc.git
    cd doc
    ```

2. Install dependencies:
    ```sh
    bun install
    ```

### Usage
0. Setup .env file for your site:
    ```cat .env 
    export SITEROOT=~/github/davidthewatson.github.io
    export SRC=$SITEROOT/src
    export STATIC=$SITEROOT/static
    export DOCS=$SITEROOT/docs
    source .env
    ````
1. Run the build script:
    ```sh
    bun run build
    ```

2. Run the tests:
    ```sh
    bun run tests/runTests.js
    ```

<!--
### Contributing

Contributions are welcome! Please read the [contributing guidelines](CONTRIBUTING.md) for more information.

-->

### License

This project is licensed under the BSD 3-clause License - see the [LICENSE](LICENSE) file for details.

Copyright (c) 2025, David Watson
