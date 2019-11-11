module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/extension.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/node-fetch/lib/index.mjs":
/*!***********************************************!*\
  !*** ./node_modules/node-fetch/lib/index.mjs ***!
  \***********************************************/
/*! exports provided: default, Headers, Request, Response, FetchError */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Headers", function() { return Headers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Request", function() { return Request; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Response", function() { return Response; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FetchError", function() { return FetchError; });
/* harmony import */ var stream__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! stream */ "stream");
/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! http */ "http");
/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! url */ "url");
/* harmony import */ var https__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! https */ "https");
/* harmony import */ var zlib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! zlib */ "zlib");






// Based on https://github.com/tmpvar/jsdom/blob/aa85b2abf07766ff7bf5c1f6daafb3726f2f2db5/lib/jsdom/living/blob.js

// fix for "Readable" isn't a named export issue
const Readable = stream__WEBPACK_IMPORTED_MODULE_0__.Readable;

const BUFFER = Symbol('buffer');
const TYPE = Symbol('type');

class Blob {
	constructor() {
		this[TYPE] = '';

		const blobParts = arguments[0];
		const options = arguments[1];

		const buffers = [];
		let size = 0;

		if (blobParts) {
			const a = blobParts;
			const length = Number(a.length);
			for (let i = 0; i < length; i++) {
				const element = a[i];
				let buffer;
				if (element instanceof Buffer) {
					buffer = element;
				} else if (ArrayBuffer.isView(element)) {
					buffer = Buffer.from(element.buffer, element.byteOffset, element.byteLength);
				} else if (element instanceof ArrayBuffer) {
					buffer = Buffer.from(element);
				} else if (element instanceof Blob) {
					buffer = element[BUFFER];
				} else {
					buffer = Buffer.from(typeof element === 'string' ? element : String(element));
				}
				size += buffer.length;
				buffers.push(buffer);
			}
		}

		this[BUFFER] = Buffer.concat(buffers);

		let type = options && options.type !== undefined && String(options.type).toLowerCase();
		if (type && !/[^\u0020-\u007E]/.test(type)) {
			this[TYPE] = type;
		}
	}
	get size() {
		return this[BUFFER].length;
	}
	get type() {
		return this[TYPE];
	}
	text() {
		return Promise.resolve(this[BUFFER].toString());
	}
	arrayBuffer() {
		const buf = this[BUFFER];
		const ab = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
		return Promise.resolve(ab);
	}
	stream() {
		const readable = new Readable();
		readable._read = function () {};
		readable.push(this[BUFFER]);
		readable.push(null);
		return readable;
	}
	toString() {
		return '[object Blob]';
	}
	slice() {
		const size = this.size;

		const start = arguments[0];
		const end = arguments[1];
		let relativeStart, relativeEnd;
		if (start === undefined) {
			relativeStart = 0;
		} else if (start < 0) {
			relativeStart = Math.max(size + start, 0);
		} else {
			relativeStart = Math.min(start, size);
		}
		if (end === undefined) {
			relativeEnd = size;
		} else if (end < 0) {
			relativeEnd = Math.max(size + end, 0);
		} else {
			relativeEnd = Math.min(end, size);
		}
		const span = Math.max(relativeEnd - relativeStart, 0);

		const buffer = this[BUFFER];
		const slicedBuffer = buffer.slice(relativeStart, relativeStart + span);
		const blob = new Blob([], { type: arguments[2] });
		blob[BUFFER] = slicedBuffer;
		return blob;
	}
}

Object.defineProperties(Blob.prototype, {
	size: { enumerable: true },
	type: { enumerable: true },
	slice: { enumerable: true }
});

Object.defineProperty(Blob.prototype, Symbol.toStringTag, {
	value: 'Blob',
	writable: false,
	enumerable: false,
	configurable: true
});

/**
 * fetch-error.js
 *
 * FetchError interface for operational errors
 */

/**
 * Create FetchError instance
 *
 * @param   String      message      Error message for human
 * @param   String      type         Error type for machine
 * @param   String      systemError  For Node.js system error
 * @return  FetchError
 */
function FetchError(message, type, systemError) {
  Error.call(this, message);

  this.message = message;
  this.type = type;

  // when err.type is `system`, err.code contains system error code
  if (systemError) {
    this.code = this.errno = systemError.code;
  }

  // hide custom error implementation details from end-users
  Error.captureStackTrace(this, this.constructor);
}

FetchError.prototype = Object.create(Error.prototype);
FetchError.prototype.constructor = FetchError;
FetchError.prototype.name = 'FetchError';

let convert;
try {
	convert = require('encoding').convert;
} catch (e) {}

const INTERNALS = Symbol('Body internals');

// fix an issue where "PassThrough" isn't a named export for node <10
const PassThrough = stream__WEBPACK_IMPORTED_MODULE_0__.PassThrough;

/**
 * Body mixin
 *
 * Ref: https://fetch.spec.whatwg.org/#body
 *
 * @param   Stream  body  Readable stream
 * @param   Object  opts  Response options
 * @return  Void
 */
function Body(body) {
	var _this = this;

	var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
	    _ref$size = _ref.size;

	let size = _ref$size === undefined ? 0 : _ref$size;
	var _ref$timeout = _ref.timeout;
	let timeout = _ref$timeout === undefined ? 0 : _ref$timeout;

	if (body == null) {
		// body is undefined or null
		body = null;
	} else if (isURLSearchParams(body)) {
		// body is a URLSearchParams
		body = Buffer.from(body.toString());
	} else if (isBlob(body)) ; else if (Buffer.isBuffer(body)) ; else if (Object.prototype.toString.call(body) === '[object ArrayBuffer]') {
		// body is ArrayBuffer
		body = Buffer.from(body);
	} else if (ArrayBuffer.isView(body)) {
		// body is ArrayBufferView
		body = Buffer.from(body.buffer, body.byteOffset, body.byteLength);
	} else if (body instanceof stream__WEBPACK_IMPORTED_MODULE_0__) ; else {
		// none of the above
		// coerce to string then buffer
		body = Buffer.from(String(body));
	}
	this[INTERNALS] = {
		body,
		disturbed: false,
		error: null
	};
	this.size = size;
	this.timeout = timeout;

	if (body instanceof stream__WEBPACK_IMPORTED_MODULE_0__) {
		body.on('error', function (err) {
			const error = err.name === 'AbortError' ? err : new FetchError(`Invalid response body while trying to fetch ${_this.url}: ${err.message}`, 'system', err);
			_this[INTERNALS].error = error;
		});
	}
}

Body.prototype = {
	get body() {
		return this[INTERNALS].body;
	},

	get bodyUsed() {
		return this[INTERNALS].disturbed;
	},

	/**
  * Decode response as ArrayBuffer
  *
  * @return  Promise
  */
	arrayBuffer() {
		return consumeBody.call(this).then(function (buf) {
			return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
		});
	},

	/**
  * Return raw response as Blob
  *
  * @return Promise
  */
	blob() {
		let ct = this.headers && this.headers.get('content-type') || '';
		return consumeBody.call(this).then(function (buf) {
			return Object.assign(
			// Prevent copying
			new Blob([], {
				type: ct.toLowerCase()
			}), {
				[BUFFER]: buf
			});
		});
	},

	/**
  * Decode response as json
  *
  * @return  Promise
  */
	json() {
		var _this2 = this;

		return consumeBody.call(this).then(function (buffer) {
			try {
				return JSON.parse(buffer.toString());
			} catch (err) {
				return Body.Promise.reject(new FetchError(`invalid json response body at ${_this2.url} reason: ${err.message}`, 'invalid-json'));
			}
		});
	},

	/**
  * Decode response as text
  *
  * @return  Promise
  */
	text() {
		return consumeBody.call(this).then(function (buffer) {
			return buffer.toString();
		});
	},

	/**
  * Decode response as buffer (non-spec api)
  *
  * @return  Promise
  */
	buffer() {
		return consumeBody.call(this);
	},

	/**
  * Decode response as text, while automatically detecting the encoding and
  * trying to decode to UTF-8 (non-spec api)
  *
  * @return  Promise
  */
	textConverted() {
		var _this3 = this;

		return consumeBody.call(this).then(function (buffer) {
			return convertBody(buffer, _this3.headers);
		});
	}
};

// In browsers, all properties are enumerable.
Object.defineProperties(Body.prototype, {
	body: { enumerable: true },
	bodyUsed: { enumerable: true },
	arrayBuffer: { enumerable: true },
	blob: { enumerable: true },
	json: { enumerable: true },
	text: { enumerable: true }
});

Body.mixIn = function (proto) {
	for (const name of Object.getOwnPropertyNames(Body.prototype)) {
		// istanbul ignore else: future proof
		if (!(name in proto)) {
			const desc = Object.getOwnPropertyDescriptor(Body.prototype, name);
			Object.defineProperty(proto, name, desc);
		}
	}
};

/**
 * Consume and convert an entire Body to a Buffer.
 *
 * Ref: https://fetch.spec.whatwg.org/#concept-body-consume-body
 *
 * @return  Promise
 */
function consumeBody() {
	var _this4 = this;

	if (this[INTERNALS].disturbed) {
		return Body.Promise.reject(new TypeError(`body used already for: ${this.url}`));
	}

	this[INTERNALS].disturbed = true;

	if (this[INTERNALS].error) {
		return Body.Promise.reject(this[INTERNALS].error);
	}

	let body = this.body;

	// body is null
	if (body === null) {
		return Body.Promise.resolve(Buffer.alloc(0));
	}

	// body is blob
	if (isBlob(body)) {
		body = body.stream();
	}

	// body is buffer
	if (Buffer.isBuffer(body)) {
		return Body.Promise.resolve(body);
	}

	// istanbul ignore if: should never happen
	if (!(body instanceof stream__WEBPACK_IMPORTED_MODULE_0__)) {
		return Body.Promise.resolve(Buffer.alloc(0));
	}

	// body is stream
	// get ready to actually consume the body
	let accum = [];
	let accumBytes = 0;
	let abort = false;

	return new Body.Promise(function (resolve, reject) {
		let resTimeout;

		// allow timeout on slow response body
		if (_this4.timeout) {
			resTimeout = setTimeout(function () {
				abort = true;
				reject(new FetchError(`Response timeout while trying to fetch ${_this4.url} (over ${_this4.timeout}ms)`, 'body-timeout'));
			}, _this4.timeout);
		}

		// handle stream errors
		body.on('error', function (err) {
			if (err.name === 'AbortError') {
				// if the request was aborted, reject with this Error
				abort = true;
				reject(err);
			} else {
				// other errors, such as incorrect content-encoding
				reject(new FetchError(`Invalid response body while trying to fetch ${_this4.url}: ${err.message}`, 'system', err));
			}
		});

		body.on('data', function (chunk) {
			if (abort || chunk === null) {
				return;
			}

			if (_this4.size && accumBytes + chunk.length > _this4.size) {
				abort = true;
				reject(new FetchError(`content size at ${_this4.url} over limit: ${_this4.size}`, 'max-size'));
				return;
			}

			accumBytes += chunk.length;
			accum.push(chunk);
		});

		body.on('end', function () {
			if (abort) {
				return;
			}

			clearTimeout(resTimeout);

			try {
				resolve(Buffer.concat(accum, accumBytes));
			} catch (err) {
				// handle streams that have accumulated too much data (issue #414)
				reject(new FetchError(`Could not create Buffer from response body for ${_this4.url}: ${err.message}`, 'system', err));
			}
		});
	});
}

/**
 * Detect buffer encoding and convert to target encoding
 * ref: http://www.w3.org/TR/2011/WD-html5-20110113/parsing.html#determining-the-character-encoding
 *
 * @param   Buffer  buffer    Incoming buffer
 * @param   String  encoding  Target encoding
 * @return  String
 */
function convertBody(buffer, headers) {
	if (typeof convert !== 'function') {
		throw new Error('The package `encoding` must be installed to use the textConverted() function');
	}

	const ct = headers.get('content-type');
	let charset = 'utf-8';
	let res, str;

	// header
	if (ct) {
		res = /charset=([^;]*)/i.exec(ct);
	}

	// no charset in content type, peek at response body for at most 1024 bytes
	str = buffer.slice(0, 1024).toString();

	// html5
	if (!res && str) {
		res = /<meta.+?charset=(['"])(.+?)\1/i.exec(str);
	}

	// html4
	if (!res && str) {
		res = /<meta[\s]+?http-equiv=(['"])content-type\1[\s]+?content=(['"])(.+?)\2/i.exec(str);

		if (res) {
			res = /charset=(.*)/i.exec(res.pop());
		}
	}

	// xml
	if (!res && str) {
		res = /<\?xml.+?encoding=(['"])(.+?)\1/i.exec(str);
	}

	// found charset
	if (res) {
		charset = res.pop();

		// prevent decode issues when sites use incorrect encoding
		// ref: https://hsivonen.fi/encoding-menu/
		if (charset === 'gb2312' || charset === 'gbk') {
			charset = 'gb18030';
		}
	}

	// turn raw buffers into a single utf-8 buffer
	return convert(buffer, 'UTF-8', charset).toString();
}

/**
 * Detect a URLSearchParams object
 * ref: https://github.com/bitinn/node-fetch/issues/296#issuecomment-307598143
 *
 * @param   Object  obj     Object to detect by type or brand
 * @return  String
 */
function isURLSearchParams(obj) {
	// Duck-typing as a necessary condition.
	if (typeof obj !== 'object' || typeof obj.append !== 'function' || typeof obj.delete !== 'function' || typeof obj.get !== 'function' || typeof obj.getAll !== 'function' || typeof obj.has !== 'function' || typeof obj.set !== 'function') {
		return false;
	}

	// Brand-checking and more duck-typing as optional condition.
	return obj.constructor.name === 'URLSearchParams' || Object.prototype.toString.call(obj) === '[object URLSearchParams]' || typeof obj.sort === 'function';
}

/**
 * Check if `obj` is a W3C `Blob` object (which `File` inherits from)
 * @param  {*} obj
 * @return {boolean}
 */
function isBlob(obj) {
	return typeof obj === 'object' && typeof obj.arrayBuffer === 'function' && typeof obj.type === 'string' && typeof obj.stream === 'function' && typeof obj.constructor === 'function' && typeof obj.constructor.name === 'string' && /^(Blob|File)$/.test(obj.constructor.name) && /^(Blob|File)$/.test(obj[Symbol.toStringTag]);
}

/**
 * Clone body given Res/Req instance
 *
 * @param   Mixed  instance  Response or Request instance
 * @return  Mixed
 */
function clone(instance) {
	let p1, p2;
	let body = instance.body;

	// don't allow cloning a used body
	if (instance.bodyUsed) {
		throw new Error('cannot clone body after it is used');
	}

	// check that body is a stream and not form-data object
	// note: we can't clone the form-data object without having it as a dependency
	if (body instanceof stream__WEBPACK_IMPORTED_MODULE_0__ && typeof body.getBoundary !== 'function') {
		// tee instance body
		p1 = new PassThrough();
		p2 = new PassThrough();
		body.pipe(p1);
		body.pipe(p2);
		// set instance body to teed body and return the other teed body
		instance[INTERNALS].body = p1;
		body = p2;
	}

	return body;
}

/**
 * Performs the operation "extract a `Content-Type` value from |object|" as
 * specified in the specification:
 * https://fetch.spec.whatwg.org/#concept-bodyinit-extract
 *
 * This function assumes that instance.body is present.
 *
 * @param   Mixed  instance  Any options.body input
 */
function extractContentType(body) {
	if (body === null) {
		// body is null
		return null;
	} else if (typeof body === 'string') {
		// body is string
		return 'text/plain;charset=UTF-8';
	} else if (isURLSearchParams(body)) {
		// body is a URLSearchParams
		return 'application/x-www-form-urlencoded;charset=UTF-8';
	} else if (isBlob(body)) {
		// body is blob
		return body.type || null;
	} else if (Buffer.isBuffer(body)) {
		// body is buffer
		return null;
	} else if (Object.prototype.toString.call(body) === '[object ArrayBuffer]') {
		// body is ArrayBuffer
		return null;
	} else if (ArrayBuffer.isView(body)) {
		// body is ArrayBufferView
		return null;
	} else if (typeof body.getBoundary === 'function') {
		// detect form data input from form-data module
		return `multipart/form-data;boundary=${body.getBoundary()}`;
	} else if (body instanceof stream__WEBPACK_IMPORTED_MODULE_0__) {
		// body is stream
		// can't really do much about this
		return null;
	} else {
		// Body constructor defaults other things to string
		return 'text/plain;charset=UTF-8';
	}
}

/**
 * The Fetch Standard treats this as if "total bytes" is a property on the body.
 * For us, we have to explicitly get it with a function.
 *
 * ref: https://fetch.spec.whatwg.org/#concept-body-total-bytes
 *
 * @param   Body    instance   Instance of Body
 * @return  Number?            Number of bytes, or null if not possible
 */
function getTotalBytes(instance) {
	const body = instance.body;


	if (body === null) {
		// body is null
		return 0;
	} else if (isBlob(body)) {
		return body.size;
	} else if (Buffer.isBuffer(body)) {
		// body is buffer
		return body.length;
	} else if (body && typeof body.getLengthSync === 'function') {
		// detect form data input from form-data module
		if (body._lengthRetrievers && body._lengthRetrievers.length == 0 || // 1.x
		body.hasKnownLength && body.hasKnownLength()) {
			// 2.x
			return body.getLengthSync();
		}
		return null;
	} else {
		// body is stream
		return null;
	}
}

/**
 * Write a Body to a Node.js WritableStream (e.g. http.Request) object.
 *
 * @param   Body    instance   Instance of Body
 * @return  Void
 */
function writeToStream(dest, instance) {
	const body = instance.body;


	if (body === null) {
		// body is null
		dest.end();
	} else if (isBlob(body)) {
		body.stream().pipe(dest);
	} else if (Buffer.isBuffer(body)) {
		// body is buffer
		dest.write(body);
		dest.end();
	} else {
		// body is stream
		body.pipe(dest);
	}
}

// expose Promise
Body.Promise = global.Promise;

/**
 * headers.js
 *
 * Headers class offers convenient helpers
 */

const invalidTokenRegex = /[^\^_`a-zA-Z\-0-9!#$%&'*+.|~]/;
const invalidHeaderCharRegex = /[^\t\x20-\x7e\x80-\xff]/;

function validateName(name) {
	name = `${name}`;
	if (invalidTokenRegex.test(name) || name === '') {
		throw new TypeError(`${name} is not a legal HTTP header name`);
	}
}

function validateValue(value) {
	value = `${value}`;
	if (invalidHeaderCharRegex.test(value)) {
		throw new TypeError(`${value} is not a legal HTTP header value`);
	}
}

/**
 * Find the key in the map object given a header name.
 *
 * Returns undefined if not found.
 *
 * @param   String  name  Header name
 * @return  String|Undefined
 */
function find(map, name) {
	name = name.toLowerCase();
	for (const key in map) {
		if (key.toLowerCase() === name) {
			return key;
		}
	}
	return undefined;
}

const MAP = Symbol('map');
class Headers {
	/**
  * Headers class
  *
  * @param   Object  headers  Response headers
  * @return  Void
  */
	constructor() {
		let init = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;

		this[MAP] = Object.create(null);

		if (init instanceof Headers) {
			const rawHeaders = init.raw();
			const headerNames = Object.keys(rawHeaders);

			for (const headerName of headerNames) {
				for (const value of rawHeaders[headerName]) {
					this.append(headerName, value);
				}
			}

			return;
		}

		// We don't worry about converting prop to ByteString here as append()
		// will handle it.
		if (init == null) ; else if (typeof init === 'object') {
			const method = init[Symbol.iterator];
			if (method != null) {
				if (typeof method !== 'function') {
					throw new TypeError('Header pairs must be iterable');
				}

				// sequence<sequence<ByteString>>
				// Note: per spec we have to first exhaust the lists then process them
				const pairs = [];
				for (const pair of init) {
					if (typeof pair !== 'object' || typeof pair[Symbol.iterator] !== 'function') {
						throw new TypeError('Each header pair must be iterable');
					}
					pairs.push(Array.from(pair));
				}

				for (const pair of pairs) {
					if (pair.length !== 2) {
						throw new TypeError('Each header pair must be a name/value tuple');
					}
					this.append(pair[0], pair[1]);
				}
			} else {
				// record<ByteString, ByteString>
				for (const key of Object.keys(init)) {
					const value = init[key];
					this.append(key, value);
				}
			}
		} else {
			throw new TypeError('Provided initializer must be an object');
		}
	}

	/**
  * Return combined header value given name
  *
  * @param   String  name  Header name
  * @return  Mixed
  */
	get(name) {
		name = `${name}`;
		validateName(name);
		const key = find(this[MAP], name);
		if (key === undefined) {
			return null;
		}

		return this[MAP][key].join(', ');
	}

	/**
  * Iterate over all headers
  *
  * @param   Function  callback  Executed for each item with parameters (value, name, thisArg)
  * @param   Boolean   thisArg   `this` context for callback function
  * @return  Void
  */
	forEach(callback) {
		let thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

		let pairs = getHeaders(this);
		let i = 0;
		while (i < pairs.length) {
			var _pairs$i = pairs[i];
			const name = _pairs$i[0],
			      value = _pairs$i[1];

			callback.call(thisArg, value, name, this);
			pairs = getHeaders(this);
			i++;
		}
	}

	/**
  * Overwrite header values given name
  *
  * @param   String  name   Header name
  * @param   String  value  Header value
  * @return  Void
  */
	set(name, value) {
		name = `${name}`;
		value = `${value}`;
		validateName(name);
		validateValue(value);
		const key = find(this[MAP], name);
		this[MAP][key !== undefined ? key : name] = [value];
	}

	/**
  * Append a value onto existing header
  *
  * @param   String  name   Header name
  * @param   String  value  Header value
  * @return  Void
  */
	append(name, value) {
		name = `${name}`;
		value = `${value}`;
		validateName(name);
		validateValue(value);
		const key = find(this[MAP], name);
		if (key !== undefined) {
			this[MAP][key].push(value);
		} else {
			this[MAP][name] = [value];
		}
	}

	/**
  * Check for header name existence
  *
  * @param   String   name  Header name
  * @return  Boolean
  */
	has(name) {
		name = `${name}`;
		validateName(name);
		return find(this[MAP], name) !== undefined;
	}

	/**
  * Delete all header values given name
  *
  * @param   String  name  Header name
  * @return  Void
  */
	delete(name) {
		name = `${name}`;
		validateName(name);
		const key = find(this[MAP], name);
		if (key !== undefined) {
			delete this[MAP][key];
		}
	}

	/**
  * Return raw headers (non-spec api)
  *
  * @return  Object
  */
	raw() {
		return this[MAP];
	}

	/**
  * Get an iterator on keys.
  *
  * @return  Iterator
  */
	keys() {
		return createHeadersIterator(this, 'key');
	}

	/**
  * Get an iterator on values.
  *
  * @return  Iterator
  */
	values() {
		return createHeadersIterator(this, 'value');
	}

	/**
  * Get an iterator on entries.
  *
  * This is the default iterator of the Headers object.
  *
  * @return  Iterator
  */
	[Symbol.iterator]() {
		return createHeadersIterator(this, 'key+value');
	}
}
Headers.prototype.entries = Headers.prototype[Symbol.iterator];

Object.defineProperty(Headers.prototype, Symbol.toStringTag, {
	value: 'Headers',
	writable: false,
	enumerable: false,
	configurable: true
});

Object.defineProperties(Headers.prototype, {
	get: { enumerable: true },
	forEach: { enumerable: true },
	set: { enumerable: true },
	append: { enumerable: true },
	has: { enumerable: true },
	delete: { enumerable: true },
	keys: { enumerable: true },
	values: { enumerable: true },
	entries: { enumerable: true }
});

function getHeaders(headers) {
	let kind = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'key+value';

	const keys = Object.keys(headers[MAP]).sort();
	return keys.map(kind === 'key' ? function (k) {
		return k.toLowerCase();
	} : kind === 'value' ? function (k) {
		return headers[MAP][k].join(', ');
	} : function (k) {
		return [k.toLowerCase(), headers[MAP][k].join(', ')];
	});
}

const INTERNAL = Symbol('internal');

function createHeadersIterator(target, kind) {
	const iterator = Object.create(HeadersIteratorPrototype);
	iterator[INTERNAL] = {
		target,
		kind,
		index: 0
	};
	return iterator;
}

const HeadersIteratorPrototype = Object.setPrototypeOf({
	next() {
		// istanbul ignore if
		if (!this || Object.getPrototypeOf(this) !== HeadersIteratorPrototype) {
			throw new TypeError('Value of `this` is not a HeadersIterator');
		}

		var _INTERNAL = this[INTERNAL];
		const target = _INTERNAL.target,
		      kind = _INTERNAL.kind,
		      index = _INTERNAL.index;

		const values = getHeaders(target, kind);
		const len = values.length;
		if (index >= len) {
			return {
				value: undefined,
				done: true
			};
		}

		this[INTERNAL].index = index + 1;

		return {
			value: values[index],
			done: false
		};
	}
}, Object.getPrototypeOf(Object.getPrototypeOf([][Symbol.iterator]())));

Object.defineProperty(HeadersIteratorPrototype, Symbol.toStringTag, {
	value: 'HeadersIterator',
	writable: false,
	enumerable: false,
	configurable: true
});

/**
 * Export the Headers object in a form that Node.js can consume.
 *
 * @param   Headers  headers
 * @return  Object
 */
function exportNodeCompatibleHeaders(headers) {
	const obj = Object.assign({ __proto__: null }, headers[MAP]);

	// http.request() only supports string as Host header. This hack makes
	// specifying custom Host header possible.
	const hostHeaderKey = find(headers[MAP], 'Host');
	if (hostHeaderKey !== undefined) {
		obj[hostHeaderKey] = obj[hostHeaderKey][0];
	}

	return obj;
}

/**
 * Create a Headers object from an object of headers, ignoring those that do
 * not conform to HTTP grammar productions.
 *
 * @param   Object  obj  Object of headers
 * @return  Headers
 */
function createHeadersLenient(obj) {
	const headers = new Headers();
	for (const name of Object.keys(obj)) {
		if (invalidTokenRegex.test(name)) {
			continue;
		}
		if (Array.isArray(obj[name])) {
			for (const val of obj[name]) {
				if (invalidHeaderCharRegex.test(val)) {
					continue;
				}
				if (headers[MAP][name] === undefined) {
					headers[MAP][name] = [val];
				} else {
					headers[MAP][name].push(val);
				}
			}
		} else if (!invalidHeaderCharRegex.test(obj[name])) {
			headers[MAP][name] = [obj[name]];
		}
	}
	return headers;
}

const INTERNALS$1 = Symbol('Response internals');

// fix an issue where "STATUS_CODES" aren't a named export for node <10
const STATUS_CODES = http__WEBPACK_IMPORTED_MODULE_1__.STATUS_CODES;

/**
 * Response class
 *
 * @param   Stream  body  Readable stream
 * @param   Object  opts  Response options
 * @return  Void
 */
class Response {
	constructor() {
		let body = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
		let opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

		Body.call(this, body, opts);

		const status = opts.status || 200;
		const headers = new Headers(opts.headers);

		if (body != null && !headers.has('Content-Type')) {
			const contentType = extractContentType(body);
			if (contentType) {
				headers.append('Content-Type', contentType);
			}
		}

		this[INTERNALS$1] = {
			url: opts.url,
			status,
			statusText: opts.statusText || STATUS_CODES[status],
			headers,
			counter: opts.counter
		};
	}

	get url() {
		return this[INTERNALS$1].url || '';
	}

	get status() {
		return this[INTERNALS$1].status;
	}

	/**
  * Convenience property representing if the request ended normally
  */
	get ok() {
		return this[INTERNALS$1].status >= 200 && this[INTERNALS$1].status < 300;
	}

	get redirected() {
		return this[INTERNALS$1].counter > 0;
	}

	get statusText() {
		return this[INTERNALS$1].statusText;
	}

	get headers() {
		return this[INTERNALS$1].headers;
	}

	/**
  * Clone this response
  *
  * @return  Response
  */
	clone() {
		return new Response(clone(this), {
			url: this.url,
			status: this.status,
			statusText: this.statusText,
			headers: this.headers,
			ok: this.ok,
			redirected: this.redirected
		});
	}
}

Body.mixIn(Response.prototype);

Object.defineProperties(Response.prototype, {
	url: { enumerable: true },
	status: { enumerable: true },
	ok: { enumerable: true },
	redirected: { enumerable: true },
	statusText: { enumerable: true },
	headers: { enumerable: true },
	clone: { enumerable: true }
});

Object.defineProperty(Response.prototype, Symbol.toStringTag, {
	value: 'Response',
	writable: false,
	enumerable: false,
	configurable: true
});

const INTERNALS$2 = Symbol('Request internals');

// fix an issue where "format", "parse" aren't a named export for node <10
const parse_url = url__WEBPACK_IMPORTED_MODULE_2__.parse;
const format_url = url__WEBPACK_IMPORTED_MODULE_2__.format;

const streamDestructionSupported = 'destroy' in stream__WEBPACK_IMPORTED_MODULE_0__.Readable.prototype;

/**
 * Check if a value is an instance of Request.
 *
 * @param   Mixed   input
 * @return  Boolean
 */
function isRequest(input) {
	return typeof input === 'object' && typeof input[INTERNALS$2] === 'object';
}

function isAbortSignal(signal) {
	const proto = signal && typeof signal === 'object' && Object.getPrototypeOf(signal);
	return !!(proto && proto.constructor.name === 'AbortSignal');
}

/**
 * Request class
 *
 * @param   Mixed   input  Url or Request instance
 * @param   Object  init   Custom options
 * @return  Void
 */
class Request {
	constructor(input) {
		let init = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

		let parsedURL;

		// normalize input
		if (!isRequest(input)) {
			if (input && input.href) {
				// in order to support Node.js' Url objects; though WHATWG's URL objects
				// will fall into this branch also (since their `toString()` will return
				// `href` property anyway)
				parsedURL = parse_url(input.href);
			} else {
				// coerce input to a string before attempting to parse
				parsedURL = parse_url(`${input}`);
			}
			input = {};
		} else {
			parsedURL = parse_url(input.url);
		}

		let method = init.method || input.method || 'GET';
		method = method.toUpperCase();

		if ((init.body != null || isRequest(input) && input.body !== null) && (method === 'GET' || method === 'HEAD')) {
			throw new TypeError('Request with GET/HEAD method cannot have body');
		}

		let inputBody = init.body != null ? init.body : isRequest(input) && input.body !== null ? clone(input) : null;

		Body.call(this, inputBody, {
			timeout: init.timeout || input.timeout || 0,
			size: init.size || input.size || 0
		});

		const headers = new Headers(init.headers || input.headers || {});

		if (inputBody != null && !headers.has('Content-Type')) {
			const contentType = extractContentType(inputBody);
			if (contentType) {
				headers.append('Content-Type', contentType);
			}
		}

		let signal = isRequest(input) ? input.signal : null;
		if ('signal' in init) signal = init.signal;

		if (signal != null && !isAbortSignal(signal)) {
			throw new TypeError('Expected signal to be an instanceof AbortSignal');
		}

		this[INTERNALS$2] = {
			method,
			redirect: init.redirect || input.redirect || 'follow',
			headers,
			parsedURL,
			signal
		};

		// node-fetch-only options
		this.follow = init.follow !== undefined ? init.follow : input.follow !== undefined ? input.follow : 20;
		this.compress = init.compress !== undefined ? init.compress : input.compress !== undefined ? input.compress : true;
		this.counter = init.counter || input.counter || 0;
		this.agent = init.agent || input.agent;
	}

	get method() {
		return this[INTERNALS$2].method;
	}

	get url() {
		return format_url(this[INTERNALS$2].parsedURL);
	}

	get headers() {
		return this[INTERNALS$2].headers;
	}

	get redirect() {
		return this[INTERNALS$2].redirect;
	}

	get signal() {
		return this[INTERNALS$2].signal;
	}

	/**
  * Clone this request
  *
  * @return  Request
  */
	clone() {
		return new Request(this);
	}
}

Body.mixIn(Request.prototype);

Object.defineProperty(Request.prototype, Symbol.toStringTag, {
	value: 'Request',
	writable: false,
	enumerable: false,
	configurable: true
});

Object.defineProperties(Request.prototype, {
	method: { enumerable: true },
	url: { enumerable: true },
	headers: { enumerable: true },
	redirect: { enumerable: true },
	clone: { enumerable: true },
	signal: { enumerable: true }
});

/**
 * Convert a Request to Node.js http request options.
 *
 * @param   Request  A Request instance
 * @return  Object   The options object to be passed to http.request
 */
function getNodeRequestOptions(request) {
	const parsedURL = request[INTERNALS$2].parsedURL;
	const headers = new Headers(request[INTERNALS$2].headers);

	// fetch step 1.3
	if (!headers.has('Accept')) {
		headers.set('Accept', '*/*');
	}

	// Basic fetch
	if (!parsedURL.protocol || !parsedURL.hostname) {
		throw new TypeError('Only absolute URLs are supported');
	}

	if (!/^https?:$/.test(parsedURL.protocol)) {
		throw new TypeError('Only HTTP(S) protocols are supported');
	}

	if (request.signal && request.body instanceof stream__WEBPACK_IMPORTED_MODULE_0__.Readable && !streamDestructionSupported) {
		throw new Error('Cancellation of streamed requests with AbortSignal is not supported in node < 8');
	}

	// HTTP-network-or-cache fetch steps 2.4-2.7
	let contentLengthValue = null;
	if (request.body == null && /^(POST|PUT)$/i.test(request.method)) {
		contentLengthValue = '0';
	}
	if (request.body != null) {
		const totalBytes = getTotalBytes(request);
		if (typeof totalBytes === 'number') {
			contentLengthValue = String(totalBytes);
		}
	}
	if (contentLengthValue) {
		headers.set('Content-Length', contentLengthValue);
	}

	// HTTP-network-or-cache fetch step 2.11
	if (!headers.has('User-Agent')) {
		headers.set('User-Agent', 'node-fetch/1.0 (+https://github.com/bitinn/node-fetch)');
	}

	// HTTP-network-or-cache fetch step 2.15
	if (request.compress && !headers.has('Accept-Encoding')) {
		headers.set('Accept-Encoding', 'gzip,deflate');
	}

	let agent = request.agent;
	if (typeof agent === 'function') {
		agent = agent(parsedURL);
	}

	if (!headers.has('Connection') && !agent) {
		headers.set('Connection', 'close');
	}

	// HTTP-network fetch step 4.2
	// chunked encoding is handled by Node.js

	return Object.assign({}, parsedURL, {
		method: request.method,
		headers: exportNodeCompatibleHeaders(headers),
		agent
	});
}

/**
 * abort-error.js
 *
 * AbortError interface for cancelled requests
 */

/**
 * Create AbortError instance
 *
 * @param   String      message      Error message for human
 * @return  AbortError
 */
function AbortError(message) {
  Error.call(this, message);

  this.type = 'aborted';
  this.message = message;

  // hide custom error implementation details from end-users
  Error.captureStackTrace(this, this.constructor);
}

AbortError.prototype = Object.create(Error.prototype);
AbortError.prototype.constructor = AbortError;
AbortError.prototype.name = 'AbortError';

// fix an issue where "PassThrough", "resolve" aren't a named export for node <10
const PassThrough$1 = stream__WEBPACK_IMPORTED_MODULE_0__.PassThrough;
const resolve_url = url__WEBPACK_IMPORTED_MODULE_2__.resolve;

/**
 * Fetch function
 *
 * @param   Mixed    url   Absolute url or Request instance
 * @param   Object   opts  Fetch options
 * @return  Promise
 */
function fetch(url, opts) {

	// allow custom promise
	if (!fetch.Promise) {
		throw new Error('native promise missing, set fetch.Promise to your favorite alternative');
	}

	Body.Promise = fetch.Promise;

	// wrap http.request into fetch
	return new fetch.Promise(function (resolve, reject) {
		// build request object
		const request = new Request(url, opts);
		const options = getNodeRequestOptions(request);

		const send = (options.protocol === 'https:' ? https__WEBPACK_IMPORTED_MODULE_3__ : http__WEBPACK_IMPORTED_MODULE_1__).request;
		const signal = request.signal;

		let response = null;

		const abort = function abort() {
			let error = new AbortError('The user aborted a request.');
			reject(error);
			if (request.body && request.body instanceof stream__WEBPACK_IMPORTED_MODULE_0__.Readable) {
				request.body.destroy(error);
			}
			if (!response || !response.body) return;
			response.body.emit('error', error);
		};

		if (signal && signal.aborted) {
			abort();
			return;
		}

		const abortAndFinalize = function abortAndFinalize() {
			abort();
			finalize();
		};

		// send request
		const req = send(options);
		let reqTimeout;

		if (signal) {
			signal.addEventListener('abort', abortAndFinalize);
		}

		function finalize() {
			req.abort();
			if (signal) signal.removeEventListener('abort', abortAndFinalize);
			clearTimeout(reqTimeout);
		}

		if (request.timeout) {
			req.once('socket', function (socket) {
				reqTimeout = setTimeout(function () {
					reject(new FetchError(`network timeout at: ${request.url}`, 'request-timeout'));
					finalize();
				}, request.timeout);
			});
		}

		req.on('error', function (err) {
			reject(new FetchError(`request to ${request.url} failed, reason: ${err.message}`, 'system', err));
			finalize();
		});

		req.on('response', function (res) {
			clearTimeout(reqTimeout);

			const headers = createHeadersLenient(res.headers);

			// HTTP fetch step 5
			if (fetch.isRedirect(res.statusCode)) {
				// HTTP fetch step 5.2
				const location = headers.get('Location');

				// HTTP fetch step 5.3
				const locationURL = location === null ? null : resolve_url(request.url, location);

				// HTTP fetch step 5.5
				switch (request.redirect) {
					case 'error':
						reject(new FetchError(`redirect mode is set to error: ${request.url}`, 'no-redirect'));
						finalize();
						return;
					case 'manual':
						// node-fetch-specific step: make manual redirect a bit easier to use by setting the Location header value to the resolved URL.
						if (locationURL !== null) {
							// handle corrupted header
							try {
								headers.set('Location', locationURL);
							} catch (err) {
								// istanbul ignore next: nodejs server prevent invalid response headers, we can't test this through normal request
								reject(err);
							}
						}
						break;
					case 'follow':
						// HTTP-redirect fetch step 2
						if (locationURL === null) {
							break;
						}

						// HTTP-redirect fetch step 5
						if (request.counter >= request.follow) {
							reject(new FetchError(`maximum redirect reached at: ${request.url}`, 'max-redirect'));
							finalize();
							return;
						}

						// HTTP-redirect fetch step 6 (counter increment)
						// Create a new Request object.
						const requestOpts = {
							headers: new Headers(request.headers),
							follow: request.follow,
							counter: request.counter + 1,
							agent: request.agent,
							compress: request.compress,
							method: request.method,
							body: request.body,
							signal: request.signal,
							timeout: request.timeout
						};

						// HTTP-redirect fetch step 9
						if (res.statusCode !== 303 && request.body && getTotalBytes(request) === null) {
							reject(new FetchError('Cannot follow redirect with body being a readable stream', 'unsupported-redirect'));
							finalize();
							return;
						}

						// HTTP-redirect fetch step 11
						if (res.statusCode === 303 || (res.statusCode === 301 || res.statusCode === 302) && request.method === 'POST') {
							requestOpts.method = 'GET';
							requestOpts.body = undefined;
							requestOpts.headers.delete('content-length');
						}

						// HTTP-redirect fetch step 15
						resolve(fetch(new Request(locationURL, requestOpts)));
						finalize();
						return;
				}
			}

			// prepare response
			res.once('end', function () {
				if (signal) signal.removeEventListener('abort', abortAndFinalize);
			});
			let body = res.pipe(new PassThrough$1());

			const response_options = {
				url: request.url,
				status: res.statusCode,
				statusText: res.statusMessage,
				headers: headers,
				size: request.size,
				timeout: request.timeout,
				counter: request.counter
			};

			// HTTP-network fetch step 12.1.1.3
			const codings = headers.get('Content-Encoding');

			// HTTP-network fetch step 12.1.1.4: handle content codings

			// in following scenarios we ignore compression support
			// 1. compression support is disabled
			// 2. HEAD request
			// 3. no Content-Encoding header
			// 4. no content response (204)
			// 5. content not modified response (304)
			if (!request.compress || request.method === 'HEAD' || codings === null || res.statusCode === 204 || res.statusCode === 304) {
				response = new Response(body, response_options);
				resolve(response);
				return;
			}

			// For Node v6+
			// Be less strict when decoding compressed responses, since sometimes
			// servers send slightly invalid responses that are still accepted
			// by common browsers.
			// Always using Z_SYNC_FLUSH is what cURL does.
			const zlibOptions = {
				flush: zlib__WEBPACK_IMPORTED_MODULE_4__.Z_SYNC_FLUSH,
				finishFlush: zlib__WEBPACK_IMPORTED_MODULE_4__.Z_SYNC_FLUSH
			};

			// for gzip
			if (codings == 'gzip' || codings == 'x-gzip') {
				body = body.pipe(zlib__WEBPACK_IMPORTED_MODULE_4__.createGunzip(zlibOptions));
				response = new Response(body, response_options);
				resolve(response);
				return;
			}

			// for deflate
			if (codings == 'deflate' || codings == 'x-deflate') {
				// handle the infamous raw deflate response from old servers
				// a hack for old IIS and Apache servers
				const raw = res.pipe(new PassThrough$1());
				raw.once('data', function (chunk) {
					// see http://stackoverflow.com/questions/37519828
					if ((chunk[0] & 0x0F) === 0x08) {
						body = body.pipe(zlib__WEBPACK_IMPORTED_MODULE_4__.createInflate());
					} else {
						body = body.pipe(zlib__WEBPACK_IMPORTED_MODULE_4__.createInflateRaw());
					}
					response = new Response(body, response_options);
					resolve(response);
				});
				return;
			}

			// for br
			if (codings == 'br' && typeof zlib__WEBPACK_IMPORTED_MODULE_4__.createBrotliDecompress === 'function') {
				body = body.pipe(zlib__WEBPACK_IMPORTED_MODULE_4__.createBrotliDecompress());
				response = new Response(body, response_options);
				resolve(response);
				return;
			}

			// otherwise, use response as-is
			response = new Response(body, response_options);
			resolve(response);
		});

		writeToStream(req, request);
	});
}
/**
 * Redirect code matching
 *
 * @param   Number   code  Status code
 * @return  Boolean
 */
fetch.isRedirect = function (code) {
	return code === 301 || code === 302 || code === 303 || code === 307 || code === 308;
};

// expose Promise
fetch.Promise = global.Promise;

/* harmony default export */ __webpack_exports__["default"] = (fetch);



/***/ }),

/***/ "./src/extension.ts":
/*!**************************!*\
  !*** ./src/extension.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * @author : Austin Ruby, Alex Chao, Ed Greenberg
 * @function : activate extension
 * @changelog : Ed Greenberg, November 5th, 2019, added flexible query file detection
 * @changelog : Alex Chao, Nov. 5th-10th 2019... Lots of changes... server listener added
 * - config file setup command made
 *   - config file option to allow for a longer time for the graphql server to startup
 * ! I propose we add the PORT number to config file
 * - updating variables in the event of changes in the config files
 * @changelog : ## Austin?
 * * */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// eslint-disable-next-line import/no-unresolved
const vscode = __webpack_require__(/*! vscode */ "vscode");
// only needed for creating the config file
const fs = __webpack_require__(/*! fs */ "fs");
/* eslint-disable import/no-unresolved */
const readFileSendReqAndWriteResponse = __webpack_require__(/*! ./modules/client/readFileSendReqAndWriteResponse */ "./src/modules/client/readFileSendReqAndWriteResponse.ts");
const serverOn = __webpack_require__(/*! ./modules/server/serverOn */ "./src/modules/server/serverOn.ts");
const serverOff = __webpack_require__(/*! ./modules/server/serverOff */ "./src/modules/server/serverOff.ts");
// require in new function that checks for a running server
const checkForRunningServer = __webpack_require__(/*! ./modules/server/checkForRunningServer */ "./src/modules/server/checkForRunningServer.ts");
// require in file that finds root directory
const findRootDirectory = __webpack_require__(/*! ./modules/client/findRootDirectory */ "./src/modules/client/findRootDirectory.ts");
// require in file that returns entryPoint when given the root path
const parseConfigFile = __webpack_require__(/*! ./modules/client/parseConfigFile */ "./src/modules/client/parseConfigFile.ts");
// require in file that finds port#
const findPortNumber = __webpack_require__(/*! ./modules/client/findPortNumber */ "./src/modules/client/findPortNumber.ts");
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    // * These are some variables that I need to pass between different commands, so they're in
    // * a higher scope
    // this ChannelRef variable will be used to pass the output channel between separate function defs
    // let graphQuillChannelRef: vscode.OutputChannel;
    const gqChannel = vscode.window.createOutputChannel('GraphQuill');
    // a toggle variable that will is true when the server is on
    let isOnToggle = false;
    // a disposable variable to get rid of the save event listener
    let saveListener;
    // set rootPath and entryPoint to a string of the path to the server startup file (has app.listen)
    const rootPath = findRootDirectory();
    // putting these variables in the global scope with the expectation that they will be set upon
    // activating the extension. I'm moving them to be able to manage "live" changes
    let entryPoint;
    let allowServerTimeoutConfigSetting;
    // set portNumber to a string. It is going to be set in the activation command
    let portNumber;
    // boolean to track if the server has been successfully turned on by the user
    let serverTurnedOnByGraphQuill = false;
    /** **********************************************************************************************
     * * The command must be defined in package.json under contributes/commands AND activation events
     * Now provide the implementation of the command with registerCommand
     * The commandId parameter must match the command field in package.json
     * * This is the first GraphQuill option in the command palette for activating GraphQuill
    *********************************************************************************************** */
    const disposableActivateGraphQuill = vscode.commands.registerCommand('extension.activateGraphQuill', () => __awaiter(this, void 0, void 0, function* () {
        if (isOnToggle) {
            // if server is already running, break out of function by returning null
            console.log('Server is already running');
            vscode.window.showInformationMessage('GraphQuill is already active');
            return null;
        }
        // show output channel
        gqChannel.show(true);
        // parse the config file (this is important in case if there were any changes)
        let parseResult = parseConfigFile(rootPath);
        entryPoint = parseResult.entryPoint;
        allowServerTimeoutConfigSetting = parseResult.allowServerTimeoutConfigSetting;
        // if the entryPoint is falsey, break out of the function and tell the
        // user to create a config file
        if (!entryPoint) {
            gqChannel.append('The config file was not found, please use the Create GraphQuill Config File Command to make one.');
            // break out of this execution context
            return null;
        }
        // set the portNumber (in the higher scope so it can be used in the deactivate function)
        portNumber = findPortNumber(entryPoint);
        // Check ONCE if the port is open (also this does not need the third param)
        // will resolve to a true or false value
        const serverOnFromUser = yield checkForRunningServer(portNumber, true);
        // console.log('--serverOnFromUser after once check is:', serverOnFromUser);
        // trigger serverOn if the user does not already have the server running
        if (!serverOnFromUser) {
            // start up the user's server
            serverOn(entryPoint);
            // give user feedback that server is starting up
            gqChannel.clear();
            gqChannel.append('The server is starting up...');
            // await this function that will return true or false based on if the server has been started
            // false: if starting the server is longer than the time allotted in the config file (defaults
            // to 3 seconds)
            serverTurnedOnByGraphQuill = yield checkForRunningServer(portNumber, 
            // once setting is false, so the returned promise will only resolve when the server has
            // started OR the timeout (next variable or 3sec) is reached
            false, 
            // allowServerT.C.S. is either a time in milliseconds that defaults to 3000
            allowServerTimeoutConfigSetting);
            // if it is false, that means there was an error starting the server
            // notify the user & end the thread of execution
            if (!serverTurnedOnByGraphQuill) {
                // console.log('server is taking too long to startup');
                // give feedback to user that port didn't start (and the specified timeout config setting,
                // defaults to 3 seconds)
                gqChannel.clear();
                gqChannel.append(`The server is taking too long to startup (>${(allowServerTimeoutConfigSetting || 3000) / 1000} seconds).\nTo increase this time, update the "serverStartupTimeAllowed" setting in the graphquill.config.js file.`);
                // break out, and just in case I'm going to try to kill the port if it did open
                // otherwise we could get runaway node processes...
                return setTimeout(() => serverOff(portNumber), 5000);
            }
        }
        // if the server is on from either the user or graphquill, continue
        // send first query & setup on save listener
        if (serverOnFromUser || serverTurnedOnByGraphQuill) {
            // update isOnToggle (refers to state of GraphQuill extension running or not)
            isOnToggle = true;
            // clear any other stuff off of the channel (e.g. previous error message)
            gqChannel.clear();
            // get the fileName of the open file when the extension is FIRST fired
            const currOpenEditorPath = vscode.window.activeTextEditor.document.fileName;
            // send that request from the currentopeneditor
            readFileSendReqAndWriteResponse(currOpenEditorPath, gqChannel, portNumber, rootPath);
            // initialize the save listener here to clear the channel and resend new requests
            saveListener = vscode.workspace.onDidSaveTextDocument((event) => {
                // console.log('save event!!!', event);
                // clear the graphQuill channel
                gqChannel.clear();
                // re-parse the config file (in case the user made a change)
                parseResult = parseConfigFile(rootPath);
                entryPoint = parseResult.entryPoint;
                allowServerTimeoutConfigSetting = parseResult.allowServerTimeoutConfigSetting;
                if (!entryPoint) {
                    gqChannel.append('The config file was not found, please use the Create GraphQuill Config File Command to make one.');
                    // break out of this execution context
                    return null;
                }
                // ! I really think we should add the port number to the config file to specify to the user
                // ! That the port number SHUOLD not be changed...
                // TODO this seems very redundant... but I'm blanking on how to make this dynamic
                // TODO update if the user changes their server file...
                // on each save... reparse for a portNumber in case if it was changed
                portNumber = findPortNumber(entryPoint);
                // send the filename and channel to the readFileSRAWR function
                readFileSendReqAndWriteResponse(event.fileName, gqChannel, portNumber, rootPath);
                // satisfying linter
                return null;
            });
        }
        // to satisfy typescript linter...
        return null;
    }));
    // push it to the subscriptions
    context.subscriptions.push(disposableActivateGraphQuill);
    /** **************************************************************************
     * * Second GraphQuill option in the command palette (Cmd Shift P) for deactivating graphquill
    ************************************************************************** */
    const disposableDisableGraphQuill = vscode.commands.registerCommand('extension.deactivateGraphQuill', () => {
        // console.log('--deactivate functionality triggered');
        // check isontoggle boolean
        if (!isOnToggle) {
            // server is already off
            console.log('server is already off');
            vscode.window.showInformationMessage('GraphQuill is already off');
            return null;
        }
        // change toggle boolean
        isOnToggle = false;
        // dispose of the onDidSaveTextDocument event listener
        if (saveListener)
            saveListener.dispose();
        // close/hide GraphQuill channel
        gqChannel.hide();
        gqChannel.clear();
        console.log('in deactivate, the server turned on by graphquill boolean is: ', serverTurnedOnByGraphQuill);
        // invoke server off in this function
        return setTimeout(() => (serverTurnedOnByGraphQuill && serverOff(portNumber)), 1);
    });
    // push it into the subscriptions
    context.subscriptions.push(disposableDisableGraphQuill);
    /** **************************************************************************
     * * Third GraphQuill option in command palette to toggle graphquill extension
     ************************************************************************** */
    const disposableToggleGraphQuill = vscode.commands.registerCommand('extension.toggleGraphQuill', () => {
        // console.log('--toggle triggered!');
        // if the toggle boolean is false, then start the extension, otherwise end it...
        if (!isOnToggle) {
            // console.log('--toggle starting extension');
            // using the built in execute command and passing in a string of the command to trigger
            vscode.commands.executeCommand('extension.activateGraphQuill');
        }
        else {
            // console.log('--toggle stopping the extension');
            vscode.commands.executeCommand('extension.deactivateGraphQuill');
        }
        // just to make the linter happy...
        return null;
    });
    // push it to the subscriptions
    context.subscriptions.push(disposableToggleGraphQuill);
    /** **************************************************************************
     * * Fourth GraphQuill option in command palette to CREATE A CONFIG FILE
     ************************************************************************** */
    const disposableCreateConfigFile = vscode.commands.registerCommand('extension.createConfigFile', () => {
        // console.log('--config file setup triggered');
        // check if the root directory already has a graphquill.config.json file
        const graphQuillConfigPath = `${rootPath}/graphquill.config.js`;
        if (fs.existsSync(graphQuillConfigPath)) {
            vscode.window.showInformationMessage(`A GraphQuill configuration file already exists at ${graphQuillConfigPath}`);
            // exit out
            return null;
        }
        // if it does not already exist, write to a new file
        fs.writeFileSync(graphQuillConfigPath, 
        // string to populate the file with
        'module.exports = {\n  // change "./server/index.js" to the relative path from the root directory to\n  // the file that starts your server\n  entry: \'./server/index.js\',\n\n  // to increase the amount of time allowed for the server to startup, add a time\n  // in milliseconds (integer) to the "serverStartupTimeAllowed"\n  // serverStartupTimeAllowed: 5000,\n};\n', 'utf-8');
        // open the file in vscode
        vscode.workspace.openTextDocument(graphQuillConfigPath).then((doc) => {
            // apparently openTextDocument doesn't mean it's visible...
            vscode.window.showTextDocument(doc);
        });
        return null;
    });
    // push it to the subscriptions
    context.subscriptions.push(disposableCreateConfigFile);
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() {
    // deactivate must return a promise if cleanup operations are async.
    // turn the server off if vscode is closed (tested via lsof in terminal)
    // console.log('---deactive function called!!');
    // executing the deactivateGQ command seems to achieve a similar effect & is nice because it has
    // access to the portNumber variable
    vscode.commands.executeCommand('extension.deactivateGraphQuill');
    // return setTimeout(() => serverOff(3000), 1);
}
exports.deactivate = deactivate;


/***/ }),

/***/ "./src/modules/client sync recursive ^.*$":
/*!**************************************!*\
  !*** ./src/modules/client sync ^.*$ ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./checkQueryBrackets": "./src/modules/client/checkQueryBrackets.ts",
	"./checkQueryBrackets.ts": "./src/modules/client/checkQueryBrackets.ts",
	"./extractQueries": "./src/modules/client/extractQueries.ts",
	"./extractQueries.ts": "./src/modules/client/extractQueries.ts",
	"./findPortNumber": "./src/modules/client/findPortNumber.ts",
	"./findPortNumber.ts": "./src/modules/client/findPortNumber.ts",
	"./findRootDirectory": "./src/modules/client/findRootDirectory.ts",
	"./findRootDirectory.ts": "./src/modules/client/findRootDirectory.ts",
	"./parseConfigFile": "./src/modules/client/parseConfigFile.ts",
	"./parseConfigFile.ts": "./src/modules/client/parseConfigFile.ts",
	"./parseQuery": "./src/modules/client/parseQuery.ts",
	"./parseQuery.ts": "./src/modules/client/parseQuery.ts",
	"./readFileSendReqAndWriteResponse": "./src/modules/client/readFileSendReqAndWriteResponse.ts",
	"./readFileSendReqAndWriteResponse.ts": "./src/modules/client/readFileSendReqAndWriteResponse.ts"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./src/modules/client sync recursive ^.*$";

/***/ }),

/***/ "./src/modules/client/checkQueryBrackets.ts":
/*!**************************************************!*\
  !*** ./src/modules/client/checkQueryBrackets.ts ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * @module : parser.ts
 * @author : Austin Ruby
 * @function : parse string for instances of 'graphQuill' and extract content
 * within parens immediately following each instance
 * @changelog : Ed Greenberg, November 4th, 2019, rewrote to remove enum bug
 * @changelog : ##WHOEVER CHANGES THE FILE, date, details
 * * */
// check if parens are balanced for parsed query strings
// if they're balanced, return original query string
// if they're not, return error message with imbalanced bracket/s
function checkQueryBrackets(queryString) {
    const stack = []; // the core of the function...
    // ...where detected opening brackets will be pushed in and pop off when the parser finds a mate
    const validatedSoFar = []; // a running copy of the query
    const openings = '{[('; // list of opening brackets
    const closings = '}])'; // list of closing brackets
    // eslint-disable-next-line no-restricted-syntax
    for (const el of queryString) { // loop the query
        if (openings.includes(el))
            stack.push(el); // if query el is opening bracket, add el to stack
        if (closings.includes(el)) {
            if (stack[stack.length - 1] === openings[closings.indexOf(el)])
                stack.pop();
            // if top of stack mates a new closing bracket, we are good, can reduce stack and keep going
            else
                break;
            // if the top of stack does not mate closing bracket, we stop loop and skip to declaring error
        }
        validatedSoFar.push(el); // helping keep running copy of query
    }
    return stack.length === 0 // this will be zero if all query brackets have matches
        ? queryString.slice(1, queryString.length - 1) // this substring is sent ahead if validated
        : new Error(`${`The following character makes the query unbalanced: ${stack[stack.length - 1]}\n`
            + 'The portion of the query that ran before the unbalance was detected was:\n'}${validatedSoFar.join('')}\n\n`); // ...otherwise, we report an error
}
module.exports = checkQueryBrackets;


/***/ }),

/***/ "./src/modules/client/extractQueries.ts":
/*!**********************************************!*\
  !*** ./src/modules/client/extractQueries.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* eslint-disable import/no-unresolved */
// import { builtinModules } from 'module';
Object.defineProperty(exports, "__esModule", { value: true });
const parseQuery_1 = __webpack_require__(/*! ./parseQuery */ "./src/modules/client/parseQuery.ts");
const useCheckQueryBrackets = __webpack_require__(/*! ./checkQueryBrackets */ "./src/modules/client/checkQueryBrackets.ts");
// given file path, read file at path and parse for instances of 'graphQuill'
function extractQueries(string) {
    // console.log(string);
    // define text to search for in file
    const gq = 'graphQuill';
    const queriesArr = [];
    // iterate over string
    for (let i = 0; i < string.length; i += 1) {
        // if current slice of string is 'graphQuill'
        // then push evaluated result of parseQueries passing in
        // string sliced from current char to end into queriesArr
        if (string.slice(i, i + gq.length) === gq) {
            queriesArr.push(parseQuery_1.default(string.slice(i + gq.length)));
        }
    }
    // after finding all instances of 'graphQuill' and parsing out query strings,
    // map queries to new array full of either valid queries of errors
    const validatedQueriesArr = queriesArr.map((queryString) => (useCheckQueryBrackets(queryString)));
    // console.log('queriesArr: ', queriesArr);
    // console.log('validatedQueriesArr: ', validatedQueriesArr);
    return validatedQueriesArr;
} // given file path, read file at path and parse for instances of 'graphQuill'
module.exports = extractQueries;


/***/ }),

/***/ "./src/modules/client/findPortNumber.ts":
/*!**********************************************!*\
  !*** ./src/modules/client/findPortNumber.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * @author : Alex Chao
 * @function : return the portNumber as a string
 * @param: entryPoint
 * @returns: portNumber as a string
 * @changelog : ##WHOEVER CHANGES THE FILE, date, details
 * * */
const fs = __webpack_require__(/*! fs */ "fs");
function findPortNumber(entryPoint) {
    // this is a blocking (synchronous) call to the active file, populating 'data' as a string
    const data = fs.readFileSync(entryPoint, 'utf8');
    // to stop a localhost, we must first identify a port, and 'app.listen(' is
    // a special string in the active file that is likely to be adjacent to the port number
    const lookup = data.search(/app.listen\(/);
    // this next segment is edge case handling for if the port number
    // is separated from the start parentheses by some number of spaces
    let displace = 0;
    while (data[lookup + displace + 11] === ' ') {
        displace += 1;
    }
    // return the port number (accounting for the offsetting per the edge case)
    return data.slice(lookup + 11 + displace, lookup + 15 + displace);
}
module.exports = findPortNumber;


/***/ }),

/***/ "./src/modules/client/findRootDirectory.ts":
/*!*************************************************!*\
  !*** ./src/modules/client/findRootDirectory.ts ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * @author : Alex Chao Nov 7th, 2019. Modularized
 * @function : return the root directory path in a string
 * @param : none
 * @returns : string of the root directory
 * @changelog : ##WHOEVER CHANGES THE FILE, date, details
 * * */
Object.defineProperty(exports, "__esModule", { value: true });
// eslint-disable-next-line import/no-unresolved
const vscode = __webpack_require__(/*! vscode */ "vscode");
const path = __webpack_require__(/*! path */ "path");
const fs = __webpack_require__(/*! fs */ "fs");
function findRootDirectory() {
    // identify entryPoint for the file that starts the server
    // search for root directory by finding the package.json file
    let root = path.dirname(vscode.window.activeTextEditor.document.fileName);
    while (!fs.existsSync(`${root}/package.json`)) {
        root = path.dirname(root);
    }
    return root;
}
module.exports = findRootDirectory;


/***/ }),

/***/ "./src/modules/client/parseConfigFile.ts":
/*!***********************************************!*\
  !*** ./src/modules/client/parseConfigFile.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* eslint-disable no-unused-vars */
// these rules are disabled for the weird require that is inside of the function
/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
Object.defineProperty(exports, "__esModule", { value: true });
// const path = require('path');
const fs = __webpack_require__(/*! fs */ "fs");
const path = __webpack_require__(/*! path */ "path");
function parseConfigFile(rootPath) {
    // find config file in root directory
    const gqConfigFilePath = `${rootPath}/graphquill.config.js`;
    // ! a cached version of this file will be stored here, so future invocations that are trying
    // to get results of an updated config file, will appear to not have been changed
    delete __webpack_require__.c[gqConfigFilePath];
    let entryPoint;
    let allowServerTimeoutConfigSetting;
    if (fs.existsSync(gqConfigFilePath)) {
        // if the config file exists, require it in (will come in as an object)
        const configObject = __webpack_require__("./src/modules/client sync recursive ^.*$")(`${gqConfigFilePath}`);
        // console.log('config object in parseconfigfile.ts', configObject);
        // set the entry point to the absolute path (root + relative entry path)
        entryPoint = path.resolve(rootPath, configObject.entry);
        // set the servertimeout config setting
        allowServerTimeoutConfigSetting = configObject.serverStartupTimeAllowed;
    }
    else {
        // default it to the current open editor if there is not a config file
        entryPoint = '';
        // ! This will be handled in the outer extension.ts file to notify the user and break out of
        // ! the thread of execution at the same time
        // notify user that config file was not found and current file is being used as the entry point
        // vscode.window.showInformationMessage('graphquill.config.js file was not found.
        // Please use the Create GraphQuill Config File Command to create one');
    }
    // return the array with the two results, to be destrucutred when the function is invoked
    return { entryPoint, allowServerTimeoutConfigSetting };
}
module.exports = parseConfigFile;


/***/ }),

/***/ "./src/modules/client/parseQuery.ts":
/*!******************************************!*\
  !*** ./src/modules/client/parseQuery.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * @author : Austin Ruby
 * @function : parse and validate query
 * @changelog : Ed Greenberg, November 5th, 2019, created ability to return unbalanced parens
 * @changelog : ##WHOEVER CHANGES THE FILE, date, details
 * * */
Object.defineProperty(exports, "__esModule", { value: true });
// add characters to string while within parentheses
function parseQuery(input) {
    let queryString = ''; // string to be checked for balanced parens
    let passedQueryString = ''; // string to be passed along
    let closer = false; // trip to prevent passed along string from overwriting
    let openParensCount = 0; // balanced parens validation tool
    let closeParensCount = 0; // balanced parens valaidation tool
    let index = 0; // helps loop through input
    const stack = []; // helps determine when query should be passed along
    while (index < input.length) { // loop input
        if (input[index] === '(') { // check open parens
            openParensCount += 1; // increment relevant counter
            stack.push(input[index]); // add to stack
        }
        else if (input[index] === ')') { // check closed parens
            if (stack.length === 0) { // if stack is empty and we have a closed, we have a problem
                return 'unbalanced parens';
            }
            closeParensCount += 1; // increment relevant counter
            stack.pop(); // closed parens eliminates open parens on stack
        }
        queryString += input[index]; // feed current character in loop to preliminary result string
        if (stack.length === 0 && closer === false) { // first time we hit empty stack...
            passedQueryString = queryString; // create result stack;
            closer = true;
        }
        index += 1;
    }
    return openParensCount === closeParensCount ? passedQueryString : 'unbalanced parens';
}
exports.default = parseQuery;


/***/ }),

/***/ "./src/modules/client/readFileSendReqAndWriteResponse.ts":
/*!***************************************************************!*\
  !*** ./src/modules/client/readFileSendReqAndWriteResponse.ts ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// for requiring in .js files
/* eslint-disable import/no-unresolved */
Object.defineProperty(exports, "__esModule", { value: true });
const fetch = __webpack_require__(/*! node-fetch */ "./node_modules/node-fetch/lib/index.mjs");
const fs = __webpack_require__(/*! fs */ "fs");
const extractQueries = __webpack_require__(/*! ./extractQueries */ "./src/modules/client/extractQueries.ts");
// checkQueryBrackets used to be here
// parseQuery used to be here
// extractQueries was here
// parent function to read file,
// call helper functions to parse out query string,
// send request to GraphQL API,
// and return response to output channel
function readFileSendReqAndWriteResponse(filePath, channel, portNumber, rootPath) {
    // console.log('inreadFile: ', filePath);
    // parse the contents of the entire filePath file to a string
    const copy = fs.readFileSync(filePath).toString();
    // check if the file is within the root directory, otherwise we don't want to inject the
    // function defintion
    if (filePath.includes(rootPath) && !copy.includes('function graphQuill')) {
        const newFile = `function graphQuill() {}\n\n${copy}`;
        fs.writeFileSync(filePath, newFile);
    }
    // read user's file
    fs.readFile(filePath, (err, data) => {
        if (err) {
            console.log(err);
        }
        else {
            // if no error, convert data to string and pass into gQParser to pull out query/ies
            const result = extractQueries(data.toString());
            // send post request to API/graphql
            setTimeout(() => {
                // console.log('IN SET TIMEOUT');
                // handle multiple queries in file...
                // the additional quotes need to be parsed off
                const queriesWithoutQuotes = result.filter(
                // callback to remove empty string queries (i.e. the function def of graphQuill)
                (e) => (typeof e === 'string' && e.length)).map((query) => (
                // should all be strings...
                typeof query === 'string' && query.slice(1, query.length - 1)));
                console.log('--JUST THE QUERIES', queriesWithoutQuotes);
                // TODO pair up the requests and responses. Right now the responses are coming in a random
                // TODO order because of async fetches
                // TODO MAKE THIS A PROMISE ALL? or does it not matter because the for loop will send off
                // TODO all of the fetches simultaneously and just append responses on as they come in...
                // console.log('query w/o quotes is', queryMinusQuotes);
                queriesWithoutQuotes.forEach((query) => {
                    // send the fetch to the correct port (passed in as a variable)
                    fetch(`http://localhost:${portNumber}/graphql`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ query }),
                    })
                        .then((response) => response.json())
                        .then((thing) => {
                        console.log('printed: ', thing);
                        // append any graphql response to the output channel
                        channel.append(`\n${JSON.stringify(thing, null, 2)}`); // may need to stringify to send
                        channel.show(true);
                    })
                        .catch((error) => {
                        console.log('fetch catch error: ', error, typeof error, error.constructor.name);
                        // print any errors to the output channel
                        channel.append(`ERROR!!!\n${JSON.stringify(error, null, 2)}`);
                    });
                });
                // only append this string to the output channel once
                channel.append('Responses are:');
            }, 1); // TODO BIG UX FIX NEEDED HERE
            // then send response back to vscode output channel
            // console.log('parsed queries are', result);
            // TODO match these up with the correct queries when there are multiple within a single file
            channel.append(`GraphQuill Queries are:\n${result.filter((e) => (typeof e === 'string' ? e.length : false))}\n`);
            channel.show(true);
        }
    });
}
module.exports = readFileSendReqAndWriteResponse;


/***/ }),

/***/ "./src/modules/server/checkForRunningServer.ts":
/*!*****************************************************!*\
  !*** ./src/modules/server/checkForRunningServer.ts ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * @module : checkForRunningServer.ts
 * @author : Alex Chao, Nov 7th, 2019
 * @function : uses child process and lsof to check if a port is currently running
 * @param : portNumber, string
 * @param : once: boolean, true if the function should check if the port is open right when the
 * function is run. OR false if the function should wait for the server to start before resolving
 * @param : allowServerTimeoutConfigSetting: number, user input from config file to determine how
 * long to wait for the server to start. Defaults to 3000 (milliseconds)
 * @returns : a boolean, true if the server has started, false if it has not started
 * @changelog : ##WHOEVER CHANGES THE FILE, date, details
 * * */
// eslint-disable-next-line import/no-unresolved
// import * as vscode from 'vscode';
// const path = require('path');
// const fs = require('fs');
const childProcess = __webpack_require__(/*! child_process */ "child_process");
const checkForRunningServer = (portNumber, once, allowServerTimeoutConfigSetting = 3000) => {
    console.log('CHECK FOR RUNNING SERVER IS RUNNINGGGGGG');
    // console.log(portNumber, once, allowServerTimeoutConfigSetting);
    // moved this line into the serverOn file so that each time serverOn is called
    // a new child process is started. This is critical to being able to toggle
    // GraphQuill on and off
    let portOpen = false;
    let allTerminalText;
    const bashTerminal = childProcess.spawn('bash');
    // next, we activate two terminal methods to give us
    // feedback on whether we sucessfully used a child process
    // note the Typescript (: any) used to handle unknown data inputs
    bashTerminal.stdout.on('data', (data) => {
        // console.log(`--stdout from terminal: ${data}`);
        console.log('terminal has printed some data...');
        allTerminalText = data.toString();
        portOpen = allTerminalText.includes('node');
        // console.log('allterminal text', allTerminalText);
        // console.log('---data type is', data.constructor.name);
    });
    // log what the exit code is in the extension terminal
    bashTerminal.on('exit', (code) => {
        console.log(`checkForRunningServer child process exited with code ${code}`);
        // console.log('--exit code type is', code.constructor.name);
    });
    // just below is the real core of the function, the child process:
    // checks if the port is active with the `lsof -i :${portNumber}\n` command
    // IMPORTANT: code will not run without the '\n' component--the CLI needs this
    return new Promise((resolve) => {
        let numRuns = 0;
        let timeoutId;
        // A set interval callback that will write a command to the terminal every 200ms, then check
        // if the portOpen boolean has been changed (it is actually changed in the on-data listener
        // above). Promise will resolve when the portOpen variable is true
        const intervalLsofToBash = setInterval(() => {
            bashTerminal.stdin.write(`lsof -i :${portNumber}\n`);
            // console.log('inside promise-- portOpen boolean', portOpen);
            // console.log('inside promise-- allTerminalText', allTerminalText);
            // if the port is open, resolve the promise, return some value...
            if (portOpen) {
                // clear set intervals
                clearInterval(intervalLsofToBash);
                // clear the timeoutId
                if (timeoutId)
                    clearTimeout(timeoutId);
                // end terminal session
                bashTerminal.stdin.end();
                console.log('port is open!');
                // resolve promise
                // return a confirmed status
                resolve(true);
            }
            // if once param was set to true, we only want to check if the server is "immediately" on, so
            // check if once is true, and numRuns is greater than one, then resolve the promise with the
            // result of portOpen
            if (once && numRuns > 1) {
                console.log('---once conditional triggered, result is:', portOpen);
                // clear set intervals
                clearInterval(intervalLsofToBash);
                // clear the timeoutId
                if (timeoutId)
                    clearTimeout(timeoutId);
                // end terminal session
                bashTerminal.stdin.end();
                resolve(portOpen);
            }
            // increment numRuns for the once conditional test
            numRuns += 1;
        }, 200); // Run every 200ms
        // default/base case to resolve promise if the server hasn't started in 3 seconds
        // This means the server is either spinning up too slowly or there is an error in the user's
        // server starting file. In either case we want to return false
        if (!once) {
            // only create this default timeout if this function was invoked with once === false
            timeoutId = setTimeout(() => {
                console.log('timeout of checkForRunningServer');
                // clear set intervals
                clearInterval(intervalLsofToBash);
                // end terminal session
                bashTerminal.stdin.end();
                // resolve the promise
                resolve(false);
            }, allowServerTimeoutConfigSetting); // default allowed time is 3 sec.
        }
    });
};
module.exports = checkForRunningServer;


/***/ }),

/***/ "./src/modules/server/serverOff.ts":
/*!*****************************************!*\
  !*** ./src/modules/server/serverOff.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * @module : serverOff.ts
 * @author : Ed Greenberg
 * @function : turn off server
 * @changelog : Ed Greenberg, November 5th, 2019, rewrote to open port on server/index.js
 * @changelog : ##WHOEVER CHANGES THE FILE, date, details
 * * */
Object.defineProperty(exports, "__esModule", { value: true });
// eslint-disable-next-line import/no-unresolved
const vscode = __webpack_require__(/*! vscode */ "vscode");
const fs = __webpack_require__(/*! fs */ "fs");
const path = __webpack_require__(/*! path */ "path");
const childProcess = __webpack_require__(/*! child_process */ "child_process");
// spawn a new child process that will be used to close the open port
const serverOff = (portNumber) => {
    console.log('in serveroff function file');
    // this one also had to be pulled into serverOff so that a new child process is started to
    // kill the server port
    const terminal2 = childProcess.spawn('bash');
    // we find the root directory by looking up from the active file
    // ...until we detect a folder with package.json
    let root = path.dirname(vscode.window.activeTextEditor.document.fileName);
    while (!fs.existsSync(`${root}/package.json`)) {
        root = path.dirname(root);
        console.log('a root grows: ', root);
    }
    // const temp = vscode.window.activeTextEditor!.document.fileName;
    // write any data/outputs from the terminal to the extension console
    terminal2.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
    });
    // on terminal exit, print the exit code
    terminal2.on('exit', (code) => {
        console.log(`terminal2 child process exited with code ${code}`);
    });
    // // this is a blocking (synchronous) call to the active file, populating 'data' as a string
    // const data = fs.readFileSync(`${root}/server/index.js`, 'utf8');
    // // to stop a localhost, we must first identify a port, and 'app.listen(' is
    // // a special string in the active file that is likely to be adjacent to the port number
    // const lookup = data.search(/app.listen\(/);
    // // this next segment is edge case handling for if the port number
    // // is separated from the start parentheses by some number of spaces
    // let displace = 0;
    // while (data[lookup + displace + 11] === ' ') {
    //   displace += 1;
    // }
    // // in target, we slice the port out of the array (offsetting as required by the edge case test)
    // // eslint-disable-next-line no-unused-vars
    // const target = data.slice(lookup + 11 + displace, lookup + 15 + displace);
    // ? I don't think these need to be delayed... just kill the process
    // in the core of our function, we run a special command that finds and kills the port specified
    // setTimeout(() => {
    // terminal2.stdin.write(`kill $(lsof -t -i:${target})\n`);
    terminal2.stdin.write(`kill $(lsof -t -i:${portNumber})\n`);
    terminal2.stdin.end();
    // }, 1);
    vscode.window.showInformationMessage('GraphQuill has been turned off');
};
module.exports = serverOff;


/***/ }),

/***/ "./src/modules/server/serverOn.ts":
/*!****************************************!*\
  !*** ./src/modules/server/serverOn.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * @module : serverOn.ts
 * @author : Ed Greenberg
 * @function : turn on server
 * @changelog : Ed Greenberg, November 5th, 2019, rewrote to open port on server/index.js
 * @changelog : ##WHOEVER CHANGES THE FILE, date, details
 * * */
Object.defineProperty(exports, "__esModule", { value: true });
// eslint-disable-next-line import/no-unresolved
const vscode = __webpack_require__(/*! vscode */ "vscode");
// const path = require('path');
// const fs = require('fs');
const childProcess = __webpack_require__(/*! child_process */ "child_process");
const serverOn = (entryPoint) => {
    // moved this line into the serverOn file so that each time serverOn is called
    // a new child process is started. This is critical to being able to toggle
    // GraphQuill on and off
    const terminal = childProcess.spawn('bash');
    // we find the root directory by looking up from the active file
    // ...until we detect a folder with package.json
    // let root = path.dirname(vscode.window.activeTextEditor!.document.fileName);
    // while (!fs.existsSync(`${root}/package.json`)) {
    //   root = path.dirname(root);
    //   console.log('a root grows: ', root);
    // }
    // next, we activate two terminal methods to give us
    // feedback on whether we sucessfully used a child process
    // note the Typescript (: any) used to handle unknown data inputs
    terminal.stdout.on('data', (data) => {
        // todo add validation, if there is an error that is logged here, it's coming from node
        // todo and should be piped to the channel as well
        // todo this may require passing in the channel to the serverOn function...
        console.log(`stdout from terminal: ${data}`);
        // console.log('---data type is', data.constructor.name);
    });
    // log what the exit code is in the extension terminal
    terminal.on('exit', (code) => {
        console.log(`child process exited with code ${code}`);
        // console.log('--exit code type is', code.constructor.name);
    });
    // just below is the real core of the function, the child process:
    // we write to a new terminal to run the index.js file in the folder specified by base
    // IMPORTANT: code will not run without the '\n' component--the CLI needs this
    // explicit return command
    return new Promise((resolve) => {
        // console.log('inside promise');
        setTimeout(() => {
            // console.log('root: ', root);
            console.log('Sending stdin (node command) to terminal');
            // this seems to take some time to spin up the server and
            // throws an error with the timing of a fetch
            // terminal.stdin.write(`node ${root}/server/index.js\n`);
            terminal.stdin.write(`node ${entryPoint}\n`);
            console.log('Ending terminal session');
            terminal.stdin.end();
            // resolve promise
            resolve();
            console.log('just resolved');
            vscode.window.showInformationMessage('GraphQuill Activated');
        }, 1);
    });
    // this message pops up to the user upon completion of the command
};
module.exports = serverOn;


/***/ }),

/***/ "child_process":
/*!********************************!*\
  !*** external "child_process" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("child_process");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("https");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("stream");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("url");

/***/ }),

/***/ "vscode":
/*!*************************!*\
  !*** external "vscode" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("vscode");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("zlib");

/***/ })

/******/ });
//# sourceMappingURL=extension.js.map