/*!
 * sos 0.0.1+201403010720
 * https://github.com/ryanve/sos
 * MIT License (c) 2014 Ryan Van Etten
 */

(function(root, name, make) {
  if (typeof module != 'undefined' && module['exports']) module['exports'] = make();
  else root[name] = make();
}(this, 'sos', function() {

  var model = sos.prototype = Sos.prototype
    , slice = [].slice
    , force = '--force'
    , flag = 'flag'
    , _op = '_flag'
    , win = typeof window != 'undefined' && window
    , con = typeof console != 'undefined' && console
    , instance = sos()

  /**
   * @constructor
   */
  function Sos() {
    this[_op] = []
  }
  
  function sos() {
    return arguments.length ? cs.apply(this instanceof Sos ? this : sos, arguments) : new Sos
  }
  
  sos[flag] = bind(model[flag] = function(name, n) {
    var op = this[_op]
    name = name > '@' ? '--' + name : name
    return op[name] = true === n ? 1/0 : false === n ? 0 : n === +n ? n : op[name] || 0
  }, instance)
  
  function cs(name) {
    var did = 1, rest = slice.call(arguments, 1)
    if (con) name in con ? con[name].apply(con, rest) : --did
    else win && rest.length && this[flag](force) ? win.alert(name + ': ' + rest.join(' ')) : --did
    return did
  }
  
  function partial(fn) {
    var rest = slice.call(arguments, 1)
    return function() {
      return fn.apply(this, rest.concat(slice.call(arguments)))
    }
  }
  
  function bind(fn, scope) {
    return function() {
      return fn.apply(scope, arguments)
    }
  }
  
  function each(o, fn, scope) {
    for (var i = 0, l = o.length; i < l;) fn.call(scope, o[i++])
  }
  
  each(['dir', 'log', 'trace', 'info', 'warn', 'error', 'clear'], function(name) {
    sos[name] = bind(model[name] = partial(cs, name), instance)
  })

  sos['assert'] = model['assert'] = function(exp) {
    if (exp) return false
    if (con && 'assert' in con) con['assert'].apply(con, arguments)
    else sos['warn'].apply(con, slice.call(arguments, 1))
    return true
  }

  return sos;
}));