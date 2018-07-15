"use strict";

let lib = {};

lib.exit = function( err ) {
  if ( err ) console.error( err );
  process.exit( err ? 1 : 0 );
}

lib.parseargs = function( argv, opts ) {
  let bag = {};
  let arg;
  
  function cvt( v ) {
    if ( ! v ) return v;
    if ( opts && opts.cvtToNumber === false ) {}
    else if ( v.match( /^\d+$/ ) ) return Number( v );
    if ( v == 'true' ) return true;
    if ( v == 'false' ) return false;
    return v;
  }
  
  while( arg = argv.shift() ) {
    let i = arg.match( /^--(.+)/ );
    if ( i && i.length == 2 ) {
      if ( argv[0] && argv[0].match( /^--(.+)/ ) )
        bag[ i[1] ] = true;
      else if ( ! argv[0] )
        bag[ i[1] ] = true;
      else {
        if ( bag[ i[1] ] ) {
          if ( ! Array.isArray( bag[ i[1] ] ) ) { 
            let e = bag[ i[1] ];
            bag[ i[1] ] = [ cvt(e) ];
          }
          bag[ i[1] ].push( cvt( argv.shift() ) );
        }
        else {
          bag[ i[1] ] = cvt( argv.shift() );
        }
      }
    }
  }
  return bag;
}

module.exports = lib;
