# Loopback JSON Schema [![Build Status](https://travis-ci.org/globocom/loopback-jsonschema.png?branch=master)](https://travis-ci.org/globocom/loopback-jsonschema)

Adds JSON Schema support to [LoopBack](https://github.com/strongloop/loopback).

## Installing

```
npm install loopback-jsonschema
```

## Setup

Basically add the following code before calling `app.boot();`

```js
var loopbackJsonSchema = require('loopback-jsonschema');
loopbackJsonSchema.initLoopbackJsonSchema(app);
```

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

## Disclaimer

This project is very much in an alpha stage at the moment. But it is being actively developed. Contributions (code, documentation, issues, etc.) are very welcome.

## References

http://json-schema.org/
