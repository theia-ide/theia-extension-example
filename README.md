# Theia Extension Example
The example of how to build the Theia-based app with the custom markdown extension.

![alt text](demo.gif)

## Getting started

Install [nvm](https://github.com/creationix/nvm#install-script).

    curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.5/install.sh | bash

Install npm and node.

    nvm install 8

Install yarn.

    npm install -g yarn@1.0.2

Clone the repo.

    git clone https://github.com/theia-ide/theia-extension-example.git

Setup the project.

    yarn

## Running the browser example

    yarn rebuild:browser
    cd browser-example
    yarn start

Open http://localhost:3000 in the browser.

## Running the Electron example

    yarn rebuild:electron
    cd electron-example
    yarn start

## Developing with the browser example

Start watching of the markdown extension.

    cd theia-markdown
    yarn watch

Start watching of the browser example.

    yarn rebuild:browser
    cd browser-example
    yarn watch

Launch `Start Browser Backend` configuration from VS code.

Open http://localhost:3000 in the browser.

## Developing with the Electron example

Start watching of the markdown extension.

    cd theia-markdown
    yarn watch

Start watching of the electron example.

    yarn rebuild:electron
    cd electron-example
    yarn watch

Launch `Start Electron Backend` configuration from VS code.

## License

[Apache-2.0](LICENSE)
