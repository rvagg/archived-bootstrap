#!/usr/bin/env node

var fs = require('fs')
  , colors = require('colors')
  , async = require('async')
  , path = require('path')

var packages = 'alert button carousel collapse dropdown modal popover scrollspy tab tooltip transition typeahead'.split(' ')
  , version = '0.0.1'
  , outdir = 'dist/{package}'
  , extendFn = function() {
      // based on jQuery deep merge
      var options, name, src, copy, clone
        , target = arguments[0], i = 1, length = arguments.length

      for (; i < length; i++) {
        if ((options = arguments[i]) !== null) {
          // Extend the base object
          for (name in options) {
            src = target[name]
            copy = options[name]
            if (target === copy) {
              continue;
            }
            if (copy && copy instanceof Object && typeof copy !== 'function' && !(copy instanceof Array)) {
              clone = src && is.obj(src) ? src : {}
              target[name] = o.extend(clone, copy);
            } else if (copy !== undefined) {
              target[name] = copy
            }
          }
        }
      }
      return target
    }
  , proxyFn = function(fn, ctx) {
      return function() { return fn.apply(ctx, arguments) }
    }
  , onFn = function() {
      if (arguments.length == 3 && typeof arguments[2] == 'function' && typeof arguments[1] != 'string')
        ender.fn.add.call(this, arguments[0], arguments[2])
      else
        originalOn.apply(this, arguments)
    }
  , extrasMarker = '  // extras'
  , replacements = [
      , { // replace the }(window.jQuery) at the bottom with ender
            packageMatch: /.*/
          , regex: /^/
          , replace: ''
              + '!function(ender) {\n'
              + '  var enderFake = function() { return ender.apply(this, arguments) }\n'
              + '  for (p in ender) enderFake[p] = ender[p]\n'
              + extrasMarker + '\n'
        }
      , { // replace the }(window.jQuery) at the bottom with ender
            packageMatch: /.*/
          , regex: /^\s*\}\(\s*window\.jQuery\s*\)\s*$/m
          , replace: '}(enderFake)}(ender)'
        }
      , { // replace $(function() with domReady
            packageMatch: /.*/
          , regex: /\$\(\s*function\s*\(\s*\)\s*{/
          , replace: '$.domReady(function () {'
        }
      , { // add in a `support` object to `ender` for transition detection
            packageMatch: /transition/
          , regex: /^/
          , replace: 'if (!ender.support) ender.support = {};\n'
        }
      , { // alerts will do a $('#') in default cases which qwery borks at
            packageMatch: /alert/
          , regex: /, selector = \$this\.attr\('data-target'\) \|\| \$this\.attr\('href'\)/
          , replace: ', selector = $this.attr(\'data-target\') || ($this.attr(\'href\') == \'#\' ? \'\' : $this.attr(\'href\'))'
        }
      , { // add in `$.extend`
            packageMatch: /tooltip/
          , regex: new RegExp(extrasMarker.replace('/','\\/'))
          , replace: extrasMarker + '\n'
              + '  enderFake.extend = '
              + extendFn.toString()
              + '\n'
        }
      , { // add in `$.proxy`
            packageMatch: /tooltip/
          , regex: new RegExp(extrasMarker.replace('/','\\/'))
          , replace: extrasMarker + '\n'
              + '  enderFake.proxy = '
              + proxyFn.toString()
              + '\n'
        }
      , { // fix up `$().on()` to ignore a non-string selector argument
            packageMatch: /tooltip/
          , regex: new RegExp(extrasMarker.replace('/','\\/'))
          , replace: extrasMarker + '\n'
              + '  var originalOn = ender.fn.on\n'
              + '  ender.fn.on = '
              + onFn.toString()
              + '\n'
         }
    ]
  , packageJSON = {
        'name': 'ender-bootstrap-'
      , 'description': 'Ender version of Twitter\'s Bootstrap JS - original by @fat & @mdo'
      , 'url': 'https://github.com/rvagg/bootstrap'
      , 'keywords': ['twitter', 'bootstrap', 'ender']
      , 'authors': [
            'Jacob Thornton <@fat>'
          , 'Mark Otto <@mdo>'
          , 'Rod Vagg <@rvagg>'
        ]
      , 'dependencies': {
            'qwery': '*'
          , 'bonzo': '*'
          , 'bowser': '*'
          , 'domready': '*'
        }
      , 'main': ''
      , 'version': version
    }

function readScript(package, callback) {
  fs.readFile('../bootstrap-' + package + '.js', function(error, contents) {
    if (error) {
      console.log(('Error processing package `' + package + '`:').red, error.message)
      return callback(1)
    }
    callback(null, {
        package: package
      , contents: adjustScript(package, String(contents))
    })
  })
}

function adjustScript(package, contents) {
  replacements.forEach(function (replacement) {
    if (replacement.packageMatch.test(package)) {
      contents = contents.replace(replacement.regex, replacement.replace)
    }
  })
  return contents
}

function generateJSON(script) {
  var json = JSON.parse(JSON.stringify(packageJSON))
  json.name += script.package
  json.main = script.package + '.js'
  return json
}

function writeScript(script, callback) {
  var dir = outdir.replace('{package}', script.package)
    , scriptFile = dir + '/' + script.package + '.js'
    , jsonFile = dir + '/package.json'
    , jsonData = generateJSON(script)

  mkdir(dir)
  async.waterfall([
      async.apply(fs.writeFile, scriptFile, script.contents, 'UTF-8')
    , async.apply(fs.writeFile, jsonFile, JSON.stringify(jsonData, null, 2), 'UTF-8')
  ], callback)
}

function mkdir(dir) {
  console.log('mkdir',dir,path.dirname(dir),path.relative('.',path.dirname(path.dirname(path.dirname(dir)))))
  var parent = path.dirname(dir)
  if (!path.existsSync(parent))
    fs.mkdirSync(parent)
  if (!path.existsSync(dir))
    fs.mkdirSync(dir)
}

function processPackage(package) {
  async.waterfall([
      async.apply(readScript, package)
    , writeScript
    , function(contents, callback) {
        //console.log(contents.substr(contents.length - 50, 50))
      }
  ])
}

packages.forEach(processPackage)
