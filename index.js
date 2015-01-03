'use strict';

var redis = require('redis');

exports.register = function (plugin, opts, next) {
  opts = opts || {};
  if (!opts.url) {
    opts.port = opts.port || 6379;
    opts.host = opts.host || '127.0.0.1';
  } else {
    var url = require('url').parse(opts.url);
    opts.port = url.port || 6379;
    opts.host = url.hostname || '127.0.0.1';

    if (url.auth)
      opts.password = url.auth.split(':')[1];
  }
  opts.opts = opts.opts || null;

  var client = redis.createClient(opts.port, opts.host, opts.opts);

  if (opts.password)
    client.auth(opts.password);

  client.on('error', function (err) {
    plugin.log(['hapi-hiredis', 'error'], err.message);
    console.error(err);
    return next(err);
  });

  client.on('ready', function () {
    plugin.log(['hapi-plugin-redis', 'info'], 'Redis connection established');
    return next();
  });

  plugin.expose('client', client);
  plugin.bind({ redis: client });
};

exports.register.attributes = {
  pkg: require('./package.json')
};
