/* Copyright (c) 2016, Richard Rodger and other contributors, MIT License. */
'use strict'

var Os = require('os')

module.exports = function (spec) {
  return rif(spec, Os.networkInterfaces())
}

module.exports.rif = rif

function rif (spec, netif) {
  var netif  = netif
  var parts  = spec.split('/')
  var ifname = parts[0]
  var ipv    = 6 == parts[1] ? 6 : 4
  var fields = parts[2]

  var entries = netif[ifname] ||  []

  entries = entries.filter(function (entry) {
    return 6 === ipv ? 'IPv6' === entry.family : 'IPv4' === entry.family
  })

  if( null != fields ) {
    var fexprs = fields.split(',').map(function (fexpr) {
      return (fexpr.match(/^(.*?)([=^$])(.*)$/) || []).slice(1,4)
    }).filter(function (fexpr) {
      return 3 === fexpr.length
    })

    entries = entries.filter(function (entry) {
      for( var i = 0; i < fexprs.length; ++i ) {
        var fvstr = ''+entry[fexprs[i][0]]
        var ftest = fexprs[i][1]        
        var fspec = fexprs[i][2]

        if( '=' === ftest ) {
          if( fvstr !== fspec ) {
            return false
          }
        }
        else if( '^' === ftest ) {
          if( !fvstr.startsWith(fspec) ) {
            return false
          }
        }
        else if( '$' === ftest ) {
          if( !fvstr.endsWith(fspec) ) {
            return false
          }
        }
        else if( '%' === ftest ) {
          if( !fvstr.includes(fspec) ) {
            return false
          }
        }
      }
      return true
    })
  }

  var entry = entries[0]
  return entry ? (entry.address || void 0) : void 0
}

