hapi-hiredis
============

Hapi (^8.0) plugin for `redis` with `hiredis` parser.

Why use this instead of simple hapi-redis?
------------------------------------------

+ `hiredis` parser is way faster than the plain javascript parser that comes by default with the node `redis` module.
+ Support for URLs. At least for me that's a major point, since I store all the data for connections in a simple URL string.

Register plugin
---------------

You can pass as options either an URL (all are optionals, defaults to: no password, 127.0.01 and 6379) or `host` and `port`. Obviously passing an URL is way more convenient.

    var Hapi = require('hapi');
    var server = new Hapi.Server();

    server.register({
      register: require('hapi-hiredis'),
      opts: { url: 'redis://:password@domain.tld:port' }
    }, function (err) {
      if (err) console.error(err);
    });

Use plugin
----------

The object returned by `redis.createClient` is exposed on `server.plugins['hapi-hiredis'].client` and binded to the context on routes and extensions as `this.redis`.

    server.route({
      method: 'GET',
      path: '/hashes',
      handler: function (request, reply) {
        var redis = request.server.plugins['hapi-hiredis'].client;
        redis.hgetall('hashes', function (err, obj) {
          reply(obj);
        });
      }
    }, {
      method: 'GET',
      path: '/session',
      handler: function (request, reply) {
        var redis = this.redis;
        redis.get('session', function (err, obj) {
          reply(obj);
        });
      }
    });

License
-------

Licensed under the terms of the ISC. A copy of the license can be found in the file `LICENSE`.

© 2015, Jose-Luis Rivas `<me@ghostbar.co>`
