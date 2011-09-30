//==============================================================//
// TWITTER BOOTSTRAP FOR ENDER                                  //

!(function() {
  !$.support && ($.support = {})

  function _bind(fn, ctx) { return function() { fn.apply(ctx, arguments) } }

  function _camelize(s) {
    return s.replace(/-(.)/g, function (m, m1) { return m1.toUpperCase() })
  }
  
  function _dataValue(d) {
    try {
      return d = d === "true" ? true : d === "false" ? false : d === "null" ? null : !isNaN(d) ? parseFloat(d) : d;
    } catch(e) {}
    return d
  }
  
  function _data(e) {
    var d = {}
    $.each(e.attributes, function(a) { /^data-/.test(a.name) && (d[_camelize((""+a.name).substring(5))] = _dataValue(a.value)) })
    return d
  }


