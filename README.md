# Loopback JSON Schema [![Build Status](https://travis-ci.org/globocom/loopback-jsonschema.png?branch=master)](https://travis-ci.org/globocom/loopback-jsonschema)

Adds JSON Schema support to [LoopBack](https://github.com/strongloop/loopback).

## Installing

```
npm install loopback-jsonschema
```

## Setup

### Initializing

Add the following code after calling `app.boot();`

```js
var loopbackJsonSchema = require('loopback-jsonschema');
loopbackJsonSchema.init(app);
```

### Configuring a DataSource

Add a `loopbackJsonSchemaDb` entry to the `datasources.json` file with your data source configuration. If no `loopbackJsonSchemaDb` entry is found, we fallback to using the default memory data source.

## Using

### Dynamically defining Loopback models from a JSON Schema

To dynamically define a new Loopback model just create a new instance of the JsonSchema model provided by loopback-jsonschema. Doing this via the REST interface is as simples as POSTing a valid JSON Schema, as follows:

```
# person.json
{
  "type": "object",
  "title": "Person",
  "modelName": "person",
  "collectionName": "people",
  "properties": {
    ...
  }
}
```

```
# Create a Person model from a JSON Schema
curl -i -XPOST -H "Content-Type: application/json" http://example.org/api/json-schemas -T person.json
```

The people collection will then be available at `http://example.org/api/people`.

## Schema Links

### Default Links ("self", "item", "update", "delete")

Never are persisted. They are built considering the requested host and collectionName of the model.

### Custom Links

Always are persisted. There are two possible scenarios.

a) when they are relatives, links are built considering the requested host
b) when they are absolut, links are delivered as it is

## Sample App
An example running LoopBack with this module: https://github.com/globocom/loopback-jsonschema-example

## Disclaimer

This project is very much in an alpha stage at the moment. But it is being actively developed. Contributions (code, documentation, issues, etc.) are very welcome.

## References

http://json-schema.org/
