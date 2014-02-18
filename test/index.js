(function(root) {
  var common = typeof module != 'undefined' && !!module.exports
  var aok = common ? require('../node_modules/aok') : root.aok
  var sos = common ? require('../src') : root.sos
  var keys = Object.keys
  aok('instance', sos() instanceof sos)
  aok('keys', !keys || keys(sos).join() === keys(sos.prototype).join())

  sos.dir(sos)
  sos.log('can log')
  sos.info('can info')
  sos.warn('can warn')
  sos.error('can error')
  sos.assert(0, 'can assert')
}(this));