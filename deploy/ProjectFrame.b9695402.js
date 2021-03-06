// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"modules/jag.rip/project-frame/components/Footer.tsx":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRouterDom = require("react-router-dom");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Footer() {
  return _react.default.createElement("footer", {
    className: "main-footer"
  }, _react.default.createElement("p", null, "\xA9 Jason Grier, 2021", _react.default.createElement(_reactRouterDom.Link, {
    to: "/about"
  }, "About"), _react.default.createElement(_reactRouterDom.Link, {
    to: "/contact"
  }, "Contact"), _react.default.createElement(_reactRouterDom.Link, {
    to: "/general-content/filter/web-work"
  }, "Web Work"), _react.default.createElement(_reactRouterDom.Link, {
    to: "/general-content/filter/blog"
  }, "Blog"), _react.default.createElement(_reactRouterDom.Link, {
    target: "_blank",
    to: "/bespoke-web-developer"
  }, "Bespoke Web Developer")));
}

var _default = Footer;
exports.default = _default;
},{"react":"../../node_modules/react/index.js","react-router-dom":"../../node_modules/react-router-dom/esm/react-router-dom.js"}],"modules/jag.rip/project-frame/components/index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "ProjectFrame", {
  enumerable: true,
  get: function () {
    return _ProjectFrame.default;
  }
});
Object.defineProperty(exports, "Footer", {
  enumerable: true,
  get: function () {
    return _Footer.default;
  }
});

var _ProjectFrame = _interopRequireDefault(require("./ProjectFrame"));

var _Footer = _interopRequireDefault(require("./Footer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
},{"./ProjectFrame":"modules/jag.rip/project-frame/components/ProjectFrame.tsx","./Footer":"modules/jag.rip/project-frame/components/Footer.tsx"}],"styles/jag.rip/app.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"styles/jag.rip/variables.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"static/assets/fonts/avenir/avenir.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"./avenir.woff2":[["avenir.1fa5c3bf.woff2","static/assets/fonts/avenir/avenir.woff2"],"static/assets/fonts/avenir/avenir.woff2"],"./avenir.woff":[["avenir.f2aa5eed.woff","static/assets/fonts/avenir/avenir.woff"],"static/assets/fonts/avenir/avenir.woff"],"_css_loader":"../../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"static/assets/fonts/gilroy/gilroy.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"./gilroy-light.woff2":[["gilroy-light.2ab481b9.woff2","static/assets/fonts/gilroy/gilroy-light.woff2"],"static/assets/fonts/gilroy/gilroy-light.woff2"],"./gilroy-light.woff":[["gilroy-light.bb5439f9.woff","static/assets/fonts/gilroy/gilroy-light.woff"],"static/assets/fonts/gilroy/gilroy-light.woff"],"./gilroy-extra-bold.woff2":[["gilroy-extra-bold.b2ae123e.woff2","static/assets/fonts/gilroy/gilroy-extra-bold.woff2"],"static/assets/fonts/gilroy/gilroy-extra-bold.woff2"],"./gilroy-extra-bold.woff":[["gilroy-extra-bold.a30b36b0.woff","static/assets/fonts/gilroy/gilroy-extra-bold.woff"],"static/assets/fonts/gilroy/gilroy-extra-bold.woff"],"_css_loader":"../../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"static/assets/fonts/okojo/okojo.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"./okojo.woff2":[["okojo.640b6768.woff2","static/assets/fonts/okojo/okojo.woff2"],"static/assets/fonts/okojo/okojo.woff2"],"./okojo.woff":[["okojo.dc03b3cb.woff","static/assets/fonts/okojo/okojo.woff"],"static/assets/fonts/okojo/okojo.woff"],"./okojo-bold.woff2":[["okojo-bold.581e44ab.woff2","static/assets/fonts/okojo/okojo-bold.woff2"],"static/assets/fonts/okojo/okojo-bold.woff2"],"./okojo-bold.woff":[["okojo-bold.bc0afde2.woff","static/assets/fonts/okojo/okojo-bold.woff"],"static/assets/fonts/okojo/okojo-bold.woff"],"_css_loader":"../../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"static/assets/fonts/index.ts":[function(require,module,exports) {
"use strict";

require("./avenir/avenir.css");

require("./gilroy/gilroy.css");

require("./okojo/okojo.css");
},{"./avenir/avenir.css":"static/assets/fonts/avenir/avenir.css","./gilroy/gilroy.css":"static/assets/fonts/gilroy/gilroy.css","./okojo/okojo.css":"static/assets/fonts/okojo/okojo.css"}],"styles/jag.rip/page-web-biz-landing-page.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"styles/jag.rip/index.ts":[function(require,module,exports) {
"use strict";

require("./app.css");

require("./variables.css");

require("../../static/assets/fonts/index");

require("./page-web-biz-landing-page.css");
},{"./app.css":"styles/jag.rip/app.css","./variables.css":"styles/jag.rip/variables.css","../../static/assets/fonts/index":"static/assets/fonts/index.ts","./page-web-biz-landing-page.css":"styles/jag.rip/page-web-biz-landing-page.css"}],"modules/jag.rip/project-frame/components/ProjectFrame.tsx":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRouterDom = require("react-router-dom");

var _reactRedux = require("react-redux");

var _components = require("../../../../../../lib/components");

var _app = require("../../../core/app");

var _index = require("./index");

require("../../../../styles/jag.rip");

var _content = require("../../../../modules/core/content");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ProjectFrame(_a) {
  var children = _a.children;
  var contentItems = (0, _reactRedux.useSelector)(function (state) {
    return {
      contentItems: state.content.contentItems
    };
  }).contentItems;

  var _b = (0, _react.useState)(true),
      showMoreLink = _b[0],
      setShowMoreLink = _b[1];

  var _c = (0, _react.useState)(0),
      itemsCount = _c[0],
      setItemsCount = _c[1];

  var pathname = (0, _reactRouterDom.useLocation)().pathname;
  (0, _react.useEffect)(function getItemsCount() {
    setShowMoreLink(true);
    setItemsCount(contentItems.filter(function (i) {
      return i.project === 'jag.rip' && (0, _content.hasTag)(i, pathname.split('/').pop() || '');
    }).length);
  }, [pathname, contentItems]);
  (0, _react.useEffect)(function hideMoreLinkOnScroll() {
    function hideMoreLink() {
      setShowMoreLink(false);
    }

    var scrollLockContainer = document.querySelector('.scroll-lock-container');
    if (!scrollLockContainer) return;
    scrollLockContainer.addEventListener('scroll', hideMoreLink);
    return function cleanup() {
      scrollLockContainer.removeEventListener('scroll', hideMoreLink);
    };
  }, []);
  var moreLinkOnClick = (0, _react.useCallback)(function moreLinkOnClickFn() {
    var thirdBox = document.querySelector('.main-content-box:nth-child(3)');
    if (!thirdBox) return;
    thirdBox.scrollIntoView({
      behavior: 'smooth'
    });
    setShowMoreLink(false);
  }, []);
  return _react.default.createElement("div", {
    className: "jag-rip-site-frame"
  }, _react.default.createElement("header", {
    className: "main-header"
  }, _react.default.createElement(_components.ElectronNot, null, _react.default.createElement(_app.LandingPageNot, null, _react.default.createElement(_components.Hide, {
    from: ['bespoke-web-developer', 'react-javascript-consulting']
  }, _react.default.createElement("h1", null, _react.default.createElement(_reactRouterDom.Link, {
    to: "/"
  }, "Jason Aaron Grier")), _react.default.createElement("div", {
    className: "jag-main-header-logo"
  }, "JAG"))))), _react.default.createElement("div", {
    className: "main-jag"
  }, children), _react.default.createElement(_components.ElectronNot, null, _react.default.createElement(_app.LandingPageNot, null, _react.default.createElement(_components.Hide, {
    from: ['bespoke-web-developer', 'react-javascript-consulting']
  }, _react.default.createElement(_index.Footer, null)))));
}

var _default = ProjectFrame;
exports.default = _default;
},{"react":"../../node_modules/react/index.js","react-router-dom":"../../node_modules/react-router-dom/esm/react-router-dom.js","react-redux":"../../node_modules/react-redux/es/index.js","../../../../../../lib/components":"../../lib/components/index.ts","../../../core/app":"modules/core/app/index.ts","./index":"modules/jag.rip/project-frame/components/index.ts","../../../../styles/jag.rip":"styles/jag.rip/index.ts","../../../../modules/core/content":"modules/core/content/index.ts"}],"../../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "52509" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}],"../../node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../../node_modules/parcel-bundler/src/builtins/bundle-loader.js":[function(require,module,exports) {
var getBundleURL = require('./bundle-url').getBundleURL;

function loadBundlesLazy(bundles) {
  if (!Array.isArray(bundles)) {
    bundles = [bundles];
  }

  var id = bundles[bundles.length - 1];

  try {
    return Promise.resolve(require(id));
  } catch (err) {
    if (err.code === 'MODULE_NOT_FOUND') {
      return new LazyPromise(function (resolve, reject) {
        loadBundles(bundles.slice(0, -1)).then(function () {
          return require(id);
        }).then(resolve, reject);
      });
    }

    throw err;
  }
}

function loadBundles(bundles) {
  return Promise.all(bundles.map(loadBundle));
}

var bundleLoaders = {};

function registerBundleLoader(type, loader) {
  bundleLoaders[type] = loader;
}

module.exports = exports = loadBundlesLazy;
exports.load = loadBundles;
exports.register = registerBundleLoader;
var bundles = {};

function loadBundle(bundle) {
  var id;

  if (Array.isArray(bundle)) {
    id = bundle[1];
    bundle = bundle[0];
  }

  if (bundles[bundle]) {
    return bundles[bundle];
  }

  var type = (bundle.substring(bundle.lastIndexOf('.') + 1, bundle.length) || bundle).toLowerCase();
  var bundleLoader = bundleLoaders[type];

  if (bundleLoader) {
    return bundles[bundle] = bundleLoader(getBundleURL() + bundle).then(function (resolved) {
      if (resolved) {
        module.bundle.register(id, resolved);
      }

      return resolved;
    }).catch(function (e) {
      delete bundles[bundle];
      throw e;
    });
  }
}

function LazyPromise(executor) {
  this.executor = executor;
  this.promise = null;
}

LazyPromise.prototype.then = function (onSuccess, onError) {
  if (this.promise === null) this.promise = new Promise(this.executor);
  return this.promise.then(onSuccess, onError);
};

LazyPromise.prototype.catch = function (onError) {
  if (this.promise === null) this.promise = new Promise(this.executor);
  return this.promise.catch(onError);
};
},{"./bundle-url":"../../node_modules/parcel-bundler/src/builtins/bundle-url.js"}],0:[function(require,module,exports) {
var b=require("../../node_modules/parcel-bundler/src/builtins/bundle-loader.js");b.load([]).then(function(){require("modules/jag.rip/project-frame/components/ProjectFrame.tsx");});
},{}]},{},["../../node_modules/parcel-bundler/src/builtins/hmr-runtime.js",0], null)
//# sourceMappingURL=/ProjectFrame.b9695402.js.map