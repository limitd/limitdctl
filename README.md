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

Get status:

```
limitdctl --bucket ip --key 127.0.0.1 --status
```

### Sharding
 In order to use sharding with the cli you must specify `--shard` option and then
 either `--hosts <list>` or `--autodiscover <hostname>` (see shard options for [node-client](https://github.com/limitd/node-client#sharding))

Examples:
```
limitdctl --shard --hosts 192.222.222.222,192.222.222.223,192.222.222.224 --bucket ip --key 127.0.0.1 --status
limitdctl --shard --autodiscover autodiscover.int.mylimitd.com --bucket ip --key 127.0.0.1 --put 1
```

## License

MIT 2015 - Auth0 Inc.
