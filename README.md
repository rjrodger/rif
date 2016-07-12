# rif
Node.js module to resolve network interfaces.

This modules provides a concise way to extract an IP address from the
output of `require('os').networkInterfaces()`.

## Example

```js
var Rif = require('rif')

console.log(Rif('lo')) // prints IPv4 address: 127.0.0.1
console.log(Rif('lo/6')) // prints IPv6 address: ::1
console.log(Rif('eth0')) // prints IPv4 address of interface eth0: 10.x.x.x (depends on your system!)

console.log(Rif('lo/4/netmask=255.0.0.0')) // netmask field must equal 255.0.0.0
console.log(Rif('lo/4/netmask^255,internal=true')) // netmask field must start with 255 and internal field must have value true
```

## Syntax

`ifname/v/fieldspec`

  * `ifname`: name of network interface.
  * `v`: IP version: 4 or 6, meaning IPv4 or IPv6 respectively.
  * `fieldspec`: comma-separated list of field value tests
  
The field value tests are of the form: `name#value` where # is one of:

  * `=`: exact match.
  * `^`: field starts with value.
  * `$`: field ends with value.
  * `%`: field contains value.

See [unit tests](../blob/master/test/rif.test.js) for more examples.


## License
Copyright (c) 2016, Richard Rodger and other contributors, MIT License.


