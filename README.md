# Theia Extension Example
The example of how to build the Theia-based app with the custom extension.

## Getting started

Clone the repo.

    git clone https://github.com/theia-ide/theia-extension-example.git

If you don't use at least `npm@5.2.0` then install [npx](https://www.npmjs.com/package/npx) to run local binaries.

    npm install -g npx

Install the Theia app [yeoman](http://yeoman.io/) generator.

    npm install -g generator-theia@next

## Running the browser example

    cd browser-example
    npx yo theia:browser
    npm install
    npm run start

## Running the Electron example

    cd electron-example
    npx yo theia:electron
    npm install
    npm run start

## License

[Apache-2.0](LICENSE)
