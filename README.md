A simple command line tool for limitd.

## Installation

```
npm install -g limitdctl
```

## Usage

Take tokens:

```
limitdctl --bucket ip --key 127.0.0.1 --take 1
```

Wait for tokens:

```
limitdctl --bucket ip --key 127.0.0.1 --wait 1
```

Put tokens:

```
limitdctl --bucket ip --key 127.0.0.1 --put 1
```

## License

MIT 2015 - Auth0 Inc.