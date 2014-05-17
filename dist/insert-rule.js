/**
 * insert-rule - Insert rules into a stylesheet programatically with a simple API
 * @version v1.3.4
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
module.exports = function (selector, styles) {
  var css = parseStyles(styles);
  var sheet = document.styleSheets[document.styleSheets.length - 1];
  var key = sheet.cssRules ? sheet.cssRules: sheet.rules;
  if (sheet.insertRule) {
    sheet.insertRule(selector + '{' + css + '}', key.length);
  } else if (sheet.addRule) {
    sheet.addRule(selector, css, key.length);
  }
};

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvVXNlcnMvbmljby9uaWNvL2dpdC9pbnNlcnQtcnVsZS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzL25pY28vbmljby9naXQvaW5zZXJ0LXJ1bGUvc3JjL2FycmF5LW1hcC5qcyIsIi9Vc2Vycy9uaWNvL25pY28vZ2l0L2luc2VydC1ydWxlL3NyYy9pbnNlcnRSdWxlLmpzIiwiL1VzZXJzL25pY28vbmljby9naXQvaW5zZXJ0LXJ1bGUvc3JjL29iamVjdC1rZXlzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3Rocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIil9dmFyIGY9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGYuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sZixmLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImlmICghQXJyYXkucHJvdG90eXBlLm1hcCkge1xuICBBcnJheS5wcm90b3R5cGUubWFwID0gZnVuY3Rpb24gKGZuKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgaWYgKHRoaXMgPT09IHZvaWQgMCB8fCB0aGlzID09PSBudWxsKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCk7XG4gICAgfVxuXG4gICAgdmFyIHQgPSBPYmplY3QodGhpcyk7XG4gICAgdmFyIGxlbiA9IHQubGVuZ3RoID4+PiAwO1xuICAgIGlmICh0eXBlb2YgZm4gIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoKTtcbiAgICB9XG5cbiAgICB2YXIgcmVzID0gbmV3IEFycmF5KGxlbik7XG4gICAgdmFyIGN0eCA9IGFyZ3VtZW50cy5sZW5ndGggPj0gMiA/IGFyZ3VtZW50c1sxXSA6IHZvaWQgMDtcbiAgICB2YXIgaTtcbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGlmIChpIGluIHQpIHtcbiAgICAgICAgcmVzW2ldID0gZm4uY2FsbChjdHgsIHRbaV0sIGksIHQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiByZXM7XG4gIH07XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbnJlcXVpcmUoJy4vb2JqZWN0LWtleXMnKTtcbnJlcXVpcmUoJy4vYXJyYXktbWFwJyk7XG5cbnZhciBjYW1lbCA9IC8oW2Etel0pKFtBLVpdKS9nO1xudmFyIGh5cGhlbnMgPSAnJDEtJDInO1xuXG5mdW5jdGlvbiBwYXJzZVN0eWxlcyAoc3R5bGVzKSB7XG4gIGlmICh0eXBlb2Ygc3R5bGVzID09PSAnc3RyaW5nJykge1xuICAgIHJldHVybiBzdHlsZXM7XG4gIH1cbiAgaWYgKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChzdHlsZXMpICE9PSAnW29iamVjdCBPYmplY3RdJykge1xuICAgIHJldHVybiAnJztcbiAgfVxuICByZXR1cm4gT2JqZWN0LmtleXMoc3R5bGVzKS5tYXAoZnVuY3Rpb24gKGtleSkge1xuICAgIHZhciBwcm9wID0ga2V5LnJlcGxhY2UoY2FtZWwsIGh5cGhlbnMpLnRvTG93ZXJDYXNlKCk7XG4gICAgcmV0dXJuIHByb3AgKyAnOicgKyBzdHlsZXNba2V5XTtcbiAgfSkuam9pbignOycpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoc2VsZWN0b3IsIHN0eWxlcykge1xuICB2YXIgY3NzID0gcGFyc2VTdHlsZXMoc3R5bGVzKTtcbiAgdmFyIHNoZWV0ID0gZG9jdW1lbnQuc3R5bGVTaGVldHNbZG9jdW1lbnQuc3R5bGVTaGVldHMubGVuZ3RoIC0gMV07XG4gIHZhciBrZXkgPSBzaGVldC5jc3NSdWxlcyA/IHNoZWV0LmNzc1J1bGVzOiBzaGVldC5ydWxlcztcbiAgaWYgKHNoZWV0Lmluc2VydFJ1bGUpIHtcbiAgICBzaGVldC5pbnNlcnRSdWxlKHNlbGVjdG9yICsgJ3snICsgY3NzICsgJ30nLCBrZXkubGVuZ3RoKTtcbiAgfSBlbHNlIGlmIChzaGVldC5hZGRSdWxlKSB7XG4gICAgc2hlZXQuYWRkUnVsZShzZWxlY3RvciwgY3NzLCBrZXkubGVuZ3RoKTtcbiAgfVxufTtcbiIsImlmICghT2JqZWN0LmtleXMpIHtcbiAgT2JqZWN0LmtleXMgPSAoZnVuY3Rpb24gKCkge1xuICAgICd1c2Ugc3RyaWN0JztcbiAgICB2YXIgaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuICAgIHZhciBoYXNEb250RW51bUJ1ZyA9ICEoe3RvU3RyaW5nOiBudWxsfSkucHJvcGVydHlJc0VudW1lcmFibGUoJ3RvU3RyaW5nJyk7XG4gICAgdmFyIGRvbnRFbnVtcyA9IFtcbiAgICAgICd0b1N0cmluZycsXG4gICAgICAndG9Mb2NhbGVTdHJpbmcnLFxuICAgICAgJ3ZhbHVlT2YnLFxuICAgICAgJ2hhc093blByb3BlcnR5JyxcbiAgICAgICdpc1Byb3RvdHlwZU9mJyxcbiAgICAgICdwcm9wZXJ0eUlzRW51bWVyYWJsZScsXG4gICAgICAnY29uc3RydWN0b3InXG4gICAgXTtcbiAgICB2YXIgZG9udEVudW1zTGVuZ3RoID0gZG9udEVudW1zLmxlbmd0aDtcblxuICAgIHJldHVybiBmdW5jdGlvbiAob2JqKSB7XG4gICAgICBpZiAodHlwZW9mIG9iaiAhPT0gJ29iamVjdCcgJiYgKHR5cGVvZiBvYmogIT09ICdmdW5jdGlvbicgfHwgb2JqID09PSBudWxsKSkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdPYmplY3Qua2V5cyBjYWxsZWQgb24gbm9uLW9iamVjdCcpO1xuICAgICAgfVxuXG4gICAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgICB2YXIgcHJvcDtcbiAgICAgIHZhciBpO1xuXG4gICAgICBmb3IgKHByb3AgaW4gb2JqKSB7XG4gICAgICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIHtcbiAgICAgICAgICByZXN1bHQucHVzaChwcm9wKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoaGFzRG9udEVudW1CdWcpIHtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGRvbnRFbnVtc0xlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgaWYgKGhhc093blByb3BlcnR5LmNhbGwob2JqLCBkb250RW51bXNbaV0pKSB7XG4gICAgICAgICAgICByZXN1bHQucHVzaChkb250RW51bXNbaV0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9O1xuICB9KCkpO1xufVxuIl19
(2)
});
