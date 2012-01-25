A quick note on version 2.0
---------------------
I've started work on porting 2.0 to Ender
already but it's taking longer than I hoped due to the major changes in
the twitter 2.0 branch and the fact that I'm heading in a different
direction for the build process.

The new build process will be a script that edits the plugin files
according to regex rules and creates Ender compatible modules. I'll also
be publishing the plugins separately to NPM so you only have to install
the ones you need rather than the whole hog, like my v1 port.

If you'd like to help then check out my ender-2.0-wip branch.


TWITTER BOOTSTRAP FOR ENDER
===========================

Look ma', no jQuery!
--------------------

This is a simple port of https://github.com/twitter/bootstrap with some changes to support use with Ender without jQuery.

It simply requires an Ender build with the Jeesh + Bowser (i.e. domReady, Qwery, Bonzo, Bean & Bowser, although Qwery is optional if you wish to use a different selector engine)

**ender-twitter-bootstrap** is available in NPM so to build with Ender simply run `ender build ender-twitter-bootstrap`.

Status
------

The port is complete, minus any un-found bugs which I trust you will put in a pull-request to fix for the rest of us. Tested in IE7+ and the other usual suspects.

The approach taken is to touch the original Bootstrap files as little as possible and just wrap them in a *copy* of Ender with a bunch of shims applied that fix up anything that Bootstrap is expecting from jQuery that Ender doesn't have or do (not a whole lot). So keeping the port up to date with the latest Bootstrap code is relatively easy.

At least one use-case that isn't supported is:

```js
$("a[rel=twipsy]").twipsy({ live: true })
```

This won't work because we don't have `live()` in bean, it's been deprecated in jQuery anyway. Just call `twipsy()` and it'll work.

See docs/javascript.html for an updated example using the Ender version and for details on what changes were made
to get it working see the diff: https://github.com/rvagg/bootstrap/compare/master...ender#diff-1

**A live example can be found at http://rvagg.github.com/bootstrap/docs/javascript.html** with zero jQueryness.

Installing
----------

You can install this directly into an ender build with:

```
ender build ender-twitter-bootstrap
```

and you'll get the dependencies packed too.

Alternatively you'll find a *build.sh* script in the *js/ender* directory that you can use to build *bootstrap-ender.js* yourself.

Me
--

**Rod Vagg**

+ http://twitter.com/rvagg
+ http://github.com/rvagg

*(I can't take any credit for of the brilliance of Bootstrap itself, just the humble Ender port)*

ORIGINAL BOOTSTRAP INFO
=======================

(Please visit https://github.com/twitter/bootstrap for complete info)

Bootstrap Authors
-------

**Mark Otto**

+ http://twitter.com/mdo
+ http://github.com/markdotto

**Jacob Thornton**

+ http://twitter.com/fat
+ http://github.com/fat


License
---------------------

Copyright 2011 Twitter, Inc.

Licensed under the Apache License, Version 2.0: http://www.apache.org/licenses/LICENSE-2.0
