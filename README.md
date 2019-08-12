# abstract-backup [![npm Version](https://img.shields.io/npm/v/abstract-backup)](https://www.npmjs.org/package/abstract-backup) [![Build Status](https://img.shields.io/travis/yuanqing/abstract-backup.svg)](https://travis-ci.org/yuanqing/abstract-backup)

> Download the Sketch files from all your [Abstract](https://www.abstract.com/) projects

## Quick start

_Requires [Node.js](https://nodejs.org/)._

1. [Ensure that all projects have been set to sync to your computer.](https://www.abstract.com/help/projects/sync-project/#how-to-sync-a-project-to-your-computer)
2. [Create an access token for the Abstract API.](https://app.goabstract.com/account/tokens)
3. Execute the below command, where `<token>` is your access token.

    ```sh
    $ npx abstract-backup --token <token>
    ```

## Usage

```

  Usage
    $ abstract-backup [options]

  Options
    -t, --token      Access token
    -o, --output     Output directory
    -v, --version    Displays current version
    -h, --help       Displays this message

```

## Installation

```sh
$ npm install --global abstract-backup
```

## License

[MIT](LICENSE.md)
