# abstract-backup [![npm Version](https://img.shields.io/npm/v/abstract-backup)](https://www.npmjs.org/package/abstract-backup) [![Build Status](https://img.shields.io/travis/yuanqing/abstract-backup.svg)](https://travis-ci.org/yuanqing/abstract-backup)

> Download a local backup of the Sketch files from all your [Abstract](https://www.abstract.com/) projects

## Usage

_Requires [Node.js](https://nodejs.org/)._

1. Ensure that:
    - The [Abstract desktop app](https://www.abstract.com/help/getting-started/#2-download-the-macos-app) is installed
    - You are logged in
    - All projects are [set to sync to your computer](https://www.abstract.com/help/projects/sync-project/#how-to-sync-a-project-to-your-computer)

2. Create an [access token for the Abstract API.](https://app.goabstract.com/account/tokens)

3. Where `<token>` is your access token, do:

    ```sh
    $ npx abstract-backup <token>
    ```

    Alternatively:

    ```sh
    $ export ABSTRACT_TOKEN=<token>
    $ npx abstract-backup
    ```

4. `abstract-backup` will download and write all your Sketch files, organised by project, to an `./abstract-backup` folder. Change this via the `--directory` flag:

    ```sh
    $ npx abstract-backup --directory sketch
    ```

## Installation

```sh
$ npm install --global abstract-backup
```

## License

[MIT](LICENSE.md)
