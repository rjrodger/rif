/* Copyright (c) 2016, Richard Rodger and other contributors, MIT License. */
'use strict'

var Assert = require('assert')

var Lab = require('lab')

var rif = require('..').rif

var lab = exports.lab = Lab.script()
var describe = lab.describe
var it = lab.it

describe('rif', function() {

  it('happy', function (done) {
    Assert.equal('127.0.0.1', rif('lo',netif))
    Assert.equal('127.0.0.1', rif('lo/4',netif))
    Assert.equal('127.0.0.1', rif('lo/x',netif))
    Assert.equal('::1', rif('lo/6',netif))

    Assert.equal('10.0.2.15', rif('eth0/4/internal=false',netif))
    Assert.equal(void 0, rif('eth0/4/internal=true',netif))
    Assert.equal('10.0.2.15', rif('eth0/4/mac=08:00:27:1b:bc:e9',netif))
    Assert.equal('10.0.2.15', rif('eth0/4/mac^08:00',netif))
    Assert.equal('10.0.2.15', rif('eth0/4/mac$bc:e9',netif))
    Assert.equal('10.0.2.15', rif('eth0/4/mac%27:1b',netif))
    Assert.equal('fe80::a00:27ff:fe1b:bce9', rif('eth0/6/mac%27:1b,internal=false',netif))

    Assert.equal('192.168.59.10', rif('eth1',netif))
    done()
  })
})


var netif = { lo:
   [ { address: '127.0.0.1',
       netmask: '255.0.0.0',
       family: 'IPv4',
       mac: '00:00:00:00:00:00',
       internal: true },
     { address: '::1',
       netmask: 'ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff',
       family: 'IPv6',
       mac: '00:00:00:00:00:00',
       scopeid: 0,
       internal: true } ],
  eth0:
   [ { address: '10.0.2.15',
       netmask: '255.255.255.0',
       family: 'IPv4',
       mac: '08:00:27:1b:bc:e9',
       internal: false },
     { address: 'fe80::a00:27ff:fe1b:bce9',
       netmask: 'ffff:ffff:ffff:ffff::',
       family: 'IPv6',
       mac: '08:00:27:1b:bc:e9',
       scopeid: 2,
       internal: false } ],
  eth1:
   [ { address: '192.168.59.10',
       netmask: '255.255.255.0',
       family: 'IPv4',
       mac: '08:00:27:9b:b2:8d',
       internal: false },
     { address: 'fe80::a00:27ff:fe9b:b28d',
       netmask: 'ffff:ffff:ffff:ffff::',
       family: 'IPv6',
       mac: '08:00:27:9b:b2:8d',
       scopeid: 3,
       internal: false } ] }


