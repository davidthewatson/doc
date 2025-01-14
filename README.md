# Doc: An SSG on [bun](https://bun.sh/)

## Getting Started


### Installation

1. Install [Bun](https://bun.sh/)
2. Clone the repo:
    ```sh
    git clone https://github.com/davidthewatson/doc.git
    cd doc
    ```

3. Install dependencies:
    ```sh
    bun install
    ```

### Usage
1. Setup your personal site.

    My site lives in github pages currently, so I do `gh repo clone` and go from there.

    Your site may vary in storage. That's OK.
        
1. Create and save a .env file for your site. Mine looks like this:

    ```cat .env 
    export SITEROOT=~/github/davidthewatson.github.io
    export SRC=$SITEROOT/src
    export STATIC=$SITEROOT/static
    export DOCS=$SITEROOT/docs
    source .env
    ````
    doc will slurp .env at run-time.
    
2. Run the build script:
    ```sh
    bun run build
    ```

3. Examine the results for bugs. Lather, rinse, repeat. 

Save-on-file-change trigger coming real soon now.

## What?

A Static Site Generator (SSG) makes markup from markdown.

doc uses:

GFM for syntax, Jinja for structure, and Pico for style.

## When?

I started working on CMS before Y2K.

This is postmodern: ~ 5 years, idea to proto with the ~~hack fest cycle~~ [cms](https://github.com/davidthewatson/cms/). 

The real? 

January 2025.

## Why?

1. My Python Static Jinja code was crufty, slow, legacy.
2. Latency is lossy, from invention's mother to evil's root.
3. Bun is fun! Efficiency, Utility, and Value at-once. Priceless.

## How

1. [bun](https://bun.sh/)
2. GitHub-Flavored Markdown (GFM)
3. Jinja (includes) for structure
4. Pico Cascading Style Sheets (CSS) for style

<!--
### Contributing

Contributions are welcome! Please read the [contributing guidelines](CONTRIBUTING.md) for more information.

-->

### License

This project is licensed under the BSD 3-clause License - see the [LICENSE](LICENSE) file for details.

Copyright (c) 2025, David Watson
