# Doc: A Bun-based SSG

## What?

Doc is an SSG that takes MD input and renders HTML output. 

1. Github Flavored MarkDown (GFM)
2. Jinja lite structure (includes)
3. Pico (CSS) style

## When?

Started January 2025

## Why?

1. My Python Static Jinja code was crufty, slow, legacy.
2. Latency is the Mother of invention.
3. Bun is fun!

## How

1. [bun.sh](https://bun.sh/)
2. GitHub-flavored Markdown
3. Jinja lite (includes) for structure
4. Pico Cascading Style Sheets (CSS) for style
5. Automated tests for sanity

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/)

### Installation

1. Clone the repo:
    ```sh
    git clone https://github.com/davidthewatson/doc.git
    cd doc
    ```

2. Install dependencies:
    ```sh
    bun install
    ```

### Usage
1. Setup .env file for your site:
    ```cat .env 
    export SITEROOT=~/github/davidthewatson.github.io
    export SRC=$SITEROOT/src
    export STATIC=$SITEROOT/static
    export DOCS=$SITEROOT/docs
    source .env
    ````
2. Run the build script:
    ```sh
    bun run build
    ```

3. Run the tests:
    ```sh
    bun run tests/runTests.js
    ```
<!--
### Contributing

Contributions are welcome! Please read the [contributing guidelines](CONTRIBUTING.md) for more information.

-->

## Future now

1. Tests return short output
    1.1 using green means pass, red means fail, yellow means warning scheme
    1.2 log most things
    1.5 Git PR
2. Refactor js to ts
    2.5 Git PR
3. Refactor style
    3.5 Git PR
4. Done for now.

### License

This project is licensed under the BSD 3-clause License - see the [LICENSE](LICENSE) file for details.

Copyright (c) 2025, David Watson
