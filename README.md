# Doc: An SSG on [bun](https://bun.sh/)

## What?

A Static Site Generator constructs markup from markdown.

using:

1. Github Flavored MarkDown (GFM)
2. Jinja (lite) structure (includes) 
3. Pico (CSS) style

## When?

In mind, 5 years. Code complete January 2025.

## Why?

1. My Python Static Jinja code was crufty, slow, legacy.
2. Latency is invention's mother and evil's root.
3. Bun is fun! Efficiency, Utility, and Value FTW!

## How

1. Did I say [bun](https://bun.sh/)
2. GitHub-flavored Markdown
3. Jinja lite (includes) for structure
4. Pico Cascading Style Sheets (CSS) for style

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

<!--
### Contributing

Contributions are welcome! Please read the [contributing guidelines](CONTRIBUTING.md) for more information.

-->

### License

This project is licensed under the BSD 3-clause License - see the [LICENSE](LICENSE) file for details.

Copyright (c) 2025, David Watson
