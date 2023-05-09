# whistle.try

[![npm](https://img.shields.io/npm/v/whistle.try.svg)](https://www.npmjs.com/package/whistle.try)

Provide fallback functionality for local rules of [whistle](https://github.com/avwo/whistle)

## Installation

```shell
npm install -g whistle.try
```

## Usage

Add `try://` in front of your local rules:

```diff
- example.com https://localhost:8000
+ example.com try://https://localhost:8000
```

The rule will automatically change to a transparent proxy when the corresponding local service is not started.

For automatic protocols, you can use any of the following forms:

```hosts
example.com try:////localhost:8000
# or
example.com try://localhost:8000
```

When using interpolation, you may need to adjust the position of the interpolation:

```diff
- example.com https://`localhost:8000${path}`
+ example.com try://`https://localhost:8000${path}`
```

## How it works

This plugin will check the service status through HEAD requests before proxying real requests. Therefore, **it only works for HTTP/HTTPS requests**.

Avoid using this plugin rule for non-local proxies as it may introduce a large overhead.
