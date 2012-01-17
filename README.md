TWITTER BOOTSTRAP FOR ENDER
===========================

Look ma', no jQuery!
--------------------

This is a simple port of https://github.com/twitter/bootstrap with some changes to support use with Ender without jQuery.

It simply requires an Ender build with the Jeesh + Bowser (i.e. domReady, Qwery, Bonzo, Bean & Bowser)

**ender-twitter-bootstrap** is available in NPM so to build with Ender simply run `ender build ender-twitter-bootstrap`.

Status
------

The port is complete, minus any un-found bugs which I trust you will put in a pull-request to fix for the rest of us. Tested in IE7+ and the other usual suspects.

The approach taken is to touch the original Bootstrap files as little as possible and just wrap them in a *copy* of Ender with a bunch of shims applied that fix up anything that Bootstrap is expecting from jQuery that Ender doesn't have or do (not a whole lot). So keeping the port up to date with the latest Bootstrap code is relatively easy.

At least one use-case that isn't supported is:
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


Copyright and license
---------------------

Copyright 2012 Twitter, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this work except in compliance with the License.
You may obtain a copy of the License in the LICENSE file, or at:

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
