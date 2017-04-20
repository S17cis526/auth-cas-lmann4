var http = require('http');
var assert = require('assert');
var authCAS = require('../lib/auth-cas');
var config = require('./test_config.json');

it('A CAS host must be specified', function() {
  assert.throws(
    () => {
      new authCAS();
    }, /CAS Host must be supplied/
  );
  assert.throws(
    () => {
      new authCAS(undefined);
  }, /CAS Host must be supplied/
  );
});

it('A CAS host must be specified', function() {
  assert.throws(
    () => {
      new authCAS('https://cashost.com')
    }, /A CAS Host must be specified/
  )
});

t('Visiting the login page should redirect to the CAS server login page', function() {
  http.get(config.host + '/login', function(res) {
    assert.equals(res.statusCode, 302);
    var redirect = url.parse(res.headers.location);
    var expected = url.parse(config.casHost);
    var service = encodeURIComponent(config.host + '/login');
    assert.equals(location.protocol, expected.protocol);
    assert.equals(location.hostname, expected.hostname);
    assert.equals(location.port, expected.port);
    assert.equals(location.pathname, '/login');
    assert.equals(location.search, '?service=' + service);
  })
});
