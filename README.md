TWITTER BOOTSTRAP FOR ENDER
===========================

This is a simple fork of https://github.com/twitter/bootstrap with some changes to support Ender without jQuery.

Changes can be seen here: https://github.com/rvagg/bootstrap/compare/master...ender

Requires an Ender build with the **Jeesh** + Bowser (i.e. domReady, Qwery, Bonzo, Bean & Bowser)

Status
------

The port is complete, minus any un-found bugs which I trust you will put in a pull-request to fix for us. Tested in IE7+ and the other usual suspects.

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
