//==============================================================//
// TWITTER BOOTSTRAP FOR ENDER                                  //


var enderOrig = ender
!(function(window, _window) {
	// and now for something completely different...
	// support jQuery style $(function() {}) shorthand for $(document).ready(function() {})
	// but this means making a proxy for ender(), which isn't trivial

	var ender = function() {
		return (arguments.length && typeof arguments[0] == 'function' ?
			enderOrig.domReady : enderOrig).apply(
				  this
				, arguments.length && arguments[0] === window ? [_window] : arguments
			)
	}
	for (p in enderOrig) ender[p] = enderOrig[p]
	var $ = ender
	window['$'] = window['ender'] = ender

	!function() {
		var removeOrig = enderOrig.fn.remove 
			, delegateOrig = enderOrig.fn.delegate
			, mapOrig = enderOrig.fn.map
			, triggerOrig = enderOrig.fn.trigger

		// link Bonzo and Bean so bonzo.remove() triggers a bean.remove()
		enderOrig.fn.remove = function() {
			this.unbind()
			return removeOrig.apply(this, arguments)
		}
		// fill in for the missing bonzo.parent() with bonzo.closest()
		enderOrig.fn.parent = function() {
			if (arguments.length) return this.closest.apply(this, arguments)
			var r = []
			$.each(this, function(e) { e && e.parentNode && r.push(e.parentNode) })
			return $(r)
		}
		// handle a 'return false' from event listeners like jQuery
		// i.e. stop propagation and prevent default
		enderOrig.fn.delegate = function() {
			if (arguments.length > 2 && typeof arguments[2] == 'function') {
				var fn = arguments[2]
				arguments[2] = function(e) {
					var r = fn.apply(this, arguments)
					if (r === false) {
						e.preventDefault()
						e.stopPropagation()
					}
					return r
				}
			}
			return delegateOrig.apply(this, arguments)
		}
		// provide a $().map() for elements like jQuery where you can use 'this' for each element
		// rather than 'this' being the whole context array, but only in cases where the callback
		// has no arguments
		// this is a bit smelly but has to be done to avoid touching the original
		enderOrig.fn.map = function(fn) {
			if (!fn.length) // no args
				return mapOrig.call(this, function(e) { return fn.call(e) })
			return mapOrig.apply(this, arguments)
		}
		// provider a $().trigger() that takes an object as an argument
		enderOrig.fn.trigger = function(t) {
			var args = arguments
			if (typeof t != 'string' && t.type) args = [t.type, t]
			return triggerOrig.apply(this, args)
		}
		// provide $.data(e, k, v) like jQuery
		ender.data = function(e, k, v) { return enderOrig.fn.data.call($(e), k, v) }
		ender.proxy = function(fn, ctx) {
			return function() { return fn.apply(ctx, arguments) }
		}


		!enderOrig.support && (ender.support = enderOrig.support = {})
	}()

