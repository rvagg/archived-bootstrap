//==============================================================//
// TWITTER BOOTSTRAP FOR ENDER                                  //

!(function() {
	!function() {
		var removeOrig = ender.fn.remove 
			, delegateOrig = ender.fn.delegate
			//, dataOrig = ender.fn.data
			, mapOrig = ender.fn.map
			, triggerOrig = ender.fn.trigger
			, findOrig = ender.fn.find
			, enderOrig = ender

		// and now for something completely different...
		// support jQuery style $(function() {}) shorthand for $(document).ready(function() {})
		// but this means making a proxy for ender(), which isn't trivial
		ender = function() {
			return (arguments.length && typeof arguments[0] == 'function' ?
				enderOrig.domReady : enderOrig).apply(this, arguments)
		}
		for (p in enderOrig) ender[p] = enderOrig[p]
		window['$'] === enderOrig && (window['$'] = ender)

		// link Bonzo and Bean so bonzo.remove() triggers a bean.remove()
		ender.fn.remove = function() {
			this.unbind()
			return removeOrig.apply(this, arguments)
		}
		// fill in for the missing bonzo.parent() with bonzo.closest()
		ender.fn.parent = function() {
			if (arguments.length) return this.closest.apply(this, arguments)
			var r = []
			$.each(this, function(e) { e && e.parentNode && r.push(e.parentNode) })
			return $(r)
		}
		// handle a 'return false' from event listeners like jQuery
		// i.e. stop propagation and prevent default
		ender.fn.delegate = function() {
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
		ender.fn.map = function(fn) {
			if (!fn.length)
				return ender.map(this, function(e) { return fn.call(e) })
			return mapOrig.apply(this, arguments)
		}
		/*
		function camelize(s) {
			return s.replace(/-(.)/g, function (m, m1) { return m1.toUpperCase() })
		}
		function dataValue(d) {
			try {
				return d = d === "true" ? true : d === "false" ? false : d === "null" ? null : !isNaN(d) ? parseFloat(d) : d;
			} catch(e) {}
			return d
		}
		function data() {
			var d = {}
			$.each(this[0].attributes, function(a) { /^data-/.test(a.name) && (d[camelize((""+a.name).substring(5))] = dataValue(a.value)) })
			return d
		}
		// provide a $().data() to dump all data contents, Bonzo only gives us $().data(key)
		ender.fn.data = function() {
			return (arguments.length ? dataOrig : data).apply(this, arguments)
		}
		*/
		// provider a $().trigger() that takes an object as an argument
		ender.fn.trigger = function(t) {
			var args = arguments
			if (typeof t != 'string' && t.type) args = [t.type, t]
			return triggerOrig.apply(this, args)
		}
		// remove prefixed '>' from selector sent to find(), qwery can't handle it
		ender.fn.find = function(s) {
			return findOrig.call(this, s = /^>/.test(s) ? s.substring(1) : s)
		}
		// provide $.data(e, k, v) like jQuery
		ender.data = function(e, k, v) { return ender.fn.data.call($(e), k, v) }
		ender.proxy = function(fn, ctx) {
			return function() { return fn.apply(ctx, arguments) }
		}

		!ender.support && (ender.support = {})
	}()

