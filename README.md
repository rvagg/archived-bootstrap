TWITTER BOOTSTRAP FOR ENDER
===========================

This is a simple fork of https://github.com/twitter/bootstrap with some changes to support Ender without jQuery.

Changes can be seen here: https://github.com/rvagg/bootstrap/compare/master...ender

Requires an Ender build with qwery, bonzo, bean, bowser, domready & valentine

So far most of it is working except for **Modals**. There are some use cases that aren't supported as well:

```js
$("a[rel=twipsy]").twipsy({ live: true })
```

won't work for example because we don't have `live()` in bean yet.

**Rod Vagg**
+ http://twitter.com/rvagg
+ http://github.com/rvagg


ORIGINAL BOOTSTRAP INFO
=======================

(Please visit https://github.com/twitter/bootstrap for complete info)

Authors
-------

**Mark Otto**

+ http://twitter.com/mdo
+ http://github.com/markdotto

**Jacob Thornton**

+ http://twitter.com/fat
+ http://github.com/fat


Copyright and license
---------------------

Copyright 2011 Twitter, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this work except in compliance with the License.
You may obtain a copy of the License in the LICENSE file, or at:

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
