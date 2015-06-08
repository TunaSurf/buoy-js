(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.BuoyData = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _parseLatestObservationData = require("./parse-latest-observation-data");

var _parseLatestObservationData2 = _interopRequireDefault(_parseLatestObservationData);

var _parseRealtimeBuoyData = require("./parse-realtime-buoy-data");

var _parseRealtimeBuoyData2 = _interopRequireDefault(_parseRealtimeBuoyData);

var _parseTide = require("./parse-tide");

var _parseTide2 = _interopRequireDefault(_parseTide);

var _utilGetNoaaDate = require("./util/get-noaa-date");

var _utilGetNoaaDate2 = _interopRequireDefault(_utilGetNoaaDate);

var _dataBuoysJson = require("./data/buoys.json");

var _dataBuoysJson2 = _interopRequireDefault(_dataBuoysJson);

exports["default"] = {
	build: "Mon Jun 08 2015 10:26:03 GMT+1000 (AEST)",
	Tide: _parseTide2["default"],
	buoys: _dataBuoysJson2["default"],
	parseLatestObservationData: _parseLatestObservationData2["default"],
	parseBuoy: _parseRealtimeBuoyData2["default"],
	getStationName: function getStationName(stationID) {
		return _dataBuoysJson2["default"][stationID].name;
	},
	getTideURL: function getTideURL(tideStationID) {
		var numberOfHours = arguments[1] === undefined ? 48 : arguments[1];

		var range = numberOfHours;
		return "http://tidesandcurrents.noaa.gov/api/datagetter?begin_date=" + (0, _utilGetNoaaDate2["default"])() + "&range=" + range + "&station=" + tideStationID + "&product=predictions&datum=MLLW&units=metric&time_zone=gmt&application=ports_screen&format=csv";
	},
	parseTideData: function parseTideData(tideData) {
		return _parseTide2["default"].parse(tideData);
	},
	getCurrentTide: function getCurrentTide(tideData) {
		return _parseTide2["default"].getCurrent(tideData);
	},
	getNextHighOrLowTide: function getNextHighOrLowTide(tideData) {
		return _parseTide2["default"].getNextHighOrLow(tideData);
	}
};
module.exports = exports["default"];

},{"./data/buoys.json":3,"./parse-latest-observation-data":5,"./parse-realtime-buoy-data":7,"./parse-tide":8,"./util/get-noaa-date":11}],2:[function(require,module,exports){
(function (global){
/**
 * @license
 * lodash 3.9.3 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern -d -o ./index.js`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
;(function() {

  /** Used as a safe reference for `undefined` in pre-ES5 environments. */
  var undefined;

  /** Used as the semantic version number. */
  var VERSION = '3.9.3';

  /** Used to compose bitmasks for wrapper metadata. */
  var BIND_FLAG = 1,
      BIND_KEY_FLAG = 2,
      CURRY_BOUND_FLAG = 4,
      CURRY_FLAG = 8,
      CURRY_RIGHT_FLAG = 16,
      PARTIAL_FLAG = 32,
      PARTIAL_RIGHT_FLAG = 64,
      ARY_FLAG = 128,
      REARG_FLAG = 256;

  /** Used as default options for `_.trunc`. */
  var DEFAULT_TRUNC_LENGTH = 30,
      DEFAULT_TRUNC_OMISSION = '...';

  /** Used to detect when a function becomes hot. */
  var HOT_COUNT = 150,
      HOT_SPAN = 16;

  /** Used to indicate the type of lazy iteratees. */
  var LAZY_DROP_WHILE_FLAG = 0,
      LAZY_FILTER_FLAG = 1,
      LAZY_MAP_FLAG = 2;

  /** Used as the `TypeError` message for "Functions" methods. */
  var FUNC_ERROR_TEXT = 'Expected a function';

  /** Used as the internal argument placeholder. */
  var PLACEHOLDER = '__lodash_placeholder__';

  /** `Object#toString` result references. */
  var argsTag = '[object Arguments]',
      arrayTag = '[object Array]',
      boolTag = '[object Boolean]',
      dateTag = '[object Date]',
      errorTag = '[object Error]',
      funcTag = '[object Function]',
      mapTag = '[object Map]',
      numberTag = '[object Number]',
      objectTag = '[object Object]',
      regexpTag = '[object RegExp]',
      setTag = '[object Set]',
      stringTag = '[object String]',
      weakMapTag = '[object WeakMap]';

  var arrayBufferTag = '[object ArrayBuffer]',
      float32Tag = '[object Float32Array]',
      float64Tag = '[object Float64Array]',
      int8Tag = '[object Int8Array]',
      int16Tag = '[object Int16Array]',
      int32Tag = '[object Int32Array]',
      uint8Tag = '[object Uint8Array]',
      uint8ClampedTag = '[object Uint8ClampedArray]',
      uint16Tag = '[object Uint16Array]',
      uint32Tag = '[object Uint32Array]';

  /** Used to match empty string literals in compiled template source. */
  var reEmptyStringLeading = /\b__p \+= '';/g,
      reEmptyStringMiddle = /\b(__p \+=) '' \+/g,
      reEmptyStringTrailing = /(__e\(.*?\)|\b__t\)) \+\n'';/g;

  /** Used to match HTML entities and HTML characters. */
  var reEscapedHtml = /&(?:amp|lt|gt|quot|#39|#96);/g,
      reUnescapedHtml = /[&<>"'`]/g,
      reHasEscapedHtml = RegExp(reEscapedHtml.source),
      reHasUnescapedHtml = RegExp(reUnescapedHtml.source);

  /** Used to match template delimiters. */
  var reEscape = /<%-([\s\S]+?)%>/g,
      reEvaluate = /<%([\s\S]+?)%>/g,
      reInterpolate = /<%=([\s\S]+?)%>/g;

  /** Used to match property names within property paths. */
  var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\n\\]|\\.)*?\1)\]/,
      reIsPlainProp = /^\w*$/,
      rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\n\\]|\\.)*?)\2)\]/g;

  /**
   * Used to match `RegExp` [special characters](http://www.regular-expressions.info/characters.html#special).
   * In addition to special characters the forward slash is escaped to allow for
   * easier `eval` use and `Function` compilation.
   */
  var reRegExpChars = /[.*+?^${}()|[\]\/\\]/g,
      reHasRegExpChars = RegExp(reRegExpChars.source);

  /** Used to match [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks). */
  var reComboMark = /[\u0300-\u036f\ufe20-\ufe23]/g;

  /** Used to match backslashes in property paths. */
  var reEscapeChar = /\\(\\)?/g;

  /** Used to match [ES template delimiters](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-template-literal-lexical-components). */
  var reEsTemplate = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g;

  /** Used to match `RegExp` flags from their coerced string values. */
  var reFlags = /\w*$/;

  /** Used to detect hexadecimal string values. */
  var reHasHexPrefix = /^0[xX]/;

  /** Used to detect host constructors (Safari > 5). */
  var reIsHostCtor = /^\[object .+?Constructor\]$/;

  /** Used to detect unsigned integer values. */
  var reIsUint = /^\d+$/;

  /** Used to match latin-1 supplementary letters (excluding mathematical operators). */
  var reLatin1 = /[\xc0-\xd6\xd8-\xde\xdf-\xf6\xf8-\xff]/g;

  /** Used to ensure capturing order of template delimiters. */
  var reNoMatch = /($^)/;

  /** Used to match unescaped characters in compiled string literals. */
  var reUnescapedString = /['\n\r\u2028\u2029\\]/g;

  /** Used to match words to create compound words. */
  var reWords = (function() {
    var upper = '[A-Z\\xc0-\\xd6\\xd8-\\xde]',
        lower = '[a-z\\xdf-\\xf6\\xf8-\\xff]+';

    return RegExp(upper + '+(?=' + upper + lower + ')|' + upper + '?' + lower + '|' + upper + '+|[0-9]+', 'g');
  }());

  /** Used to detect and test for whitespace. */
  var whitespace = (
    // Basic whitespace characters.
    ' \t\x0b\f\xa0\ufeff' +

    // Line terminators.
    '\n\r\u2028\u2029' +

    // Unicode category "Zs" space separators.
    '\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000'
  );

  /** Used to assign default `context` object properties. */
  var contextProps = [
    'Array', 'ArrayBuffer', 'Date', 'Error', 'Float32Array', 'Float64Array',
    'Function', 'Int8Array', 'Int16Array', 'Int32Array', 'Math', 'Number',
    'Object', 'RegExp', 'Set', 'String', '_', 'clearTimeout', 'document',
    'isFinite', 'parseFloat', 'parseInt', 'setTimeout', 'TypeError', 'Uint8Array',
    'Uint8ClampedArray', 'Uint16Array', 'Uint32Array', 'WeakMap', 'window'
  ];

  /** Used to make template sourceURLs easier to identify. */
  var templateCounter = -1;

  /** Used to identify `toStringTag` values of typed arrays. */
  var typedArrayTags = {};
  typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
  typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
  typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
  typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
  typedArrayTags[uint32Tag] = true;
  typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
  typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
  typedArrayTags[dateTag] = typedArrayTags[errorTag] =
  typedArrayTags[funcTag] = typedArrayTags[mapTag] =
  typedArrayTags[numberTag] = typedArrayTags[objectTag] =
  typedArrayTags[regexpTag] = typedArrayTags[setTag] =
  typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;

  /** Used to identify `toStringTag` values supported by `_.clone`. */
  var cloneableTags = {};
  cloneableTags[argsTag] = cloneableTags[arrayTag] =
  cloneableTags[arrayBufferTag] = cloneableTags[boolTag] =
  cloneableTags[dateTag] = cloneableTags[float32Tag] =
  cloneableTags[float64Tag] = cloneableTags[int8Tag] =
  cloneableTags[int16Tag] = cloneableTags[int32Tag] =
  cloneableTags[numberTag] = cloneableTags[objectTag] =
  cloneableTags[regexpTag] = cloneableTags[stringTag] =
  cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] =
  cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
  cloneableTags[errorTag] = cloneableTags[funcTag] =
  cloneableTags[mapTag] = cloneableTags[setTag] =
  cloneableTags[weakMapTag] = false;

  /** Used as an internal `_.debounce` options object by `_.throttle`. */
  var debounceOptions = {
    'leading': false,
    'maxWait': 0,
    'trailing': false
  };

  /** Used to map latin-1 supplementary letters to basic latin letters. */
  var deburredLetters = {
    '\xc0': 'A',  '\xc1': 'A', '\xc2': 'A', '\xc3': 'A', '\xc4': 'A', '\xc5': 'A',
    '\xe0': 'a',  '\xe1': 'a', '\xe2': 'a', '\xe3': 'a', '\xe4': 'a', '\xe5': 'a',
    '\xc7': 'C',  '\xe7': 'c',
    '\xd0': 'D',  '\xf0': 'd',
    '\xc8': 'E',  '\xc9': 'E', '\xca': 'E', '\xcb': 'E',
    '\xe8': 'e',  '\xe9': 'e', '\xea': 'e', '\xeb': 'e',
    '\xcC': 'I',  '\xcd': 'I', '\xce': 'I', '\xcf': 'I',
    '\xeC': 'i',  '\xed': 'i', '\xee': 'i', '\xef': 'i',
    '\xd1': 'N',  '\xf1': 'n',
    '\xd2': 'O',  '\xd3': 'O', '\xd4': 'O', '\xd5': 'O', '\xd6': 'O', '\xd8': 'O',
    '\xf2': 'o',  '\xf3': 'o', '\xf4': 'o', '\xf5': 'o', '\xf6': 'o', '\xf8': 'o',
    '\xd9': 'U',  '\xda': 'U', '\xdb': 'U', '\xdc': 'U',
    '\xf9': 'u',  '\xfa': 'u', '\xfb': 'u', '\xfc': 'u',
    '\xdd': 'Y',  '\xfd': 'y', '\xff': 'y',
    '\xc6': 'Ae', '\xe6': 'ae',
    '\xde': 'Th', '\xfe': 'th',
    '\xdf': 'ss'
  };

  /** Used to map characters to HTML entities. */
  var htmlEscapes = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '`': '&#96;'
  };

  /** Used to map HTML entities to characters. */
  var htmlUnescapes = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'",
    '&#96;': '`'
  };

  /** Used to determine if values are of the language type `Object`. */
  var objectTypes = {
    'function': true,
    'object': true
  };

  /** Used to escape characters for inclusion in compiled string literals. */
  var stringEscapes = {
    '\\': '\\',
    "'": "'",
    '\n': 'n',
    '\r': 'r',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  /** Detect free variable `exports`. */
  var freeExports = objectTypes[typeof exports] && exports && !exports.nodeType && exports;

  /** Detect free variable `module`. */
  var freeModule = objectTypes[typeof module] && module && !module.nodeType && module;

  /** Detect free variable `global` from Node.js. */
  var freeGlobal = freeExports && freeModule && typeof global == 'object' && global && global.Object && global;

  /** Detect free variable `self`. */
  var freeSelf = objectTypes[typeof self] && self && self.Object && self;

  /** Detect free variable `window`. */
  var freeWindow = objectTypes[typeof window] && window && window.Object && window;

  /** Detect the popular CommonJS extension `module.exports`. */
  var moduleExports = freeModule && freeModule.exports === freeExports && freeExports;

  /**
   * Used as a reference to the global object.
   *
   * The `this` value is used if it's the global object to avoid Greasemonkey's
   * restricted `window` object, otherwise the `window` object is used.
   */
  var root = freeGlobal || ((freeWindow !== (this && this.window)) && freeWindow) || freeSelf || this;

  /*--------------------------------------------------------------------------*/

  /**
   * The base implementation of `compareAscending` which compares values and
   * sorts them in ascending order without guaranteeing a stable sort.
   *
   * @private
   * @param {*} value The value to compare.
   * @param {*} other The other value to compare.
   * @returns {number} Returns the sort order indicator for `value`.
   */
  function baseCompareAscending(value, other) {
    if (value !== other) {
      var valIsNull = value === null,
          valIsUndef = value === undefined,
          valIsReflexive = value === value;

      var othIsNull = other === null,
          othIsUndef = other === undefined,
          othIsReflexive = other === other;

      if ((value > other && !othIsNull) || !valIsReflexive ||
          (valIsNull && !othIsUndef && othIsReflexive) ||
          (valIsUndef && othIsReflexive)) {
        return 1;
      }
      if ((value < other && !valIsNull) || !othIsReflexive ||
          (othIsNull && !valIsUndef && valIsReflexive) ||
          (othIsUndef && valIsReflexive)) {
        return -1;
      }
    }
    return 0;
  }

  /**
   * The base implementation of `_.findIndex` and `_.findLastIndex` without
   * support for callback shorthands and `this` binding.
   *
   * @private
   * @param {Array} array The array to search.
   * @param {Function} predicate The function invoked per iteration.
   * @param {boolean} [fromRight] Specify iterating from right to left.
   * @returns {number} Returns the index of the matched value, else `-1`.
   */
  function baseFindIndex(array, predicate, fromRight) {
    var length = array.length,
        index = fromRight ? length : -1;

    while ((fromRight ? index-- : ++index < length)) {
      if (predicate(array[index], index, array)) {
        return index;
      }
    }
    return -1;
  }

  /**
   * The base implementation of `_.indexOf` without support for binary searches.
   *
   * @private
   * @param {Array} array The array to search.
   * @param {*} value The value to search for.
   * @param {number} fromIndex The index to search from.
   * @returns {number} Returns the index of the matched value, else `-1`.
   */
  function baseIndexOf(array, value, fromIndex) {
    if (value !== value) {
      return indexOfNaN(array, fromIndex);
    }
    var index = fromIndex - 1,
        length = array.length;

    while (++index < length) {
      if (array[index] === value) {
        return index;
      }
    }
    return -1;
  }

  /**
   * The base implementation of `_.isFunction` without support for environments
   * with incorrect `typeof` results.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
   */
  function baseIsFunction(value) {
    // Avoid a Chakra JIT bug in compatibility modes of IE 11.
    // See https://github.com/jashkenas/underscore/issues/1621 for more details.
    return typeof value == 'function' || false;
  }

  /**
   * Converts `value` to a string if it's not one. An empty string is returned
   * for `null` or `undefined` values.
   *
   * @private
   * @param {*} value The value to process.
   * @returns {string} Returns the string.
   */
  function baseToString(value) {
    if (typeof value == 'string') {
      return value;
    }
    return value == null ? '' : (value + '');
  }

  /**
   * Used by `_.trim` and `_.trimLeft` to get the index of the first character
   * of `string` that is not found in `chars`.
   *
   * @private
   * @param {string} string The string to inspect.
   * @param {string} chars The characters to find.
   * @returns {number} Returns the index of the first character not found in `chars`.
   */
  function charsLeftIndex(string, chars) {
    var index = -1,
        length = string.length;

    while (++index < length && chars.indexOf(string.charAt(index)) > -1) {}
    return index;
  }

  /**
   * Used by `_.trim` and `_.trimRight` to get the index of the last character
   * of `string` that is not found in `chars`.
   *
   * @private
   * @param {string} string The string to inspect.
   * @param {string} chars The characters to find.
   * @returns {number} Returns the index of the last character not found in `chars`.
   */
  function charsRightIndex(string, chars) {
    var index = string.length;

    while (index-- && chars.indexOf(string.charAt(index)) > -1) {}
    return index;
  }

  /**
   * Used by `_.sortBy` to compare transformed elements of a collection and stable
   * sort them in ascending order.
   *
   * @private
   * @param {Object} object The object to compare to `other`.
   * @param {Object} other The object to compare to `object`.
   * @returns {number} Returns the sort order indicator for `object`.
   */
  function compareAscending(object, other) {
    return baseCompareAscending(object.criteria, other.criteria) || (object.index - other.index);
  }

  /**
   * Used by `_.sortByOrder` to compare multiple properties of each element
   * in a collection and stable sort them in the following order:
   *
   * If `orders` is unspecified, sort in ascending order for all properties.
   * Otherwise, for each property, sort in ascending order if its corresponding value in
   * orders is true, and descending order if false.
   *
   * @private
   * @param {Object} object The object to compare to `other`.
   * @param {Object} other The object to compare to `object`.
   * @param {boolean[]} orders The order to sort by for each property.
   * @returns {number} Returns the sort order indicator for `object`.
   */
  function compareMultiple(object, other, orders) {
    var index = -1,
        objCriteria = object.criteria,
        othCriteria = other.criteria,
        length = objCriteria.length,
        ordersLength = orders.length;

    while (++index < length) {
      var result = baseCompareAscending(objCriteria[index], othCriteria[index]);
      if (result) {
        if (index >= ordersLength) {
          return result;
        }
        return result * (orders[index] ? 1 : -1);
      }
    }
    // Fixes an `Array#sort` bug in the JS engine embedded in Adobe applications
    // that causes it, under certain circumstances, to provide the same value for
    // `object` and `other`. See https://github.com/jashkenas/underscore/pull/1247
    // for more details.
    //
    // This also ensures a stable sort in V8 and other engines.
    // See https://code.google.com/p/v8/issues/detail?id=90 for more details.
    return object.index - other.index;
  }

  /**
   * Used by `_.deburr` to convert latin-1 supplementary letters to basic latin letters.
   *
   * @private
   * @param {string} letter The matched letter to deburr.
   * @returns {string} Returns the deburred letter.
   */
  function deburrLetter(letter) {
    return deburredLetters[letter];
  }

  /**
   * Used by `_.escape` to convert characters to HTML entities.
   *
   * @private
   * @param {string} chr The matched character to escape.
   * @returns {string} Returns the escaped character.
   */
  function escapeHtmlChar(chr) {
    return htmlEscapes[chr];
  }

  /**
   * Used by `_.template` to escape characters for inclusion in compiled
   * string literals.
   *
   * @private
   * @param {string} chr The matched character to escape.
   * @returns {string} Returns the escaped character.
   */
  function escapeStringChar(chr) {
    return '\\' + stringEscapes[chr];
  }

  /**
   * Gets the index at which the first occurrence of `NaN` is found in `array`.
   *
   * @private
   * @param {Array} array The array to search.
   * @param {number} fromIndex The index to search from.
   * @param {boolean} [fromRight] Specify iterating from right to left.
   * @returns {number} Returns the index of the matched `NaN`, else `-1`.
   */
  function indexOfNaN(array, fromIndex, fromRight) {
    var length = array.length,
        index = fromIndex + (fromRight ? 0 : -1);

    while ((fromRight ? index-- : ++index < length)) {
      var other = array[index];
      if (other !== other) {
        return index;
      }
    }
    return -1;
  }

  /**
   * Checks if `value` is object-like.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
   */
  function isObjectLike(value) {
    return !!value && typeof value == 'object';
  }

  /**
   * Used by `trimmedLeftIndex` and `trimmedRightIndex` to determine if a
   * character code is whitespace.
   *
   * @private
   * @param {number} charCode The character code to inspect.
   * @returns {boolean} Returns `true` if `charCode` is whitespace, else `false`.
   */
  function isSpace(charCode) {
    return ((charCode <= 160 && (charCode >= 9 && charCode <= 13) || charCode == 32 || charCode == 160) || charCode == 5760 || charCode == 6158 ||
      (charCode >= 8192 && (charCode <= 8202 || charCode == 8232 || charCode == 8233 || charCode == 8239 || charCode == 8287 || charCode == 12288 || charCode == 65279)));
  }

  /**
   * Replaces all `placeholder` elements in `array` with an internal placeholder
   * and returns an array of their indexes.
   *
   * @private
   * @param {Array} array The array to modify.
   * @param {*} placeholder The placeholder to replace.
   * @returns {Array} Returns the new array of placeholder indexes.
   */
  function replaceHolders(array, placeholder) {
    var index = -1,
        length = array.length,
        resIndex = -1,
        result = [];

    while (++index < length) {
      if (array[index] === placeholder) {
        array[index] = PLACEHOLDER;
        result[++resIndex] = index;
      }
    }
    return result;
  }

  /**
   * An implementation of `_.uniq` optimized for sorted arrays without support
   * for callback shorthands and `this` binding.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {Function} [iteratee] The function invoked per iteration.
   * @returns {Array} Returns the new duplicate-value-free array.
   */
  function sortedUniq(array, iteratee) {
    var seen,
        index = -1,
        length = array.length,
        resIndex = -1,
        result = [];

    while (++index < length) {
      var value = array[index],
          computed = iteratee ? iteratee(value, index, array) : value;

      if (!index || seen !== computed) {
        seen = computed;
        result[++resIndex] = value;
      }
    }
    return result;
  }

  /**
   * Used by `_.trim` and `_.trimLeft` to get the index of the first non-whitespace
   * character of `string`.
   *
   * @private
   * @param {string} string The string to inspect.
   * @returns {number} Returns the index of the first non-whitespace character.
   */
  function trimmedLeftIndex(string) {
    var index = -1,
        length = string.length;

    while (++index < length && isSpace(string.charCodeAt(index))) {}
    return index;
  }

  /**
   * Used by `_.trim` and `_.trimRight` to get the index of the last non-whitespace
   * character of `string`.
   *
   * @private
   * @param {string} string The string to inspect.
   * @returns {number} Returns the index of the last non-whitespace character.
   */
  function trimmedRightIndex(string) {
    var index = string.length;

    while (index-- && isSpace(string.charCodeAt(index))) {}
    return index;
  }

  /**
   * Used by `_.unescape` to convert HTML entities to characters.
   *
   * @private
   * @param {string} chr The matched character to unescape.
   * @returns {string} Returns the unescaped character.
   */
  function unescapeHtmlChar(chr) {
    return htmlUnescapes[chr];
  }

  /*--------------------------------------------------------------------------*/

  /**
   * Create a new pristine `lodash` function using the given `context` object.
   *
   * @static
   * @memberOf _
   * @category Utility
   * @param {Object} [context=root] The context object.
   * @returns {Function} Returns a new `lodash` function.
   * @example
   *
   * _.mixin({ 'foo': _.constant('foo') });
   *
   * var lodash = _.runInContext();
   * lodash.mixin({ 'bar': lodash.constant('bar') });
   *
   * _.isFunction(_.foo);
   * // => true
   * _.isFunction(_.bar);
   * // => false
   *
   * lodash.isFunction(lodash.foo);
   * // => false
   * lodash.isFunction(lodash.bar);
   * // => true
   *
   * // using `context` to mock `Date#getTime` use in `_.now`
   * var mock = _.runInContext({
   *   'Date': function() {
   *     return { 'getTime': getTimeMock };
   *   }
   * });
   *
   * // or creating a suped-up `defer` in Node.js
   * var defer = _.runInContext({ 'setTimeout': setImmediate }).defer;
   */
  function runInContext(context) {
    // Avoid issues with some ES3 environments that attempt to use values, named
    // after built-in constructors like `Object`, for the creation of literals.
    // ES5 clears this up by stating that literals must use built-in constructors.
    // See https://es5.github.io/#x11.1.5 for more details.
    context = context ? _.defaults(root.Object(), context, _.pick(root, contextProps)) : root;

    /** Native constructor references. */
    var Array = context.Array,
        Date = context.Date,
        Error = context.Error,
        Function = context.Function,
        Math = context.Math,
        Number = context.Number,
        Object = context.Object,
        RegExp = context.RegExp,
        String = context.String,
        TypeError = context.TypeError;

    /** Used for native method references. */
    var arrayProto = Array.prototype,
        objectProto = Object.prototype,
        stringProto = String.prototype;

    /** Used to detect DOM support. */
    var document = (document = context.window) ? document.document : null;

    /** Used to resolve the decompiled source of functions. */
    var fnToString = Function.prototype.toString;

    /** Used to check objects for own properties. */
    var hasOwnProperty = objectProto.hasOwnProperty;

    /** Used to generate unique IDs. */
    var idCounter = 0;

    /**
     * Used to resolve the [`toStringTag`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
     * of values.
     */
    var objToString = objectProto.toString;

    /** Used to restore the original `_` reference in `_.noConflict`. */
    var oldDash = context._;

    /** Used to detect if a method is native. */
    var reIsNative = RegExp('^' +
      escapeRegExp(fnToString.call(hasOwnProperty))
      .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
    );

    /** Native method references. */
    var ArrayBuffer = getNative(context, 'ArrayBuffer'),
        bufferSlice = getNative(ArrayBuffer && new ArrayBuffer(0), 'slice'),
        ceil = Math.ceil,
        clearTimeout = context.clearTimeout,
        floor = Math.floor,
        getPrototypeOf = getNative(Object, 'getPrototypeOf'),
        parseFloat = context.parseFloat,
        push = arrayProto.push,
        Set = getNative(context, 'Set'),
        setTimeout = context.setTimeout,
        splice = arrayProto.splice,
        Uint8Array = getNative(context, 'Uint8Array'),
        WeakMap = getNative(context, 'WeakMap');

    /** Used to clone array buffers. */
    var Float64Array = (function() {
      // Safari 5 errors when using an array buffer to initialize a typed array
      // where the array buffer's `byteLength` is not a multiple of the typed
      // array's `BYTES_PER_ELEMENT`.
      try {
        var func = getNative(context, 'Float64Array'),
            result = new func(new ArrayBuffer(10), 0, 1) && func;
      } catch(e) {}
      return result || null;
    }());

    /* Native method references for those with the same name as other `lodash` methods. */
    var nativeCreate = getNative(Object, 'create'),
        nativeIsArray = getNative(Array, 'isArray'),
        nativeIsFinite = context.isFinite,
        nativeKeys = getNative(Object, 'keys'),
        nativeMax = Math.max,
        nativeMin = Math.min,
        nativeNow = getNative(Date, 'now'),
        nativeNumIsFinite = getNative(Number, 'isFinite'),
        nativeParseInt = context.parseInt,
        nativeRandom = Math.random;

    /** Used as references for `-Infinity` and `Infinity`. */
    var NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY,
        POSITIVE_INFINITY = Number.POSITIVE_INFINITY;

    /** Used as references for the maximum length and index of an array. */
    var MAX_ARRAY_LENGTH = 4294967295,
        MAX_ARRAY_INDEX = MAX_ARRAY_LENGTH - 1,
        HALF_MAX_ARRAY_LENGTH = MAX_ARRAY_LENGTH >>> 1;

    /** Used as the size, in bytes, of each `Float64Array` element. */
    var FLOAT64_BYTES_PER_ELEMENT = Float64Array ? Float64Array.BYTES_PER_ELEMENT : 0;

    /**
     * Used as the [maximum length](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.max_safe_integer)
     * of an array-like value.
     */
    var MAX_SAFE_INTEGER = 9007199254740991;

    /** Used to store function metadata. */
    var metaMap = WeakMap && new WeakMap;

    /** Used to lookup unminified function names. */
    var realNames = {};

    /*------------------------------------------------------------------------*/

    /**
     * Creates a `lodash` object which wraps `value` to enable implicit chaining.
     * Methods that operate on and return arrays, collections, and functions can
     * be chained together. Methods that return a boolean or single value will
     * automatically end the chain returning the unwrapped value. Explicit chaining
     * may be enabled using `_.chain`. The execution of chained methods is lazy,
     * that is, execution is deferred until `_#value` is implicitly or explicitly
     * called.
     *
     * Lazy evaluation allows several methods to support shortcut fusion. Shortcut
     * fusion is an optimization that merges iteratees to avoid creating intermediate
     * arrays and reduce the number of iteratee executions.
     *
     * Chaining is supported in custom builds as long as the `_#value` method is
     * directly or indirectly included in the build.
     *
     * In addition to lodash methods, wrappers have `Array` and `String` methods.
     *
     * The wrapper `Array` methods are:
     * `concat`, `join`, `pop`, `push`, `reverse`, `shift`, `slice`, `sort`,
     * `splice`, and `unshift`
     *
     * The wrapper `String` methods are:
     * `replace` and `split`
     *
     * The wrapper methods that support shortcut fusion are:
     * `compact`, `drop`, `dropRight`, `dropRightWhile`, `dropWhile`, `filter`,
     * `first`, `initial`, `last`, `map`, `pluck`, `reject`, `rest`, `reverse`,
     * `slice`, `take`, `takeRight`, `takeRightWhile`, `takeWhile`, `toArray`,
     * and `where`
     *
     * The chainable wrapper methods are:
     * `after`, `ary`, `assign`, `at`, `before`, `bind`, `bindAll`, `bindKey`,
     * `callback`, `chain`, `chunk`, `commit`, `compact`, `concat`, `constant`,
     * `countBy`, `create`, `curry`, `debounce`, `defaults`, `defer`, `delay`,
     * `difference`, `drop`, `dropRight`, `dropRightWhile`, `dropWhile`, `fill`,
     * `filter`, `flatten`, `flattenDeep`, `flow`, `flowRight`, `forEach`,
     * `forEachRight`, `forIn`, `forInRight`, `forOwn`, `forOwnRight`, `functions`,
     * `groupBy`, `indexBy`, `initial`, `intersection`, `invert`, `invoke`, `keys`,
     * `keysIn`, `map`, `mapKeys`, `mapValues`, `matches`, `matchesProperty`,
     * `memoize`, `merge`, `method`, `methodOf`, `mixin`, `negate`, `omit`, `once`,
     * `pairs`, `partial`, `partialRight`, `partition`, `pick`, `plant`, `pluck`,
     * `property`, `propertyOf`, `pull`, `pullAt`, `push`, `range`, `rearg`,
     * `reject`, `remove`, `rest`, `restParam`, `reverse`, `set`, `shuffle`,
     * `slice`, `sort`, `sortBy`, `sortByAll`, `sortByOrder`, `splice`, `spread`,
     * `take`, `takeRight`, `takeRightWhile`, `takeWhile`, `tap`, `throttle`,
     * `thru`, `times`, `toArray`, `toPlainObject`, `transform`, `union`, `uniq`,
     * `unshift`, `unzip`, `unzipWith`, `values`, `valuesIn`, `where`, `without`,
     * `wrap`, `xor`, `zip`, `zipObject`, `zipWith`
     *
     * The wrapper methods that are **not** chainable by default are:
     * `add`, `attempt`, `camelCase`, `capitalize`, `clone`, `cloneDeep`, `deburr`,
     * `endsWith`, `escape`, `escapeRegExp`, `every`, `find`, `findIndex`, `findKey`,
     * `findLast`, `findLastIndex`, `findLastKey`, `findWhere`, `first`, `get`,
     * `gt`, `gte`, `has`, `identity`, `includes`, `indexOf`, `inRange`, `isArguments`,
     * `isArray`, `isBoolean`, `isDate`, `isElement`, `isEmpty`, `isEqual`, `isError`,
     * `isFinite` `isFunction`, `isMatch`, `isNative`, `isNaN`, `isNull`, `isNumber`,
     * `isObject`, `isPlainObject`, `isRegExp`, `isString`, `isUndefined`,
     * `isTypedArray`, `join`, `kebabCase`, `last`, `lastIndexOf`, `lt`, `lte`,
     * `max`, `min`, `noConflict`, `noop`, `now`, `pad`, `padLeft`, `padRight`,
     * `parseInt`, `pop`, `random`, `reduce`, `reduceRight`, `repeat`, `result`,
     * `runInContext`, `shift`, `size`, `snakeCase`, `some`, `sortedIndex`,
     * `sortedLastIndex`, `startCase`, `startsWith`, `sum`, `template`, `trim`,
     * `trimLeft`, `trimRight`, `trunc`, `unescape`, `uniqueId`, `value`, and `words`
     *
     * The wrapper method `sample` will return a wrapped value when `n` is provided,
     * otherwise an unwrapped value is returned.
     *
     * @name _
     * @constructor
     * @category Chain
     * @param {*} value The value to wrap in a `lodash` instance.
     * @returns {Object} Returns the new `lodash` wrapper instance.
     * @example
     *
     * var wrapped = _([1, 2, 3]);
     *
     * // returns an unwrapped value
     * wrapped.reduce(function(total, n) {
     *   return total + n;
     * });
     * // => 6
     *
     * // returns a wrapped value
     * var squares = wrapped.map(function(n) {
     *   return n * n;
     * });
     *
     * _.isArray(squares);
     * // => false
     *
     * _.isArray(squares.value());
     * // => true
     */
    function lodash(value) {
      if (isObjectLike(value) && !isArray(value) && !(value instanceof LazyWrapper)) {
        if (value instanceof LodashWrapper) {
          return value;
        }
        if (hasOwnProperty.call(value, '__chain__') && hasOwnProperty.call(value, '__wrapped__')) {
          return wrapperClone(value);
        }
      }
      return new LodashWrapper(value);
    }

    /**
     * The function whose prototype all chaining wrappers inherit from.
     *
     * @private
     */
    function baseLodash() {
      // No operation performed.
    }

    /**
     * The base constructor for creating `lodash` wrapper objects.
     *
     * @private
     * @param {*} value The value to wrap.
     * @param {boolean} [chainAll] Enable chaining for all wrapper methods.
     * @param {Array} [actions=[]] Actions to peform to resolve the unwrapped value.
     */
    function LodashWrapper(value, chainAll, actions) {
      this.__wrapped__ = value;
      this.__actions__ = actions || [];
      this.__chain__ = !!chainAll;
    }

    /**
     * An object environment feature flags.
     *
     * @static
     * @memberOf _
     * @type Object
     */
    var support = lodash.support = {};

    (function(x) {
      var Ctor = function() { this.x = x; },
          object = { '0': x, 'length': x },
          props = [];

      Ctor.prototype = { 'valueOf': x, 'y': x };
      for (var key in new Ctor) { props.push(key); }

      /**
       * Detect if the DOM is supported.
       *
       * @memberOf _.support
       * @type boolean
       */
      try {
        support.dom = document.createDocumentFragment().nodeType === 11;
      } catch(e) {
        support.dom = false;
      }
    }(1, 0));

    /**
     * By default, the template delimiters used by lodash are like those in
     * embedded Ruby (ERB). Change the following template settings to use
     * alternative delimiters.
     *
     * @static
     * @memberOf _
     * @type Object
     */
    lodash.templateSettings = {

      /**
       * Used to detect `data` property values to be HTML-escaped.
       *
       * @memberOf _.templateSettings
       * @type RegExp
       */
      'escape': reEscape,

      /**
       * Used to detect code to be evaluated.
       *
       * @memberOf _.templateSettings
       * @type RegExp
       */
      'evaluate': reEvaluate,

      /**
       * Used to detect `data` property values to inject.
       *
       * @memberOf _.templateSettings
       * @type RegExp
       */
      'interpolate': reInterpolate,

      /**
       * Used to reference the data object in the template text.
       *
       * @memberOf _.templateSettings
       * @type string
       */
      'variable': '',

      /**
       * Used to import variables into the compiled template.
       *
       * @memberOf _.templateSettings
       * @type Object
       */
      'imports': {

        /**
         * A reference to the `lodash` function.
         *
         * @memberOf _.templateSettings.imports
         * @type Function
         */
        '_': lodash
      }
    };

    /*------------------------------------------------------------------------*/

    /**
     * Creates a lazy wrapper object which wraps `value` to enable lazy evaluation.
     *
     * @private
     * @param {*} value The value to wrap.
     */
    function LazyWrapper(value) {
      this.__wrapped__ = value;
      this.__actions__ = null;
      this.__dir__ = 1;
      this.__dropCount__ = 0;
      this.__filtered__ = false;
      this.__iteratees__ = null;
      this.__takeCount__ = POSITIVE_INFINITY;
      this.__views__ = null;
    }

    /**
     * Creates a clone of the lazy wrapper object.
     *
     * @private
     * @name clone
     * @memberOf LazyWrapper
     * @returns {Object} Returns the cloned `LazyWrapper` object.
     */
    function lazyClone() {
      var actions = this.__actions__,
          iteratees = this.__iteratees__,
          views = this.__views__,
          result = new LazyWrapper(this.__wrapped__);

      result.__actions__ = actions ? arrayCopy(actions) : null;
      result.__dir__ = this.__dir__;
      result.__filtered__ = this.__filtered__;
      result.__iteratees__ = iteratees ? arrayCopy(iteratees) : null;
      result.__takeCount__ = this.__takeCount__;
      result.__views__ = views ? arrayCopy(views) : null;
      return result;
    }

    /**
     * Reverses the direction of lazy iteration.
     *
     * @private
     * @name reverse
     * @memberOf LazyWrapper
     * @returns {Object} Returns the new reversed `LazyWrapper` object.
     */
    function lazyReverse() {
      if (this.__filtered__) {
        var result = new LazyWrapper(this);
        result.__dir__ = -1;
        result.__filtered__ = true;
      } else {
        result = this.clone();
        result.__dir__ *= -1;
      }
      return result;
    }

    /**
     * Extracts the unwrapped value from its lazy wrapper.
     *
     * @private
     * @name value
     * @memberOf LazyWrapper
     * @returns {*} Returns the unwrapped value.
     */
    function lazyValue() {
      var array = this.__wrapped__.value();
      if (!isArray(array)) {
        return baseWrapperValue(array, this.__actions__);
      }
      var dir = this.__dir__,
          isRight = dir < 0,
          view = getView(0, array.length, this.__views__),
          start = view.start,
          end = view.end,
          length = end - start,
          index = isRight ? end : (start - 1),
          takeCount = nativeMin(length, this.__takeCount__),
          iteratees = this.__iteratees__,
          iterLength = iteratees ? iteratees.length : 0,
          resIndex = 0,
          result = [];

      outer:
      while (length-- && resIndex < takeCount) {
        index += dir;

        var iterIndex = -1,
            value = array[index];

        while (++iterIndex < iterLength) {
          var data = iteratees[iterIndex],
              iteratee = data.iteratee,
              type = data.type;

          if (type == LAZY_DROP_WHILE_FLAG) {
            if (data.done && (isRight ? (index > data.index) : (index < data.index))) {
              data.count = 0;
              data.done = false;
            }
            data.index = index;
            if (!data.done) {
              var limit = data.limit;
              if (!(data.done = limit > -1 ? (data.count++ >= limit) : !iteratee(value))) {
                continue outer;
              }
            }
          } else {
            var computed = iteratee(value);
            if (type == LAZY_MAP_FLAG) {
              value = computed;
            } else if (!computed) {
              if (type == LAZY_FILTER_FLAG) {
                continue outer;
              } else {
                break outer;
              }
            }
          }
        }
        result[resIndex++] = value;
      }
      return result;
    }

    /*------------------------------------------------------------------------*/

    /**
     * Creates a cache object to store key/value pairs.
     *
     * @private
     * @static
     * @name Cache
     * @memberOf _.memoize
     */
    function MapCache() {
      this.__data__ = {};
    }

    /**
     * Removes `key` and its value from the cache.
     *
     * @private
     * @name delete
     * @memberOf _.memoize.Cache
     * @param {string} key The key of the value to remove.
     * @returns {boolean} Returns `true` if the entry was removed successfully, else `false`.
     */
    function mapDelete(key) {
      return this.has(key) && delete this.__data__[key];
    }

    /**
     * Gets the cached value for `key`.
     *
     * @private
     * @name get
     * @memberOf _.memoize.Cache
     * @param {string} key The key of the value to get.
     * @returns {*} Returns the cached value.
     */
    function mapGet(key) {
      return key == '__proto__' ? undefined : this.__data__[key];
    }

    /**
     * Checks if a cached value for `key` exists.
     *
     * @private
     * @name has
     * @memberOf _.memoize.Cache
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */
    function mapHas(key) {
      return key != '__proto__' && hasOwnProperty.call(this.__data__, key);
    }

    /**
     * Sets `value` to `key` of the cache.
     *
     * @private
     * @name set
     * @memberOf _.memoize.Cache
     * @param {string} key The key of the value to cache.
     * @param {*} value The value to cache.
     * @returns {Object} Returns the cache object.
     */
    function mapSet(key, value) {
      if (key != '__proto__') {
        this.__data__[key] = value;
      }
      return this;
    }

    /*------------------------------------------------------------------------*/

    /**
     *
     * Creates a cache object to store unique values.
     *
     * @private
     * @param {Array} [values] The values to cache.
     */
    function SetCache(values) {
      var length = values ? values.length : 0;

      this.data = { 'hash': nativeCreate(null), 'set': new Set };
      while (length--) {
        this.push(values[length]);
      }
    }

    /**
     * Checks if `value` is in `cache` mimicking the return signature of
     * `_.indexOf` by returning `0` if the value is found, else `-1`.
     *
     * @private
     * @param {Object} cache The cache to search.
     * @param {*} value The value to search for.
     * @returns {number} Returns `0` if `value` is found, else `-1`.
     */
    function cacheIndexOf(cache, value) {
      var data = cache.data,
          result = (typeof value == 'string' || isObject(value)) ? data.set.has(value) : data.hash[value];

      return result ? 0 : -1;
    }

    /**
     * Adds `value` to the cache.
     *
     * @private
     * @name push
     * @memberOf SetCache
     * @param {*} value The value to cache.
     */
    function cachePush(value) {
      var data = this.data;
      if (typeof value == 'string' || isObject(value)) {
        data.set.add(value);
      } else {
        data.hash[value] = true;
      }
    }

    /*------------------------------------------------------------------------*/

    /**
     * Copies the values of `source` to `array`.
     *
     * @private
     * @param {Array} source The array to copy values from.
     * @param {Array} [array=[]] The array to copy values to.
     * @returns {Array} Returns `array`.
     */
    function arrayCopy(source, array) {
      var index = -1,
          length = source.length;

      array || (array = Array(length));
      while (++index < length) {
        array[index] = source[index];
      }
      return array;
    }

    /**
     * A specialized version of `_.forEach` for arrays without support for callback
     * shorthands and `this` binding.
     *
     * @private
     * @param {Array} array The array to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Array} Returns `array`.
     */
    function arrayEach(array, iteratee) {
      var index = -1,
          length = array.length;

      while (++index < length) {
        if (iteratee(array[index], index, array) === false) {
          break;
        }
      }
      return array;
    }

    /**
     * A specialized version of `_.forEachRight` for arrays without support for
     * callback shorthands and `this` binding.
     *
     * @private
     * @param {Array} array The array to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Array} Returns `array`.
     */
    function arrayEachRight(array, iteratee) {
      var length = array.length;

      while (length--) {
        if (iteratee(array[length], length, array) === false) {
          break;
        }
      }
      return array;
    }

    /**
     * A specialized version of `_.every` for arrays without support for callback
     * shorthands and `this` binding.
     *
     * @private
     * @param {Array} array The array to iterate over.
     * @param {Function} predicate The function invoked per iteration.
     * @returns {boolean} Returns `true` if all elements pass the predicate check,
     *  else `false`.
     */
    function arrayEvery(array, predicate) {
      var index = -1,
          length = array.length;

      while (++index < length) {
        if (!predicate(array[index], index, array)) {
          return false;
        }
      }
      return true;
    }

    /**
     * A specialized version of `baseExtremum` for arrays which invokes `iteratee`
     * with one argument: (value).
     *
     * @private
     * @param {Array} array The array to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @param {Function} comparator The function used to compare values.
     * @param {*} exValue The initial extremum value.
     * @returns {*} Returns the extremum value.
     */
    function arrayExtremum(array, iteratee, comparator, exValue) {
      var index = -1,
          length = array.length,
          computed = exValue,
          result = computed;

      while (++index < length) {
        var value = array[index],
            current = +iteratee(value);

        if (comparator(current, computed)) {
          computed = current;
          result = value;
        }
      }
      return result;
    }

    /**
     * A specialized version of `_.filter` for arrays without support for callback
     * shorthands and `this` binding.
     *
     * @private
     * @param {Array} array The array to iterate over.
     * @param {Function} predicate The function invoked per iteration.
     * @returns {Array} Returns the new filtered array.
     */
    function arrayFilter(array, predicate) {
      var index = -1,
          length = array.length,
          resIndex = -1,
          result = [];

      while (++index < length) {
        var value = array[index];
        if (predicate(value, index, array)) {
          result[++resIndex] = value;
        }
      }
      return result;
    }

    /**
     * A specialized version of `_.map` for arrays without support for callback
     * shorthands and `this` binding.
     *
     * @private
     * @param {Array} array The array to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Array} Returns the new mapped array.
     */
    function arrayMap(array, iteratee) {
      var index = -1,
          length = array.length,
          result = Array(length);

      while (++index < length) {
        result[index] = iteratee(array[index], index, array);
      }
      return result;
    }

    /**
     * A specialized version of `_.reduce` for arrays without support for callback
     * shorthands and `this` binding.
     *
     * @private
     * @param {Array} array The array to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @param {*} [accumulator] The initial value.
     * @param {boolean} [initFromArray] Specify using the first element of `array`
     *  as the initial value.
     * @returns {*} Returns the accumulated value.
     */
    function arrayReduce(array, iteratee, accumulator, initFromArray) {
      var index = -1,
          length = array.length;

      if (initFromArray && length) {
        accumulator = array[++index];
      }
      while (++index < length) {
        accumulator = iteratee(accumulator, array[index], index, array);
      }
      return accumulator;
    }

    /**
     * A specialized version of `_.reduceRight` for arrays without support for
     * callback shorthands and `this` binding.
     *
     * @private
     * @param {Array} array The array to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @param {*} [accumulator] The initial value.
     * @param {boolean} [initFromArray] Specify using the last element of `array`
     *  as the initial value.
     * @returns {*} Returns the accumulated value.
     */
    function arrayReduceRight(array, iteratee, accumulator, initFromArray) {
      var length = array.length;
      if (initFromArray && length) {
        accumulator = array[--length];
      }
      while (length--) {
        accumulator = iteratee(accumulator, array[length], length, array);
      }
      return accumulator;
    }

    /**
     * A specialized version of `_.some` for arrays without support for callback
     * shorthands and `this` binding.
     *
     * @private
     * @param {Array} array The array to iterate over.
     * @param {Function} predicate The function invoked per iteration.
     * @returns {boolean} Returns `true` if any element passes the predicate check,
     *  else `false`.
     */
    function arraySome(array, predicate) {
      var index = -1,
          length = array.length;

      while (++index < length) {
        if (predicate(array[index], index, array)) {
          return true;
        }
      }
      return false;
    }

    /**
     * A specialized version of `_.sum` for arrays without support for iteratees.
     *
     * @private
     * @param {Array} array The array to iterate over.
     * @returns {number} Returns the sum.
     */
    function arraySum(array) {
      var length = array.length,
          result = 0;

      while (length--) {
        result += +array[length] || 0;
      }
      return result;
    }

    /**
     * Used by `_.defaults` to customize its `_.assign` use.
     *
     * @private
     * @param {*} objectValue The destination object property value.
     * @param {*} sourceValue The source object property value.
     * @returns {*} Returns the value to assign to the destination object.
     */
    function assignDefaults(objectValue, sourceValue) {
      return objectValue === undefined ? sourceValue : objectValue;
    }

    /**
     * Used by `_.template` to customize its `_.assign` use.
     *
     * **Note:** This function is like `assignDefaults` except that it ignores
     * inherited property values when checking if a property is `undefined`.
     *
     * @private
     * @param {*} objectValue The destination object property value.
     * @param {*} sourceValue The source object property value.
     * @param {string} key The key associated with the object and source values.
     * @param {Object} object The destination object.
     * @returns {*} Returns the value to assign to the destination object.
     */
    function assignOwnDefaults(objectValue, sourceValue, key, object) {
      return (objectValue === undefined || !hasOwnProperty.call(object, key))
        ? sourceValue
        : objectValue;
    }

    /**
     * A specialized version of `_.assign` for customizing assigned values without
     * support for argument juggling, multiple sources, and `this` binding `customizer`
     * functions.
     *
     * @private
     * @param {Object} object The destination object.
     * @param {Object} source The source object.
     * @param {Function} customizer The function to customize assigned values.
     * @returns {Object} Returns `object`.
     */
    function assignWith(object, source, customizer) {
      var index = -1,
          props = keys(source),
          length = props.length;

      while (++index < length) {
        var key = props[index],
            value = object[key],
            result = customizer(value, source[key], key, object, source);

        if ((result === result ? (result !== value) : (value === value)) ||
            (value === undefined && !(key in object))) {
          object[key] = result;
        }
      }
      return object;
    }

    /**
     * The base implementation of `_.assign` without support for argument juggling,
     * multiple sources, and `customizer` functions.
     *
     * @private
     * @param {Object} object The destination object.
     * @param {Object} source The source object.
     * @returns {Object} Returns `object`.
     */
    function baseAssign(object, source) {
      return source == null
        ? object
        : baseCopy(source, keys(source), object);
    }

    /**
     * The base implementation of `_.at` without support for string collections
     * and individual key arguments.
     *
     * @private
     * @param {Array|Object} collection The collection to iterate over.
     * @param {number[]|string[]} props The property names or indexes of elements to pick.
     * @returns {Array} Returns the new array of picked elements.
     */
    function baseAt(collection, props) {
      var index = -1,
          isNil = collection == null,
          isArr = !isNil && isArrayLike(collection),
          length = isArr ? collection.length : 0,
          propsLength = props.length,
          result = Array(propsLength);

      while(++index < propsLength) {
        var key = props[index];
        if (isArr) {
          result[index] = isIndex(key, length) ? collection[key] : undefined;
        } else {
          result[index] = isNil ? undefined : collection[key];
        }
      }
      return result;
    }

    /**
     * Copies properties of `source` to `object`.
     *
     * @private
     * @param {Object} source The object to copy properties from.
     * @param {Array} props The property names to copy.
     * @param {Object} [object={}] The object to copy properties to.
     * @returns {Object} Returns `object`.
     */
    function baseCopy(source, props, object) {
      object || (object = {});

      var index = -1,
          length = props.length;

      while (++index < length) {
        var key = props[index];
        object[key] = source[key];
      }
      return object;
    }

    /**
     * The base implementation of `_.callback` which supports specifying the
     * number of arguments to provide to `func`.
     *
     * @private
     * @param {*} [func=_.identity] The value to convert to a callback.
     * @param {*} [thisArg] The `this` binding of `func`.
     * @param {number} [argCount] The number of arguments to provide to `func`.
     * @returns {Function} Returns the callback.
     */
    function baseCallback(func, thisArg, argCount) {
      var type = typeof func;
      if (type == 'function') {
        return thisArg === undefined
          ? func
          : bindCallback(func, thisArg, argCount);
      }
      if (func == null) {
        return identity;
      }
      if (type == 'object') {
        return baseMatches(func);
      }
      return thisArg === undefined
        ? property(func)
        : baseMatchesProperty(func, thisArg);
    }

    /**
     * The base implementation of `_.clone` without support for argument juggling
     * and `this` binding `customizer` functions.
     *
     * @private
     * @param {*} value The value to clone.
     * @param {boolean} [isDeep] Specify a deep clone.
     * @param {Function} [customizer] The function to customize cloning values.
     * @param {string} [key] The key of `value`.
     * @param {Object} [object] The object `value` belongs to.
     * @param {Array} [stackA=[]] Tracks traversed source objects.
     * @param {Array} [stackB=[]] Associates clones with source counterparts.
     * @returns {*} Returns the cloned value.
     */
    function baseClone(value, isDeep, customizer, key, object, stackA, stackB) {
      var result;
      if (customizer) {
        result = object ? customizer(value, key, object) : customizer(value);
      }
      if (result !== undefined) {
        return result;
      }
      if (!isObject(value)) {
        return value;
      }
      var isArr = isArray(value);
      if (isArr) {
        result = initCloneArray(value);
        if (!isDeep) {
          return arrayCopy(value, result);
        }
      } else {
        var tag = objToString.call(value),
            isFunc = tag == funcTag;

        if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
          result = initCloneObject(isFunc ? {} : value);
          if (!isDeep) {
            return baseAssign(result, value);
          }
        } else {
          return cloneableTags[tag]
            ? initCloneByTag(value, tag, isDeep)
            : (object ? value : {});
        }
      }
      // Check for circular references and return corresponding clone.
      stackA || (stackA = []);
      stackB || (stackB = []);

      var length = stackA.length;
      while (length--) {
        if (stackA[length] == value) {
          return stackB[length];
        }
      }
      // Add the source value to the stack of traversed objects and associate it with its clone.
      stackA.push(value);
      stackB.push(result);

      // Recursively populate clone (susceptible to call stack limits).
      (isArr ? arrayEach : baseForOwn)(value, function(subValue, key) {
        result[key] = baseClone(subValue, isDeep, customizer, key, value, stackA, stackB);
      });
      return result;
    }

    /**
     * The base implementation of `_.create` without support for assigning
     * properties to the created object.
     *
     * @private
     * @param {Object} prototype The object to inherit from.
     * @returns {Object} Returns the new object.
     */
    var baseCreate = (function() {
      function object() {}
      return function(prototype) {
        if (isObject(prototype)) {
          object.prototype = prototype;
          var result = new object;
          object.prototype = null;
        }
        return result || {};
      };
    }());

    /**
     * The base implementation of `_.delay` and `_.defer` which accepts an index
     * of where to slice the arguments to provide to `func`.
     *
     * @private
     * @param {Function} func The function to delay.
     * @param {number} wait The number of milliseconds to delay invocation.
     * @param {Object} args The arguments provide to `func`.
     * @returns {number} Returns the timer id.
     */
    function baseDelay(func, wait, args) {
      if (typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      return setTimeout(function() { func.apply(undefined, args); }, wait);
    }

    /**
     * The base implementation of `_.difference` which accepts a single array
     * of values to exclude.
     *
     * @private
     * @param {Array} array The array to inspect.
     * @param {Array} values The values to exclude.
     * @returns {Array} Returns the new array of filtered values.
     */
    function baseDifference(array, values) {
      var length = array ? array.length : 0,
          result = [];

      if (!length) {
        return result;
      }
      var index = -1,
          indexOf = getIndexOf(),
          isCommon = indexOf == baseIndexOf,
          cache = (isCommon && values.length >= 200) ? createCache(values) : null,
          valuesLength = values.length;

      if (cache) {
        indexOf = cacheIndexOf;
        isCommon = false;
        values = cache;
      }
      outer:
      while (++index < length) {
        var value = array[index];

        if (isCommon && value === value) {
          var valuesIndex = valuesLength;
          while (valuesIndex--) {
            if (values[valuesIndex] === value) {
              continue outer;
            }
          }
          result.push(value);
        }
        else if (indexOf(values, value, 0) < 0) {
          result.push(value);
        }
      }
      return result;
    }

    /**
     * The base implementation of `_.forEach` without support for callback
     * shorthands and `this` binding.
     *
     * @private
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Array|Object|string} Returns `collection`.
     */
    var baseEach = createBaseEach(baseForOwn);

    /**
     * The base implementation of `_.forEachRight` without support for callback
     * shorthands and `this` binding.
     *
     * @private
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Array|Object|string} Returns `collection`.
     */
    var baseEachRight = createBaseEach(baseForOwnRight, true);

    /**
     * The base implementation of `_.every` without support for callback
     * shorthands and `this` binding.
     *
     * @private
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function} predicate The function invoked per iteration.
     * @returns {boolean} Returns `true` if all elements pass the predicate check,
     *  else `false`
     */
    function baseEvery(collection, predicate) {
      var result = true;
      baseEach(collection, function(value, index, collection) {
        result = !!predicate(value, index, collection);
        return result;
      });
      return result;
    }

    /**
     * Gets the extremum value of `collection` invoking `iteratee` for each value
     * in `collection` to generate the criterion by which the value is ranked.
     * The `iteratee` is invoked with three arguments: (value, index|key, collection).
     *
     * @private
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @param {Function} comparator The function used to compare values.
     * @param {*} exValue The initial extremum value.
     * @returns {*} Returns the extremum value.
     */
    function baseExtremum(collection, iteratee, comparator, exValue) {
      var computed = exValue,
          result = computed;

      baseEach(collection, function(value, index, collection) {
        var current = +iteratee(value, index, collection);
        if (comparator(current, computed) || (current === exValue && current === result)) {
          computed = current;
          result = value;
        }
      });
      return result;
    }

    /**
     * The base implementation of `_.fill` without an iteratee call guard.
     *
     * @private
     * @param {Array} array The array to fill.
     * @param {*} value The value to fill `array` with.
     * @param {number} [start=0] The start position.
     * @param {number} [end=array.length] The end position.
     * @returns {Array} Returns `array`.
     */
    function baseFill(array, value, start, end) {
      var length = array.length;

      start = start == null ? 0 : (+start || 0);
      if (start < 0) {
        start = -start > length ? 0 : (length + start);
      }
      end = (end === undefined || end > length) ? length : (+end || 0);
      if (end < 0) {
        end += length;
      }
      length = start > end ? 0 : (end >>> 0);
      start >>>= 0;

      while (start < length) {
        array[start++] = value;
      }
      return array;
    }

    /**
     * The base implementation of `_.filter` without support for callback
     * shorthands and `this` binding.
     *
     * @private
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function} predicate The function invoked per iteration.
     * @returns {Array} Returns the new filtered array.
     */
    function baseFilter(collection, predicate) {
      var result = [];
      baseEach(collection, function(value, index, collection) {
        if (predicate(value, index, collection)) {
          result.push(value);
        }
      });
      return result;
    }

    /**
     * The base implementation of `_.find`, `_.findLast`, `_.findKey`, and `_.findLastKey`,
     * without support for callback shorthands and `this` binding, which iterates
     * over `collection` using the provided `eachFunc`.
     *
     * @private
     * @param {Array|Object|string} collection The collection to search.
     * @param {Function} predicate The function invoked per iteration.
     * @param {Function} eachFunc The function to iterate over `collection`.
     * @param {boolean} [retKey] Specify returning the key of the found element
     *  instead of the element itself.
     * @returns {*} Returns the found element or its key, else `undefined`.
     */
    function baseFind(collection, predicate, eachFunc, retKey) {
      var result;
      eachFunc(collection, function(value, key, collection) {
        if (predicate(value, key, collection)) {
          result = retKey ? key : value;
          return false;
        }
      });
      return result;
    }

    /**
     * The base implementation of `_.flatten` with added support for restricting
     * flattening and specifying the start index.
     *
     * @private
     * @param {Array} array The array to flatten.
     * @param {boolean} [isDeep] Specify a deep flatten.
     * @param {boolean} [isStrict] Restrict flattening to arrays-like objects.
     * @returns {Array} Returns the new flattened array.
     */
    function baseFlatten(array, isDeep, isStrict) {
      var index = -1,
          length = array.length,
          resIndex = -1,
          result = [];

      while (++index < length) {
        var value = array[index];
        if (isObjectLike(value) && isArrayLike(value) &&
            (isStrict || isArray(value) || isArguments(value))) {
          if (isDeep) {
            // Recursively flatten arrays (susceptible to call stack limits).
            value = baseFlatten(value, isDeep, isStrict);
          }
          var valIndex = -1,
              valLength = value.length;

          while (++valIndex < valLength) {
            result[++resIndex] = value[valIndex];
          }
        } else if (!isStrict) {
          result[++resIndex] = value;
        }
      }
      return result;
    }

    /**
     * The base implementation of `baseForIn` and `baseForOwn` which iterates
     * over `object` properties returned by `keysFunc` invoking `iteratee` for
     * each property. Iteratee functions may exit iteration early by explicitly
     * returning `false`.
     *
     * @private
     * @param {Object} object The object to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @param {Function} keysFunc The function to get the keys of `object`.
     * @returns {Object} Returns `object`.
     */
    var baseFor = createBaseFor();

    /**
     * This function is like `baseFor` except that it iterates over properties
     * in the opposite order.
     *
     * @private
     * @param {Object} object The object to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @param {Function} keysFunc The function to get the keys of `object`.
     * @returns {Object} Returns `object`.
     */
    var baseForRight = createBaseFor(true);

    /**
     * The base implementation of `_.forIn` without support for callback
     * shorthands and `this` binding.
     *
     * @private
     * @param {Object} object The object to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Object} Returns `object`.
     */
    function baseForIn(object, iteratee) {
      return baseFor(object, iteratee, keysIn);
    }

    /**
     * The base implementation of `_.forOwn` without support for callback
     * shorthands and `this` binding.
     *
     * @private
     * @param {Object} object The object to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Object} Returns `object`.
     */
    function baseForOwn(object, iteratee) {
      return baseFor(object, iteratee, keys);
    }

    /**
     * The base implementation of `_.forOwnRight` without support for callback
     * shorthands and `this` binding.
     *
     * @private
     * @param {Object} object The object to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Object} Returns `object`.
     */
    function baseForOwnRight(object, iteratee) {
      return baseForRight(object, iteratee, keys);
    }

    /**
     * The base implementation of `_.functions` which creates an array of
     * `object` function property names filtered from those provided.
     *
     * @private
     * @param {Object} object The object to inspect.
     * @param {Array} props The property names to filter.
     * @returns {Array} Returns the new array of filtered property names.
     */
    function baseFunctions(object, props) {
      var index = -1,
          length = props.length,
          resIndex = -1,
          result = [];

      while (++index < length) {
        var key = props[index];
        if (isFunction(object[key])) {
          result[++resIndex] = key;
        }
      }
      return result;
    }

    /**
     * The base implementation of `get` without support for string paths
     * and default values.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {Array} path The path of the property to get.
     * @param {string} [pathKey] The key representation of path.
     * @returns {*} Returns the resolved value.
     */
    function baseGet(object, path, pathKey) {
      if (object == null) {
        return;
      }
      if (pathKey !== undefined && pathKey in toObject(object)) {
        path = [pathKey];
      }
      var index = 0,
          length = path.length;

      while (object != null && index < length) {
        object = object[path[index++]];
      }
      return (index && index == length) ? object : undefined;
    }

    /**
     * The base implementation of `_.isEqual` without support for `this` binding
     * `customizer` functions.
     *
     * @private
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @param {Function} [customizer] The function to customize comparing values.
     * @param {boolean} [isLoose] Specify performing partial comparisons.
     * @param {Array} [stackA] Tracks traversed `value` objects.
     * @param {Array} [stackB] Tracks traversed `other` objects.
     * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
     */
    function baseIsEqual(value, other, customizer, isLoose, stackA, stackB) {
      if (value === other) {
        return true;
      }
      if (value == null || other == null || (!isObject(value) && !isObjectLike(other))) {
        return value !== value && other !== other;
      }
      return baseIsEqualDeep(value, other, baseIsEqual, customizer, isLoose, stackA, stackB);
    }

    /**
     * A specialized version of `baseIsEqual` for arrays and objects which performs
     * deep comparisons and tracks traversed objects enabling objects with circular
     * references to be compared.
     *
     * @private
     * @param {Object} object The object to compare.
     * @param {Object} other The other object to compare.
     * @param {Function} equalFunc The function to determine equivalents of values.
     * @param {Function} [customizer] The function to customize comparing objects.
     * @param {boolean} [isLoose] Specify performing partial comparisons.
     * @param {Array} [stackA=[]] Tracks traversed `value` objects.
     * @param {Array} [stackB=[]] Tracks traversed `other` objects.
     * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
     */
    function baseIsEqualDeep(object, other, equalFunc, customizer, isLoose, stackA, stackB) {
      var objIsArr = isArray(object),
          othIsArr = isArray(other),
          objTag = arrayTag,
          othTag = arrayTag;

      if (!objIsArr) {
        objTag = objToString.call(object);
        if (objTag == argsTag) {
          objTag = objectTag;
        } else if (objTag != objectTag) {
          objIsArr = isTypedArray(object);
        }
      }
      if (!othIsArr) {
        othTag = objToString.call(other);
        if (othTag == argsTag) {
          othTag = objectTag;
        } else if (othTag != objectTag) {
          othIsArr = isTypedArray(other);
        }
      }
      var objIsObj = objTag == objectTag,
          othIsObj = othTag == objectTag,
          isSameTag = objTag == othTag;

      if (isSameTag && !(objIsArr || objIsObj)) {
        return equalByTag(object, other, objTag);
      }
      if (!isLoose) {
        var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
            othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

        if (objIsWrapped || othIsWrapped) {
          return equalFunc(objIsWrapped ? object.value() : object, othIsWrapped ? other.value() : other, customizer, isLoose, stackA, stackB);
        }
      }
      if (!isSameTag) {
        return false;
      }
      // Assume cyclic values are equal.
      // For more information on detecting circular references see https://es5.github.io/#JO.
      stackA || (stackA = []);
      stackB || (stackB = []);

      var length = stackA.length;
      while (length--) {
        if (stackA[length] == object) {
          return stackB[length] == other;
        }
      }
      // Add `object` and `other` to the stack of traversed objects.
      stackA.push(object);
      stackB.push(other);

      var result = (objIsArr ? equalArrays : equalObjects)(object, other, equalFunc, customizer, isLoose, stackA, stackB);

      stackA.pop();
      stackB.pop();

      return result;
    }

    /**
     * The base implementation of `_.isMatch` without support for callback
     * shorthands and `this` binding.
     *
     * @private
     * @param {Object} object The object to inspect.
     * @param {Array} matchData The propery names, values, and compare flags to match.
     * @param {Function} [customizer] The function to customize comparing objects.
     * @returns {boolean} Returns `true` if `object` is a match, else `false`.
     */
    function baseIsMatch(object, matchData, customizer) {
      var index = matchData.length,
          length = index,
          noCustomizer = !customizer;

      if (object == null) {
        return !length;
      }
      object = toObject(object);
      while (index--) {
        var data = matchData[index];
        if ((noCustomizer && data[2])
              ? data[1] !== object[data[0]]
              : !(data[0] in object)
            ) {
          return false;
        }
      }
      while (++index < length) {
        data = matchData[index];
        var key = data[0],
            objValue = object[key],
            srcValue = data[1];

        if (noCustomizer && data[2]) {
          if (objValue === undefined && !(key in object)) {
            return false;
          }
        } else {
          var result = customizer ? customizer(objValue, srcValue, key) : undefined;
          if (!(result === undefined ? baseIsEqual(srcValue, objValue, customizer, true) : result)) {
            return false;
          }
        }
      }
      return true;
    }

    /**
     * The base implementation of `_.map` without support for callback shorthands
     * and `this` binding.
     *
     * @private
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Array} Returns the new mapped array.
     */
    function baseMap(collection, iteratee) {
      var index = -1,
          result = isArrayLike(collection) ? Array(collection.length) : [];

      baseEach(collection, function(value, key, collection) {
        result[++index] = iteratee(value, key, collection);
      });
      return result;
    }

    /**
     * The base implementation of `_.matches` which does not clone `source`.
     *
     * @private
     * @param {Object} source The object of property values to match.
     * @returns {Function} Returns the new function.
     */
    function baseMatches(source) {
      var matchData = getMatchData(source);
      if (matchData.length == 1 && matchData[0][2]) {
        var key = matchData[0][0],
            value = matchData[0][1];

        return function(object) {
          if (object == null) {
            return false;
          }
          return object[key] === value && (value !== undefined || (key in toObject(object)));
        };
      }
      return function(object) {
        return baseIsMatch(object, matchData);
      };
    }

    /**
     * The base implementation of `_.matchesProperty` which does not clone `srcValue`.
     *
     * @private
     * @param {string} path The path of the property to get.
     * @param {*} srcValue The value to compare.
     * @returns {Function} Returns the new function.
     */
    function baseMatchesProperty(path, srcValue) {
      var isArr = isArray(path),
          isCommon = isKey(path) && isStrictComparable(srcValue),
          pathKey = (path + '');

      path = toPath(path);
      return function(object) {
        if (object == null) {
          return false;
        }
        var key = pathKey;
        object = toObject(object);
        if ((isArr || !isCommon) && !(key in object)) {
          object = path.length == 1 ? object : baseGet(object, baseSlice(path, 0, -1));
          if (object == null) {
            return false;
          }
          key = last(path);
          object = toObject(object);
        }
        return object[key] === srcValue
          ? (srcValue !== undefined || (key in object))
          : baseIsEqual(srcValue, object[key], undefined, true);
      };
    }

    /**
     * The base implementation of `_.merge` without support for argument juggling,
     * multiple sources, and `this` binding `customizer` functions.
     *
     * @private
     * @param {Object} object The destination object.
     * @param {Object} source The source object.
     * @param {Function} [customizer] The function to customize merging properties.
     * @param {Array} [stackA=[]] Tracks traversed source objects.
     * @param {Array} [stackB=[]] Associates values with source counterparts.
     * @returns {Object} Returns `object`.
     */
    function baseMerge(object, source, customizer, stackA, stackB) {
      if (!isObject(object)) {
        return object;
      }
      var isSrcArr = isArrayLike(source) && (isArray(source) || isTypedArray(source)),
          props = isSrcArr ? null : keys(source);

      arrayEach(props || source, function(srcValue, key) {
        if (props) {
          key = srcValue;
          srcValue = source[key];
        }
        if (isObjectLike(srcValue)) {
          stackA || (stackA = []);
          stackB || (stackB = []);
          baseMergeDeep(object, source, key, baseMerge, customizer, stackA, stackB);
        }
        else {
          var value = object[key],
              result = customizer ? customizer(value, srcValue, key, object, source) : undefined,
              isCommon = result === undefined;

          if (isCommon) {
            result = srcValue;
          }
          if ((result !== undefined || (isSrcArr && !(key in object))) &&
              (isCommon || (result === result ? (result !== value) : (value === value)))) {
            object[key] = result;
          }
        }
      });
      return object;
    }

    /**
     * A specialized version of `baseMerge` for arrays and objects which performs
     * deep merges and tracks traversed objects enabling objects with circular
     * references to be merged.
     *
     * @private
     * @param {Object} object The destination object.
     * @param {Object} source The source object.
     * @param {string} key The key of the value to merge.
     * @param {Function} mergeFunc The function to merge values.
     * @param {Function} [customizer] The function to customize merging properties.
     * @param {Array} [stackA=[]] Tracks traversed source objects.
     * @param {Array} [stackB=[]] Associates values with source counterparts.
     * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
     */
    function baseMergeDeep(object, source, key, mergeFunc, customizer, stackA, stackB) {
      var length = stackA.length,
          srcValue = source[key];

      while (length--) {
        if (stackA[length] == srcValue) {
          object[key] = stackB[length];
          return;
        }
      }
      var value = object[key],
          result = customizer ? customizer(value, srcValue, key, object, source) : undefined,
          isCommon = result === undefined;

      if (isCommon) {
        result = srcValue;
        if (isArrayLike(srcValue) && (isArray(srcValue) || isTypedArray(srcValue))) {
          result = isArray(value)
            ? value
            : (isArrayLike(value) ? arrayCopy(value) : []);
        }
        else if (isPlainObject(srcValue) || isArguments(srcValue)) {
          result = isArguments(value)
            ? toPlainObject(value)
            : (isPlainObject(value) ? value : {});
        }
        else {
          isCommon = false;
        }
      }
      // Add the source value to the stack of traversed objects and associate
      // it with its merged value.
      stackA.push(srcValue);
      stackB.push(result);

      if (isCommon) {
        // Recursively merge objects and arrays (susceptible to call stack limits).
        object[key] = mergeFunc(result, srcValue, customizer, stackA, stackB);
      } else if (result === result ? (result !== value) : (value === value)) {
        object[key] = result;
      }
    }

    /**
     * The base implementation of `_.property` without support for deep paths.
     *
     * @private
     * @param {string} key The key of the property to get.
     * @returns {Function} Returns the new function.
     */
    function baseProperty(key) {
      return function(object) {
        return object == null ? undefined : object[key];
      };
    }

    /**
     * A specialized version of `baseProperty` which supports deep paths.
     *
     * @private
     * @param {Array|string} path The path of the property to get.
     * @returns {Function} Returns the new function.
     */
    function basePropertyDeep(path) {
      var pathKey = (path + '');
      path = toPath(path);
      return function(object) {
        return baseGet(object, path, pathKey);
      };
    }

    /**
     * The base implementation of `_.pullAt` without support for individual
     * index arguments and capturing the removed elements.
     *
     * @private
     * @param {Array} array The array to modify.
     * @param {number[]} indexes The indexes of elements to remove.
     * @returns {Array} Returns `array`.
     */
    function basePullAt(array, indexes) {
      var length = array ? indexes.length : 0;
      while (length--) {
        var index = indexes[length];
        if (index != previous && isIndex(index)) {
          var previous = index;
          splice.call(array, index, 1);
        }
      }
      return array;
    }

    /**
     * The base implementation of `_.random` without support for argument juggling
     * and returning floating-point numbers.
     *
     * @private
     * @param {number} min The minimum possible value.
     * @param {number} max The maximum possible value.
     * @returns {number} Returns the random number.
     */
    function baseRandom(min, max) {
      return min + floor(nativeRandom() * (max - min + 1));
    }

    /**
     * The base implementation of `_.reduce` and `_.reduceRight` without support
     * for callback shorthands and `this` binding, which iterates over `collection`
     * using the provided `eachFunc`.
     *
     * @private
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @param {*} accumulator The initial value.
     * @param {boolean} initFromCollection Specify using the first or last element
     *  of `collection` as the initial value.
     * @param {Function} eachFunc The function to iterate over `collection`.
     * @returns {*} Returns the accumulated value.
     */
    function baseReduce(collection, iteratee, accumulator, initFromCollection, eachFunc) {
      eachFunc(collection, function(value, index, collection) {
        accumulator = initFromCollection
          ? (initFromCollection = false, value)
          : iteratee(accumulator, value, index, collection);
      });
      return accumulator;
    }

    /**
     * The base implementation of `setData` without support for hot loop detection.
     *
     * @private
     * @param {Function} func The function to associate metadata with.
     * @param {*} data The metadata.
     * @returns {Function} Returns `func`.
     */
    var baseSetData = !metaMap ? identity : function(func, data) {
      metaMap.set(func, data);
      return func;
    };

    /**
     * The base implementation of `_.slice` without an iteratee call guard.
     *
     * @private
     * @param {Array} array The array to slice.
     * @param {number} [start=0] The start position.
     * @param {number} [end=array.length] The end position.
     * @returns {Array} Returns the slice of `array`.
     */
    function baseSlice(array, start, end) {
      var index = -1,
          length = array.length;

      start = start == null ? 0 : (+start || 0);
      if (start < 0) {
        start = -start > length ? 0 : (length + start);
      }
      end = (end === undefined || end > length) ? length : (+end || 0);
      if (end < 0) {
        end += length;
      }
      length = start > end ? 0 : ((end - start) >>> 0);
      start >>>= 0;

      var result = Array(length);
      while (++index < length) {
        result[index] = array[index + start];
      }
      return result;
    }

    /**
     * The base implementation of `_.some` without support for callback shorthands
     * and `this` binding.
     *
     * @private
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function} predicate The function invoked per iteration.
     * @returns {boolean} Returns `true` if any element passes the predicate check,
     *  else `false`.
     */
    function baseSome(collection, predicate) {
      var result;

      baseEach(collection, function(value, index, collection) {
        result = predicate(value, index, collection);
        return !result;
      });
      return !!result;
    }

    /**
     * The base implementation of `_.sortBy` which uses `comparer` to define
     * the sort order of `array` and replaces criteria objects with their
     * corresponding values.
     *
     * @private
     * @param {Array} array The array to sort.
     * @param {Function} comparer The function to define sort order.
     * @returns {Array} Returns `array`.
     */
    function baseSortBy(array, comparer) {
      var length = array.length;

      array.sort(comparer);
      while (length--) {
        array[length] = array[length].value;
      }
      return array;
    }

    /**
     * The base implementation of `_.sortByOrder` without param guards.
     *
     * @private
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function[]|Object[]|string[]} iteratees The iteratees to sort by.
     * @param {boolean[]} orders The sort orders of `iteratees`.
     * @returns {Array} Returns the new sorted array.
     */
    function baseSortByOrder(collection, iteratees, orders) {
      var callback = getCallback(),
          index = -1;

      iteratees = arrayMap(iteratees, function(iteratee) { return callback(iteratee); });

      var result = baseMap(collection, function(value) {
        var criteria = arrayMap(iteratees, function(iteratee) { return iteratee(value); });
        return { 'criteria': criteria, 'index': ++index, 'value': value };
      });

      return baseSortBy(result, function(object, other) {
        return compareMultiple(object, other, orders);
      });
    }

    /**
     * The base implementation of `_.sum` without support for callback shorthands
     * and `this` binding.
     *
     * @private
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {number} Returns the sum.
     */
    function baseSum(collection, iteratee) {
      var result = 0;
      baseEach(collection, function(value, index, collection) {
        result += +iteratee(value, index, collection) || 0;
      });
      return result;
    }

    /**
     * The base implementation of `_.uniq` without support for callback shorthands
     * and `this` binding.
     *
     * @private
     * @param {Array} array The array to inspect.
     * @param {Function} [iteratee] The function invoked per iteration.
     * @returns {Array} Returns the new duplicate-value-free array.
     */
    function baseUniq(array, iteratee) {
      var index = -1,
          indexOf = getIndexOf(),
          length = array.length,
          isCommon = indexOf == baseIndexOf,
          isLarge = isCommon && length >= 200,
          seen = isLarge ? createCache() : null,
          result = [];

      if (seen) {
        indexOf = cacheIndexOf;
        isCommon = false;
      } else {
        isLarge = false;
        seen = iteratee ? [] : result;
      }
      outer:
      while (++index < length) {
        var value = array[index],
            computed = iteratee ? iteratee(value, index, array) : value;

        if (isCommon && value === value) {
          var seenIndex = seen.length;
          while (seenIndex--) {
            if (seen[seenIndex] === computed) {
              continue outer;
            }
          }
          if (iteratee) {
            seen.push(computed);
          }
          result.push(value);
        }
        else if (indexOf(seen, computed, 0) < 0) {
          if (iteratee || isLarge) {
            seen.push(computed);
          }
          result.push(value);
        }
      }
      return result;
    }

    /**
     * The base implementation of `_.values` and `_.valuesIn` which creates an
     * array of `object` property values corresponding to the property names
     * of `props`.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {Array} props The property names to get values for.
     * @returns {Object} Returns the array of property values.
     */
    function baseValues(object, props) {
      var index = -1,
          length = props.length,
          result = Array(length);

      while (++index < length) {
        result[index] = object[props[index]];
      }
      return result;
    }

    /**
     * The base implementation of `_.dropRightWhile`, `_.dropWhile`, `_.takeRightWhile`,
     * and `_.takeWhile` without support for callback shorthands and `this` binding.
     *
     * @private
     * @param {Array} array The array to query.
     * @param {Function} predicate The function invoked per iteration.
     * @param {boolean} [isDrop] Specify dropping elements instead of taking them.
     * @param {boolean} [fromRight] Specify iterating from right to left.
     * @returns {Array} Returns the slice of `array`.
     */
    function baseWhile(array, predicate, isDrop, fromRight) {
      var length = array.length,
          index = fromRight ? length : -1;

      while ((fromRight ? index-- : ++index < length) && predicate(array[index], index, array)) {}
      return isDrop
        ? baseSlice(array, (fromRight ? 0 : index), (fromRight ? index + 1 : length))
        : baseSlice(array, (fromRight ? index + 1 : 0), (fromRight ? length : index));
    }

    /**
     * The base implementation of `wrapperValue` which returns the result of
     * performing a sequence of actions on the unwrapped `value`, where each
     * successive action is supplied the return value of the previous.
     *
     * @private
     * @param {*} value The unwrapped value.
     * @param {Array} actions Actions to peform to resolve the unwrapped value.
     * @returns {*} Returns the resolved value.
     */
    function baseWrapperValue(value, actions) {
      var result = value;
      if (result instanceof LazyWrapper) {
        result = result.value();
      }
      var index = -1,
          length = actions.length;

      while (++index < length) {
        var args = [result],
            action = actions[index];

        push.apply(args, action.args);
        result = action.func.apply(action.thisArg, args);
      }
      return result;
    }

    /**
     * Performs a binary search of `array` to determine the index at which `value`
     * should be inserted into `array` in order to maintain its sort order.
     *
     * @private
     * @param {Array} array The sorted array to inspect.
     * @param {*} value The value to evaluate.
     * @param {boolean} [retHighest] Specify returning the highest qualified index.
     * @returns {number} Returns the index at which `value` should be inserted
     *  into `array`.
     */
    function binaryIndex(array, value, retHighest) {
      var low = 0,
          high = array ? array.length : low;

      if (typeof value == 'number' && value === value && high <= HALF_MAX_ARRAY_LENGTH) {
        while (low < high) {
          var mid = (low + high) >>> 1,
              computed = array[mid];

          if ((retHighest ? (computed <= value) : (computed < value)) && computed !== null) {
            low = mid + 1;
          } else {
            high = mid;
          }
        }
        return high;
      }
      return binaryIndexBy(array, value, identity, retHighest);
    }

    /**
     * This function is like `binaryIndex` except that it invokes `iteratee` for
     * `value` and each element of `array` to compute their sort ranking. The
     * iteratee is invoked with one argument; (value).
     *
     * @private
     * @param {Array} array The sorted array to inspect.
     * @param {*} value The value to evaluate.
     * @param {Function} iteratee The function invoked per iteration.
     * @param {boolean} [retHighest] Specify returning the highest qualified index.
     * @returns {number} Returns the index at which `value` should be inserted
     *  into `array`.
     */
    function binaryIndexBy(array, value, iteratee, retHighest) {
      value = iteratee(value);

      var low = 0,
          high = array ? array.length : 0,
          valIsNaN = value !== value,
          valIsNull = value === null,
          valIsUndef = value === undefined;

      while (low < high) {
        var mid = floor((low + high) / 2),
            computed = iteratee(array[mid]),
            isDef = computed !== undefined,
            isReflexive = computed === computed;

        if (valIsNaN) {
          var setLow = isReflexive || retHighest;
        } else if (valIsNull) {
          setLow = isReflexive && isDef && (retHighest || computed != null);
        } else if (valIsUndef) {
          setLow = isReflexive && (retHighest || isDef);
        } else if (computed == null) {
          setLow = false;
        } else {
          setLow = retHighest ? (computed <= value) : (computed < value);
        }
        if (setLow) {
          low = mid + 1;
        } else {
          high = mid;
        }
      }
      return nativeMin(high, MAX_ARRAY_INDEX);
    }

    /**
     * A specialized version of `baseCallback` which only supports `this` binding
     * and specifying the number of arguments to provide to `func`.
     *
     * @private
     * @param {Function} func The function to bind.
     * @param {*} thisArg The `this` binding of `func`.
     * @param {number} [argCount] The number of arguments to provide to `func`.
     * @returns {Function} Returns the callback.
     */
    function bindCallback(func, thisArg, argCount) {
      if (typeof func != 'function') {
        return identity;
      }
      if (thisArg === undefined) {
        return func;
      }
      switch (argCount) {
        case 1: return function(value) {
          return func.call(thisArg, value);
        };
        case 3: return function(value, index, collection) {
          return func.call(thisArg, value, index, collection);
        };
        case 4: return function(accumulator, value, index, collection) {
          return func.call(thisArg, accumulator, value, index, collection);
        };
        case 5: return function(value, other, key, object, source) {
          return func.call(thisArg, value, other, key, object, source);
        };
      }
      return function() {
        return func.apply(thisArg, arguments);
      };
    }

    /**
     * Creates a clone of the given array buffer.
     *
     * @private
     * @param {ArrayBuffer} buffer The array buffer to clone.
     * @returns {ArrayBuffer} Returns the cloned array buffer.
     */
    function bufferClone(buffer) {
      return bufferSlice.call(buffer, 0);
    }
    if (!bufferSlice) {
      // PhantomJS has `ArrayBuffer` and `Uint8Array` but not `Float64Array`.
      bufferClone = !(ArrayBuffer && Uint8Array) ? constant(null) : function(buffer) {
        var byteLength = buffer.byteLength,
            floatLength = Float64Array ? floor(byteLength / FLOAT64_BYTES_PER_ELEMENT) : 0,
            offset = floatLength * FLOAT64_BYTES_PER_ELEMENT,
            result = new ArrayBuffer(byteLength);

        if (floatLength) {
          var view = new Float64Array(result, 0, floatLength);
          view.set(new Float64Array(buffer, 0, floatLength));
        }
        if (byteLength != offset) {
          view = new Uint8Array(result, offset);
          view.set(new Uint8Array(buffer, offset));
        }
        return result;
      };
    }

    /**
     * Creates an array that is the composition of partially applied arguments,
     * placeholders, and provided arguments into a single array of arguments.
     *
     * @private
     * @param {Array|Object} args The provided arguments.
     * @param {Array} partials The arguments to prepend to those provided.
     * @param {Array} holders The `partials` placeholder indexes.
     * @returns {Array} Returns the new array of composed arguments.
     */
    function composeArgs(args, partials, holders) {
      var holdersLength = holders.length,
          argsIndex = -1,
          argsLength = nativeMax(args.length - holdersLength, 0),
          leftIndex = -1,
          leftLength = partials.length,
          result = Array(argsLength + leftLength);

      while (++leftIndex < leftLength) {
        result[leftIndex] = partials[leftIndex];
      }
      while (++argsIndex < holdersLength) {
        result[holders[argsIndex]] = args[argsIndex];
      }
      while (argsLength--) {
        result[leftIndex++] = args[argsIndex++];
      }
      return result;
    }

    /**
     * This function is like `composeArgs` except that the arguments composition
     * is tailored for `_.partialRight`.
     *
     * @private
     * @param {Array|Object} args The provided arguments.
     * @param {Array} partials The arguments to append to those provided.
     * @param {Array} holders The `partials` placeholder indexes.
     * @returns {Array} Returns the new array of composed arguments.
     */
    function composeArgsRight(args, partials, holders) {
      var holdersIndex = -1,
          holdersLength = holders.length,
          argsIndex = -1,
          argsLength = nativeMax(args.length - holdersLength, 0),
          rightIndex = -1,
          rightLength = partials.length,
          result = Array(argsLength + rightLength);

      while (++argsIndex < argsLength) {
        result[argsIndex] = args[argsIndex];
      }
      var offset = argsIndex;
      while (++rightIndex < rightLength) {
        result[offset + rightIndex] = partials[rightIndex];
      }
      while (++holdersIndex < holdersLength) {
        result[offset + holders[holdersIndex]] = args[argsIndex++];
      }
      return result;
    }

    /**
     * Creates a function that aggregates a collection, creating an accumulator
     * object composed from the results of running each element in the collection
     * through an iteratee.
     *
     * **Note:** This function is used to create `_.countBy`, `_.groupBy`, `_.indexBy`,
     * and `_.partition`.
     *
     * @private
     * @param {Function} setter The function to set keys and values of the accumulator object.
     * @param {Function} [initializer] The function to initialize the accumulator object.
     * @returns {Function} Returns the new aggregator function.
     */
    function createAggregator(setter, initializer) {
      return function(collection, iteratee, thisArg) {
        var result = initializer ? initializer() : {};
        iteratee = getCallback(iteratee, thisArg, 3);

        if (isArray(collection)) {
          var index = -1,
              length = collection.length;

          while (++index < length) {
            var value = collection[index];
            setter(result, value, iteratee(value, index, collection), collection);
          }
        } else {
          baseEach(collection, function(value, key, collection) {
            setter(result, value, iteratee(value, key, collection), collection);
          });
        }
        return result;
      };
    }

    /**
     * Creates a function that assigns properties of source object(s) to a given
     * destination object.
     *
     * **Note:** This function is used to create `_.assign`, `_.defaults`, and `_.merge`.
     *
     * @private
     * @param {Function} assigner The function to assign values.
     * @returns {Function} Returns the new assigner function.
     */
    function createAssigner(assigner) {
      return restParam(function(object, sources) {
        var index = -1,
            length = object == null ? 0 : sources.length,
            customizer = length > 2 ? sources[length - 2] : undefined,
            guard = length > 2 ? sources[2] : undefined,
            thisArg = length > 1 ? sources[length - 1] : undefined;

        if (typeof customizer == 'function') {
          customizer = bindCallback(customizer, thisArg, 5);
          length -= 2;
        } else {
          customizer = typeof thisArg == 'function' ? thisArg : undefined;
          length -= (customizer ? 1 : 0);
        }
        if (guard && isIterateeCall(sources[0], sources[1], guard)) {
          customizer = length < 3 ? undefined : customizer;
          length = 1;
        }
        while (++index < length) {
          var source = sources[index];
          if (source) {
            assigner(object, source, customizer);
          }
        }
        return object;
      });
    }

    /**
     * Creates a `baseEach` or `baseEachRight` function.
     *
     * @private
     * @param {Function} eachFunc The function to iterate over a collection.
     * @param {boolean} [fromRight] Specify iterating from right to left.
     * @returns {Function} Returns the new base function.
     */
    function createBaseEach(eachFunc, fromRight) {
      return function(collection, iteratee) {
        var length = collection ? getLength(collection) : 0;
        if (!isLength(length)) {
          return eachFunc(collection, iteratee);
        }
        var index = fromRight ? length : -1,
            iterable = toObject(collection);

        while ((fromRight ? index-- : ++index < length)) {
          if (iteratee(iterable[index], index, iterable) === false) {
            break;
          }
        }
        return collection;
      };
    }

    /**
     * Creates a base function for `_.forIn` or `_.forInRight`.
     *
     * @private
     * @param {boolean} [fromRight] Specify iterating from right to left.
     * @returns {Function} Returns the new base function.
     */
    function createBaseFor(fromRight) {
      return function(object, iteratee, keysFunc) {
        var iterable = toObject(object),
            props = keysFunc(object),
            length = props.length,
            index = fromRight ? length : -1;

        while ((fromRight ? index-- : ++index < length)) {
          var key = props[index];
          if (iteratee(iterable[key], key, iterable) === false) {
            break;
          }
        }
        return object;
      };
    }

    /**
     * Creates a function that wraps `func` and invokes it with the `this`
     * binding of `thisArg`.
     *
     * @private
     * @param {Function} func The function to bind.
     * @param {*} [thisArg] The `this` binding of `func`.
     * @returns {Function} Returns the new bound function.
     */
    function createBindWrapper(func, thisArg) {
      var Ctor = createCtorWrapper(func);

      function wrapper() {
        var fn = (this && this !== root && this instanceof wrapper) ? Ctor : func;
        return fn.apply(thisArg, arguments);
      }
      return wrapper;
    }

    /**
     * Creates a `Set` cache object to optimize linear searches of large arrays.
     *
     * @private
     * @param {Array} [values] The values to cache.
     * @returns {null|Object} Returns the new cache object if `Set` is supported, else `null`.
     */
    var createCache = !(nativeCreate && Set) ? constant(null) : function(values) {
      return new SetCache(values);
    };

    /**
     * Creates a function that produces compound words out of the words in a
     * given string.
     *
     * @private
     * @param {Function} callback The function to combine each word.
     * @returns {Function} Returns the new compounder function.
     */
    function createCompounder(callback) {
      return function(string) {
        var index = -1,
            array = words(deburr(string)),
            length = array.length,
            result = '';

        while (++index < length) {
          result = callback(result, array[index], index);
        }
        return result;
      };
    }

    /**
     * Creates a function that produces an instance of `Ctor` regardless of
     * whether it was invoked as part of a `new` expression or by `call` or `apply`.
     *
     * @private
     * @param {Function} Ctor The constructor to wrap.
     * @returns {Function} Returns the new wrapped function.
     */
    function createCtorWrapper(Ctor) {
      return function() {
        // Use a `switch` statement to work with class constructors.
        // See https://people.mozilla.org/~jorendorff/es6-draft.html#sec-ecmascript-function-objects-call-thisargument-argumentslist
        // for more details.
        var args = arguments;
        switch (args.length) {
          case 0: return new Ctor;
          case 1: return new Ctor(args[0]);
          case 2: return new Ctor(args[0], args[1]);
          case 3: return new Ctor(args[0], args[1], args[2]);
          case 4: return new Ctor(args[0], args[1], args[2], args[3]);
          case 5: return new Ctor(args[0], args[1], args[2], args[3], args[4]);
        }
        var thisBinding = baseCreate(Ctor.prototype),
            result = Ctor.apply(thisBinding, args);

        // Mimic the constructor's `return` behavior.
        // See https://es5.github.io/#x13.2.2 for more details.
        return isObject(result) ? result : thisBinding;
      };
    }

    /**
     * Creates a `_.curry` or `_.curryRight` function.
     *
     * @private
     * @param {boolean} flag The curry bit flag.
     * @returns {Function} Returns the new curry function.
     */
    function createCurry(flag) {
      function curryFunc(func, arity, guard) {
        if (guard && isIterateeCall(func, arity, guard)) {
          arity = null;
        }
        var result = createWrapper(func, flag, null, null, null, null, null, arity);
        result.placeholder = curryFunc.placeholder;
        return result;
      }
      return curryFunc;
    }

    /**
     * Creates a `_.max` or `_.min` function.
     *
     * @private
     * @param {Function} comparator The function used to compare values.
     * @param {*} exValue The initial extremum value.
     * @returns {Function} Returns the new extremum function.
     */
    function createExtremum(comparator, exValue) {
      return function(collection, iteratee, thisArg) {
        if (thisArg && isIterateeCall(collection, iteratee, thisArg)) {
          iteratee = null;
        }
        iteratee = getCallback(iteratee, thisArg, 3);
        if (iteratee.length == 1) {
          collection = toIterable(collection);
          var result = arrayExtremum(collection, iteratee, comparator, exValue);
          if (!(collection.length && result === exValue)) {
            return result;
          }
        }
        return baseExtremum(collection, iteratee, comparator, exValue);
      };
    }

    /**
     * Creates a `_.find` or `_.findLast` function.
     *
     * @private
     * @param {Function} eachFunc The function to iterate over a collection.
     * @param {boolean} [fromRight] Specify iterating from right to left.
     * @returns {Function} Returns the new find function.
     */
    function createFind(eachFunc, fromRight) {
      return function(collection, predicate, thisArg) {
        predicate = getCallback(predicate, thisArg, 3);
        if (isArray(collection)) {
          var index = baseFindIndex(collection, predicate, fromRight);
          return index > -1 ? collection[index] : undefined;
        }
        return baseFind(collection, predicate, eachFunc);
      };
    }

    /**
     * Creates a `_.findIndex` or `_.findLastIndex` function.
     *
     * @private
     * @param {boolean} [fromRight] Specify iterating from right to left.
     * @returns {Function} Returns the new find function.
     */
    function createFindIndex(fromRight) {
      return function(array, predicate, thisArg) {
        if (!(array && array.length)) {
          return -1;
        }
        predicate = getCallback(predicate, thisArg, 3);
        return baseFindIndex(array, predicate, fromRight);
      };
    }

    /**
     * Creates a `_.findKey` or `_.findLastKey` function.
     *
     * @private
     * @param {Function} objectFunc The function to iterate over an object.
     * @returns {Function} Returns the new find function.
     */
    function createFindKey(objectFunc) {
      return function(object, predicate, thisArg) {
        predicate = getCallback(predicate, thisArg, 3);
        return baseFind(object, predicate, objectFunc, true);
      };
    }

    /**
     * Creates a `_.flow` or `_.flowRight` function.
     *
     * @private
     * @param {boolean} [fromRight] Specify iterating from right to left.
     * @returns {Function} Returns the new flow function.
     */
    function createFlow(fromRight) {
      return function() {
        var wrapper,
            length = arguments.length,
            index = fromRight ? length : -1,
            leftIndex = 0,
            funcs = Array(length);

        while ((fromRight ? index-- : ++index < length)) {
          var func = funcs[leftIndex++] = arguments[index];
          if (typeof func != 'function') {
            throw new TypeError(FUNC_ERROR_TEXT);
          }
          if (!wrapper && LodashWrapper.prototype.thru && getFuncName(func) == 'wrapper') {
            wrapper = new LodashWrapper([]);
          }
        }
        index = wrapper ? -1 : length;
        while (++index < length) {
          func = funcs[index];

          var funcName = getFuncName(func),
              data = funcName == 'wrapper' ? getData(func) : null;

          if (data && isLaziable(data[0]) && data[1] == (ARY_FLAG | CURRY_FLAG | PARTIAL_FLAG | REARG_FLAG) && !data[4].length && data[9] == 1) {
            wrapper = wrapper[getFuncName(data[0])].apply(wrapper, data[3]);
          } else {
            wrapper = (func.length == 1 && isLaziable(func)) ? wrapper[funcName]() : wrapper.thru(func);
          }
        }
        return function() {
          var args = arguments;
          if (wrapper && args.length == 1 && isArray(args[0])) {
            return wrapper.plant(args[0]).value();
          }
          var index = 0,
              result = length ? funcs[index].apply(this, args) : args[0];

          while (++index < length) {
            result = funcs[index].call(this, result);
          }
          return result;
        };
      };
    }

    /**
     * Creates a function for `_.forEach` or `_.forEachRight`.
     *
     * @private
     * @param {Function} arrayFunc The function to iterate over an array.
     * @param {Function} eachFunc The function to iterate over a collection.
     * @returns {Function} Returns the new each function.
     */
    function createForEach(arrayFunc, eachFunc) {
      return function(collection, iteratee, thisArg) {
        return (typeof iteratee == 'function' && thisArg === undefined && isArray(collection))
          ? arrayFunc(collection, iteratee)
          : eachFunc(collection, bindCallback(iteratee, thisArg, 3));
      };
    }

    /**
     * Creates a function for `_.forIn` or `_.forInRight`.
     *
     * @private
     * @param {Function} objectFunc The function to iterate over an object.
     * @returns {Function} Returns the new each function.
     */
    function createForIn(objectFunc) {
      return function(object, iteratee, thisArg) {
        if (typeof iteratee != 'function' || thisArg !== undefined) {
          iteratee = bindCallback(iteratee, thisArg, 3);
        }
        return objectFunc(object, iteratee, keysIn);
      };
    }

    /**
     * Creates a function for `_.forOwn` or `_.forOwnRight`.
     *
     * @private
     * @param {Function} objectFunc The function to iterate over an object.
     * @returns {Function} Returns the new each function.
     */
    function createForOwn(objectFunc) {
      return function(object, iteratee, thisArg) {
        if (typeof iteratee != 'function' || thisArg !== undefined) {
          iteratee = bindCallback(iteratee, thisArg, 3);
        }
        return objectFunc(object, iteratee);
      };
    }

    /**
     * Creates a function for `_.mapKeys` or `_.mapValues`.
     *
     * @private
     * @param {boolean} [isMapKeys] Specify mapping keys instead of values.
     * @returns {Function} Returns the new map function.
     */
    function createObjectMapper(isMapKeys) {
      return function(object, iteratee, thisArg) {
        var result = {};
        iteratee = getCallback(iteratee, thisArg, 3);

        baseForOwn(object, function(value, key, object) {
          var mapped = iteratee(value, key, object);
          key = isMapKeys ? mapped : key;
          value = isMapKeys ? value : mapped;
          result[key] = value;
        });
        return result;
      };
    }

    /**
     * Creates a function for `_.padLeft` or `_.padRight`.
     *
     * @private
     * @param {boolean} [fromRight] Specify padding from the right.
     * @returns {Function} Returns the new pad function.
     */
    function createPadDir(fromRight) {
      return function(string, length, chars) {
        string = baseToString(string);
        return (fromRight ? string : '') + createPadding(string, length, chars) + (fromRight ? '' : string);
      };
    }

    /**
     * Creates a `_.partial` or `_.partialRight` function.
     *
     * @private
     * @param {boolean} flag The partial bit flag.
     * @returns {Function} Returns the new partial function.
     */
    function createPartial(flag) {
      var partialFunc = restParam(function(func, partials) {
        var holders = replaceHolders(partials, partialFunc.placeholder);
        return createWrapper(func, flag, null, partials, holders);
      });
      return partialFunc;
    }

    /**
     * Creates a function for `_.reduce` or `_.reduceRight`.
     *
     * @private
     * @param {Function} arrayFunc The function to iterate over an array.
     * @param {Function} eachFunc The function to iterate over a collection.
     * @returns {Function} Returns the new each function.
     */
    function createReduce(arrayFunc, eachFunc) {
      return function(collection, iteratee, accumulator, thisArg) {
        var initFromArray = arguments.length < 3;
        return (typeof iteratee == 'function' && thisArg === undefined && isArray(collection))
          ? arrayFunc(collection, iteratee, accumulator, initFromArray)
          : baseReduce(collection, getCallback(iteratee, thisArg, 4), accumulator, initFromArray, eachFunc);
      };
    }

    /**
     * Creates a function that wraps `func` and invokes it with optional `this`
     * binding of, partial application, and currying.
     *
     * @private
     * @param {Function|string} func The function or method name to reference.
     * @param {number} bitmask The bitmask of flags. See `createWrapper` for more details.
     * @param {*} [thisArg] The `this` binding of `func`.
     * @param {Array} [partials] The arguments to prepend to those provided to the new function.
     * @param {Array} [holders] The `partials` placeholder indexes.
     * @param {Array} [partialsRight] The arguments to append to those provided to the new function.
     * @param {Array} [holdersRight] The `partialsRight` placeholder indexes.
     * @param {Array} [argPos] The argument positions of the new function.
     * @param {number} [ary] The arity cap of `func`.
     * @param {number} [arity] The arity of `func`.
     * @returns {Function} Returns the new wrapped function.
     */
    function createHybridWrapper(func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary, arity) {
      var isAry = bitmask & ARY_FLAG,
          isBind = bitmask & BIND_FLAG,
          isBindKey = bitmask & BIND_KEY_FLAG,
          isCurry = bitmask & CURRY_FLAG,
          isCurryBound = bitmask & CURRY_BOUND_FLAG,
          isCurryRight = bitmask & CURRY_RIGHT_FLAG,
          Ctor = isBindKey ? null : createCtorWrapper(func);

      function wrapper() {
        // Avoid `arguments` object use disqualifying optimizations by
        // converting it to an array before providing it to other functions.
        var length = arguments.length,
            index = length,
            args = Array(length);

        while (index--) {
          args[index] = arguments[index];
        }
        if (partials) {
          args = composeArgs(args, partials, holders);
        }
        if (partialsRight) {
          args = composeArgsRight(args, partialsRight, holdersRight);
        }
        if (isCurry || isCurryRight) {
          var placeholder = wrapper.placeholder,
              argsHolders = replaceHolders(args, placeholder);

          length -= argsHolders.length;
          if (length < arity) {
            var newArgPos = argPos ? arrayCopy(argPos) : null,
                newArity = nativeMax(arity - length, 0),
                newsHolders = isCurry ? argsHolders : null,
                newHoldersRight = isCurry ? null : argsHolders,
                newPartials = isCurry ? args : null,
                newPartialsRight = isCurry ? null : args;

            bitmask |= (isCurry ? PARTIAL_FLAG : PARTIAL_RIGHT_FLAG);
            bitmask &= ~(isCurry ? PARTIAL_RIGHT_FLAG : PARTIAL_FLAG);

            if (!isCurryBound) {
              bitmask &= ~(BIND_FLAG | BIND_KEY_FLAG);
            }
            var newData = [func, bitmask, thisArg, newPartials, newsHolders, newPartialsRight, newHoldersRight, newArgPos, ary, newArity],
                result = createHybridWrapper.apply(undefined, newData);

            if (isLaziable(func)) {
              setData(result, newData);
            }
            result.placeholder = placeholder;
            return result;
          }
        }
        var thisBinding = isBind ? thisArg : this,
            fn = isBindKey ? thisBinding[func] : func;

        if (argPos) {
          args = reorder(args, argPos);
        }
        if (isAry && ary < args.length) {
          args.length = ary;
        }
        if (this && this !== root && this instanceof wrapper) {
          fn = Ctor || createCtorWrapper(func);
        }
        return fn.apply(thisBinding, args);
      }
      return wrapper;
    }

    /**
     * Creates the padding required for `string` based on the given `length`.
     * The `chars` string is truncated if the number of characters exceeds `length`.
     *
     * @private
     * @param {string} string The string to create padding for.
     * @param {number} [length=0] The padding length.
     * @param {string} [chars=' '] The string used as padding.
     * @returns {string} Returns the pad for `string`.
     */
    function createPadding(string, length, chars) {
      var strLength = string.length;
      length = +length;

      if (strLength >= length || !nativeIsFinite(length)) {
        return '';
      }
      var padLength = length - strLength;
      chars = chars == null ? ' ' : (chars + '');
      return repeat(chars, ceil(padLength / chars.length)).slice(0, padLength);
    }

    /**
     * Creates a function that wraps `func` and invokes it with the optional `this`
     * binding of `thisArg` and the `partials` prepended to those provided to
     * the wrapper.
     *
     * @private
     * @param {Function} func The function to partially apply arguments to.
     * @param {number} bitmask The bitmask of flags. See `createWrapper` for more details.
     * @param {*} thisArg The `this` binding of `func`.
     * @param {Array} partials The arguments to prepend to those provided to the new function.
     * @returns {Function} Returns the new bound function.
     */
    function createPartialWrapper(func, bitmask, thisArg, partials) {
      var isBind = bitmask & BIND_FLAG,
          Ctor = createCtorWrapper(func);

      function wrapper() {
        // Avoid `arguments` object use disqualifying optimizations by
        // converting it to an array before providing it `func`.
        var argsIndex = -1,
            argsLength = arguments.length,
            leftIndex = -1,
            leftLength = partials.length,
            args = Array(argsLength + leftLength);

        while (++leftIndex < leftLength) {
          args[leftIndex] = partials[leftIndex];
        }
        while (argsLength--) {
          args[leftIndex++] = arguments[++argsIndex];
        }
        var fn = (this && this !== root && this instanceof wrapper) ? Ctor : func;
        return fn.apply(isBind ? thisArg : this, args);
      }
      return wrapper;
    }

    /**
     * Creates a `_.sortedIndex` or `_.sortedLastIndex` function.
     *
     * @private
     * @param {boolean} [retHighest] Specify returning the highest qualified index.
     * @returns {Function} Returns the new index function.
     */
    function createSortedIndex(retHighest) {
      return function(array, value, iteratee, thisArg) {
        var callback = getCallback(iteratee);
        return (iteratee == null && callback === baseCallback)
          ? binaryIndex(array, value, retHighest)
          : binaryIndexBy(array, value, callback(iteratee, thisArg, 1), retHighest);
      };
    }

    /**
     * Creates a function that either curries or invokes `func` with optional
     * `this` binding and partially applied arguments.
     *
     * @private
     * @param {Function|string} func The function or method name to reference.
     * @param {number} bitmask The bitmask of flags.
     *  The bitmask may be composed of the following flags:
     *     1 - `_.bind`
     *     2 - `_.bindKey`
     *     4 - `_.curry` or `_.curryRight` of a bound function
     *     8 - `_.curry`
     *    16 - `_.curryRight`
     *    32 - `_.partial`
     *    64 - `_.partialRight`
     *   128 - `_.rearg`
     *   256 - `_.ary`
     * @param {*} [thisArg] The `this` binding of `func`.
     * @param {Array} [partials] The arguments to be partially applied.
     * @param {Array} [holders] The `partials` placeholder indexes.
     * @param {Array} [argPos] The argument positions of the new function.
     * @param {number} [ary] The arity cap of `func`.
     * @param {number} [arity] The arity of `func`.
     * @returns {Function} Returns the new wrapped function.
     */
    function createWrapper(func, bitmask, thisArg, partials, holders, argPos, ary, arity) {
      var isBindKey = bitmask & BIND_KEY_FLAG;
      if (!isBindKey && typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      var length = partials ? partials.length : 0;
      if (!length) {
        bitmask &= ~(PARTIAL_FLAG | PARTIAL_RIGHT_FLAG);
        partials = holders = null;
      }
      length -= (holders ? holders.length : 0);
      if (bitmask & PARTIAL_RIGHT_FLAG) {
        var partialsRight = partials,
            holdersRight = holders;

        partials = holders = null;
      }
      var data = isBindKey ? null : getData(func),
          newData = [func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary, arity];

      if (data) {
        mergeData(newData, data);
        bitmask = newData[1];
        arity = newData[9];
      }
      newData[9] = arity == null
        ? (isBindKey ? 0 : func.length)
        : (nativeMax(arity - length, 0) || 0);

      if (bitmask == BIND_FLAG) {
        var result = createBindWrapper(newData[0], newData[2]);
      } else if ((bitmask == PARTIAL_FLAG || bitmask == (BIND_FLAG | PARTIAL_FLAG)) && !newData[4].length) {
        result = createPartialWrapper.apply(undefined, newData);
      } else {
        result = createHybridWrapper.apply(undefined, newData);
      }
      var setter = data ? baseSetData : setData;
      return setter(result, newData);
    }

    /**
     * A specialized version of `baseIsEqualDeep` for arrays with support for
     * partial deep comparisons.
     *
     * @private
     * @param {Array} array The array to compare.
     * @param {Array} other The other array to compare.
     * @param {Function} equalFunc The function to determine equivalents of values.
     * @param {Function} [customizer] The function to customize comparing arrays.
     * @param {boolean} [isLoose] Specify performing partial comparisons.
     * @param {Array} [stackA] Tracks traversed `value` objects.
     * @param {Array} [stackB] Tracks traversed `other` objects.
     * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
     */
    function equalArrays(array, other, equalFunc, customizer, isLoose, stackA, stackB) {
      var index = -1,
          arrLength = array.length,
          othLength = other.length;

      if (arrLength != othLength && !(isLoose && othLength > arrLength)) {
        return false;
      }
      // Ignore non-index properties.
      while (++index < arrLength) {
        var arrValue = array[index],
            othValue = other[index],
            result = customizer ? customizer(isLoose ? othValue : arrValue, isLoose ? arrValue : othValue, index) : undefined;

        if (result !== undefined) {
          if (result) {
            continue;
          }
          return false;
        }
        // Recursively compare arrays (susceptible to call stack limits).
        if (isLoose) {
          if (!arraySome(other, function(othValue) {
                return arrValue === othValue || equalFunc(arrValue, othValue, customizer, isLoose, stackA, stackB);
              })) {
            return false;
          }
        } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, customizer, isLoose, stackA, stackB))) {
          return false;
        }
      }
      return true;
    }

    /**
     * A specialized version of `baseIsEqualDeep` for comparing objects of
     * the same `toStringTag`.
     *
     * **Note:** This function only supports comparing values with tags of
     * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
     *
     * @private
     * @param {Object} value The object to compare.
     * @param {Object} other The other object to compare.
     * @param {string} tag The `toStringTag` of the objects to compare.
     * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
     */
    function equalByTag(object, other, tag) {
      switch (tag) {
        case boolTag:
        case dateTag:
          // Coerce dates and booleans to numbers, dates to milliseconds and booleans
          // to `1` or `0` treating invalid dates coerced to `NaN` as not equal.
          return +object == +other;

        case errorTag:
          return object.name == other.name && object.message == other.message;

        case numberTag:
          // Treat `NaN` vs. `NaN` as equal.
          return (object != +object)
            ? other != +other
            : object == +other;

        case regexpTag:
        case stringTag:
          // Coerce regexes to strings and treat strings primitives and string
          // objects as equal. See https://es5.github.io/#x15.10.6.4 for more details.
          return object == (other + '');
      }
      return false;
    }

    /**
     * A specialized version of `baseIsEqualDeep` for objects with support for
     * partial deep comparisons.
     *
     * @private
     * @param {Object} object The object to compare.
     * @param {Object} other The other object to compare.
     * @param {Function} equalFunc The function to determine equivalents of values.
     * @param {Function} [customizer] The function to customize comparing values.
     * @param {boolean} [isLoose] Specify performing partial comparisons.
     * @param {Array} [stackA] Tracks traversed `value` objects.
     * @param {Array} [stackB] Tracks traversed `other` objects.
     * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
     */
    function equalObjects(object, other, equalFunc, customizer, isLoose, stackA, stackB) {
      var objProps = keys(object),
          objLength = objProps.length,
          othProps = keys(other),
          othLength = othProps.length;

      if (objLength != othLength && !isLoose) {
        return false;
      }
      var index = objLength;
      while (index--) {
        var key = objProps[index];
        if (!(isLoose ? key in other : hasOwnProperty.call(other, key))) {
          return false;
        }
      }
      var skipCtor = isLoose;
      while (++index < objLength) {
        key = objProps[index];
        var objValue = object[key],
            othValue = other[key],
            result = customizer ? customizer(isLoose ? othValue : objValue, isLoose? objValue : othValue, key) : undefined;

        // Recursively compare objects (susceptible to call stack limits).
        if (!(result === undefined ? equalFunc(objValue, othValue, customizer, isLoose, stackA, stackB) : result)) {
          return false;
        }
        skipCtor || (skipCtor = key == 'constructor');
      }
      if (!skipCtor) {
        var objCtor = object.constructor,
            othCtor = other.constructor;

        // Non `Object` object instances with different constructors are not equal.
        if (objCtor != othCtor &&
            ('constructor' in object && 'constructor' in other) &&
            !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
              typeof othCtor == 'function' && othCtor instanceof othCtor)) {
          return false;
        }
      }
      return true;
    }

    /**
     * Gets the appropriate "callback" function. If the `_.callback` method is
     * customized this function returns the custom method, otherwise it returns
     * the `baseCallback` function. If arguments are provided the chosen function
     * is invoked with them and its result is returned.
     *
     * @private
     * @returns {Function} Returns the chosen function or its result.
     */
    function getCallback(func, thisArg, argCount) {
      var result = lodash.callback || callback;
      result = result === callback ? baseCallback : result;
      return argCount ? result(func, thisArg, argCount) : result;
    }

    /**
     * Gets metadata for `func`.
     *
     * @private
     * @param {Function} func The function to query.
     * @returns {*} Returns the metadata for `func`.
     */
    var getData = !metaMap ? noop : function(func) {
      return metaMap.get(func);
    };

    /**
     * Gets the name of `func`.
     *
     * @private
     * @param {Function} func The function to query.
     * @returns {string} Returns the function name.
     */
    function getFuncName(func) {
      var result = func.name,
          array = realNames[result],
          length = array ? array.length : 0;

      while (length--) {
        var data = array[length],
            otherFunc = data.func;
        if (otherFunc == null || otherFunc == func) {
          return data.name;
        }
      }
      return result;
    }

    /**
     * Gets the appropriate "indexOf" function. If the `_.indexOf` method is
     * customized this function returns the custom method, otherwise it returns
     * the `baseIndexOf` function. If arguments are provided the chosen function
     * is invoked with them and its result is returned.
     *
     * @private
     * @returns {Function|number} Returns the chosen function or its result.
     */
    function getIndexOf(collection, target, fromIndex) {
      var result = lodash.indexOf || indexOf;
      result = result === indexOf ? baseIndexOf : result;
      return collection ? result(collection, target, fromIndex) : result;
    }

    /**
     * Gets the "length" property value of `object`.
     *
     * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
     * that affects Safari on at least iOS 8.1-8.3 ARM64.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {*} Returns the "length" value.
     */
    var getLength = baseProperty('length');

    /**
     * Gets the propery names, values, and compare flags of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the match data of `object`.
     */
    function getMatchData(object) {
      var result = pairs(object),
          length = result.length;

      while (length--) {
        result[length][2] = isStrictComparable(result[length][1]);
      }
      return result;
    }

    /**
     * Gets the native function at `key` of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {string} key The key of the method to get.
     * @returns {*} Returns the function if it's native, else `undefined`.
     */
    function getNative(object, key) {
      var value = object == null ? undefined : object[key];
      return isNative(value) ? value : undefined;
    }

    /**
     * Gets the view, applying any `transforms` to the `start` and `end` positions.
     *
     * @private
     * @param {number} start The start of the view.
     * @param {number} end The end of the view.
     * @param {Array} [transforms] The transformations to apply to the view.
     * @returns {Object} Returns an object containing the `start` and `end`
     *  positions of the view.
     */
    function getView(start, end, transforms) {
      var index = -1,
          length = transforms ? transforms.length : 0;

      while (++index < length) {
        var data = transforms[index],
            size = data.size;

        switch (data.type) {
          case 'drop':      start += size; break;
          case 'dropRight': end -= size; break;
          case 'take':      end = nativeMin(end, start + size); break;
          case 'takeRight': start = nativeMax(start, end - size); break;
        }
      }
      return { 'start': start, 'end': end };
    }

    /**
     * Initializes an array clone.
     *
     * @private
     * @param {Array} array The array to clone.
     * @returns {Array} Returns the initialized clone.
     */
    function initCloneArray(array) {
      var length = array.length,
          result = new array.constructor(length);

      // Add array properties assigned by `RegExp#exec`.
      if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
        result.index = array.index;
        result.input = array.input;
      }
      return result;
    }

    /**
     * Initializes an object clone.
     *
     * @private
     * @param {Object} object The object to clone.
     * @returns {Object} Returns the initialized clone.
     */
    function initCloneObject(object) {
      var Ctor = object.constructor;
      if (!(typeof Ctor == 'function' && Ctor instanceof Ctor)) {
        Ctor = Object;
      }
      return new Ctor;
    }

    /**
     * Initializes an object clone based on its `toStringTag`.
     *
     * **Note:** This function only supports cloning values with tags of
     * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
     *
     * @private
     * @param {Object} object The object to clone.
     * @param {string} tag The `toStringTag` of the object to clone.
     * @param {boolean} [isDeep] Specify a deep clone.
     * @returns {Object} Returns the initialized clone.
     */
    function initCloneByTag(object, tag, isDeep) {
      var Ctor = object.constructor;
      switch (tag) {
        case arrayBufferTag:
          return bufferClone(object);

        case boolTag:
        case dateTag:
          return new Ctor(+object);

        case float32Tag: case float64Tag:
        case int8Tag: case int16Tag: case int32Tag:
        case uint8Tag: case uint8ClampedTag: case uint16Tag: case uint32Tag:
          var buffer = object.buffer;
          return new Ctor(isDeep ? bufferClone(buffer) : buffer, object.byteOffset, object.length);

        case numberTag:
        case stringTag:
          return new Ctor(object);

        case regexpTag:
          var result = new Ctor(object.source, reFlags.exec(object));
          result.lastIndex = object.lastIndex;
      }
      return result;
    }

    /**
     * Invokes the method at `path` on `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {Array|string} path The path of the method to invoke.
     * @param {Array} args The arguments to invoke the method with.
     * @returns {*} Returns the result of the invoked method.
     */
    function invokePath(object, path, args) {
      if (object != null && !isKey(path, object)) {
        path = toPath(path);
        object = path.length == 1 ? object : baseGet(object, baseSlice(path, 0, -1));
        path = last(path);
      }
      var func = object == null ? object : object[path];
      return func == null ? undefined : func.apply(object, args);
    }

    /**
     * Checks if `value` is array-like.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
     */
    function isArrayLike(value) {
      return value != null && isLength(getLength(value));
    }

    /**
     * Checks if `value` is a valid array-like index.
     *
     * @private
     * @param {*} value The value to check.
     * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
     * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
     */
    function isIndex(value, length) {
      value = (typeof value == 'number' || reIsUint.test(value)) ? +value : -1;
      length = length == null ? MAX_SAFE_INTEGER : length;
      return value > -1 && value % 1 == 0 && value < length;
    }

    /**
     * Checks if the provided arguments are from an iteratee call.
     *
     * @private
     * @param {*} value The potential iteratee value argument.
     * @param {*} index The potential iteratee index or key argument.
     * @param {*} object The potential iteratee object argument.
     * @returns {boolean} Returns `true` if the arguments are from an iteratee call, else `false`.
     */
    function isIterateeCall(value, index, object) {
      if (!isObject(object)) {
        return false;
      }
      var type = typeof index;
      if (type == 'number'
          ? (isArrayLike(object) && isIndex(index, object.length))
          : (type == 'string' && index in object)) {
        var other = object[index];
        return value === value ? (value === other) : (other !== other);
      }
      return false;
    }

    /**
     * Checks if `value` is a property name and not a property path.
     *
     * @private
     * @param {*} value The value to check.
     * @param {Object} [object] The object to query keys on.
     * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
     */
    function isKey(value, object) {
      var type = typeof value;
      if ((type == 'string' && reIsPlainProp.test(value)) || type == 'number') {
        return true;
      }
      if (isArray(value)) {
        return false;
      }
      var result = !reIsDeepProp.test(value);
      return result || (object != null && value in toObject(object));
    }

    /**
     * Checks if `func` has a lazy counterpart.
     *
     * @private
     * @param {Function} func The function to check.
     * @returns {boolean} Returns `true` if `func` has a lazy counterpart, else `false`.
     */
    function isLaziable(func) {
      var funcName = getFuncName(func);
      if (!(funcName in LazyWrapper.prototype)) {
        return false;
      }
      var other = lodash[funcName];
      if (func === other) {
        return true;
      }
      var data = getData(other);
      return !!data && func === data[0];
    }

    /**
     * Checks if `value` is a valid array-like length.
     *
     * **Note:** This function is based on [`ToLength`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength).
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
     */
    function isLength(value) {
      return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
    }

    /**
     * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` if suitable for strict
     *  equality comparisons, else `false`.
     */
    function isStrictComparable(value) {
      return value === value && !isObject(value);
    }

    /**
     * Merges the function metadata of `source` into `data`.
     *
     * Merging metadata reduces the number of wrappers required to invoke a function.
     * This is possible because methods like `_.bind`, `_.curry`, and `_.partial`
     * may be applied regardless of execution order. Methods like `_.ary` and `_.rearg`
     * augment function arguments, making the order in which they are executed important,
     * preventing the merging of metadata. However, we make an exception for a safe
     * common case where curried functions have `_.ary` and or `_.rearg` applied.
     *
     * @private
     * @param {Array} data The destination metadata.
     * @param {Array} source The source metadata.
     * @returns {Array} Returns `data`.
     */
    function mergeData(data, source) {
      var bitmask = data[1],
          srcBitmask = source[1],
          newBitmask = bitmask | srcBitmask,
          isCommon = newBitmask < ARY_FLAG;

      var isCombo =
        (srcBitmask == ARY_FLAG && bitmask == CURRY_FLAG) ||
        (srcBitmask == ARY_FLAG && bitmask == REARG_FLAG && data[7].length <= source[8]) ||
        (srcBitmask == (ARY_FLAG | REARG_FLAG) && bitmask == CURRY_FLAG);

      // Exit early if metadata can't be merged.
      if (!(isCommon || isCombo)) {
        return data;
      }
      // Use source `thisArg` if available.
      if (srcBitmask & BIND_FLAG) {
        data[2] = source[2];
        // Set when currying a bound function.
        newBitmask |= (bitmask & BIND_FLAG) ? 0 : CURRY_BOUND_FLAG;
      }
      // Compose partial arguments.
      var value = source[3];
      if (value) {
        var partials = data[3];
        data[3] = partials ? composeArgs(partials, value, source[4]) : arrayCopy(value);
        data[4] = partials ? replaceHolders(data[3], PLACEHOLDER) : arrayCopy(source[4]);
      }
      // Compose partial right arguments.
      value = source[5];
      if (value) {
        partials = data[5];
        data[5] = partials ? composeArgsRight(partials, value, source[6]) : arrayCopy(value);
        data[6] = partials ? replaceHolders(data[5], PLACEHOLDER) : arrayCopy(source[6]);
      }
      // Use source `argPos` if available.
      value = source[7];
      if (value) {
        data[7] = arrayCopy(value);
      }
      // Use source `ary` if it's smaller.
      if (srcBitmask & ARY_FLAG) {
        data[8] = data[8] == null ? source[8] : nativeMin(data[8], source[8]);
      }
      // Use source `arity` if one is not provided.
      if (data[9] == null) {
        data[9] = source[9];
      }
      // Use source `func` and merge bitmasks.
      data[0] = source[0];
      data[1] = newBitmask;

      return data;
    }

    /**
     * A specialized version of `_.pick` which picks `object` properties specified
     * by `props`.
     *
     * @private
     * @param {Object} object The source object.
     * @param {string[]} props The property names to pick.
     * @returns {Object} Returns the new object.
     */
    function pickByArray(object, props) {
      object = toObject(object);

      var index = -1,
          length = props.length,
          result = {};

      while (++index < length) {
        var key = props[index];
        if (key in object) {
          result[key] = object[key];
        }
      }
      return result;
    }

    /**
     * A specialized version of `_.pick` which picks `object` properties `predicate`
     * returns truthy for.
     *
     * @private
     * @param {Object} object The source object.
     * @param {Function} predicate The function invoked per iteration.
     * @returns {Object} Returns the new object.
     */
    function pickByCallback(object, predicate) {
      var result = {};
      baseForIn(object, function(value, key, object) {
        if (predicate(value, key, object)) {
          result[key] = value;
        }
      });
      return result;
    }

    /**
     * Reorder `array` according to the specified indexes where the element at
     * the first index is assigned as the first element, the element at
     * the second index is assigned as the second element, and so on.
     *
     * @private
     * @param {Array} array The array to reorder.
     * @param {Array} indexes The arranged array indexes.
     * @returns {Array} Returns `array`.
     */
    function reorder(array, indexes) {
      var arrLength = array.length,
          length = nativeMin(indexes.length, arrLength),
          oldArray = arrayCopy(array);

      while (length--) {
        var index = indexes[length];
        array[length] = isIndex(index, arrLength) ? oldArray[index] : undefined;
      }
      return array;
    }

    /**
     * Sets metadata for `func`.
     *
     * **Note:** If this function becomes hot, i.e. is invoked a lot in a short
     * period of time, it will trip its breaker and transition to an identity function
     * to avoid garbage collection pauses in V8. See [V8 issue 2070](https://code.google.com/p/v8/issues/detail?id=2070)
     * for more details.
     *
     * @private
     * @param {Function} func The function to associate metadata with.
     * @param {*} data The metadata.
     * @returns {Function} Returns `func`.
     */
    var setData = (function() {
      var count = 0,
          lastCalled = 0;

      return function(key, value) {
        var stamp = now(),
            remaining = HOT_SPAN - (stamp - lastCalled);

        lastCalled = stamp;
        if (remaining > 0) {
          if (++count >= HOT_COUNT) {
            return key;
          }
        } else {
          count = 0;
        }
        return baseSetData(key, value);
      };
    }());

    /**
     * A fallback implementation of `_.isPlainObject` which checks if `value`
     * is an object created by the `Object` constructor or has a `[[Prototype]]`
     * of `null`.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
     */
    function shimIsPlainObject(value) {
      var Ctor,
          support = lodash.support;

      // Exit early for non `Object` objects.
      if (!(isObjectLike(value) && objToString.call(value) == objectTag) ||
          (!hasOwnProperty.call(value, 'constructor') &&
            (Ctor = value.constructor, typeof Ctor == 'function' && !(Ctor instanceof Ctor)))) {
        return false;
      }
      // IE < 9 iterates inherited properties before own properties. If the first
      // iterated property is an object's own property then there are no inherited
      // enumerable properties.
      var result;
      // In most environments an object's own properties are iterated before
      // its inherited properties. If the last iterated property is an object's
      // own property then there are no inherited enumerable properties.
      baseForIn(value, function(subValue, key) {
        result = key;
      });
      return result === undefined || hasOwnProperty.call(value, result);
    }

    /**
     * A fallback implementation of `Object.keys` which creates an array of the
     * own enumerable property names of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names.
     */
    function shimKeys(object) {
      var props = keysIn(object),
          propsLength = props.length,
          length = propsLength && object.length;

      var allowIndexes = !!length && isLength(length) &&
        (isArray(object) || isArguments(object));

      var index = -1,
          result = [];

      while (++index < propsLength) {
        var key = props[index];
        if ((allowIndexes && isIndex(key, length)) || hasOwnProperty.call(object, key)) {
          result.push(key);
        }
      }
      return result;
    }

    /**
     * Converts `value` to an array-like object if it's not one.
     *
     * @private
     * @param {*} value The value to process.
     * @returns {Array|Object} Returns the array-like object.
     */
    function toIterable(value) {
      if (value == null) {
        return [];
      }
      if (!isArrayLike(value)) {
        return values(value);
      }
      return isObject(value) ? value : Object(value);
    }

    /**
     * Converts `value` to an object if it's not one.
     *
     * @private
     * @param {*} value The value to process.
     * @returns {Object} Returns the object.
     */
    function toObject(value) {
      return isObject(value) ? value : Object(value);
    }

    /**
     * Converts `value` to property path array if it's not one.
     *
     * @private
     * @param {*} value The value to process.
     * @returns {Array} Returns the property path array.
     */
    function toPath(value) {
      if (isArray(value)) {
        return value;
      }
      var result = [];
      baseToString(value).replace(rePropName, function(match, number, quote, string) {
        result.push(quote ? string.replace(reEscapeChar, '$1') : (number || match));
      });
      return result;
    }

    /**
     * Creates a clone of `wrapper`.
     *
     * @private
     * @param {Object} wrapper The wrapper to clone.
     * @returns {Object} Returns the cloned wrapper.
     */
    function wrapperClone(wrapper) {
      return wrapper instanceof LazyWrapper
        ? wrapper.clone()
        : new LodashWrapper(wrapper.__wrapped__, wrapper.__chain__, arrayCopy(wrapper.__actions__));
    }

    /*------------------------------------------------------------------------*/

    /**
     * Creates an array of elements split into groups the length of `size`.
     * If `collection` can't be split evenly, the final chunk will be the remaining
     * elements.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to process.
     * @param {number} [size=1] The length of each chunk.
     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
     * @returns {Array} Returns the new array containing chunks.
     * @example
     *
     * _.chunk(['a', 'b', 'c', 'd'], 2);
     * // => [['a', 'b'], ['c', 'd']]
     *
     * _.chunk(['a', 'b', 'c', 'd'], 3);
     * // => [['a', 'b', 'c'], ['d']]
     */
    function chunk(array, size, guard) {
      if (guard ? isIterateeCall(array, size, guard) : size == null) {
        size = 1;
      } else {
        size = nativeMax(+size || 1, 1);
      }
      var index = 0,
          length = array ? array.length : 0,
          resIndex = -1,
          result = Array(ceil(length / size));

      while (index < length) {
        result[++resIndex] = baseSlice(array, index, (index += size));
      }
      return result;
    }

    /**
     * Creates an array with all falsey values removed. The values `false`, `null`,
     * `0`, `""`, `undefined`, and `NaN` are falsey.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to compact.
     * @returns {Array} Returns the new array of filtered values.
     * @example
     *
     * _.compact([0, 1, false, 2, '', 3]);
     * // => [1, 2, 3]
     */
    function compact(array) {
      var index = -1,
          length = array ? array.length : 0,
          resIndex = -1,
          result = [];

      while (++index < length) {
        var value = array[index];
        if (value) {
          result[++resIndex] = value;
        }
      }
      return result;
    }

    /**
     * Creates an array of unique `array` values not included in the other
     * provided arrays using [`SameValueZero`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-samevaluezero)
     * for equality comparisons.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to inspect.
     * @param {...Array} [values] The arrays of values to exclude.
     * @returns {Array} Returns the new array of filtered values.
     * @example
     *
     * _.difference([1, 2, 3], [4, 2]);
     * // => [1, 3]
     */
    var difference = restParam(function(array, values) {
      return isArrayLike(array)
        ? baseDifference(array, baseFlatten(values, false, true))
        : [];
    });

    /**
     * Creates a slice of `array` with `n` elements dropped from the beginning.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to query.
     * @param {number} [n=1] The number of elements to drop.
     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * _.drop([1, 2, 3]);
     * // => [2, 3]
     *
     * _.drop([1, 2, 3], 2);
     * // => [3]
     *
     * _.drop([1, 2, 3], 5);
     * // => []
     *
     * _.drop([1, 2, 3], 0);
     * // => [1, 2, 3]
     */
    function drop(array, n, guard) {
      var length = array ? array.length : 0;
      if (!length) {
        return [];
      }
      if (guard ? isIterateeCall(array, n, guard) : n == null) {
        n = 1;
      }
      return baseSlice(array, n < 0 ? 0 : n);
    }

    /**
     * Creates a slice of `array` with `n` elements dropped from the end.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to query.
     * @param {number} [n=1] The number of elements to drop.
     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * _.dropRight([1, 2, 3]);
     * // => [1, 2]
     *
     * _.dropRight([1, 2, 3], 2);
     * // => [1]
     *
     * _.dropRight([1, 2, 3], 5);
     * // => []
     *
     * _.dropRight([1, 2, 3], 0);
     * // => [1, 2, 3]
     */
    function dropRight(array, n, guard) {
      var length = array ? array.length : 0;
      if (!length) {
        return [];
      }
      if (guard ? isIterateeCall(array, n, guard) : n == null) {
        n = 1;
      }
      n = length - (+n || 0);
      return baseSlice(array, 0, n < 0 ? 0 : n);
    }

    /**
     * Creates a slice of `array` excluding elements dropped from the end.
     * Elements are dropped until `predicate` returns falsey. The predicate is
     * bound to `thisArg` and invoked with three arguments: (value, index, array).
     *
     * If a property name is provided for `predicate` the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If a value is also provided for `thisArg` the created `_.matchesProperty`
     * style callback returns `true` for elements that have a matching property
     * value, else `false`.
     *
     * If an object is provided for `predicate` the created `_.matches` style
     * callback returns `true` for elements that match the properties of the given
     * object, else `false`.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to query.
     * @param {Function|Object|string} [predicate=_.identity] The function invoked
     *  per iteration.
     * @param {*} [thisArg] The `this` binding of `predicate`.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * _.dropRightWhile([1, 2, 3], function(n) {
     *   return n > 1;
     * });
     * // => [1]
     *
     * var users = [
     *   { 'user': 'barney',  'active': true },
     *   { 'user': 'fred',    'active': false },
     *   { 'user': 'pebbles', 'active': false }
     * ];
     *
     * // using the `_.matches` callback shorthand
     * _.pluck(_.dropRightWhile(users, { 'user': 'pebbles', 'active': false }), 'user');
     * // => ['barney', 'fred']
     *
     * // using the `_.matchesProperty` callback shorthand
     * _.pluck(_.dropRightWhile(users, 'active', false), 'user');
     * // => ['barney']
     *
     * // using the `_.property` callback shorthand
     * _.pluck(_.dropRightWhile(users, 'active'), 'user');
     * // => ['barney', 'fred', 'pebbles']
     */
    function dropRightWhile(array, predicate, thisArg) {
      return (array && array.length)
        ? baseWhile(array, getCallback(predicate, thisArg, 3), true, true)
        : [];
    }

    /**
     * Creates a slice of `array` excluding elements dropped from the beginning.
     * Elements are dropped until `predicate` returns falsey. The predicate is
     * bound to `thisArg` and invoked with three arguments: (value, index, array).
     *
     * If a property name is provided for `predicate` the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If a value is also provided for `thisArg` the created `_.matchesProperty`
     * style callback returns `true` for elements that have a matching property
     * value, else `false`.
     *
     * If an object is provided for `predicate` the created `_.matches` style
     * callback returns `true` for elements that have the properties of the given
     * object, else `false`.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to query.
     * @param {Function|Object|string} [predicate=_.identity] The function invoked
     *  per iteration.
     * @param {*} [thisArg] The `this` binding of `predicate`.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * _.dropWhile([1, 2, 3], function(n) {
     *   return n < 3;
     * });
     * // => [3]
     *
     * var users = [
     *   { 'user': 'barney',  'active': false },
     *   { 'user': 'fred',    'active': false },
     *   { 'user': 'pebbles', 'active': true }
     * ];
     *
     * // using the `_.matches` callback shorthand
     * _.pluck(_.dropWhile(users, { 'user': 'barney', 'active': false }), 'user');
     * // => ['fred', 'pebbles']
     *
     * // using the `_.matchesProperty` callback shorthand
     * _.pluck(_.dropWhile(users, 'active', false), 'user');
     * // => ['pebbles']
     *
     * // using the `_.property` callback shorthand
     * _.pluck(_.dropWhile(users, 'active'), 'user');
     * // => ['barney', 'fred', 'pebbles']
     */
    function dropWhile(array, predicate, thisArg) {
      return (array && array.length)
        ? baseWhile(array, getCallback(predicate, thisArg, 3), true)
        : [];
    }

    /**
     * Fills elements of `array` with `value` from `start` up to, but not
     * including, `end`.
     *
     * **Note:** This method mutates `array`.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to fill.
     * @param {*} value The value to fill `array` with.
     * @param {number} [start=0] The start position.
     * @param {number} [end=array.length] The end position.
     * @returns {Array} Returns `array`.
     * @example
     *
     * var array = [1, 2, 3];
     *
     * _.fill(array, 'a');
     * console.log(array);
     * // => ['a', 'a', 'a']
     *
     * _.fill(Array(3), 2);
     * // => [2, 2, 2]
     *
     * _.fill([4, 6, 8], '*', 1, 2);
     * // => [4, '*', 8]
     */
    function fill(array, value, start, end) {
      var length = array ? array.length : 0;
      if (!length) {
        return [];
      }
      if (start && typeof start != 'number' && isIterateeCall(array, value, start)) {
        start = 0;
        end = length;
      }
      return baseFill(array, value, start, end);
    }

    /**
     * This method is like `_.find` except that it returns the index of the first
     * element `predicate` returns truthy for instead of the element itself.
     *
     * If a property name is provided for `predicate` the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If a value is also provided for `thisArg` the created `_.matchesProperty`
     * style callback returns `true` for elements that have a matching property
     * value, else `false`.
     *
     * If an object is provided for `predicate` the created `_.matches` style
     * callback returns `true` for elements that have the properties of the given
     * object, else `false`.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to search.
     * @param {Function|Object|string} [predicate=_.identity] The function invoked
     *  per iteration.
     * @param {*} [thisArg] The `this` binding of `predicate`.
     * @returns {number} Returns the index of the found element, else `-1`.
     * @example
     *
     * var users = [
     *   { 'user': 'barney',  'active': false },
     *   { 'user': 'fred',    'active': false },
     *   { 'user': 'pebbles', 'active': true }
     * ];
     *
     * _.findIndex(users, function(chr) {
     *   return chr.user == 'barney';
     * });
     * // => 0
     *
     * // using the `_.matches` callback shorthand
     * _.findIndex(users, { 'user': 'fred', 'active': false });
     * // => 1
     *
     * // using the `_.matchesProperty` callback shorthand
     * _.findIndex(users, 'active', false);
     * // => 0
     *
     * // using the `_.property` callback shorthand
     * _.findIndex(users, 'active');
     * // => 2
     */
    var findIndex = createFindIndex();

    /**
     * This method is like `_.findIndex` except that it iterates over elements
     * of `collection` from right to left.
     *
     * If a property name is provided for `predicate` the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If a value is also provided for `thisArg` the created `_.matchesProperty`
     * style callback returns `true` for elements that have a matching property
     * value, else `false`.
     *
     * If an object is provided for `predicate` the created `_.matches` style
     * callback returns `true` for elements that have the properties of the given
     * object, else `false`.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to search.
     * @param {Function|Object|string} [predicate=_.identity] The function invoked
     *  per iteration.
     * @param {*} [thisArg] The `this` binding of `predicate`.
     * @returns {number} Returns the index of the found element, else `-1`.
     * @example
     *
     * var users = [
     *   { 'user': 'barney',  'active': true },
     *   { 'user': 'fred',    'active': false },
     *   { 'user': 'pebbles', 'active': false }
     * ];
     *
     * _.findLastIndex(users, function(chr) {
     *   return chr.user == 'pebbles';
     * });
     * // => 2
     *
     * // using the `_.matches` callback shorthand
     * _.findLastIndex(users, { 'user': 'barney', 'active': true });
     * // => 0
     *
     * // using the `_.matchesProperty` callback shorthand
     * _.findLastIndex(users, 'active', false);
     * // => 2
     *
     * // using the `_.property` callback shorthand
     * _.findLastIndex(users, 'active');
     * // => 0
     */
    var findLastIndex = createFindIndex(true);

    /**
     * Gets the first element of `array`.
     *
     * @static
     * @memberOf _
     * @alias head
     * @category Array
     * @param {Array} array The array to query.
     * @returns {*} Returns the first element of `array`.
     * @example
     *
     * _.first([1, 2, 3]);
     * // => 1
     *
     * _.first([]);
     * // => undefined
     */
    function first(array) {
      return array ? array[0] : undefined;
    }

    /**
     * Flattens a nested array. If `isDeep` is `true` the array is recursively
     * flattened, otherwise it is only flattened a single level.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to flatten.
     * @param {boolean} [isDeep] Specify a deep flatten.
     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
     * @returns {Array} Returns the new flattened array.
     * @example
     *
     * _.flatten([1, [2, 3, [4]]]);
     * // => [1, 2, 3, [4]]
     *
     * // using `isDeep`
     * _.flatten([1, [2, 3, [4]]], true);
     * // => [1, 2, 3, 4]
     */
    function flatten(array, isDeep, guard) {
      var length = array ? array.length : 0;
      if (guard && isIterateeCall(array, isDeep, guard)) {
        isDeep = false;
      }
      return length ? baseFlatten(array, isDeep) : [];
    }

    /**
     * Recursively flattens a nested array.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to recursively flatten.
     * @returns {Array} Returns the new flattened array.
     * @example
     *
     * _.flattenDeep([1, [2, 3, [4]]]);
     * // => [1, 2, 3, 4]
     */
    function flattenDeep(array) {
      var length = array ? array.length : 0;
      return length ? baseFlatten(array, true) : [];
    }

    /**
     * Gets the index at which the first occurrence of `value` is found in `array`
     * using [`SameValueZero`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-samevaluezero)
     * for equality comparisons. If `fromIndex` is negative, it is used as the offset
     * from the end of `array`. If `array` is sorted providing `true` for `fromIndex`
     * performs a faster binary search.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to search.
     * @param {*} value The value to search for.
     * @param {boolean|number} [fromIndex=0] The index to search from or `true`
     *  to perform a binary search on a sorted array.
     * @returns {number} Returns the index of the matched value, else `-1`.
     * @example
     *
     * _.indexOf([1, 2, 1, 2], 2);
     * // => 1
     *
     * // using `fromIndex`
     * _.indexOf([1, 2, 1, 2], 2, 2);
     * // => 3
     *
     * // performing a binary search
     * _.indexOf([1, 1, 2, 2], 2, true);
     * // => 2
     */
    function indexOf(array, value, fromIndex) {
      var length = array ? array.length : 0;
      if (!length) {
        return -1;
      }
      if (typeof fromIndex == 'number') {
        fromIndex = fromIndex < 0 ? nativeMax(length + fromIndex, 0) : fromIndex;
      } else if (fromIndex) {
        var index = binaryIndex(array, value),
            other = array[index];

        if (value === value ? (value === other) : (other !== other)) {
          return index;
        }
        return -1;
      }
      return baseIndexOf(array, value, fromIndex || 0);
    }

    /**
     * Gets all but the last element of `array`.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to query.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * _.initial([1, 2, 3]);
     * // => [1, 2]
     */
    function initial(array) {
      return dropRight(array, 1);
    }

    /**
     * Creates an array of unique values that are included in all of the provided
     * arrays using [`SameValueZero`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-samevaluezero)
     * for equality comparisons.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {...Array} [arrays] The arrays to inspect.
     * @returns {Array} Returns the new array of shared values.
     * @example
     * _.intersection([1, 2], [4, 2], [2, 1]);
     * // => [2]
     */
    var intersection = restParam(function(arrays) {
      var othLength = arrays.length,
          othIndex = othLength,
          caches = Array(length),
          indexOf = getIndexOf(),
          isCommon = indexOf == baseIndexOf,
          result = [];

      while (othIndex--) {
        var value = arrays[othIndex] = isArrayLike(value = arrays[othIndex]) ? value : [];
        caches[othIndex] = (isCommon && value.length >= 120) ? createCache(othIndex && value) : null;
      }
      var array = arrays[0],
          index = -1,
          length = array ? array.length : 0,
          seen = caches[0];

      outer:
      while (++index < length) {
        value = array[index];
        if ((seen ? cacheIndexOf(seen, value) : indexOf(result, value, 0)) < 0) {
          var othIndex = othLength;
          while (--othIndex) {
            var cache = caches[othIndex];
            if ((cache ? cacheIndexOf(cache, value) : indexOf(arrays[othIndex], value, 0)) < 0) {
              continue outer;
            }
          }
          if (seen) {
            seen.push(value);
          }
          result.push(value);
        }
      }
      return result;
    });

    /**
     * Gets the last element of `array`.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to query.
     * @returns {*} Returns the last element of `array`.
     * @example
     *
     * _.last([1, 2, 3]);
     * // => 3
     */
    function last(array) {
      var length = array ? array.length : 0;
      return length ? array[length - 1] : undefined;
    }

    /**
     * This method is like `_.indexOf` except that it iterates over elements of
     * `array` from right to left.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to search.
     * @param {*} value The value to search for.
     * @param {boolean|number} [fromIndex=array.length-1] The index to search from
     *  or `true` to perform a binary search on a sorted array.
     * @returns {number} Returns the index of the matched value, else `-1`.
     * @example
     *
     * _.lastIndexOf([1, 2, 1, 2], 2);
     * // => 3
     *
     * // using `fromIndex`
     * _.lastIndexOf([1, 2, 1, 2], 2, 2);
     * // => 1
     *
     * // performing a binary search
     * _.lastIndexOf([1, 1, 2, 2], 2, true);
     * // => 3
     */
    function lastIndexOf(array, value, fromIndex) {
      var length = array ? array.length : 0;
      if (!length) {
        return -1;
      }
      var index = length;
      if (typeof fromIndex == 'number') {
        index = (fromIndex < 0 ? nativeMax(length + fromIndex, 0) : nativeMin(fromIndex || 0, length - 1)) + 1;
      } else if (fromIndex) {
        index = binaryIndex(array, value, true) - 1;
        var other = array[index];
        if (value === value ? (value === other) : (other !== other)) {
          return index;
        }
        return -1;
      }
      if (value !== value) {
        return indexOfNaN(array, index, true);
      }
      while (index--) {
        if (array[index] === value) {
          return index;
        }
      }
      return -1;
    }

    /**
     * Removes all provided values from `array` using
     * [`SameValueZero`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-samevaluezero)
     * for equality comparisons.
     *
     * **Note:** Unlike `_.without`, this method mutates `array`.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to modify.
     * @param {...*} [values] The values to remove.
     * @returns {Array} Returns `array`.
     * @example
     *
     * var array = [1, 2, 3, 1, 2, 3];
     *
     * _.pull(array, 2, 3);
     * console.log(array);
     * // => [1, 1]
     */
    function pull() {
      var args = arguments,
          array = args[0];

      if (!(array && array.length)) {
        return array;
      }
      var index = 0,
          indexOf = getIndexOf(),
          length = args.length;

      while (++index < length) {
        var fromIndex = 0,
            value = args[index];

        while ((fromIndex = indexOf(array, value, fromIndex)) > -1) {
          splice.call(array, fromIndex, 1);
        }
      }
      return array;
    }

    /**
     * Removes elements from `array` corresponding to the given indexes and returns
     * an array of the removed elements. Indexes may be specified as an array of
     * indexes or as individual arguments.
     *
     * **Note:** Unlike `_.at`, this method mutates `array`.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to modify.
     * @param {...(number|number[])} [indexes] The indexes of elements to remove,
     *  specified as individual indexes or arrays of indexes.
     * @returns {Array} Returns the new array of removed elements.
     * @example
     *
     * var array = [5, 10, 15, 20];
     * var evens = _.pullAt(array, 1, 3);
     *
     * console.log(array);
     * // => [5, 15]
     *
     * console.log(evens);
     * // => [10, 20]
     */
    var pullAt = restParam(function(array, indexes) {
      indexes = baseFlatten(indexes);

      var result = baseAt(array, indexes);
      basePullAt(array, indexes.sort(baseCompareAscending));
      return result;
    });

    /**
     * Removes all elements from `array` that `predicate` returns truthy for
     * and returns an array of the removed elements. The predicate is bound to
     * `thisArg` and invoked with three arguments: (value, index, array).
     *
     * If a property name is provided for `predicate` the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If a value is also provided for `thisArg` the created `_.matchesProperty`
     * style callback returns `true` for elements that have a matching property
     * value, else `false`.
     *
     * If an object is provided for `predicate` the created `_.matches` style
     * callback returns `true` for elements that have the properties of the given
     * object, else `false`.
     *
     * **Note:** Unlike `_.filter`, this method mutates `array`.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to modify.
     * @param {Function|Object|string} [predicate=_.identity] The function invoked
     *  per iteration.
     * @param {*} [thisArg] The `this` binding of `predicate`.
     * @returns {Array} Returns the new array of removed elements.
     * @example
     *
     * var array = [1, 2, 3, 4];
     * var evens = _.remove(array, function(n) {
     *   return n % 2 == 0;
     * });
     *
     * console.log(array);
     * // => [1, 3]
     *
     * console.log(evens);
     * // => [2, 4]
     */
    function remove(array, predicate, thisArg) {
      var result = [];
      if (!(array && array.length)) {
        return result;
      }
      var index = -1,
          indexes = [],
          length = array.length;

      predicate = getCallback(predicate, thisArg, 3);
      while (++index < length) {
        var value = array[index];
        if (predicate(value, index, array)) {
          result.push(value);
          indexes.push(index);
        }
      }
      basePullAt(array, indexes);
      return result;
    }

    /**
     * Gets all but the first element of `array`.
     *
     * @static
     * @memberOf _
     * @alias tail
     * @category Array
     * @param {Array} array The array to query.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * _.rest([1, 2, 3]);
     * // => [2, 3]
     */
    function rest(array) {
      return drop(array, 1);
    }

    /**
     * Creates a slice of `array` from `start` up to, but not including, `end`.
     *
     * **Note:** This method is used instead of `Array#slice` to support node
     * lists in IE < 9 and to ensure dense arrays are returned.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to slice.
     * @param {number} [start=0] The start position.
     * @param {number} [end=array.length] The end position.
     * @returns {Array} Returns the slice of `array`.
     */
    function slice(array, start, end) {
      var length = array ? array.length : 0;
      if (!length) {
        return [];
      }
      if (end && typeof end != 'number' && isIterateeCall(array, start, end)) {
        start = 0;
        end = length;
      }
      return baseSlice(array, start, end);
    }

    /**
     * Uses a binary search to determine the lowest index at which `value` should
     * be inserted into `array` in order to maintain its sort order. If an iteratee
     * function is provided it is invoked for `value` and each element of `array`
     * to compute their sort ranking. The iteratee is bound to `thisArg` and
     * invoked with one argument; (value).
     *
     * If a property name is provided for `iteratee` the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If a value is also provided for `thisArg` the created `_.matchesProperty`
     * style callback returns `true` for elements that have a matching property
     * value, else `false`.
     *
     * If an object is provided for `iteratee` the created `_.matches` style
     * callback returns `true` for elements that have the properties of the given
     * object, else `false`.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The sorted array to inspect.
     * @param {*} value The value to evaluate.
     * @param {Function|Object|string} [iteratee=_.identity] The function invoked
     *  per iteration.
     * @param {*} [thisArg] The `this` binding of `iteratee`.
     * @returns {number} Returns the index at which `value` should be inserted
     *  into `array`.
     * @example
     *
     * _.sortedIndex([30, 50], 40);
     * // => 1
     *
     * _.sortedIndex([4, 4, 5, 5], 5);
     * // => 2
     *
     * var dict = { 'data': { 'thirty': 30, 'forty': 40, 'fifty': 50 } };
     *
     * // using an iteratee function
     * _.sortedIndex(['thirty', 'fifty'], 'forty', function(word) {
     *   return this.data[word];
     * }, dict);
     * // => 1
     *
     * // using the `_.property` callback shorthand
     * _.sortedIndex([{ 'x': 30 }, { 'x': 50 }], { 'x': 40 }, 'x');
     * // => 1
     */
    var sortedIndex = createSortedIndex();

    /**
     * This method is like `_.sortedIndex` except that it returns the highest
     * index at which `value` should be inserted into `array` in order to
     * maintain its sort order.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The sorted array to inspect.
     * @param {*} value The value to evaluate.
     * @param {Function|Object|string} [iteratee=_.identity] The function invoked
     *  per iteration.
     * @param {*} [thisArg] The `this` binding of `iteratee`.
     * @returns {number} Returns the index at which `value` should be inserted
     *  into `array`.
     * @example
     *
     * _.sortedLastIndex([4, 4, 5, 5], 5);
     * // => 4
     */
    var sortedLastIndex = createSortedIndex(true);

    /**
     * Creates a slice of `array` with `n` elements taken from the beginning.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to query.
     * @param {number} [n=1] The number of elements to take.
     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * _.take([1, 2, 3]);
     * // => [1]
     *
     * _.take([1, 2, 3], 2);
     * // => [1, 2]
     *
     * _.take([1, 2, 3], 5);
     * // => [1, 2, 3]
     *
     * _.take([1, 2, 3], 0);
     * // => []
     */
    function take(array, n, guard) {
      var length = array ? array.length : 0;
      if (!length) {
        return [];
      }
      if (guard ? isIterateeCall(array, n, guard) : n == null) {
        n = 1;
      }
      return baseSlice(array, 0, n < 0 ? 0 : n);
    }

    /**
     * Creates a slice of `array` with `n` elements taken from the end.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to query.
     * @param {number} [n=1] The number of elements to take.
     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * _.takeRight([1, 2, 3]);
     * // => [3]
     *
     * _.takeRight([1, 2, 3], 2);
     * // => [2, 3]
     *
     * _.takeRight([1, 2, 3], 5);
     * // => [1, 2, 3]
     *
     * _.takeRight([1, 2, 3], 0);
     * // => []
     */
    function takeRight(array, n, guard) {
      var length = array ? array.length : 0;
      if (!length) {
        return [];
      }
      if (guard ? isIterateeCall(array, n, guard) : n == null) {
        n = 1;
      }
      n = length - (+n || 0);
      return baseSlice(array, n < 0 ? 0 : n);
    }

    /**
     * Creates a slice of `array` with elements taken from the end. Elements are
     * taken until `predicate` returns falsey. The predicate is bound to `thisArg`
     * and invoked with three arguments: (value, index, array).
     *
     * If a property name is provided for `predicate` the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If a value is also provided for `thisArg` the created `_.matchesProperty`
     * style callback returns `true` for elements that have a matching property
     * value, else `false`.
     *
     * If an object is provided for `predicate` the created `_.matches` style
     * callback returns `true` for elements that have the properties of the given
     * object, else `false`.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to query.
     * @param {Function|Object|string} [predicate=_.identity] The function invoked
     *  per iteration.
     * @param {*} [thisArg] The `this` binding of `predicate`.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * _.takeRightWhile([1, 2, 3], function(n) {
     *   return n > 1;
     * });
     * // => [2, 3]
     *
     * var users = [
     *   { 'user': 'barney',  'active': true },
     *   { 'user': 'fred',    'active': false },
     *   { 'user': 'pebbles', 'active': false }
     * ];
     *
     * // using the `_.matches` callback shorthand
     * _.pluck(_.takeRightWhile(users, { 'user': 'pebbles', 'active': false }), 'user');
     * // => ['pebbles']
     *
     * // using the `_.matchesProperty` callback shorthand
     * _.pluck(_.takeRightWhile(users, 'active', false), 'user');
     * // => ['fred', 'pebbles']
     *
     * // using the `_.property` callback shorthand
     * _.pluck(_.takeRightWhile(users, 'active'), 'user');
     * // => []
     */
    function takeRightWhile(array, predicate, thisArg) {
      return (array && array.length)
        ? baseWhile(array, getCallback(predicate, thisArg, 3), false, true)
        : [];
    }

    /**
     * Creates a slice of `array` with elements taken from the beginning. Elements
     * are taken until `predicate` returns falsey. The predicate is bound to
     * `thisArg` and invoked with three arguments: (value, index, array).
     *
     * If a property name is provided for `predicate` the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If a value is also provided for `thisArg` the created `_.matchesProperty`
     * style callback returns `true` for elements that have a matching property
     * value, else `false`.
     *
     * If an object is provided for `predicate` the created `_.matches` style
     * callback returns `true` for elements that have the properties of the given
     * object, else `false`.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to query.
     * @param {Function|Object|string} [predicate=_.identity] The function invoked
     *  per iteration.
     * @param {*} [thisArg] The `this` binding of `predicate`.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * _.takeWhile([1, 2, 3], function(n) {
     *   return n < 3;
     * });
     * // => [1, 2]
     *
     * var users = [
     *   { 'user': 'barney',  'active': false },
     *   { 'user': 'fred',    'active': false},
     *   { 'user': 'pebbles', 'active': true }
     * ];
     *
     * // using the `_.matches` callback shorthand
     * _.pluck(_.takeWhile(users, { 'user': 'barney', 'active': false }), 'user');
     * // => ['barney']
     *
     * // using the `_.matchesProperty` callback shorthand
     * _.pluck(_.takeWhile(users, 'active', false), 'user');
     * // => ['barney', 'fred']
     *
     * // using the `_.property` callback shorthand
     * _.pluck(_.takeWhile(users, 'active'), 'user');
     * // => []
     */
    function takeWhile(array, predicate, thisArg) {
      return (array && array.length)
        ? baseWhile(array, getCallback(predicate, thisArg, 3))
        : [];
    }

    /**
     * Creates an array of unique values, in order, from all of the provided arrays
     * using [`SameValueZero`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-samevaluezero)
     * for equality comparisons.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {...Array} [arrays] The arrays to inspect.
     * @returns {Array} Returns the new array of combined values.
     * @example
     *
     * _.union([1, 2], [4, 2], [2, 1]);
     * // => [1, 2, 4]
     */
    var union = restParam(function(arrays) {
      return baseUniq(baseFlatten(arrays, false, true));
    });

    /**
     * Creates a duplicate-free version of an array, using
     * [`SameValueZero`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-samevaluezero)
     * for equality comparisons, in which only the first occurence of each element
     * is kept. Providing `true` for `isSorted` performs a faster search algorithm
     * for sorted arrays. If an iteratee function is provided it is invoked for
     * each element in the array to generate the criterion by which uniqueness
     * is computed. The `iteratee` is bound to `thisArg` and invoked with three
     * arguments: (value, index, array).
     *
     * If a property name is provided for `iteratee` the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If a value is also provided for `thisArg` the created `_.matchesProperty`
     * style callback returns `true` for elements that have a matching property
     * value, else `false`.
     *
     * If an object is provided for `iteratee` the created `_.matches` style
     * callback returns `true` for elements that have the properties of the given
     * object, else `false`.
     *
     * @static
     * @memberOf _
     * @alias unique
     * @category Array
     * @param {Array} array The array to inspect.
     * @param {boolean} [isSorted] Specify the array is sorted.
     * @param {Function|Object|string} [iteratee] The function invoked per iteration.
     * @param {*} [thisArg] The `this` binding of `iteratee`.
     * @returns {Array} Returns the new duplicate-value-free array.
     * @example
     *
     * _.uniq([2, 1, 2]);
     * // => [2, 1]
     *
     * // using `isSorted`
     * _.uniq([1, 1, 2], true);
     * // => [1, 2]
     *
     * // using an iteratee function
     * _.uniq([1, 2.5, 1.5, 2], function(n) {
     *   return this.floor(n);
     * }, Math);
     * // => [1, 2.5]
     *
     * // using the `_.property` callback shorthand
     * _.uniq([{ 'x': 1 }, { 'x': 2 }, { 'x': 1 }], 'x');
     * // => [{ 'x': 1 }, { 'x': 2 }]
     */
    function uniq(array, isSorted, iteratee, thisArg) {
      var length = array ? array.length : 0;
      if (!length) {
        return [];
      }
      if (isSorted != null && typeof isSorted != 'boolean') {
        thisArg = iteratee;
        iteratee = isIterateeCall(array, isSorted, thisArg) ? null : isSorted;
        isSorted = false;
      }
      var callback = getCallback();
      if (!(iteratee == null && callback === baseCallback)) {
        iteratee = callback(iteratee, thisArg, 3);
      }
      return (isSorted && getIndexOf() == baseIndexOf)
        ? sortedUniq(array, iteratee)
        : baseUniq(array, iteratee);
    }

    /**
     * This method is like `_.zip` except that it accepts an array of grouped
     * elements and creates an array regrouping the elements to their pre-zip
     * configuration.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array of grouped elements to process.
     * @returns {Array} Returns the new array of regrouped elements.
     * @example
     *
     * var zipped = _.zip(['fred', 'barney'], [30, 40], [true, false]);
     * // => [['fred', 30, true], ['barney', 40, false]]
     *
     * _.unzip(zipped);
     * // => [['fred', 'barney'], [30, 40], [true, false]]
     */
    function unzip(array) {
      if (!(array && array.length)) {
        return [];
      }
      var index = -1,
          length = 0;

      array = arrayFilter(array, function(group) {
        if (isArrayLike(group)) {
          length = nativeMax(group.length, length);
          return true;
        }
      });
      var result = Array(length);
      while (++index < length) {
        result[index] = arrayMap(array, baseProperty(index));
      }
      return result;
    }

    /**
     * This method is like `_.unzip` except that it accepts an iteratee to specify
     * how regrouped values should be combined. The `iteratee` is bound to `thisArg`
     * and invoked with four arguments: (accumulator, value, index, group).
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array of grouped elements to process.
     * @param {Function} [iteratee] The function to combine regrouped values.
     * @param {*} [thisArg] The `this` binding of `iteratee`.
     * @returns {Array} Returns the new array of regrouped elements.
     * @example
     *
     * var zipped = _.zip([1, 2], [10, 20], [100, 200]);
     * // => [[1, 10, 100], [2, 20, 200]]
     *
     * _.unzipWith(zipped, _.add);
     * // => [3, 30, 300]
     */
    function unzipWith(array, iteratee, thisArg) {
      var length = array ? array.length : 0;
      if (!length) {
        return [];
      }
      var result = unzip(array);
      if (iteratee == null) {
        return result;
      }
      iteratee = bindCallback(iteratee, thisArg, 4);
      return arrayMap(result, function(group) {
        return arrayReduce(group, iteratee, undefined, true);
      });
    }

    /**
     * Creates an array excluding all provided values using
     * [`SameValueZero`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-samevaluezero)
     * for equality comparisons.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to filter.
     * @param {...*} [values] The values to exclude.
     * @returns {Array} Returns the new array of filtered values.
     * @example
     *
     * _.without([1, 2, 1, 3], 1, 2);
     * // => [3]
     */
    var without = restParam(function(array, values) {
      return isArrayLike(array)
        ? baseDifference(array, values)
        : [];
    });

    /**
     * Creates an array of unique values that is the [symmetric difference](https://en.wikipedia.org/wiki/Symmetric_difference)
     * of the provided arrays.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {...Array} [arrays] The arrays to inspect.
     * @returns {Array} Returns the new array of values.
     * @example
     *
     * _.xor([1, 2], [4, 2]);
     * // => [1, 4]
     */
    function xor() {
      var index = -1,
          length = arguments.length;

      while (++index < length) {
        var array = arguments[index];
        if (isArrayLike(array)) {
          var result = result
            ? baseDifference(result, array).concat(baseDifference(array, result))
            : array;
        }
      }
      return result ? baseUniq(result) : [];
    }

    /**
     * Creates an array of grouped elements, the first of which contains the first
     * elements of the given arrays, the second of which contains the second elements
     * of the given arrays, and so on.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {...Array} [arrays] The arrays to process.
     * @returns {Array} Returns the new array of grouped elements.
     * @example
     *
     * _.zip(['fred', 'barney'], [30, 40], [true, false]);
     * // => [['fred', 30, true], ['barney', 40, false]]
     */
    var zip = restParam(unzip);

    /**
     * The inverse of `_.pairs`; this method returns an object composed from arrays
     * of property names and values. Provide either a single two dimensional array,
     * e.g. `[[key1, value1], [key2, value2]]` or two arrays, one of property names
     * and one of corresponding values.
     *
     * @static
     * @memberOf _
     * @alias object
     * @category Array
     * @param {Array} props The property names.
     * @param {Array} [values=[]] The property values.
     * @returns {Object} Returns the new object.
     * @example
     *
     * _.zipObject([['fred', 30], ['barney', 40]]);
     * // => { 'fred': 30, 'barney': 40 }
     *
     * _.zipObject(['fred', 'barney'], [30, 40]);
     * // => { 'fred': 30, 'barney': 40 }
     */
    function zipObject(props, values) {
      var index = -1,
          length = props ? props.length : 0,
          result = {};

      if (length && !values && !isArray(props[0])) {
        values = [];
      }
      while (++index < length) {
        var key = props[index];
        if (values) {
          result[key] = values[index];
        } else if (key) {
          result[key[0]] = key[1];
        }
      }
      return result;
    }

    /**
     * This method is like `_.zip` except that it accepts an iteratee to specify
     * how grouped values should be combined. The `iteratee` is bound to `thisArg`
     * and invoked with four arguments: (accumulator, value, index, group).
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {...Array} [arrays] The arrays to process.
     * @param {Function} [iteratee] The function to combine grouped values.
     * @param {*} [thisArg] The `this` binding of `iteratee`.
     * @returns {Array} Returns the new array of grouped elements.
     * @example
     *
     * _.zipWith([1, 2], [10, 20], [100, 200], _.add);
     * // => [111, 222]
     */
    var zipWith = restParam(function(arrays) {
      var length = arrays.length,
          iteratee = length > 2 ? arrays[length - 2] : undefined,
          thisArg = length > 1 ? arrays[length - 1] : undefined;

      if (length > 2 && typeof iteratee == 'function') {
        length -= 2;
      } else {
        iteratee = (length > 1 && typeof thisArg == 'function') ? (--length, thisArg) : undefined;
        thisArg = undefined;
      }
      arrays.length = length;
      return unzipWith(arrays, iteratee, thisArg);
    });

    /*------------------------------------------------------------------------*/

    /**
     * Creates a `lodash` object that wraps `value` with explicit method
     * chaining enabled.
     *
     * @static
     * @memberOf _
     * @category Chain
     * @param {*} value The value to wrap.
     * @returns {Object} Returns the new `lodash` wrapper instance.
     * @example
     *
     * var users = [
     *   { 'user': 'barney',  'age': 36 },
     *   { 'user': 'fred',    'age': 40 },
     *   { 'user': 'pebbles', 'age': 1 }
     * ];
     *
     * var youngest = _.chain(users)
     *   .sortBy('age')
     *   .map(function(chr) {
     *     return chr.user + ' is ' + chr.age;
     *   })
     *   .first()
     *   .value();
     * // => 'pebbles is 1'
     */
    function chain(value) {
      var result = lodash(value);
      result.__chain__ = true;
      return result;
    }

    /**
     * This method invokes `interceptor` and returns `value`. The interceptor is
     * bound to `thisArg` and invoked with one argument; (value). The purpose of
     * this method is to "tap into" a method chain in order to perform operations
     * on intermediate results within the chain.
     *
     * @static
     * @memberOf _
     * @category Chain
     * @param {*} value The value to provide to `interceptor`.
     * @param {Function} interceptor The function to invoke.
     * @param {*} [thisArg] The `this` binding of `interceptor`.
     * @returns {*} Returns `value`.
     * @example
     *
     * _([1, 2, 3])
     *  .tap(function(array) {
     *    array.pop();
     *  })
     *  .reverse()
     *  .value();
     * // => [2, 1]
     */
    function tap(value, interceptor, thisArg) {
      interceptor.call(thisArg, value);
      return value;
    }

    /**
     * This method is like `_.tap` except that it returns the result of `interceptor`.
     *
     * @static
     * @memberOf _
     * @category Chain
     * @param {*} value The value to provide to `interceptor`.
     * @param {Function} interceptor The function to invoke.
     * @param {*} [thisArg] The `this` binding of `interceptor`.
     * @returns {*} Returns the result of `interceptor`.
     * @example
     *
     * _('  abc  ')
     *  .chain()
     *  .trim()
     *  .thru(function(value) {
     *    return [value];
     *  })
     *  .value();
     * // => ['abc']
     */
    function thru(value, interceptor, thisArg) {
      return interceptor.call(thisArg, value);
    }

    /**
     * Enables explicit method chaining on the wrapper object.
     *
     * @name chain
     * @memberOf _
     * @category Chain
     * @returns {Object} Returns the new `lodash` wrapper instance.
     * @example
     *
     * var users = [
     *   { 'user': 'barney', 'age': 36 },
     *   { 'user': 'fred',   'age': 40 }
     * ];
     *
     * // without explicit chaining
     * _(users).first();
     * // => { 'user': 'barney', 'age': 36 }
     *
     * // with explicit chaining
     * _(users).chain()
     *   .first()
     *   .pick('user')
     *   .value();
     * // => { 'user': 'barney' }
     */
    function wrapperChain() {
      return chain(this);
    }

    /**
     * Executes the chained sequence and returns the wrapped result.
     *
     * @name commit
     * @memberOf _
     * @category Chain
     * @returns {Object} Returns the new `lodash` wrapper instance.
     * @example
     *
     * var array = [1, 2];
     * var wrapper = _(array).push(3);
     *
     * console.log(array);
     * // => [1, 2]
     *
     * wrapper = wrapper.commit();
     * console.log(array);
     * // => [1, 2, 3]
     *
     * wrapper.last();
     * // => 3
     *
     * console.log(array);
     * // => [1, 2, 3]
     */
    function wrapperCommit() {
      return new LodashWrapper(this.value(), this.__chain__);
    }

    /**
     * Creates a clone of the chained sequence planting `value` as the wrapped value.
     *
     * @name plant
     * @memberOf _
     * @category Chain
     * @returns {Object} Returns the new `lodash` wrapper instance.
     * @example
     *
     * var array = [1, 2];
     * var wrapper = _(array).map(function(value) {
     *   return Math.pow(value, 2);
     * });
     *
     * var other = [3, 4];
     * var otherWrapper = wrapper.plant(other);
     *
     * otherWrapper.value();
     * // => [9, 16]
     *
     * wrapper.value();
     * // => [1, 4]
     */
    function wrapperPlant(value) {
      var result,
          parent = this;

      while (parent instanceof baseLodash) {
        var clone = wrapperClone(parent);
        if (result) {
          previous.__wrapped__ = clone;
        } else {
          result = clone;
        }
        var previous = clone;
        parent = parent.__wrapped__;
      }
      previous.__wrapped__ = value;
      return result;
    }

    /**
     * Reverses the wrapped array so the first element becomes the last, the
     * second element becomes the second to last, and so on.
     *
     * **Note:** This method mutates the wrapped array.
     *
     * @name reverse
     * @memberOf _
     * @category Chain
     * @returns {Object} Returns the new reversed `lodash` wrapper instance.
     * @example
     *
     * var array = [1, 2, 3];
     *
     * _(array).reverse().value()
     * // => [3, 2, 1]
     *
     * console.log(array);
     * // => [3, 2, 1]
     */
    function wrapperReverse() {
      var value = this.__wrapped__;
      if (value instanceof LazyWrapper) {
        if (this.__actions__.length) {
          value = new LazyWrapper(this);
        }
        return new LodashWrapper(value.reverse(), this.__chain__);
      }
      return this.thru(function(value) {
        return value.reverse();
      });
    }

    /**
     * Produces the result of coercing the unwrapped value to a string.
     *
     * @name toString
     * @memberOf _
     * @category Chain
     * @returns {string} Returns the coerced string value.
     * @example
     *
     * _([1, 2, 3]).toString();
     * // => '1,2,3'
     */
    function wrapperToString() {
      return (this.value() + '');
    }

    /**
     * Executes the chained sequence to extract the unwrapped value.
     *
     * @name value
     * @memberOf _
     * @alias run, toJSON, valueOf
     * @category Chain
     * @returns {*} Returns the resolved unwrapped value.
     * @example
     *
     * _([1, 2, 3]).value();
     * // => [1, 2, 3]
     */
    function wrapperValue() {
      return baseWrapperValue(this.__wrapped__, this.__actions__);
    }

    /*------------------------------------------------------------------------*/

    /**
     * Creates an array of elements corresponding to the given keys, or indexes,
     * of `collection`. Keys may be specified as individual arguments or as arrays
     * of keys.
     *
     * @static
     * @memberOf _
     * @category Collection
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {...(number|number[]|string|string[])} [props] The property names
     *  or indexes of elements to pick, specified individually or in arrays.
     * @returns {Array} Returns the new array of picked elements.
     * @example
     *
     * _.at(['a', 'b', 'c'], [0, 2]);
     * // => ['a', 'c']
     *
     * _.at(['barney', 'fred', 'pebbles'], 0, 2);
     * // => ['barney', 'pebbles']
     */
    var at = restParam(function(collection, props) {
      return baseAt(collection, baseFlatten(props));
    });

    /**
     * Creates an object composed of keys generated from the results of running
     * each element of `collection` through `iteratee`. The corresponding value
     * of each key is the number of times the key was returned by `iteratee`.
     * The `iteratee` is bound to `thisArg` and invoked with three arguments:
     * (value, index|key, collection).
     *
     * If a property name is provided for `iteratee` the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If a value is also provided for `thisArg` the created `_.matchesProperty`
     * style callback returns `true` for elements that have a matching property
     * value, else `false`.
     *
     * If an object is provided for `iteratee` the created `_.matches` style
     * callback returns `true` for elements that have the properties of the given
     * object, else `false`.
     *
     * @static
     * @memberOf _
     * @category Collection
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function|Object|string} [iteratee=_.identity] The function invoked
     *  per iteration.
     * @param {*} [thisArg] The `this` binding of `iteratee`.
     * @returns {Object} Returns the composed aggregate object.
     * @example
     *
     * _.countBy([4.3, 6.1, 6.4], function(n) {
     *   return Math.floor(n);
     * });
     * // => { '4': 1, '6': 2 }
     *
     * _.countBy([4.3, 6.1, 6.4], function(n) {
     *   return this.floor(n);
     * }, Math);
     * // => { '4': 1, '6': 2 }
     *
     * _.countBy(['one', 'two', 'three'], 'length');
     * // => { '3': 2, '5': 1 }
     */
    var countBy = createAggregator(function(result, value, key) {
      hasOwnProperty.call(result, key) ? ++result[key] : (result[key] = 1);
    });

    /**
     * Checks if `predicate` returns truthy for **all** elements of `collection`.
     * The predicate is bound to `thisArg` and invoked with three arguments:
     * (value, index|key, collection).
     *
     * If a property name is provided for `predicate` the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If a value is also provided for `thisArg` the created `_.matchesProperty`
     * style callback returns `true` for elements that have a matching property
     * value, else `false`.
     *
     * If an object is provided for `predicate` the created `_.matches` style
     * callback returns `true` for elements that have the properties of the given
     * object, else `false`.
     *
     * @static
     * @memberOf _
     * @alias all
     * @category Collection
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function|Object|string} [predicate=_.identity] The function invoked
     *  per iteration.
     * @param {*} [thisArg] The `this` binding of `predicate`.
     * @returns {boolean} Returns `true` if all elements pass the predicate check,
     *  else `false`.
     * @example
     *
     * _.every([true, 1, null, 'yes'], Boolean);
     * // => false
     *
     * var users = [
     *   { 'user': 'barney', 'active': false },
     *   { 'user': 'fred',   'active': false }
     * ];
     *
     * // using the `_.matches` callback shorthand
     * _.every(users, { 'user': 'barney', 'active': false });
     * // => false
     *
     * // using the `_.matchesProperty` callback shorthand
     * _.every(users, 'active', false);
     * // => true
     *
     * // using the `_.property` callback shorthand
     * _.every(users, 'active');
     * // => false
     */
    function every(collection, predicate, thisArg) {
      var func = isArray(collection) ? arrayEvery : baseEvery;
      if (thisArg && isIterateeCall(collection, predicate, thisArg)) {
        predicate = null;
      }
      if (typeof predicate != 'function' || thisArg !== undefined) {
        predicate = getCallback(predicate, thisArg, 3);
      }
      return func(collection, predicate);
    }

    /**
     * Iterates over elements of `collection`, returning an array of all elements
     * `predicate` returns truthy for. The predicate is bound to `thisArg` and
     * invoked with three arguments: (value, index|key, collection).
     *
     * If a property name is provided for `predicate` the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If a value is also provided for `thisArg` the created `_.matchesProperty`
     * style callback returns `true` for elements that have a matching property
     * value, else `false`.
     *
     * If an object is provided for `predicate` the created `_.matches` style
     * callback returns `true` for elements that have the properties of the given
     * object, else `false`.
     *
     * @static
     * @memberOf _
     * @alias select
     * @category Collection
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function|Object|string} [predicate=_.identity] The function invoked
     *  per iteration.
     * @param {*} [thisArg] The `this` binding of `predicate`.
     * @returns {Array} Returns the new filtered array.
     * @example
     *
     * _.filter([4, 5, 6], function(n) {
     *   return n % 2 == 0;
     * });
     * // => [4, 6]
     *
     * var users = [
     *   { 'user': 'barney', 'age': 36, 'active': true },
     *   { 'user': 'fred',   'age': 40, 'active': false }
     * ];
     *
     * // using the `_.matches` callback shorthand
     * _.pluck(_.filter(users, { 'age': 36, 'active': true }), 'user');
     * // => ['barney']
     *
     * // using the `_.matchesProperty` callback shorthand
     * _.pluck(_.filter(users, 'active', false), 'user');
     * // => ['fred']
     *
     * // using the `_.property` callback shorthand
     * _.pluck(_.filter(users, 'active'), 'user');
     * // => ['barney']
     */
    function filter(collection, predicate, thisArg) {
      var func = isArray(collection) ? arrayFilter : baseFilter;
      predicate = getCallback(predicate, thisArg, 3);
      return func(collection, predicate);
    }

    /**
     * Iterates over elements of `collection`, returning the first element
     * `predicate` returns truthy for. The predicate is bound to `thisArg` and
     * invoked with three arguments: (value, index|key, collection).
     *
     * If a property name is provided for `predicate` the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If a value is also provided for `thisArg` the created `_.matchesProperty`
     * style callback returns `true` for elements that have a matching property
     * value, else `false`.
     *
     * If an object is provided for `predicate` the created `_.matches` style
     * callback returns `true` for elements that have the properties of the given
     * object, else `false`.
     *
     * @static
     * @memberOf _
     * @alias detect
     * @category Collection
     * @param {Array|Object|string} collection The collection to search.
     * @param {Function|Object|string} [predicate=_.identity] The function invoked
     *  per iteration.
     * @param {*} [thisArg] The `this` binding of `predicate`.
     * @returns {*} Returns the matched element, else `undefined`.
     * @example
     *
     * var users = [
     *   { 'user': 'barney',  'age': 36, 'active': true },
     *   { 'user': 'fred',    'age': 40, 'active': false },
     *   { 'user': 'pebbles', 'age': 1,  'active': true }
     * ];
     *
     * _.result(_.find(users, function(chr) {
     *   return chr.age < 40;
     * }), 'user');
     * // => 'barney'
     *
     * // using the `_.matches` callback shorthand
     * _.result(_.find(users, { 'age': 1, 'active': true }), 'user');
     * // => 'pebbles'
     *
     * // using the `_.matchesProperty` callback shorthand
     * _.result(_.find(users, 'active', false), 'user');
     * // => 'fred'
     *
     * // using the `_.property` callback shorthand
     * _.result(_.find(users, 'active'), 'user');
     * // => 'barney'
     */
    var find = createFind(baseEach);

    /**
     * This method is like `_.find` except that it iterates over elements of
     * `collection` from right to left.
     *
     * @static
     * @memberOf _
     * @category Collection
     * @param {Array|Object|string} collection The collection to search.
     * @param {Function|Object|string} [predicate=_.identity] The function invoked
     *  per iteration.
     * @param {*} [thisArg] The `this` binding of `predicate`.
     * @returns {*} Returns the matched element, else `undefined`.
     * @example
     *
     * _.findLast([1, 2, 3, 4], function(n) {
     *   return n % 2 == 1;
     * });
     * // => 3
     */
    var findLast = createFind(baseEachRight, true);

    /**
     * Performs a deep comparison between each element in `collection` and the
     * source object, returning the first element that has equivalent property
     * values.
     *
     * **Note:** This method supports comparing arrays, booleans, `Date` objects,
     * numbers, `Object` objects, regexes, and strings. Objects are compared by
     * their own, not inherited, enumerable properties. For comparing a single
     * own or inherited property value see `_.matchesProperty`.
     *
     * @static
     * @memberOf _
     * @category Collection
     * @param {Array|Object|string} collection The collection to search.
     * @param {Object} source The object of property values to match.
     * @returns {*} Returns the matched element, else `undefined`.
     * @example
     *
     * var users = [
     *   { 'user': 'barney', 'age': 36, 'active': true },
     *   { 'user': 'fred',   'age': 40, 'active': false }
     * ];
     *
     * _.result(_.findWhere(users, { 'age': 36, 'active': true }), 'user');
     * // => 'barney'
     *
     * _.result(_.findWhere(users, { 'age': 40, 'active': false }), 'user');
     * // => 'fred'
     */
    function findWhere(collection, source) {
      return find(collection, baseMatches(source));
    }

    /**
     * Iterates over elements of `collection` invoking `iteratee` for each element.
     * The `iteratee` is bound to `thisArg` and invoked with three arguments:
     * (value, index|key, collection). Iteratee functions may exit iteration early
     * by explicitly returning `false`.
     *
     * **Note:** As with other "Collections" methods, objects with a "length" property
     * are iterated like arrays. To avoid this behavior `_.forIn` or `_.forOwn`
     * may be used for object iteration.
     *
     * @static
     * @memberOf _
     * @alias each
     * @category Collection
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @param {*} [thisArg] The `this` binding of `iteratee`.
     * @returns {Array|Object|string} Returns `collection`.
     * @example
     *
     * _([1, 2]).forEach(function(n) {
     *   console.log(n);
     * }).value();
     * // => logs each value from left to right and returns the array
     *
     * _.forEach({ 'a': 1, 'b': 2 }, function(n, key) {
     *   console.log(n, key);
     * });
     * // => logs each value-key pair and returns the object (iteration order is not guaranteed)
     */
    var forEach = createForEach(arrayEach, baseEach);

    /**
     * This method is like `_.forEach` except that it iterates over elements of
     * `collection` from right to left.
     *
     * @static
     * @memberOf _
     * @alias eachRight
     * @category Collection
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @param {*} [thisArg] The `this` binding of `iteratee`.
     * @returns {Array|Object|string} Returns `collection`.
     * @example
     *
     * _([1, 2]).forEachRight(function(n) {
     *   console.log(n);
     * }).value();
     * // => logs each value from right to left and returns the array
     */
    var forEachRight = createForEach(arrayEachRight, baseEachRight);

    /**
     * Creates an object composed of keys generated from the results of running
     * each element of `collection` through `iteratee`. The corresponding value
     * of each key is an array of the elements responsible for generating the key.
     * The `iteratee` is bound to `thisArg` and invoked with three arguments:
     * (value, index|key, collection).
     *
     * If a property name is provided for `iteratee` the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If a value is also provided for `thisArg` the created `_.matchesProperty`
     * style callback returns `true` for elements that have a matching property
     * value, else `false`.
     *
     * If an object is provided for `iteratee` the created `_.matches` style
     * callback returns `true` for elements that have the properties of the given
     * object, else `false`.
     *
     * @static
     * @memberOf _
     * @category Collection
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function|Object|string} [iteratee=_.identity] The function invoked
     *  per iteration.
     * @param {*} [thisArg] The `this` binding of `iteratee`.
     * @returns {Object} Returns the composed aggregate object.
     * @example
     *
     * _.groupBy([4.2, 6.1, 6.4], function(n) {
     *   return Math.floor(n);
     * });
     * // => { '4': [4.2], '6': [6.1, 6.4] }
     *
     * _.groupBy([4.2, 6.1, 6.4], function(n) {
     *   return this.floor(n);
     * }, Math);
     * // => { '4': [4.2], '6': [6.1, 6.4] }
     *
     * // using the `_.property` callback shorthand
     * _.groupBy(['one', 'two', 'three'], 'length');
     * // => { '3': ['one', 'two'], '5': ['three'] }
     */
    var groupBy = createAggregator(function(result, value, key) {
      if (hasOwnProperty.call(result, key)) {
        result[key].push(value);
      } else {
        result[key] = [value];
      }
    });

    /**
     * Checks if `value` is in `collection` using
     * [`SameValueZero`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-samevaluezero)
     * for equality comparisons. If `fromIndex` is negative, it is used as the offset
     * from the end of `collection`.
     *
     * @static
     * @memberOf _
     * @alias contains, include
     * @category Collection
     * @param {Array|Object|string} collection The collection to search.
     * @param {*} target The value to search for.
     * @param {number} [fromIndex=0] The index to search from.
     * @param- {Object} [guard] Enables use as a callback for functions like `_.reduce`.
     * @returns {boolean} Returns `true` if a matching element is found, else `false`.
     * @example
     *
     * _.includes([1, 2, 3], 1);
     * // => true
     *
     * _.includes([1, 2, 3], 1, 2);
     * // => false
     *
     * _.includes({ 'user': 'fred', 'age': 40 }, 'fred');
     * // => true
     *
     * _.includes('pebbles', 'eb');
     * // => true
     */
    function includes(collection, target, fromIndex, guard) {
      var length = collection ? getLength(collection) : 0;
      if (!isLength(length)) {
        collection = values(collection);
        length = collection.length;
      }
      if (!length) {
        return false;
      }
      if (typeof fromIndex != 'number' || (guard && isIterateeCall(target, fromIndex, guard))) {
        fromIndex = 0;
      } else {
        fromIndex = fromIndex < 0 ? nativeMax(length + fromIndex, 0) : (fromIndex || 0);
      }
      return (typeof collection == 'string' || !isArray(collection) && isString(collection))
        ? (fromIndex < length && collection.indexOf(target, fromIndex) > -1)
        : (getIndexOf(collection, target, fromIndex) > -1);
    }

    /**
     * Creates an object composed of keys generated from the results of running
     * each element of `collection` through `iteratee`. The corresponding value
     * of each key is the last element responsible for generating the key. The
     * iteratee function is bound to `thisArg` and invoked with three arguments:
     * (value, index|key, collection).
     *
     * If a property name is provided for `iteratee` the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If a value is also provided for `thisArg` the created `_.matchesProperty`
     * style callback returns `true` for elements that have a matching property
     * value, else `false`.
     *
     * If an object is provided for `iteratee` the created `_.matches` style
     * callback returns `true` for elements that have the properties of the given
     * object, else `false`.
     *
     * @static
     * @memberOf _
     * @category Collection
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function|Object|string} [iteratee=_.identity] The function invoked
     *  per iteration.
     * @param {*} [thisArg] The `this` binding of `iteratee`.
     * @returns {Object} Returns the composed aggregate object.
     * @example
     *
     * var keyData = [
     *   { 'dir': 'left', 'code': 97 },
     *   { 'dir': 'right', 'code': 100 }
     * ];
     *
     * _.indexBy(keyData, 'dir');
     * // => { 'left': { 'dir': 'left', 'code': 97 }, 'right': { 'dir': 'right', 'code': 100 } }
     *
     * _.indexBy(keyData, function(object) {
     *   return String.fromCharCode(object.code);
     * });
     * // => { 'a': { 'dir': 'left', 'code': 97 }, 'd': { 'dir': 'right', 'code': 100 } }
     *
     * _.indexBy(keyData, function(object) {
     *   return this.fromCharCode(object.code);
     * }, String);
     * // => { 'a': { 'dir': 'left', 'code': 97 }, 'd': { 'dir': 'right', 'code': 100 } }
     */
    var indexBy = createAggregator(function(result, value, key) {
      result[key] = value;
    });

    /**
     * Invokes the method at `path` of each element in `collection`, returning
     * an array of the results of each invoked method. Any additional arguments
     * are provided to each invoked method. If `methodName` is a function it is
     * invoked for, and `this` bound to, each element in `collection`.
     *
     * @static
     * @memberOf _
     * @category Collection
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Array|Function|string} path The path of the method to invoke or
     *  the function invoked per iteration.
     * @param {...*} [args] The arguments to invoke the method with.
     * @returns {Array} Returns the array of results.
     * @example
     *
     * _.invoke([[5, 1, 7], [3, 2, 1]], 'sort');
     * // => [[1, 5, 7], [1, 2, 3]]
     *
     * _.invoke([123, 456], String.prototype.split, '');
     * // => [['1', '2', '3'], ['4', '5', '6']]
     */
    var invoke = restParam(function(collection, path, args) {
      var index = -1,
          isFunc = typeof path == 'function',
          isProp = isKey(path),
          result = isArrayLike(collection) ? Array(collection.length) : [];

      baseEach(collection, function(value) {
        var func = isFunc ? path : ((isProp && value != null) ? value[path] : null);
        result[++index] = func ? func.apply(value, args) : invokePath(value, path, args);
      });
      return result;
    });

    /**
     * Creates an array of values by running each element in `collection` through
     * `iteratee`. The `iteratee` is bound to `thisArg` and invoked with three
     * arguments: (value, index|key, collection).
     *
     * If a property name is provided for `iteratee` the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If a value is also provided for `thisArg` the created `_.matchesProperty`
     * style callback returns `true` for elements that have a matching property
     * value, else `false`.
     *
     * If an object is provided for `iteratee` the created `_.matches` style
     * callback returns `true` for elements that have the properties of the given
     * object, else `false`.
     *
     * Many lodash methods are guarded to work as iteratees for methods like
     * `_.every`, `_.filter`, `_.map`, `_.mapValues`, `_.reject`, and `_.some`.
     *
     * The guarded methods are:
     * `ary`, `callback`, `chunk`, `clone`, `create`, `curry`, `curryRight`,
     * `drop`, `dropRight`, `every`, `fill`, `flatten`, `invert`, `max`, `min`,
     * `parseInt`, `slice`, `sortBy`, `take`, `takeRight`, `template`, `trim`,
     * `trimLeft`, `trimRight`, `trunc`, `random`, `range`, `sample`, `some`,
     * `sum`, `uniq`, and `words`
     *
     * @static
     * @memberOf _
     * @alias collect
     * @category Collection
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function|Object|string} [iteratee=_.identity] The function invoked
     *  per iteration.
     * @param {*} [thisArg] The `this` binding of `iteratee`.
     * @returns {Array} Returns the new mapped array.
     * @example
     *
     * function timesThree(n) {
     *   return n * 3;
     * }
     *
     * _.map([1, 2], timesThree);
     * // => [3, 6]
     *
     * _.map({ 'a': 1, 'b': 2 }, timesThree);
     * // => [3, 6] (iteration order is not guaranteed)
     *
     * var users = [
     *   { 'user': 'barney' },
     *   { 'user': 'fred' }
     * ];
     *
     * // using the `_.property` callback shorthand
     * _.map(users, 'user');
     * // => ['barney', 'fred']
     */
    function map(collection, iteratee, thisArg) {
      var func = isArray(collection) ? arrayMap : baseMap;
      iteratee = getCallback(iteratee, thisArg, 3);
      return func(collection, iteratee);
    }

    /**
     * Creates an array of elements split into two groups, the first of which
     * contains elements `predicate` returns truthy for, while the second of which
     * contains elements `predicate` returns falsey for. The predicate is bound
     * to `thisArg` and invoked with three arguments: (value, index|key, collection).
     *
     * If a property name is provided for `predicate` the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If a value is also provided for `thisArg` the created `_.matchesProperty`
     * style callback returns `true` for elements that have a matching property
     * value, else `false`.
     *
     * If an object is provided for `predicate` the created `_.matches` style
     * callback returns `true` for elements that have the properties of the given
     * object, else `false`.
     *
     * @static
     * @memberOf _
     * @category Collection
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function|Object|string} [predicate=_.identity] The function invoked
     *  per iteration.
     * @param {*} [thisArg] The `this` binding of `predicate`.
     * @returns {Array} Returns the array of grouped elements.
     * @example
     *
     * _.partition([1, 2, 3], function(n) {
     *   return n % 2;
     * });
     * // => [[1, 3], [2]]
     *
     * _.partition([1.2, 2.3, 3.4], function(n) {
     *   return this.floor(n) % 2;
     * }, Math);
     * // => [[1.2, 3.4], [2.3]]
     *
     * var users = [
     *   { 'user': 'barney',  'age': 36, 'active': false },
     *   { 'user': 'fred',    'age': 40, 'active': true },
     *   { 'user': 'pebbles', 'age': 1,  'active': false }
     * ];
     *
     * var mapper = function(array) {
     *   return _.pluck(array, 'user');
     * };
     *
     * // using the `_.matches` callback shorthand
     * _.map(_.partition(users, { 'age': 1, 'active': false }), mapper);
     * // => [['pebbles'], ['barney', 'fred']]
     *
     * // using the `_.matchesProperty` callback shorthand
     * _.map(_.partition(users, 'active', false), mapper);
     * // => [['barney', 'pebbles'], ['fred']]
     *
     * // using the `_.property` callback shorthand
     * _.map(_.partition(users, 'active'), mapper);
     * // => [['fred'], ['barney', 'pebbles']]
     */
    var partition = createAggregator(function(result, value, key) {
      result[key ? 0 : 1].push(value);
    }, function() { return [[], []]; });

    /**
     * Gets the property value of `path` from all elements in `collection`.
     *
     * @static
     * @memberOf _
     * @category Collection
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Array|string} path The path of the property to pluck.
     * @returns {Array} Returns the property values.
     * @example
     *
     * var users = [
     *   { 'user': 'barney', 'age': 36 },
     *   { 'user': 'fred',   'age': 40 }
     * ];
     *
     * _.pluck(users, 'user');
     * // => ['barney', 'fred']
     *
     * var userIndex = _.indexBy(users, 'user');
     * _.pluck(userIndex, 'age');
     * // => [36, 40] (iteration order is not guaranteed)
     */
    function pluck(collection, path) {
      return map(collection, property(path));
    }

    /**
     * Reduces `collection` to a value which is the accumulated result of running
     * each element in `collection` through `iteratee`, where each successive
     * invocation is supplied the return value of the previous. If `accumulator`
     * is not provided the first element of `collection` is used as the initial
     * value. The `iteratee` is bound to `thisArg` and invoked with four arguments:
     * (accumulator, value, index|key, collection).
     *
     * Many lodash methods are guarded to work as iteratees for methods like
     * `_.reduce`, `_.reduceRight`, and `_.transform`.
     *
     * The guarded methods are:
     * `assign`, `defaults`, `includes`, `merge`, `sortByAll`, and `sortByOrder`
     *
     * @static
     * @memberOf _
     * @alias foldl, inject
     * @category Collection
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @param {*} [accumulator] The initial value.
     * @param {*} [thisArg] The `this` binding of `iteratee`.
     * @returns {*} Returns the accumulated value.
     * @example
     *
     * _.reduce([1, 2], function(total, n) {
     *   return total + n;
     * });
     * // => 3
     *
     * _.reduce({ 'a': 1, 'b': 2 }, function(result, n, key) {
     *   result[key] = n * 3;
     *   return result;
     * }, {});
     * // => { 'a': 3, 'b': 6 } (iteration order is not guaranteed)
     */
    var reduce = createReduce(arrayReduce, baseEach);

    /**
     * This method is like `_.reduce` except that it iterates over elements of
     * `collection` from right to left.
     *
     * @static
     * @memberOf _
     * @alias foldr
     * @category Collection
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @param {*} [accumulator] The initial value.
     * @param {*} [thisArg] The `this` binding of `iteratee`.
     * @returns {*} Returns the accumulated value.
     * @example
     *
     * var array = [[0, 1], [2, 3], [4, 5]];
     *
     * _.reduceRight(array, function(flattened, other) {
     *   return flattened.concat(other);
     * }, []);
     * // => [4, 5, 2, 3, 0, 1]
     */
    var reduceRight = createReduce(arrayReduceRight, baseEachRight);

    /**
     * The opposite of `_.filter`; this method returns the elements of `collection`
     * that `predicate` does **not** return truthy for.
     *
     * @static
     * @memberOf _
     * @category Collection
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function|Object|string} [predicate=_.identity] The function invoked
     *  per iteration.
     * @param {*} [thisArg] The `this` binding of `predicate`.
     * @returns {Array} Returns the new filtered array.
     * @example
     *
     * _.reject([1, 2, 3, 4], function(n) {
     *   return n % 2 == 0;
     * });
     * // => [1, 3]
     *
     * var users = [
     *   { 'user': 'barney', 'age': 36, 'active': false },
     *   { 'user': 'fred',   'age': 40, 'active': true }
     * ];
     *
     * // using the `_.matches` callback shorthand
     * _.pluck(_.reject(users, { 'age': 40, 'active': true }), 'user');
     * // => ['barney']
     *
     * // using the `_.matchesProperty` callback shorthand
     * _.pluck(_.reject(users, 'active', false), 'user');
     * // => ['fred']
     *
     * // using the `_.property` callback shorthand
     * _.pluck(_.reject(users, 'active'), 'user');
     * // => ['barney']
     */
    function reject(collection, predicate, thisArg) {
      var func = isArray(collection) ? arrayFilter : baseFilter;
      predicate = getCallback(predicate, thisArg, 3);
      return func(collection, function(value, index, collection) {
        return !predicate(value, index, collection);
      });
    }

    /**
     * Gets a random element or `n` random elements from a collection.
     *
     * @static
     * @memberOf _
     * @category Collection
     * @param {Array|Object|string} collection The collection to sample.
     * @param {number} [n] The number of elements to sample.
     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
     * @returns {*} Returns the random sample(s).
     * @example
     *
     * _.sample([1, 2, 3, 4]);
     * // => 2
     *
     * _.sample([1, 2, 3, 4], 2);
     * // => [3, 1]
     */
    function sample(collection, n, guard) {
      if (guard ? isIterateeCall(collection, n, guard) : n == null) {
        collection = toIterable(collection);
        var length = collection.length;
        return length > 0 ? collection[baseRandom(0, length - 1)] : undefined;
      }
      var index = -1,
          result = toArray(collection),
          length = result.length,
          lastIndex = length - 1;

      n = nativeMin(n < 0 ? 0 : (+n || 0), length);
      while (++index < n) {
        var rand = baseRandom(index, lastIndex),
            value = result[rand];

        result[rand] = result[index];
        result[index] = value;
      }
      result.length = n;
      return result;
    }

    /**
     * Creates an array of shuffled values, using a version of the
     * [Fisher-Yates shuffle](https://en.wikipedia.org/wiki/Fisher-Yates_shuffle).
     *
     * @static
     * @memberOf _
     * @category Collection
     * @param {Array|Object|string} collection The collection to shuffle.
     * @returns {Array} Returns the new shuffled array.
     * @example
     *
     * _.shuffle([1, 2, 3, 4]);
     * // => [4, 1, 3, 2]
     */
    function shuffle(collection) {
      return sample(collection, POSITIVE_INFINITY);
    }

    /**
     * Gets the size of `collection` by returning its length for array-like
     * values or the number of own enumerable properties for objects.
     *
     * @static
     * @memberOf _
     * @category Collection
     * @param {Array|Object|string} collection The collection to inspect.
     * @returns {number} Returns the size of `collection`.
     * @example
     *
     * _.size([1, 2, 3]);
     * // => 3
     *
     * _.size({ 'a': 1, 'b': 2 });
     * // => 2
     *
     * _.size('pebbles');
     * // => 7
     */
    function size(collection) {
      var length = collection ? getLength(collection) : 0;
      return isLength(length) ? length : keys(collection).length;
    }

    /**
     * Checks if `predicate` returns truthy for **any** element of `collection`.
     * The function returns as soon as it finds a passing value and does not iterate
     * over the entire collection. The predicate is bound to `thisArg` and invoked
     * with three arguments: (value, index|key, collection).
     *
     * If a property name is provided for `predicate` the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If a value is also provided for `thisArg` the created `_.matchesProperty`
     * style callback returns `true` for elements that have a matching property
     * value, else `false`.
     *
     * If an object is provided for `predicate` the created `_.matches` style
     * callback returns `true` for elements that have the properties of the given
     * object, else `false`.
     *
     * @static
     * @memberOf _
     * @alias any
     * @category Collection
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function|Object|string} [predicate=_.identity] The function invoked
     *  per iteration.
     * @param {*} [thisArg] The `this` binding of `predicate`.
     * @returns {boolean} Returns `true` if any element passes the predicate check,
     *  else `false`.
     * @example
     *
     * _.some([null, 0, 'yes', false], Boolean);
     * // => true
     *
     * var users = [
     *   { 'user': 'barney', 'active': true },
     *   { 'user': 'fred',   'active': false }
     * ];
     *
     * // using the `_.matches` callback shorthand
     * _.some(users, { 'user': 'barney', 'active': false });
     * // => false
     *
     * // using the `_.matchesProperty` callback shorthand
     * _.some(users, 'active', false);
     * // => true
     *
     * // using the `_.property` callback shorthand
     * _.some(users, 'active');
     * // => true
     */
    function some(collection, predicate, thisArg) {
      var func = isArray(collection) ? arraySome : baseSome;
      if (thisArg && isIterateeCall(collection, predicate, thisArg)) {
        predicate = null;
      }
      if (typeof predicate != 'function' || thisArg !== undefined) {
        predicate = getCallback(predicate, thisArg, 3);
      }
      return func(collection, predicate);
    }

    /**
     * Creates an array of elements, sorted in ascending order by the results of
     * running each element in a collection through `iteratee`. This method performs
     * a stable sort, that is, it preserves the original sort order of equal elements.
     * The `iteratee` is bound to `thisArg` and invoked with three arguments:
     * (value, index|key, collection).
     *
     * If a property name is provided for `iteratee` the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If a value is also provided for `thisArg` the created `_.matchesProperty`
     * style callback returns `true` for elements that have a matching property
     * value, else `false`.
     *
     * If an object is provided for `iteratee` the created `_.matches` style
     * callback returns `true` for elements that have the properties of the given
     * object, else `false`.
     *
     * @static
     * @memberOf _
     * @category Collection
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function|Object|string} [iteratee=_.identity] The function invoked
     *  per iteration.
     * @param {*} [thisArg] The `this` binding of `iteratee`.
     * @returns {Array} Returns the new sorted array.
     * @example
     *
     * _.sortBy([1, 2, 3], function(n) {
     *   return Math.sin(n);
     * });
     * // => [3, 1, 2]
     *
     * _.sortBy([1, 2, 3], function(n) {
     *   return this.sin(n);
     * }, Math);
     * // => [3, 1, 2]
     *
     * var users = [
     *   { 'user': 'fred' },
     *   { 'user': 'pebbles' },
     *   { 'user': 'barney' }
     * ];
     *
     * // using the `_.property` callback shorthand
     * _.pluck(_.sortBy(users, 'user'), 'user');
     * // => ['barney', 'fred', 'pebbles']
     */
    function sortBy(collection, iteratee, thisArg) {
      if (collection == null) {
        return [];
      }
      if (thisArg && isIterateeCall(collection, iteratee, thisArg)) {
        iteratee = null;
      }
      var index = -1;
      iteratee = getCallback(iteratee, thisArg, 3);

      var result = baseMap(collection, function(value, key, collection) {
        return { 'criteria': iteratee(value, key, collection), 'index': ++index, 'value': value };
      });
      return baseSortBy(result, compareAscending);
    }

    /**
     * This method is like `_.sortBy` except that it can sort by multiple iteratees
     * or property names.
     *
     * If a property name is provided for an iteratee the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If an object is provided for an iteratee the created `_.matches` style
     * callback returns `true` for elements that have the properties of the given
     * object, else `false`.
     *
     * @static
     * @memberOf _
     * @category Collection
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {...(Function|Function[]|Object|Object[]|string|string[])} iteratees
     *  The iteratees to sort by, specified as individual values or arrays of values.
     * @returns {Array} Returns the new sorted array.
     * @example
     *
     * var users = [
     *   { 'user': 'fred',   'age': 48 },
     *   { 'user': 'barney', 'age': 36 },
     *   { 'user': 'fred',   'age': 42 },
     *   { 'user': 'barney', 'age': 34 }
     * ];
     *
     * _.map(_.sortByAll(users, ['user', 'age']), _.values);
     * // => [['barney', 34], ['barney', 36], ['fred', 42], ['fred', 48]]
     *
     * _.map(_.sortByAll(users, 'user', function(chr) {
     *   return Math.floor(chr.age / 10);
     * }), _.values);
     * // => [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 42]]
     */
    var sortByAll = restParam(function(collection, iteratees) {
      if (collection == null) {
        return [];
      }
      var guard = iteratees[2];
      if (guard && isIterateeCall(iteratees[0], iteratees[1], guard)) {
        iteratees.length = 1;
      }
      return baseSortByOrder(collection, baseFlatten(iteratees), []);
    });

    /**
     * This method is like `_.sortByAll` except that it allows specifying the
     * sort orders of the iteratees to sort by. A truthy value in `orders` will
     * sort the corresponding property name in ascending order while a falsey
     * value will sort it in descending order.
     *
     * If a property name is provided for an iteratee the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If an object is provided for an iteratee the created `_.matches` style
     * callback returns `true` for elements that have the properties of the given
     * object, else `false`.
     *
     * @static
     * @memberOf _
     * @category Collection
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function[]|Object[]|string[]} iteratees The iteratees to sort by.
     * @param {boolean[]} orders The sort orders of `iteratees`.
     * @param- {Object} [guard] Enables use as a callback for functions like `_.reduce`.
     * @returns {Array} Returns the new sorted array.
     * @example
     *
     * var users = [
     *   { 'user': 'fred',   'age': 48 },
     *   { 'user': 'barney', 'age': 34 },
     *   { 'user': 'fred',   'age': 42 },
     *   { 'user': 'barney', 'age': 36 }
     * ];
     *
     * // sort by `user` in ascending order and by `age` in descending order
     * _.map(_.sortByOrder(users, ['user', 'age'], [true, false]), _.values);
     * // => [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 42]]
     */
    function sortByOrder(collection, iteratees, orders, guard) {
      if (collection == null) {
        return [];
      }
      if (guard && isIterateeCall(iteratees, orders, guard)) {
        orders = null;
      }
      if (!isArray(iteratees)) {
        iteratees = iteratees == null ? [] : [iteratees];
      }
      if (!isArray(orders)) {
        orders = orders == null ? [] : [orders];
      }
      return baseSortByOrder(collection, iteratees, orders);
    }

    /**
     * Performs a deep comparison between each element in `collection` and the
     * source object, returning an array of all elements that have equivalent
     * property values.
     *
     * **Note:** This method supports comparing arrays, booleans, `Date` objects,
     * numbers, `Object` objects, regexes, and strings. Objects are compared by
     * their own, not inherited, enumerable properties. For comparing a single
     * own or inherited property value see `_.matchesProperty`.
     *
     * @static
     * @memberOf _
     * @category Collection
     * @param {Array|Object|string} collection The collection to search.
     * @param {Object} source The object of property values to match.
     * @returns {Array} Returns the new filtered array.
     * @example
     *
     * var users = [
     *   { 'user': 'barney', 'age': 36, 'active': false, 'pets': ['hoppy'] },
     *   { 'user': 'fred',   'age': 40, 'active': true, 'pets': ['baby puss', 'dino'] }
     * ];
     *
     * _.pluck(_.where(users, { 'age': 36, 'active': false }), 'user');
     * // => ['barney']
     *
     * _.pluck(_.where(users, { 'pets': ['dino'] }), 'user');
     * // => ['fred']
     */
    function where(collection, source) {
      return filter(collection, baseMatches(source));
    }

    /*------------------------------------------------------------------------*/

    /**
     * Gets the number of milliseconds that have elapsed since the Unix epoch
     * (1 January 1970 00:00:00 UTC).
     *
     * @static
     * @memberOf _
     * @category Date
     * @example
     *
     * _.defer(function(stamp) {
     *   console.log(_.now() - stamp);
     * }, _.now());
     * // => logs the number of milliseconds it took for the deferred function to be invoked
     */
    var now = nativeNow || function() {
      return new Date().getTime();
    };

    /*------------------------------------------------------------------------*/

    /**
     * The opposite of `_.before`; this method creates a function that invokes
     * `func` once it is called `n` or more times.
     *
     * @static
     * @memberOf _
     * @category Function
     * @param {number} n The number of calls before `func` is invoked.
     * @param {Function} func The function to restrict.
     * @returns {Function} Returns the new restricted function.
     * @example
     *
     * var saves = ['profile', 'settings'];
     *
     * var done = _.after(saves.length, function() {
     *   console.log('done saving!');
     * });
     *
     * _.forEach(saves, function(type) {
     *   asyncSave({ 'type': type, 'complete': done });
     * });
     * // => logs 'done saving!' after the two async saves have completed
     */
    function after(n, func) {
      if (typeof func != 'function') {
        if (typeof n == 'function') {
          var temp = n;
          n = func;
          func = temp;
        } else {
          throw new TypeError(FUNC_ERROR_TEXT);
        }
      }
      n = nativeIsFinite(n = +n) ? n : 0;
      return function() {
        if (--n < 1) {
          return func.apply(this, arguments);
        }
      };
    }

    /**
     * Creates a function that accepts up to `n` arguments ignoring any
     * additional arguments.
     *
     * @static
     * @memberOf _
     * @category Function
     * @param {Function} func The function to cap arguments for.
     * @param {number} [n=func.length] The arity cap.
     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
     * @returns {Function} Returns the new function.
     * @example
     *
     * _.map(['6', '8', '10'], _.ary(parseInt, 1));
     * // => [6, 8, 10]
     */
    function ary(func, n, guard) {
      if (guard && isIterateeCall(func, n, guard)) {
        n = null;
      }
      n = (func && n == null) ? func.length : nativeMax(+n || 0, 0);
      return createWrapper(func, ARY_FLAG, null, null, null, null, n);
    }

    /**
     * Creates a function that invokes `func`, with the `this` binding and arguments
     * of the created function, while it is called less than `n` times. Subsequent
     * calls to the created function return the result of the last `func` invocation.
     *
     * @static
     * @memberOf _
     * @category Function
     * @param {number} n The number of calls at which `func` is no longer invoked.
     * @param {Function} func The function to restrict.
     * @returns {Function} Returns the new restricted function.
     * @example
     *
     * jQuery('#add').on('click', _.before(5, addContactToList));
     * // => allows adding up to 4 contacts to the list
     */
    function before(n, func) {
      var result;
      if (typeof func != 'function') {
        if (typeof n == 'function') {
          var temp = n;
          n = func;
          func = temp;
        } else {
          throw new TypeError(FUNC_ERROR_TEXT);
        }
      }
      return function() {
        if (--n > 0) {
          result = func.apply(this, arguments);
        }
        if (n <= 1) {
          func = null;
        }
        return result;
      };
    }

    /**
     * Creates a function that invokes `func` with the `this` binding of `thisArg`
     * and prepends any additional `_.bind` arguments to those provided to the
     * bound function.
     *
     * The `_.bind.placeholder` value, which defaults to `_` in monolithic builds,
     * may be used as a placeholder for partially applied arguments.
     *
     * **Note:** Unlike native `Function#bind` this method does not set the "length"
     * property of bound functions.
     *
     * @static
     * @memberOf _
     * @category Function
     * @param {Function} func The function to bind.
     * @param {*} thisArg The `this` binding of `func`.
     * @param {...*} [partials] The arguments to be partially applied.
     * @returns {Function} Returns the new bound function.
     * @example
     *
     * var greet = function(greeting, punctuation) {
     *   return greeting + ' ' + this.user + punctuation;
     * };
     *
     * var object = { 'user': 'fred' };
     *
     * var bound = _.bind(greet, object, 'hi');
     * bound('!');
     * // => 'hi fred!'
     *
     * // using placeholders
     * var bound = _.bind(greet, object, _, '!');
     * bound('hi');
     * // => 'hi fred!'
     */
    var bind = restParam(function(func, thisArg, partials) {
      var bitmask = BIND_FLAG;
      if (partials.length) {
        var holders = replaceHolders(partials, bind.placeholder);
        bitmask |= PARTIAL_FLAG;
      }
      return createWrapper(func, bitmask, thisArg, partials, holders);
    });

    /**
     * Binds methods of an object to the object itself, overwriting the existing
     * method. Method names may be specified as individual arguments or as arrays
     * of method names. If no method names are provided all enumerable function
     * properties, own and inherited, of `object` are bound.
     *
     * **Note:** This method does not set the "length" property of bound functions.
     *
     * @static
     * @memberOf _
     * @category Function
     * @param {Object} object The object to bind and assign the bound methods to.
     * @param {...(string|string[])} [methodNames] The object method names to bind,
     *  specified as individual method names or arrays of method names.
     * @returns {Object} Returns `object`.
     * @example
     *
     * var view = {
     *   'label': 'docs',
     *   'onClick': function() {
     *     console.log('clicked ' + this.label);
     *   }
     * };
     *
     * _.bindAll(view);
     * jQuery('#docs').on('click', view.onClick);
     * // => logs 'clicked docs' when the element is clicked
     */
    var bindAll = restParam(function(object, methodNames) {
      methodNames = methodNames.length ? baseFlatten(methodNames) : functions(object);

      var index = -1,
          length = methodNames.length;

      while (++index < length) {
        var key = methodNames[index];
        object[key] = createWrapper(object[key], BIND_FLAG, object);
      }
      return object;
    });

    /**
     * Creates a function that invokes the method at `object[key]` and prepends
     * any additional `_.bindKey` arguments to those provided to the bound function.
     *
     * This method differs from `_.bind` by allowing bound functions to reference
     * methods that may be redefined or don't yet exist.
     * See [Peter Michaux's article](http://peter.michaux.ca/articles/lazy-function-definition-pattern)
     * for more details.
     *
     * The `_.bindKey.placeholder` value, which defaults to `_` in monolithic
     * builds, may be used as a placeholder for partially applied arguments.
     *
     * @static
     * @memberOf _
     * @category Function
     * @param {Object} object The object the method belongs to.
     * @param {string} key The key of the method.
     * @param {...*} [partials] The arguments to be partially applied.
     * @returns {Function} Returns the new bound function.
     * @example
     *
     * var object = {
     *   'user': 'fred',
     *   'greet': function(greeting, punctuation) {
     *     return greeting + ' ' + this.user + punctuation;
     *   }
     * };
     *
     * var bound = _.bindKey(object, 'greet', 'hi');
     * bound('!');
     * // => 'hi fred!'
     *
     * object.greet = function(greeting, punctuation) {
     *   return greeting + 'ya ' + this.user + punctuation;
     * };
     *
     * bound('!');
     * // => 'hiya fred!'
     *
     * // using placeholders
     * var bound = _.bindKey(object, 'greet', _, '!');
     * bound('hi');
     * // => 'hiya fred!'
     */
    var bindKey = restParam(function(object, key, partials) {
      var bitmask = BIND_FLAG | BIND_KEY_FLAG;
      if (partials.length) {
        var holders = replaceHolders(partials, bindKey.placeholder);
        bitmask |= PARTIAL_FLAG;
      }
      return createWrapper(key, bitmask, object, partials, holders);
    });

    /**
     * Creates a function that accepts one or more arguments of `func` that when
     * called either invokes `func` returning its result, if all `func` arguments
     * have been provided, or returns a function that accepts one or more of the
     * remaining `func` arguments, and so on. The arity of `func` may be specified
     * if `func.length` is not sufficient.
     *
     * The `_.curry.placeholder` value, which defaults to `_` in monolithic builds,
     * may be used as a placeholder for provided arguments.
     *
     * **Note:** This method does not set the "length" property of curried functions.
     *
     * @static
     * @memberOf _
     * @category Function
     * @param {Function} func The function to curry.
     * @param {number} [arity=func.length] The arity of `func`.
     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
     * @returns {Function} Returns the new curried function.
     * @example
     *
     * var abc = function(a, b, c) {
     *   return [a, b, c];
     * };
     *
     * var curried = _.curry(abc);
     *
     * curried(1)(2)(3);
     * // => [1, 2, 3]
     *
     * curried(1, 2)(3);
     * // => [1, 2, 3]
     *
     * curried(1, 2, 3);
     * // => [1, 2, 3]
     *
     * // using placeholders
     * curried(1)(_, 3)(2);
     * // => [1, 2, 3]
     */
    var curry = createCurry(CURRY_FLAG);

    /**
     * This method is like `_.curry` except that arguments are applied to `func`
     * in the manner of `_.partialRight` instead of `_.partial`.
     *
     * The `_.curryRight.placeholder` value, which defaults to `_` in monolithic
     * builds, may be used as a placeholder for provided arguments.
     *
     * **Note:** This method does not set the "length" property of curried functions.
     *
     * @static
     * @memberOf _
     * @category Function
     * @param {Function} func The function to curry.
     * @param {number} [arity=func.length] The arity of `func`.
     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
     * @returns {Function} Returns the new curried function.
     * @example
     *
     * var abc = function(a, b, c) {
     *   return [a, b, c];
     * };
     *
     * var curried = _.curryRight(abc);
     *
     * curried(3)(2)(1);
     * // => [1, 2, 3]
     *
     * curried(2, 3)(1);
     * // => [1, 2, 3]
     *
     * curried(1, 2, 3);
     * // => [1, 2, 3]
     *
     * // using placeholders
     * curried(3)(1, _)(2);
     * // => [1, 2, 3]
     */
    var curryRight = createCurry(CURRY_RIGHT_FLAG);

    /**
     * Creates a debounced function that delays invoking `func` until after `wait`
     * milliseconds have elapsed since the last time the debounced function was
     * invoked. The debounced function comes with a `cancel` method to cancel
     * delayed invocations. Provide an options object to indicate that `func`
     * should be invoked on the leading and/or trailing edge of the `wait` timeout.
     * Subsequent calls to the debounced function return the result of the last
     * `func` invocation.
     *
     * **Note:** If `leading` and `trailing` options are `true`, `func` is invoked
     * on the trailing edge of the timeout only if the the debounced function is
     * invoked more than once during the `wait` timeout.
     *
     * See [David Corbacho's article](http://drupalmotion.com/article/debounce-and-throttle-visual-explanation)
     * for details over the differences between `_.debounce` and `_.throttle`.
     *
     * @static
     * @memberOf _
     * @category Function
     * @param {Function} func The function to debounce.
     * @param {number} [wait=0] The number of milliseconds to delay.
     * @param {Object} [options] The options object.
     * @param {boolean} [options.leading=false] Specify invoking on the leading
     *  edge of the timeout.
     * @param {number} [options.maxWait] The maximum time `func` is allowed to be
     *  delayed before it is invoked.
     * @param {boolean} [options.trailing=true] Specify invoking on the trailing
     *  edge of the timeout.
     * @returns {Function} Returns the new debounced function.
     * @example
     *
     * // avoid costly calculations while the window size is in flux
     * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
     *
     * // invoke `sendMail` when the click event is fired, debouncing subsequent calls
     * jQuery('#postbox').on('click', _.debounce(sendMail, 300, {
     *   'leading': true,
     *   'trailing': false
     * }));
     *
     * // ensure `batchLog` is invoked once after 1 second of debounced calls
     * var source = new EventSource('/stream');
     * jQuery(source).on('message', _.debounce(batchLog, 250, {
     *   'maxWait': 1000
     * }));
     *
     * // cancel a debounced call
     * var todoChanges = _.debounce(batchLog, 1000);
     * Object.observe(models.todo, todoChanges);
     *
     * Object.observe(models, function(changes) {
     *   if (_.find(changes, { 'user': 'todo', 'type': 'delete'})) {
     *     todoChanges.cancel();
     *   }
     * }, ['delete']);
     *
     * // ...at some point `models.todo` is changed
     * models.todo.completed = true;
     *
     * // ...before 1 second has passed `models.todo` is deleted
     * // which cancels the debounced `todoChanges` call
     * delete models.todo;
     */
    function debounce(func, wait, options) {
      var args,
          maxTimeoutId,
          result,
          stamp,
          thisArg,
          timeoutId,
          trailingCall,
          lastCalled = 0,
          maxWait = false,
          trailing = true;

      if (typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      wait = wait < 0 ? 0 : (+wait || 0);
      if (options === true) {
        var leading = true;
        trailing = false;
      } else if (isObject(options)) {
        leading = options.leading;
        maxWait = 'maxWait' in options && nativeMax(+options.maxWait || 0, wait);
        trailing = 'trailing' in options ? options.trailing : trailing;
      }

      function cancel() {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
        if (maxTimeoutId) {
          clearTimeout(maxTimeoutId);
        }
        maxTimeoutId = timeoutId = trailingCall = undefined;
      }

      function delayed() {
        var remaining = wait - (now() - stamp);
        if (remaining <= 0 || remaining > wait) {
          if (maxTimeoutId) {
            clearTimeout(maxTimeoutId);
          }
          var isCalled = trailingCall;
          maxTimeoutId = timeoutId = trailingCall = undefined;
          if (isCalled) {
            lastCalled = now();
            result = func.apply(thisArg, args);
            if (!timeoutId && !maxTimeoutId) {
              args = thisArg = null;
            }
          }
        } else {
          timeoutId = setTimeout(delayed, remaining);
        }
      }

      function maxDelayed() {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
        maxTimeoutId = timeoutId = trailingCall = undefined;
        if (trailing || (maxWait !== wait)) {
          lastCalled = now();
          result = func.apply(thisArg, args);
          if (!timeoutId && !maxTimeoutId) {
            args = thisArg = null;
          }
        }
      }

      function debounced() {
        args = arguments;
        stamp = now();
        thisArg = this;
        trailingCall = trailing && (timeoutId || !leading);

        if (maxWait === false) {
          var leadingCall = leading && !timeoutId;
        } else {
          if (!maxTimeoutId && !leading) {
            lastCalled = stamp;
          }
          var remaining = maxWait - (stamp - lastCalled),
              isCalled = remaining <= 0 || remaining > maxWait;

          if (isCalled) {
            if (maxTimeoutId) {
              maxTimeoutId = clearTimeout(maxTimeoutId);
            }
            lastCalled = stamp;
            result = func.apply(thisArg, args);
          }
          else if (!maxTimeoutId) {
            maxTimeoutId = setTimeout(maxDelayed, remaining);
          }
        }
        if (isCalled && timeoutId) {
          timeoutId = clearTimeout(timeoutId);
        }
        else if (!timeoutId && wait !== maxWait) {
          timeoutId = setTimeout(delayed, wait);
        }
        if (leadingCall) {
          isCalled = true;
          result = func.apply(thisArg, args);
        }
        if (isCalled && !timeoutId && !maxTimeoutId) {
          args = thisArg = null;
        }
        return result;
      }
      debounced.cancel = cancel;
      return debounced;
    }

    /**
     * Defers invoking the `func` until the current call stack has cleared. Any
     * additional arguments are provided to `func` when it is invoked.
     *
     * @static
     * @memberOf _
     * @category Function
     * @param {Function} func The function to defer.
     * @param {...*} [args] The arguments to invoke the function with.
     * @returns {number} Returns the timer id.
     * @example
     *
     * _.defer(function(text) {
     *   console.log(text);
     * }, 'deferred');
     * // logs 'deferred' after one or more milliseconds
     */
    var defer = restParam(function(func, args) {
      return baseDelay(func, 1, args);
    });

    /**
     * Invokes `func` after `wait` milliseconds. Any additional arguments are
     * provided to `func` when it is invoked.
     *
     * @static
     * @memberOf _
     * @category Function
     * @param {Function} func The function to delay.
     * @param {number} wait The number of milliseconds to delay invocation.
     * @param {...*} [args] The arguments to invoke the function with.
     * @returns {number} Returns the timer id.
     * @example
     *
     * _.delay(function(text) {
     *   console.log(text);
     * }, 1000, 'later');
     * // => logs 'later' after one second
     */
    var delay = restParam(function(func, wait, args) {
      return baseDelay(func, wait, args);
    });

    /**
     * Creates a function that returns the result of invoking the provided
     * functions with the `this` binding of the created function, where each
     * successive invocation is supplied the return value of the previous.
     *
     * @static
     * @memberOf _
     * @category Function
     * @param {...Function} [funcs] Functions to invoke.
     * @returns {Function} Returns the new function.
     * @example
     *
     * function square(n) {
     *   return n * n;
     * }
     *
     * var addSquare = _.flow(_.add, square);
     * addSquare(1, 2);
     * // => 9
     */
    var flow = createFlow();

    /**
     * This method is like `_.flow` except that it creates a function that
     * invokes the provided functions from right to left.
     *
     * @static
     * @memberOf _
     * @alias backflow, compose
     * @category Function
     * @param {...Function} [funcs] Functions to invoke.
     * @returns {Function} Returns the new function.
     * @example
     *
     * function square(n) {
     *   return n * n;
     * }
     *
     * var addSquare = _.flowRight(square, _.add);
     * addSquare(1, 2);
     * // => 9
     */
    var flowRight = createFlow(true);

    /**
     * Creates a function that memoizes the result of `func`. If `resolver` is
     * provided it determines the cache key for storing the result based on the
     * arguments provided to the memoized function. By default, the first argument
     * provided to the memoized function is coerced to a string and used as the
     * cache key. The `func` is invoked with the `this` binding of the memoized
     * function.
     *
     * **Note:** The cache is exposed as the `cache` property on the memoized
     * function. Its creation may be customized by replacing the `_.memoize.Cache`
     * constructor with one whose instances implement the [`Map`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-properties-of-the-map-prototype-object)
     * method interface of `get`, `has`, and `set`.
     *
     * @static
     * @memberOf _
     * @category Function
     * @param {Function} func The function to have its output memoized.
     * @param {Function} [resolver] The function to resolve the cache key.
     * @returns {Function} Returns the new memoizing function.
     * @example
     *
     * var upperCase = _.memoize(function(string) {
     *   return string.toUpperCase();
     * });
     *
     * upperCase('fred');
     * // => 'FRED'
     *
     * // modifying the result cache
     * upperCase.cache.set('fred', 'BARNEY');
     * upperCase('fred');
     * // => 'BARNEY'
     *
     * // replacing `_.memoize.Cache`
     * var object = { 'user': 'fred' };
     * var other = { 'user': 'barney' };
     * var identity = _.memoize(_.identity);
     *
     * identity(object);
     * // => { 'user': 'fred' }
     * identity(other);
     * // => { 'user': 'fred' }
     *
     * _.memoize.Cache = WeakMap;
     * var identity = _.memoize(_.identity);
     *
     * identity(object);
     * // => { 'user': 'fred' }
     * identity(other);
     * // => { 'user': 'barney' }
     */
    function memoize(func, resolver) {
      if (typeof func != 'function' || (resolver && typeof resolver != 'function')) {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      var memoized = function() {
        var args = arguments,
            key = resolver ? resolver.apply(this, args) : args[0],
            cache = memoized.cache;

        if (cache.has(key)) {
          return cache.get(key);
        }
        var result = func.apply(this, args);
        memoized.cache = cache.set(key, result);
        return result;
      };
      memoized.cache = new memoize.Cache;
      return memoized;
    }

    /**
     * Creates a function that negates the result of the predicate `func`. The
     * `func` predicate is invoked with the `this` binding and arguments of the
     * created function.
     *
     * @static
     * @memberOf _
     * @category Function
     * @param {Function} predicate The predicate to negate.
     * @returns {Function} Returns the new function.
     * @example
     *
     * function isEven(n) {
     *   return n % 2 == 0;
     * }
     *
     * _.filter([1, 2, 3, 4, 5, 6], _.negate(isEven));
     * // => [1, 3, 5]
     */
    function negate(predicate) {
      if (typeof predicate != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      return function() {
        return !predicate.apply(this, arguments);
      };
    }

    /**
     * Creates a function that is restricted to invoking `func` once. Repeat calls
     * to the function return the value of the first call. The `func` is invoked
     * with the `this` binding and arguments of the created function.
     *
     * @static
     * @memberOf _
     * @category Function
     * @param {Function} func The function to restrict.
     * @returns {Function} Returns the new restricted function.
     * @example
     *
     * var initialize = _.once(createApplication);
     * initialize();
     * initialize();
     * // `initialize` invokes `createApplication` once
     */
    function once(func) {
      return before(2, func);
    }

    /**
     * Creates a function that invokes `func` with `partial` arguments prepended
     * to those provided to the new function. This method is like `_.bind` except
     * it does **not** alter the `this` binding.
     *
     * The `_.partial.placeholder` value, which defaults to `_` in monolithic
     * builds, may be used as a placeholder for partially applied arguments.
     *
     * **Note:** This method does not set the "length" property of partially
     * applied functions.
     *
     * @static
     * @memberOf _
     * @category Function
     * @param {Function} func The function to partially apply arguments to.
     * @param {...*} [partials] The arguments to be partially applied.
     * @returns {Function} Returns the new partially applied function.
     * @example
     *
     * var greet = function(greeting, name) {
     *   return greeting + ' ' + name;
     * };
     *
     * var sayHelloTo = _.partial(greet, 'hello');
     * sayHelloTo('fred');
     * // => 'hello fred'
     *
     * // using placeholders
     * var greetFred = _.partial(greet, _, 'fred');
     * greetFred('hi');
     * // => 'hi fred'
     */
    var partial = createPartial(PARTIAL_FLAG);

    /**
     * This method is like `_.partial` except that partially applied arguments
     * are appended to those provided to the new function.
     *
     * The `_.partialRight.placeholder` value, which defaults to `_` in monolithic
     * builds, may be used as a placeholder for partially applied arguments.
     *
     * **Note:** This method does not set the "length" property of partially
     * applied functions.
     *
     * @static
     * @memberOf _
     * @category Function
     * @param {Function} func The function to partially apply arguments to.
     * @param {...*} [partials] The arguments to be partially applied.
     * @returns {Function} Returns the new partially applied function.
     * @example
     *
     * var greet = function(greeting, name) {
     *   return greeting + ' ' + name;
     * };
     *
     * var greetFred = _.partialRight(greet, 'fred');
     * greetFred('hi');
     * // => 'hi fred'
     *
     * // using placeholders
     * var sayHelloTo = _.partialRight(greet, 'hello', _);
     * sayHelloTo('fred');
     * // => 'hello fred'
     */
    var partialRight = createPartial(PARTIAL_RIGHT_FLAG);

    /**
     * Creates a function that invokes `func` with arguments arranged according
     * to the specified indexes where the argument value at the first index is
     * provided as the first argument, the argument value at the second index is
     * provided as the second argument, and so on.
     *
     * @static
     * @memberOf _
     * @category Function
     * @param {Function} func The function to rearrange arguments for.
     * @param {...(number|number[])} indexes The arranged argument indexes,
     *  specified as individual indexes or arrays of indexes.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var rearged = _.rearg(function(a, b, c) {
     *   return [a, b, c];
     * }, 2, 0, 1);
     *
     * rearged('b', 'c', 'a')
     * // => ['a', 'b', 'c']
     *
     * var map = _.rearg(_.map, [1, 0]);
     * map(function(n) {
     *   return n * 3;
     * }, [1, 2, 3]);
     * // => [3, 6, 9]
     */
    var rearg = restParam(function(func, indexes) {
      return createWrapper(func, REARG_FLAG, null, null, null, baseFlatten(indexes));
    });

    /**
     * Creates a function that invokes `func` with the `this` binding of the
     * created function and arguments from `start` and beyond provided as an array.
     *
     * **Note:** This method is based on the [rest parameter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters).
     *
     * @static
     * @memberOf _
     * @category Function
     * @param {Function} func The function to apply a rest parameter to.
     * @param {number} [start=func.length-1] The start position of the rest parameter.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var say = _.restParam(function(what, names) {
     *   return what + ' ' + _.initial(names).join(', ') +
     *     (_.size(names) > 1 ? ', & ' : '') + _.last(names);
     * });
     *
     * say('hello', 'fred', 'barney', 'pebbles');
     * // => 'hello fred, barney, & pebbles'
     */
    function restParam(func, start) {
      if (typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      start = nativeMax(start === undefined ? (func.length - 1) : (+start || 0), 0);
      return function() {
        var args = arguments,
            index = -1,
            length = nativeMax(args.length - start, 0),
            rest = Array(length);

        while (++index < length) {
          rest[index] = args[start + index];
        }
        switch (start) {
          case 0: return func.call(this, rest);
          case 1: return func.call(this, args[0], rest);
          case 2: return func.call(this, args[0], args[1], rest);
        }
        var otherArgs = Array(start + 1);
        index = -1;
        while (++index < start) {
          otherArgs[index] = args[index];
        }
        otherArgs[start] = rest;
        return func.apply(this, otherArgs);
      };
    }

    /**
     * Creates a function that invokes `func` with the `this` binding of the created
     * function and an array of arguments much like [`Function#apply`](https://es5.github.io/#x15.3.4.3).
     *
     * **Note:** This method is based on the [spread operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator).
     *
     * @static
     * @memberOf _
     * @category Function
     * @param {Function} func The function to spread arguments over.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var say = _.spread(function(who, what) {
     *   return who + ' says ' + what;
     * });
     *
     * say(['fred', 'hello']);
     * // => 'fred says hello'
     *
     * // with a Promise
     * var numbers = Promise.all([
     *   Promise.resolve(40),
     *   Promise.resolve(36)
     * ]);
     *
     * numbers.then(_.spread(function(x, y) {
     *   return x + y;
     * }));
     * // => a Promise of 76
     */
    function spread(func) {
      if (typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      return function(array) {
        return func.apply(this, array);
      };
    }

    /**
     * Creates a throttled function that only invokes `func` at most once per
     * every `wait` milliseconds. The throttled function comes with a `cancel`
     * method to cancel delayed invocations. Provide an options object to indicate
     * that `func` should be invoked on the leading and/or trailing edge of the
     * `wait` timeout. Subsequent calls to the throttled function return the
     * result of the last `func` call.
     *
     * **Note:** If `leading` and `trailing` options are `true`, `func` is invoked
     * on the trailing edge of the timeout only if the the throttled function is
     * invoked more than once during the `wait` timeout.
     *
     * See [David Corbacho's article](http://drupalmotion.com/article/debounce-and-throttle-visual-explanation)
     * for details over the differences between `_.throttle` and `_.debounce`.
     *
     * @static
     * @memberOf _
     * @category Function
     * @param {Function} func The function to throttle.
     * @param {number} [wait=0] The number of milliseconds to throttle invocations to.
     * @param {Object} [options] The options object.
     * @param {boolean} [options.leading=true] Specify invoking on the leading
     *  edge of the timeout.
     * @param {boolean} [options.trailing=true] Specify invoking on the trailing
     *  edge of the timeout.
     * @returns {Function} Returns the new throttled function.
     * @example
     *
     * // avoid excessively updating the position while scrolling
     * jQuery(window).on('scroll', _.throttle(updatePosition, 100));
     *
     * // invoke `renewToken` when the click event is fired, but not more than once every 5 minutes
     * jQuery('.interactive').on('click', _.throttle(renewToken, 300000, {
     *   'trailing': false
     * }));
     *
     * // cancel a trailing throttled call
     * jQuery(window).on('popstate', throttled.cancel);
     */
    function throttle(func, wait, options) {
      var leading = true,
          trailing = true;

      if (typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      if (options === false) {
        leading = false;
      } else if (isObject(options)) {
        leading = 'leading' in options ? !!options.leading : leading;
        trailing = 'trailing' in options ? !!options.trailing : trailing;
      }
      debounceOptions.leading = leading;
      debounceOptions.maxWait = +wait;
      debounceOptions.trailing = trailing;
      return debounce(func, wait, debounceOptions);
    }

    /**
     * Creates a function that provides `value` to the wrapper function as its
     * first argument. Any additional arguments provided to the function are
     * appended to those provided to the wrapper function. The wrapper is invoked
     * with the `this` binding of the created function.
     *
     * @static
     * @memberOf _
     * @category Function
     * @param {*} value The value to wrap.
     * @param {Function} wrapper The wrapper function.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var p = _.wrap(_.escape, function(func, text) {
     *   return '<p>' + func(text) + '</p>';
     * });
     *
     * p('fred, barney, & pebbles');
     * // => '<p>fred, barney, &amp; pebbles</p>'
     */
    function wrap(value, wrapper) {
      wrapper = wrapper == null ? identity : wrapper;
      return createWrapper(wrapper, PARTIAL_FLAG, null, [value], []);
    }

    /*------------------------------------------------------------------------*/

    /**
     * Creates a clone of `value`. If `isDeep` is `true` nested objects are cloned,
     * otherwise they are assigned by reference. If `customizer` is provided it is
     * invoked to produce the cloned values. If `customizer` returns `undefined`
     * cloning is handled by the method instead. The `customizer` is bound to
     * `thisArg` and invoked with two argument; (value [, index|key, object]).
     *
     * **Note:** This method is loosely based on the
     * [structured clone algorithm](http://www.w3.org/TR/html5/infrastructure.html#internal-structured-cloning-algorithm).
     * The enumerable properties of `arguments` objects and objects created by
     * constructors other than `Object` are cloned to plain `Object` objects. An
     * empty object is returned for uncloneable values such as functions, DOM nodes,
     * Maps, Sets, and WeakMaps.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to clone.
     * @param {boolean} [isDeep] Specify a deep clone.
     * @param {Function} [customizer] The function to customize cloning values.
     * @param {*} [thisArg] The `this` binding of `customizer`.
     * @returns {*} Returns the cloned value.
     * @example
     *
     * var users = [
     *   { 'user': 'barney' },
     *   { 'user': 'fred' }
     * ];
     *
     * var shallow = _.clone(users);
     * shallow[0] === users[0];
     * // => true
     *
     * var deep = _.clone(users, true);
     * deep[0] === users[0];
     * // => false
     *
     * // using a customizer callback
     * var el = _.clone(document.body, function(value) {
     *   if (_.isElement(value)) {
     *     return value.cloneNode(false);
     *   }
     * });
     *
     * el === document.body
     * // => false
     * el.nodeName
     * // => BODY
     * el.childNodes.length;
     * // => 0
     */
    function clone(value, isDeep, customizer, thisArg) {
      if (isDeep && typeof isDeep != 'boolean' && isIterateeCall(value, isDeep, customizer)) {
        isDeep = false;
      }
      else if (typeof isDeep == 'function') {
        thisArg = customizer;
        customizer = isDeep;
        isDeep = false;
      }
      return typeof customizer == 'function'
        ? baseClone(value, isDeep, bindCallback(customizer, thisArg, 1))
        : baseClone(value, isDeep);
    }

    /**
     * Creates a deep clone of `value`. If `customizer` is provided it is invoked
     * to produce the cloned values. If `customizer` returns `undefined` cloning
     * is handled by the method instead. The `customizer` is bound to `thisArg`
     * and invoked with two argument; (value [, index|key, object]).
     *
     * **Note:** This method is loosely based on the
     * [structured clone algorithm](http://www.w3.org/TR/html5/infrastructure.html#internal-structured-cloning-algorithm).
     * The enumerable properties of `arguments` objects and objects created by
     * constructors other than `Object` are cloned to plain `Object` objects. An
     * empty object is returned for uncloneable values such as functions, DOM nodes,
     * Maps, Sets, and WeakMaps.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to deep clone.
     * @param {Function} [customizer] The function to customize cloning values.
     * @param {*} [thisArg] The `this` binding of `customizer`.
     * @returns {*} Returns the deep cloned value.
     * @example
     *
     * var users = [
     *   { 'user': 'barney' },
     *   { 'user': 'fred' }
     * ];
     *
     * var deep = _.cloneDeep(users);
     * deep[0] === users[0];
     * // => false
     *
     * // using a customizer callback
     * var el = _.cloneDeep(document.body, function(value) {
     *   if (_.isElement(value)) {
     *     return value.cloneNode(true);
     *   }
     * });
     *
     * el === document.body
     * // => false
     * el.nodeName
     * // => BODY
     * el.childNodes.length;
     * // => 20
     */
    function cloneDeep(value, customizer, thisArg) {
      return typeof customizer == 'function'
        ? baseClone(value, true, bindCallback(customizer, thisArg, 1))
        : baseClone(value, true);
    }

    /**
     * Checks if `value` is greater than `other`.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @returns {boolean} Returns `true` if `value` is greater than `other`, else `false`.
     * @example
     *
     * _.gt(3, 1);
     * // => true
     *
     * _.gt(3, 3);
     * // => false
     *
     * _.gt(1, 3);
     * // => false
     */
    function gt(value, other) {
      return value > other;
    }

    /**
     * Checks if `value` is greater than or equal to `other`.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @returns {boolean} Returns `true` if `value` is greater than or equal to `other`, else `false`.
     * @example
     *
     * _.gte(3, 1);
     * // => true
     *
     * _.gte(3, 3);
     * // => true
     *
     * _.gte(1, 3);
     * // => false
     */
    function gte(value, other) {
      return value >= other;
    }

    /**
     * Checks if `value` is classified as an `arguments` object.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
     * @example
     *
     * _.isArguments(function() { return arguments; }());
     * // => true
     *
     * _.isArguments([1, 2, 3]);
     * // => false
     */
    function isArguments(value) {
      return isObjectLike(value) && isArrayLike(value) && objToString.call(value) == argsTag;
    }

    /**
     * Checks if `value` is classified as an `Array` object.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
     * @example
     *
     * _.isArray([1, 2, 3]);
     * // => true
     *
     * _.isArray(function() { return arguments; }());
     * // => false
     */
    var isArray = nativeIsArray || function(value) {
      return isObjectLike(value) && isLength(value.length) && objToString.call(value) == arrayTag;
    };

    /**
     * Checks if `value` is classified as a boolean primitive or object.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
     * @example
     *
     * _.isBoolean(false);
     * // => true
     *
     * _.isBoolean(null);
     * // => false
     */
    function isBoolean(value) {
      return value === true || value === false || (isObjectLike(value) && objToString.call(value) == boolTag);
    }

    /**
     * Checks if `value` is classified as a `Date` object.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
     * @example
     *
     * _.isDate(new Date);
     * // => true
     *
     * _.isDate('Mon April 23 2012');
     * // => false
     */
    function isDate(value) {
      return isObjectLike(value) && objToString.call(value) == dateTag;
    }

    /**
     * Checks if `value` is a DOM element.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a DOM element, else `false`.
     * @example
     *
     * _.isElement(document.body);
     * // => true
     *
     * _.isElement('<body>');
     * // => false
     */
    function isElement(value) {
      return !!value && value.nodeType === 1 && isObjectLike(value) &&
        (objToString.call(value).indexOf('Element') > -1);
    }
    // Fallback for environments without DOM support.
    if (!support.dom) {
      isElement = function(value) {
        return !!value && value.nodeType === 1 && isObjectLike(value) && !isPlainObject(value);
      };
    }

    /**
     * Checks if `value` is empty. A value is considered empty unless it is an
     * `arguments` object, array, string, or jQuery-like collection with a length
     * greater than `0` or an object with own enumerable properties.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {Array|Object|string} value The value to inspect.
     * @returns {boolean} Returns `true` if `value` is empty, else `false`.
     * @example
     *
     * _.isEmpty(null);
     * // => true
     *
     * _.isEmpty(true);
     * // => true
     *
     * _.isEmpty(1);
     * // => true
     *
     * _.isEmpty([1, 2, 3]);
     * // => false
     *
     * _.isEmpty({ 'a': 1 });
     * // => false
     */
    function isEmpty(value) {
      if (value == null) {
        return true;
      }
      if (isArrayLike(value) && (isArray(value) || isString(value) || isArguments(value) ||
          (isObjectLike(value) && isFunction(value.splice)))) {
        return !value.length;
      }
      return !keys(value).length;
    }

    /**
     * Performs a deep comparison between two values to determine if they are
     * equivalent. If `customizer` is provided it is invoked to compare values.
     * If `customizer` returns `undefined` comparisons are handled by the method
     * instead. The `customizer` is bound to `thisArg` and invoked with three
     * arguments: (value, other [, index|key]).
     *
     * **Note:** This method supports comparing arrays, booleans, `Date` objects,
     * numbers, `Object` objects, regexes, and strings. Objects are compared by
     * their own, not inherited, enumerable properties. Functions and DOM nodes
     * are **not** supported. Provide a customizer function to extend support
     * for comparing other values.
     *
     * @static
     * @memberOf _
     * @alias eq
     * @category Lang
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @param {Function} [customizer] The function to customize value comparisons.
     * @param {*} [thisArg] The `this` binding of `customizer`.
     * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
     * @example
     *
     * var object = { 'user': 'fred' };
     * var other = { 'user': 'fred' };
     *
     * object == other;
     * // => false
     *
     * _.isEqual(object, other);
     * // => true
     *
     * // using a customizer callback
     * var array = ['hello', 'goodbye'];
     * var other = ['hi', 'goodbye'];
     *
     * _.isEqual(array, other, function(value, other) {
     *   if (_.every([value, other], RegExp.prototype.test, /^h(?:i|ello)$/)) {
     *     return true;
     *   }
     * });
     * // => true
     */
    function isEqual(value, other, customizer, thisArg) {
      customizer = typeof customizer == 'function' ? bindCallback(customizer, thisArg, 3) : undefined;
      var result = customizer ? customizer(value, other) : undefined;
      return  result === undefined ? baseIsEqual(value, other, customizer) : !!result;
    }

    /**
     * Checks if `value` is an `Error`, `EvalError`, `RangeError`, `ReferenceError`,
     * `SyntaxError`, `TypeError`, or `URIError` object.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an error object, else `false`.
     * @example
     *
     * _.isError(new Error);
     * // => true
     *
     * _.isError(Error);
     * // => false
     */
    function isError(value) {
      return isObjectLike(value) && typeof value.message == 'string' && objToString.call(value) == errorTag;
    }

    /**
     * Checks if `value` is a finite primitive number.
     *
     * **Note:** This method is based on [`Number.isFinite`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.isfinite).
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a finite number, else `false`.
     * @example
     *
     * _.isFinite(10);
     * // => true
     *
     * _.isFinite('10');
     * // => false
     *
     * _.isFinite(true);
     * // => false
     *
     * _.isFinite(Object(10));
     * // => false
     *
     * _.isFinite(Infinity);
     * // => false
     */
    var isFinite = nativeNumIsFinite || function(value) {
      return typeof value == 'number' && nativeIsFinite(value);
    };

    /**
     * Checks if `value` is classified as a `Function` object.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
     * @example
     *
     * _.isFunction(_);
     * // => true
     *
     * _.isFunction(/abc/);
     * // => false
     */
    var isFunction = !(baseIsFunction(/x/) || (Uint8Array && !baseIsFunction(Uint8Array))) ? baseIsFunction : function(value) {
      // The use of `Object#toString` avoids issues with the `typeof` operator
      // in older versions of Chrome and Safari which return 'function' for regexes
      // and Safari 8 equivalents which return 'object' for typed array constructors.
      return objToString.call(value) == funcTag;
    };

    /**
     * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
     * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an object, else `false`.
     * @example
     *
     * _.isObject({});
     * // => true
     *
     * _.isObject([1, 2, 3]);
     * // => true
     *
     * _.isObject(1);
     * // => false
     */
    function isObject(value) {
      // Avoid a V8 JIT bug in Chrome 19-20.
      // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
      var type = typeof value;
      return !!value && (type == 'object' || type == 'function');
    }

    /**
     * Performs a deep comparison between `object` and `source` to determine if
     * `object` contains equivalent property values. If `customizer` is provided
     * it is invoked to compare values. If `customizer` returns `undefined`
     * comparisons are handled by the method instead. The `customizer` is bound
     * to `thisArg` and invoked with three arguments: (value, other, index|key).
     *
     * **Note:** This method supports comparing properties of arrays, booleans,
     * `Date` objects, numbers, `Object` objects, regexes, and strings. Functions
     * and DOM nodes are **not** supported. Provide a customizer function to extend
     * support for comparing other values.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {Object} object The object to inspect.
     * @param {Object} source The object of property values to match.
     * @param {Function} [customizer] The function to customize value comparisons.
     * @param {*} [thisArg] The `this` binding of `customizer`.
     * @returns {boolean} Returns `true` if `object` is a match, else `false`.
     * @example
     *
     * var object = { 'user': 'fred', 'age': 40 };
     *
     * _.isMatch(object, { 'age': 40 });
     * // => true
     *
     * _.isMatch(object, { 'age': 36 });
     * // => false
     *
     * // using a customizer callback
     * var object = { 'greeting': 'hello' };
     * var source = { 'greeting': 'hi' };
     *
     * _.isMatch(object, source, function(value, other) {
     *   return _.every([value, other], RegExp.prototype.test, /^h(?:i|ello)$/) || undefined;
     * });
     * // => true
     */
    function isMatch(object, source, customizer, thisArg) {
      customizer = typeof customizer == 'function' ? bindCallback(customizer, thisArg, 3) : undefined;
      return baseIsMatch(object, getMatchData(source), customizer);
    }

    /**
     * Checks if `value` is `NaN`.
     *
     * **Note:** This method is not the same as [`isNaN`](https://es5.github.io/#x15.1.2.4)
     * which returns `true` for `undefined` and other non-numeric values.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
     * @example
     *
     * _.isNaN(NaN);
     * // => true
     *
     * _.isNaN(new Number(NaN));
     * // => true
     *
     * isNaN(undefined);
     * // => true
     *
     * _.isNaN(undefined);
     * // => false
     */
    function isNaN(value) {
      // An `NaN` primitive is the only value that is not equal to itself.
      // Perform the `toStringTag` check first to avoid errors with some host objects in IE.
      return isNumber(value) && value != +value;
    }

    /**
     * Checks if `value` is a native function.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
     * @example
     *
     * _.isNative(Array.prototype.push);
     * // => true
     *
     * _.isNative(_);
     * // => false
     */
    function isNative(value) {
      if (value == null) {
        return false;
      }
      if (objToString.call(value) == funcTag) {
        return reIsNative.test(fnToString.call(value));
      }
      return isObjectLike(value) && reIsHostCtor.test(value);
    }

    /**
     * Checks if `value` is `null`.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is `null`, else `false`.
     * @example
     *
     * _.isNull(null);
     * // => true
     *
     * _.isNull(void 0);
     * // => false
     */
    function isNull(value) {
      return value === null;
    }

    /**
     * Checks if `value` is classified as a `Number` primitive or object.
     *
     * **Note:** To exclude `Infinity`, `-Infinity`, and `NaN`, which are classified
     * as numbers, use the `_.isFinite` method.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
     * @example
     *
     * _.isNumber(8.4);
     * // => true
     *
     * _.isNumber(NaN);
     * // => true
     *
     * _.isNumber('8.4');
     * // => false
     */
    function isNumber(value) {
      return typeof value == 'number' || (isObjectLike(value) && objToString.call(value) == numberTag);
    }

    /**
     * Checks if `value` is a plain object, that is, an object created by the
     * `Object` constructor or one with a `[[Prototype]]` of `null`.
     *
     * **Note:** This method assumes objects created by the `Object` constructor
     * have no inherited enumerable properties.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     * }
     *
     * _.isPlainObject(new Foo);
     * // => false
     *
     * _.isPlainObject([1, 2, 3]);
     * // => false
     *
     * _.isPlainObject({ 'x': 0, 'y': 0 });
     * // => true
     *
     * _.isPlainObject(Object.create(null));
     * // => true
     */
    var isPlainObject = !getPrototypeOf ? shimIsPlainObject : function(value) {
      if (!(value && objToString.call(value) == objectTag)) {
        return false;
      }
      var valueOf = getNative(value, 'valueOf'),
          objProto = valueOf && (objProto = getPrototypeOf(valueOf)) && getPrototypeOf(objProto);

      return objProto
        ? (value == objProto || getPrototypeOf(value) == objProto)
        : shimIsPlainObject(value);
    };

    /**
     * Checks if `value` is classified as a `RegExp` object.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
     * @example
     *
     * _.isRegExp(/abc/);
     * // => true
     *
     * _.isRegExp('/abc/');
     * // => false
     */
    function isRegExp(value) {
      return isObjectLike(value) && objToString.call(value) == regexpTag;
    }

    /**
     * Checks if `value` is classified as a `String` primitive or object.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
     * @example
     *
     * _.isString('abc');
     * // => true
     *
     * _.isString(1);
     * // => false
     */
    function isString(value) {
      return typeof value == 'string' || (isObjectLike(value) && objToString.call(value) == stringTag);
    }

    /**
     * Checks if `value` is classified as a typed array.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
     * @example
     *
     * _.isTypedArray(new Uint8Array);
     * // => true
     *
     * _.isTypedArray([]);
     * // => false
     */
    function isTypedArray(value) {
      return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[objToString.call(value)];
    }

    /**
     * Checks if `value` is `undefined`.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is `undefined`, else `false`.
     * @example
     *
     * _.isUndefined(void 0);
     * // => true
     *
     * _.isUndefined(null);
     * // => false
     */
    function isUndefined(value) {
      return value === undefined;
    }

    /**
     * Checks if `value` is less than `other`.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @returns {boolean} Returns `true` if `value` is less than `other`, else `false`.
     * @example
     *
     * _.lt(1, 3);
     * // => true
     *
     * _.lt(3, 3);
     * // => false
     *
     * _.lt(3, 1);
     * // => false
     */
    function lt(value, other) {
      return value < other;
    }

    /**
     * Checks if `value` is less than or equal to `other`.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @returns {boolean} Returns `true` if `value` is less than or equal to `other`, else `false`.
     * @example
     *
     * _.lte(1, 3);
     * // => true
     *
     * _.lte(3, 3);
     * // => true
     *
     * _.lte(3, 1);
     * // => false
     */
    function lte(value, other) {
      return value <= other;
    }

    /**
     * Converts `value` to an array.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to convert.
     * @returns {Array} Returns the converted array.
     * @example
     *
     * (function() {
     *   return _.toArray(arguments).slice(1);
     * }(1, 2, 3));
     * // => [2, 3]
     */
    function toArray(value) {
      var length = value ? getLength(value) : 0;
      if (!isLength(length)) {
        return values(value);
      }
      if (!length) {
        return [];
      }
      return arrayCopy(value);
    }

    /**
     * Converts `value` to a plain object flattening inherited enumerable
     * properties of `value` to own properties of the plain object.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to convert.
     * @returns {Object} Returns the converted plain object.
     * @example
     *
     * function Foo() {
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.assign({ 'a': 1 }, new Foo);
     * // => { 'a': 1, 'b': 2 }
     *
     * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
     * // => { 'a': 1, 'b': 2, 'c': 3 }
     */
    function toPlainObject(value) {
      return baseCopy(value, keysIn(value));
    }

    /*------------------------------------------------------------------------*/

    /**
     * Assigns own enumerable properties of source object(s) to the destination
     * object. Subsequent sources overwrite property assignments of previous sources.
     * If `customizer` is provided it is invoked to produce the assigned values.
     * The `customizer` is bound to `thisArg` and invoked with five arguments:
     * (objectValue, sourceValue, key, object, source).
     *
     * **Note:** This method mutates `object` and is based on
     * [`Object.assign`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.assign).
     *
     * @static
     * @memberOf _
     * @alias extend
     * @category Object
     * @param {Object} object The destination object.
     * @param {...Object} [sources] The source objects.
     * @param {Function} [customizer] The function to customize assigned values.
     * @param {*} [thisArg] The `this` binding of `customizer`.
     * @returns {Object} Returns `object`.
     * @example
     *
     * _.assign({ 'user': 'barney' }, { 'age': 40 }, { 'user': 'fred' });
     * // => { 'user': 'fred', 'age': 40 }
     *
     * // using a customizer callback
     * var defaults = _.partialRight(_.assign, function(value, other) {
     *   return _.isUndefined(value) ? other : value;
     * });
     *
     * defaults({ 'user': 'barney' }, { 'age': 36 }, { 'user': 'fred' });
     * // => { 'user': 'barney', 'age': 36 }
     */
    var assign = createAssigner(function(object, source, customizer) {
      return customizer
        ? assignWith(object, source, customizer)
        : baseAssign(object, source);
    });

    /**
     * Creates an object that inherits from the given `prototype` object. If a
     * `properties` object is provided its own enumerable properties are assigned
     * to the created object.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} prototype The object to inherit from.
     * @param {Object} [properties] The properties to assign to the object.
     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
     * @returns {Object} Returns the new object.
     * @example
     *
     * function Shape() {
     *   this.x = 0;
     *   this.y = 0;
     * }
     *
     * function Circle() {
     *   Shape.call(this);
     * }
     *
     * Circle.prototype = _.create(Shape.prototype, {
     *   'constructor': Circle
     * });
     *
     * var circle = new Circle;
     * circle instanceof Circle;
     * // => true
     *
     * circle instanceof Shape;
     * // => true
     */
    function create(prototype, properties, guard) {
      var result = baseCreate(prototype);
      if (guard && isIterateeCall(prototype, properties, guard)) {
        properties = null;
      }
      return properties ? baseAssign(result, properties) : result;
    }

    /**
     * Assigns own enumerable properties of source object(s) to the destination
     * object for all destination properties that resolve to `undefined`. Once a
     * property is set, additional values of the same property are ignored.
     *
     * **Note:** This method mutates `object`.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The destination object.
     * @param {...Object} [sources] The source objects.
     * @returns {Object} Returns `object`.
     * @example
     *
     * _.defaults({ 'user': 'barney' }, { 'age': 36 }, { 'user': 'fred' });
     * // => { 'user': 'barney', 'age': 36 }
     */
    var defaults = restParam(function(args) {
      var object = args[0];
      if (object == null) {
        return object;
      }
      args.push(assignDefaults);
      return assign.apply(undefined, args);
    });

    /**
     * This method is like `_.find` except that it returns the key of the first
     * element `predicate` returns truthy for instead of the element itself.
     *
     * If a property name is provided for `predicate` the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If a value is also provided for `thisArg` the created `_.matchesProperty`
     * style callback returns `true` for elements that have a matching property
     * value, else `false`.
     *
     * If an object is provided for `predicate` the created `_.matches` style
     * callback returns `true` for elements that have the properties of the given
     * object, else `false`.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The object to search.
     * @param {Function|Object|string} [predicate=_.identity] The function invoked
     *  per iteration.
     * @param {*} [thisArg] The `this` binding of `predicate`.
     * @returns {string|undefined} Returns the key of the matched element, else `undefined`.
     * @example
     *
     * var users = {
     *   'barney':  { 'age': 36, 'active': true },
     *   'fred':    { 'age': 40, 'active': false },
     *   'pebbles': { 'age': 1,  'active': true }
     * };
     *
     * _.findKey(users, function(chr) {
     *   return chr.age < 40;
     * });
     * // => 'barney' (iteration order is not guaranteed)
     *
     * // using the `_.matches` callback shorthand
     * _.findKey(users, { 'age': 1, 'active': true });
     * // => 'pebbles'
     *
     * // using the `_.matchesProperty` callback shorthand
     * _.findKey(users, 'active', false);
     * // => 'fred'
     *
     * // using the `_.property` callback shorthand
     * _.findKey(users, 'active');
     * // => 'barney'
     */
    var findKey = createFindKey(baseForOwn);

    /**
     * This method is like `_.findKey` except that it iterates over elements of
     * a collection in the opposite order.
     *
     * If a property name is provided for `predicate` the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If a value is also provided for `thisArg` the created `_.matchesProperty`
     * style callback returns `true` for elements that have a matching property
     * value, else `false`.
     *
     * If an object is provided for `predicate` the created `_.matches` style
     * callback returns `true` for elements that have the properties of the given
     * object, else `false`.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The object to search.
     * @param {Function|Object|string} [predicate=_.identity] The function invoked
     *  per iteration.
     * @param {*} [thisArg] The `this` binding of `predicate`.
     * @returns {string|undefined} Returns the key of the matched element, else `undefined`.
     * @example
     *
     * var users = {
     *   'barney':  { 'age': 36, 'active': true },
     *   'fred':    { 'age': 40, 'active': false },
     *   'pebbles': { 'age': 1,  'active': true }
     * };
     *
     * _.findLastKey(users, function(chr) {
     *   return chr.age < 40;
     * });
     * // => returns `pebbles` assuming `_.findKey` returns `barney`
     *
     * // using the `_.matches` callback shorthand
     * _.findLastKey(users, { 'age': 36, 'active': true });
     * // => 'barney'
     *
     * // using the `_.matchesProperty` callback shorthand
     * _.findLastKey(users, 'active', false);
     * // => 'fred'
     *
     * // using the `_.property` callback shorthand
     * _.findLastKey(users, 'active');
     * // => 'pebbles'
     */
    var findLastKey = createFindKey(baseForOwnRight);

    /**
     * Iterates over own and inherited enumerable properties of an object invoking
     * `iteratee` for each property. The `iteratee` is bound to `thisArg` and invoked
     * with three arguments: (value, key, object). Iteratee functions may exit
     * iteration early by explicitly returning `false`.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The object to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @param {*} [thisArg] The `this` binding of `iteratee`.
     * @returns {Object} Returns `object`.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.forIn(new Foo, function(value, key) {
     *   console.log(key);
     * });
     * // => logs 'a', 'b', and 'c' (iteration order is not guaranteed)
     */
    var forIn = createForIn(baseFor);

    /**
     * This method is like `_.forIn` except that it iterates over properties of
     * `object` in the opposite order.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The object to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @param {*} [thisArg] The `this` binding of `iteratee`.
     * @returns {Object} Returns `object`.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.forInRight(new Foo, function(value, key) {
     *   console.log(key);
     * });
     * // => logs 'c', 'b', and 'a' assuming `_.forIn ` logs 'a', 'b', and 'c'
     */
    var forInRight = createForIn(baseForRight);

    /**
     * Iterates over own enumerable properties of an object invoking `iteratee`
     * for each property. The `iteratee` is bound to `thisArg` and invoked with
     * three arguments: (value, key, object). Iteratee functions may exit iteration
     * early by explicitly returning `false`.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The object to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @param {*} [thisArg] The `this` binding of `iteratee`.
     * @returns {Object} Returns `object`.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.forOwn(new Foo, function(value, key) {
     *   console.log(key);
     * });
     * // => logs 'a' and 'b' (iteration order is not guaranteed)
     */
    var forOwn = createForOwn(baseForOwn);

    /**
     * This method is like `_.forOwn` except that it iterates over properties of
     * `object` in the opposite order.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The object to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @param {*} [thisArg] The `this` binding of `iteratee`.
     * @returns {Object} Returns `object`.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.forOwnRight(new Foo, function(value, key) {
     *   console.log(key);
     * });
     * // => logs 'b' and 'a' assuming `_.forOwn` logs 'a' and 'b'
     */
    var forOwnRight = createForOwn(baseForOwnRight);

    /**
     * Creates an array of function property names from all enumerable properties,
     * own and inherited, of `object`.
     *
     * @static
     * @memberOf _
     * @alias methods
     * @category Object
     * @param {Object} object The object to inspect.
     * @returns {Array} Returns the new array of property names.
     * @example
     *
     * _.functions(_);
     * // => ['after', 'ary', 'assign', ...]
     */
    function functions(object) {
      return baseFunctions(object, keysIn(object));
    }

    /**
     * Gets the property value at `path` of `object`. If the resolved value is
     * `undefined` the `defaultValue` is used in its place.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The object to query.
     * @param {Array|string} path The path of the property to get.
     * @param {*} [defaultValue] The value returned if the resolved value is `undefined`.
     * @returns {*} Returns the resolved value.
     * @example
     *
     * var object = { 'a': [{ 'b': { 'c': 3 } }] };
     *
     * _.get(object, 'a[0].b.c');
     * // => 3
     *
     * _.get(object, ['a', '0', 'b', 'c']);
     * // => 3
     *
     * _.get(object, 'a.b.c', 'default');
     * // => 'default'
     */
    function get(object, path, defaultValue) {
      var result = object == null ? undefined : baseGet(object, toPath(path), path + '');
      return result === undefined ? defaultValue : result;
    }

    /**
     * Checks if `path` is a direct property.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The object to query.
     * @param {Array|string} path The path to check.
     * @returns {boolean} Returns `true` if `path` is a direct property, else `false`.
     * @example
     *
     * var object = { 'a': { 'b': { 'c': 3 } } };
     *
     * _.has(object, 'a');
     * // => true
     *
     * _.has(object, 'a.b.c');
     * // => true
     *
     * _.has(object, ['a', 'b', 'c']);
     * // => true
     */
    function has(object, path) {
      if (object == null) {
        return false;
      }
      var result = hasOwnProperty.call(object, path);
      if (!result && !isKey(path)) {
        path = toPath(path);
        object = path.length == 1 ? object : baseGet(object, baseSlice(path, 0, -1));
        if (object == null) {
          return false;
        }
        path = last(path);
        result = hasOwnProperty.call(object, path);
      }
      return result || (isLength(object.length) && isIndex(path, object.length) &&
        (isArray(object) || isArguments(object)));
    }

    /**
     * Creates an object composed of the inverted keys and values of `object`.
     * If `object` contains duplicate values, subsequent values overwrite property
     * assignments of previous values unless `multiValue` is `true`.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The object to invert.
     * @param {boolean} [multiValue] Allow multiple values per key.
     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
     * @returns {Object} Returns the new inverted object.
     * @example
     *
     * var object = { 'a': 1, 'b': 2, 'c': 1 };
     *
     * _.invert(object);
     * // => { '1': 'c', '2': 'b' }
     *
     * // with `multiValue`
     * _.invert(object, true);
     * // => { '1': ['a', 'c'], '2': ['b'] }
     */
    function invert(object, multiValue, guard) {
      if (guard && isIterateeCall(object, multiValue, guard)) {
        multiValue = null;
      }
      var index = -1,
          props = keys(object),
          length = props.length,
          result = {};

      while (++index < length) {
        var key = props[index],
            value = object[key];

        if (multiValue) {
          if (hasOwnProperty.call(result, value)) {
            result[value].push(key);
          } else {
            result[value] = [key];
          }
        }
        else {
          result[value] = key;
        }
      }
      return result;
    }

    /**
     * Creates an array of the own enumerable property names of `object`.
     *
     * **Note:** Non-object values are coerced to objects. See the
     * [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.keys)
     * for more details.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.keys(new Foo);
     * // => ['a', 'b'] (iteration order is not guaranteed)
     *
     * _.keys('hi');
     * // => ['0', '1']
     */
    var keys = !nativeKeys ? shimKeys : function(object) {
      var Ctor = object == null ? null : object.constructor;
      if ((typeof Ctor == 'function' && Ctor.prototype === object) ||
          (typeof object != 'function' && isArrayLike(object))) {
        return shimKeys(object);
      }
      return isObject(object) ? nativeKeys(object) : [];
    };

    /**
     * Creates an array of the own and inherited enumerable property names of `object`.
     *
     * **Note:** Non-object values are coerced to objects.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.keysIn(new Foo);
     * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
     */
    function keysIn(object) {
      if (object == null) {
        return [];
      }
      if (!isObject(object)) {
        object = Object(object);
      }
      var length = object.length;
      length = (length && isLength(length) &&
        (isArray(object) || isArguments(object)) && length) || 0;

      var Ctor = object.constructor,
          index = -1,
          isProto = typeof Ctor == 'function' && Ctor.prototype === object,
          result = Array(length),
          skipIndexes = length > 0;

      while (++index < length) {
        result[index] = (index + '');
      }
      for (var key in object) {
        if (!(skipIndexes && isIndex(key, length)) &&
            !(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
          result.push(key);
        }
      }
      return result;
    }

    /**
     * The opposite of `_.mapValues`; this method creates an object with the
     * same values as `object` and keys generated by running each own enumerable
     * property of `object` through `iteratee`.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The object to iterate over.
     * @param {Function|Object|string} [iteratee=_.identity] The function invoked
     *  per iteration.
     * @param {*} [thisArg] The `this` binding of `iteratee`.
     * @returns {Object} Returns the new mapped object.
     * @example
     *
     * _.mapKeys({ 'a': 1, 'b': 2 }, function(value, key) {
     *   return key + value;
     * });
     * // => { 'a1': 1, 'b2': 2 }
     */
    var mapKeys = createObjectMapper(true);

    /**
     * Creates an object with the same keys as `object` and values generated by
     * running each own enumerable property of `object` through `iteratee`. The
     * iteratee function is bound to `thisArg` and invoked with three arguments:
     * (value, key, object).
     *
     * If a property name is provided for `iteratee` the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If a value is also provided for `thisArg` the created `_.matchesProperty`
     * style callback returns `true` for elements that have a matching property
     * value, else `false`.
     *
     * If an object is provided for `iteratee` the created `_.matches` style
     * callback returns `true` for elements that have the properties of the given
     * object, else `false`.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The object to iterate over.
     * @param {Function|Object|string} [iteratee=_.identity] The function invoked
     *  per iteration.
     * @param {*} [thisArg] The `this` binding of `iteratee`.
     * @returns {Object} Returns the new mapped object.
     * @example
     *
     * _.mapValues({ 'a': 1, 'b': 2 }, function(n) {
     *   return n * 3;
     * });
     * // => { 'a': 3, 'b': 6 }
     *
     * var users = {
     *   'fred':    { 'user': 'fred',    'age': 40 },
     *   'pebbles': { 'user': 'pebbles', 'age': 1 }
     * };
     *
     * // using the `_.property` callback shorthand
     * _.mapValues(users, 'age');
     * // => { 'fred': 40, 'pebbles': 1 } (iteration order is not guaranteed)
     */
    var mapValues = createObjectMapper();

    /**
     * Recursively merges own enumerable properties of the source object(s), that
     * don't resolve to `undefined` into the destination object. Subsequent sources
     * overwrite property assignments of previous sources. If `customizer` is
     * provided it is invoked to produce the merged values of the destination and
     * source properties. If `customizer` returns `undefined` merging is handled
     * by the method instead. The `customizer` is bound to `thisArg` and invoked
     * with five arguments: (objectValue, sourceValue, key, object, source).
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The destination object.
     * @param {...Object} [sources] The source objects.
     * @param {Function} [customizer] The function to customize assigned values.
     * @param {*} [thisArg] The `this` binding of `customizer`.
     * @returns {Object} Returns `object`.
     * @example
     *
     * var users = {
     *   'data': [{ 'user': 'barney' }, { 'user': 'fred' }]
     * };
     *
     * var ages = {
     *   'data': [{ 'age': 36 }, { 'age': 40 }]
     * };
     *
     * _.merge(users, ages);
     * // => { 'data': [{ 'user': 'barney', 'age': 36 }, { 'user': 'fred', 'age': 40 }] }
     *
     * // using a customizer callback
     * var object = {
     *   'fruits': ['apple'],
     *   'vegetables': ['beet']
     * };
     *
     * var other = {
     *   'fruits': ['banana'],
     *   'vegetables': ['carrot']
     * };
     *
     * _.merge(object, other, function(a, b) {
     *   if (_.isArray(a)) {
     *     return a.concat(b);
     *   }
     * });
     * // => { 'fruits': ['apple', 'banana'], 'vegetables': ['beet', 'carrot'] }
     */
    var merge = createAssigner(baseMerge);

    /**
     * The opposite of `_.pick`; this method creates an object composed of the
     * own and inherited enumerable properties of `object` that are not omitted.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The source object.
     * @param {Function|...(string|string[])} [predicate] The function invoked per
     *  iteration or property names to omit, specified as individual property
     *  names or arrays of property names.
     * @param {*} [thisArg] The `this` binding of `predicate`.
     * @returns {Object} Returns the new object.
     * @example
     *
     * var object = { 'user': 'fred', 'age': 40 };
     *
     * _.omit(object, 'age');
     * // => { 'user': 'fred' }
     *
     * _.omit(object, _.isNumber);
     * // => { 'user': 'fred' }
     */
    var omit = restParam(function(object, props) {
      if (object == null) {
        return {};
      }
      if (typeof props[0] != 'function') {
        var props = arrayMap(baseFlatten(props), String);
        return pickByArray(object, baseDifference(keysIn(object), props));
      }
      var predicate = bindCallback(props[0], props[1], 3);
      return pickByCallback(object, function(value, key, object) {
        return !predicate(value, key, object);
      });
    });

    /**
     * Creates a two dimensional array of the key-value pairs for `object`,
     * e.g. `[[key1, value1], [key2, value2]]`.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The object to query.
     * @returns {Array} Returns the new array of key-value pairs.
     * @example
     *
     * _.pairs({ 'barney': 36, 'fred': 40 });
     * // => [['barney', 36], ['fred', 40]] (iteration order is not guaranteed)
     */
    function pairs(object) {
      object = toObject(object);

      var index = -1,
          props = keys(object),
          length = props.length,
          result = Array(length);

      while (++index < length) {
        var key = props[index];
        result[index] = [key, object[key]];
      }
      return result;
    }

    /**
     * Creates an object composed of the picked `object` properties. Property
     * names may be specified as individual arguments or as arrays of property
     * names. If `predicate` is provided it is invoked for each property of `object`
     * picking the properties `predicate` returns truthy for. The predicate is
     * bound to `thisArg` and invoked with three arguments: (value, key, object).
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The source object.
     * @param {Function|...(string|string[])} [predicate] The function invoked per
     *  iteration or property names to pick, specified as individual property
     *  names or arrays of property names.
     * @param {*} [thisArg] The `this` binding of `predicate`.
     * @returns {Object} Returns the new object.
     * @example
     *
     * var object = { 'user': 'fred', 'age': 40 };
     *
     * _.pick(object, 'user');
     * // => { 'user': 'fred' }
     *
     * _.pick(object, _.isString);
     * // => { 'user': 'fred' }
     */
    var pick = restParam(function(object, props) {
      if (object == null) {
        return {};
      }
      return typeof props[0] == 'function'
        ? pickByCallback(object, bindCallback(props[0], props[1], 3))
        : pickByArray(object, baseFlatten(props));
    });

    /**
     * This method is like `_.get` except that if the resolved value is a function
     * it is invoked with the `this` binding of its parent object and its result
     * is returned.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The object to query.
     * @param {Array|string} path The path of the property to resolve.
     * @param {*} [defaultValue] The value returned if the resolved value is `undefined`.
     * @returns {*} Returns the resolved value.
     * @example
     *
     * var object = { 'a': [{ 'b': { 'c1': 3, 'c2': _.constant(4) } }] };
     *
     * _.result(object, 'a[0].b.c1');
     * // => 3
     *
     * _.result(object, 'a[0].b.c2');
     * // => 4
     *
     * _.result(object, 'a.b.c', 'default');
     * // => 'default'
     *
     * _.result(object, 'a.b.c', _.constant('default'));
     * // => 'default'
     */
    function result(object, path, defaultValue) {
      var result = object == null ? undefined : object[path];
      if (result === undefined) {
        if (object != null && !isKey(path, object)) {
          path = toPath(path);
          object = path.length == 1 ? object : baseGet(object, baseSlice(path, 0, -1));
          result = object == null ? undefined : object[last(path)];
        }
        result = result === undefined ? defaultValue : result;
      }
      return isFunction(result) ? result.call(object) : result;
    }

    /**
     * Sets the property value of `path` on `object`. If a portion of `path`
     * does not exist it is created.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The object to augment.
     * @param {Array|string} path The path of the property to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns `object`.
     * @example
     *
     * var object = { 'a': [{ 'b': { 'c': 3 } }] };
     *
     * _.set(object, 'a[0].b.c', 4);
     * console.log(object.a[0].b.c);
     * // => 4
     *
     * _.set(object, 'x[0].y.z', 5);
     * console.log(object.x[0].y.z);
     * // => 5
     */
    function set(object, path, value) {
      if (object == null) {
        return object;
      }
      var pathKey = (path + '');
      path = (object[pathKey] != null || isKey(path, object)) ? [pathKey] : toPath(path);

      var index = -1,
          length = path.length,
          lastIndex = length - 1,
          nested = object;

      while (nested != null && ++index < length) {
        var key = path[index];
        if (isObject(nested)) {
          if (index == lastIndex) {
            nested[key] = value;
          } else if (nested[key] == null) {
            nested[key] = isIndex(path[index + 1]) ? [] : {};
          }
        }
        nested = nested[key];
      }
      return object;
    }

    /**
     * An alternative to `_.reduce`; this method transforms `object` to a new
     * `accumulator` object which is the result of running each of its own enumerable
     * properties through `iteratee`, with each invocation potentially mutating
     * the `accumulator` object. The `iteratee` is bound to `thisArg` and invoked
     * with four arguments: (accumulator, value, key, object). Iteratee functions
     * may exit iteration early by explicitly returning `false`.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Array|Object} object The object to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @param {*} [accumulator] The custom accumulator value.
     * @param {*} [thisArg] The `this` binding of `iteratee`.
     * @returns {*} Returns the accumulated value.
     * @example
     *
     * _.transform([2, 3, 4], function(result, n) {
     *   result.push(n *= n);
     *   return n % 2 == 0;
     * });
     * // => [4, 9]
     *
     * _.transform({ 'a': 1, 'b': 2 }, function(result, n, key) {
     *   result[key] = n * 3;
     * });
     * // => { 'a': 3, 'b': 6 }
     */
    function transform(object, iteratee, accumulator, thisArg) {
      var isArr = isArray(object) || isTypedArray(object);
      iteratee = getCallback(iteratee, thisArg, 4);

      if (accumulator == null) {
        if (isArr || isObject(object)) {
          var Ctor = object.constructor;
          if (isArr) {
            accumulator = isArray(object) ? new Ctor : [];
          } else {
            accumulator = baseCreate(isFunction(Ctor) ? Ctor.prototype : null);
          }
        } else {
          accumulator = {};
        }
      }
      (isArr ? arrayEach : baseForOwn)(object, function(value, index, object) {
        return iteratee(accumulator, value, index, object);
      });
      return accumulator;
    }

    /**
     * Creates an array of the own enumerable property values of `object`.
     *
     * **Note:** Non-object values are coerced to objects.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property values.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.values(new Foo);
     * // => [1, 2] (iteration order is not guaranteed)
     *
     * _.values('hi');
     * // => ['h', 'i']
     */
    function values(object) {
      return baseValues(object, keys(object));
    }

    /**
     * Creates an array of the own and inherited enumerable property values
     * of `object`.
     *
     * **Note:** Non-object values are coerced to objects.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property values.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.valuesIn(new Foo);
     * // => [1, 2, 3] (iteration order is not guaranteed)
     */
    function valuesIn(object) {
      return baseValues(object, keysIn(object));
    }

    /*------------------------------------------------------------------------*/

    /**
     * Checks if `n` is between `start` and up to but not including, `end`. If
     * `end` is not specified it is set to `start` with `start` then set to `0`.
     *
     * @static
     * @memberOf _
     * @category Number
     * @param {number} n The number to check.
     * @param {number} [start=0] The start of the range.
     * @param {number} end The end of the range.
     * @returns {boolean} Returns `true` if `n` is in the range, else `false`.
     * @example
     *
     * _.inRange(3, 2, 4);
     * // => true
     *
     * _.inRange(4, 8);
     * // => true
     *
     * _.inRange(4, 2);
     * // => false
     *
     * _.inRange(2, 2);
     * // => false
     *
     * _.inRange(1.2, 2);
     * // => true
     *
     * _.inRange(5.2, 4);
     * // => false
     */
    function inRange(value, start, end) {
      start = +start || 0;
      if (typeof end === 'undefined') {
        end = start;
        start = 0;
      } else {
        end = +end || 0;
      }
      return value >= nativeMin(start, end) && value < nativeMax(start, end);
    }

    /**
     * Produces a random number between `min` and `max` (inclusive). If only one
     * argument is provided a number between `0` and the given number is returned.
     * If `floating` is `true`, or either `min` or `max` are floats, a floating-point
     * number is returned instead of an integer.
     *
     * @static
     * @memberOf _
     * @category Number
     * @param {number} [min=0] The minimum possible value.
     * @param {number} [max=1] The maximum possible value.
     * @param {boolean} [floating] Specify returning a floating-point number.
     * @returns {number} Returns the random number.
     * @example
     *
     * _.random(0, 5);
     * // => an integer between 0 and 5
     *
     * _.random(5);
     * // => also an integer between 0 and 5
     *
     * _.random(5, true);
     * // => a floating-point number between 0 and 5
     *
     * _.random(1.2, 5.2);
     * // => a floating-point number between 1.2 and 5.2
     */
    function random(min, max, floating) {
      if (floating && isIterateeCall(min, max, floating)) {
        max = floating = null;
      }
      var noMin = min == null,
          noMax = max == null;

      if (floating == null) {
        if (noMax && typeof min == 'boolean') {
          floating = min;
          min = 1;
        }
        else if (typeof max == 'boolean') {
          floating = max;
          noMax = true;
        }
      }
      if (noMin && noMax) {
        max = 1;
        noMax = false;
      }
      min = +min || 0;
      if (noMax) {
        max = min;
        min = 0;
      } else {
        max = +max || 0;
      }
      if (floating || min % 1 || max % 1) {
        var rand = nativeRandom();
        return nativeMin(min + (rand * (max - min + parseFloat('1e-' + ((rand + '').length - 1)))), max);
      }
      return baseRandom(min, max);
    }

    /*------------------------------------------------------------------------*/

    /**
     * Converts `string` to [camel case](https://en.wikipedia.org/wiki/CamelCase).
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to convert.
     * @returns {string} Returns the camel cased string.
     * @example
     *
     * _.camelCase('Foo Bar');
     * // => 'fooBar'
     *
     * _.camelCase('--foo-bar');
     * // => 'fooBar'
     *
     * _.camelCase('__foo_bar__');
     * // => 'fooBar'
     */
    var camelCase = createCompounder(function(result, word, index) {
      word = word.toLowerCase();
      return result + (index ? (word.charAt(0).toUpperCase() + word.slice(1)) : word);
    });

    /**
     * Capitalizes the first character of `string`.
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to capitalize.
     * @returns {string} Returns the capitalized string.
     * @example
     *
     * _.capitalize('fred');
     * // => 'Fred'
     */
    function capitalize(string) {
      string = baseToString(string);
      return string && (string.charAt(0).toUpperCase() + string.slice(1));
    }

    /**
     * Deburrs `string` by converting [latin-1 supplementary letters](https://en.wikipedia.org/wiki/Latin-1_Supplement_(Unicode_block)#Character_table)
     * to basic latin letters and removing [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks).
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to deburr.
     * @returns {string} Returns the deburred string.
     * @example
     *
     * _.deburr('déjà vu');
     * // => 'deja vu'
     */
    function deburr(string) {
      string = baseToString(string);
      return string && string.replace(reLatin1, deburrLetter).replace(reComboMark, '');
    }

    /**
     * Checks if `string` ends with the given target string.
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to search.
     * @param {string} [target] The string to search for.
     * @param {number} [position=string.length] The position to search from.
     * @returns {boolean} Returns `true` if `string` ends with `target`, else `false`.
     * @example
     *
     * _.endsWith('abc', 'c');
     * // => true
     *
     * _.endsWith('abc', 'b');
     * // => false
     *
     * _.endsWith('abc', 'b', 2);
     * // => true
     */
    function endsWith(string, target, position) {
      string = baseToString(string);
      target = (target + '');

      var length = string.length;
      position = position === undefined
        ? length
        : nativeMin(position < 0 ? 0 : (+position || 0), length);

      position -= target.length;
      return position >= 0 && string.indexOf(target, position) == position;
    }

    /**
     * Converts the characters "&", "<", ">", '"', "'", and "\`", in `string` to
     * their corresponding HTML entities.
     *
     * **Note:** No other characters are escaped. To escape additional characters
     * use a third-party library like [_he_](https://mths.be/he).
     *
     * Though the ">" character is escaped for symmetry, characters like
     * ">" and "/" don't need escaping in HTML and have no special meaning
     * unless they're part of a tag or unquoted attribute value.
     * See [Mathias Bynens's article](https://mathiasbynens.be/notes/ambiguous-ampersands)
     * (under "semi-related fun fact") for more details.
     *
     * Backticks are escaped because in Internet Explorer < 9, they can break out
     * of attribute values or HTML comments. See [#59](https://html5sec.org/#59),
     * [#102](https://html5sec.org/#102), [#108](https://html5sec.org/#108), and
     * [#133](https://html5sec.org/#133) of the [HTML5 Security Cheatsheet](https://html5sec.org/)
     * for more details.
     *
     * When working with HTML you should always [quote attribute values](http://wonko.com/post/html-escaping)
     * to reduce XSS vectors.
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to escape.
     * @returns {string} Returns the escaped string.
     * @example
     *
     * _.escape('fred, barney, & pebbles');
     * // => 'fred, barney, &amp; pebbles'
     */
    function escape(string) {
      // Reset `lastIndex` because in IE < 9 `String#replace` does not.
      string = baseToString(string);
      return (string && reHasUnescapedHtml.test(string))
        ? string.replace(reUnescapedHtml, escapeHtmlChar)
        : string;
    }

    /**
     * Escapes the `RegExp` special characters "\", "/", "^", "$", ".", "|", "?",
     * "*", "+", "(", ")", "[", "]", "{" and "}" in `string`.
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to escape.
     * @returns {string} Returns the escaped string.
     * @example
     *
     * _.escapeRegExp('[lodash](https://lodash.com/)');
     * // => '\[lodash\]\(https:\/\/lodash\.com\/\)'
     */
    function escapeRegExp(string) {
      string = baseToString(string);
      return (string && reHasRegExpChars.test(string))
        ? string.replace(reRegExpChars, '\\$&')
        : string;
    }

    /**
     * Converts `string` to [kebab case](https://en.wikipedia.org/wiki/Letter_case#Special_case_styles).
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to convert.
     * @returns {string} Returns the kebab cased string.
     * @example
     *
     * _.kebabCase('Foo Bar');
     * // => 'foo-bar'
     *
     * _.kebabCase('fooBar');
     * // => 'foo-bar'
     *
     * _.kebabCase('__foo_bar__');
     * // => 'foo-bar'
     */
    var kebabCase = createCompounder(function(result, word, index) {
      return result + (index ? '-' : '') + word.toLowerCase();
    });

    /**
     * Pads `string` on the left and right sides if it's shorter than `length`.
     * Padding characters are truncated if they can't be evenly divided by `length`.
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to pad.
     * @param {number} [length=0] The padding length.
     * @param {string} [chars=' '] The string used as padding.
     * @returns {string} Returns the padded string.
     * @example
     *
     * _.pad('abc', 8);
     * // => '  abc   '
     *
     * _.pad('abc', 8, '_-');
     * // => '_-abc_-_'
     *
     * _.pad('abc', 3);
     * // => 'abc'
     */
    function pad(string, length, chars) {
      string = baseToString(string);
      length = +length;

      var strLength = string.length;
      if (strLength >= length || !nativeIsFinite(length)) {
        return string;
      }
      var mid = (length - strLength) / 2,
          leftLength = floor(mid),
          rightLength = ceil(mid);

      chars = createPadding('', rightLength, chars);
      return chars.slice(0, leftLength) + string + chars;
    }

    /**
     * Pads `string` on the left side if it's shorter than `length`. Padding
     * characters are truncated if they exceed `length`.
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to pad.
     * @param {number} [length=0] The padding length.
     * @param {string} [chars=' '] The string used as padding.
     * @returns {string} Returns the padded string.
     * @example
     *
     * _.padLeft('abc', 6);
     * // => '   abc'
     *
     * _.padLeft('abc', 6, '_-');
     * // => '_-_abc'
     *
     * _.padLeft('abc', 3);
     * // => 'abc'
     */
    var padLeft = createPadDir();

    /**
     * Pads `string` on the right side if it's shorter than `length`. Padding
     * characters are truncated if they exceed `length`.
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to pad.
     * @param {number} [length=0] The padding length.
     * @param {string} [chars=' '] The string used as padding.
     * @returns {string} Returns the padded string.
     * @example
     *
     * _.padRight('abc', 6);
     * // => 'abc   '
     *
     * _.padRight('abc', 6, '_-');
     * // => 'abc_-_'
     *
     * _.padRight('abc', 3);
     * // => 'abc'
     */
    var padRight = createPadDir(true);

    /**
     * Converts `string` to an integer of the specified radix. If `radix` is
     * `undefined` or `0`, a `radix` of `10` is used unless `value` is a hexadecimal,
     * in which case a `radix` of `16` is used.
     *
     * **Note:** This method aligns with the [ES5 implementation](https://es5.github.io/#E)
     * of `parseInt`.
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} string The string to convert.
     * @param {number} [radix] The radix to interpret `value` by.
     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
     * @returns {number} Returns the converted integer.
     * @example
     *
     * _.parseInt('08');
     * // => 8
     *
     * _.map(['6', '08', '10'], _.parseInt);
     * // => [6, 8, 10]
     */
    function parseInt(string, radix, guard) {
      if (guard && isIterateeCall(string, radix, guard)) {
        radix = 0;
      }
      return nativeParseInt(string, radix);
    }
    // Fallback for environments with pre-ES5 implementations.
    if (nativeParseInt(whitespace + '08') != 8) {
      parseInt = function(string, radix, guard) {
        // Firefox < 21 and Opera < 15 follow ES3 for `parseInt`.
        // Chrome fails to trim leading <BOM> whitespace characters.
        // See https://code.google.com/p/v8/issues/detail?id=3109 for more details.
        if (guard ? isIterateeCall(string, radix, guard) : radix == null) {
          radix = 0;
        } else if (radix) {
          radix = +radix;
        }
        string = trim(string);
        return nativeParseInt(string, radix || (reHasHexPrefix.test(string) ? 16 : 10));
      };
    }

    /**
     * Repeats the given string `n` times.
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to repeat.
     * @param {number} [n=0] The number of times to repeat the string.
     * @returns {string} Returns the repeated string.
     * @example
     *
     * _.repeat('*', 3);
     * // => '***'
     *
     * _.repeat('abc', 2);
     * // => 'abcabc'
     *
     * _.repeat('abc', 0);
     * // => ''
     */
    function repeat(string, n) {
      var result = '';
      string = baseToString(string);
      n = +n;
      if (n < 1 || !string || !nativeIsFinite(n)) {
        return result;
      }
      // Leverage the exponentiation by squaring algorithm for a faster repeat.
      // See https://en.wikipedia.org/wiki/Exponentiation_by_squaring for more details.
      do {
        if (n % 2) {
          result += string;
        }
        n = floor(n / 2);
        string += string;
      } while (n);

      return result;
    }

    /**
     * Converts `string` to [snake case](https://en.wikipedia.org/wiki/Snake_case).
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to convert.
     * @returns {string} Returns the snake cased string.
     * @example
     *
     * _.snakeCase('Foo Bar');
     * // => 'foo_bar'
     *
     * _.snakeCase('fooBar');
     * // => 'foo_bar'
     *
     * _.snakeCase('--foo-bar');
     * // => 'foo_bar'
     */
    var snakeCase = createCompounder(function(result, word, index) {
      return result + (index ? '_' : '') + word.toLowerCase();
    });

    /**
     * Converts `string` to [start case](https://en.wikipedia.org/wiki/Letter_case#Stylistic_or_specialised_usage).
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to convert.
     * @returns {string} Returns the start cased string.
     * @example
     *
     * _.startCase('--foo-bar');
     * // => 'Foo Bar'
     *
     * _.startCase('fooBar');
     * // => 'Foo Bar'
     *
     * _.startCase('__foo_bar__');
     * // => 'Foo Bar'
     */
    var startCase = createCompounder(function(result, word, index) {
      return result + (index ? ' ' : '') + (word.charAt(0).toUpperCase() + word.slice(1));
    });

    /**
     * Checks if `string` starts with the given target string.
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to search.
     * @param {string} [target] The string to search for.
     * @param {number} [position=0] The position to search from.
     * @returns {boolean} Returns `true` if `string` starts with `target`, else `false`.
     * @example
     *
     * _.startsWith('abc', 'a');
     * // => true
     *
     * _.startsWith('abc', 'b');
     * // => false
     *
     * _.startsWith('abc', 'b', 1);
     * // => true
     */
    function startsWith(string, target, position) {
      string = baseToString(string);
      position = position == null
        ? 0
        : nativeMin(position < 0 ? 0 : (+position || 0), string.length);

      return string.lastIndexOf(target, position) == position;
    }

    /**
     * Creates a compiled template function that can interpolate data properties
     * in "interpolate" delimiters, HTML-escape interpolated data properties in
     * "escape" delimiters, and execute JavaScript in "evaluate" delimiters. Data
     * properties may be accessed as free variables in the template. If a setting
     * object is provided it takes precedence over `_.templateSettings` values.
     *
     * **Note:** In the development build `_.template` utilizes
     * [sourceURLs](http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/#toc-sourceurl)
     * for easier debugging.
     *
     * For more information on precompiling templates see
     * [lodash's custom builds documentation](https://lodash.com/custom-builds).
     *
     * For more information on Chrome extension sandboxes see
     * [Chrome's extensions documentation](https://developer.chrome.com/extensions/sandboxingEval).
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The template string.
     * @param {Object} [options] The options object.
     * @param {RegExp} [options.escape] The HTML "escape" delimiter.
     * @param {RegExp} [options.evaluate] The "evaluate" delimiter.
     * @param {Object} [options.imports] An object to import into the template as free variables.
     * @param {RegExp} [options.interpolate] The "interpolate" delimiter.
     * @param {string} [options.sourceURL] The sourceURL of the template's compiled source.
     * @param {string} [options.variable] The data object variable name.
     * @param- {Object} [otherOptions] Enables the legacy `options` param signature.
     * @returns {Function} Returns the compiled template function.
     * @example
     *
     * // using the "interpolate" delimiter to create a compiled template
     * var compiled = _.template('hello <%= user %>!');
     * compiled({ 'user': 'fred' });
     * // => 'hello fred!'
     *
     * // using the HTML "escape" delimiter to escape data property values
     * var compiled = _.template('<b><%- value %></b>');
     * compiled({ 'value': '<script>' });
     * // => '<b>&lt;script&gt;</b>'
     *
     * // using the "evaluate" delimiter to execute JavaScript and generate HTML
     * var compiled = _.template('<% _.forEach(users, function(user) { %><li><%- user %></li><% }); %>');
     * compiled({ 'users': ['fred', 'barney'] });
     * // => '<li>fred</li><li>barney</li>'
     *
     * // using the internal `print` function in "evaluate" delimiters
     * var compiled = _.template('<% print("hello " + user); %>!');
     * compiled({ 'user': 'barney' });
     * // => 'hello barney!'
     *
     * // using the ES delimiter as an alternative to the default "interpolate" delimiter
     * var compiled = _.template('hello ${ user }!');
     * compiled({ 'user': 'pebbles' });
     * // => 'hello pebbles!'
     *
     * // using custom template delimiters
     * _.templateSettings.interpolate = /{{([\s\S]+?)}}/g;
     * var compiled = _.template('hello {{ user }}!');
     * compiled({ 'user': 'mustache' });
     * // => 'hello mustache!'
     *
     * // using backslashes to treat delimiters as plain text
     * var compiled = _.template('<%= "\\<%- value %\\>" %>');
     * compiled({ 'value': 'ignored' });
     * // => '<%- value %>'
     *
     * // using the `imports` option to import `jQuery` as `jq`
     * var text = '<% jq.each(users, function(user) { %><li><%- user %></li><% }); %>';
     * var compiled = _.template(text, { 'imports': { 'jq': jQuery } });
     * compiled({ 'users': ['fred', 'barney'] });
     * // => '<li>fred</li><li>barney</li>'
     *
     * // using the `sourceURL` option to specify a custom sourceURL for the template
     * var compiled = _.template('hello <%= user %>!', { 'sourceURL': '/basic/greeting.jst' });
     * compiled(data);
     * // => find the source of "greeting.jst" under the Sources tab or Resources panel of the web inspector
     *
     * // using the `variable` option to ensure a with-statement isn't used in the compiled template
     * var compiled = _.template('hi <%= data.user %>!', { 'variable': 'data' });
     * compiled.source;
     * // => function(data) {
     * //   var __t, __p = '';
     * //   __p += 'hi ' + ((__t = ( data.user )) == null ? '' : __t) + '!';
     * //   return __p;
     * // }
     *
     * // using the `source` property to inline compiled templates for meaningful
     * // line numbers in error messages and a stack trace
     * fs.writeFileSync(path.join(cwd, 'jst.js'), '\
     *   var JST = {\
     *     "main": ' + _.template(mainText).source + '\
     *   };\
     * ');
     */
    function template(string, options, otherOptions) {
      // Based on John Resig's `tmpl` implementation (http://ejohn.org/blog/javascript-micro-templating/)
      // and Laura Doktorova's doT.js (https://github.com/olado/doT).
      var settings = lodash.templateSettings;

      if (otherOptions && isIterateeCall(string, options, otherOptions)) {
        options = otherOptions = null;
      }
      string = baseToString(string);
      options = assignWith(baseAssign({}, otherOptions || options), settings, assignOwnDefaults);

      var imports = assignWith(baseAssign({}, options.imports), settings.imports, assignOwnDefaults),
          importsKeys = keys(imports),
          importsValues = baseValues(imports, importsKeys);

      var isEscaping,
          isEvaluating,
          index = 0,
          interpolate = options.interpolate || reNoMatch,
          source = "__p += '";

      // Compile the regexp to match each delimiter.
      var reDelimiters = RegExp(
        (options.escape || reNoMatch).source + '|' +
        interpolate.source + '|' +
        (interpolate === reInterpolate ? reEsTemplate : reNoMatch).source + '|' +
        (options.evaluate || reNoMatch).source + '|$'
      , 'g');

      // Use a sourceURL for easier debugging.
      var sourceURL = '//# sourceURL=' +
        ('sourceURL' in options
          ? options.sourceURL
          : ('lodash.templateSources[' + (++templateCounter) + ']')
        ) + '\n';

      string.replace(reDelimiters, function(match, escapeValue, interpolateValue, esTemplateValue, evaluateValue, offset) {
        interpolateValue || (interpolateValue = esTemplateValue);

        // Escape characters that can't be included in string literals.
        source += string.slice(index, offset).replace(reUnescapedString, escapeStringChar);

        // Replace delimiters with snippets.
        if (escapeValue) {
          isEscaping = true;
          source += "' +\n__e(" + escapeValue + ") +\n'";
        }
        if (evaluateValue) {
          isEvaluating = true;
          source += "';\n" + evaluateValue + ";\n__p += '";
        }
        if (interpolateValue) {
          source += "' +\n((__t = (" + interpolateValue + ")) == null ? '' : __t) +\n'";
        }
        index = offset + match.length;

        // The JS engine embedded in Adobe products requires returning the `match`
        // string in order to produce the correct `offset` value.
        return match;
      });

      source += "';\n";

      // If `variable` is not specified wrap a with-statement around the generated
      // code to add the data object to the top of the scope chain.
      var variable = options.variable;
      if (!variable) {
        source = 'with (obj) {\n' + source + '\n}\n';
      }
      // Cleanup code by stripping empty strings.
      source = (isEvaluating ? source.replace(reEmptyStringLeading, '') : source)
        .replace(reEmptyStringMiddle, '$1')
        .replace(reEmptyStringTrailing, '$1;');

      // Frame code as the function body.
      source = 'function(' + (variable || 'obj') + ') {\n' +
        (variable
          ? ''
          : 'obj || (obj = {});\n'
        ) +
        "var __t, __p = ''" +
        (isEscaping
           ? ', __e = _.escape'
           : ''
        ) +
        (isEvaluating
          ? ', __j = Array.prototype.join;\n' +
            "function print() { __p += __j.call(arguments, '') }\n"
          : ';\n'
        ) +
        source +
        'return __p\n}';

      var result = attempt(function() {
        return Function(importsKeys, sourceURL + 'return ' + source).apply(undefined, importsValues);
      });

      // Provide the compiled function's source by its `toString` method or
      // the `source` property as a convenience for inlining compiled templates.
      result.source = source;
      if (isError(result)) {
        throw result;
      }
      return result;
    }

    /**
     * Removes leading and trailing whitespace or specified characters from `string`.
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to trim.
     * @param {string} [chars=whitespace] The characters to trim.
     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
     * @returns {string} Returns the trimmed string.
     * @example
     *
     * _.trim('  abc  ');
     * // => 'abc'
     *
     * _.trim('-_-abc-_-', '_-');
     * // => 'abc'
     *
     * _.map(['  foo  ', '  bar  '], _.trim);
     * // => ['foo', 'bar']
     */
    function trim(string, chars, guard) {
      var value = string;
      string = baseToString(string);
      if (!string) {
        return string;
      }
      if (guard ? isIterateeCall(value, chars, guard) : chars == null) {
        return string.slice(trimmedLeftIndex(string), trimmedRightIndex(string) + 1);
      }
      chars = (chars + '');
      return string.slice(charsLeftIndex(string, chars), charsRightIndex(string, chars) + 1);
    }

    /**
     * Removes leading whitespace or specified characters from `string`.
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to trim.
     * @param {string} [chars=whitespace] The characters to trim.
     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
     * @returns {string} Returns the trimmed string.
     * @example
     *
     * _.trimLeft('  abc  ');
     * // => 'abc  '
     *
     * _.trimLeft('-_-abc-_-', '_-');
     * // => 'abc-_-'
     */
    function trimLeft(string, chars, guard) {
      var value = string;
      string = baseToString(string);
      if (!string) {
        return string;
      }
      if (guard ? isIterateeCall(value, chars, guard) : chars == null) {
        return string.slice(trimmedLeftIndex(string));
      }
      return string.slice(charsLeftIndex(string, (chars + '')));
    }

    /**
     * Removes trailing whitespace or specified characters from `string`.
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to trim.
     * @param {string} [chars=whitespace] The characters to trim.
     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
     * @returns {string} Returns the trimmed string.
     * @example
     *
     * _.trimRight('  abc  ');
     * // => '  abc'
     *
     * _.trimRight('-_-abc-_-', '_-');
     * // => '-_-abc'
     */
    function trimRight(string, chars, guard) {
      var value = string;
      string = baseToString(string);
      if (!string) {
        return string;
      }
      if (guard ? isIterateeCall(value, chars, guard) : chars == null) {
        return string.slice(0, trimmedRightIndex(string) + 1);
      }
      return string.slice(0, charsRightIndex(string, (chars + '')) + 1);
    }

    /**
     * Truncates `string` if it's longer than the given maximum string length.
     * The last characters of the truncated string are replaced with the omission
     * string which defaults to "...".
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to truncate.
     * @param {Object|number} [options] The options object or maximum string length.
     * @param {number} [options.length=30] The maximum string length.
     * @param {string} [options.omission='...'] The string to indicate text is omitted.
     * @param {RegExp|string} [options.separator] The separator pattern to truncate to.
     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
     * @returns {string} Returns the truncated string.
     * @example
     *
     * _.trunc('hi-diddly-ho there, neighborino');
     * // => 'hi-diddly-ho there, neighbo...'
     *
     * _.trunc('hi-diddly-ho there, neighborino', 24);
     * // => 'hi-diddly-ho there, n...'
     *
     * _.trunc('hi-diddly-ho there, neighborino', {
     *   'length': 24,
     *   'separator': ' '
     * });
     * // => 'hi-diddly-ho there,...'
     *
     * _.trunc('hi-diddly-ho there, neighborino', {
     *   'length': 24,
     *   'separator': /,? +/
     * });
     * // => 'hi-diddly-ho there...'
     *
     * _.trunc('hi-diddly-ho there, neighborino', {
     *   'omission': ' [...]'
     * });
     * // => 'hi-diddly-ho there, neig [...]'
     */
    function trunc(string, options, guard) {
      if (guard && isIterateeCall(string, options, guard)) {
        options = null;
      }
      var length = DEFAULT_TRUNC_LENGTH,
          omission = DEFAULT_TRUNC_OMISSION;

      if (options != null) {
        if (isObject(options)) {
          var separator = 'separator' in options ? options.separator : separator;
          length = 'length' in options ? (+options.length || 0) : length;
          omission = 'omission' in options ? baseToString(options.omission) : omission;
        } else {
          length = +options || 0;
        }
      }
      string = baseToString(string);
      if (length >= string.length) {
        return string;
      }
      var end = length - omission.length;
      if (end < 1) {
        return omission;
      }
      var result = string.slice(0, end);
      if (separator == null) {
        return result + omission;
      }
      if (isRegExp(separator)) {
        if (string.slice(end).search(separator)) {
          var match,
              newEnd,
              substring = string.slice(0, end);

          if (!separator.global) {
            separator = RegExp(separator.source, (reFlags.exec(separator) || '') + 'g');
          }
          separator.lastIndex = 0;
          while ((match = separator.exec(substring))) {
            newEnd = match.index;
          }
          result = result.slice(0, newEnd == null ? end : newEnd);
        }
      } else if (string.indexOf(separator, end) != end) {
        var index = result.lastIndexOf(separator);
        if (index > -1) {
          result = result.slice(0, index);
        }
      }
      return result + omission;
    }

    /**
     * The inverse of `_.escape`; this method converts the HTML entities
     * `&amp;`, `&lt;`, `&gt;`, `&quot;`, `&#39;`, and `&#96;` in `string` to their
     * corresponding characters.
     *
     * **Note:** No other HTML entities are unescaped. To unescape additional HTML
     * entities use a third-party library like [_he_](https://mths.be/he).
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to unescape.
     * @returns {string} Returns the unescaped string.
     * @example
     *
     * _.unescape('fred, barney, &amp; pebbles');
     * // => 'fred, barney, & pebbles'
     */
    function unescape(string) {
      string = baseToString(string);
      return (string && reHasEscapedHtml.test(string))
        ? string.replace(reEscapedHtml, unescapeHtmlChar)
        : string;
    }

    /**
     * Splits `string` into an array of its words.
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to inspect.
     * @param {RegExp|string} [pattern] The pattern to match words.
     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
     * @returns {Array} Returns the words of `string`.
     * @example
     *
     * _.words('fred, barney, & pebbles');
     * // => ['fred', 'barney', 'pebbles']
     *
     * _.words('fred, barney, & pebbles', /[^, ]+/g);
     * // => ['fred', 'barney', '&', 'pebbles']
     */
    function words(string, pattern, guard) {
      if (guard && isIterateeCall(string, pattern, guard)) {
        pattern = null;
      }
      string = baseToString(string);
      return string.match(pattern || reWords) || [];
    }

    /*------------------------------------------------------------------------*/

    /**
     * Attempts to invoke `func`, returning either the result or the caught error
     * object. Any additional arguments are provided to `func` when it is invoked.
     *
     * @static
     * @memberOf _
     * @category Utility
     * @param {Function} func The function to attempt.
     * @returns {*} Returns the `func` result or error object.
     * @example
     *
     * // avoid throwing errors for invalid selectors
     * var elements = _.attempt(function(selector) {
     *   return document.querySelectorAll(selector);
     * }, '>_>');
     *
     * if (_.isError(elements)) {
     *   elements = [];
     * }
     */
    var attempt = restParam(function(func, args) {
      try {
        return func.apply(undefined, args);
      } catch(e) {
        return isError(e) ? e : new Error(e);
      }
    });

    /**
     * Creates a function that invokes `func` with the `this` binding of `thisArg`
     * and arguments of the created function. If `func` is a property name the
     * created callback returns the property value for a given element. If `func`
     * is an object the created callback returns `true` for elements that contain
     * the equivalent object properties, otherwise it returns `false`.
     *
     * @static
     * @memberOf _
     * @alias iteratee
     * @category Utility
     * @param {*} [func=_.identity] The value to convert to a callback.
     * @param {*} [thisArg] The `this` binding of `func`.
     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
     * @returns {Function} Returns the callback.
     * @example
     *
     * var users = [
     *   { 'user': 'barney', 'age': 36 },
     *   { 'user': 'fred',   'age': 40 }
     * ];
     *
     * // wrap to create custom callback shorthands
     * _.callback = _.wrap(_.callback, function(callback, func, thisArg) {
     *   var match = /^(.+?)__([gl]t)(.+)$/.exec(func);
     *   if (!match) {
     *     return callback(func, thisArg);
     *   }
     *   return function(object) {
     *     return match[2] == 'gt'
     *       ? object[match[1]] > match[3]
     *       : object[match[1]] < match[3];
     *   };
     * });
     *
     * _.filter(users, 'age__gt36');
     * // => [{ 'user': 'fred', 'age': 40 }]
     */
    function callback(func, thisArg, guard) {
      if (guard && isIterateeCall(func, thisArg, guard)) {
        thisArg = null;
      }
      return isObjectLike(func)
        ? matches(func)
        : baseCallback(func, thisArg);
    }

    /**
     * Creates a function that returns `value`.
     *
     * @static
     * @memberOf _
     * @category Utility
     * @param {*} value The value to return from the new function.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var object = { 'user': 'fred' };
     * var getter = _.constant(object);
     *
     * getter() === object;
     * // => true
     */
    function constant(value) {
      return function() {
        return value;
      };
    }

    /**
     * This method returns the first argument provided to it.
     *
     * @static
     * @memberOf _
     * @category Utility
     * @param {*} value Any value.
     * @returns {*} Returns `value`.
     * @example
     *
     * var object = { 'user': 'fred' };
     *
     * _.identity(object) === object;
     * // => true
     */
    function identity(value) {
      return value;
    }

    /**
     * Creates a function that performs a deep comparison between a given object
     * and `source`, returning `true` if the given object has equivalent property
     * values, else `false`.
     *
     * **Note:** This method supports comparing arrays, booleans, `Date` objects,
     * numbers, `Object` objects, regexes, and strings. Objects are compared by
     * their own, not inherited, enumerable properties. For comparing a single
     * own or inherited property value see `_.matchesProperty`.
     *
     * @static
     * @memberOf _
     * @category Utility
     * @param {Object} source The object of property values to match.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var users = [
     *   { 'user': 'barney', 'age': 36, 'active': true },
     *   { 'user': 'fred',   'age': 40, 'active': false }
     * ];
     *
     * _.filter(users, _.matches({ 'age': 40, 'active': false }));
     * // => [{ 'user': 'fred', 'age': 40, 'active': false }]
     */
    function matches(source) {
      return baseMatches(baseClone(source, true));
    }

    /**
     * Creates a function that compares the property value of `path` on a given
     * object to `value`.
     *
     * **Note:** This method supports comparing arrays, booleans, `Date` objects,
     * numbers, `Object` objects, regexes, and strings. Objects are compared by
     * their own, not inherited, enumerable properties.
     *
     * @static
     * @memberOf _
     * @category Utility
     * @param {Array|string} path The path of the property to get.
     * @param {*} srcValue The value to match.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var users = [
     *   { 'user': 'barney' },
     *   { 'user': 'fred' }
     * ];
     *
     * _.find(users, _.matchesProperty('user', 'fred'));
     * // => { 'user': 'fred' }
     */
    function matchesProperty(path, srcValue) {
      return baseMatchesProperty(path, baseClone(srcValue, true));
    }

    /**
     * Creates a function that invokes the method at `path` on a given object.
     * Any additional arguments are provided to the invoked method.
     *
     * @static
     * @memberOf _
     * @category Utility
     * @param {Array|string} path The path of the method to invoke.
     * @param {...*} [args] The arguments to invoke the method with.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var objects = [
     *   { 'a': { 'b': { 'c': _.constant(2) } } },
     *   { 'a': { 'b': { 'c': _.constant(1) } } }
     * ];
     *
     * _.map(objects, _.method('a.b.c'));
     * // => [2, 1]
     *
     * _.invoke(_.sortBy(objects, _.method(['a', 'b', 'c'])), 'a.b.c');
     * // => [1, 2]
     */
    var method = restParam(function(path, args) {
      return function(object) {
        return invokePath(object, path, args);
      };
    });

    /**
     * The opposite of `_.method`; this method creates a function that invokes
     * the method at a given path on `object`. Any additional arguments are
     * provided to the invoked method.
     *
     * @static
     * @memberOf _
     * @category Utility
     * @param {Object} object The object to query.
     * @param {...*} [args] The arguments to invoke the method with.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var array = _.times(3, _.constant),
     *     object = { 'a': array, 'b': array, 'c': array };
     *
     * _.map(['a[2]', 'c[0]'], _.methodOf(object));
     * // => [2, 0]
     *
     * _.map([['a', '2'], ['c', '0']], _.methodOf(object));
     * // => [2, 0]
     */
    var methodOf = restParam(function(object, args) {
      return function(path) {
        return invokePath(object, path, args);
      };
    });

    /**
     * Adds all own enumerable function properties of a source object to the
     * destination object. If `object` is a function then methods are added to
     * its prototype as well.
     *
     * **Note:** Use `_.runInContext` to create a pristine `lodash` function to
     * avoid conflicts caused by modifying the original.
     *
     * @static
     * @memberOf _
     * @category Utility
     * @param {Function|Object} [object=lodash] The destination object.
     * @param {Object} source The object of functions to add.
     * @param {Object} [options] The options object.
     * @param {boolean} [options.chain=true] Specify whether the functions added
     *  are chainable.
     * @returns {Function|Object} Returns `object`.
     * @example
     *
     * function vowels(string) {
     *   return _.filter(string, function(v) {
     *     return /[aeiou]/i.test(v);
     *   });
     * }
     *
     * _.mixin({ 'vowels': vowels });
     * _.vowels('fred');
     * // => ['e']
     *
     * _('fred').vowels().value();
     * // => ['e']
     *
     * _.mixin({ 'vowels': vowels }, { 'chain': false });
     * _('fred').vowels();
     * // => ['e']
     */
    function mixin(object, source, options) {
      if (options == null) {
        var isObj = isObject(source),
            props = isObj ? keys(source) : null,
            methodNames = (props && props.length) ? baseFunctions(source, props) : null;

        if (!(methodNames ? methodNames.length : isObj)) {
          methodNames = false;
          options = source;
          source = object;
          object = this;
        }
      }
      if (!methodNames) {
        methodNames = baseFunctions(source, keys(source));
      }
      var chain = true,
          index = -1,
          isFunc = isFunction(object),
          length = methodNames.length;

      if (options === false) {
        chain = false;
      } else if (isObject(options) && 'chain' in options) {
        chain = options.chain;
      }
      while (++index < length) {
        var methodName = methodNames[index],
            func = source[methodName];

        object[methodName] = func;
        if (isFunc) {
          object.prototype[methodName] = (function(func) {
            return function() {
              var chainAll = this.__chain__;
              if (chain || chainAll) {
                var result = object(this.__wrapped__),
                    actions = result.__actions__ = arrayCopy(this.__actions__);

                actions.push({ 'func': func, 'args': arguments, 'thisArg': object });
                result.__chain__ = chainAll;
                return result;
              }
              var args = [this.value()];
              push.apply(args, arguments);
              return func.apply(object, args);
            };
          }(func));
        }
      }
      return object;
    }

    /**
     * Reverts the `_` variable to its previous value and returns a reference to
     * the `lodash` function.
     *
     * @static
     * @memberOf _
     * @category Utility
     * @returns {Function} Returns the `lodash` function.
     * @example
     *
     * var lodash = _.noConflict();
     */
    function noConflict() {
      context._ = oldDash;
      return this;
    }

    /**
     * A no-operation function that returns `undefined` regardless of the
     * arguments it receives.
     *
     * @static
     * @memberOf _
     * @category Utility
     * @example
     *
     * var object = { 'user': 'fred' };
     *
     * _.noop(object) === undefined;
     * // => true
     */
    function noop() {
      // No operation performed.
    }

    /**
     * Creates a function that returns the property value at `path` on a
     * given object.
     *
     * @static
     * @memberOf _
     * @category Utility
     * @param {Array|string} path The path of the property to get.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var objects = [
     *   { 'a': { 'b': { 'c': 2 } } },
     *   { 'a': { 'b': { 'c': 1 } } }
     * ];
     *
     * _.map(objects, _.property('a.b.c'));
     * // => [2, 1]
     *
     * _.pluck(_.sortBy(objects, _.property(['a', 'b', 'c'])), 'a.b.c');
     * // => [1, 2]
     */
    function property(path) {
      return isKey(path) ? baseProperty(path) : basePropertyDeep(path);
    }

    /**
     * The opposite of `_.property`; this method creates a function that returns
     * the property value at a given path on `object`.
     *
     * @static
     * @memberOf _
     * @category Utility
     * @param {Object} object The object to query.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var array = [0, 1, 2],
     *     object = { 'a': array, 'b': array, 'c': array };
     *
     * _.map(['a[2]', 'c[0]'], _.propertyOf(object));
     * // => [2, 0]
     *
     * _.map([['a', '2'], ['c', '0']], _.propertyOf(object));
     * // => [2, 0]
     */
    function propertyOf(object) {
      return function(path) {
        return baseGet(object, toPath(path), path + '');
      };
    }

    /**
     * Creates an array of numbers (positive and/or negative) progressing from
     * `start` up to, but not including, `end`. If `end` is not specified it is
     * set to `start` with `start` then set to `0`. If `end` is less than `start`
     * a zero-length range is created unless a negative `step` is specified.
     *
     * @static
     * @memberOf _
     * @category Utility
     * @param {number} [start=0] The start of the range.
     * @param {number} end The end of the range.
     * @param {number} [step=1] The value to increment or decrement by.
     * @returns {Array} Returns the new array of numbers.
     * @example
     *
     * _.range(4);
     * // => [0, 1, 2, 3]
     *
     * _.range(1, 5);
     * // => [1, 2, 3, 4]
     *
     * _.range(0, 20, 5);
     * // => [0, 5, 10, 15]
     *
     * _.range(0, -4, -1);
     * // => [0, -1, -2, -3]
     *
     * _.range(1, 4, 0);
     * // => [1, 1, 1]
     *
     * _.range(0);
     * // => []
     */
    function range(start, end, step) {
      if (step && isIterateeCall(start, end, step)) {
        end = step = null;
      }
      start = +start || 0;
      step = step == null ? 1 : (+step || 0);

      if (end == null) {
        end = start;
        start = 0;
      } else {
        end = +end || 0;
      }
      // Use `Array(length)` so engines like Chakra and V8 avoid slower modes.
      // See https://youtu.be/XAqIpGU8ZZk#t=17m25s for more details.
      var index = -1,
          length = nativeMax(ceil((end - start) / (step || 1)), 0),
          result = Array(length);

      while (++index < length) {
        result[index] = start;
        start += step;
      }
      return result;
    }

    /**
     * Invokes the iteratee function `n` times, returning an array of the results
     * of each invocation. The `iteratee` is bound to `thisArg` and invoked with
     * one argument; (index).
     *
     * @static
     * @memberOf _
     * @category Utility
     * @param {number} n The number of times to invoke `iteratee`.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @param {*} [thisArg] The `this` binding of `iteratee`.
     * @returns {Array} Returns the array of results.
     * @example
     *
     * var diceRolls = _.times(3, _.partial(_.random, 1, 6, false));
     * // => [3, 6, 4]
     *
     * _.times(3, function(n) {
     *   mage.castSpell(n);
     * });
     * // => invokes `mage.castSpell(n)` three times with `n` of `0`, `1`, and `2`
     *
     * _.times(3, function(n) {
     *   this.cast(n);
     * }, mage);
     * // => also invokes `mage.castSpell(n)` three times
     */
    function times(n, iteratee, thisArg) {
      n = floor(n);

      // Exit early to avoid a JSC JIT bug in Safari 8
      // where `Array(0)` is treated as `Array(1)`.
      if (n < 1 || !nativeIsFinite(n)) {
        return [];
      }
      var index = -1,
          result = Array(nativeMin(n, MAX_ARRAY_LENGTH));

      iteratee = bindCallback(iteratee, thisArg, 1);
      while (++index < n) {
        if (index < MAX_ARRAY_LENGTH) {
          result[index] = iteratee(index);
        } else {
          iteratee(index);
        }
      }
      return result;
    }

    /**
     * Generates a unique ID. If `prefix` is provided the ID is appended to it.
     *
     * @static
     * @memberOf _
     * @category Utility
     * @param {string} [prefix] The value to prefix the ID with.
     * @returns {string} Returns the unique ID.
     * @example
     *
     * _.uniqueId('contact_');
     * // => 'contact_104'
     *
     * _.uniqueId();
     * // => '105'
     */
    function uniqueId(prefix) {
      var id = ++idCounter;
      return baseToString(prefix) + id;
    }

    /*------------------------------------------------------------------------*/

    /**
     * Adds two numbers.
     *
     * @static
     * @memberOf _
     * @category Math
     * @param {number} augend The first number to add.
     * @param {number} addend The second number to add.
     * @returns {number} Returns the sum.
     * @example
     *
     * _.add(6, 4);
     * // => 10
     */
    function add(augend, addend) {
      return (+augend || 0) + (+addend || 0);
    }

    /**
     * Gets the maximum value of `collection`. If `collection` is empty or falsey
     * `-Infinity` is returned. If an iteratee function is provided it is invoked
     * for each value in `collection` to generate the criterion by which the value
     * is ranked. The `iteratee` is bound to `thisArg` and invoked with three
     * arguments: (value, index, collection).
     *
     * If a property name is provided for `iteratee` the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If a value is also provided for `thisArg` the created `_.matchesProperty`
     * style callback returns `true` for elements that have a matching property
     * value, else `false`.
     *
     * If an object is provided for `iteratee` the created `_.matches` style
     * callback returns `true` for elements that have the properties of the given
     * object, else `false`.
     *
     * @static
     * @memberOf _
     * @category Math
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function|Object|string} [iteratee] The function invoked per iteration.
     * @param {*} [thisArg] The `this` binding of `iteratee`.
     * @returns {*} Returns the maximum value.
     * @example
     *
     * _.max([4, 2, 8, 6]);
     * // => 8
     *
     * _.max([]);
     * // => -Infinity
     *
     * var users = [
     *   { 'user': 'barney', 'age': 36 },
     *   { 'user': 'fred',   'age': 40 }
     * ];
     *
     * _.max(users, function(chr) {
     *   return chr.age;
     * });
     * // => { 'user': 'fred', 'age': 40 }
     *
     * // using the `_.property` callback shorthand
     * _.max(users, 'age');
     * // => { 'user': 'fred', 'age': 40 }
     */
    var max = createExtremum(gt, NEGATIVE_INFINITY);

    /**
     * Gets the minimum value of `collection`. If `collection` is empty or falsey
     * `Infinity` is returned. If an iteratee function is provided it is invoked
     * for each value in `collection` to generate the criterion by which the value
     * is ranked. The `iteratee` is bound to `thisArg` and invoked with three
     * arguments: (value, index, collection).
     *
     * If a property name is provided for `iteratee` the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If a value is also provided for `thisArg` the created `_.matchesProperty`
     * style callback returns `true` for elements that have a matching property
     * value, else `false`.
     *
     * If an object is provided for `iteratee` the created `_.matches` style
     * callback returns `true` for elements that have the properties of the given
     * object, else `false`.
     *
     * @static
     * @memberOf _
     * @category Math
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function|Object|string} [iteratee] The function invoked per iteration.
     * @param {*} [thisArg] The `this` binding of `iteratee`.
     * @returns {*} Returns the minimum value.
     * @example
     *
     * _.min([4, 2, 8, 6]);
     * // => 2
     *
     * _.min([]);
     * // => Infinity
     *
     * var users = [
     *   { 'user': 'barney', 'age': 36 },
     *   { 'user': 'fred',   'age': 40 }
     * ];
     *
     * _.min(users, function(chr) {
     *   return chr.age;
     * });
     * // => { 'user': 'barney', 'age': 36 }
     *
     * // using the `_.property` callback shorthand
     * _.min(users, 'age');
     * // => { 'user': 'barney', 'age': 36 }
     */
    var min = createExtremum(lt, POSITIVE_INFINITY);

    /**
     * Gets the sum of the values in `collection`.
     *
     * @static
     * @memberOf _
     * @category Math
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function|Object|string} [iteratee] The function invoked per iteration.
     * @param {*} [thisArg] The `this` binding of `iteratee`.
     * @returns {number} Returns the sum.
     * @example
     *
     * _.sum([4, 6]);
     * // => 10
     *
     * _.sum({ 'a': 4, 'b': 6 });
     * // => 10
     *
     * var objects = [
     *   { 'n': 4 },
     *   { 'n': 6 }
     * ];
     *
     * _.sum(objects, function(object) {
     *   return object.n;
     * });
     * // => 10
     *
     * // using the `_.property` callback shorthand
     * _.sum(objects, 'n');
     * // => 10
     */
    function sum(collection, iteratee, thisArg) {
      if (thisArg && isIterateeCall(collection, iteratee, thisArg)) {
        iteratee = null;
      }
      var callback = getCallback(),
          noIteratee = iteratee == null;

      if (!(noIteratee && callback === baseCallback)) {
        noIteratee = false;
        iteratee = callback(iteratee, thisArg, 3);
      }
      return noIteratee
        ? arraySum(isArray(collection) ? collection : toIterable(collection))
        : baseSum(collection, iteratee);
    }

    /*------------------------------------------------------------------------*/

    // Ensure wrappers are instances of `baseLodash`.
    lodash.prototype = baseLodash.prototype;

    LodashWrapper.prototype = baseCreate(baseLodash.prototype);
    LodashWrapper.prototype.constructor = LodashWrapper;

    LazyWrapper.prototype = baseCreate(baseLodash.prototype);
    LazyWrapper.prototype.constructor = LazyWrapper;

    // Add functions to the `Map` cache.
    MapCache.prototype['delete'] = mapDelete;
    MapCache.prototype.get = mapGet;
    MapCache.prototype.has = mapHas;
    MapCache.prototype.set = mapSet;

    // Add functions to the `Set` cache.
    SetCache.prototype.push = cachePush;

    // Assign cache to `_.memoize`.
    memoize.Cache = MapCache;

    // Add functions that return wrapped values when chaining.
    lodash.after = after;
    lodash.ary = ary;
    lodash.assign = assign;
    lodash.at = at;
    lodash.before = before;
    lodash.bind = bind;
    lodash.bindAll = bindAll;
    lodash.bindKey = bindKey;
    lodash.callback = callback;
    lodash.chain = chain;
    lodash.chunk = chunk;
    lodash.compact = compact;
    lodash.constant = constant;
    lodash.countBy = countBy;
    lodash.create = create;
    lodash.curry = curry;
    lodash.curryRight = curryRight;
    lodash.debounce = debounce;
    lodash.defaults = defaults;
    lodash.defer = defer;
    lodash.delay = delay;
    lodash.difference = difference;
    lodash.drop = drop;
    lodash.dropRight = dropRight;
    lodash.dropRightWhile = dropRightWhile;
    lodash.dropWhile = dropWhile;
    lodash.fill = fill;
    lodash.filter = filter;
    lodash.flatten = flatten;
    lodash.flattenDeep = flattenDeep;
    lodash.flow = flow;
    lodash.flowRight = flowRight;
    lodash.forEach = forEach;
    lodash.forEachRight = forEachRight;
    lodash.forIn = forIn;
    lodash.forInRight = forInRight;
    lodash.forOwn = forOwn;
    lodash.forOwnRight = forOwnRight;
    lodash.functions = functions;
    lodash.groupBy = groupBy;
    lodash.indexBy = indexBy;
    lodash.initial = initial;
    lodash.intersection = intersection;
    lodash.invert = invert;
    lodash.invoke = invoke;
    lodash.keys = keys;
    lodash.keysIn = keysIn;
    lodash.map = map;
    lodash.mapKeys = mapKeys;
    lodash.mapValues = mapValues;
    lodash.matches = matches;
    lodash.matchesProperty = matchesProperty;
    lodash.memoize = memoize;
    lodash.merge = merge;
    lodash.method = method;
    lodash.methodOf = methodOf;
    lodash.mixin = mixin;
    lodash.negate = negate;
    lodash.omit = omit;
    lodash.once = once;
    lodash.pairs = pairs;
    lodash.partial = partial;
    lodash.partialRight = partialRight;
    lodash.partition = partition;
    lodash.pick = pick;
    lodash.pluck = pluck;
    lodash.property = property;
    lodash.propertyOf = propertyOf;
    lodash.pull = pull;
    lodash.pullAt = pullAt;
    lodash.range = range;
    lodash.rearg = rearg;
    lodash.reject = reject;
    lodash.remove = remove;
    lodash.rest = rest;
    lodash.restParam = restParam;
    lodash.set = set;
    lodash.shuffle = shuffle;
    lodash.slice = slice;
    lodash.sortBy = sortBy;
    lodash.sortByAll = sortByAll;
    lodash.sortByOrder = sortByOrder;
    lodash.spread = spread;
    lodash.take = take;
    lodash.takeRight = takeRight;
    lodash.takeRightWhile = takeRightWhile;
    lodash.takeWhile = takeWhile;
    lodash.tap = tap;
    lodash.throttle = throttle;
    lodash.thru = thru;
    lodash.times = times;
    lodash.toArray = toArray;
    lodash.toPlainObject = toPlainObject;
    lodash.transform = transform;
    lodash.union = union;
    lodash.uniq = uniq;
    lodash.unzip = unzip;
    lodash.unzipWith = unzipWith;
    lodash.values = values;
    lodash.valuesIn = valuesIn;
    lodash.where = where;
    lodash.without = without;
    lodash.wrap = wrap;
    lodash.xor = xor;
    lodash.zip = zip;
    lodash.zipObject = zipObject;
    lodash.zipWith = zipWith;

    // Add aliases.
    lodash.backflow = flowRight;
    lodash.collect = map;
    lodash.compose = flowRight;
    lodash.each = forEach;
    lodash.eachRight = forEachRight;
    lodash.extend = assign;
    lodash.iteratee = callback;
    lodash.methods = functions;
    lodash.object = zipObject;
    lodash.select = filter;
    lodash.tail = rest;
    lodash.unique = uniq;

    // Add functions to `lodash.prototype`.
    mixin(lodash, lodash);

    /*------------------------------------------------------------------------*/

    // Add functions that return unwrapped values when chaining.
    lodash.add = add;
    lodash.attempt = attempt;
    lodash.camelCase = camelCase;
    lodash.capitalize = capitalize;
    lodash.clone = clone;
    lodash.cloneDeep = cloneDeep;
    lodash.deburr = deburr;
    lodash.endsWith = endsWith;
    lodash.escape = escape;
    lodash.escapeRegExp = escapeRegExp;
    lodash.every = every;
    lodash.find = find;
    lodash.findIndex = findIndex;
    lodash.findKey = findKey;
    lodash.findLast = findLast;
    lodash.findLastIndex = findLastIndex;
    lodash.findLastKey = findLastKey;
    lodash.findWhere = findWhere;
    lodash.first = first;
    lodash.get = get;
    lodash.gt = gt;
    lodash.gte = gte;
    lodash.has = has;
    lodash.identity = identity;
    lodash.includes = includes;
    lodash.indexOf = indexOf;
    lodash.inRange = inRange;
    lodash.isArguments = isArguments;
    lodash.isArray = isArray;
    lodash.isBoolean = isBoolean;
    lodash.isDate = isDate;
    lodash.isElement = isElement;
    lodash.isEmpty = isEmpty;
    lodash.isEqual = isEqual;
    lodash.isError = isError;
    lodash.isFinite = isFinite;
    lodash.isFunction = isFunction;
    lodash.isMatch = isMatch;
    lodash.isNaN = isNaN;
    lodash.isNative = isNative;
    lodash.isNull = isNull;
    lodash.isNumber = isNumber;
    lodash.isObject = isObject;
    lodash.isPlainObject = isPlainObject;
    lodash.isRegExp = isRegExp;
    lodash.isString = isString;
    lodash.isTypedArray = isTypedArray;
    lodash.isUndefined = isUndefined;
    lodash.kebabCase = kebabCase;
    lodash.last = last;
    lodash.lastIndexOf = lastIndexOf;
    lodash.lt = lt;
    lodash.lte = lte;
    lodash.max = max;
    lodash.min = min;
    lodash.noConflict = noConflict;
    lodash.noop = noop;
    lodash.now = now;
    lodash.pad = pad;
    lodash.padLeft = padLeft;
    lodash.padRight = padRight;
    lodash.parseInt = parseInt;
    lodash.random = random;
    lodash.reduce = reduce;
    lodash.reduceRight = reduceRight;
    lodash.repeat = repeat;
    lodash.result = result;
    lodash.runInContext = runInContext;
    lodash.size = size;
    lodash.snakeCase = snakeCase;
    lodash.some = some;
    lodash.sortedIndex = sortedIndex;
    lodash.sortedLastIndex = sortedLastIndex;
    lodash.startCase = startCase;
    lodash.startsWith = startsWith;
    lodash.sum = sum;
    lodash.template = template;
    lodash.trim = trim;
    lodash.trimLeft = trimLeft;
    lodash.trimRight = trimRight;
    lodash.trunc = trunc;
    lodash.unescape = unescape;
    lodash.uniqueId = uniqueId;
    lodash.words = words;

    // Add aliases.
    lodash.all = every;
    lodash.any = some;
    lodash.contains = includes;
    lodash.eq = isEqual;
    lodash.detect = find;
    lodash.foldl = reduce;
    lodash.foldr = reduceRight;
    lodash.head = first;
    lodash.include = includes;
    lodash.inject = reduce;

    mixin(lodash, (function() {
      var source = {};
      baseForOwn(lodash, function(func, methodName) {
        if (!lodash.prototype[methodName]) {
          source[methodName] = func;
        }
      });
      return source;
    }()), false);

    /*------------------------------------------------------------------------*/

    // Add functions capable of returning wrapped and unwrapped values when chaining.
    lodash.sample = sample;

    lodash.prototype.sample = function(n) {
      if (!this.__chain__ && n == null) {
        return sample(this.value());
      }
      return this.thru(function(value) {
        return sample(value, n);
      });
    };

    /*------------------------------------------------------------------------*/

    /**
     * The semantic version number.
     *
     * @static
     * @memberOf _
     * @type string
     */
    lodash.VERSION = VERSION;

    // Assign default placeholders.
    arrayEach(['bind', 'bindKey', 'curry', 'curryRight', 'partial', 'partialRight'], function(methodName) {
      lodash[methodName].placeholder = lodash;
    });

    // Add `LazyWrapper` methods that accept an `iteratee` value.
    arrayEach(['dropWhile', 'filter', 'map', 'takeWhile'], function(methodName, type) {
      var isFilter = type != LAZY_MAP_FLAG,
          isDropWhile = type == LAZY_DROP_WHILE_FLAG;

      LazyWrapper.prototype[methodName] = function(iteratee, thisArg) {
        var filtered = this.__filtered__,
            result = (filtered && isDropWhile) ? new LazyWrapper(this) : this.clone(),
            iteratees = result.__iteratees__ || (result.__iteratees__ = []);

        iteratees.push({
          'done': false,
          'count': 0,
          'index': 0,
          'iteratee': getCallback(iteratee, thisArg, 1),
          'limit': -1,
          'type': type
        });

        result.__filtered__ = filtered || isFilter;
        return result;
      };
    });

    // Add `LazyWrapper` methods for `_.drop` and `_.take` variants.
    arrayEach(['drop', 'take'], function(methodName, index) {
      var whileName = methodName + 'While';

      LazyWrapper.prototype[methodName] = function(n) {
        var filtered = this.__filtered__,
            result = (filtered && !index) ? this.dropWhile() : this.clone();

        n = n == null ? 1 : nativeMax(floor(n) || 0, 0);
        if (filtered) {
          if (index) {
            result.__takeCount__ = nativeMin(result.__takeCount__, n);
          } else {
            last(result.__iteratees__).limit = n;
          }
        } else {
          var views = result.__views__ || (result.__views__ = []);
          views.push({ 'size': n, 'type': methodName + (result.__dir__ < 0 ? 'Right' : '') });
        }
        return result;
      };

      LazyWrapper.prototype[methodName + 'Right'] = function(n) {
        return this.reverse()[methodName](n).reverse();
      };

      LazyWrapper.prototype[methodName + 'RightWhile'] = function(predicate, thisArg) {
        return this.reverse()[whileName](predicate, thisArg).reverse();
      };
    });

    // Add `LazyWrapper` methods for `_.first` and `_.last`.
    arrayEach(['first', 'last'], function(methodName, index) {
      var takeName = 'take' + (index ? 'Right' : '');

      LazyWrapper.prototype[methodName] = function() {
        return this[takeName](1).value()[0];
      };
    });

    // Add `LazyWrapper` methods for `_.initial` and `_.rest`.
    arrayEach(['initial', 'rest'], function(methodName, index) {
      var dropName = 'drop' + (index ? '' : 'Right');

      LazyWrapper.prototype[methodName] = function() {
        return this[dropName](1);
      };
    });

    // Add `LazyWrapper` methods for `_.pluck` and `_.where`.
    arrayEach(['pluck', 'where'], function(methodName, index) {
      var operationName = index ? 'filter' : 'map',
          createCallback = index ? baseMatches : property;

      LazyWrapper.prototype[methodName] = function(value) {
        return this[operationName](createCallback(value));
      };
    });

    LazyWrapper.prototype.compact = function() {
      return this.filter(identity);
    };

    LazyWrapper.prototype.reject = function(predicate, thisArg) {
      predicate = getCallback(predicate, thisArg, 1);
      return this.filter(function(value) {
        return !predicate(value);
      });
    };

    LazyWrapper.prototype.slice = function(start, end) {
      start = start == null ? 0 : (+start || 0);

      var result = this;
      if (start < 0) {
        result = this.takeRight(-start);
      } else if (start) {
        result = this.drop(start);
      }
      if (end !== undefined) {
        end = (+end || 0);
        result = end < 0 ? result.dropRight(-end) : result.take(end - start);
      }
      return result;
    };

    LazyWrapper.prototype.toArray = function() {
      return this.drop(0);
    };

    // Add `LazyWrapper` methods to `lodash.prototype`.
    baseForOwn(LazyWrapper.prototype, function(func, methodName) {
      var lodashFunc = lodash[methodName];
      if (!lodashFunc) {
        return;
      }
      var checkIteratee = /^(?:filter|map|reject)|While$/.test(methodName),
          retUnwrapped = /^(?:first|last)$/.test(methodName);

      lodash.prototype[methodName] = function() {
        var args = arguments,
            chainAll = this.__chain__,
            value = this.__wrapped__,
            isHybrid = !!this.__actions__.length,
            isLazy = value instanceof LazyWrapper,
            iteratee = args[0],
            useLazy = isLazy || isArray(value);

        if (useLazy && checkIteratee && typeof iteratee == 'function' && iteratee.length != 1) {
          // avoid lazy use if the iteratee has a "length" value other than `1`
          isLazy = useLazy = false;
        }
        var onlyLazy = isLazy && !isHybrid;
        if (retUnwrapped && !chainAll) {
          return onlyLazy
            ? func.call(value)
            : lodashFunc.call(lodash, this.value());
        }
        var interceptor = function(value) {
          var otherArgs = [value];
          push.apply(otherArgs, args);
          return lodashFunc.apply(lodash, otherArgs);
        };
        if (useLazy) {
          var wrapper = onlyLazy ? value : new LazyWrapper(this),
              result = func.apply(wrapper, args);

          if (!retUnwrapped && (isHybrid || result.__actions__)) {
            var actions = result.__actions__ || (result.__actions__ = []);
            actions.push({ 'func': thru, 'args': [interceptor], 'thisArg': lodash });
          }
          return new LodashWrapper(result, chainAll);
        }
        return this.thru(interceptor);
      };
    });

    // Add `Array` and `String` methods to `lodash.prototype`.
    arrayEach(['concat', 'join', 'pop', 'push', 'replace', 'shift', 'sort', 'splice', 'split', 'unshift'], function(methodName) {
      var func = (/^(?:replace|split)$/.test(methodName) ? stringProto : arrayProto)[methodName],
          chainName = /^(?:push|sort|unshift)$/.test(methodName) ? 'tap' : 'thru',
          retUnwrapped = /^(?:join|pop|replace|shift)$/.test(methodName);

      lodash.prototype[methodName] = function() {
        var args = arguments;
        if (retUnwrapped && !this.__chain__) {
          return func.apply(this.value(), args);
        }
        return this[chainName](function(value) {
          return func.apply(value, args);
        });
      };
    });

    // Map minified function names to their real names.
    baseForOwn(LazyWrapper.prototype, function(func, methodName) {
      var lodashFunc = lodash[methodName];
      if (lodashFunc) {
        var key = lodashFunc.name,
            names = realNames[key] || (realNames[key] = []);

        names.push({ 'name': methodName, 'func': lodashFunc });
      }
    });

    realNames[createHybridWrapper(null, BIND_KEY_FLAG).name] = [{ 'name': 'wrapper', 'func': null }];

    // Add functions to the lazy wrapper.
    LazyWrapper.prototype.clone = lazyClone;
    LazyWrapper.prototype.reverse = lazyReverse;
    LazyWrapper.prototype.value = lazyValue;

    // Add chaining functions to the `lodash` wrapper.
    lodash.prototype.chain = wrapperChain;
    lodash.prototype.commit = wrapperCommit;
    lodash.prototype.plant = wrapperPlant;
    lodash.prototype.reverse = wrapperReverse;
    lodash.prototype.toString = wrapperToString;
    lodash.prototype.run = lodash.prototype.toJSON = lodash.prototype.valueOf = lodash.prototype.value = wrapperValue;

    // Add function aliases to the `lodash` wrapper.
    lodash.prototype.collect = lodash.prototype.map;
    lodash.prototype.head = lodash.prototype.first;
    lodash.prototype.select = lodash.prototype.filter;
    lodash.prototype.tail = lodash.prototype.rest;

    return lodash;
  }

  /*--------------------------------------------------------------------------*/

  // Export lodash.
  var _ = runInContext();

  // Some AMD build optimizers like r.js check for condition patterns like the following:
  if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
    // Expose lodash to the global object when an AMD loader is present to avoid
    // errors in cases where lodash is loaded by a script tag and not intended
    // as an AMD module. See http://requirejs.org/docs/errors.html#mismatch for
    // more details.
    root._ = _;

    // Define as an anonymous module so, through path mapping, it can be
    // referenced as the "underscore" module.
    define(function() {
      return _;
    });
  }
  // Check for `exports` after `define` in case a build optimizer adds an `exports` object.
  else if (freeExports && freeModule) {
    // Export for Node.js or RingoJS.
    if (moduleExports) {
      (freeModule.exports = _)._ = _;
    }
    // Export for Rhino with CommonJS support.
    else {
      freeExports._ = _;
    }
  }
  else {
    // Export for a browser or Rhino.
    root._ = _;
  }
}.call(this));

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],3:[function(require,module,exports){
module.exports={
  "13002": {
    "longitude": -23.09,
    "latitude": 20.47,
    "name": "NE Extension"
  },
  "13010": {
    "longitude": 0,
    "latitude": 0,
    "name": "Soul"
  },
  "15001": {
    "longitude": -9.97,
    "latitude": -9.91,
    "name": "Gavotte"
  },
  "15006": {
    "longitude": -10,
    "latitude": -6.03,
    "name": "Valse"
  },
  "15007": {
    "longitude": 7.99,
    "latitude": -5.98,
    "name": "SE Extension"
  },
  "21598": {
    "longitude": 141.1,
    "latitude": 32.39,
    "name": "Drifter"
  },
  "21640": {
    "longitude": 131.89,
    "latitude": 31.65,
    "name": "Drifter"
  },
  "22101": {
    "longitude": 126.02,
    "latitude": 37.24,
    "name": "Unnamed buoy #22101"
  },
  "22103": {
    "longitude": 127.5,
    "latitude": 34,
    "name": "Unnamed buoy #22103"
  },
  "22104": {
    "longitude": 128.9,
    "latitude": 34.77,
    "name": "Unnamed buoy #22104"
  },
  "22105": {
    "longitude": 130,
    "latitude": 37.54,
    "name": "Unnamed buoy #22105"
  },
  "22106": {
    "longitude": 129.78,
    "latitude": 36.35,
    "name": "Unnamed buoy #22106"
  },
  "22107": {
    "longitude": 126.03,
    "latitude": 33.08,
    "name": "Unnamed buoy #22107"
  },
  "22108": {
    "longitude": 125.75,
    "latitude": 36.25,
    "name": "Unnamed buoy #22108"
  },
  "31003": {
    "longitude": -30.5,
    "latitude": -7.91,
    "name": "SW Extension"
  },
  "31004": {
    "longitude": -32.6,
    "latitude": -13.55,
    "name": "SW Extension"
  },
  "31005": {
    "longitude": -34.69,
    "latitude": -18.9,
    "name": "SW Extension"
  },
  "31006": {
    "longitude": -22.99,
    "latitude": 4.1,
    "name": "NE Extension"
  },
  "31007": {
    "longitude": -22.97,
    "latitude": 0,
    "name": "Jazz"
  },
  "31053": {
    "longitude": -49.88,
    "latitude": -31.58,
    "name": " RIO GRANDE DO SUL"
  },
  "32012": {
    "longitude": -84.37,
    "latitude": -19.376,
    "name": "Woods Hole Stratus Wave Station "
  },
  "41002": {
    "longitude": -74.835,
    "latitude": 31.862,
    "name": "SOUTH HATTERAS - 225 NM South of Cape Hatteras"
  },
  "41004": {
    "longitude": -79.099,
    "latitude": 32.501,
    "name": "EDISTO - 41 NM Southeast of Charleston, SC"
  },
  "41008": {
    "longitude": -80.868,
    "latitude": 31.4,
    "name": "GRAYS REEF - 40 NM Southeast of Savannah, GA",
    "tideStation": {
      "name": "DAYMARK #135, SOUTH NEWPORT RIVER",
      "id": "8674301",
      "latitude": 31.575,
      "longitude": -81.19,
      "distance": 36229
    }
  },
  "41009": {
    "longitude": -80.188,
    "latitude": 28.522,
    "name": "CANAVERAL 20 NM East of Cape Canaveral, FL",
    "tideStation": {
      "name": "TRIDENT PIER",
      "id": "8721604",
      "latitude": 28.4158,
      "longitude": -80.5931,
      "distance": 41382
    }
  },
  "41010": {
    "longitude": -78.464,
    "latitude": 28.903,
    "name": "CANAVERAL EAST - 120NM East of Cape Canaveral"
  },
  "41013": {
    "longitude": -77.743,
    "latitude": 33.436,
    "name": "Frying Pan Shoals, NC Buoy"
  },
  "41024": {
    "longitude": -78.482,
    "latitude": 33.848,
    "name": "Sunset Nearshore (SUN 2)",
    "tideStation": {
      "name": "SUNSET BEACH",
      "id": "8659897",
      "latitude": 33.865,
      "longitude": -78.5067,
      "distance": 2963
    }
  },
  "41025": {
    "longitude": -75.402,
    "latitude": 35.006,
    "name": "Diamond Shoals",
    "tideStation": {
      "name": "CAPE HATTERAS FISHING PIER",
      "id": "8654400",
      "latitude": 35.2233,
      "longitude": -75.635,
      "distance": 32130
    }
  },
  "41029": {
    "longitude": -79.62,
    "latitude": 32.8,
    "name": "Capers Nearshore (CAP 2)",
    "tideStation": {
      "name": "SOUTH CAPERS ISLAND",
      "id": "8664941",
      "latitude": 32.8567,
      "longitude": -79.7067,
      "distance": 10269
    }
  },
  "41033": {
    "longitude": -80.4,
    "latitude": 32.27,
    "name": "Fripp Nearshore (FRP 2)",
    "tideStation": {
      "name": "FRIPPS INLET",
      "id": "8668498",
      "latitude": 32.34,
      "longitude": -80.465,
      "distance": 9886
    }
  },
  "41037": {
    "longitude": -77.363,
    "latitude": 33.988,
    "name": "ILM3 - 27 miles SE of Wrightsville Beach, NC",
    "tideStation": {
      "name": "WRIGHTSVILLE BEACH",
      "id": "8658163",
      "latitude": 34.2133,
      "longitude": -77.7867,
      "distance": 46402
    }
  },
  "41038": {
    "longitude": -77.721,
    "latitude": 34.142,
    "name": "ILM2 - 5 miles SE of Wrightsville Beach, NC",
    "tideStation": {
      "name": "WRIGHTSVILLE BEACH",
      "id": "8658163",
      "latitude": 34.2133,
      "longitude": -77.7867,
      "distance": 9962
    }
  },
  "41040": {
    "longitude": -53.024,
    "latitude": 14.516,
    "name": "NORTH EQUATORIAL ONE- 470 NM East of Martinique"
  },
  "41041": {
    "longitude": -46.082,
    "latitude": 14.329,
    "name": "NORTH EQUATORIAL TWO - 890 NM East of Martinique "
  },
  "41043": {
    "longitude": -64.854,
    "latitude": 21.021,
    "name": "NE PUERTO RICO - 170 NM NNE of San Juan, PR"
  },
  "41044": {
    "longitude": -58.625,
    "latitude": 21.575,
    "name": "NE ST MARTIN - 330 NM NE St Martin Is"
  },
  "41046": {
    "longitude": -68.365,
    "latitude": 23.888,
    "name": "EAST BAHAMAS - 335 NM East of San Salvador Is,  Bahamas "
  },
  "41047": {
    "longitude": -71.483,
    "latitude": 27.517,
    "name": "NE BAHAMAS - 350 NM ENE of Nassau, Bahamas"
  },
  "41048": {
    "longitude": -69.565,
    "latitude": 31.868,
    "name": "WEST BERMUDA - 240 NM West of Bermuda"
  },
  "41049": {
    "longitude": -62.945,
    "latitude": 27.537,
    "name": "SOUTH BERMUDA - 300 NM SSE of Bermuda"
  },
  "41051": {
    "longitude": -65.004,
    "latitude": 18.257,
    "name": "South of St. Thomas, VI",
    "tideStation": {
      "name": "BOTANY BAY, ST. THOMAS",
      "id": "9751774",
      "latitude": 18.3633,
      "longitude": -65.035,
      "distance": 12214
    }
  },
  "41052": {
    "longitude": -64.763,
    "latitude": 18.249,
    "name": "South of St. John, Virgin Islands",
    "tideStation": {
      "name": "DOG ISLAND, ST. THOMAS",
      "id": "9751494",
      "latitude": 18.2971,
      "longitude": -64.8178,
      "distance": 7869
    }
  },
  "41053": {
    "longitude": -66.099,
    "latitude": 18.474,
    "name": "San Juan, PR",
    "tideStation": {
      "name": "SAN JUAN",
      "id": "9755371",
      "latitude": 18.4589,
      "longitude": -66.1164,
      "distance": 2484
    }
  },
  "41056": {
    "longitude": -65.457,
    "latitude": 18.259,
    "name": "Vieques Island, PR",
    "tideStation": {
      "name": "ISABEL SEGUNDA, VIEQUES ISLAND",
      "id": "9752619",
      "latitude": 18.1525,
      "longitude": -65.4438,
      "distance": 11870
    }
  },
  "41060": {
    "longitude": -50.017,
    "latitude": 14.825,
    "name": "Woods Hole Northwest Tropical Atlantic Wave Station"
  },
  "41108": {
    "longitude": -78.015,
    "latitude": 33.721,
    "name": "Wilmington Harbor, NC - 200",
    "tideStation": {
      "name": "OAK ISLAND, ATLANTIC OCEAN",
      "id": "8659182",
      "latitude": 33.9017,
      "longitude": -78.0817,
      "distance": 20973
    }
  },
  "41110": {
    "longitude": -77.709,
    "latitude": 34.141,
    "name": "Masonboro Inlet, ILM2, NC (150)",
    "tideStation": {
      "name": "WRIGHTSVILLE BEACH",
      "id": "8658163",
      "latitude": 34.2133,
      "longitude": -77.7867,
      "distance": 10753
    }
  },
  "41112": {
    "longitude": -81.292,
    "latitude": 30.709,
    "name": "Offshore Fernandina Beach, FL (132)",
    "tideStation": {
      "name": "FERNANDINA BEACH",
      "id": "8720030",
      "latitude": 30.6717,
      "longitude": -81.465,
      "distance": 17083
    }
  },
  "41113": {
    "longitude": -80.533,
    "latitude": 28.4,
    "name": "Cape Canaveral Nearshore, FL (143)",
    "tideStation": {
      "name": "TRIDENT PIER",
      "id": "8721604",
      "latitude": 28.4158,
      "longitude": -80.5931,
      "distance": 6144
    }
  },
  "41114": {
    "longitude": -80.22,
    "latitude": 27.551,
    "name": "Fort Pierce, FL (134)",
    "tideStation": {
      "name": "NORTH BEACH CAUSEWAY",
      "id": "8722208",
      "latitude": 27.4717,
      "longitude": -80.325,
      "distance": 13596
    }
  },
  "41115": {
    "longitude": -67.28,
    "latitude": 18.376,
    "name": "Rincon, Puerto Rico (181)",
    "tideStation": {
      "name": "AGUADILLA",
      "id": "9759412",
      "latitude": 18.4566,
      "longitude": -67.1646,
      "distance": 15108
    }
  },
  "41300": {
    "longitude": -57.467,
    "latitude": 15.85,
    "name": "West Indies"
  },
  "41670": {
    "longitude": -38.89,
    "latitude": 31.6,
    "name": "Unnamed buoy #41670"
  },
  "41852": {
    "longitude": -52.48,
    "latitude": 24.14,
    "name": "Unnamed buoy #41852"
  },
  "41933": {
    "longitude": -43.54,
    "latitude": 34.06,
    "name": "Unnamed buoy #41933"
  },
  "42001": {
    "longitude": -89.658,
    "latitude": 25.888,
    "name": "MID GULF - 180 nm South of Southwest Pass, LA"
  },
  "42002": {
    "longitude": -93.758,
    "latitude": 26.091,
    "name": "WEST GULF - 207 NM East of Brownsville, TX"
  },
  "42003": {
    "longitude": -85.648,
    "latitude": 26.007,
    "name": "East GULF - 208 NM West of Naples, FL"
  },
  "42012": {
    "longitude": -87.555,
    "latitude": 30.065,
    "name": "ORANGE BEACH - 44 NM SE of Mobile, AL",
    "tideStation": {
      "name": "GULF SHORES, ICWW",
      "id": "8731439",
      "latitude": 30.2799,
      "longitude": -87.6843,
      "distance": 26882
    }
  },
  "42019": {
    "longitude": -95.353,
    "latitude": 27.907,
    "name": "FREEPORT, TX - 60 NM South of Freeport, TX"
  },
  "42020": {
    "longitude": -96.694,
    "latitude": 26.968,
    "name": "CORPUS CHRISTI, TX - 60NM SSE of Corpus Christi, TX"
  },
  "42035": {
    "longitude": -94.413,
    "latitude": 29.232,
    "name": "GALVESTON,TX -  22 NM East of Galveston, TX",
    "tideStation": {
      "name": "ROLLOVER PASS (TCOON)",
      "id": "8770971",
      "latitude": 29.515,
      "longitude": -94.5133,
      "distance": 32845
    }
  },
  "42036": {
    "longitude": -84.517,
    "latitude": 28.5,
    "name": "WEST TAMPA  - 112 NM WNW of Tampa, FL"
  },
  "42039": {
    "longitude": -86.006,
    "latitude": 28.739,
    "name": "PENSACOLA - 115NM ESE of Pensacola, FL"
  },
  "42040": {
    "longitude": -88.207,
    "latitude": 29.212,
    "name": "LUKE OFFSHORE TEST PLATFORM - 64 NM South of Dauphin Island, AL"
  },
  "42055": {
    "longitude": -94,
    "latitude": 22.203,
    "name": "BAY OF CAMPECHE - 214 NM NE OF Veracruz, MX"
  },
  "42056": {
    "longitude": -84.857,
    "latitude": 19.802,
    "name": " Yucatan Basin - 120 NM ESE of Cozumel, MX"
  },
  "42057": {
    "longitude": -81.501,
    "latitude": 17.002,
    "name": "Western Caribbean - 195 NM WSW of Negril Jamaica"
  },
  "42058": {
    "longitude": -74.918,
    "latitude": 14.923,
    "name": "Central Caribbean - 210 NM SSE of Kingston, Jamaica"
  },
  "42060": {
    "longitude": -63.24,
    "latitude": 16.332,
    "name": "Caribbean Valley - 63 NM WSW of Plymouth, Montserrat "
  },
  "42085": {
    "longitude": -66.524,
    "latitude": 17.86,
    "name": "Southeast of Ponce, PR",
    "tideStation": {
      "name": "SANTA ISABEL",
      "id": "9756639",
      "latitude": 17.955,
      "longitude": -66.4067,
      "distance": 16280
    }
  },
  "42089": {
    "longitude": -80.061,
    "latitude": 19.699,
    "name": "Little Cayman Research Center, Cayman Islands"
  },
  "42099": {
    "longitude": -84.275,
    "latitude": 27.34,
    "name": "Offshore St. Petersburg, FL (144)"
  },
  "42360": {
    "longitude": -90.47,
    "latitude": 26.67,
    "name": "BW Pioneer buoy - C16471"
  },
  "42361": {
    "longitude": -92.443,
    "latitude": 27.546,
    "name": "Auger - Garden Banks 426"
  },
  "42363": {
    "longitude": -89.223,
    "latitude": 28.17,
    "name": "Mars - Mississippi Canyon 807"
  },
  "42364": {
    "longitude": -88.092,
    "latitude": 29.065,
    "name": "Ram-Powell - Viosca Knoll 956"
  },
  "42365": {
    "longitude": -89.104,
    "latitude": 28.154,
    "name": "Ursa - Mississippi Canyon 809"
  },
  "42369": {
    "longitude": -90.283,
    "latitude": 27.207,
    "name": "Mad Dog - Green Canyon 782"
  },
  "42375": {
    "longitude": -88.289,
    "latitude": 28.521,
    "name": "Na Kika - Mississippi Canyon 474"
  },
  "42390": {
    "longitude": -94.898,
    "latitude": 26.129,
    "name": "Perdido Host - Alaminos Canyon 857"
  },
  "42392": {
    "longitude": -90.027,
    "latitude": 27.196,
    "name": "Atlantis - Green Canyon 787"
  },
  "42394": {
    "longitude": -89.236,
    "latitude": 28.156,
    "name": "Olympus - Mississippi Canyon 807"
  },
  "42887": {
    "longitude": -88.496,
    "latitude": 28.191,
    "name": "Thunder Horse - Mississippi Canyon 778"
  },
  "44005": {
    "longitude": -69.128,
    "latitude": 43.204,
    "name": "GULF OF MAINE - 78 NM East of Portsmouth, NH"
  },
  "44008": {
    "longitude": -69.248,
    "latitude": 40.503,
    "name": "NANTUCKET 54NM Southeast of Nantucket"
  },
  "44009": {
    "longitude": -74.703,
    "latitude": 38.461,
    "name": "DELAWARE BAY 26 NM Southeast of Cape May, NJ",
    "tideStation": {
      "name": "INDIAN RIVER INLET (COAST GUARD STATION)",
      "id": "8558690",
      "latitude": 38.61,
      "longitude": -75.07,
      "distance": 36021
    }
  },
  "44011": {
    "longitude": -66.619,
    "latitude": 41.098,
    "name": "GEORGES BANK 170 NM East of Hyannis, MA"
  },
  "44013": {
    "longitude": -70.651,
    "latitude": 42.346,
    "name": "BOSTON 16 NM East of Boston, MA",
    "tideStation": {
      "name": "SCITUATE, SCITUATE HARBOR",
      "id": "8445138",
      "latitude": 42.2017,
      "longitude": -70.7267,
      "distance": 17202
    }
  },
  "44014": {
    "longitude": -74.842,
    "latitude": 36.611,
    "name": "VIRGINIA BEACH 64 NM East of Virginia Beach, VA"
  },
  "44017": {
    "longitude": -72.048,
    "latitude": 40.694,
    "name": "MONTAUK POINT -23 NM SSW of Montauk Point, NY",
    "tideStation": {
      "name": "SHINNECOCK INLET OPEN COAST",
      "id": "8512354",
      "latitude": 40.8367,
      "longitude": -72.48,
      "distance": 39769
    }
  },
  "44018": {
    "longitude": -69.713,
    "latitude": 42.137,
    "name": "CAPE COD - 24 NM East of Provincetown, MA",
    "tideStation": {
      "name": "PROVINCETOWN",
      "id": "8446121",
      "latitude": 42.0496,
      "longitude": -70.1822,
      "distance": 40012
    }
  },
  "44020": {
    "longitude": -70.187,
    "latitude": 41.443,
    "name": "NANTUCKET SOUND",
    "tideStation": {
      "name": "NANTUCKET ISLAND",
      "id": "8449130",
      "latitude": 41.285,
      "longitude": -70.0967,
      "distance": 19105
    }
  },
  "44024": {
    "longitude": -65.907,
    "latitude": 42.331,
    "name": "N01 - Northeast Channel"
  },
  "44025": {
    "longitude": -73.164,
    "latitude": 40.251,
    "name": "LONG ISLAND - 30 NM South of Islip, NY",
    "tideStation": {
      "name": "FIRE ISLAND",
      "id": "8515186",
      "latitude": 40.6267,
      "longitude": -73.26,
      "distance": 42507
    }
  },
  "44029": {
    "longitude": -70.566,
    "latitude": 42.522,
    "name": "Buoy A01 - Mass. Bay/Stellwagen",
    "tideStation": {
      "name": "ROCKPORT",
      "id": "8441551",
      "latitude": 42.6583,
      "longitude": -70.615,
      "distance": 15666
    }
  },
  "44030": {
    "longitude": -70.428,
    "latitude": 43.181,
    "name": "Buoy B01 - Western Maine Shelf",
    "tideStation": {
      "name": "WELLS",
      "id": "8419317",
      "latitude": 43.32,
      "longitude": -70.5633,
      "distance": 18953
    }
  },
  "44033": {
    "longitude": -68.997,
    "latitude": 44.056,
    "name": "Buoy F01 - West Penobscot Bay",
    "tideStation": {
      "name": "ROCKLAND",
      "id": "8415490",
      "latitude": 44.105,
      "longitude": -69.1017,
      "distance": 9999
    }
  },
  "44034": {
    "longitude": -68.109,
    "latitude": 44.106,
    "name": "Buoy I01 - Eastern Maine Shelf",
    "tideStation": {
      "name": "BAR HARBOR",
      "id": "8413320",
      "latitude": 44.3917,
      "longitude": -68.205,
      "distance": 32659
    }
  },
  "44037": {
    "longitude": -67.88,
    "latitude": 43.491,
    "name": "Buoy M01 - Jordan Basin"
  },
  "44039": {
    "longitude": -72.655,
    "latitude": 41.138,
    "name": "Central Long Island Sound",
    "tideStation": {
      "name": "MATTITUCK INLET, LONG ISLAND",
      "id": "8512668",
      "latitude": 41.015,
      "longitude": -72.5617,
      "distance": 15750
    }
  },
  "44041": {
    "longitude": -76.778,
    "latitude": 37.204,
    "name": "Jamestown, VA",
    "tideStation": {
      "name": "JAMESTOWN",
      "id": "8637712",
      "latitude": 37.2201,
      "longitude": -76.7914,
      "distance": 2146
    }
  },
  "44043": {
    "longitude": -76.391,
    "latitude": 39.152,
    "name": "Patapsco, MD",
    "tideStation": {
      "name": "TOLCHESTER BEACH",
      "id": "8573364",
      "latitude": 39.2133,
      "longitude": -76.245,
      "distance": 14334
    }
  },
  "44056": {
    "longitude": -75.714,
    "latitude": 36.2,
    "name": "Duck FRF, NC",
    "tideStation": {
      "name": "DUCK",
      "id": "8651370",
      "latitude": 36.1833,
      "longitude": -75.7467,
      "distance": 3476
    }
  },
  "44057": {
    "longitude": -76.073,
    "latitude": 39.54,
    "name": "Susquehanna, MD",
    "tideStation": {
      "name": "HAVRE DE GRACE",
      "id": "8574070",
      "latitude": 39.5367,
      "longitude": -76.09,
      "distance": 1507
    }
  },
  "44058": {
    "longitude": -76.257,
    "latitude": 37.551,
    "name": "Stingray Point, VA",
    "tideStation": {
      "name": "WINDMILL POINT",
      "id": "8636580",
      "latitude": 37.6162,
      "longitude": -76.29,
      "distance": 7801
    }
  },
  "44059": {
    "longitude": -76.298,
    "latitude": 36.846,
    "name": "Norfolk, VA",
    "tideStation": {
      "name": "PORTSMOUTH, NAVAL SHIPYARD",
      "id": "8638660",
      "latitude": 36.8217,
      "longitude": -76.2933,
      "distance": 2729
    }
  },
  "44060": {
    "longitude": -72.067,
    "latitude": 41.263,
    "name": "Eastern Long Island Sound",
    "tideStation": {
      "name": "SILVER EEL POND",
      "id": "8510719",
      "latitude": 41.2567,
      "longitude": -72.03,
      "distance": 3179
    }
  },
  "44061": {
    "longitude": -77.036,
    "latitude": 38.788,
    "name": "Upper Potomac, MD",
    "tideStation": {
      "name": "WASHINGTON",
      "id": "8594900",
      "latitude": 38.8733,
      "longitude": -77.0217,
      "distance": 9550
    }
  },
  "44062": {
    "longitude": -76.415,
    "latitude": 38.556,
    "name": "Gooses Reef, MD",
    "tideStation": {
      "name": "LONG BEACH",
      "id": "8577004",
      "latitude": 38.465,
      "longitude": -76.4733,
      "distance": 11309
    }
  },
  "44064": {
    "longitude": -76.046,
    "latitude": 36.974,
    "name": "First Landing",
    "tideStation": {
      "name": "CHESAPEAKE BAY BRIDGE TUNNEL",
      "id": "8638863",
      "latitude": 36.9667,
      "longitude": -76.1133,
      "distance": 6047
    }
  },
  "44065": {
    "longitude": -73.703,
    "latitude": 40.369,
    "name": "New York Harbor Entrance - 15 NM SE of Breezy Point , NY",
    "tideStation": {
      "name": "ATLANTIC BEACH",
      "id": "8516881",
      "latitude": 40.595,
      "longitude": -73.7433,
      "distance": 25327
    }
  },
  "44069": {
    "longitude": -73.086,
    "latitude": 40.693,
    "name": "Great South Bay",
    "tideStation": {
      "name": "SEAVIEW FERRY DOCK",
      "id": "8514779",
      "latitude": 40.6493,
      "longitude": -73.1506,
      "distance": 7306
    }
  },
  "44093": {
    "longitude": -75.492,
    "latitude": 36.872,
    "name": "Offshore Wind Energy Area, VA - 210",
    "tideStation": {
      "name": "RUDEE INLET",
      "id": "8639207",
      "latitude": 36.8317,
      "longitude": -75.9733,
      "distance": 43157
    }
  },
  "44094": {
    "longitude": -73.106,
    "latitude": 40.585,
    "name": "Fire Island Nearshore, NY - 207",
    "tideStation": {
      "name": "SEAVIEW FERRY DOCK",
      "id": "8514779",
      "latitude": 40.6493,
      "longitude": -73.1506,
      "distance": 8076
    }
  },
  "44095": {
    "longitude": -75.33,
    "latitude": 35.75,
    "name": "Oregon Inlet, NC  - 192",
    "tideStation": {
      "name": "OREGON INLET (USCG STATION)",
      "id": "8652678",
      "latitude": 35.7683,
      "longitude": -75.5267,
      "distance": 17904
    }
  },
  "44096": {
    "longitude": -75.81,
    "latitude": 37.023,
    "name": "Cape Charles, VA - 186",
    "tideStation": {
      "name": "KIPTOPEKE",
      "id": "8632200",
      "latitude": 37.1652,
      "longitude": -75.9884,
      "distance": 22374
    }
  },
  "44097": {
    "longitude": -71.127,
    "latitude": 40.969,
    "name": "Block Island, RI  (154)",
    "tideStation": {
      "name": "BLOCK ISLAND",
      "id": "8459338",
      "latitude": 41.1733,
      "longitude": -71.5567,
      "distance": 42650
    }
  },
  "44098": {
    "longitude": -70.169,
    "latitude": 42.798,
    "name": "Jeffrey's Ledge, NH (160)",
    "tideStation": {
      "name": "ROCKPORT",
      "id": "8441551",
      "latitude": 42.6583,
      "longitude": -70.615,
      "distance": 39687
    }
  },
  "44099": {
    "longitude": -75.72,
    "latitude": 36.915,
    "name": "Cape Henry, VA (147)",
    "tideStation": {
      "name": "RUDEE INLET",
      "id": "8639207",
      "latitude": 36.8317,
      "longitude": -75.9733,
      "distance": 24403
    }
  },
  "44100": {
    "longitude": -75.591,
    "latitude": 36.255,
    "name": "Duck FRF 26m, NC (430)",
    "tideStation": {
      "name": "DUCK",
      "id": "8651370",
      "latitude": 36.1833,
      "longitude": -75.7467,
      "distance": 16102
    }
  },
  "44137": {
    "longitude": -61.998,
    "latitude": 42.262,
    "name": "East Scotia Slope"
  },
  "44139": {
    "longitude": -57.103,
    "latitude": 44.24,
    "name": "Banqureau Banks"
  },
  "44141": {
    "longitude": -57.958,
    "latitude": 42.993,
    "name": "Laurentian Fan"
  },
  "44150": {
    "longitude": -64.018,
    "latitude": 42.505,
    "name": "La Have Bank"
  },
  "44251": {
    "longitude": -53.392,
    "latitude": 46.443,
    "name": "Nickerson Bank"
  },
  "44255": {
    "longitude": -57.335,
    "latitude": 47.267,
    "name": "NE Burgeo Bank"
  },
  "44258": {
    "longitude": -63.403,
    "latitude": 44.502,
    "name": "Halifax Harbour"
  },
  "45001": {
    "longitude": -87.793,
    "latitude": 48.061,
    "name": "MID SUPERIOR- 60NM North Northeast Hancock, MI"
  },
  "45002": {
    "longitude": -86.411,
    "latitude": 45.344,
    "name": "NORTH MICHIGAN- Halfway between North Manitou and Washington Islands."
  },
  "45004": {
    "longitude": -86.585,
    "latitude": 47.585,
    "name": "EAST SUPERIOR -70 NM NE Marquette, MI"
  },
  "45005": {
    "longitude": -82.398,
    "latitude": 41.677,
    "name": "WEST ERIE - 16 NM NW of Lorain, OH"
  },
  "45006": {
    "longitude": -89.793,
    "latitude": 47.335,
    "name": "WEST SUPERIOR - 30NM NE of Outer Island, WI"
  },
  "45007": {
    "longitude": -87.026,
    "latitude": 42.674,
    "name": "SOUTH MICHIGAN - 43NM East Southeast of Milwaukee, WI"
  },
  "45013": {
    "longitude": -87.85,
    "latitude": 43.1,
    "name": "Atwater Park, WI"
  },
  "45025": {
    "longitude": -88.398,
    "latitude": 46.969,
    "name": "South Entrance to Keweenaw Waterway, MI"
  },
  "45026": {
    "longitude": -86.617,
    "latitude": 41.983,
    "name": "St. Joseph, MI"
  },
  "45029": {
    "longitude": -86.272,
    "latitude": 42.9,
    "name": "Holland, MI"
  },
  "45132": {
    "longitude": -81.215,
    "latitude": 42.463,
    "name": "Port Stanley"
  },
  "45135": {
    "longitude": -76.868,
    "latitude": 43.785,
    "name": "Prince Edward Pt"
  },
  "45137": {
    "longitude": -81.015,
    "latitude": 45.545,
    "name": "Georgian Bay"
  },
  "45139": {
    "longitude": -79.535,
    "latitude": 43.252,
    "name": "West Lake Ontario - Grimsby"
  },
  "45142": {
    "longitude": -79.29,
    "latitude": 42.737,
    "name": "Port Colborne"
  },
  "45143": {
    "longitude": -80.627,
    "latitude": 44.945,
    "name": "South Georgian Bay"
  },
  "45149": {
    "longitude": -82.075,
    "latitude": 43.542,
    "name": "Southern Lake Huron"
  },
  "45152": {
    "longitude": -79.715,
    "latitude": 46.233,
    "name": "Lake Nipissing"
  },
  "45154": {
    "longitude": -82.637,
    "latitude": 46.05,
    "name": "North Channel East"
  },
  "45159": {
    "longitude": -78.983,
    "latitude": 43.767,
    "name": "NW Lake Ontario Ajax"
  },
  "45165": {
    "longitude": -83.261,
    "latitude": 41.702,
    "name": "Oregon, OH"
  },
  "45166": {
    "longitude": -73.133,
    "latitude": 45.032,
    "name": "Lake Champlain"
  },
  "45168": {
    "longitude": -86.331,
    "latitude": 42.396,
    "name": "South Haven, MI"
  },
  "45170": {
    "longitude": -86.968,
    "latitude": 41.755,
    "name": "Michigan City, Indiana"
  },
  "46001": {
    "longitude": -147.92,
    "latitude": 56.304,
    "name": "WESTERN GULF OF ALASKA  - 175NM SE of Kodiak, AK"
  },
  "46002": {
    "longitude": -130.474,
    "latitude": 42.589,
    "name": "WEST OREGON - 275NM West of Coos Bay, OR"
  },
  "46004": {
    "longitude": -136.095,
    "latitude": 50.93,
    "name": "Middle Nomad"
  },
  "46005": {
    "longitude": -131,
    "latitude": 45.958,
    "name": "WEST WASHINGTON - 300NM West of Aberdeen, WA"
  },
  "46011": {
    "longitude": -120.992,
    "latitude": 35,
    "name": "SANTA MARIA - 21NM NW of Point Arguello, CA",
    "tideStation": {
      "name": "PORT SAN LUIS",
      "id": "9412110",
      "latitude": 35.1767,
      "longitude": -120.76,
      "distance": 34024
    }
  },
  "46012": {
    "longitude": -122.881,
    "latitude": 37.363,
    "name": "HALF MOON BAY - 24NM SSW of San Francisco, CA",
    "tideStation": {
      "name": "PILLAR POINT HARBOR",
      "id": "9414131",
      "latitude": 37.5025,
      "longitude": -122.482,
      "distance": 38558
    }
  },
  "46013": {
    "longitude": -123.301,
    "latitude": 38.242,
    "name": "BODEGA BAY - 48NM NNW of San Francisco, CA",
    "tideStation": {
      "name": "POINT REYES",
      "id": "9415020",
      "latitude": 37.9961,
      "longitude": -122.976,
      "distance": 39461
    }
  },
  "46014": {
    "longitude": -123.974,
    "latitude": 39.235,
    "name": "PT ARENA - 19NM North of Point Arena, CA",
    "tideStation": {
      "name": "NOYO HARBOR",
      "id": "9417426",
      "latitude": 39.4258,
      "longitude": -123.805,
      "distance": 25711
    }
  },
  "46015": {
    "longitude": -124.832,
    "latitude": 42.764,
    "name": "PORT ORFORD - 15 NM West of Port Orford, OR",
    "tideStation": {
      "name": "PORT ORFORD",
      "id": "9431647",
      "latitude": 42.739,
      "longitude": -124.498,
      "distance": 27485
    }
  },
  "46022": {
    "longitude": -124.531,
    "latitude": 40.72,
    "name": "EEL RIVER - 17NM WSW of Eureka, CA",
    "tideStation": {
      "name": "FIELDS LANDING",
      "id": "9418723",
      "latitude": 40.7233,
      "longitude": -124.222,
      "distance": 26109
    }
  },
  "46025": {
    "longitude": -119.053,
    "latitude": 33.749,
    "name": "Santa Monica Basin - 33NM WSW of Santa Monica, CA"
  },
  "46026": {
    "longitude": -122.839,
    "latitude": 37.755,
    "name": "SAN FRANCISCO - 18NM West of San Francisco, CA",
    "tideStation": {
      "name": "BOLINAS, BOLINAS LAGOON",
      "id": "9414958",
      "latitude": 37.908,
      "longitude": -122.678,
      "distance": 22119
    }
  },
  "46028": {
    "longitude": -121.884,
    "latitude": 35.741,
    "name": "CAPE SAN MARTIN - 55NM West NW of Morro Bay, CA"
  },
  "46029": {
    "longitude": -124.514,
    "latitude": 46.159,
    "name": "COLUMBIA RIVER BAR - 20NM West of Columbia River Mouth",
    "tideStation": {
      "name": "HAMMOND",
      "id": "9439011",
      "latitude": 46.2017,
      "longitude": -123.945,
      "distance": 44189
    }
  },
  "46035": {
    "longitude": -177.738,
    "latitude": 57.026,
    "name": "CENTRAL BERING SEA - 310 NM North of Adak, AK"
  },
  "46036": {
    "longitude": -133.938,
    "latitude": 48.355,
    "name": "South Nomad"
  },
  "46041": {
    "longitude": -124.731,
    "latitude": 47.353,
    "name": "CAPE ELIZABETH- 45NM NW of Aberdeen, WA"
  },
  "46042": {
    "longitude": -122.469,
    "latitude": 36.785,
    "name": "MONTEREY - 27NM WNW of Monterey, CA"
  },
  "46047": {
    "longitude": -119.536,
    "latitude": 32.403,
    "name": "TANNER BANK - 121NM West of San Diego, CA"
  },
  "46050": {
    "longitude": -124.526,
    "latitude": 44.656,
    "name": "STONEWALL BANK - 20NM West of Newport, OR",
    "tideStation": {
      "name": "SOUTH BEACH",
      "id": "9435380",
      "latitude": 44.625,
      "longitude": -124.043,
      "distance": 38475
    }
  },
  "46054": {
    "longitude": -120.477,
    "latitude": 34.265,
    "name": "WEST SANTA BARBARA  38 NM West of Santa Barbara, CA",
    "tideStation": {
      "name": "OIL PLATFORM HARVEST",
      "id": "9411406",
      "latitude": 34.4683,
      "longitude": -120.673,
      "distance": 28873
    }
  },
  "46060": {
    "longitude": -146.784,
    "latitude": 60.584,
    "name": "WEST ORCA BAY - 8NM NW of Hinchinbrook  IS , AK",
    "tideStation": {
      "name": "SEAL ISLAND",
      "id": "9454564",
      "latitude": 60.425,
      "longitude": -147.41,
      "distance": 38691
    }
  },
  "46061": {
    "longitude": -146.834,
    "latitude": 60.227,
    "name": "Seal Rocks - Between Montague and Hinchinbrook Islands, AK",
    "tideStation": {
      "name": "PERCH POINT",
      "id": "9454561",
      "latitude": 60.1267,
      "longitude": -147.395,
      "distance": 33081
    }
  },
  "46066": {
    "longitude": -155.047,
    "latitude": 52.785,
    "name": "SOUTH KODIAK - 310NM SSW of Kodiak, AK"
  },
  "46069": {
    "longitude": -120.212,
    "latitude": 33.674,
    "name": "SOUTH SANTA ROSA IS. CA"
  },
  "46072": {
    "longitude": -172.162,
    "latitude": 51.663,
    "name": "CENTRAL ALEUTIANS 230NM SW Dutch Harbor"
  },
  "46073": {
    "longitude": -172.001,
    "latitude": 55.031,
    "name": "SOUTHEAST BERING SEA -205NM WNW of Dutch Harbor, AK"
  },
  "46075": {
    "longitude": -160.806,
    "latitude": 53.911,
    "name": "SHUMAGIN ISLANDS - 85NM South of Sand Point, AK"
  },
  "46078": {
    "longitude": -152.64,
    "latitude": 55.99,
    "name": "ALBATROSS BANK - 104NM South of Kodiak, AK"
  },
  "46081": {
    "longitude": -148.263,
    "latitude": 60.799,
    "name": "Western Prince William Sound",
    "tideStation": {
      "name": "WHITTIER",
      "id": "9454949",
      "latitude": 60.7783,
      "longitude": -148.665,
      "distance": 22017
    }
  },
  "46082": {
    "longitude": -143.392,
    "latitude": 59.668,
    "name": "Cape Suckling - 35 NM SE of Kayak Is, AK"
  },
  "46084": {
    "longitude": -136.101,
    "latitude": 56.6,
    "name": "Cape Edgecumbe - 25NM SSW of Cape Edgecumbe, AK",
    "tideStation": {
      "name": "GOLF ISLAND",
      "id": "9451421",
      "latitude": 56.7867,
      "longitude": -135.393,
      "distance": 48104
    }
  },
  "46085": {
    "longitude": -142.492,
    "latitude": 55.868,
    "name": "CENTRAL GULF OF ALASKA -  265NM West of Cape Ommaney, AK"
  },
  "46086": {
    "longitude": -118.035,
    "latitude": 32.491,
    "name": "SAN CLEMENTE BASIN - 27NM SE OF San Clemente Is, CA"
  },
  "46087": {
    "longitude": -124.728,
    "latitude": 48.494,
    "name": "Neah Bay, - 6NM North of Cape Flattery, WA     (Traffic Separation Lighted Buoy)",
    "tideStation": {
      "name": "NEAH BAY",
      "id": "9443090",
      "latitude": 48.3667,
      "longitude": -124.611,
      "distance": 16594
    }
  },
  "46088": {
    "longitude": -123.159,
    "latitude": 48.336,
    "name": "New Dungeness - 17 NM NE of Port Angeles, WA",
    "tideStation": {
      "name": "RICHARDSON",
      "id": "9449982",
      "latitude": 48.4467,
      "longitude": -122.9,
      "distance": 22791
    }
  },
  "46089": {
    "longitude": -125.819,
    "latitude": 45.893,
    "name": "Tillamook, OR - 85 NM WNW of Tillamook, OR"
  },
  "46094": {
    "longitude": -124.3,
    "latitude": 44.642,
    "name": "Buoy NH-10 - West of Newport, OR",
    "tideStation": {
      "name": "SOUTH BEACH",
      "id": "9435380",
      "latitude": 44.625,
      "longitude": -124.043,
      "distance": 20480
    }
  },
  "46108": {
    "longitude": -151.817,
    "latitude": 59.59,
    "name": "Lower Cook Inlet - 204",
    "tideStation": {
      "name": "SELDOVIA",
      "id": "9455500",
      "latitude": 59.4405,
      "longitude": -151.719,
      "distance": 17555
    }
  },
  "46114": {
    "longitude": -122.35,
    "latitude": 36.717,
    "name": "West Monterey Bay - 23NM WNW of Monterey, CA",
    "tideStation": {
      "name": "MONTEREY",
      "id": "9413450",
      "latitude": 36.605,
      "longitude": -121.888,
      "distance": 43135
    }
  },
  "46131": {
    "longitude": -124.985,
    "latitude": 49.907,
    "name": "Sentry Shoal"
  },
  "46132": {
    "longitude": -127.932,
    "latitude": 49.738,
    "name": "South Brooks"
  },
  "46134": {
    "longitude": -123.495,
    "latitude": 48.648,
    "name": "Pat Bay",
    "tideStation": {
      "name": "HANBURY POINT, MOSQUITO PASS, SAN JUAN I.",
      "id": "9449828",
      "latitude": 48.5817,
      "longitude": -123.17,
      "distance": 25072
    }
  },
  "46145": {
    "longitude": -132.443,
    "latitude": 54.367,
    "name": "Central Dixon Entrance Buoy"
  },
  "46146": {
    "longitude": -123.727,
    "latitude": 49.34,
    "name": "Halibut Bank"
  },
  "46147": {
    "longitude": -131.225,
    "latitude": 51.828,
    "name": "South Moresby"
  },
  "46181": {
    "longitude": -128.832,
    "latitude": 53.833,
    "name": "Nanakwa Shoal"
  },
  "46183": {
    "longitude": -131.105,
    "latitude": 53.617,
    "name": "North Hecate Strait"
  },
  "46184": {
    "longitude": -138.85,
    "latitude": 53.915,
    "name": "North Nomad"
  },
  "46185": {
    "longitude": -129.792,
    "latitude": 52.425,
    "name": "South Hecate Strait"
  },
  "46204": {
    "longitude": -128.767,
    "latitude": 51.383,
    "name": "West Sea Otter"
  },
  "46205": {
    "longitude": -134.282,
    "latitude": 54.165,
    "name": "West Dixon Entrance"
  },
  "46206": {
    "longitude": -125.998,
    "latitude": 48.835,
    "name": "La Perouse Bank"
  },
  "46207": {
    "longitude": -129.915,
    "latitude": 50.875,
    "name": "East Dellwood"
  },
  "46208": {
    "longitude": -132.692,
    "latitude": 52.515,
    "name": "West Moresby"
  },
  "46211": {
    "longitude": -124.244,
    "latitude": 46.858,
    "name": "Grays Harbor, WA (036)",
    "tideStation": {
      "name": "WESTPORT",
      "id": "9441102",
      "latitude": 46.9043,
      "longitude": -124.105,
      "distance": 11779
    }
  },
  "46213": {
    "longitude": -124.74,
    "latitude": 40.294,
    "name": "Cape Mendocino, CA (094)"
  },
  "46214": {
    "longitude": -123.469,
    "latitude": 37.946,
    "name": "Point Reyes, CA (029)"
  },
  "46215": {
    "longitude": -120.859,
    "latitude": 35.204,
    "name": "Diablo Canyon, CA (076)",
    "tideStation": {
      "name": "PORT SAN LUIS",
      "id": "9412110",
      "latitude": 35.1767,
      "longitude": -120.76,
      "distance": 9512
    }
  },
  "46216": {
    "longitude": -119.803,
    "latitude": 34.333,
    "name": "Goleta Point, CA (107)",
    "tideStation": {
      "name": "SANTA BARBARA",
      "id": "9411340",
      "latitude": 34.4083,
      "longitude": -119.685,
      "distance": 13696
    }
  },
  "46217": {
    "longitude": -119.435,
    "latitude": 34.167,
    "name": "Anacapa Passage, CA (111)",
    "tideStation": {
      "name": "SANTA BARBARA",
      "id": "9411340",
      "latitude": 34.4083,
      "longitude": -119.685,
      "distance": 35303
    }
  },
  "46218": {
    "longitude": -120.782,
    "latitude": 34.458,
    "name": "Harvest, CA (071)",
    "tideStation": {
      "name": "OIL PLATFORM HARVEST",
      "id": "9411406",
      "latitude": 34.4683,
      "longitude": -120.673,
      "distance": 10080
    }
  },
  "46219": {
    "longitude": -119.881,
    "latitude": 33.221,
    "name": "San Nicolas Island, CA (067)"
  },
  "46221": {
    "longitude": -118.633,
    "latitude": 33.855,
    "name": "Santa Monica Bay, CA (028)",
    "tideStation": {
      "name": "SANTA MONICA",
      "id": "9410840",
      "latitude": 34.0083,
      "longitude": -118.5,
      "distance": 20985
    }
  },
  "46222": {
    "longitude": -118.317,
    "latitude": 33.618,
    "name": "San Pedro, CA (092)",
    "tideStation": {
      "name": "LOS ANGELES",
      "id": "9410660",
      "latitude": 33.72,
      "longitude": -118.272,
      "distance": 12059
    }
  },
  "46223": {
    "longitude": -117.767,
    "latitude": 33.459,
    "name": "Dana Point, CA (096)",
    "tideStation": {
      "name": "NEWPORT BAY ENTRANCE, CORONA DEL MAR",
      "id": "9410580",
      "latitude": 33.6033,
      "longitude": -117.883,
      "distance": 19294
    }
  },
  "46224": {
    "longitude": -117.471,
    "latitude": 33.179,
    "name": "Oceanside Offshore, CA (045)",
    "tideStation": {
      "name": "LA JOLLA",
      "id": "9410230",
      "latitude": 32.8667,
      "longitude": -117.258,
      "distance": 39946
    }
  },
  "46225": {
    "longitude": -117.392,
    "latitude": 32.93,
    "name": "Torrey Pines Outer, CA (100)",
    "tideStation": {
      "name": "LA JOLLA",
      "id": "9410230",
      "latitude": 32.8667,
      "longitude": -117.258,
      "distance": 14369
    }
  },
  "46229": {
    "longitude": -124.549,
    "latitude": 43.767,
    "name": "UMPQUA OFFSHORE, OR (139)",
    "tideStation": {
      "name": "HALF MOON BAY",
      "id": "9433445",
      "latitude": 43.675,
      "longitude": -124.192,
      "distance": 30529
    }
  },
  "46231": {
    "longitude": -117.37,
    "latitude": 32.747,
    "name": "Mission Bay, CA (093)",
    "tideStation": {
      "name": "LA JOLLA",
      "id": "9410230",
      "latitude": 32.8667,
      "longitude": -117.258,
      "distance": 16919
    }
  },
  "46232": {
    "longitude": -117.431,
    "latitude": 32.53,
    "name": "Point Loma South, CA  (191)",
    "tideStation": {
      "name": "SAN DIEGO",
      "id": "9410170",
      "latitude": 32.7142,
      "longitude": -117.173,
      "distance": 31679
    }
  },
  "46236": {
    "longitude": -121.947,
    "latitude": 36.761,
    "name": "Monterey Canyon Outer, CA  (156)",
    "tideStation": {
      "name": "MONTEREY",
      "id": "9413450",
      "latitude": 36.605,
      "longitude": -121.888,
      "distance": 18097
    }
  },
  "46237": {
    "longitude": -122.634,
    "latitude": 37.786,
    "name": "San Francisco Bar, CA  (142)",
    "tideStation": {
      "name": "BOLINAS, BOLINAS LAGOON",
      "id": "9414958",
      "latitude": 37.908,
      "longitude": -122.678,
      "distance": 14084
    }
  },
  "46239": {
    "longitude": -122.102,
    "latitude": 36.342,
    "name": "Point Sur, CA (157)",
    "tideStation": {
      "name": "MONTEREY",
      "id": "9413450",
      "latitude": 36.605,
      "longitude": -121.888,
      "distance": 34922
    }
  },
  "46240": {
    "longitude": -121.907,
    "latitude": 36.626,
    "name": "Cabrillo Point, Monterey Bay, CA  (158)",
    "tideStation": {
      "name": "MONTEREY",
      "id": "9413450",
      "latitude": 36.605,
      "longitude": -121.888,
      "distance": 2884
    }
  },
  "46242": {
    "longitude": -117.439,
    "latitude": 33.22,
    "name": "Camp Pendleton Nearshore, CA  (043)",
    "tideStation": {
      "name": "LA JOLLA",
      "id": "9410230",
      "latitude": 32.8667,
      "longitude": -117.258,
      "distance": 42675
    }
  },
  "46243": {
    "longitude": -124.129,
    "latitude": 46.215,
    "name": "Clatsop Spit, OR - 162",
    "tideStation": {
      "name": "HAMMOND",
      "id": "9439011",
      "latitude": 46.2017,
      "longitude": -123.945,
      "distance": 14276
    }
  },
  "46244": {
    "longitude": -124.356,
    "latitude": 40.888,
    "name": "Humboldt Bay, North Spit, CA (168)",
    "tideStation": {
      "name": "SAMOA, HUMBOLDT BAY",
      "id": "9418817",
      "latitude": 40.8267,
      "longitude": -124.18,
      "distance": 16327
    }
  },
  "46248": {
    "longitude": -124.645,
    "latitude": 46.133,
    "name": "Astoria Canyon, OR  (179)"
  },
  "46252": {
    "longitude": -119.257,
    "latitude": 33.953,
    "name": "Anacapa Passage South, CA (212)"
  },
  "46253": {
    "longitude": -118.184,
    "latitude": 33.578,
    "name": "San Pedro South, CA - 213",
    "tideStation": {
      "name": "LOS ANGELES",
      "id": "9410660",
      "latitude": 33.72,
      "longitude": -118.272,
      "distance": 17740
    }
  },
  "46254": {
    "longitude": -117.267,
    "latitude": 32.868,
    "name": "SCRIPPS Nearshore, CA (201)",
    "tideStation": {
      "name": "LA JOLLA",
      "id": "9410230",
      "latitude": 32.8667,
      "longitude": -117.258,
      "distance": 855
    }
  },
  "46255": {
    "longitude": -119.651,
    "latitude": 33.4,
    "name": "Begg Rock, CA  (138)"
  },
  "51000": {
    "longitude": -154.056,
    "latitude": 23.546,
    "name": "NORTHERN HAWAII ONE - 245NM NE of Honolulu HI"
  },
  "51002": {
    "longitude": -157.803,
    "latitude": 17.056,
    "name": "SOUTHWEST HAWAII - 215NM SSW of Hilo, HI"
  },
  "51003": {
    "longitude": -160.569,
    "latitude": 19.289,
    "name": "WESTERN  HAWAII - 205 NM SW of Honolulu, HI"
  },
  "51004": {
    "longitude": -152.395,
    "latitude": 17.602,
    "name": "SOUTHEAST HAWAII - 205 NM Southeast of Hilo, HI"
  },
  "51101": {
    "longitude": -162.231,
    "latitude": 24.318,
    "name": "NORTHWESTERN HAWAII TWO - 190NM NW of Kauai Is, HI  "
  },
  "51201": {
    "longitude": -158.12,
    "latitude": 21.669,
    "name": "Waimea Bay, HI (106)",
    "tideStation": {
      "name": "PEARL HARBOR, FORD ISLAND FERRY",
      "id": "1612404",
      "latitude": 21.3683,
      "longitude": -157.94,
      "distance": 38162
    }
  },
  "51202": {
    "longitude": -157.679,
    "latitude": 21.414,
    "name": "Mokapu Point, HI (098)",
    "tideStation": {
      "name": "MOKUOLOE",
      "id": "1612480",
      "latitude": 21.4331,
      "longitude": -157.79,
      "distance": 11701
    }
  },
  "51204": {
    "longitude": -158.124,
    "latitude": 21.281,
    "name": "Barbers Point, HI #2 (165)",
    "tideStation": {
      "name": "PEARL HARBOR ENTRANCE, BISHOP POINT",
      "id": "1612366",
      "latitude": 21.33,
      "longitude": -157.967,
      "distance": 17170
    }
  },
  "51205": {
    "longitude": -156.425,
    "latitude": 21.018,
    "name": "Pauwela, Maui, HI (187)",
    "tideStation": {
      "name": "KAHULUI, KAHULUI HARBOR",
      "id": "1615680",
      "latitude": 20.895,
      "longitude": -156.476,
      "distance": 14615
    }
  },
  "51206": {
    "longitude": -154.968,
    "latitude": 19.781,
    "name": "Hilo, Hawaii, HI - 188",
    "tideStation": {
      "name": "HILO, HILO BAY, KUHIO BAY",
      "id": "1617760",
      "latitude": 19.7303,
      "longitude": -155.055,
      "distance": 10707
    }
  },
  "51207": {
    "longitude": -157.752,
    "latitude": 21.477,
    "name": "Kaneohe Bay, HI - 198",
    "tideStation": {
      "name": "MOKUOLOE",
      "id": "1612480",
      "latitude": 21.4331,
      "longitude": -157.79,
      "distance": 6256
    }
  },
  "51208": {
    "longitude": -159.575,
    "latitude": 22.286,
    "name": "Hanalei, Kauai, HI (202)",
    "tideStation": {
      "name": "PORT ALLEN, HANAPEPE BAY",
      "id": "1611347",
      "latitude": 21.9033,
      "longitude": -159.592,
      "distance": 42413
    }
  },
  "51209": {
    "longitude": -170.493,
    "latitude": -14.265,
    "name": "Aunuu, American Samoa (189)",
    "tideStation": {
      "name": "PAGO PAGO, AMERICAN SAMOA",
      "id": "1770000",
      "latitude": -14.28,
      "longitude": -170.69,
      "distance": 21322
    }
  },
  "52200": {
    "longitude": 144.788,
    "latitude": 13.354,
    "name": "Ipan, Guam (121)",
    "tideStation": {
      "name": "PAGO BAY, GUAM",
      "id": "1631428",
      "latitude": 13.4283,
      "longitude": 144.797,
      "distance": 8278
    }
  },
  "52834": {
    "longitude": 126.08,
    "latitude": 11.54,
    "name": "Unnamed buoy #52834"
  },
  "52838": {
    "longitude": 172.09,
    "latitude": -2.19,
    "name": "Unnamed buoy #52838"
  },
  "52839": {
    "longitude": 164.01,
    "latitude": 34.93,
    "name": "Unnamed buoy #52839"
  },
  "52841": {
    "longitude": 140.22,
    "latitude": 26.19,
    "name": "Unnamed buoy #52841"
  },
  "52842": {
    "longitude": -171.93,
    "latitude": -12.15,
    "name": "Unnamed buoy #52842"
  },
  "52843": {
    "longitude": 175.84,
    "latitude": -2.7,
    "name": "Unnamed buoy #52843"
  },
  "52862": {
    "longitude": 178.79,
    "latitude": -1.9,
    "name": "Unnamed buoy #52862"
  },
  "62001": {
    "longitude": -5,
    "latitude": 45.23,
    "name": "Gascogne Buoy"
  },
  "62029": {
    "longitude": -12.43,
    "latitude": 48.72,
    "name": "K1 Buoy"
  },
  "62030": {
    "longitude": -4.217,
    "latitude": 50.25,
    "name": "L4 Buoy"
  },
  "62081": {
    "longitude": -13.55,
    "latitude": 51,
    "name": "K2 Buoy"
  },
  "62091": {
    "longitude": -5.42,
    "latitude": 53.47,
    "name": "M2 - 20 NM East of Lambay"
  },
  "62092": {
    "longitude": -10.54,
    "latitude": 51.21,
    "name": "M3 - 30 NM Southwest of Mizen Head"
  },
  "62093": {
    "longitude": -9.75,
    "latitude": 55.01,
    "name": "M4 - Donegal Bay"
  },
  "62094": {
    "longitude": -6.7,
    "latitude": 51.7,
    "name": "M5 - South East"
  },
  "62095": {
    "longitude": -15.53,
    "latitude": 53.04,
    "name": "M6 - West Coast"
  },
  "62102": {
    "longitude": 1.8,
    "latitude": 57.9,
    "name": "Unnamed buoy #62102"
  },
  "62103": {
    "longitude": -2.9,
    "latitude": 49.9,
    "name": "Unnamed buoy #62103"
  },
  "62104": {
    "longitude": 1.3,
    "latitude": 57.4,
    "name": "Unnamed buoy #62104"
  },
  "62107": {
    "longitude": -6.1,
    "latitude": 50.102,
    "name": "Sevenstones Lightship"
  },
  "62111": {
    "longitude": -0.3,
    "latitude": 58,
    "name": "Unnamed buoy #62111"
  },
  "62112": {
    "longitude": 0.198,
    "latitude": 58.4,
    "name": "Unnamed buoy #62112"
  },
  "62113": {
    "longitude": 0.2,
    "latitude": 58.4,
    "name": "Unnamed buoy #62113"
  },
  "62114": {
    "longitude": 0,
    "latitude": 58.3,
    "name": "Tartan \"A\" AWS"
  },
  "62115": {
    "longitude": 3,
    "latitude": 58.1,
    "name": "Unnamed buoy #62115"
  },
  "62116": {
    "longitude": 1.1,
    "latitude": 57.6,
    "name": "Unnamed buoy #62116"
  },
  "62117": {
    "longitude": 0,
    "latitude": 57.9,
    "name": "Unnamed buoy #62117"
  },
  "62118": {
    "longitude": 0.9,
    "latitude": 57.7,
    "name": "Unnamed buoy #62118"
  },
  "62119": {
    "longitude": 1.9,
    "latitude": 57,
    "name": "Unnamed buoy #62119"
  },
  "62120": {
    "longitude": 2.1,
    "latitude": 56.4,
    "name": "Unnamed buoy #62120"
  },
  "62121": {
    "longitude": 2.7,
    "latitude": 53.5,
    "name": "Carrack AWS"
  },
  "62122": {
    "longitude": 1.6,
    "latitude": 57.3,
    "name": "Unnamed buoy #62122"
  },
  "62123": {
    "longitude": 2.2,
    "latitude": 56.3,
    "name": "Unnamed buoy #62123"
  },
  "62124": {
    "longitude": -3.6,
    "latitude": 53.6,
    "name": "Conwy"
  },
  "62127": {
    "longitude": 0.7,
    "latitude": 54,
    "name": "Cleeton AWS"
  },
  "62128": {
    "longitude": 1.4,
    "latitude": 58.7,
    "name": "Unnamed buoy #62128"
  },
  "62129": {
    "longitude": 0.3,
    "latitude": 58.4,
    "name": "Unnamed buoy #62129"
  },
  "62130": {
    "longitude": 1.3,
    "latitude": 58.7,
    "name": "Brae A"
  },
  "62131": {
    "longitude": 1.2,
    "latitude": 53.9,
    "name": "Unnamed buoy #62131"
  },
  "62132": {
    "longitude": 2,
    "latitude": 56.4,
    "name": "Unnamed buoy #62132"
  },
  "62133": {
    "longitude": 0.9,
    "latitude": 57.1,
    "name": "Unnamed buoy #62133"
  },
  "62134": {
    "longitude": 1.4,
    "latitude": 58,
    "name": "Unnamed buoy #62134"
  },
  "62135": {
    "longitude": 1.6,
    "latitude": 54.2,
    "name": "Trent"
  },
  "62137": {
    "longitude": 1.808,
    "latitude": 57,
    "name": "Unnamed buoy #62137"
  },
  "62138": {
    "longitude": 0.4,
    "latitude": 53.8,
    "name": "Unnamed buoy #62138"
  },
  "62139": {
    "longitude": 2,
    "latitude": 53.3,
    "name": "Unnamed buoy #62139"
  },
  "62140": {
    "longitude": 1.3,
    "latitude": 57.3,
    "name": "Unnamed buoy #62140"
  },
  "62143": {
    "longitude": 1.8,
    "latitude": 57.7,
    "name": "Unnamed buoy #62143"
  },
  "62144": {
    "longitude": 1.7,
    "latitude": 53.4,
    "name": "Clipper AWS"
  },
  "62145": {
    "longitude": 2.8,
    "latitude": 53.102,
    "name": "North Sea"
  },
  "62146": {
    "longitude": 2.1,
    "latitude": 57.2,
    "name": "Lomond AWS"
  },
  "62148": {
    "longitude": 1.5,
    "latitude": 53.6,
    "name": "Barque AWS"
  },
  "62149": {
    "longitude": 1.1,
    "latitude": 53.7,
    "name": "West Sole \"A\" AWS"
  },
  "62150": {
    "longitude": 0.7,
    "latitude": 53.6,
    "name": "Amethyst AWS"
  },
  "62151": {
    "longitude": 2.2,
    "latitude": 56.8,
    "name": "Unnamed buoy #62151"
  },
  "62152": {
    "longitude": 1.792,
    "latitude": 57,
    "name": "Unnamed buoy #62152"
  },
  "62153": {
    "longitude": 2,
    "latitude": 57.3,
    "name": "Unnamed buoy #62153"
  },
  "62154": {
    "longitude": 2.2,
    "latitude": 56.4,
    "name": "Unnamed buoy #62154"
  },
  "62155": {
    "longitude": 0.7,
    "latitude": 57.7,
    "name": "Unnamed buoy #62155"
  },
  "62156": {
    "longitude": 1.1,
    "latitude": 57.4,
    "name": "Unnamed buoy #62156"
  },
  "62157": {
    "longitude": 0.1,
    "latitude": 58.2,
    "name": "Unnamed buoy #62157"
  },
  "62159": {
    "longitude": -2,
    "latitude": 61,
    "name": "Unnamed buoy #62159"
  },
  "62160": {
    "longitude": 2.3,
    "latitude": 56.6,
    "name": "Unnamed buoy #62160"
  },
  "62161": {
    "longitude": 1.2,
    "latitude": 58.4,
    "name": "Unnamed buoy #62161"
  },
  "62162": {
    "longitude": 0.5,
    "latitude": 57.4,
    "name": "Unnamed buoy #62162"
  },
  "62163": {
    "longitude": -8.47,
    "latitude": 47.55,
    "name": "Brittany Buoy"
  },
  "62164": {
    "longitude": 0.8,
    "latitude": 57.2,
    "name": "Anasuria AWS"
  },
  "62165": {
    "longitude": 1.1,
    "latitude": 54,
    "name": "Ravenspurn North AWS"
  },
  "62166": {
    "longitude": 2.5,
    "latitude": 53,
    "name": "Thames"
  },
  "62167": {
    "longitude": 2.3,
    "latitude": 53.4,
    "name": "Unnamed buoy #62167"
  },
  "62168": {
    "longitude": 1.1,
    "latitude": 58,
    "name": "Unnamed buoy #62168"
  },
  "62170": {
    "longitude": 2,
    "latitude": 51.24,
    "name": "F3 Light Vessel"
  },
  "62296": {
    "longitude": 2.4,
    "latitude": 53.2,
    "name": "Unnamed buoy #62296"
  },
  "62297": {
    "longitude": 1.5,
    "latitude": 58.8,
    "name": "Unnamed buoy #62297"
  },
  "62298": {
    "longitude": -8.6,
    "latitude": 49.4,
    "name": "Celtic Sea Buoy"
  },
  "62301": {
    "longitude": -4.42,
    "latitude": 52.22,
    "name": "Aberporth Buoy"
  },
  "62303": {
    "longitude": -5.1,
    "latitude": 51.602,
    "name": "Pembroke Buoy"
  },
  "62304": {
    "longitude": 1.8,
    "latitude": 51.102,
    "name": "Sandettie Lightship"
  },
  "62305": {
    "longitude": 0,
    "latitude": 50.4,
    "name": "Greenwich Lightship"
  },
  "62442": {
    "longitude": -16.5,
    "latitude": 49,
    "name": "Pap"
  },
  "63055": {
    "longitude": 1.6,
    "latitude": 60.6,
    "name": "Unnamed buoy #63055"
  },
  "63056": {
    "longitude": 1.5,
    "latitude": 59.7,
    "name": "Unnamed buoy #63056"
  },
  "63057": {
    "longitude": 1.5,
    "latitude": 59.2,
    "name": "Unnamed buoy #63057"
  },
  "63058": {
    "longitude": 2.2,
    "latitude": 53,
    "name": "Unnamed buoy #63058"
  },
  "63059": {
    "longitude": -0.9,
    "latitude": 57.8,
    "name": "Unnamed buoy #63059"
  },
  "63101": {
    "longitude": 0.9,
    "latitude": 61.2,
    "name": "Unnamed buoy #63101"
  },
  "63102": {
    "longitude": 1.4,
    "latitude": 60.8,
    "name": "Unnamed buoy #63102"
  },
  "63103": {
    "longitude": 1.1,
    "latitude": 61.2,
    "name": "Unnamed buoy #63103"
  },
  "63104": {
    "longitude": 1.6,
    "latitude": 61.2,
    "name": "Unnamed buoy #63104"
  },
  "63105": {
    "longitude": 1.692,
    "latitude": 61,
    "name": "Brent \"B\" AWS"
  },
  "63106": {
    "longitude": 1.7,
    "latitude": 60.983,
    "name": "Unnamed buoy #63106"
  },
  "63107": {
    "longitude": 1.7,
    "latitude": 61.017,
    "name": "Unnamed buoy #63107"
  },
  "63108": {
    "longitude": 1.7,
    "latitude": 60.8,
    "name": "Unnamed buoy #63108"
  },
  "63109": {
    "longitude": 1.5,
    "latitude": 59.6,
    "name": "Unnamed buoy #63109"
  },
  "63110": {
    "longitude": 1.5,
    "latitude": 59.5,
    "name": "Beryl A AWS"
  },
  "63111": {
    "longitude": 1.5,
    "latitude": 61.3,
    "name": "Unnamed buoy #63111"
  },
  "63112": {
    "longitude": 1,
    "latitude": 61.1,
    "name": "Cormorant AWS"
  },
  "63113": {
    "longitude": 1.708,
    "latitude": 61,
    "name": "Brent \"A\" AWS"
  },
  "63114": {
    "longitude": 1.7,
    "latitude": 61.3,
    "name": "Unnamed buoy #63114"
  },
  "63115": {
    "longitude": 1.3,
    "latitude": 61.6,
    "name": "Magnus AWS"
  },
  "63116": {
    "longitude": 1.1,
    "latitude": 61,
    "name": "Unnamed buoy #63116"
  },
  "63117": {
    "longitude": 1.1,
    "latitude": 61.4,
    "name": "Eider AWS"
  },
  "63118": {
    "longitude": 1.5,
    "latitude": 61.4,
    "name": "Unnamed buoy #63118"
  },
  "63120": {
    "longitude": 2.2,
    "latitude": 54.2,
    "name": "Unnamed buoy #63120"
  },
  "64041": {
    "longitude": -2.602,
    "latitude": 60.704,
    "name": "Unnamed buoy #64041"
  },
  "64045": {
    "longitude": -11.42,
    "latitude": 59.07,
    "name": "K5 Buoy"
  },
  "64046": {
    "longitude": -4.167,
    "latitude": 60.483,
    "name": "K7 Buoy"
  },
  "64049": {
    "longitude": 1.2,
    "latitude": 57.4,
    "name": "Unnamed buoy #64049"
  },
  "18CI3": {
    "longitude": -86.91,
    "latitude": 41.73,
    "name": "Michigan City, IN"
  },
  "41S43": {
    "longitude": -64.856,
    "latitude": 21.132,
    "name": "SCOOP Buoy (SCP12)"
  },
  "41S46": {
    "longitude": -68.481,
    "latitude": 23.866,
    "name": "SCOOP Buoy (SCP10)"
  },
  "41S47": {
    "longitude": -71.589,
    "latitude": 27.536,
    "name": "SCOOP Buoy (SCP09)"
  },
  "42S13": {
    "longitude": -85.74,
    "latitude": 26.007,
    "name": "Unnamed buoy #42S13"
  },
  "42S14": {
    "longitude": -89.611,
    "latitude": 30.356,
    "name": "Unnamed buoy #42S14",
    "tideStation": {
      "name": "WAVELAND",
      "id": "8747766",
      "latitude": 30.2817,
      "longitude": -89.3667,
      "distance": 24898
    }
  },
  "42S60": {
    "longitude": -63.188,
    "latitude": 16.406,
    "name": "SCOOP Buoy (SCP17)"
  },
  "AAMC1": {
    "longitude": -122.3,
    "latitude": 37.772,
    "name": "9414750 - Alameda, CA",
    "tideStation": {
      "name": "ALAMEDA",
      "id": "9414750",
      "latitude": 37.7717,
      "longitude": -122.298,
      "distance": 179
    }
  },
  "ACYN4": {
    "longitude": -74.418,
    "latitude": 39.357,
    "name": "8534720 - Atlantic City, NJ",
    "tideStation": {
      "name": "ATLANTIC CITY",
      "id": "8534720",
      "latitude": 39.355,
      "longitude": -74.4183,
      "distance": 224
    }
  },
  "ADKA2": {
    "longitude": -176.637,
    "latitude": 51.861,
    "name": "9461380 - Adak Island, AK",
    "tideStation": {
      "name": "ADAK ISLAND",
      "id": "9461380",
      "latitude": 51.8633,
      "longitude": -176.632,
      "distance": 429
    }
  },
  "AGCM4": {
    "longitude": -82.527,
    "latitude": 42.621,
    "name": "9014070 - Algonac, MI"
  },
  "ALIA2": {
    "longitude": -154.247,
    "latitude": 56.898,
    "name": "9457804 - Alitak, AK",
    "tideStation": {
      "name": "ALITAK",
      "id": "9457804",
      "latitude": 56.8983,
      "longitude": -154.247,
      "distance": 33
    }
  },
  "ALXN6": {
    "longitude": -75.934,
    "latitude": 44.331,
    "name": "8311062 - Alexandria Bay, NY"
  },
  "AMAA2": {
    "longitude": -151.952,
    "latitude": 58.915,
    "name": "East Amatuli Island Light, AK"
  },
  "AMRL1": {
    "longitude": -91.338,
    "latitude": 29.45,
    "name": "8764227 - Amerada Pass, LA",
    "tideStation": {
      "name": "STOUTS PASS AT SIX MILE LAKE",
      "id": "8764025",
      "latitude": 29.7433,
      "longitude": -91.23,
      "distance": 34153
    }
  },
  "ANMN6": {
    "longitude": -73.917,
    "latitude": 42.018,
    "name": "Field Station, Hudson River Reserve, NY",
    "tideStation": {
      "name": "HYDE PARK",
      "id": "8518951",
      "latitude": 41.7833,
      "longitude": -73.95,
      "distance": 26212
    }
  },
  "ANTA2": {
    "longitude": -149.89,
    "latitude": 61.238,
    "name": "9455920 - Anchorage, AK",
    "tideStation": {
      "name": "ANCHORAGE",
      "id": "9455920",
      "latitude": 61.2383,
      "longitude": -149.89,
      "distance": 33
    }
  },
  "ANVC1": {
    "longitude": -123.711,
    "latitude": 38.915,
    "name": "9416841 - Arena Cove, CA",
    "tideStation": {
      "name": "ARENA COVE",
      "id": "9416841",
      "latitude": 38.9133,
      "longitude": -123.708,
      "distance": 321
    }
  },
  "APAM2": {
    "longitude": -76.479,
    "latitude": 38.983,
    "name": "8575512 - Annapolis, MD",
    "tideStation": {
      "name": "ANNAPOLIS",
      "id": "8575512",
      "latitude": 38.9833,
      "longitude": -76.4816,
      "distance": 228
    }
  },
  "APCF1": {
    "longitude": -84.98,
    "latitude": 29.724,
    "name": "8728690 - Apalachicola, FL",
    "tideStation": {
      "name": "APALACHICOLA",
      "id": "8728690",
      "latitude": 29.7267,
      "longitude": -84.9817,
      "distance": 342
    }
  },
  "APNM4": {
    "longitude": -83.424,
    "latitude": 45.06,
    "name": "Alpena Harbor Light, MI"
  },
  "APRP7": {
    "longitude": 144.657,
    "latitude": 13.444,
    "name": "1630000 - Apra Harbor, Guam",
    "tideStation": {
      "name": "APRA HARBOR, GUAM",
      "id": "1630000",
      "latitude": 13.4387,
      "longitude": 144.653,
      "distance": 729
    }
  },
  "APXF1": {
    "longitude": -84.884,
    "latitude": 29.791,
    "name": "East Bay, Apalachicola Reserve, FL",
    "tideStation": {
      "name": "APALACHICOLA",
      "id": "8728690",
      "latitude": 29.7267,
      "longitude": -84.9817,
      "distance": 11836
    }
  },
  "AROP4": {
    "longitude": -66.702,
    "latitude": 18.48,
    "name": "9757809 - Arecibo, PR",
    "tideStation": {
      "name": "ARECIBO",
      "id": "9757809",
      "latitude": 18.4805,
      "longitude": -66.7024,
      "distance": 70
    }
  },
  "ARPF1": {
    "longitude": -82.667,
    "latitude": 28.433,
    "name": "APK - Aripeka, FL",
    "tideStation": {
      "name": "BAYPORT",
      "id": "8727151",
      "latitude": 28.5333,
      "longitude": -82.65,
      "distance": 11240
    }
  },
  "ASTO3": {
    "longitude": -123.768,
    "latitude": 46.207,
    "name": "9439040 - Astoria, OR",
    "tideStation": {
      "name": "ASTORIA",
      "id": "9439040",
      "latitude": 46.2073,
      "longitude": -123.768,
      "distance": 33
    }
  },
  "ATGM1": {
    "longitude": -68.204,
    "latitude": 44.392,
    "name": "8413320 - Bar Harbor, ME",
    "tideStation": {
      "name": "BAR HARBOR",
      "id": "8413320",
      "latitude": 44.3917,
      "longitude": -68.205,
      "distance": 86
    }
  },
  "ATKA2": {
    "longitude": -174.173,
    "latitude": 52.232,
    "name": "9461710 - Atka, AK",
    "tideStation": {
      "name": "ATKA",
      "id": "9461710",
      "latitude": 52.2317,
      "longitude": -174.173,
      "distance": 33
    }
  },
  "AUGA2": {
    "longitude": -153.348,
    "latitude": 59.378,
    "name": "Augustine Island, AK"
  },
  "BABT2": {
    "longitude": -97.405,
    "latitude": 27.297,
    "name": "8776604 - Baffin Bay; Point of Rocks, TX",
    "tideStation": {
      "name": "BOB HALL PIER, CORPUS CHRISTI",
      "id": "8775870",
      "latitude": 27.58,
      "longitude": -97.2167,
      "distance": 36469
    }
  },
  "BARA9": {
    "longitude": -61.821,
    "latitude": 17.591,
    "name": "9761115 - Barbuda, Barbuda",
    "tideStation": {
      "name": "BARBUDA",
      "id": "9761115",
      "latitude": 17.5907,
      "longitude": -61.8206,
      "distance": 54
    }
  },
  "BATN6": {
    "longitude": -74.014,
    "latitude": 40.701,
    "name": "8518750 - The Battery, NY",
    "tideStation": {
      "name": "THE BATTERY",
      "id": "8518750",
      "latitude": 40.7006,
      "longitude": -74.0142,
      "distance": 48
    }
  },
  "BDRN4": {
    "longitude": -74.87,
    "latitude": 40.082,
    "name": "8539094 - Burlington, Delaware River, NJ",
    "tideStation": {
      "name": "BURLINGTON, DELAWARE RIVER",
      "id": "8539094",
      "latitude": 40.0817,
      "longitude": -74.8697,
      "distance": 42
    }
  },
  "BEPB6": {
    "longitude": -64.701,
    "latitude": 32.374,
    "name": "2695540 - Bermuda Esso Pier",
    "tideStation": {
      "name": "BERMUDA ESSO PIER",
      "id": "2695540",
      "latitude": 32.3734,
      "longitude": -64.7033,
      "distance": 226
    }
  },
  "BFTN7": {
    "longitude": -76.671,
    "latitude": 34.717,
    "name": "8656483 - Beaufort, NC",
    "tideStation": {
      "name": "BEAUFORT",
      "id": "8656483",
      "latitude": 34.72,
      "longitude": -76.67,
      "distance": 345
    }
  },
  "BGCF1": {
    "longitude": -81.881,
    "latitude": 26.404,
    "name": "Big Carlos Pass, FL",
    "tideStation": {
      "name": "FORT MYERS",
      "id": "8725520",
      "latitude": 26.6477,
      "longitude": -81.8712,
      "distance": 27019
    }
  },
  "BGNN4": {
    "longitude": -74.146,
    "latitude": 40.639,
    "name": "8519483 - Bergen Point West Reach, NY",
    "tideStation": {
      "name": "BERGEN POINT WEST REACH",
      "id": "8519483",
      "latitude": 40.6367,
      "longitude": -74.1417,
      "distance": 444
    }
  },
  "BGXN3": {
    "longitude": -70.83,
    "latitude": 43.059,
    "name": "Greenland, Great Bay Reserve, NH",
    "tideStation": {
      "name": "SEAVEY ISLAND",
      "id": "8419870",
      "latitude": 43.08,
      "longitude": -70.7417,
      "distance": 7561
    }
  },
  "BHBM3": {
    "longitude": -71.05,
    "latitude": 42.355,
    "name": "8443970 - Boston, MA",
    "tideStation": {
      "name": "BOSTON",
      "id": "8443970",
      "latitude": 42.3548,
      "longitude": -71.0534,
      "distance": 281
    }
  },
  "BHRI3": {
    "longitude": -87.147,
    "latitude": 41.646,
    "name": "Burns Harbor, IN"
  },
  "BIGM4": {
    "longitude": -87.727,
    "latitude": 46.827,
    "name": "Big Bay, MI"
  },
  "BISM2": {
    "longitude": -76.039,
    "latitude": 38.22,
    "name": "8571421 - Bishops Head, MD",
    "tideStation": {
      "name": "BISHOPS HEAD",
      "id": "8571421",
      "latitude": 38.22,
      "longitude": -76.0383,
      "distance": 61
    }
  },
  "BKBF1": {
    "longitude": -81.692,
    "latitude": 30.192,
    "name": "8720357 -  I-295 Bridge, St Johns River, FL",
    "tideStation": {
      "name": "I-295 BRIDGE, ST JOHNS RIVER",
      "id": "8720357",
      "latitude": 30.1917,
      "longitude": -81.6917,
      "distance": 44
    }
  },
  "BKTL1": {
    "longitude": -93.301,
    "latitude": 30.19,
    "name": "8767961 - Lake Charles Bulk Terminal, LA",
    "tideStation": {
      "name": "BULK TERMINAL",
      "id": "8767961",
      "latitude": 30.1903,
      "longitude": -93.3007,
      "distance": 44
    }
  },
  "BLIA2": {
    "longitude": -146.884,
    "latitude": 60.839,
    "name": "Bligh Reef Light, AK",
    "tideStation": {
      "name": "VALDEZ",
      "id": "9454240",
      "latitude": 61.125,
      "longitude": -146.362,
      "distance": 42594
    }
  },
  "BLIF1": {
    "longitude": -81.523,
    "latitude": 30.393,
    "name": "8720233 - Blount Island Command, St Johns River, FL",
    "tideStation": {
      "name": "CLAPBOARD CREEK, PELOTES ISLAND",
      "id": "8720198",
      "latitude": 30.4067,
      "longitude": -81.51,
      "distance": 1967
    }
  },
  "BLTM2": {
    "longitude": -76.579,
    "latitude": 39.267,
    "name": "8574680 - Baltimore, MD",
    "tideStation": {
      "name": "BALTIMORE",
      "id": "8574680",
      "latitude": 39.2667,
      "longitude": -76.5783,
      "distance": 69
    }
  },
  "BLTM3": {
    "longitude": -71.174,
    "latitude": 41.704,
    "name": "8447387 - Borden Flats Light at Fall River, MA",
    "tideStation": {
      "name": "FALL RIVER",
      "id": "8447386",
      "latitude": 41.7043,
      "longitude": -71.1641,
      "distance": 825
    }
  },
  "BRHC3": {
    "longitude": -73.181,
    "latitude": 41.174,
    "name": "8467150 - Bridgeport, CT",
    "tideStation": {
      "name": "BRIDGEPORT",
      "id": "8467150",
      "latitude": 41.1733,
      "longitude": -73.1817,
      "distance": 97
    }
  },
  "BRND1": {
    "longitude": -75.113,
    "latitude": 38.987,
    "name": "8555889 - Brandywine Shoal Light, DE",
    "tideStation": {
      "name": "BRANDYWINE SHOAL LIGHT",
      "id": "8555889",
      "latitude": 38.9867,
      "longitude": -75.1133,
      "distance": 42
    }
  },
  "BSBM4": {
    "longitude": -86.514,
    "latitude": 44.055,
    "name": "Big Sable Point, MI"
  },
  "BSCA1": {
    "longitude": -87.829,
    "latitude": 30.329,
    "name": "Bon Secour, AL",
    "tideStation": {
      "name": "GULF SHORES, ICWW",
      "id": "8731439",
      "latitude": 30.2799,
      "longitude": -87.6843,
      "distance": 14945
    }
  },
  "BSLM2": {
    "longitude": -76.708,
    "latitude": 38.781,
    "name": "Jug Bay, Chesapeake Bay, MD",
    "tideStation": {
      "name": "LOWER MARLBORO",
      "id": "8579542",
      "latitude": 38.655,
      "longitude": -76.6833,
      "distance": 14151
    }
  },
  "BUFN6": {
    "longitude": -78.89,
    "latitude": 42.878,
    "name": "9063020 - Buffalo, NY"
  },
  "BURL1": {
    "longitude": -89.429,
    "latitude": 28.906,
    "name": "Southwest Pass, LA",
    "tideStation": {
      "name": "SOUTH PASS",
      "id": "8760551",
      "latitude": 28.99,
      "longitude": -89.14,
      "distance": 29672
    }
  },
  "BUZM3": {
    "longitude": -71.033,
    "latitude": 41.397,
    "name": "Buzzards Bay, MA",
    "tideStation": {
      "name": "PENIKESE ISLAND",
      "id": "8448248",
      "latitude": 41.45,
      "longitude": -70.9217,
      "distance": 11010
    }
  },
  "BYGL1": {
    "longitude": -90.42,
    "latitude": 29.789,
    "name": "8762482 - West Bank 1, Bayou Gauche, LA",
    "tideStation": {
      "name": "LAFITTE, BARATARIA WATERWAY",
      "id": "8761899",
      "latitude": 29.6667,
      "longitude": -90.1117,
      "distance": 32764
    }
  },
  "BZBM3": {
    "longitude": -70.671,
    "latitude": 41.524,
    "name": "8447930 - Woods Hole, MA",
    "tideStation": {
      "name": "WOODS HOLE",
      "id": "8447930",
      "latitude": 41.5233,
      "longitude": -70.6717,
      "distance": 97
    }
  },
  "C58W3": {
    "longitude": -87.563,
    "latitude": 44.146,
    "name": "Two Rivers CG Station, WI"
  },
  "CAMM2": {
    "longitude": -76.069,
    "latitude": 38.574,
    "name": "8571892 - Cambridge, MD",
    "tideStation": {
      "name": "CAMBRIDGE",
      "id": "8571892",
      "latitude": 38.5733,
      "longitude": -76.0683,
      "distance": 99
    }
  },
  "CAPL1": {
    "longitude": -93.343,
    "latitude": 29.768,
    "name": "8768094 - Calcasieu Pass, LA",
    "tideStation": {
      "name": "CALCASIEU PASS",
      "id": "8768094",
      "latitude": 29.7682,
      "longitude": -93.3429,
      "distance": 24
    }
  },
  "CARL1": {
    "longitude": -90.135,
    "latitude": 29.933,
    "name": "8761955 - Carrollton, LA ",
    "tideStation": {
      "name": "NEW CANAL STATION",
      "id": "8761927",
      "latitude": 30.0272,
      "longitude": -90.1134,
      "distance": 10648
    }
  },
  "CASM1": {
    "longitude": -70.246,
    "latitude": 43.656,
    "name": "8418150 - Portland, ME",
    "tideStation": {
      "name": "PORTLAND",
      "id": "8418150",
      "latitude": 43.6567,
      "longitude": -70.2467,
      "distance": 96
    }
  },
  "CBBV2": {
    "longitude": -76.114,
    "latitude": 36.967,
    "name": "8638863 - Chesapeake Bay Bridge Tunnel, VA",
    "tideStation": {
      "name": "CHESAPEAKE BAY BRIDGE TUNNEL",
      "id": "8638863",
      "latitude": 36.9667,
      "longitude": -76.1133,
      "distance": 71
    }
  },
  "CBRW3": {
    "longitude": -87.36,
    "latitude": 45.198,
    "name": "Chambers Island, WI"
  },
  "CDEA2": {
    "longitude": -134.136,
    "latitude": 56.001,
    "name": "Cape Decision, AK",
    "tideStation": {
      "name": "PORT ALEXANDER",
      "id": "9451054",
      "latitude": 56.2467,
      "longitude": -134.647,
      "distance": 41933
    }
  },
  "CDRF1": {
    "longitude": -83.029,
    "latitude": 29.136,
    "name": "Cedar Key, FL",
    "tideStation": {
      "name": "CEDAR KEY",
      "id": "8727520",
      "latitude": 29.135,
      "longitude": -83.0317,
      "distance": 285
    }
  },
  "CECC1": {
    "longitude": -124.184,
    "latitude": 41.746,
    "name": "9419750 - Crescent City, CA",
    "tideStation": {
      "name": "CRESCENT CITY",
      "id": "9419750",
      "latitude": 41.745,
      "longitude": -124.183,
      "distance": 139
    }
  },
  "CFWM1": {
    "longitude": -67.205,
    "latitude": 44.657,
    "name": " 8411060 - Cutler Farris Wharf, ME",
    "tideStation": {
      "name": "CUTLER FARRIS WHARF",
      "id": "8411060",
      "latitude": 44.6567,
      "longitude": -67.21,
      "distance": 398
    }
  },
  "CHAO3": {
    "longitude": -124.337,
    "latitude": 43.351,
    "name": "9432780 - Charleston, OR",
    "tideStation": {
      "name": "CHARLESTON",
      "id": "9432780",
      "latitude": 43.345,
      "longitude": -124.322,
      "distance": 1387
    }
  },
  "CHAV3": {
    "longitude": -64.92,
    "latitude": 18.335,
    "name": "9751639 - Charlotte Amalie, VI",
    "tideStation": {
      "name": "CHARLOTTE AMALIE",
      "id": "9751639",
      "latitude": 18.3358,
      "longitude": -64.92,
      "distance": 89
    }
  },
  "CHCM2": {
    "longitude": -75.81,
    "latitude": 39.527,
    "name": "8573927 - Chesapeake City, MD",
    "tideStation": {
      "name": "CHESAPEAKE CITY",
      "id": "8573927",
      "latitude": 39.5267,
      "longitude": -75.81,
      "distance": 33
    }
  },
  "CHDS1": {
    "longitude": -82.199,
    "latitude": 33.661,
    "name": "Strom Thurmond Dam, SC"
  },
  "CHII2": {
    "longitude": -87.572,
    "latitude": 41.916,
    "name": "Chicago, IL"
  },
  "CHLV2": {
    "longitude": -75.713,
    "latitude": 36.905,
    "name": "Chesapeake Light, VA",
    "tideStation": {
      "name": "RUDEE INLET",
      "id": "8639207",
      "latitude": 36.8317,
      "longitude": -75.9733,
      "distance": 24594
    }
  },
  "CHSV3": {
    "longitude": -64.699,
    "latitude": 17.748,
    "name": "9751364 - Christiansted Harbor, Virgin Islands",
    "tideStation": {
      "name": "CHRISTIANSTED HARBOR, ST CROIX",
      "id": "9751364",
      "latitude": 17.75,
      "longitude": -64.705,
      "distance": 674
    }
  },
  "CHTS1": {
    "longitude": -79.924,
    "latitude": 32.781,
    "name": "8665530 - Charleston, SC",
    "tideStation": {
      "name": "CHARLESTON",
      "id": "8665530",
      "latitude": 32.7817,
      "longitude": -79.925,
      "distance": 122
    }
  },
  "CHYV2": {
    "longitude": -76.007,
    "latitude": 36.926,
    "name": "8638999 - Cape Henry, VA",
    "tideStation": {
      "name": "CHESAPEAKE BAY BRIDGE TUNNEL",
      "id": "8638863",
      "latitude": 36.9667,
      "longitude": -76.1133,
      "distance": 10491
    }
  },
  "CHYW1": {
    "longitude": -122.759,
    "latitude": 48.863,
    "name": "9449424 - Cherry Point, WA",
    "tideStation": {
      "name": "CHERRY POINT",
      "id": "9449424",
      "latitude": 48.8633,
      "longitude": -122.758,
      "distance": 81
    }
  },
  "CLKN7": {
    "longitude": -76.525,
    "latitude": 34.622,
    "name": "Cape Lookout, NC",
    "tideStation": {
      "name": "CAPE LOOKOUT BIGHT",
      "id": "8656841",
      "latitude": 34.6133,
      "longitude": -76.5383,
      "distance": 1555
    }
  },
  "CLSM4": {
    "longitude": -82.877,
    "latitude": 42.471,
    "name": "St. Clair Shores, MI"
  },
  "CMAN4": {
    "longitude": -74.96,
    "latitude": 38.968,
    "name": "8536110 - Cape May, NJ",
    "tideStation": {
      "name": "CAPE MAY",
      "id": "8536110",
      "latitude": 38.9683,
      "longitude": -74.96,
      "distance": 33
    }
  },
  "CMTI2": {
    "longitude": -87.538,
    "latitude": 41.73,
    "name": "9087044 - Calumet Harbor, IL"
  },
  "CNDO1": {
    "longitude": -81.637,
    "latitude": 41.542,
    "name": "9063063 - Cleveland, OH"
  },
  "CNII2": {
    "longitude": -87.609,
    "latitude": 41.856,
    "name": "Northerly Island, IL"
  },
  "CPNT2": {
    "longitude": -97.024,
    "latitude": 28.114,
    "name": "8774513 - Copano Bay, TX ",
    "tideStation": {
      "name": "ARANSAS WILDLIFE REFUGE (TCOON)",
      "id": "8774230",
      "latitude": 28.2283,
      "longitude": -96.795,
      "distance": 25811
    }
  },
  "CPTR1": {
    "longitude": -71.345,
    "latitude": 41.717,
    "name": "8452944 - Conimicut Light, RI",
    "tideStation": {
      "name": "CONIMICUT LIGHT",
      "id": "8452944",
      "latitude": 41.7167,
      "longitude": -71.3433,
      "distance": 145
    }
  },
  "CRTA1": {
    "longitude": -88.14,
    "latitude": 30.308,
    "name": "Cedar Point, AL",
    "tideStation": {
      "name": "WEST FOWL RIVER BRIDGE",
      "id": "8738043",
      "latitude": 30.3766,
      "longitude": -88.1586,
      "distance": 7812
    }
  },
  "CRVA2": {
    "longitude": -145.752,
    "latitude": 60.558,
    "name": "9454050 - Cordova, AK",
    "tideStation": {
      "name": "CORDOVA",
      "id": "9454050",
      "latitude": 60.5583,
      "longitude": -145.753,
      "distance": 64
    }
  },
  "CRYV2": {
    "longitude": -76.339,
    "latitude": 36.888,
    "name": "8638595 - South Craney Island, VA"
  },
  "CSPA2": {
    "longitude": -136.64,
    "latitude": 58.199,
    "name": "Cape Spencer, AK",
    "tideStation": {
      "name": "ELFIN COVE",
      "id": "9452634",
      "latitude": 58.1947,
      "longitude": -136.346,
      "distance": 17296
    }
  },
  "CWBF1": {
    "longitude": -82.832,
    "latitude": 27.978,
    "name": "8726724 - Clearwater Beach, FL",
    "tideStation": {
      "name": "CLEARWATER BEACH",
      "id": "8726724",
      "latitude": 27.9783,
      "longitude": -82.8317,
      "distance": 44
    }
  },
  "CYGM4": {
    "longitude": -84.464,
    "latitude": 45.658,
    "name": "Cheybogan, MI"
  },
  "DBLN6": {
    "longitude": -79.354,
    "latitude": 42.494,
    "name": "Dunkirk, NY"
  },
  "DELD1": {
    "longitude": -75.589,
    "latitude": 39.582,
    "name": "8551762 - Delaware City, DE",
    "tideStation": {
      "name": "DELAWARE CITY",
      "id": "8551762",
      "latitude": 39.5817,
      "longitude": -75.5883,
      "distance": 69
    }
  },
  "DESW1": {
    "longitude": -124.485,
    "latitude": 47.675,
    "name": "Destruction Island, WA",
    "tideStation": {
      "name": "LA PUSH",
      "id": "9442396",
      "latitude": 47.9133,
      "longitude": -124.637,
      "distance": 28839
    }
  },
  "DISW3": {
    "longitude": -90.728,
    "latitude": 47.079,
    "name": "Devils Island, WI"
  },
  "DKCM6": {
    "longitude": -88.567,
    "latitude": 30.356,
    "name": "8741501 - Dock C, Pascagoula, MS",
    "tideStation": {
      "name": "PASCAGOULA POINT",
      "id": "8741196",
      "latitude": 30.34,
      "longitude": -88.5333,
      "distance": 3694
    }
  },
  "DMSF1": {
    "longitude": -81.559,
    "latitude": 30.387,
    "name": "8720219 - Dames Point, FL",
    "tideStation": {
      "name": "DAMES POINT",
      "id": "8720219",
      "latitude": 30.3867,
      "longitude": -81.5583,
      "distance": 75
    }
  },
  "DOMV2": {
    "longitude": -76.424,
    "latitude": 36.962,
    "name": "8638511 - Dominion Terminal Associates, VA",
    "tideStation": {
      "name": "SEWELLS POINT",
      "id": "8638610",
      "latitude": 36.9467,
      "longitude": -76.33,
      "distance": 8543
    }
  },
  "DPIA1": {
    "longitude": -88.075,
    "latitude": 30.25,
    "name": "Dauphin Island, AL",
    "tideStation": {
      "name": "DAUPHIN ISLAND",
      "id": "8735180",
      "latitude": 30.25,
      "longitude": -88.075,
      "distance": 0
    }
  },
  "DPXC1": {
    "longitude": -122.264,
    "latitude": 38.056,
    "name": "9415141 - Davis Point, San Pablo Bay, CA",
    "tideStation": {
      "name": "MARE ISLAND",
      "id": "9415218",
      "latitude": 38.07,
      "longitude": -122.25,
      "distance": 1981
    }
  },
  "DRFA2": {
    "longitude": -152.137,
    "latitude": 60.553,
    "name": "Drift River Terminal, AK",
    "tideStation": {
      "name": "KALIGAN ISLAND (NORTH END), COOK INLET",
      "id": "9455732",
      "latitude": 60.5117,
      "longitude": -151.952,
      "distance": 11151
    }
  },
  "DRSD1": {
    "longitude": -75.437,
    "latitude": 39.089,
    "name": "Saint Jones River, Delaware Reserve, DE",
    "tideStation": {
      "name": "MAHON RIVER ENTRANCE",
      "id": "8554399",
      "latitude": 39.185,
      "longitude": -75.4,
      "distance": 11127
    }
  },
  "DTLM4": {
    "longitude": -83.898,
    "latitude": 45.993,
    "name": "9075099 - De Tour Village, MI"
  },
  "DUKN7": {
    "longitude": -75.746,
    "latitude": 36.184,
    "name": " 8651370 - Duck Pier, NC ",
    "tideStation": {
      "name": "DUCK",
      "id": "8651370",
      "latitude": 36.1833,
      "longitude": -75.7467,
      "distance": 100
    }
  },
  "DULM5": {
    "longitude": -92.092,
    "latitude": 46.776,
    "name": "9099064 - Duluth, MN"
  },
  "EBSW1": {
    "longitude": -122.338,
    "latitude": 47.602,
    "name": "9447130 - Seattle, WA",
    "tideStation": {
      "name": "SEATTLE",
      "id": "9447130",
      "latitude": 47.6026,
      "longitude": -122.339,
      "distance": 101
    }
  },
  "EINL1": {
    "longitude": -91.384,
    "latitude": 29.373,
    "name": "8764314 - North of Eugene Island, LA",
    "tideStation": {
      "name": "STOUTS PASS AT SIX MILE LAKE",
      "id": "8764025",
      "latitude": 29.7433,
      "longitude": -91.23,
      "distance": 43675
    }
  },
  "ELFA2": {
    "longitude": -136.347,
    "latitude": 58.193,
    "name": "9452634 - Elfin Cove, AK",
    "tideStation": {
      "name": "ELFIN COVE",
      "id": "9452634",
      "latitude": 58.1947,
      "longitude": -136.346,
      "distance": 198
    }
  },
  "EPTT2": {
    "longitude": -94.917,
    "latitude": 29.481,
    "name": "8771013 - Eagle Point, TX",
    "tideStation": {
      "name": "EAGLE POINT",
      "id": "8771013",
      "latitude": 29.48,
      "longitude": -94.9183,
      "distance": 168
    }
  },
  "EREP1": {
    "longitude": -80.098,
    "latitude": 42.172,
    "name": "9063038 - Erie"
  },
  "EROA2": {
    "longitude": -135.221,
    "latitude": 58.971,
    "name": "Eldred Rock, AK",
    "tideStation": {
      "name": "CHILKAT INLET",
      "id": "9452421",
      "latitude": 59.17,
      "longitude": -135.4,
      "distance": 24430
    }
  },
  "FAIO1": {
    "longitude": -81.281,
    "latitude": 41.764,
    "name": "9063053 - Fairport, OH"
  },
  "FBIS1": {
    "longitude": -79.887,
    "latitude": 32.684,
    "name": "Folly Island, SC",
    "tideStation": {
      "name": "CHARLESTON",
      "id": "8665530",
      "latitude": 32.7817,
      "longitude": -79.925,
      "distance": 11405
    }
  },
  "FCGT2": {
    "longitude": -95.302,
    "latitude": 28.943,
    "name": "8772447 - USCG Freeport, TX",
    "tideStation": {
      "name": "FREEPORT",
      "id": "8772440",
      "latitude": 28.9483,
      "longitude": -95.3083,
      "distance": 850
    }
  },
  "FFIA2": {
    "longitude": -133.63,
    "latitude": 57.272,
    "name": "Five Fingers, AK",
    "tideStation": {
      "name": "THE BROTHERS",
      "id": "9451785",
      "latitude": 57.295,
      "longitude": -133.797,
      "distance": 10392
    }
  },
  "FHPF1": {
    "longitude": -82.801,
    "latitude": 28.153,
    "name": "Fred Howard Park, FL",
    "tideStation": {
      "name": "ANCLOTE KEY, SOUTHERN END",
      "id": "8726917",
      "latitude": 28.165,
      "longitude": -82.8433,
      "distance": 4362
    }
  },
  "FILA2": {
    "longitude": -151.995,
    "latitude": 59.332,
    "name": "Flat Island Light, AK",
    "tideStation": {
      "name": "SELDOVIA",
      "id": "9455500",
      "latitude": 59.4405,
      "longitude": -151.719,
      "distance": 19802
    }
  },
  "FMOA1": {
    "longitude": -88.024,
    "latitude": 30.228,
    "name": "8734673 - Fort Morgan, AL",
    "tideStation": {
      "name": "DAUPHIN ISLAND",
      "id": "8735180",
      "latitude": 30.25,
      "longitude": -88.075,
      "distance": 5481
    }
  },
  "FMRF1": {
    "longitude": -81.871,
    "latitude": 26.647,
    "name": "8725520 - Fort Myers, FL",
    "tideStation": {
      "name": "FORT MYERS",
      "id": "8725520",
      "latitude": 26.6477,
      "longitude": -81.8712,
      "distance": 80
    }
  },
  "FOXR1": {
    "longitude": -71.401,
    "latitude": 41.807,
    "name": "8454000 - Providence, RI",
    "tideStation": {
      "name": "PROVIDENCE",
      "id": "8454000",
      "latitude": 41.8071,
      "longitude": -71.4012,
      "distance": 20
    }
  },
  "FPKG1": {
    "longitude": -80.903,
    "latitude": 32.035,
    "name": "8670870 - Fort Pulaski, GA",
    "tideStation": {
      "name": "FORT PULASKI",
      "id": "8670870",
      "latitude": 32.0333,
      "longitude": -80.9017,
      "distance": 225
    }
  },
  "FPTM4": {
    "longitude": -86.66,
    "latitude": 45.619,
    "name": "Fairport, MI"
  },
  "FRDF1": {
    "longitude": -81.465,
    "latitude": 30.675,
    "name": "8720030 - Fernandina Beach, FL",
    "tideStation": {
      "name": "FERNANDINA BEACH",
      "id": "8720030",
      "latitude": 30.6717,
      "longitude": -81.465,
      "distance": 366
    }
  },
  "FRDP4": {
    "longitude": -65.631,
    "latitude": 18.335,
    "name": "9753216 - Fajardo, PR",
    "tideStation": {
      "name": "FAJARDO",
      "id": "9753216",
      "latitude": 18.3352,
      "longitude": -65.6311,
      "distance": 25
    }
  },
  "FRDW1": {
    "longitude": -123.012,
    "latitude": 48.545,
    "name": "9449880 - Friday Harbor, WA",
    "tideStation": {
      "name": "FRIDAY HARBOR",
      "id": "9449880",
      "latitude": 48.5467,
      "longitude": -123.01,
      "distance": 240
    }
  },
  "FREL1": {
    "longitude": -90.422,
    "latitude": 30.106,
    "name": "8762484- Frenier Landing, LA",
    "tideStation": {
      "name": "NEW CANAL STATION",
      "id": "8761927",
      "latitude": 30.0272,
      "longitude": -90.1134,
      "distance": 31011
    }
  },
  "FRVM3": {
    "longitude": -71.164,
    "latitude": 41.704,
    "name": "8447386 - Fall River, MA",
    "tideStation": {
      "name": "FALL RIVER",
      "id": "8447386",
      "latitude": 41.7043,
      "longitude": -71.1641,
      "distance": 34
    }
  },
  "FRWL1": {
    "longitude": -92.305,
    "latitude": 29.552,
    "name": "8766072 - Fresh Water Canal Locks, LA",
    "tideStation": {
      "name": "FRESHWATER CANAL LOCKS",
      "id": "8766072",
      "latitude": 29.555,
      "longitude": -92.305,
      "distance": 333
    }
  },
  "FRXM3": {
    "longitude": -71.18,
    "latitude": 41.696,
    "name": "8447412 - Fall River Visibility, MA",
    "tideStation": {
      "name": "FALL RIVER",
      "id": "8447386",
      "latitude": 41.7043,
      "longitude": -71.1641,
      "distance": 1613
    }
  },
  "FSKM2": {
    "longitude": -76.528,
    "latitude": 39.219,
    "name": "8574728 - Francis Scott Key Bridge, MD",
    "tideStation": {
      "name": "FORT MCHENRY MARSH",
      "id": "8574683",
      "latitude": 39.2617,
      "longitude": -76.585,
      "distance": 6833
    }
  },
  "FTGM4": {
    "longitude": -82.422,
    "latitude": 43.007,
    "name": "9014098 - Fort Gratiot, MI"
  },
  "FTPC1": {
    "longitude": -122.466,
    "latitude": 37.806,
    "name": "9414290 - San Francisco, CA",
    "tideStation": {
      "name": "SAN FRANCISCO",
      "id": "9414290",
      "latitude": 37.8067,
      "longitude": -122.465,
      "distance": 117
    }
  },
  "GCVF1": {
    "longitude": -81.634,
    "latitude": 29.982,
    "name": "8720503 - Red Bay Point, FL",
    "tideStation": {
      "name": "BLACK CREEK, S.C.L. RR. BRIDGE",
      "id": "8720434",
      "latitude": 30.08,
      "longitude": -81.7617,
      "distance": 16424
    }
  },
  "GDMM5": {
    "longitude": -90.341,
    "latitude": 47.749,
    "name": "9099090 - Grand Marais, MN"
  },
  "GDXM6": {
    "longitude": -88.42,
    "latitude": 30.359,
    "name": "Crooked Bayou, Grand Bay Reserve, MS",
    "tideStation": {
      "name": "DOCK E, PORT OF PASCAGOULA",
      "id": "8741041",
      "latitude": 30.3477,
      "longitude": -88.5054,
      "distance": 8306
    }
  },
  "GISL1": {
    "longitude": -89.958,
    "latitude": 29.265,
    "name": "8761724 - Grand Isle, LA",
    "tideStation": {
      "name": "GRAND ISLE",
      "id": "8761724",
      "latitude": 29.2633,
      "longitude": -89.9567,
      "distance": 227
    }
  },
  "GNJT2": {
    "longitude": -94.725,
    "latitude": 29.357,
    "name": "8771341 - Galveston Bay (North Jetty), TX",
    "tideStation": {
      "name": "PORT BOLIVAR",
      "id": "8771328",
      "latitude": 29.365,
      "longitude": -94.78,
      "distance": 5414
    }
  },
  "GRMM4": {
    "longitude": -85.972,
    "latitude": 46.684,
    "name": "Grand Marais, MI"
  },
  "GSLM4": {
    "longitude": -83.537,
    "latitude": 44.018,
    "name": "Gravelly Shoals Light MI"
  },
  "GTLM4": {
    "longitude": -85.55,
    "latitude": 45.211,
    "name": "Grand Traverse Light, MI"
  },
  "GTOT2": {
    "longitude": -94.792,
    "latitude": 29.311,
    "name": "8771450 - Galveston Pier 21, TX",
    "tideStation": {
      "name": "GALVESTON PIER 21",
      "id": "8771450",
      "latitude": 29.31,
      "longitude": -94.7933,
      "distance": 168
    }
  },
  "GTRM4": {
    "longitude": -88.241,
    "latitude": 47.179,
    "name": "Superior Grand Traverse Bay, MI"
  },
  "GTXF1": {
    "longitude": -81.233,
    "latitude": 29.658,
    "name": "Pellicer Creek, Guana Tolomato Matanzas Reserve, FL",
    "tideStation": {
      "name": "STATE ROAD A1A BRIDGE",
      "id": "8720692",
      "latitude": 29.7045,
      "longitude": -81.2279,
      "distance": 5178
    }
  },
  "HBYC1": {
    "longitude": -124.217,
    "latitude": 40.767,
    "name": "9418767 - North Spit, CA",
    "tideStation": {
      "name": "NORTH SPIT",
      "id": "9418767",
      "latitude": 40.7667,
      "longitude": -124.217,
      "distance": 33
    }
  },
  "HCGN7": {
    "longitude": -75.704,
    "latitude": 35.209,
    "name": "8654467 - USCG Hatteras, NC",
    "tideStation": {
      "name": "USCG STATION HATTERAS",
      "id": "8654467",
      "latitude": 35.2086,
      "longitude": -75.7042,
      "distance": 48
    }
  },
  "HHLO1": {
    "longitude": -82.545,
    "latitude": 41.401,
    "name": "Huron Light, OH"
  },
  "HIST2": {
    "longitude": -94.39,
    "latitude": 29.595,
    "name": "8770808 - High Island, TX",
    "tideStation": {
      "name": "HIGH ISLAND (TCOON)",
      "id": "8770808",
      "latitude": 29.5947,
      "longitude": -94.3903,
      "distance": 44
    }
  },
  "HLNM4": {
    "longitude": -86.213,
    "latitude": 42.773,
    "name": "9087031 - Holland, MI"
  },
  "HMRA2": {
    "longitude": -151.41,
    "latitude": 59.601,
    "name": "Homer, Kachemak Bay Reserve, AK",
    "tideStation": {
      "name": "KASITSNA BAY, KACHEMAK BAY",
      "id": "9455517",
      "latitude": 59.4683,
      "longitude": -151.565,
      "distance": 17189
    }
  },
  "HMSA2": {
    "longitude": -151.417,
    "latitude": 59.602,
    "name": "Homer Spit, AK",
    "tideStation": {
      "name": "KASITSNA BAY, KACHEMAK BAY",
      "id": "9455517",
      "latitude": 59.4683,
      "longitude": -151.565,
      "distance": 17087
    }
  },
  "HRBM4": {
    "longitude": -82.643,
    "latitude": 43.846,
    "name": "9075014 - Harbor Beach, MI"
  },
  "HRVC1": {
    "longitude": -120.682,
    "latitude": 34.469,
    "name": "9411406 - Harvest Oil Platform, CA",
    "tideStation": {
      "name": "OIL PLATFORM HARVEST",
      "id": "9411406",
      "latitude": 34.4683,
      "longitude": -120.673,
      "distance": 831
    }
  },
  "ICAC1": {
    "longitude": -118.5,
    "latitude": 34.008,
    "name": "9410840 - Santa Monica Pier",
    "tideStation": {
      "name": "SANTA MONICA",
      "id": "9410840",
      "latitude": 34.0083,
      "longitude": -118.5,
      "distance": 33
    }
  },
  "ICYA2": {
    "longitude": -141.359,
    "latitude": 59.927,
    "name": "Icy Bay, AK"
  },
  "IIWC1": {
    "longitude": -117.177,
    "latitude": 32.714,
    "name": "9410172 - USS Midway South Navy Pier, San Diego, CA",
    "tideStation": {
      "name": "SAN DIEGO",
      "id": "9410170",
      "latitude": 32.7142,
      "longitude": -117.173,
      "distance": 376
    }
  },
  "ILOH1": {
    "longitude": -155.056,
    "latitude": 19.73,
    "name": "1617760 - Hilo, HI",
    "tideStation": {
      "name": "HILO, HILO BAY, KUHIO BAY",
      "id": "1617760",
      "latitude": 19.7303,
      "longitude": -155.055,
      "distance": 110
    }
  },
  "IMGP4": {
    "longitude": -67.044,
    "latitude": 17.969,
    "name": "Isla Magueyes, Lajas, PR",
    "tideStation": {
      "name": "MAGUEYES ISLAND",
      "id": "9759110",
      "latitude": 17.9701,
      "longitude": -67.0464,
      "distance": 282
    }
  },
  "IOSN3": {
    "longitude": -70.623,
    "latitude": 42.967,
    "name": "Isle of Shoals, NH",
    "tideStation": {
      "name": "FORT POINT",
      "id": "8423898",
      "latitude": 43.0717,
      "longitude": -70.7117,
      "distance": 13696
    }
  },
  "ITKA2": {
    "longitude": -135.342,
    "latitude": 57.052,
    "name": "9451600 - Sitka, AK",
    "tideStation": {
      "name": "SITKA",
      "id": "9451600",
      "latitude": 57.0517,
      "longitude": -135.342,
      "distance": 33
    }
  },
  "JCRN4": {
    "longitude": -74.464,
    "latitude": 39.535,
    "name": "Nacote Creek, Jacques Cousteau Reserve, NJ",
    "tideStation": {
      "name": "GREAT BAY, SHOOTING THOROFARE",
      "id": "8534319",
      "latitude": 39.5083,
      "longitude": -74.325,
      "distance": 12314
    }
  },
  "JMLA2": {
    "longitude": -134.39,
    "latitude": 58.286,
    "name": "Juneau AML Dock",
    "tideStation": {
      "name": "JUNEAU",
      "id": "9452210",
      "latitude": 58.2983,
      "longitude": -134.412,
      "distance": 1882
    }
  },
  "JMPN7": {
    "longitude": -77.786,
    "latitude": 34.213,
    "name": "8658163 - Johnny Mercer Pier, Wrightsville Beach, NC",
    "tideStation": {
      "name": "WRIGHTSVILLE BEACH",
      "id": "8658163",
      "latitude": 34.2133,
      "longitude": -77.7867,
      "distance": 73
    }
  },
  "JNEA2": {
    "longitude": -134.411,
    "latitude": 58.298,
    "name": "9452210 - Juneau, AK",
    "tideStation": {
      "name": "JUNEAU",
      "id": "9452210",
      "latitude": 58.2983,
      "longitude": -134.412,
      "distance": 67
    }
  },
  "JOXP4": {
    "longitude": -66.223,
    "latitude": 17.956,
    "name": "Jobos Bay Reserve, Puerto Rico"
  },
  "KATA1": {
    "longitude": -88.213,
    "latitude": 30.258,
    "name": "Katrina Cut, AL",
    "tideStation": {
      "name": "DAUPHIN ISLAND",
      "id": "8735180",
      "latitude": 30.25,
      "longitude": -88.075,
      "distance": 13311
    }
  },
  "KDAA2": {
    "longitude": -152.511,
    "latitude": 57.731,
    "name": "9457292 - Kodiak Island, AK",
    "tideStation": {
      "name": "KODIAK ISLAND",
      "id": "9457292",
      "latitude": 57.7317,
      "longitude": -152.512,
      "distance": 98
    }
  },
  "KGCA2": {
    "longitude": -162.327,
    "latitude": 55.062,
    "name": "9459881 - King Cove, AK",
    "tideStation": {
      "name": "KING COVE",
      "id": "9459881",
      "latitude": 55.0617,
      "longitude": -162.327,
      "distance": 33
    }
  },
  "KLIH1": {
    "longitude": -156.469,
    "latitude": 20.895,
    "name": "1615680 - Kahului, Kahului Harbor, HI",
    "tideStation": {
      "name": "KAHULUI, KAHULUI HARBOR",
      "id": "1615680",
      "latitude": 20.895,
      "longitude": -156.476,
      "distance": 728
    }
  },
  "KNSW3": {
    "longitude": -87.809,
    "latitude": 42.589,
    "name": "Kenosha, WI"
  },
  "KPTN6": {
    "longitude": -73.765,
    "latitude": 40.811,
    "name": "8516945 - Kings Point, NY",
    "tideStation": {
      "name": "KINGS POINT",
      "id": "8516945",
      "latitude": 40.8103,
      "longitude": -73.7649,
      "distance": 78
    }
  },
  "KPTV2": {
    "longitude": -75.988,
    "latitude": 37.165,
    "name": "8632200 - Kiptopeke, VA",
    "tideStation": {
      "name": "KIPTOPEKE",
      "id": "8632200",
      "latitude": 37.1652,
      "longitude": -75.9884,
      "distance": 42
    }
  },
  "KTNF1": {
    "longitude": -83.593,
    "latitude": 29.819,
    "name": "Keaton Beach, FL",
    "tideStation": {
      "name": "SPRING WARRIOR CREEK",
      "id": "8727843",
      "latitude": 29.92,
      "longitude": -83.6717,
      "distance": 13534
    }
  },
  "KWHH1": {
    "longitude": -155.829,
    "latitude": 20.037,
    "name": "1617433 - Kawaihae, HI",
    "tideStation": {
      "name": "KAWAIHAE",
      "id": "1617433",
      "latitude": 20.0366,
      "longitude": -155.829,
      "distance": 44
    }
  },
  "KWJP8": {
    "longitude": 167.734,
    "latitude": 8.732,
    "name": "1820000 - Kwajalein, Marshall Islands",
    "tideStation": {
      "name": "KWAJALEIN, MARSHALL ISLANDS",
      "id": "1820000",
      "latitude": 8.7316,
      "longitude": 167.736,
      "distance": 224
    }
  },
  "KWNW3": {
    "longitude": -87.496,
    "latitude": 44.465,
    "name": "9087069 - Kewaunee MET, WI"
  },
  "KYWF1": {
    "longitude": -81.808,
    "latitude": 24.556,
    "name": "8724580 - Key West, FL",
    "tideStation": {
      "name": "KEY WEST",
      "id": "8724580",
      "latitude": 24.5557,
      "longitude": -81.8079,
      "distance": 35
    }
  },
  "LAMV3": {
    "longitude": -64.724,
    "latitude": 18.318,
    "name": "9751381 - Lameshur Bay, St John, VI",
    "tideStation": {
      "name": "LAMESHUR BAY, ST JOHN",
      "id": "9751381",
      "latitude": 18.3182,
      "longitude": -64.7242,
      "distance": 31
    }
  },
  "LAPW1": {
    "longitude": -124.637,
    "latitude": 47.913,
    "name": "9442396 - La Push, WA",
    "tideStation": {
      "name": "LA PUSH",
      "id": "9442396",
      "latitude": 47.9133,
      "longitude": -124.637,
      "distance": 33
    }
  },
  "LCLL1": {
    "longitude": -93.222,
    "latitude": 30.224,
    "name": "8767816 - Lake Charles, LA",
    "tideStation": {
      "name": "LAKE CHARLES",
      "id": "8767816",
      "latitude": 30.2236,
      "longitude": -93.2217,
      "distance": 53
    }
  },
  "LDTM4": {
    "longitude": -86.441,
    "latitude": 43.947,
    "name": "9087023 - Ludington, MI"
  },
  "LJAC1": {
    "longitude": -117.257,
    "latitude": 32.867,
    "name": "9410230 - La Jolla, CA",
    "tideStation": {
      "name": "LA JOLLA",
      "id": "9410230",
      "latitude": 32.8667,
      "longitude": -117.258,
      "distance": 99
    }
  },
  "LJPC1": {
    "longitude": -117.257,
    "latitude": 32.867,
    "name": "La Jolla, CA (073)",
    "tideStation": {
      "name": "LA JOLLA",
      "id": "9410230",
      "latitude": 32.8667,
      "longitude": -117.258,
      "distance": 99
    }
  },
  "LKWF1": {
    "longitude": -80.034,
    "latitude": 26.613,
    "name": "8722670 - Lake Worth Pier, FL",
    "tideStation": {
      "name": "LAKE WORTH PIER",
      "id": "8722670",
      "latitude": 26.6117,
      "longitude": -80.0333,
      "distance": 160
    }
  },
  "LMBV4": {
    "longitude": -96.379,
    "latitude": 19.594,
    "name": "La Mancha Beach, Mexico"
  },
  "LMFS1": {
    "longitude": -81.271,
    "latitude": 34.107,
    "name": "Lake Murray SC"
  },
  "LNDC1": {
    "longitude": -122.281,
    "latitude": 37.795,
    "name": "9414763 - Oakland Berth 67, CA",
    "tideStation": {
      "name": "OAKLAND INNER HARBOR",
      "id": "9414764",
      "latitude": 37.795,
      "longitude": -122.282,
      "distance": 88
    }
  },
  "LONF1": {
    "longitude": -80.864,
    "latitude": 24.844,
    "name": "Long Key, FL",
    "tideStation": {
      "name": "KEY COLONY BEACH",
      "id": "8723962",
      "latitude": 24.7183,
      "longitude": -81.0167,
      "distance": 20793
    }
  },
  "LOPW1": {
    "longitude": -122.954,
    "latitude": 46.106,
    "name": "9440422 - Longview, WA",
    "tideStation": {
      "name": "LONGVIEW",
      "id": "9440422",
      "latitude": 46.1061,
      "longitude": -122.954,
      "distance": 11
    }
  },
  "LPNM4": {
    "longitude": -83.429,
    "latitude": 45.063,
    "name": "9075065 - Alpena, MI "
  },
  "LTBV3": {
    "longitude": -64.754,
    "latitude": 17.695,
    "name": "9751401 - Lime Tree Bay, VI",
    "tideStation": {
      "name": "LIME TREE BAY",
      "id": "9751401",
      "latitude": 17.6947,
      "longitude": -64.7538,
      "distance": 39
    }
  },
  "LTJF1": {
    "longitude": -81.446,
    "latitude": 30.379,
    "name": "8720228 - Little Jetties, St. Johns River, FL",
    "tideStation": {
      "name": "MAYPORT (BAR PILOTS DOCK)",
      "id": "8720218",
      "latitude": 30.3967,
      "longitude": -81.43,
      "distance": 2493
    }
  },
  "LTRM4": {
    "longitude": -84.302,
    "latitude": 46.486,
    "name": "9076033 - Little Rapids, MI"
  },
  "LWSD1": {
    "longitude": -75.119,
    "latitude": 38.783,
    "name": "8557380 - Lewes, DE",
    "tideStation": {
      "name": "LEWES",
      "id": "8557380",
      "latitude": 38.7817,
      "longitude": -75.12,
      "distance": 168
    }
  },
  "LWTV2": {
    "longitude": -76.465,
    "latitude": 37.995,
    "name": "8635750 - Lewisetta, VA",
    "tideStation": {
      "name": "LEWISETTA",
      "id": "8635750",
      "latitude": 37.9961,
      "longitude": -76.4644,
      "distance": 133
    }
  },
  "LYBT2": {
    "longitude": -95.079,
    "latitude": 29.765,
    "name": "8770733 - Lynchburg Landing, TX",
    "tideStation": {
      "name": "LYNCHBURG LANDING (TCOON)",
      "id": "8770733",
      "latitude": 29.765,
      "longitude": -95.0783,
      "distance": 68
    }
  },
  "MACM4": {
    "longitude": -84.721,
    "latitude": 45.777,
    "name": "9075080 - Mackinaw City, MI"
  },
  "MAXT2": {
    "longitude": -97.034,
    "latitude": 28.132,
    "name": "Copano East, Mission-Aransas Reserve, TX",
    "tideStation": {
      "name": "ARANSAS WILDLIFE REFUGE (TCOON)",
      "id": "8774230",
      "latitude": 28.2283,
      "longitude": -96.795,
      "distance": 25782
    }
  },
  "MBLA1": {
    "longitude": -88.011,
    "latitude": 30.437,
    "name": "Middle Bay Light, AL",
    "tideStation": {
      "name": "POINT CLEAR, MOBILE BAY",
      "id": "8733821",
      "latitude": 30.4866,
      "longitude": -87.9345,
      "distance": 9177
    }
  },
  "MBRM4": {
    "longitude": -82.419,
    "latitude": 42.975,
    "name": "9014090 - Mouth of the Black River, MI "
  },
  "MCGA1": {
    "longitude": -88.058,
    "latitude": 30.649,
    "name": "8736897 - Coast Guard Sector Mobile, AL",
    "tideStation": {
      "name": "COAST GUARD SECTOR MOBILE",
      "id": "8736897",
      "latitude": 30.6483,
      "longitude": -88.0583,
      "distance": 83
    }
  },
  "MCGM4": {
    "longitude": -87.379,
    "latitude": 46.546,
    "name": "9099018 - Marquette C.G., MI"
  },
  "MCYF1": {
    "longitude": -82.425,
    "latitude": 27.914,
    "name": "8726667 - McKay Bay Entrance, FL",
    "tideStation": {
      "name": "MCKAY BAY ENTRANCE",
      "id": "8726667",
      "latitude": 27.9133,
      "longitude": -82.425,
      "distance": 78
    }
  },
  "MCYI3": {
    "longitude": -86.912,
    "latitude": 41.729,
    "name": "Michigan City, IN"
  },
  "MDRM1": {
    "longitude": -68.128,
    "latitude": 43.969,
    "name": "Mt Desert Rock, ME",
    "tideStation": {
      "name": "OCEANVILLE, DEER ISLE",
      "id": "8414249",
      "latitude": 44.1923,
      "longitude": -68.6209,
      "distance": 46629
    }
  },
  "MEEM4": {
    "longitude": -86.346,
    "latitude": 44.248,
    "name": "Manistee Harbor, MI"
  },
  "MGIP4": {
    "longitude": -67.046,
    "latitude": 17.97,
    "name": "9759110 - Magueyes Islands, PR",
    "tideStation": {
      "name": "MAGUEYES ISLAND",
      "id": "9759110",
      "latitude": 17.9701,
      "longitude": -67.0464,
      "distance": 44
    }
  },
  "MGPT2": {
    "longitude": -94.985,
    "latitude": 29.682,
    "name": "8770613 - Morgans Point, TX",
    "tideStation": {
      "name": "MORGANS POINT",
      "id": "8770613",
      "latitude": 29.6817,
      "longitude": -94.985,
      "distance": 33
    }
  },
  "MGZP4": {
    "longitude": -67.159,
    "latitude": 18.218,
    "name": "9759394 - Mayaguez, PR",
    "tideStation": {
      "name": "MAYAGUEZ",
      "id": "9759394",
      "latitude": 18.22,
      "longitude": -67.16,
      "distance": 245
    }
  },
  "MHPA1": {
    "longitude": -87.936,
    "latitude": 30.667,
    "name": "Meaher Park, AL",
    "tideStation": {
      "name": "MEAHER STATE PARK, MOBILE BAY",
      "id": "8733839",
      "latitude": 30.6672,
      "longitude": -87.9364,
      "distance": 44
    }
  },
  "MHRN6": {
    "longitude": -74.162,
    "latitude": 40.641,
    "name": "8519532 - Mariners Harbor, NY",
    "tideStation": {
      "name": "BERGEN POINT WEST REACH",
      "id": "8519483",
      "latitude": 40.6367,
      "longitude": -74.1417,
      "distance": 1782
    }
  },
  "MISM1": {
    "longitude": -68.855,
    "latitude": 43.784,
    "name": "Matinicus Rock, ME",
    "tideStation": {
      "name": "ROCKLAND",
      "id": "8415490",
      "latitude": 44.105,
      "longitude": -69.1017,
      "distance": 40797
    }
  },
  "MISP4": {
    "longitude": -67.939,
    "latitude": 18.09,
    "name": "9759938 - Mona Island, PR"
  },
  "MKGM4": {
    "longitude": -86.339,
    "latitude": 43.227,
    "name": "Muskegon, MI"
  },
  "MLRF1": {
    "longitude": -80.376,
    "latitude": 25.012,
    "name": "Molasses Reef, FL",
    "tideStation": {
      "name": "PUMPKIN KEY, SOUTH END, CARD SOUND",
      "id": "8723506",
      "latitude": 25.325,
      "longitude": -80.2933,
      "distance": 35661
    }
  },
  "MLWW3": {
    "longitude": -87.88,
    "latitude": 43.045,
    "name": "Milwaukee, WI"
  },
  "MNMM4": {
    "longitude": -87.59,
    "latitude": 45.096,
    "name": "9087088 - Menominee, MI"
  },
  "MNPV2": {
    "longitude": -76.302,
    "latitude": 36.778,
    "name": "8639348 - Money Point, VA",
    "tideStation": {
      "name": "MONEY POINT",
      "id": "8639348",
      "latitude": 36.7783,
      "longitude": -76.3017,
      "distance": 43
    }
  },
  "MOKH1": {
    "longitude": -157.79,
    "latitude": 21.433,
    "name": "1612480 - Mokuoloe, HI",
    "tideStation": {
      "name": "MOKUOLOE",
      "id": "1612480",
      "latitude": 21.4331,
      "longitude": -157.79,
      "distance": 11
    }
  },
  "MQTT2": {
    "longitude": -97.217,
    "latitude": 27.581,
    "name": "8775870 - Bob Hall Pier, Corpus Christi, TX",
    "tideStation": {
      "name": "BOB HALL PIER, CORPUS CHRISTI",
      "id": "8775870",
      "latitude": 27.58,
      "longitude": -97.2167,
      "distance": 115
    }
  },
  "MRCP1": {
    "longitude": -75.415,
    "latitude": 39.809,
    "name": "8540433 - Marcus Hook, PA",
    "tideStation": {
      "name": "MARCUS HOOK",
      "id": "8540433",
      "latitude": 39.8117,
      "longitude": -75.41,
      "distance": 523
    }
  },
  "MRHO1": {
    "longitude": -82.731,
    "latitude": 41.544,
    "name": "9063079 - Marblehead, OH"
  },
  "MRKA2": {
    "longitude": -146.662,
    "latitude": 61.082,
    "name": "Middle Rock Light, AK",
    "tideStation": {
      "name": "VALDEZ",
      "id": "9454240",
      "latitude": 61.125,
      "longitude": -146.362,
      "distance": 16874
    }
  },
  "MRNA2": {
    "longitude": -134.257,
    "latitude": 58.198,
    "name": "Marmion Island, AK",
    "tideStation": {
      "name": "JUNEAU",
      "id": "9452210",
      "latitude": 58.2983,
      "longitude": -134.412,
      "distance": 14410
    }
  },
  "MROS1": {
    "longitude": -78.916,
    "latitude": 33.656,
    "name": "8661070 - Springmaid Pier, SC",
    "tideStation": {
      "name": "SPRINGMAID PIER",
      "id": "8661070",
      "latitude": 33.655,
      "longitude": -78.9183,
      "distance": 240
    }
  },
  "MRSL1": {
    "longitude": -92.061,
    "latitude": 29.441,
    "name": "Marsh Island, LA / CSI03",
    "tideStation": {
      "name": "FRESHWATER CANAL LOCKS",
      "id": "8766072",
      "latitude": 29.555,
      "longitude": -92.305,
      "distance": 26823
    }
  },
  "MRYA2": {
    "longitude": -131.182,
    "latitude": 55.099,
    "name": "Mary Island, AK",
    "tideStation": {
      "name": "CUSTOM HOUSE COVE, MARY ISLAND",
      "id": "9450296",
      "latitude": 55.1,
      "longitude": -131.217,
      "distance": 2237
    }
  },
  "MTBF1": {
    "longitude": -82.594,
    "latitude": 27.661,
    "name": "8726412- Middle Tampa Bay",
    "tideStation": {
      "name": "PORT MANATEE",
      "id": "8726384",
      "latitude": 27.6387,
      "longitude": -82.5621,
      "distance": 4002
    }
  },
  "MTKN6": {
    "longitude": -71.959,
    "latitude": 41.048,
    "name": "8510560 - Montauk, NY",
    "tideStation": {
      "name": "MONTAUK",
      "id": "8510560",
      "latitude": 41.0483,
      "longitude": -71.96,
      "distance": 90
    }
  },
  "MTYC1": {
    "longitude": -121.889,
    "latitude": 36.605,
    "name": "9413450 - Monterey, CA",
    "tideStation": {
      "name": "MONTEREY",
      "id": "9413450",
      "latitude": 36.605,
      "longitude": -121.888,
      "distance": 89
    }
  },
  "MYPF1": {
    "longitude": -81.428,
    "latitude": 30.398,
    "name": "8720218 - Mayport (Bar Pilots Dock), FL",
    "tideStation": {
      "name": "MAYPORT (BAR PILOTS DOCK)",
      "id": "8720218",
      "latitude": 30.3967,
      "longitude": -81.43,
      "distance": 240
    }
  },
  "MZXC1": {
    "longitude": -122.125,
    "latitude": 38.035,
    "name": "9415102 - Martinez-Amorco Pier, CA",
    "tideStation": {
      "name": "MARTINEZ-AMORCO PIER",
      "id": "9415102",
      "latitude": 38.0346,
      "longitude": -122.125,
      "distance": 44
    }
  },
  "NABM4": {
    "longitude": -85.444,
    "latitude": 46.087,
    "name": "Naubinway, MI"
  },
  "NAXR1": {
    "longitude": -71.339,
    "latitude": 41.637,
    "name": "Potters Cove, Narragansett Bay Reserve, RI",
    "tideStation": {
      "name": "BRISTOL FERRY",
      "id": "8451552",
      "latitude": 41.6367,
      "longitude": -71.255,
      "distance": 6999
    }
  },
  "NBLP1": {
    "longitude": -74.752,
    "latitude": 40.137,
    "name": "8548989 - Newbold, PA",
    "tideStation": {
      "name": "NEWBOLD",
      "id": "8548989",
      "latitude": 40.1367,
      "longitude": -74.7517,
      "distance": 42
    }
  },
  "NCHT2": {
    "longitude": -95.266,
    "latitude": 29.726,
    "name": "8770777 - Manchester, TX ",
    "tideStation": {
      "name": "MANCHESTER (TCOON)",
      "id": "8770777",
      "latitude": 29.7263,
      "longitude": -95.2658,
      "distance": 38
    }
  },
  "NFBF1": {
    "longitude": -81.096,
    "latitude": 25.084,
    "name": "NFB - Northwest Florida Bay, FL",
    "tideStation": {
      "name": "VACA KEY",
      "id": "8723970",
      "latitude": 24.7117,
      "longitude": -81.105,
      "distance": 41250
    }
  },
  "NFDF1": {
    "longitude": -81.627,
    "latitude": 30.4,
    "name": "8720215 - Navy Fuel Depot, St Johns River, FL",
    "tideStation": {
      "name": "PHOENIX PARK",
      "id": "8720225",
      "latitude": 30.3833,
      "longitude": -81.6367,
      "distance": 2073
    }
  },
  "NIAN6": {
    "longitude": -79.014,
    "latitude": 43.077,
    "name": "9063012 - Niagara Intake, NY"
  },
  "NIWS1": {
    "longitude": -79.189,
    "latitude": 33.349,
    "name": "Oyster Landing, North Inlet-Winyah Bay Reserve, SC",
    "tideStation": {
      "name": "SPRINGMAID PIER",
      "id": "8661070",
      "latitude": 33.655,
      "longitude": -78.9183,
      "distance": 42244
    }
  },
  "NKLA2": {
    "longitude": -168.855,
    "latitude": 52.972,
    "name": "Nikolski White Alice",
    "tideStation": {
      "name": "NIKOLSKI",
      "id": "9462450",
      "latitude": 52.9406,
      "longitude": -168.871,
      "distance": 3656
    }
  },
  "NKTA2": {
    "longitude": -151.399,
    "latitude": 60.683,
    "name": "9455760 - Nikiski, AK",
    "tideStation": {
      "name": "NIKISKI",
      "id": "9455760",
      "latitude": 60.6833,
      "longitude": -151.398,
      "distance": 64
    }
  },
  "NLNC3": {
    "longitude": -72.09,
    "latitude": 41.361,
    "name": "8461490 - New London, CT",
    "tideStation": {
      "name": "NEW LONDON",
      "id": "8461490",
      "latitude": 41.3614,
      "longitude": -72.09,
      "distance": 44
    }
  },
  "NMTA2": {
    "longitude": -165.43,
    "latitude": 64.5,
    "name": "9468756 - Nome, Norton Sound, AK",
    "tideStation": {
      "name": "NOME, NORTON SOUND",
      "id": "9468756",
      "latitude": 64.5,
      "longitude": -165.43,
      "distance": 0
    }
  },
  "NOXN7": {
    "longitude": -77.851,
    "latitude": 34.156,
    "name": "Research Creek, North Carolina Reserve, NC",
    "tideStation": {
      "name": "WRIGHTSVILLE BEACH",
      "id": "8658163",
      "latitude": 34.2133,
      "longitude": -77.7867,
      "distance": 8691
    }
  },
  "NPDW3": {
    "longitude": -86.977,
    "latitude": 45.291,
    "name": "Northport Pier at Death's Door WI"
  },
  "NPSF1": {
    "longitude": -81.807,
    "latitude": 26.132,
    "name": "8725110 - Naples, FL",
    "tideStation": {
      "name": "NAPLES",
      "id": "8725110",
      "latitude": 26.1317,
      "longitude": -81.8075,
      "distance": 60
    }
  },
  "NSTP6": {
    "longitude": -170.688,
    "latitude": -14.28,
    "name": "1770000 - Pago Pago, American Samoa",
    "tideStation": {
      "name": "PAGO PAGO, AMERICAN SAMOA",
      "id": "1770000",
      "latitude": -14.28,
      "longitude": -170.69,
      "distance": 216
    }
  },
  "NTBC1": {
    "longitude": -119.692,
    "latitude": 34.405,
    "name": "9411340 - Santa Barbara, CA ",
    "tideStation": {
      "name": "SANTA BARBARA",
      "id": "9411340",
      "latitude": 34.4083,
      "longitude": -119.685,
      "distance": 740
    }
  },
  "NTKM3": {
    "longitude": -70.096,
    "latitude": 41.285,
    "name": "8449130 - Nantucket Island, MA",
    "tideStation": {
      "name": "NANTUCKET ISLAND",
      "id": "8449130",
      "latitude": 41.285,
      "longitude": -70.0967,
      "distance": 59
    }
  },
  "NUET2": {
    "longitude": -97.486,
    "latitude": 27.832,
    "name": "8775244 - Nueces Bay, TX",
    "tideStation": {
      "name": "NUECES BAY (TCOON)",
      "id": "8775244",
      "latitude": 27.8328,
      "longitude": -97.4859,
      "distance": 89
    }
  },
  "NWCL1": {
    "longitude": -90.113,
    "latitude": 30.027,
    "name": "8761927 - New Canal, LA",
    "tideStation": {
      "name": "NEW CANAL STATION",
      "id": "8761927",
      "latitude": 30.0272,
      "longitude": -90.1134,
      "distance": 45
    }
  },
  "NWHC3": {
    "longitude": -72.908,
    "latitude": 41.283,
    "name": "8465705 - New Haven, CT",
    "tideStation": {
      "name": "NEW HAVEN",
      "id": "8465705",
      "latitude": 41.2833,
      "longitude": -72.9083,
      "distance": 42
    }
  },
  "NWPO3": {
    "longitude": -124.067,
    "latitude": 44.613,
    "name": "Newport, OR",
    "tideStation": {
      "name": "SOUTH BEACH",
      "id": "9435380",
      "latitude": 44.625,
      "longitude": -124.043,
      "distance": 2325
    }
  },
  "NWPR1": {
    "longitude": -71.326,
    "latitude": 41.504,
    "name": "8452660 - Newport, RI",
    "tideStation": {
      "name": "NEWPORT",
      "id": "8452660",
      "latitude": 41.505,
      "longitude": -71.3267,
      "distance": 126
    }
  },
  "NWWH1": {
    "longitude": -159.353,
    "latitude": 21.954,
    "name": "1611400 - Nawiliwili, HI",
    "tideStation": {
      "name": "NAWILIWILI",
      "id": "1611400",
      "latitude": 21.9544,
      "longitude": -159.356,
      "distance": 313
    }
  },
  "OBGN6": {
    "longitude": -75.494,
    "latitude": 44.702,
    "name": "8311030 - Ogdensburg, NY"
  },
  "OBLA1": {
    "longitude": -88.04,
    "latitude": 30.705,
    "name": "8737048 - Mobile State Docks, AL",
    "tideStation": {
      "name": "MOBILE STATE DOCKS",
      "id": "8737048",
      "latitude": 30.7083,
      "longitude": -88.0433,
      "distance": 484
    }
  },
  "OBXC1": {
    "longitude": -122.341,
    "latitude": 37.804,
    "name": "9414797 - Oakland Berth 38, CA",
    "tideStation": {
      "name": "RINCON POINT, PIER 22 1/2",
      "id": "9414317",
      "latitude": 37.79,
      "longitude": -122.387,
      "distance": 4339
    }
  },
  "OCIM2": {
    "longitude": -75.091,
    "latitude": 38.328,
    "name": "8570283 - Ocean City Inlet, MD",
    "tideStation": {
      "name": "OCEAN CITY INLET",
      "id": "8570283",
      "latitude": 38.3283,
      "longitude": -75.0917,
      "distance": 70
    }
  },
  "OCPN7": {
    "longitude": -78.147,
    "latitude": 33.911,
    "name": "OCP1 - Ocean Crest Pier, NC",
    "tideStation": {
      "name": "OAK ISLAND, ATLANTIC OCEAN",
      "id": "8659182",
      "latitude": 33.9017,
      "longitude": -78.0817,
      "distance": 6127
    }
  },
  "OHBC1": {
    "longitude": -118.273,
    "latitude": 33.72,
    "name": "9410660 - Los Angeles, CA",
    "tideStation": {
      "name": "LOS ANGELES",
      "id": "9410660",
      "latitude": 33.72,
      "longitude": -118.272,
      "distance": 93
    }
  },
  "OKXC1": {
    "longitude": -122.333,
    "latitude": 37.811,
    "name": "9414776 - Oakland Berth 34, CA",
    "tideStation": {
      "name": "OAKLAND INNER HARBOR",
      "id": "9414764",
      "latitude": 37.795,
      "longitude": -122.282,
      "distance": 4830
    }
  },
  "OLCN6": {
    "longitude": -78.719,
    "latitude": 43.341,
    "name": "Olcott Harbor, NY"
  },
  "OLSA2": {
    "longitude": -168.87,
    "latitude": 52.94,
    "name": "9462450 - Nikolski, AK",
    "tideStation": {
      "name": "NIKOLSKI",
      "id": "9462450",
      "latitude": 52.9406,
      "longitude": -168.871,
      "distance": 95
    }
  },
  "OMHC1": {
    "longitude": -122.33,
    "latitude": 37.801,
    "name": "9414769 - Oakland Middle Harbor Met, CA",
    "tideStation": {
      "name": "OAKLAND INNER HARBOR",
      "id": "9414764",
      "latitude": 37.795,
      "longitude": -122.282,
      "distance": 4280
    }
  },
  "OOUH1": {
    "longitude": -157.865,
    "latitude": 21.303,
    "name": "1612340 - Honolulu, HI",
    "tideStation": {
      "name": "HONOLULU",
      "id": "1612340",
      "latitude": 21.3067,
      "longitude": -157.867,
      "distance": 459
    }
  },
  "OPTF1": {
    "longitude": -82.553,
    "latitude": 27.858,
    "name": "8726607 - Old Port Tampa, FL",
    "tideStation": {
      "name": "OLD PORT TAMPA",
      "id": "8726607",
      "latitude": 27.8578,
      "longitude": -82.5527,
      "distance": 37
    }
  },
  "ORIN7": {
    "longitude": -75.548,
    "latitude": 35.796,
    "name": "8652587 - Oregon Inlet Marina, NC",
    "tideStation": {
      "name": "OREGON INLET MARINA",
      "id": "8652587",
      "latitude": 35.795,
      "longitude": -75.5483,
      "distance": 114
    }
  },
  "OSGN6": {
    "longitude": -76.511,
    "latitude": 43.464,
    "name": "9052030 - Oswego, NY"
  },
  "OSTF1": {
    "longitude": -89.612,
    "latitude": 30.357,
    "name": "Stennis Test Facility",
    "tideStation": {
      "name": "WAVELAND",
      "id": "8747766",
      "latitude": 30.2817,
      "longitude": -89.3667,
      "distance": 25025
    }
  },
  "OVIA2": {
    "longitude": -151.72,
    "latitude": 59.44,
    "name": "9455500 - Seldovia, AK",
    "tideStation": {
      "name": "SELDOVIA",
      "id": "9455500",
      "latitude": 59.4405,
      "longitude": -151.719,
      "distance": 80
    }
  },
  "OWXO1": {
    "longitude": -82.508,
    "latitude": 41.378,
    "name": "Old Woman Creek, OH"
  },
  "PACF1": {
    "longitude": -85.667,
    "latitude": 30.152,
    "name": "8729108 - Panama City, FL",
    "tideStation": {
      "name": "PANAMA CITY",
      "id": "8729108",
      "latitude": 30.1523,
      "longitude": -85.6669,
      "distance": 35
    }
  },
  "PACT2": {
    "longitude": -97.237,
    "latitude": 27.634,
    "name": "8775792 - Packery Channel, TX",
    "tideStation": {
      "name": "PACKERY CHANNEL (TCOON)",
      "id": "8775792",
      "latitude": 27.6333,
      "longitude": -97.2367,
      "distance": 83
    }
  },
  "PBFW1": {
    "longitude": -122.469,
    "latitude": 48.464,
    "name": "Padilla Bay Farm, Padilla Bay Reserve, WA",
    "tideStation": {
      "name": "TURNER BAY",
      "id": "9448657",
      "latitude": 48.445,
      "longitude": -122.555,
      "distance": 6703
    }
  },
  "PCBF1": {
    "longitude": -85.88,
    "latitude": 30.213,
    "name": "8729210 - Panama City Beach, FL",
    "tideStation": {
      "name": "PANAMA CITY",
      "id": "8729108",
      "latitude": 30.1523,
      "longitude": -85.6669,
      "distance": 21598
    }
  },
  "PCLF1": {
    "longitude": -87.211,
    "latitude": 30.404,
    "name": "8729840 - Pensacola, FL",
    "tideStation": {
      "name": "PENSACOLA",
      "id": "8729840",
      "latitude": 30.4044,
      "longitude": -87.2112,
      "distance": 48
    }
  },
  "PCLM4": {
    "longitude": -88.528,
    "latitude": 47.276,
    "name": "Portage Canal, MI"
  },
  "PCNT2": {
    "longitude": -96.396,
    "latitude": 28.446,
    "name": "8773701 - Matagorda Bay; Port O'Connor, TX",
    "tideStation": {
      "name": "PORT O'CONNOR (TCOON)",
      "id": "8773701",
      "latitude": 28.4517,
      "longitude": -96.3883,
      "distance": 984
    }
  },
  "PCOC1": {
    "longitude": -122.039,
    "latitude": 38.056,
    "name": "9415144 - Port Chicago, CA",
    "tideStation": {
      "name": "PORT CHICAGO",
      "id": "9415144",
      "latitude": 38.056,
      "longitude": -122.039,
      "distance": 0
    }
  },
  "PFXC1": {
    "longitude": -118.268,
    "latitude": 33.748,
    "name": "9410670 - Los Angeles Pier F, CA",
    "tideStation": {
      "name": "LOS ANGELES",
      "id": "9410660",
      "latitude": 33.72,
      "longitude": -118.272,
      "distance": 3128
    }
  },
  "PGBP7": {
    "longitude": 144.796,
    "latitude": 13.428,
    "name": "1631428 - Pago Bay, Guam",
    "tideStation": {
      "name": "PAGO BAY, GUAM",
      "id": "1631428",
      "latitude": 13.4283,
      "longitude": 144.797,
      "distance": 113
    }
  },
  "PHBP1": {
    "longitude": -75.142,
    "latitude": 39.933,
    "name": "8545240 - Philadelphia, PA",
    "tideStation": {
      "name": "PHILADELPHIA",
      "id": "8545240",
      "latitude": 39.9333,
      "longitude": -75.1417,
      "distance": 42
    }
  },
  "PILA2": {
    "longitude": -149.47,
    "latitude": 59.742,
    "name": "Pilot Rock, AK",
    "tideStation": {
      "name": "AGNES COVE, AIALIK PENINSULA",
      "id": "9455120",
      "latitude": 59.7733,
      "longitude": -149.588,
      "distance": 7493
    }
  },
  "PILL1": {
    "longitude": -89.259,
    "latitude": 29.179,
    "name": "8760721 - Pilottown, LA",
    "tideStation": {
      "name": "PILOTTOWN",
      "id": "8760721",
      "latitude": 29.1783,
      "longitude": -89.2583,
      "distance": 103
    }
  },
  "PILM4": {
    "longitude": -88.366,
    "latitude": 48.223,
    "name": "Passage Island, MI"
  },
  "PKBW3": {
    "longitude": -92.136,
    "latitude": 46.672,
    "name": "Pokegama Bay, Lake Superior Reserve, WI"
  },
  "PLSF1": {
    "longitude": -82.773,
    "latitude": 24.693,
    "name": "Pulaski Shoals Light, FL"
  },
  "PLXA2": {
    "longitude": -134.647,
    "latitude": 56.247,
    "name": "9451054 - Port Alexander, AK",
    "tideStation": {
      "name": "PORT ALEXANDER",
      "id": "9451054",
      "latitude": 56.2467,
      "longitude": -134.647,
      "distance": 33
    }
  },
  "PMAF1": {
    "longitude": -82.562,
    "latitude": 27.638,
    "name": "8726384 - Port Manatee, FL",
    "tideStation": {
      "name": "PORT MANATEE",
      "id": "8726384",
      "latitude": 27.6387,
      "longitude": -82.5621,
      "distance": 78
    }
  },
  "PMNT2": {
    "longitude": -97.424,
    "latitude": 26.559,
    "name": "8778490 - Port Mansfield, TX"
  },
  "PMOA2": {
    "longitude": -160.562,
    "latitude": 55.99,
    "name": "9463502 - Port Moller, AK",
    "tideStation": {
      "name": "PORT MOLLER",
      "id": "9463502",
      "latitude": 55.99,
      "longitude": -160.562,
      "distance": 0
    }
  },
  "PNGW3": {
    "longitude": -91.386,
    "latitude": 46.792,
    "name": "Port Wing, WI"
  },
  "PNLM4": {
    "longitude": -85.869,
    "latitude": 45.968,
    "name": "9087096 - Port Inland, MI"
  },
  "PNLM6": {
    "longitude": -88.563,
    "latitude": 30.368,
    "name": "8741533 - Pascagoula NOAA Lab, MS",
    "tideStation": {
      "name": "PASCAGOULA POINT",
      "id": "8741196",
      "latitude": 30.34,
      "longitude": -88.5333,
      "distance": 4218
    }
  },
  "PORO3": {
    "longitude": -124.498,
    "latitude": 42.739,
    "name": "9431647 - Port Orford, OR",
    "tideStation": {
      "name": "PORT ORFORD",
      "id": "9431647",
      "latitude": 42.739,
      "longitude": -124.498,
      "distance": 0
    }
  },
  "PORT2": {
    "longitude": -93.931,
    "latitude": 29.867,
    "name": "8770475 - Port Arthur, TX",
    "tideStation": {
      "name": "PORT ARTHUR (TCOON)",
      "id": "8770475",
      "latitude": 29.8667,
      "longitude": -93.93,
      "distance": 102
    }
  },
  "POTA2": {
    "longitude": -146.7,
    "latitude": 61.06,
    "name": "Potato Point, AK",
    "tideStation": {
      "name": "VALDEZ",
      "id": "9454240",
      "latitude": 61.125,
      "longitude": -146.362,
      "distance": 19621
    }
  },
  "PPTA1": {
    "longitude": -87.556,
    "latitude": 30.279,
    "name": "Perdido Pass, AL",
    "tideStation": {
      "name": "GULF SHORES, ICWW",
      "id": "8731439",
      "latitude": 30.2799,
      "longitude": -87.6843,
      "distance": 12345
    }
  },
  "PPXC1": {
    "longitude": -122.365,
    "latitude": 37.906,
    "name": "9414847 - Richmond (Point Potrero), CA",
    "tideStation": {
      "name": "RICHMOND",
      "id": "9414863",
      "latitude": 37.9283,
      "longitude": -122.4,
      "distance": 3949
    }
  },
  "PRDA2": {
    "longitude": -148.527,
    "latitude": 70.4,
    "name": "9497645 - Prudhoe Bay, AK",
    "tideStation": {
      "name": "PRUDHOE BAY",
      "id": "9497645",
      "latitude": 70.4,
      "longitude": -148.527,
      "distance": 0
    }
  },
  "PRIM4": {
    "longitude": -83.492,
    "latitude": 45.357,
    "name": "Presque Isle Light, MI"
  },
  "PRJC1": {
    "longitude": -118.186,
    "latitude": 33.733,
    "name": "9410665 - Los Angeles Pier J, CA",
    "tideStation": {
      "name": "LONG BEACH, TERMINAL ISLAND",
      "id": "9410680",
      "latitude": 33.7517,
      "longitude": -118.227,
      "distance": 4328
    }
  },
  "PRTA2": {
    "longitude": -134.955,
    "latitude": 58.411,
    "name": "Point Retreat, AK",
    "tideStation": {
      "name": "JUNEAU",
      "id": "9452210",
      "latitude": 58.2983,
      "longitude": -134.412,
      "distance": 34180
    }
  },
  "PRYC1": {
    "longitude": -122.977,
    "latitude": 37.996,
    "name": "9415020 - Point Reyes, CA",
    "tideStation": {
      "name": "POINT REYES",
      "id": "9415020",
      "latitude": 37.9961,
      "longitude": -122.976,
      "distance": 89
    }
  },
  "PSBC1": {
    "longitude": -121.887,
    "latitude": 38.04,
    "name": "9415115 - Pittsburg (Suisun Bay), CA",
    "tideStation": {
      "name": "MALLARD ISLAND FERRY WHARF",
      "id": "9415112",
      "latitude": 38.0433,
      "longitude": -121.918,
      "distance": 2746
    }
  },
  "PSBM1": {
    "longitude": -66.983,
    "latitude": 44.905,
    "name": "8410140 - Eastport, ME",
    "tideStation": {
      "name": "EASTPORT",
      "id": "8410140",
      "latitude": 44.9046,
      "longitude": -66.9829,
      "distance": 45
    }
  },
  "PSCM4": {
    "longitude": -82.54,
    "latitude": 43.42,
    "name": "Port Sanilac, MI"
  },
  "PSLC1": {
    "longitude": -120.754,
    "latitude": 35.169,
    "name": "9412110 - Port San Luis, CA",
    "tideStation": {
      "name": "PORT SAN LUIS",
      "id": "9412110",
      "latitude": 35.1767,
      "longitude": -120.76,
      "distance": 1014
    }
  },
  "PSTL1": {
    "longitude": -89.407,
    "latitude": 28.932,
    "name": "8760922 - Pilot's Station East, SW Pass, LA",
    "tideStation": {
      "name": "SOUTH PASS",
      "id": "8760551",
      "latitude": 28.99,
      "longitude": -89.14,
      "distance": 26808
    }
  },
  "PSTN6": {
    "longitude": -79.048,
    "latitude": 42.691,
    "name": "9063028 - Sturgeon Point, NY"
  },
  "PTAT2": {
    "longitude": -97.051,
    "latitude": 27.826,
    "name": "Port Aransas, TX",
    "tideStation": {
      "name": "PORT ARANSAS (H. CALDWELL PIER)",
      "id": "8775270",
      "latitude": 27.8267,
      "longitude": -97.05,
      "distance": 125
    }
  },
  "PTAW1": {
    "longitude": -123.441,
    "latitude": 48.125,
    "name": "9444090 - Port Angeles, WA",
    "tideStation": {
      "name": "PORT ANGELES",
      "id": "9444090",
      "latitude": 48.125,
      "longitude": -123.44,
      "distance": 74
    }
  },
  "PTBM6": {
    "longitude": -88.505,
    "latitude": 30.213,
    "name": "8741003 - Petit Bois Island, MS",
    "tideStation": {
      "name": "PETIT BOIS ISLAND, MISSISSIPPI SOUND",
      "id": "8740405",
      "latitude": 30.2033,
      "longitude": -88.4417,
      "distance": 6189
    }
  },
  "PTCR1": {
    "longitude": -71.34,
    "latitude": 41.638,
    "name": "8452951 - Potter Cove, Prudence Island, RI",
    "tideStation": {
      "name": "BRISTOL FERRY",
      "id": "8451552",
      "latitude": 41.6367,
      "longitude": -71.255,
      "distance": 7084
    }
  },
  "PTGC1": {
    "longitude": -120.648,
    "latitude": 34.577,
    "name": "Point Arguello, CA",
    "tideStation": {
      "name": "OIL PLATFORM HARVEST",
      "id": "9411406",
      "latitude": 34.4683,
      "longitude": -120.673,
      "distance": 12275
    }
  },
  "PTIM4": {
    "longitude": -84.631,
    "latitude": 46.485,
    "name": "9099004 - Point Iroquois, MI"
  },
  "PTIT2": {
    "longitude": -97.215,
    "latitude": 26.061,
    "name": "8779770 - Port Isabel, TX",
    "tideStation": {
      "name": "PORT ISABEL",
      "id": "8779770",
      "latitude": 26.06,
      "longitude": -97.215,
      "distance": 111
    }
  },
  "PTLA2": {
    "longitude": -134.752,
    "latitude": 58.346,
    "name": "Portland Island, AK",
    "tideStation": {
      "name": "JUNEAU",
      "id": "9452210",
      "latitude": 58.2983,
      "longitude": -134.412,
      "distance": 20620
    }
  },
  "PTOA1": {
    "longitude": -88.031,
    "latitude": 30.671,
    "name": "8737005 - Pinto Island, AL",
    "tideStation": {
      "name": "COAST GUARD SECTOR MOBILE",
      "id": "8736897",
      "latitude": 30.6483,
      "longitude": -88.0583,
      "distance": 3630
    }
  },
  "PTWW1": {
    "longitude": -122.76,
    "latitude": 48.111,
    "name": "9444900 - Port Townsend, WA",
    "tideStation": {
      "name": "PORT TOWNSEND",
      "id": "9444900",
      "latitude": 48.1117,
      "longitude": -122.758,
      "distance": 168
    }
  },
  "PVGF1": {
    "longitude": -80.109,
    "latitude": 26.092,
    "name": "Port Everglades Channel, FL",
    "tideStation": {
      "name": "HAULOVER PIER, N. MIAMI BEACH",
      "id": "8723080",
      "latitude": 25.9033,
      "longitude": -80.12,
      "distance": 20935
    }
  },
  "PWAW3": {
    "longitude": -87.867,
    "latitude": 43.388,
    "name": "Port Washington, WI"
  },
  "PXOC1": {
    "longitude": -122.393,
    "latitude": 37.798,
    "name": "9414311 - San Francisco Pier 1, CA",
    "tideStation": {
      "name": "RINCON POINT, PIER 22 1/2",
      "id": "9414317",
      "latitude": 37.79,
      "longitude": -122.387,
      "distance": 1033
    }
  },
  "PXSC1": {
    "longitude": -122.397,
    "latitude": 37.803,
    "name": "9414296 - Pier 17, San Francisco, CA",
    "tideStation": {
      "name": "RINCON POINT, PIER 22 1/2",
      "id": "9414317",
      "latitude": 37.79,
      "longitude": -122.387,
      "distance": 1690
    }
  },
  "QPTR1": {
    "longitude": -71.407,
    "latitude": 41.586,
    "name": "8454049 - Quonset Point, RI",
    "tideStation": {
      "name": "QUONSET POINT",
      "id": "8454049",
      "latitude": 41.5868,
      "longitude": -71.411,
      "distance": 345
    }
  },
  "RARM6": {
    "longitude": -88.511,
    "latitude": 30.343,
    "name": "8741094 - Range A rear, Pascagoula, MS",
    "tideStation": {
      "name": "DOCK E, PORT OF PASCAGOULA",
      "id": "8741041",
      "latitude": 30.3477,
      "longitude": -88.5054,
      "distance": 749
    }
  },
  "RCKM4": {
    "longitude": -84.191,
    "latitude": 46.264,
    "name": "9076024 - Rock Cut, MI"
  },
  "RCMC1": {
    "longitude": -122.41,
    "latitude": 37.923,
    "name": "9414863 - Richmond, CA",
    "tideStation": {
      "name": "RICHMOND",
      "id": "9414863",
      "latitude": 37.9283,
      "longitude": -122.4,
      "distance": 1058
    }
  },
  "RCPT2": {
    "longitude": -97.048,
    "latitude": 28.024,
    "name": "8774770 - Rockport, TX",
    "tideStation": {
      "name": "PORT ARANSAS (H. CALDWELL PIER)",
      "id": "8775270",
      "latitude": 27.8267,
      "longitude": -97.05,
      "distance": 21865
    }
  },
  "RCRN6": {
    "longitude": -77.626,
    "latitude": 43.269,
    "name": "9052058 - Rochester, NY"
  },
  "RDDA2": {
    "longitude": -164.067,
    "latitude": 67.575,
    "name": "9491094 - Red Dog Dock, AK",
    "tideStation": {
      "name": "RED DOG DOCK",
      "id": "9491094",
      "latitude": 67.5767,
      "longitude": -164.065,
      "distance": 208
    }
  },
  "RDYD1": {
    "longitude": -75.572,
    "latitude": 39.558,
    "name": "8551910 - Reedy Point, DE",
    "tideStation": {
      "name": "REEDY POINT",
      "id": "8551910",
      "latitude": 39.5583,
      "longitude": -75.5733,
      "distance": 117
    }
  },
  "RLIT2": {
    "longitude": -97.285,
    "latitude": 26.262,
    "name": "8779280 - Realitos Peninsula, TX",
    "tideStation": {
      "name": "PORT ISABEL",
      "id": "8779770",
      "latitude": 26.06,
      "longitude": -97.215,
      "distance": 23448
    }
  },
  "RLOT2": {
    "longitude": -94.513,
    "latitude": 29.515,
    "name": "8770971 - Rollover Pass, TX",
    "tideStation": {
      "name": "ROLLOVER PASS (TCOON)",
      "id": "8770971",
      "latitude": 29.515,
      "longitude": -94.5133,
      "distance": 29
    }
  },
  "ROAM4": {
    "longitude": -89.313,
    "latitude": 47.867,
    "name": "Rock of Ages, MI"
  },
  "ROBN4": {
    "longitude": -74.065,
    "latitude": 40.657,
    "name": "8530973 - Robbins Reef, NJ",
    "tideStation": {
      "name": "USCG STATION NY",
      "id": "8519050",
      "latitude": 40.612,
      "longitude": -74.0599,
      "distance": 5016
    }
  },
  "RPLV2": {
    "longitude": -76.014,
    "latitude": 37.538,
    "name": "8632837 - Rappahannock Light, VA",
    "tideStation": {
      "name": "GASKINS POINT, OCCOHANNOCK CREEK",
      "id": "8632869",
      "latitude": 37.5567,
      "longitude": -75.9167,
      "distance": 8845
    }
  },
  "RPRN6": {
    "longitude": -77.598,
    "latitude": 43.263,
    "name": "Rochester, NY"
  },
  "RSJT2": {
    "longitude": -97.471,
    "latitude": 26.801,
    "name": "8777812 - Rincon del San Jose; Potrero Lopeno SW, TX"
  },
  "RTAT2": {
    "longitude": -97.072,
    "latitude": 27.84,
    "name": "8775237 - Port Aransas, TX",
    "tideStation": {
      "name": "PORT ARANSAS (H. CALDWELL PIER)",
      "id": "8775270",
      "latitude": 27.8267,
      "longitude": -97.05,
      "distance": 2621
    }
  },
  "RTYC1": {
    "longitude": -122.212,
    "latitude": 37.507,
    "name": "9414523 - Redwood City, CA",
    "tideStation": {
      "name": "REDWOOD CITY",
      "id": "9414523",
      "latitude": 37.5067,
      "longitude": -122.21,
      "distance": 180
    }
  },
  "SACV4": {
    "longitude": -96.093,
    "latitude": 19.174,
    "name": "Sacrifice Island, Mexico"
  },
  "SANF1": {
    "longitude": -81.877,
    "latitude": 24.456,
    "name": "Sand Key, FL",
    "tideStation": {
      "name": "SAND KEY LIGHTHOUSE, SAND KEY CHANNEL",
      "id": "8724635",
      "latitude": 24.4533,
      "longitude": -81.8783,
      "distance": 327
    }
  },
  "SAPF1": {
    "longitude": -82.627,
    "latitude": 27.761,
    "name": "8726520 - St. Petersburg, FL",
    "tideStation": {
      "name": "ST PETERSBURG",
      "id": "8726520",
      "latitude": 27.7606,
      "longitude": -82.6269,
      "distance": 45
    }
  },
  "SAUF1": {
    "longitude": -81.265,
    "latitude": 29.857,
    "name": "St. Augustine, FL",
    "tideStation": {
      "name": "ST. AUGUSTINE BEACH",
      "id": "8720587",
      "latitude": 29.8567,
      "longitude": -81.2633,
      "distance": 168
    }
  },
  "SAXG1": {
    "longitude": -81.296,
    "latitude": 31.418,
    "name": "Marsh Island, Sapelo Island Reserve, GA",
    "tideStation": {
      "name": "DAYMARK #185, ROCKDEDUNDY RIVER ENTRANCE",
      "id": "8675761",
      "latitude": 31.3739,
      "longitude": -81.3339,
      "distance": 6075
    }
  },
  "SBEO3": {
    "longitude": -124.045,
    "latitude": 44.625,
    "name": "9435380 - South Beach, OR",
    "tideStation": {
      "name": "SOUTH BEACH",
      "id": "9435380",
      "latitude": 44.625,
      "longitude": -124.043,
      "distance": 159
    }
  },
  "SBIO1": {
    "longitude": -82.841,
    "latitude": 41.629,
    "name": "South Bass Island, OH"
  },
  "SBLM4": {
    "longitude": -83.72,
    "latitude": 43.81,
    "name": "Saginaw Bay Light #1, MI"
  },
  "SBPT2": {
    "longitude": -93.87,
    "latitude": 29.728,
    "name": "8770570 - Sabine Pass North, TX",
    "tideStation": {
      "name": "SABINE PASS NORTH",
      "id": "8770570",
      "latitude": 29.7284,
      "longitude": -93.8701,
      "distance": 45
    }
  },
  "SDBC1": {
    "longitude": -117.174,
    "latitude": 32.714,
    "name": "9410170 - San Diego, CA",
    "tideStation": {
      "name": "SAN DIEGO",
      "id": "9410170",
      "latitude": 32.7142,
      "longitude": -117.173,
      "distance": 96
    }
  },
  "SDHN4": {
    "longitude": -74.009,
    "latitude": 40.467,
    "name": "8531680 - Sandy Hook, NJ",
    "tideStation": {
      "name": "SANDY HOOK",
      "id": "8531680",
      "latitude": 40.4669,
      "longitude": -74.0094,
      "distance": 36
    }
  },
  "SGNW3": {
    "longitude": -87.693,
    "latitude": 43.749,
    "name": "Sheboygan, WI"
  },
  "SGOF1": {
    "longitude": -84.858,
    "latitude": 29.408,
    "name": "Tyndall AFB Tower C (N4), FL",
    "tideStation": {
      "name": "APALACHICOLA",
      "id": "8728690",
      "latitude": 29.7267,
      "longitude": -84.9817,
      "distance": 37305
    }
  },
  "SHBL1": {
    "longitude": -89.673,
    "latitude": 29.868,
    "name": "8761305 - Shell Beach, LA",
    "tideStation": {
      "name": "SHELL BEACH",
      "id": "8761305",
      "latitude": 29.8681,
      "longitude": -89.6732,
      "distance": 22
    }
  },
  "SHPF1": {
    "longitude": -84.291,
    "latitude": 30.058,
    "name": "SHP - Shell Point, FL",
    "tideStation": {
      "name": "SHELL POINT, WALKER CREEK",
      "id": "8728229",
      "latitude": 30.06,
      "longitude": -84.29,
      "distance": 242
    }
  },
  "SIPF1": {
    "longitude": -80.445,
    "latitude": 27.862,
    "name": "Sebastian Inlet State Park, FL",
    "tideStation": {
      "name": "VERO BEACH",
      "id": "8722125",
      "latitude": 27.6317,
      "longitude": -80.3717,
      "distance": 26524
    }
  },
  "SISA2": {
    "longitude": -135.259,
    "latitude": 58.177,
    "name": "Sisters Island, AK",
    "tideStation": {
      "name": "HOONAH, PORT FREDRICK",
      "id": "9452438",
      "latitude": 58.1076,
      "longitude": -135.444,
      "distance": 13359
    }
  },
  "SISW1": {
    "longitude": -122.843,
    "latitude": 48.318,
    "name": "Smith Island, WA",
    "tideStation": {
      "name": "RICHARDSON",
      "id": "9449982",
      "latitude": 48.4467,
      "longitude": -122.9,
      "distance": 14921
    }
  },
  "SJNP4": {
    "longitude": -66.116,
    "latitude": 18.459,
    "name": "9755371 - San Juan, PR",
    "tideStation": {
      "name": "SAN JUAN",
      "id": "9755371",
      "latitude": 18.4589,
      "longitude": -66.1164,
      "distance": 44
    }
  },
  "SJOM4": {
    "longitude": -86.494,
    "latitude": 42.098,
    "name": "St. Joseph, MI"
  },
  "SJSN4": {
    "longitude": -75.377,
    "latitude": 39.305,
    "name": "8537121 - Ship John Shoal, NJ",
    "tideStation": {
      "name": "SHIP JOHN SHOAL",
      "id": "8537121",
      "latitude": 39.305,
      "longitude": -75.375,
      "distance": 173
    }
  },
  "SKTA2": {
    "longitude": -135.327,
    "latitude": 59.45,
    "name": "9452400 - Skagway, AK",
    "tideStation": {
      "name": "SKAGWAY",
      "id": "9452400",
      "latitude": 59.45,
      "longitude": -135.327,
      "distance": 0
    }
  },
  "SLIM2": {
    "longitude": -76.452,
    "latitude": 38.321,
    "name": "8577330 - Solomons Island, MD",
    "tideStation": {
      "name": "SOLOMONS ISLAND",
      "id": "8577330",
      "latitude": 38.3167,
      "longitude": -76.4517,
      "distance": 478
    }
  },
  "SLVM5": {
    "longitude": -91.27,
    "latitude": 47.278,
    "name": "Silver Bay, MN"
  },
  "SMKF1": {
    "longitude": -81.112,
    "latitude": 24.628,
    "name": "Sombrero Key, FL",
    "tideStation": {
      "name": "VACA KEY",
      "id": "8723970",
      "latitude": 24.7117,
      "longitude": -81.105,
      "distance": 9298
    }
  },
  "SNDA2": {
    "longitude": -160.502,
    "latitude": 55.336,
    "name": "9459450 - Sand Point, AK",
    "tideStation": {
      "name": "SAND POINT",
      "id": "9459450",
      "latitude": 55.3367,
      "longitude": -160.502,
      "distance": 78
    }
  },
  "SNDP5": {
    "longitude": -177.361,
    "latitude": 28.215,
    "name": "1619910 - Sand Island, Midway Islands",
    "tideStation": {
      "name": "SAND ISLAND, MIDWAY ISLANDS",
      "id": "1619910",
      "latitude": 28.2117,
      "longitude": -177.36,
      "distance": 379
    }
  },
  "SPGF1": {
    "longitude": -78.995,
    "latitude": 26.704,
    "name": "Settlement Point, GBI, Bahamas",
    "tideStation": {
      "name": "SETTLEMENT POINT",
      "id": "9710441",
      "latitude": 26.71,
      "longitude": -78.9967,
      "distance": 686
    }
  },
  "SPLL1": {
    "longitude": -90.483,
    "latitude": 28.867,
    "name": "South Timbalier Block 52, LA / CSI06",
    "tideStation": {
      "name": "E. ISLE DERNIERES, LAKE PELTO",
      "id": "8762888",
      "latitude": 29.0717,
      "longitude": -90.64,
      "distance": 27366
    }
  },
  "SPTM4": {
    "longitude": -83.273,
    "latitude": 44.713,
    "name": "Sturgeon Point Light, MI"
  },
  "SRST2": {
    "longitude": -94.033,
    "latitude": 29.683,
    "name": "Sabine Pass, TX",
    "tideStation": {
      "name": "SABINE PASS NORTH",
      "id": "8770570",
      "latitude": 29.7284,
      "longitude": -93.8701,
      "distance": 16548
    }
  },
  "STDM4": {
    "longitude": -87.225,
    "latitude": 47.184,
    "name": "Stannard Rock, MI"
  },
  "SVNM4": {
    "longitude": -86.288,
    "latitude": 42.401,
    "name": "South Haven, MI"
  },
  "SWLA2": {
    "longitude": -149.427,
    "latitude": 60.12,
    "name": "9455090 - Seward, AK",
    "tideStation": {
      "name": "SEWARD",
      "id": "9455090",
      "latitude": 60.12,
      "longitude": -149.426,
      "distance": 56
    }
  },
  "SWPM4": {
    "longitude": -84.372,
    "latitude": 46.501,
    "name": "9076070 - S.W. Pier, MI"
  },
  "SXHW3": {
    "longitude": -90.437,
    "latitude": 46.563,
    "name": "Saxon Harbor, WI"
  },
  "SYWW3": {
    "longitude": -87.121,
    "latitude": 45.202,
    "name": "Yacht Works Sister Bay WI"
  },
  "TAWM4": {
    "longitude": -83.449,
    "latitude": 44.254,
    "name": "Tawas City, MI"
  },
  "TBIM4": {
    "longitude": -83.194,
    "latitude": 45.035,
    "name": "Thunder Bay Island, MI"
  },
  "TCBM2": {
    "longitude": -76.244,
    "latitude": 39.213,
    "name": "8573364 - Tolchester Beach, MD",
    "tideStation": {
      "name": "TOLCHESTER BEACH",
      "id": "8573364",
      "latitude": 39.2133,
      "longitude": -76.245,
      "distance": 93
    }
  },
  "TCMW1": {
    "longitude": -122.418,
    "latitude": 47.276,
    "name": "9446482 - Tacoma Met, WA",
    "tideStation": {
      "name": "TACOMA",
      "id": "9446484",
      "latitude": 47.2667,
      "longitude": -122.413,
      "distance": 1101
    }
  },
  "TCNW1": {
    "longitude": -122.413,
    "latitude": 47.267,
    "name": "9446484 - Tacoma, WA",
    "tideStation": {
      "name": "TACOMA",
      "id": "9446484",
      "latitude": 47.2667,
      "longitude": -122.413,
      "distance": 33
    }
  },
  "TESL1": {
    "longitude": -91.237,
    "latitude": 29.668,
    "name": "8764044 - Tesoro Marine Terminal -  Berwick, LA",
    "tideStation": {
      "name": "STOUTS PASS AT SIX MILE LAKE",
      "id": "8764025",
      "latitude": 29.7433,
      "longitude": -91.23,
      "distance": 8374
    }
  },
  "THLO1": {
    "longitude": -83.194,
    "latitude": 41.826,
    "name": "Toledo Light No. 2 OH"
  },
  "THRO1": {
    "longitude": -83.473,
    "latitude": 41.694,
    "name": "9063085 - Toledo, OH"
  },
  "TKEA2": {
    "longitude": -135.219,
    "latitude": 57.779,
    "name": "Tenakee Springs, AK"
  },
  "TLBO3": {
    "longitude": -123.919,
    "latitude": 45.555,
    "name": "9437540 - Garibaldi, Tillamook Bay, OR",
    "tideStation": {
      "name": "GARIBALDI",
      "id": "9437540",
      "latitude": 45.5545,
      "longitude": -123.918,
      "distance": 96
    }
  },
  "TOKW1": {
    "longitude": -123.967,
    "latitude": 46.707,
    "name": "9440910 - Toke Point, WA",
    "tideStation": {
      "name": "TOKE POINT",
      "id": "9440910",
      "latitude": 46.7075,
      "longitude": -123.966,
      "distance": 95
    }
  },
  "TPAF1": {
    "longitude": -82.432,
    "latitude": 27.928,
    "name": "8726694 - TPA Cruise Terminal 2, Tampa, FL",
    "tideStation": {
      "name": "MCKAY BAY ENTRANCE",
      "id": "8726667",
      "latitude": 27.9133,
      "longitude": -82.425,
      "distance": 1769
    }
  },
  "TPLM2": {
    "longitude": -76.436,
    "latitude": 38.899,
    "name": "Thomas Point, MD",
    "tideStation": {
      "name": "KENT POINT",
      "id": "8572467",
      "latitude": 38.8367,
      "longitude": -76.3733,
      "distance": 8800
    }
  },
  "TRDF1": {
    "longitude": -80.593,
    "latitude": 28.416,
    "name": "8721604 - Trident Pier, FL",
    "tideStation": {
      "name": "TRIDENT PIER",
      "id": "8721604",
      "latitude": 28.4158,
      "longitude": -80.5931,
      "distance": 24
    }
  },
  "TSHF1": {
    "longitude": -82.426,
    "latitude": 27.929,
    "name": "8726679  - East Bay Causeway, FL",
    "tideStation": {
      "name": "MCKAY BAY ENTRANCE",
      "id": "8726667",
      "latitude": 27.9133,
      "longitude": -82.425,
      "distance": 1743
    }
  },
  "TTIW1": {
    "longitude": -124.735,
    "latitude": 48.392,
    "name": "Tatoosh Island, WA",
    "tideStation": {
      "name": "NEAH BAY",
      "id": "9443090",
      "latitude": 48.3667,
      "longitude": -124.611,
      "distance": 9607
    }
  },
  "ULAM6": {
    "longitude": -88.505,
    "latitude": 30.348,
    "name": "8741041 - Dock E. Port of Pascagoula, MS",
    "tideStation": {
      "name": "DOCK E, PORT OF PASCAGOULA",
      "id": "8741041",
      "latitude": 30.3477,
      "longitude": -88.5054,
      "distance": 51
    }
  },
  "UNLA2": {
    "longitude": -166.537,
    "latitude": 53.88,
    "name": "9462620 - Unalaska, AK",
    "tideStation": {
      "name": "UNALASKA",
      "id": "9462620",
      "latitude": 53.88,
      "longitude": -166.537,
      "distance": 0
    }
  },
  "UPBC1": {
    "longitude": -122.121,
    "latitude": 38.038,
    "name": "9415118 - Union Pacific Rail Road Bridge, Martinez, CA",
    "tideStation": {
      "name": "MARTINEZ-AMORCO PIER",
      "id": "9415102",
      "latitude": 38.0346,
      "longitude": -122.125,
      "distance": 515
    }
  },
  "VAKF1": {
    "longitude": -80.162,
    "latitude": 25.731,
    "name": "8723214 - Virginia Key, FL",
    "tideStation": {
      "name": "VIRGINIA KEY",
      "id": "8723214",
      "latitude": 25.7314,
      "longitude": -80.1618,
      "distance": 49
    }
  },
  "VCAF1": {
    "longitude": -81.107,
    "latitude": 24.711,
    "name": "8723970 - Vaca Key, FL",
    "tideStation": {
      "name": "VACA KEY",
      "id": "8723970",
      "latitude": 24.7117,
      "longitude": -81.105,
      "distance": 217
    }
  },
  "VCAT2": {
    "longitude": -96.609,
    "latitude": 28.64,
    "name": "8773259 - Port Lavaca, TX ",
    "tideStation": {
      "name": "PORT O'CONNOR (TCOON)",
      "id": "8773701",
      "latitude": 28.4517,
      "longitude": -96.3883,
      "distance": 30033
    }
  },
  "VCVA2": {
    "longitude": -170.285,
    "latitude": 57.125,
    "name": "9464212 - Village Cove, St. Paul Island, AK",
    "tideStation": {
      "name": "VILLAGE COVE, ST PAUL ISLAND",
      "id": "9464212",
      "latitude": 57.1253,
      "longitude": -170.285,
      "distance": 33
    }
  },
  "VDZA2": {
    "longitude": -146.361,
    "latitude": 61.125,
    "name": "9454240 - Valdez, AK",
    "tideStation": {
      "name": "VALDEZ",
      "id": "9454240",
      "latitude": 61.125,
      "longitude": -146.362,
      "distance": 54
    }
  },
  "VENF1": {
    "longitude": -82.453,
    "latitude": 27.072,
    "name": "Venice, FL"
  },
  "VERV4": {
    "longitude": -96.113,
    "latitude": 19.204,
    "name": "Veracruz Harbor, MX"
  },
  "VQSP4": {
    "longitude": -65.444,
    "latitude": 18.153,
    "name": "9752619 - Isabel Segunda, Vieques, PR",
    "tideStation": {
      "name": "ISABEL SEGUNDA, VIEQUES ISLAND",
      "id": "9752619",
      "latitude": 18.1525,
      "longitude": -65.4438,
      "distance": 59
    }
  },
  "WAHV2": {
    "longitude": -75.686,
    "latitude": 37.608,
    "name": "8631044 - Wachapreague, VA",
    "tideStation": {
      "name": "WACHAPREAGUE",
      "id": "8631044",
      "latitude": 37.6078,
      "longitude": -75.6858,
      "distance": 28
    }
  },
  "WAKP8": {
    "longitude": 166.618,
    "latitude": 19.291,
    "name": "1890000 - Wake Island",
    "tideStation": {
      "name": "WAKE ISLAND, PACIFIC OCEAN",
      "id": "1890000",
      "latitude": 19.29,
      "longitude": 166.618,
      "distance": 111
    }
  },
  "WASD2": {
    "longitude": -77.021,
    "latitude": 38.873,
    "name": "8594900 - Washington, DC",
    "tideStation": {
      "name": "WASHINGTON",
      "id": "8594900",
      "latitude": 38.8733,
      "longitude": -77.0217,
      "distance": 69
    }
  },
  "WATS1": {
    "longitude": -80.702,
    "latitude": 34.335,
    "name": "Lake Wateree, SC"
  },
  "WAXM3": {
    "longitude": -70.525,
    "latitude": 41.582,
    "name": "Carriage House, Waquoit Bay Reserve, MA",
    "tideStation": {
      "name": "CHAPPAQUOIT POINT",
      "id": "8447685",
      "latitude": 41.605,
      "longitude": -70.6517,
      "distance": 10868
    }
  },
  "WBYA1": {
    "longitude": -87.825,
    "latitude": 30.417,
    "name": " 8732828 - Weeks Bay, AL ",
    "tideStation": {
      "name": "POINT CLEAR, MOBILE BAY",
      "id": "8733821",
      "latitude": 30.4866,
      "longitude": -87.9345,
      "distance": 13044
    }
  },
  "WDEL1": {
    "longitude": -89.551,
    "latitude": 28.662,
    "name": "Shell West Delta 143"
  },
  "WELM1": {
    "longitude": -70.563,
    "latitude": 43.32,
    "name": "8419317 - Wells, ME",
    "tideStation": {
      "name": "WELLS",
      "id": "8419317",
      "latitude": 43.32,
      "longitude": -70.5633,
      "distance": 24
    }
  },
  "WEXM1": {
    "longitude": -70.549,
    "latitude": 43.337,
    "name": "Laudholm Farm, Wells Reserve, ME",
    "tideStation": {
      "name": "WELLS",
      "id": "8419317",
      "latitude": 43.32,
      "longitude": -70.5633,
      "distance": 2216
    }
  },
  "WFPM4": {
    "longitude": -84.97,
    "latitude": 46.76,
    "name": "Whitefish Point, MI"
  },
  "WHRI2": {
    "longitude": -87.813,
    "latitude": 42.361,
    "name": "Waukegan Harbor, IL"
  },
  "WKXA1": {
    "longitude": -87.828,
    "latitude": 30.421,
    "name": "Safe Harbor, Weeks Bay Reserve, AL",
    "tideStation": {
      "name": "POINT CLEAR, MOBILE BAY",
      "id": "8733821",
      "latitude": 30.4866,
      "longitude": -87.9345,
      "distance": 12550
    }
  },
  "WLON7": {
    "longitude": -77.954,
    "latitude": 34.228,
    "name": "8658120 - Wilmington, NC",
    "tideStation": {
      "name": "WILMINGTON",
      "id": "8658120",
      "latitude": 34.2267,
      "longitude": -77.9533,
      "distance": 158
    }
  },
  "WNEM4": {
    "longitude": -84.21,
    "latitude": 46.285,
    "name": "9076027 - West Neebish Island, MI"
  },
  "WPOW1": {
    "longitude": -122.436,
    "latitude": 47.662,
    "name": "West Point, WA",
    "tideStation": {
      "name": "SEATTLE",
      "id": "9447130",
      "latitude": 47.6026,
      "longitude": -122.339,
      "distance": 9837
    }
  },
  "WPTW1": {
    "longitude": -124.105,
    "latitude": 46.904,
    "name": "9441102 - Westport, WA",
    "tideStation": {
      "name": "WESTPORT",
      "id": "9441102",
      "latitude": 46.9043,
      "longitude": -124.105,
      "distance": 33
    }
  },
  "WSLM4": {
    "longitude": -85.135,
    "latitude": 45.842,
    "name": "White Shoal Light, MI"
  },
  "WYCM6": {
    "longitude": -89.326,
    "latitude": 30.326,
    "name": "8747437 - Bay Waveland Yacht Club, MS",
    "tideStation": {
      "name": "BAY WAVELAND YACHT CLUB",
      "id": "8747437",
      "latitude": 30.3264,
      "longitude": -89.3258,
      "distance": 48
    }
  },
  "YABP4": {
    "longitude": -65.833,
    "latitude": 18.055,
    "name": "9754228 - Yabucoa Harbor, PR",
    "tideStation": {
      "name": "YABUCOA HARBOR",
      "id": "9754228",
      "latitude": 18.0551,
      "longitude": -65.833,
      "distance": 11
    }
  },
  "YATA2": {
    "longitude": -139.733,
    "latitude": 59.548,
    "name": "9453220 - Yakutat, Yakutat Bay, AK",
    "tideStation": {
      "name": "YAKUTAT, YAKUTAT BAY",
      "id": "9453220",
      "latitude": 59.5485,
      "longitude": -139.733,
      "distance": 56
    }
  },
  "YGNN6": {
    "longitude": -79.064,
    "latitude": 43.262,
    "name": "Niagara Coast Guard Station, NY"
  },
  "YKRV2": {
    "longitude": -76.342,
    "latitude": 37.251,
    "name": "8637611 - York River East Rear Range Light, VA",
    "tideStation": {
      "name": "YORKTOWN USCG TRAINING CENTER",
      "id": "8637689",
      "latitude": 37.2267,
      "longitude": -76.4783,
      "distance": 12391
    }
  },
  "YKTV2": {
    "longitude": -76.479,
    "latitude": 37.227,
    "name": "8637689 - Yorktown, VA",
    "tideStation": {
      "name": "YORKTOWN USCG TRAINING CENTER",
      "id": "8637689",
      "latitude": 37.2267,
      "longitude": -76.4783,
      "distance": 70
    }
  },
  "YRSV2": {
    "longitude": -76.712,
    "latitude": 37.414,
    "name": "Taskinas Creek, Chesapeake Bay, VA",
    "tideStation": {
      "name": "KINGSMILL",
      "id": "8638424",
      "latitude": 37.22,
      "longitude": -76.6633,
      "distance": 21959
    }
  }
}

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _utilDegreesToDirection = require("./util/degrees-to-direction");

var _utilDegreesToDirection2 = _interopRequireDefault(_utilDegreesToDirection);

var _propMapJs = require("./prop-map.js");

var _propMapJs2 = _interopRequireDefault(_propMapJs);

exports["default"] = function (buoy, map, val, index) {
	if (val === "MM") {
		return;
	}
	var propName = map[index];
	if (_propMapJs2["default"][propName]) {
		propName = _propMapJs2["default"][propName];
	} else {
		return;
	}
	// all values are numbers.
	val = parseFloat(val);
	switch (propName) {
		case "year":
			buoy.date.setUTCFullYear(val);
			break;
		case "month":
			buoy.date.setUTCMonth(val - 1);
			break;
		case "day":
			buoy.date.setUTCDate(val);
			break;
		case "hour":
			buoy.date.setUTCHours(val);
			break;
		case "minute":
			buoy.date.setUTCMinutes(val);
			break;
		case "dominantPeriodWaveDirection":
			buoy[propName] = val;
			buoy.dominantPeriodWaveDirectionCompass = (0, _utilDegreesToDirection2["default"])(val);
			break;
		case "windDirection":
			buoy[propName] = val;
			buoy.windDirectionCompass = (0, _utilDegreesToDirection2["default"])(val);
			break;
		case "waveHeight":
			buoy[propName] = val;
			buoy[propName + "Feet"] = parseInt(val * 30.28084) / 10;
			break;
		case "longitude":
		case "latitude":
			buoy[propName] = parseFloat(val);
			break;
		default:
			if (!_lodash2["default"].isUndefined(val)) {
				buoy[propName] = val;
			}
			break;
	}
};

module.exports = exports["default"];

},{"./prop-map.js":9,"./util/degrees-to-direction":10,"lodash":2}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _parseBuoyProperties = require("./parse-buoy-properties");

var _parseBuoyProperties2 = _interopRequireDefault(_parseBuoyProperties);

var _parseLine = require("./parse-line");

var _parseLine2 = _interopRequireDefault(_parseLine);

/**
 * Data loaded from
 * http://www.ndbc.noaa.gov/data/latest_obs/latest_obs.txt
 * No json was available
 */

exports["default"] = function (list) {
	if (_lodash2["default"].isString(list)) {
		// create an array from the lines
		list = list.split("\n");
		// get the prop names, and remove STN, which we're using as the ID
		var propertyNames = _lodash2["default"].rest((0, _parseLine2["default"])(_lodash2["default"].first(list)));
		// pop off the first two lines of text, they're descriptions, not buoy data
		list = list.slice(2);
		// remove the last one, if it's empty
		if (_lodash2["default"].isEmpty(_lodash2["default"].last(list))) {
			list.pop();
		}
		var result = {};
		_lodash2["default"].each(list, function (row) {
			var record = (0, _parseLine2["default"])(row),
			    stationID = record.shift(),
			    buoy = result[stationID] = {
				stationID: stationID,
				date: new Date()
			};
			_lodash2["default"].each(record, _lodash2["default"].partial(_parseBuoyProperties2["default"], buoy, propertyNames));
		});
		return result;
	} else {
		throw "Invalid data for parse-data.js";
	}
};

module.exports = exports["default"];

},{"./parse-buoy-properties":4,"./parse-line":6,"lodash":2}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports["default"] = getArrayFromLine;

function getArrayFromLine(line) {
	return line.replace(/\s{2,}/g, " ").replace("#", "").split(" ");
}

module.exports = exports["default"];

},{}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _parseBuoyProperties = require("./parse-buoy-properties");

var _parseBuoyProperties2 = _interopRequireDefault(_parseBuoyProperties);

var _parseLine = require("./parse-line");

var _parseLine2 = _interopRequireDefault(_parseLine);

/**
 * Data loaded from
 * http://www.ndbc.noaa.gov/data/realtime2/{stationID}.txt
 * No json was available
 * returns an {Array} of records of buoy data
 */

exports["default"] = function (list) {
	var numberOfRecords = arguments[1] === undefined ? 10 : arguments[1];

	if (_lodash2["default"].isString(list)) {
		// create an array of lines
		list = list.split("\n");
		// get the prop names, and remove STN, which we're using as the ID
		var map = (0, _parseLine2["default"])(_lodash2["default"].first(list));
		// pop off the first two lines of text, they're descriptions, not buoy data
		list = list.slice(2);
		// remove the last one, if it's empty
		if (_lodash2["default"].isEmpty(_lodash2["default"].last(list))) {
			list.pop();
		}
		return _lodash2["default"].take(list, numberOfRecords).map(function (row) {
			var values = (0, _parseLine2["default"])(row),
			    buoy = {
				date: new Date()
			};
			// build the object by iterating through each column value
			_lodash2["default"].each(values, _lodash2["default"].partial(_parseBuoyProperties2["default"], buoy, map));
			buoy.date.setSeconds(0);
			buoy.date.setMilliseconds(0);
			return buoy;
		});
	} else {
		throw "Invalid data for parse-data.js";
	}
};

module.exports = exports["default"];

},{"./parse-buoy-properties":4,"./parse-line":6,"lodash":2}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _utilMetersToFeet = require("./util/meters-to-feet");

var _utilMetersToFeet2 = _interopRequireDefault(_utilMetersToFeet);

exports["default"] = {
	/**
  * return an array of {date, size}
  */
	parse: function parse(rawData) {
		return _lodash2["default"].rest(rawData.split("\n")).map(function (row) {
			var tide = row.split(","),
			   
			// the date is UTC, append GMT+0000 to indicate that
			formattedTime = tide[0].replace(/-/g, "/") + " GMT+0000";
			return {
				date: new Date(formattedTime),
				tideSize: parseFloat(tide[1])
			};
		});
	},
	/**
  * look through an array of {date, tideSize}
  */
	getCurrent: function getCurrent(data, forDate) {
		var matchDate = forDate || new Date(),
		    lastTide = {};
		return _lodash2["default"].find(data, function (tide) {
			if (!tide.date) {
				return false;
			}
			if (tide.date.getTime() > matchDate.getTime()) {
				tide.isIncreasing = tide.tideSize > lastTide.tideSize;
				tide.tideSizeFeet = (0, _utilMetersToFeet2["default"])(tide.tideSize);
				return true;
			}
			if (tide.tide !== lastTide.tide) {
				lastTide = tide;
			}
		});
	},
	/**
  * look through an array of {date, tideSize}
  */
	getNextHighOrLow: function getNextHighOrLow(data, forDate) {
		var matchDate = forDate || new Date(),
		    foundCurrent = undefined,
		    isIncreasing = undefined,
		    result = undefined,
		    lastTide = {};
		_lodash2["default"].some(data, function (tide) {
			var itemDate = new Date(tide.date);
			if (!itemDate) {
				return false;
			}
			if (foundCurrent) {
				// the tide is increasing
				// the current item is lower than the last
				// the last item was the high tide
				if (isIncreasing && tide.tideSize < lastTide.tideSize) {
					result = lastTide;
				} else if (!isIncreasing && tide.tideSize > lastTide.tideSize) {
					// tide is decreasing
					// the current tide is higher than the last
					// the last item was low tide
					result = lastTide;
				}
				if (result) {
					lastTide.isHighTide = isIncreasing;
					lastTide.tideSizeFeet = (0, _utilMetersToFeet2["default"])(lastTide.tideSize);
					return true;
				}
			}
			if (!foundCurrent && itemDate.getTime() > matchDate.getTime()) {
				// we found the current tide, is it increasing?
				isIncreasing = tide.tideSize > lastTide.tideSize;
				foundCurrent = true;
			}
			if (tide.tideSize !== lastTide.tideSize) {
				lastTide = tide;
			}
		});
		return result;
	}
};
module.exports = exports["default"];

},{"./util/meters-to-feet":12,"lodash":2}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports["default"] = {
	/**
  * Wind direction (the direction the wind is coming from in degrees clockwise from true N) during the same period used for WSPD. See Wind Averaging Methods
  */
	WDIR: "windDirection",
	/**
  * Wind speed (m/s) averaged over an eight-minute period for buoys and a two-minute period for land stations. Reported Hourly. See Wind Averaging Methods.
  */
	WSPD: "windSpeed",
	/**
  * Peak 5 or 8 second gust speed (m/s) measured during the eight-minute or two-minute period. The 5 or 8 second period can be determined by payload, See the Sensor Reporting, Sampling, and Accuracy section.
  */
	GST: "gustSpeed",
	/**
  * Significant wave height (meters) is calculated as the average of the highest one-third of all of the wave heights during the 20-minute sampling period. See the Wave Measurements section.
  */
	WVHT: "waveHeight",
	/**
  * Dominant wave period (seconds) is the period with the maximum wave energy. See the Wave Measurements section.
  */
	DPD: "wavePeriod",
	/**
  * Average wave period (seconds) of all waves during the 20-minute period. See the Wave Measurements section.
  */
	APD: "averageWavePeriod",
	/**
  * The direction from which the waves at the dominant period (DPD) are coming. The units are degrees from true North, increasing clockwise,
  * with North as 0 (zero) degrees and East as 90 degrees. See the Wave Measurements section.
  */
	MWD: "dominantPeriodWaveDirection",
	/**
  * Sea level pressure (hPa). For C-MAN sites and Great Lakes buoys,
  * the recorded pressure is reduced to sea level using the method described in
  * NWS Technical Procedures Bulletin 291 (11/14/80). ( labeled BAR in Historical files)
  */
	PRES: "pressure",
	/**
  * Air temperature (Celsius). For sensor heights on buoys, see Hull Descriptions.
  * For sensor heights at C-MAN stations, see C-MAN Sensor Locations
  */
	ATMP: "airTemp",
	/**
  * Sea surface temperature (Celsius). For sensor depth, see Hull Description.
  */
	WTMP: "waterTemp",
	/**
  * Dewpoint temperature taken at the same height as the air temperature measurement.
  */
	DEWP: "dewpointTemp",
	/**
  * Pressure Tendency is the direction (plus or minus) and the amount of pressure change (hPa)
  * for a three hour period ending at the time of observation. (not in Historical files)
  */
	PTDY: "pressureTendency",
	TIDE: "tide",
	LAT: "latitude",
	LON: "longitude",
	YYYY: "year",
	YY: "year",
	MM: "month",
	DD: "day",
	hh: "hour",
	mm: "minute"
};
module.exports = exports["default"];

},{}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports["default"] = function (degrees) {
	if (degrees >= 0 && degrees <= 11.25) {
		return "N";
	}
	if (degrees > 348.75 && degrees <= 360) {
		return "N";
	}
	if (degrees > 11.25 && degrees <= 33.75) {
		return "NNE";
	}
	if (degrees > 33.75 && degrees <= 56.25) {
		return "NE";
	}
	if (degrees > 56.25 && degrees <= 78.75) {
		return "ENE";
	}
	if (degrees > 78.75 && degrees <= 101.25) {
		return "E";
	}
	if (degrees > 101.25 && degrees <= 123.75) {
		return "ESE";
	}
	if (degrees > 123.75 && degrees <= 146.25) {
		return "SE";
	}
	if (degrees > 146.25 && degrees <= 168.75) {
		return "SSE";
	}
	if (degrees > 168.75 && degrees <= 191.25) {
		return "S";
	}
	if (degrees > 191.25 && degrees <= 213.75) {
		return "SSW";
	}
	if (degrees > 213.75 && degrees <= 236.25) {
		return "SW";
	}
	if (degrees > 236.25 && degrees <= 258.75) {
		return "WSW";
	}
	if (degrees > 258.75 && degrees <= 281.25) {
		return "W";
	}
	if (degrees > 281.25 && degrees <= 303.75) {
		return "WNW";
	}
	if (degrees > 303.75 && degrees <= 326.25) {
		return "NW";
	}
	if (degrees > 326.25 && degrees <= 348.75) {
		return "NNW";
	}
};

module.exports = exports["default"];

},{}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
   value: true
});

exports["default"] = function (date) {
   var d = date || new Date(),
       month = (d.getUTCMonth() + 1).toString(),
       day = d.getUTCDate().toString();
   if (month.length === 1) {
      month = "0" + month;
   }
   if (day.length === 1) {
      day = "0" + day;
   }
   return d.getUTCFullYear().toString() + month + day;
};

module.exports = exports["default"];

},{}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports["default"] = function (meters) {
	return parseInt(meters * 30.28084) / 10;
};

module.exports = exports["default"];

},{}]},{},[1])(1)
});