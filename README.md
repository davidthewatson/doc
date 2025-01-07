# Doc SSG: Empathy unifies stories _and_ systems.

## What is doc?

Doc = MarkDown + DiY Pico (CSS) templates make static HTML output that scales

Doc is a static site generator built in Bun (JSCore, Rust, Zig).

NodeJS and Deno have their Monty Python moment:

### And Now For Something Completely Different

See [bun.sh](https://bun.sh/) for more.

## Features

- Markdown to HTML
- GitHub-flavored Markdown
- DiY Pico.css templates
- Automated tests

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/)

Because docker and k8s love one-and-done binaries sans DLL hell.

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
