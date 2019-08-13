# abstract-backup [![npm Version](https://img.shields.io/npm/v/abstract-backup)](https://www.npmjs.org/package/abstract-backup) [![Build Status](https://img.shields.io/travis/yuanqing/abstract-backup.svg)](https://travis-ci.org/yuanqing/abstract-backup)

> Create a local backup of the Sketch files from all your [Abstract](https://www.abstract.com/) projects

## Quick start

_Requires [Node.js](https://nodejs.org/)._

1. [Ensure that you have the Abstract desktop app installed,](https://www.abstract.com/help/getting-started/#2-download-the-macos-app) and you are logged in.
2. [Set all projects to sync to your computer.](https://www.abstract.com/help/projects/sync-project/#how-to-sync-a-project-to-your-computer)
3. [Create an access token for the Abstract API.](https://app.goabstract.com/account/tokens)
4. Execute the below command, where `[token]` is your access token.

    ```sh
    $ npx abstract-backup [token]
    ```

## Usage

```

  Usage
    $ abstract-backup [token] [options]

  Options
    -d, --directory    Directory to save your Sketch files
    -v, --version      Displays current version
    -h, --help         Displays this message

```

## Installation

```sh
$ npm install --global abstract-backup
```

## License

[MIT](LICENSE.md)
