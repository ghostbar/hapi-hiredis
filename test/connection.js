/* global describe,it,afterEach,beforeEach */
'use strict';

var Hapi = require('hapi');
var assert = require('assert');

describe('Testing Hapi Hiredis plugin', function () {
  var server = null;

  beforeEach(function () {
    server = new Hapi.Server();
  });

  afterEach(function () {
    server = null;
  });

  it('should be able to register the plugin with default options', function (done) {
    server.register({
      register: require('../')
    }, function () {
      assert(server.plugins['hapi-hiredis'].client, 'No redis client returned');
      assert(
        server.plugins['hapi-hiredis'].client.address === '127.0.0.1:6379', 
        'Connected to incorrect address/port'
      );
      done();
    });
  });

  it('should have connected', function (done) {
    server.register({
      register: require('../')
    }, function () {
      assert(server.plugins['hapi-hiredis'].client.connected, 'Did not connect');
      done();
    });
  });

  it('should take URLs as parameters', function (done) {
    server.register({
      register: require('../'),
      options: { url: 'redis://localhost:6379' }
    }, function () {
      assert(
        server.plugins['hapi-hiredis'].client.address === 'localhost:6379',
        'Connected to incorrect address/port'
      );
      done();
    });
  });
  
  it('should take URLs as parameters and use 6379 port as default', function (done) {
    server.register({
      register: require('../'),
      options: { url: 'redis://localhost' }
    }, function () {
      assert(
        server.plugins['hapi-hiredis'].client.address === 'localhost:6379',
        'Connected to incorrect address/port'
      );
      done();
    });
  });

});
