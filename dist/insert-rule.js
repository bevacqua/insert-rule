/**
 * insert-rule - Insert rules into a stylesheet programatically with a simple API
 * @version v2.0.0
 * @link https://github.com/bevacqua/insert-rule
 * @license MIT
 */
!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.insertRule=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
if (!Array.prototype.map) {
  Array.prototype.map = function (fn) {
    'use strict';

    if (this === void 0 || this === null) {
      throw new TypeError();
    }

    var t = Object(this);
    var len = t.length >>> 0;
    if (typeof fn !== 'function') {
      throw new TypeError();
    }

    var res = new Array(len);
    var ctx = arguments.length >= 2 ? arguments[1] : void 0;
    var i;
    for (i = 0; i < len; i++) {
      if (i in t) {
        res[i] = fn.call(ctx, t[i], i, t);
      }
    }

    return res;
  };
}

},{}],2:[function(_dereq_,module,exports){
'use strict';

_dereq_('./object-keys');
_dereq_('./array-map');

var camel = /([a-z])([A-Z])/g;
var hyphens = '$1-$2';
var contexts = {};

function parseStyles (styles) {
  if (typeof styles === 'string') {
    return styles;
  }
  if (Object.prototype.toString.call(styles) !== '[object Object]') {
    return '';
  }
  return Object.keys(styles).map(function (key) {
    var prop = key.replace(camel, hyphens).toLowerCase();
    return prop + ':' + styles[key];
  }).join(';');
}

function context (name) {
  if (contexts[name]) {
    return contexts[name];
  }
  var cache;
  var rules;
  var remove;

  function getStylesheet () {
    if (cache) {
      return cache;
    }
    var style = document.createElement('style');
    document.body.appendChild(style);
    style.setAttribute('data-context', name);
    cache = document.styleSheets[document.styleSheets.length - 1];
    rules = cache.cssRules ? 'cssRules' : 'rules';
    remove = cache.removeRule ? 'removeRule' : 'deleteRule';
    return cache;
  }

  function add (selector, styles) {
    var css = parseStyles(styles);
    var sheet = getStylesheet();
    var len = sheet[rules].length;
    if (sheet.insertRule) {
      sheet.insertRule(selector + '{' + css + '}', len);
    } else if (sheet.addRule) {
      sheet.addRule(selector, css, len);
    }
  }

  function remove (selector) {
    var sheet = getStylesheet();
    var length = sheet[rules].length;
    var i;
    for (i = length - 1; i >= 0; i--) {
      if (sheet[rules][i].selectorText === selector) {
        sheet[remove](i);
      }
    }
  }

  function clear () {
    var sheet = getStylesheet();
    while (sheet[rules].length) {
      sheet[remove](0);
    }
  }

  add.clear = clear;
  add.remove = remove;
  contexts[name] = add;
  return contexts[name];
}

var ctx = context('default');
ctx.context = context;
module.exports = ctx;

},{"./array-map":1,"./object-keys":3}],3:[function(_dereq_,module,exports){
if (!Object.keys) {
  Object.keys = (function () {
    'use strict';
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    var hasDontEnumBug = !({toString: null}).propertyIsEnumerable('toString');
    var dontEnums = [
      'toString',
      'toLocaleString',
      'valueOf',
      'hasOwnProperty',
      'isPrototypeOf',
      'propertyIsEnumerable',
      'constructor'
    ];
    var dontEnumsLength = dontEnums.length;

    return function (obj) {
      if (typeof obj !== 'object' && (typeof obj !== 'function' || obj === null)) {
        throw new TypeError('Object.keys called on non-object');
      }

      var result = [];
      var prop;
      var i;

      for (prop in obj) {
        if (hasOwnProperty.call(obj, prop)) {
          result.push(prop);
        }
      }

      if (hasDontEnumBug) {
        for (i = 0; i < dontEnumsLength; i++) {
          if (hasOwnProperty.call(obj, dontEnums[i])) {
            result.push(dontEnums[i]);
          }
        }
      }
      return result;
    };
  }());
}

},{}]},{},[2])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvVXNlcnMvbmljby9uaWNvL2dpdC9pbnNlcnQtcnVsZS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzL25pY28vbmljby9naXQvaW5zZXJ0LXJ1bGUvc3JjL2FycmF5LW1hcC5qcyIsIi9Vc2Vycy9uaWNvL25pY28vZ2l0L2luc2VydC1ydWxlL3NyYy9pbnNlcnRSdWxlLmpzIiwiL1VzZXJzL25pY28vbmljby9naXQvaW5zZXJ0LXJ1bGUvc3JjL29iamVjdC1rZXlzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3Rocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIil9dmFyIGY9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGYuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sZixmLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImlmICghQXJyYXkucHJvdG90eXBlLm1hcCkge1xuICBBcnJheS5wcm90b3R5cGUubWFwID0gZnVuY3Rpb24gKGZuKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgaWYgKHRoaXMgPT09IHZvaWQgMCB8fCB0aGlzID09PSBudWxsKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCk7XG4gICAgfVxuXG4gICAgdmFyIHQgPSBPYmplY3QodGhpcyk7XG4gICAgdmFyIGxlbiA9IHQubGVuZ3RoID4+PiAwO1xuICAgIGlmICh0eXBlb2YgZm4gIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoKTtcbiAgICB9XG5cbiAgICB2YXIgcmVzID0gbmV3IEFycmF5KGxlbik7XG4gICAgdmFyIGN0eCA9IGFyZ3VtZW50cy5sZW5ndGggPj0gMiA/IGFyZ3VtZW50c1sxXSA6IHZvaWQgMDtcbiAgICB2YXIgaTtcbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGlmIChpIGluIHQpIHtcbiAgICAgICAgcmVzW2ldID0gZm4uY2FsbChjdHgsIHRbaV0sIGksIHQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiByZXM7XG4gIH07XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbnJlcXVpcmUoJy4vb2JqZWN0LWtleXMnKTtcbnJlcXVpcmUoJy4vYXJyYXktbWFwJyk7XG5cbnZhciBjYW1lbCA9IC8oW2Etel0pKFtBLVpdKS9nO1xudmFyIGh5cGhlbnMgPSAnJDEtJDInO1xudmFyIGNvbnRleHRzID0ge307XG5cbmZ1bmN0aW9uIHBhcnNlU3R5bGVzIChzdHlsZXMpIHtcbiAgaWYgKHR5cGVvZiBzdHlsZXMgPT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIHN0eWxlcztcbiAgfVxuICBpZiAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHN0eWxlcykgIT09ICdbb2JqZWN0IE9iamVjdF0nKSB7XG4gICAgcmV0dXJuICcnO1xuICB9XG4gIHJldHVybiBPYmplY3Qua2V5cyhzdHlsZXMpLm1hcChmdW5jdGlvbiAoa2V5KSB7XG4gICAgdmFyIHByb3AgPSBrZXkucmVwbGFjZShjYW1lbCwgaHlwaGVucykudG9Mb3dlckNhc2UoKTtcbiAgICByZXR1cm4gcHJvcCArICc6JyArIHN0eWxlc1trZXldO1xuICB9KS5qb2luKCc7Jyk7XG59XG5cbmZ1bmN0aW9uIGNvbnRleHQgKG5hbWUpIHtcbiAgaWYgKGNvbnRleHRzW25hbWVdKSB7XG4gICAgcmV0dXJuIGNvbnRleHRzW25hbWVdO1xuICB9XG4gIHZhciBjYWNoZTtcbiAgdmFyIHJ1bGVzO1xuICB2YXIgcmVtb3ZlO1xuXG4gIGZ1bmN0aW9uIGdldFN0eWxlc2hlZXQgKCkge1xuICAgIGlmIChjYWNoZSkge1xuICAgICAgcmV0dXJuIGNhY2hlO1xuICAgIH1cbiAgICB2YXIgc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuICAgIHN0eWxlLnNldEF0dHJpYnV0ZSgnZGF0YS1jb250ZXh0JywgbmFtZSk7XG4gICAgY2FjaGUgPSBkb2N1bWVudC5zdHlsZVNoZWV0c1tkb2N1bWVudC5zdHlsZVNoZWV0cy5sZW5ndGggLSAxXTtcbiAgICBydWxlcyA9IGNhY2hlLmNzc1J1bGVzID8gJ2Nzc1J1bGVzJyA6ICdydWxlcyc7XG4gICAgcmVtb3ZlID0gY2FjaGUucmVtb3ZlUnVsZSA/ICdyZW1vdmVSdWxlJyA6ICdkZWxldGVSdWxlJztcbiAgICByZXR1cm4gY2FjaGU7XG4gIH1cblxuICBmdW5jdGlvbiBhZGQgKHNlbGVjdG9yLCBzdHlsZXMpIHtcbiAgICB2YXIgY3NzID0gcGFyc2VTdHlsZXMoc3R5bGVzKTtcbiAgICB2YXIgc2hlZXQgPSBnZXRTdHlsZXNoZWV0KCk7XG4gICAgdmFyIGxlbiA9IHNoZWV0W3J1bGVzXS5sZW5ndGg7XG4gICAgaWYgKHNoZWV0Lmluc2VydFJ1bGUpIHtcbiAgICAgIHNoZWV0Lmluc2VydFJ1bGUoc2VsZWN0b3IgKyAneycgKyBjc3MgKyAnfScsIGxlbik7XG4gICAgfSBlbHNlIGlmIChzaGVldC5hZGRSdWxlKSB7XG4gICAgICBzaGVldC5hZGRSdWxlKHNlbGVjdG9yLCBjc3MsIGxlbik7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcmVtb3ZlIChzZWxlY3Rvcikge1xuICAgIHZhciBzaGVldCA9IGdldFN0eWxlc2hlZXQoKTtcbiAgICB2YXIgbGVuZ3RoID0gc2hlZXRbcnVsZXNdLmxlbmd0aDtcbiAgICB2YXIgaTtcbiAgICBmb3IgKGkgPSBsZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgaWYgKHNoZWV0W3J1bGVzXVtpXS5zZWxlY3RvclRleHQgPT09IHNlbGVjdG9yKSB7XG4gICAgICAgIHNoZWV0W3JlbW92ZV0oaSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gY2xlYXIgKCkge1xuICAgIHZhciBzaGVldCA9IGdldFN0eWxlc2hlZXQoKTtcbiAgICB3aGlsZSAoc2hlZXRbcnVsZXNdLmxlbmd0aCkge1xuICAgICAgc2hlZXRbcmVtb3ZlXSgwKTtcbiAgICB9XG4gIH1cblxuICBhZGQuY2xlYXIgPSBjbGVhcjtcbiAgYWRkLnJlbW92ZSA9IHJlbW92ZTtcbiAgY29udGV4dHNbbmFtZV0gPSBhZGQ7XG4gIHJldHVybiBjb250ZXh0c1tuYW1lXTtcbn1cblxudmFyIGN0eCA9IGNvbnRleHQoJ2RlZmF1bHQnKTtcbmN0eC5jb250ZXh0ID0gY29udGV4dDtcbm1vZHVsZS5leHBvcnRzID0gY3R4O1xuIiwiaWYgKCFPYmplY3Qua2V5cykge1xuICBPYmplY3Qua2V5cyA9IChmdW5jdGlvbiAoKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuICAgIHZhciBoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG4gICAgdmFyIGhhc0RvbnRFbnVtQnVnID0gISh7dG9TdHJpbmc6IG51bGx9KS5wcm9wZXJ0eUlzRW51bWVyYWJsZSgndG9TdHJpbmcnKTtcbiAgICB2YXIgZG9udEVudW1zID0gW1xuICAgICAgJ3RvU3RyaW5nJyxcbiAgICAgICd0b0xvY2FsZVN0cmluZycsXG4gICAgICAndmFsdWVPZicsXG4gICAgICAnaGFzT3duUHJvcGVydHknLFxuICAgICAgJ2lzUHJvdG90eXBlT2YnLFxuICAgICAgJ3Byb3BlcnR5SXNFbnVtZXJhYmxlJyxcbiAgICAgICdjb25zdHJ1Y3RvcidcbiAgICBdO1xuICAgIHZhciBkb250RW51bXNMZW5ndGggPSBkb250RW51bXMubGVuZ3RoO1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChvYmopIHtcbiAgICAgIGlmICh0eXBlb2Ygb2JqICE9PSAnb2JqZWN0JyAmJiAodHlwZW9mIG9iaiAhPT0gJ2Z1bmN0aW9uJyB8fCBvYmogPT09IG51bGwpKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ09iamVjdC5rZXlzIGNhbGxlZCBvbiBub24tb2JqZWN0Jyk7XG4gICAgICB9XG5cbiAgICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICAgIHZhciBwcm9wO1xuICAgICAgdmFyIGk7XG5cbiAgICAgIGZvciAocHJvcCBpbiBvYmopIHtcbiAgICAgICAgaWYgKGhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkge1xuICAgICAgICAgIHJlc3VsdC5wdXNoKHByb3ApO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChoYXNEb250RW51bUJ1Zykge1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgZG9udEVudW1zTGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGRvbnRFbnVtc1tpXSkpIHtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKGRvbnRFbnVtc1tpXSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG4gIH0oKSk7XG59XG4iXX0=
(2)
});
