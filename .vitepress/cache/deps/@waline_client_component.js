import {
  Fragment,
  computed,
  createBaseVNode,
  createBlock,
  createCommentVNode,
  createElementBlock,
  createTextVNode,
  createVNode,
  defineComponent,
  getCurrentInstance,
  getCurrentScope,
  h,
  inject,
  isRef,
  nextTick,
  normalizeClass,
  normalizeStyle,
  onBeforeUnmount,
  onMounted,
  onScopeDispose,
  onUnmounted,
  openBlock,
  provide,
  reactive,
  readonly,
  ref,
  renderList,
  resolveComponent,
  shallowRef,
  toDisplayString,
  unref,
  vModelDynamic,
  vModelText,
  vShow,
  watch,
  withDirectives
} from "./chunk-HVMSZDGX.js";
import {
  __publicField
} from "./chunk-F3FYYIAV.js";

// node_modules/.pnpm/vue-demi@0.14.6_vue@3.3.13/node_modules/vue-demi/lib/index.mjs
var isVue3 = true;

// node_modules/.pnpm/@vueuse+shared@10.7.0_vue@3.3.13/node_modules/@vueuse/shared/index.mjs
function tryOnScopeDispose(fn) {
  if (getCurrentScope()) {
    onScopeDispose(fn);
    return true;
  }
  return false;
}
function toValue(r2) {
  return typeof r2 === "function" ? r2() : unref(r2);
}
var isClient = typeof window !== "undefined" && typeof document !== "undefined";
var isWorker = typeof WorkerGlobalScope !== "undefined" && globalThis instanceof WorkerGlobalScope;
var toString = Object.prototype.toString;
var isObject = (val) => toString.call(val) === "[object Object]";
var noop = () => {
};
var isIOS = getIsIOS();
function getIsIOS() {
  var _a2, _b;
  return isClient && ((_a2 = window == null ? void 0 : window.navigator) == null ? void 0 : _a2.userAgent) && (/iP(ad|hone|od)/.test(window.navigator.userAgent) || ((_b = window == null ? void 0 : window.navigator) == null ? void 0 : _b.maxTouchPoints) > 2 && /iPad|Macintosh/.test(window == null ? void 0 : window.navigator.userAgent));
}
function createFilterWrapper(filter, fn) {
  function wrapper(...args) {
    return new Promise((resolve, reject) => {
      Promise.resolve(filter(() => fn.apply(this, args), { fn, thisArg: this, args })).then(resolve).catch(reject);
    });
  }
  return wrapper;
}
var bypassFilter = (invoke) => {
  return invoke();
};
function debounceFilter(ms, options2 = {}) {
  let timer;
  let maxTimer;
  let lastRejector = noop;
  const _clearTimeout = (timer2) => {
    clearTimeout(timer2);
    lastRejector();
    lastRejector = noop;
  };
  const filter = (invoke) => {
    const duration = toValue(ms);
    const maxDuration = toValue(options2.maxWait);
    if (timer)
      _clearTimeout(timer);
    if (duration <= 0 || maxDuration !== void 0 && maxDuration <= 0) {
      if (maxTimer) {
        _clearTimeout(maxTimer);
        maxTimer = null;
      }
      return Promise.resolve(invoke());
    }
    return new Promise((resolve, reject) => {
      lastRejector = options2.rejectOnCancel ? reject : resolve;
      if (maxDuration && !maxTimer) {
        maxTimer = setTimeout(() => {
          if (timer)
            _clearTimeout(timer);
          maxTimer = null;
          resolve(invoke());
        }, maxDuration);
      }
      timer = setTimeout(() => {
        if (maxTimer)
          _clearTimeout(maxTimer);
        maxTimer = null;
        resolve(invoke());
      }, duration);
    });
  };
  return filter;
}
function pausableFilter(extendFilter = bypassFilter) {
  const isActive = ref(true);
  function pause() {
    isActive.value = false;
  }
  function resume() {
    isActive.value = true;
  }
  const eventFilter = (...args) => {
    if (isActive.value)
      extendFilter(...args);
  };
  return { isActive: readonly(isActive), pause, resume, eventFilter };
}
function cacheStringFunction(fn) {
  const cache = /* @__PURE__ */ Object.create(null);
  return (str) => {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cacheStringFunction((str) => str.replace(hyphenateRE, "-$1").toLowerCase());
var camelizeRE = /-(\w)/g;
var camelize = cacheStringFunction((str) => {
  return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : "");
});
function identity(arg) {
  return arg;
}
function getLifeCycleTarget(target) {
  const instance = target || getCurrentInstance();
  return isVue3 ? instance : instance == null ? void 0 : instance.proxy;
}
function useDebounceFn(fn, ms = 200, options2 = {}) {
  return createFilterWrapper(
    debounceFilter(ms, options2),
    fn
  );
}
function watchWithFilter(source, cb, options2 = {}) {
  const {
    eventFilter = bypassFilter,
    ...watchOptions
  } = options2;
  return watch(
    source,
    createFilterWrapper(
      eventFilter,
      cb
    ),
    watchOptions
  );
}
function watchPausable(source, cb, options2 = {}) {
  const {
    eventFilter: filter,
    ...watchOptions
  } = options2;
  const { eventFilter, pause, resume, isActive } = pausableFilter(filter);
  const stop = watchWithFilter(
    source,
    cb,
    {
      ...watchOptions,
      eventFilter
    }
  );
  return { stop, pause, resume, isActive };
}
function tryOnMounted(fn, sync = true, target) {
  const instance = getLifeCycleTarget(target);
  if (instance)
    onMounted(fn, instance);
  else if (sync)
    fn();
  else
    nextTick(fn);
}
function tryOnUnmounted(fn, target) {
  const instance = getLifeCycleTarget(target);
  if (instance)
    onUnmounted(fn, instance);
}
function useIntervalFn(cb, interval = 1e3, options2 = {}) {
  const {
    immediate = true,
    immediateCallback = false
  } = options2;
  let timer = null;
  const isActive = ref(false);
  function clean() {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  }
  function pause() {
    isActive.value = false;
    clean();
  }
  function resume() {
    const intervalValue = toValue(interval);
    if (intervalValue <= 0)
      return;
    isActive.value = true;
    if (immediateCallback)
      cb();
    clean();
    timer = setInterval(cb, intervalValue);
  }
  if (immediate && isClient)
    resume();
  if (isRef(interval) || typeof interval === "function") {
    const stopWatch = watch(interval, () => {
      if (isActive.value && isClient)
        resume();
    });
    tryOnScopeDispose(stopWatch);
  }
  tryOnScopeDispose(pause);
  return {
    isActive,
    pause,
    resume
  };
}

// node_modules/.pnpm/@vueuse+core@10.7.0_vue@3.3.13/node_modules/@vueuse/core/index.mjs
function unrefElement(elRef) {
  var _a2;
  const plain = toValue(elRef);
  return (_a2 = plain == null ? void 0 : plain.$el) != null ? _a2 : plain;
}
var defaultWindow = isClient ? window : void 0;
var defaultDocument = isClient ? window.document : void 0;
var defaultNavigator = isClient ? window.navigator : void 0;
var defaultLocation = isClient ? window.location : void 0;
function useEventListener(...args) {
  let target;
  let events;
  let listeners;
  let options2;
  if (typeof args[0] === "string" || Array.isArray(args[0])) {
    [events, listeners, options2] = args;
    target = defaultWindow;
  } else {
    [target, events, listeners, options2] = args;
  }
  if (!target)
    return noop;
  if (!Array.isArray(events))
    events = [events];
  if (!Array.isArray(listeners))
    listeners = [listeners];
  const cleanups = [];
  const cleanup = () => {
    cleanups.forEach((fn) => fn());
    cleanups.length = 0;
  };
  const register = (el, event, listener, options22) => {
    el.addEventListener(event, listener, options22);
    return () => el.removeEventListener(event, listener, options22);
  };
  const stopWatch = watch(
    () => [unrefElement(target), toValue(options2)],
    ([el, options22]) => {
      cleanup();
      if (!el)
        return;
      const optionsClone = isObject(options22) ? { ...options22 } : options22;
      cleanups.push(
        ...events.flatMap((event) => {
          return listeners.map((listener) => register(el, event, listener, optionsClone));
        })
      );
    },
    { immediate: true, flush: "post" }
  );
  const stop = () => {
    stopWatch();
    cleanup();
  };
  tryOnScopeDispose(stop);
  return stop;
}
function useRafFn(fn, options2 = {}) {
  const {
    immediate = true,
    fpsLimit = void 0,
    window: window2 = defaultWindow
  } = options2;
  const isActive = ref(false);
  const intervalLimit = fpsLimit ? 1e3 / fpsLimit : null;
  let previousFrameTimestamp = 0;
  let rafId = null;
  function loop(timestamp2) {
    if (!isActive.value || !window2)
      return;
    const delta = timestamp2 - (previousFrameTimestamp || timestamp2);
    if (intervalLimit && delta < intervalLimit) {
      rafId = window2.requestAnimationFrame(loop);
      return;
    }
    fn({ delta, timestamp: timestamp2 });
    previousFrameTimestamp = timestamp2;
    rafId = window2.requestAnimationFrame(loop);
  }
  function resume() {
    if (!isActive.value && window2) {
      isActive.value = true;
      rafId = window2.requestAnimationFrame(loop);
    }
  }
  function pause() {
    isActive.value = false;
    if (rafId != null && window2) {
      window2.cancelAnimationFrame(rafId);
      rafId = null;
    }
  }
  if (immediate)
    resume();
  tryOnScopeDispose(pause);
  return {
    isActive: readonly(isActive),
    pause,
    resume
  };
}
var _global = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
var globalKey = "__vueuse_ssr_handlers__";
var handlers = getHandlers();
function getHandlers() {
  if (!(globalKey in _global))
    _global[globalKey] = _global[globalKey] || {};
  return _global[globalKey];
}
function getSSRHandler(key, fallback) {
  return handlers[key] || fallback;
}
function guessSerializerType(rawInit) {
  return rawInit == null ? "any" : rawInit instanceof Set ? "set" : rawInit instanceof Map ? "map" : rawInit instanceof Date ? "date" : typeof rawInit === "boolean" ? "boolean" : typeof rawInit === "string" ? "string" : typeof rawInit === "object" ? "object" : !Number.isNaN(rawInit) ? "number" : "any";
}
var StorageSerializers = {
  boolean: {
    read: (v) => v === "true",
    write: (v) => String(v)
  },
  object: {
    read: (v) => JSON.parse(v),
    write: (v) => JSON.stringify(v)
  },
  number: {
    read: (v) => Number.parseFloat(v),
    write: (v) => String(v)
  },
  any: {
    read: (v) => v,
    write: (v) => String(v)
  },
  string: {
    read: (v) => v,
    write: (v) => String(v)
  },
  map: {
    read: (v) => new Map(JSON.parse(v)),
    write: (v) => JSON.stringify(Array.from(v.entries()))
  },
  set: {
    read: (v) => new Set(JSON.parse(v)),
    write: (v) => JSON.stringify(Array.from(v))
  },
  date: {
    read: (v) => new Date(v),
    write: (v) => v.toISOString()
  }
};
var customStorageEventName = "vueuse-storage";
function useStorage(key, defaults2, storage, options2 = {}) {
  var _a2;
  const {
    flush = "pre",
    deep = true,
    listenToStorageChanges = true,
    writeDefaults = true,
    mergeDefaults = false,
    shallow,
    window: window2 = defaultWindow,
    eventFilter,
    onError: onError2 = (e2) => {
      console.error(e2);
    },
    initOnMounted
  } = options2;
  const data = (shallow ? shallowRef : ref)(typeof defaults2 === "function" ? defaults2() : defaults2);
  if (!storage) {
    try {
      storage = getSSRHandler("getDefaultStorage", () => {
        var _a22;
        return (_a22 = defaultWindow) == null ? void 0 : _a22.localStorage;
      })();
    } catch (e2) {
      onError2(e2);
    }
  }
  if (!storage)
    return data;
  const rawInit = toValue(defaults2);
  const type = guessSerializerType(rawInit);
  const serializer = (_a2 = options2.serializer) != null ? _a2 : StorageSerializers[type];
  const { pause: pauseWatch, resume: resumeWatch } = watchPausable(
    data,
    () => write(data.value),
    { flush, deep, eventFilter }
  );
  if (window2 && listenToStorageChanges) {
    tryOnMounted(() => {
      useEventListener(window2, "storage", update);
      useEventListener(window2, customStorageEventName, updateFromCustomEvent);
      if (initOnMounted)
        update();
    });
  }
  if (!initOnMounted)
    update();
  return data;
  function write(v) {
    try {
      if (v == null) {
        storage.removeItem(key);
      } else {
        const serialized = serializer.write(v);
        const oldValue = storage.getItem(key);
        if (oldValue !== serialized) {
          storage.setItem(key, serialized);
          if (window2) {
            window2.dispatchEvent(new CustomEvent(customStorageEventName, {
              detail: {
                key,
                oldValue,
                newValue: serialized,
                storageArea: storage
              }
            }));
          }
        }
      }
    } catch (e2) {
      onError2(e2);
    }
  }
  function read(event) {
    const rawValue = event ? event.newValue : storage.getItem(key);
    if (rawValue == null) {
      if (writeDefaults && rawInit != null)
        storage.setItem(key, serializer.write(rawInit));
      return rawInit;
    } else if (!event && mergeDefaults) {
      const value = serializer.read(rawValue);
      if (typeof mergeDefaults === "function")
        return mergeDefaults(value, rawInit);
      else if (type === "object" && !Array.isArray(value))
        return { ...rawInit, ...value };
      return value;
    } else if (typeof rawValue !== "string") {
      return rawValue;
    } else {
      return serializer.read(rawValue);
    }
  }
  function updateFromCustomEvent(event) {
    update(event.detail);
  }
  function update(event) {
    if (event && event.storageArea !== storage)
      return;
    if (event && event.key == null) {
      data.value = rawInit;
      return;
    }
    if (event && event.key !== key)
      return;
    pauseWatch();
    try {
      if ((event == null ? void 0 : event.newValue) !== serializer.write(data.value))
        data.value = read(event);
    } catch (e2) {
      onError2(e2);
    } finally {
      if (event)
        nextTick(resumeWatch);
      else
        resumeWatch();
    }
  }
}
function useNow(options2 = {}) {
  const {
    controls: exposeControls = false,
    interval = "requestAnimationFrame"
  } = options2;
  const now = ref(/* @__PURE__ */ new Date());
  const update = () => now.value = /* @__PURE__ */ new Date();
  const controls = interval === "requestAnimationFrame" ? useRafFn(update, { immediate: true }) : useIntervalFn(update, interval, { immediate: true });
  if (exposeControls) {
    return {
      now,
      ...controls
    };
  } else {
    return now;
  }
}
var defaultState = {
  x: 0,
  y: 0,
  pointerId: 0,
  pressure: 0,
  tiltX: 0,
  tiltY: 0,
  width: 0,
  height: 0,
  twist: 0,
  pointerType: null
};
var keys = Object.keys(defaultState);
function useScriptTag(src, onLoaded = noop, options2 = {}) {
  const {
    immediate = true,
    manual = false,
    type = "text/javascript",
    async = true,
    crossOrigin,
    referrerPolicy,
    noModule,
    defer,
    document: document2 = defaultDocument,
    attrs = {}
  } = options2;
  const scriptTag = ref(null);
  let _promise = null;
  const loadScript = (waitForScriptLoad) => new Promise((resolve, reject) => {
    const resolveWithElement = (el2) => {
      scriptTag.value = el2;
      resolve(el2);
      return el2;
    };
    if (!document2) {
      resolve(false);
      return;
    }
    let shouldAppend = false;
    let el = document2.querySelector(`script[src="${toValue(src)}"]`);
    if (!el) {
      el = document2.createElement("script");
      el.type = type;
      el.async = async;
      el.src = toValue(src);
      if (defer)
        el.defer = defer;
      if (crossOrigin)
        el.crossOrigin = crossOrigin;
      if (noModule)
        el.noModule = noModule;
      if (referrerPolicy)
        el.referrerPolicy = referrerPolicy;
      Object.entries(attrs).forEach(([name, value]) => el == null ? void 0 : el.setAttribute(name, value));
      shouldAppend = true;
    } else if (el.hasAttribute("data-loaded")) {
      resolveWithElement(el);
    }
    el.addEventListener("error", (event) => reject(event));
    el.addEventListener("abort", (event) => reject(event));
    el.addEventListener("load", () => {
      el.setAttribute("data-loaded", "true");
      onLoaded(el);
      resolveWithElement(el);
    });
    if (shouldAppend)
      el = document2.head.appendChild(el);
    if (!waitForScriptLoad)
      resolveWithElement(el);
  });
  const load = (waitForScriptLoad = true) => {
    if (!_promise)
      _promise = loadScript(waitForScriptLoad);
    return _promise;
  };
  const unload = () => {
    if (!document2)
      return;
    _promise = null;
    if (scriptTag.value)
      scriptTag.value = null;
    const el = document2.querySelector(`script[src="${toValue(src)}"]`);
    if (el)
      document2.head.removeChild(el);
  };
  if (immediate && !manual)
    tryOnMounted(load);
  if (!manual)
    tryOnUnmounted(unload);
  return { scriptTag, load, unload };
}
var _id = 0;
function useStyleTag(css, options2 = {}) {
  const isLoaded = ref(false);
  const {
    document: document2 = defaultDocument,
    immediate = true,
    manual = false,
    id = `vueuse_styletag_${++_id}`
  } = options2;
  const cssRef = ref(css);
  let stop = () => {
  };
  const load = () => {
    if (!document2)
      return;
    const el = document2.getElementById(id) || document2.createElement("style");
    if (!el.isConnected) {
      el.id = id;
      if (options2.media)
        el.media = options2.media;
      document2.head.appendChild(el);
    }
    if (isLoaded.value)
      return;
    stop = watch(
      cssRef,
      (value) => {
        el.textContent = value;
      },
      { immediate: true }
    );
    isLoaded.value = true;
  };
  const unload = () => {
    if (!document2 || !isLoaded.value)
      return;
    stop();
    document2.head.removeChild(document2.getElementById(id));
    isLoaded.value = false;
  };
  if (immediate && !manual)
    tryOnMounted(load);
  if (!manual)
    tryOnScopeDispose(unload);
  return {
    id,
    css: cssRef,
    unload,
    load,
    isLoaded: readonly(isLoaded)
  };
}
var DEFAULT_UNITS = [
  { max: 6e4, value: 1e3, name: "second" },
  { max: 276e4, value: 6e4, name: "minute" },
  { max: 72e6, value: 36e5, name: "hour" },
  { max: 5184e5, value: 864e5, name: "day" },
  { max: 24192e5, value: 6048e5, name: "week" },
  { max: 28512e6, value: 2592e6, name: "month" },
  { max: Number.POSITIVE_INFINITY, value: 31536e6, name: "year" }
];
var _TransitionPresets = {
  easeInSine: [0.12, 0, 0.39, 0],
  easeOutSine: [0.61, 1, 0.88, 1],
  easeInOutSine: [0.37, 0, 0.63, 1],
  easeInQuad: [0.11, 0, 0.5, 0],
  easeOutQuad: [0.5, 1, 0.89, 1],
  easeInOutQuad: [0.45, 0, 0.55, 1],
  easeInCubic: [0.32, 0, 0.67, 0],
  easeOutCubic: [0.33, 1, 0.68, 1],
  easeInOutCubic: [0.65, 0, 0.35, 1],
  easeInQuart: [0.5, 0, 0.75, 0],
  easeOutQuart: [0.25, 1, 0.5, 1],
  easeInOutQuart: [0.76, 0, 0.24, 1],
  easeInQuint: [0.64, 0, 0.78, 0],
  easeOutQuint: [0.22, 1, 0.36, 1],
  easeInOutQuint: [0.83, 0, 0.17, 1],
  easeInExpo: [0.7, 0, 0.84, 0],
  easeOutExpo: [0.16, 1, 0.3, 1],
  easeInOutExpo: [0.87, 0, 0.13, 1],
  easeInCirc: [0.55, 0, 1, 0.45],
  easeOutCirc: [0, 0.55, 0.45, 1],
  easeInOutCirc: [0.85, 0, 0.15, 1],
  easeInBack: [0.36, 0, 0.66, -0.56],
  easeOutBack: [0.34, 1.56, 0.64, 1],
  easeInOutBack: [0.68, -0.6, 0.32, 1.6]
};
var TransitionPresets = Object.assign({}, { linear: identity }, _TransitionPresets);

// node_modules/.pnpm/autosize@6.0.1/node_modules/autosize/dist/autosize.esm.js
var e = /* @__PURE__ */ new Map();
function t(t2) {
  var o2 = e.get(t2);
  o2 && o2.destroy();
}
function o(t2) {
  var o2 = e.get(t2);
  o2 && o2.update();
}
var r = null;
"undefined" == typeof window ? ((r = function(e2) {
  return e2;
}).destroy = function(e2) {
  return e2;
}, r.update = function(e2) {
  return e2;
}) : ((r = function(t2, o2) {
  return t2 && Array.prototype.forEach.call(t2.length ? t2 : [t2], function(t3) {
    return function(t4) {
      if (t4 && t4.nodeName && "TEXTAREA" === t4.nodeName && !e.has(t4)) {
        var o3, r2 = null, n2 = window.getComputedStyle(t4), i = (o3 = t4.value, function() {
          a({ testForHeightReduction: "" === o3 || !t4.value.startsWith(o3), restoreTextAlign: null }), o3 = t4.value;
        }), l = (function(o4) {
          t4.removeEventListener("autosize:destroy", l), t4.removeEventListener("autosize:update", s), t4.removeEventListener("input", i), window.removeEventListener("resize", s), Object.keys(o4).forEach(function(e2) {
            return t4.style[e2] = o4[e2];
          }), e.delete(t4);
        }).bind(t4, { height: t4.style.height, resize: t4.style.resize, textAlign: t4.style.textAlign, overflowY: t4.style.overflowY, overflowX: t4.style.overflowX, wordWrap: t4.style.wordWrap });
        t4.addEventListener("autosize:destroy", l), t4.addEventListener("autosize:update", s), t4.addEventListener("input", i), window.addEventListener("resize", s), t4.style.overflowX = "hidden", t4.style.wordWrap = "break-word", e.set(t4, { destroy: l, update: s }), s();
      }
      function a(e2) {
        var o4, i2, l2 = e2.restoreTextAlign, s2 = void 0 === l2 ? null : l2, d = e2.testForHeightReduction, u = void 0 === d || d, c = n2.overflowY;
        if (0 !== t4.scrollHeight && ("vertical" === n2.resize ? t4.style.resize = "none" : "both" === n2.resize && (t4.style.resize = "horizontal"), u && (o4 = function(e3) {
          for (var t5 = []; e3 && e3.parentNode && e3.parentNode instanceof Element; )
            e3.parentNode.scrollTop && t5.push([e3.parentNode, e3.parentNode.scrollTop]), e3 = e3.parentNode;
          return function() {
            return t5.forEach(function(e4) {
              var t6 = e4[0], o5 = e4[1];
              t6.style.scrollBehavior = "auto", t6.scrollTop = o5, t6.style.scrollBehavior = null;
            });
          };
        }(t4), t4.style.height = ""), i2 = "content-box" === n2.boxSizing ? t4.scrollHeight - (parseFloat(n2.paddingTop) + parseFloat(n2.paddingBottom)) : t4.scrollHeight + parseFloat(n2.borderTopWidth) + parseFloat(n2.borderBottomWidth), "none" !== n2.maxHeight && i2 > parseFloat(n2.maxHeight) ? ("hidden" === n2.overflowY && (t4.style.overflow = "scroll"), i2 = parseFloat(n2.maxHeight)) : "hidden" !== n2.overflowY && (t4.style.overflow = "hidden"), t4.style.height = i2 + "px", s2 && (t4.style.textAlign = s2), o4 && o4(), r2 !== i2 && (t4.dispatchEvent(new Event("autosize:resized", { bubbles: true })), r2 = i2), c !== n2.overflow && !s2)) {
          var v = n2.textAlign;
          "hidden" === n2.overflow && (t4.style.textAlign = "start" === v ? "end" : "start"), a({ restoreTextAlign: v, testForHeightReduction: true });
        }
      }
      function s() {
        a({ testForHeightReduction: true, restoreTextAlign: null });
      }
    }(t3);
  }), t2;
}).destroy = function(e2) {
  return e2 && Array.prototype.forEach.call(e2.length ? e2 : [e2], t), e2;
}, r.update = function(e2) {
  return e2 && Array.prototype.forEach.call(e2.length ? e2 : [e2], o), e2;
});
var n = r;
var autosize_esm_default = n;

// node_modules/.pnpm/marked@4.3.0/node_modules/marked/lib/marked.esm.js
function getDefaults() {
  return {
    async: false,
    baseUrl: null,
    breaks: false,
    extensions: null,
    gfm: true,
    headerIds: true,
    headerPrefix: "",
    highlight: null,
    hooks: null,
    langPrefix: "language-",
    mangle: true,
    pedantic: false,
    renderer: null,
    sanitize: false,
    sanitizer: null,
    silent: false,
    smartypants: false,
    tokenizer: null,
    walkTokens: null,
    xhtml: false
  };
}
var defaults = getDefaults();
function changeDefaults(newDefaults) {
  defaults = newDefaults;
}
var escapeTest = /[&<>"']/;
var escapeReplace = new RegExp(escapeTest.source, "g");
var escapeTestNoEncode = /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/;
var escapeReplaceNoEncode = new RegExp(escapeTestNoEncode.source, "g");
var escapeReplacements = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
};
var getEscapeReplacement = (ch) => escapeReplacements[ch];
function escape(html, encode) {
  if (encode) {
    if (escapeTest.test(html)) {
      return html.replace(escapeReplace, getEscapeReplacement);
    }
  } else {
    if (escapeTestNoEncode.test(html)) {
      return html.replace(escapeReplaceNoEncode, getEscapeReplacement);
    }
  }
  return html;
}
var unescapeTest = /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig;
function unescape(html) {
  return html.replace(unescapeTest, (_, n2) => {
    n2 = n2.toLowerCase();
    if (n2 === "colon")
      return ":";
    if (n2.charAt(0) === "#") {
      return n2.charAt(1) === "x" ? String.fromCharCode(parseInt(n2.substring(2), 16)) : String.fromCharCode(+n2.substring(1));
    }
    return "";
  });
}
var caret = /(^|[^\[])\^/g;
function edit(regex, opt) {
  regex = typeof regex === "string" ? regex : regex.source;
  opt = opt || "";
  const obj = {
    replace: (name, val) => {
      val = val.source || val;
      val = val.replace(caret, "$1");
      regex = regex.replace(name, val);
      return obj;
    },
    getRegex: () => {
      return new RegExp(regex, opt);
    }
  };
  return obj;
}
var nonWordAndColonTest = /[^\w:]/g;
var originIndependentUrl = /^$|^[a-z][a-z0-9+.-]*:|^[?#]/i;
function cleanUrl(sanitize, base, href) {
  if (sanitize) {
    let prot;
    try {
      prot = decodeURIComponent(unescape(href)).replace(nonWordAndColonTest, "").toLowerCase();
    } catch (e2) {
      return null;
    }
    if (prot.indexOf("javascript:") === 0 || prot.indexOf("vbscript:") === 0 || prot.indexOf("data:") === 0) {
      return null;
    }
  }
  if (base && !originIndependentUrl.test(href)) {
    href = resolveUrl(base, href);
  }
  try {
    href = encodeURI(href).replace(/%25/g, "%");
  } catch (e2) {
    return null;
  }
  return href;
}
var baseUrls = {};
var justDomain = /^[^:]+:\/*[^/]*$/;
var protocol = /^([^:]+:)[\s\S]*$/;
var domain = /^([^:]+:\/*[^/]*)[\s\S]*$/;
function resolveUrl(base, href) {
  if (!baseUrls[" " + base]) {
    if (justDomain.test(base)) {
      baseUrls[" " + base] = base + "/";
    } else {
      baseUrls[" " + base] = rtrim(base, "/", true);
    }
  }
  base = baseUrls[" " + base];
  const relativeBase = base.indexOf(":") === -1;
  if (href.substring(0, 2) === "//") {
    if (relativeBase) {
      return href;
    }
    return base.replace(protocol, "$1") + href;
  } else if (href.charAt(0) === "/") {
    if (relativeBase) {
      return href;
    }
    return base.replace(domain, "$1") + href;
  } else {
    return base + href;
  }
}
var noopTest = { exec: function noopTest2() {
} };
function splitCells(tableRow, count) {
  const row = tableRow.replace(/\|/g, (match, offset, str) => {
    let escaped = false, curr = offset;
    while (--curr >= 0 && str[curr] === "\\")
      escaped = !escaped;
    if (escaped) {
      return "|";
    } else {
      return " |";
    }
  }), cells = row.split(/ \|/);
  let i = 0;
  if (!cells[0].trim()) {
    cells.shift();
  }
  if (cells.length > 0 && !cells[cells.length - 1].trim()) {
    cells.pop();
  }
  if (cells.length > count) {
    cells.splice(count);
  } else {
    while (cells.length < count)
      cells.push("");
  }
  for (; i < cells.length; i++) {
    cells[i] = cells[i].trim().replace(/\\\|/g, "|");
  }
  return cells;
}
function rtrim(str, c, invert) {
  const l = str.length;
  if (l === 0) {
    return "";
  }
  let suffLen = 0;
  while (suffLen < l) {
    const currChar = str.charAt(l - suffLen - 1);
    if (currChar === c && !invert) {
      suffLen++;
    } else if (currChar !== c && invert) {
      suffLen++;
    } else {
      break;
    }
  }
  return str.slice(0, l - suffLen);
}
function findClosingBracket(str, b) {
  if (str.indexOf(b[1]) === -1) {
    return -1;
  }
  const l = str.length;
  let level = 0, i = 0;
  for (; i < l; i++) {
    if (str[i] === "\\") {
      i++;
    } else if (str[i] === b[0]) {
      level++;
    } else if (str[i] === b[1]) {
      level--;
      if (level < 0) {
        return i;
      }
    }
  }
  return -1;
}
function checkSanitizeDeprecation(opt) {
  if (opt && opt.sanitize && !opt.silent) {
    console.warn("marked(): sanitize and sanitizer parameters are deprecated since version 0.7.0, should not be used and will be removed in the future. Read more here: https://marked.js.org/#/USING_ADVANCED.md#options");
  }
}
function repeatString(pattern, count) {
  if (count < 1) {
    return "";
  }
  let result = "";
  while (count > 1) {
    if (count & 1) {
      result += pattern;
    }
    count >>= 1;
    pattern += pattern;
  }
  return result + pattern;
}
function outputLink(cap, link, raw, lexer2) {
  const href = link.href;
  const title = link.title ? escape(link.title) : null;
  const text = cap[1].replace(/\\([\[\]])/g, "$1");
  if (cap[0].charAt(0) !== "!") {
    lexer2.state.inLink = true;
    const token = {
      type: "link",
      raw,
      href,
      title,
      text,
      tokens: lexer2.inlineTokens(text)
    };
    lexer2.state.inLink = false;
    return token;
  }
  return {
    type: "image",
    raw,
    href,
    title,
    text: escape(text)
  };
}
function indentCodeCompensation(raw, text) {
  const matchIndentToCode = raw.match(/^(\s+)(?:```)/);
  if (matchIndentToCode === null) {
    return text;
  }
  const indentToCode = matchIndentToCode[1];
  return text.split("\n").map((node) => {
    const matchIndentInNode = node.match(/^\s+/);
    if (matchIndentInNode === null) {
      return node;
    }
    const [indentInNode] = matchIndentInNode;
    if (indentInNode.length >= indentToCode.length) {
      return node.slice(indentToCode.length);
    }
    return node;
  }).join("\n");
}
var Tokenizer = class {
  constructor(options2) {
    this.options = options2 || defaults;
  }
  space(src) {
    const cap = this.rules.block.newline.exec(src);
    if (cap && cap[0].length > 0) {
      return {
        type: "space",
        raw: cap[0]
      };
    }
  }
  code(src) {
    const cap = this.rules.block.code.exec(src);
    if (cap) {
      const text = cap[0].replace(/^ {1,4}/gm, "");
      return {
        type: "code",
        raw: cap[0],
        codeBlockStyle: "indented",
        text: !this.options.pedantic ? rtrim(text, "\n") : text
      };
    }
  }
  fences(src) {
    const cap = this.rules.block.fences.exec(src);
    if (cap) {
      const raw = cap[0];
      const text = indentCodeCompensation(raw, cap[3] || "");
      return {
        type: "code",
        raw,
        lang: cap[2] ? cap[2].trim().replace(this.rules.inline._escapes, "$1") : cap[2],
        text
      };
    }
  }
  heading(src) {
    const cap = this.rules.block.heading.exec(src);
    if (cap) {
      let text = cap[2].trim();
      if (/#$/.test(text)) {
        const trimmed = rtrim(text, "#");
        if (this.options.pedantic) {
          text = trimmed.trim();
        } else if (!trimmed || / $/.test(trimmed)) {
          text = trimmed.trim();
        }
      }
      return {
        type: "heading",
        raw: cap[0],
        depth: cap[1].length,
        text,
        tokens: this.lexer.inline(text)
      };
    }
  }
  hr(src) {
    const cap = this.rules.block.hr.exec(src);
    if (cap) {
      return {
        type: "hr",
        raw: cap[0]
      };
    }
  }
  blockquote(src) {
    const cap = this.rules.block.blockquote.exec(src);
    if (cap) {
      const text = cap[0].replace(/^ *>[ \t]?/gm, "");
      const top = this.lexer.state.top;
      this.lexer.state.top = true;
      const tokens = this.lexer.blockTokens(text);
      this.lexer.state.top = top;
      return {
        type: "blockquote",
        raw: cap[0],
        tokens,
        text
      };
    }
  }
  list(src) {
    let cap = this.rules.block.list.exec(src);
    if (cap) {
      let raw, istask, ischecked, indent, i, blankLine, endsWithBlankLine, line, nextLine, rawLine, itemContents, endEarly;
      let bull = cap[1].trim();
      const isordered = bull.length > 1;
      const list = {
        type: "list",
        raw: "",
        ordered: isordered,
        start: isordered ? +bull.slice(0, -1) : "",
        loose: false,
        items: []
      };
      bull = isordered ? `\\d{1,9}\\${bull.slice(-1)}` : `\\${bull}`;
      if (this.options.pedantic) {
        bull = isordered ? bull : "[*+-]";
      }
      const itemRegex = new RegExp(`^( {0,3}${bull})((?:[	 ][^\\n]*)?(?:\\n|$))`);
      while (src) {
        endEarly = false;
        if (!(cap = itemRegex.exec(src))) {
          break;
        }
        if (this.rules.block.hr.test(src)) {
          break;
        }
        raw = cap[0];
        src = src.substring(raw.length);
        line = cap[2].split("\n", 1)[0].replace(/^\t+/, (t2) => " ".repeat(3 * t2.length));
        nextLine = src.split("\n", 1)[0];
        if (this.options.pedantic) {
          indent = 2;
          itemContents = line.trimLeft();
        } else {
          indent = cap[2].search(/[^ ]/);
          indent = indent > 4 ? 1 : indent;
          itemContents = line.slice(indent);
          indent += cap[1].length;
        }
        blankLine = false;
        if (!line && /^ *$/.test(nextLine)) {
          raw += nextLine + "\n";
          src = src.substring(nextLine.length + 1);
          endEarly = true;
        }
        if (!endEarly) {
          const nextBulletRegex = new RegExp(`^ {0,${Math.min(3, indent - 1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`);
          const hrRegex = new RegExp(`^ {0,${Math.min(3, indent - 1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`);
          const fencesBeginRegex = new RegExp(`^ {0,${Math.min(3, indent - 1)}}(?:\`\`\`|~~~)`);
          const headingBeginRegex = new RegExp(`^ {0,${Math.min(3, indent - 1)}}#`);
          while (src) {
            rawLine = src.split("\n", 1)[0];
            nextLine = rawLine;
            if (this.options.pedantic) {
              nextLine = nextLine.replace(/^ {1,4}(?=( {4})*[^ ])/g, "  ");
            }
            if (fencesBeginRegex.test(nextLine)) {
              break;
            }
            if (headingBeginRegex.test(nextLine)) {
              break;
            }
            if (nextBulletRegex.test(nextLine)) {
              break;
            }
            if (hrRegex.test(src)) {
              break;
            }
            if (nextLine.search(/[^ ]/) >= indent || !nextLine.trim()) {
              itemContents += "\n" + nextLine.slice(indent);
            } else {
              if (blankLine) {
                break;
              }
              if (line.search(/[^ ]/) >= 4) {
                break;
              }
              if (fencesBeginRegex.test(line)) {
                break;
              }
              if (headingBeginRegex.test(line)) {
                break;
              }
              if (hrRegex.test(line)) {
                break;
              }
              itemContents += "\n" + nextLine;
            }
            if (!blankLine && !nextLine.trim()) {
              blankLine = true;
            }
            raw += rawLine + "\n";
            src = src.substring(rawLine.length + 1);
            line = nextLine.slice(indent);
          }
        }
        if (!list.loose) {
          if (endsWithBlankLine) {
            list.loose = true;
          } else if (/\n *\n *$/.test(raw)) {
            endsWithBlankLine = true;
          }
        }
        if (this.options.gfm) {
          istask = /^\[[ xX]\] /.exec(itemContents);
          if (istask) {
            ischecked = istask[0] !== "[ ] ";
            itemContents = itemContents.replace(/^\[[ xX]\] +/, "");
          }
        }
        list.items.push({
          type: "list_item",
          raw,
          task: !!istask,
          checked: ischecked,
          loose: false,
          text: itemContents
        });
        list.raw += raw;
      }
      list.items[list.items.length - 1].raw = raw.trimRight();
      list.items[list.items.length - 1].text = itemContents.trimRight();
      list.raw = list.raw.trimRight();
      const l = list.items.length;
      for (i = 0; i < l; i++) {
        this.lexer.state.top = false;
        list.items[i].tokens = this.lexer.blockTokens(list.items[i].text, []);
        if (!list.loose) {
          const spacers = list.items[i].tokens.filter((t2) => t2.type === "space");
          const hasMultipleLineBreaks = spacers.length > 0 && spacers.some((t2) => /\n.*\n/.test(t2.raw));
          list.loose = hasMultipleLineBreaks;
        }
      }
      if (list.loose) {
        for (i = 0; i < l; i++) {
          list.items[i].loose = true;
        }
      }
      return list;
    }
  }
  html(src) {
    const cap = this.rules.block.html.exec(src);
    if (cap) {
      const token = {
        type: "html",
        raw: cap[0],
        pre: !this.options.sanitizer && (cap[1] === "pre" || cap[1] === "script" || cap[1] === "style"),
        text: cap[0]
      };
      if (this.options.sanitize) {
        const text = this.options.sanitizer ? this.options.sanitizer(cap[0]) : escape(cap[0]);
        token.type = "paragraph";
        token.text = text;
        token.tokens = this.lexer.inline(text);
      }
      return token;
    }
  }
  def(src) {
    const cap = this.rules.block.def.exec(src);
    if (cap) {
      const tag = cap[1].toLowerCase().replace(/\s+/g, " ");
      const href = cap[2] ? cap[2].replace(/^<(.*)>$/, "$1").replace(this.rules.inline._escapes, "$1") : "";
      const title = cap[3] ? cap[3].substring(1, cap[3].length - 1).replace(this.rules.inline._escapes, "$1") : cap[3];
      return {
        type: "def",
        tag,
        raw: cap[0],
        href,
        title
      };
    }
  }
  table(src) {
    const cap = this.rules.block.table.exec(src);
    if (cap) {
      const item = {
        type: "table",
        header: splitCells(cap[1]).map((c) => {
          return { text: c };
        }),
        align: cap[2].replace(/^ *|\| *$/g, "").split(/ *\| */),
        rows: cap[3] && cap[3].trim() ? cap[3].replace(/\n[ \t]*$/, "").split("\n") : []
      };
      if (item.header.length === item.align.length) {
        item.raw = cap[0];
        let l = item.align.length;
        let i, j, k, row;
        for (i = 0; i < l; i++) {
          if (/^ *-+: *$/.test(item.align[i])) {
            item.align[i] = "right";
          } else if (/^ *:-+: *$/.test(item.align[i])) {
            item.align[i] = "center";
          } else if (/^ *:-+ *$/.test(item.align[i])) {
            item.align[i] = "left";
          } else {
            item.align[i] = null;
          }
        }
        l = item.rows.length;
        for (i = 0; i < l; i++) {
          item.rows[i] = splitCells(item.rows[i], item.header.length).map((c) => {
            return { text: c };
          });
        }
        l = item.header.length;
        for (j = 0; j < l; j++) {
          item.header[j].tokens = this.lexer.inline(item.header[j].text);
        }
        l = item.rows.length;
        for (j = 0; j < l; j++) {
          row = item.rows[j];
          for (k = 0; k < row.length; k++) {
            row[k].tokens = this.lexer.inline(row[k].text);
          }
        }
        return item;
      }
    }
  }
  lheading(src) {
    const cap = this.rules.block.lheading.exec(src);
    if (cap) {
      return {
        type: "heading",
        raw: cap[0],
        depth: cap[2].charAt(0) === "=" ? 1 : 2,
        text: cap[1],
        tokens: this.lexer.inline(cap[1])
      };
    }
  }
  paragraph(src) {
    const cap = this.rules.block.paragraph.exec(src);
    if (cap) {
      const text = cap[1].charAt(cap[1].length - 1) === "\n" ? cap[1].slice(0, -1) : cap[1];
      return {
        type: "paragraph",
        raw: cap[0],
        text,
        tokens: this.lexer.inline(text)
      };
    }
  }
  text(src) {
    const cap = this.rules.block.text.exec(src);
    if (cap) {
      return {
        type: "text",
        raw: cap[0],
        text: cap[0],
        tokens: this.lexer.inline(cap[0])
      };
    }
  }
  escape(src) {
    const cap = this.rules.inline.escape.exec(src);
    if (cap) {
      return {
        type: "escape",
        raw: cap[0],
        text: escape(cap[1])
      };
    }
  }
  tag(src) {
    const cap = this.rules.inline.tag.exec(src);
    if (cap) {
      if (!this.lexer.state.inLink && /^<a /i.test(cap[0])) {
        this.lexer.state.inLink = true;
      } else if (this.lexer.state.inLink && /^<\/a>/i.test(cap[0])) {
        this.lexer.state.inLink = false;
      }
      if (!this.lexer.state.inRawBlock && /^<(pre|code|kbd|script)(\s|>)/i.test(cap[0])) {
        this.lexer.state.inRawBlock = true;
      } else if (this.lexer.state.inRawBlock && /^<\/(pre|code|kbd|script)(\s|>)/i.test(cap[0])) {
        this.lexer.state.inRawBlock = false;
      }
      return {
        type: this.options.sanitize ? "text" : "html",
        raw: cap[0],
        inLink: this.lexer.state.inLink,
        inRawBlock: this.lexer.state.inRawBlock,
        text: this.options.sanitize ? this.options.sanitizer ? this.options.sanitizer(cap[0]) : escape(cap[0]) : cap[0]
      };
    }
  }
  link(src) {
    const cap = this.rules.inline.link.exec(src);
    if (cap) {
      const trimmedUrl = cap[2].trim();
      if (!this.options.pedantic && /^</.test(trimmedUrl)) {
        if (!/>$/.test(trimmedUrl)) {
          return;
        }
        const rtrimSlash = rtrim(trimmedUrl.slice(0, -1), "\\");
        if ((trimmedUrl.length - rtrimSlash.length) % 2 === 0) {
          return;
        }
      } else {
        const lastParenIndex = findClosingBracket(cap[2], "()");
        if (lastParenIndex > -1) {
          const start = cap[0].indexOf("!") === 0 ? 5 : 4;
          const linkLen = start + cap[1].length + lastParenIndex;
          cap[2] = cap[2].substring(0, lastParenIndex);
          cap[0] = cap[0].substring(0, linkLen).trim();
          cap[3] = "";
        }
      }
      let href = cap[2];
      let title = "";
      if (this.options.pedantic) {
        const link = /^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(href);
        if (link) {
          href = link[1];
          title = link[3];
        }
      } else {
        title = cap[3] ? cap[3].slice(1, -1) : "";
      }
      href = href.trim();
      if (/^</.test(href)) {
        if (this.options.pedantic && !/>$/.test(trimmedUrl)) {
          href = href.slice(1);
        } else {
          href = href.slice(1, -1);
        }
      }
      return outputLink(cap, {
        href: href ? href.replace(this.rules.inline._escapes, "$1") : href,
        title: title ? title.replace(this.rules.inline._escapes, "$1") : title
      }, cap[0], this.lexer);
    }
  }
  reflink(src, links) {
    let cap;
    if ((cap = this.rules.inline.reflink.exec(src)) || (cap = this.rules.inline.nolink.exec(src))) {
      let link = (cap[2] || cap[1]).replace(/\s+/g, " ");
      link = links[link.toLowerCase()];
      if (!link) {
        const text = cap[0].charAt(0);
        return {
          type: "text",
          raw: text,
          text
        };
      }
      return outputLink(cap, link, cap[0], this.lexer);
    }
  }
  emStrong(src, maskedSrc, prevChar = "") {
    let match = this.rules.inline.emStrong.lDelim.exec(src);
    if (!match)
      return;
    if (match[3] && prevChar.match(/[\p{L}\p{N}]/u))
      return;
    const nextChar = match[1] || match[2] || "";
    if (!nextChar || nextChar && (prevChar === "" || this.rules.inline.punctuation.exec(prevChar))) {
      const lLength = match[0].length - 1;
      let rDelim, rLength, delimTotal = lLength, midDelimTotal = 0;
      const endReg = match[0][0] === "*" ? this.rules.inline.emStrong.rDelimAst : this.rules.inline.emStrong.rDelimUnd;
      endReg.lastIndex = 0;
      maskedSrc = maskedSrc.slice(-1 * src.length + lLength);
      while ((match = endReg.exec(maskedSrc)) != null) {
        rDelim = match[1] || match[2] || match[3] || match[4] || match[5] || match[6];
        if (!rDelim)
          continue;
        rLength = rDelim.length;
        if (match[3] || match[4]) {
          delimTotal += rLength;
          continue;
        } else if (match[5] || match[6]) {
          if (lLength % 3 && !((lLength + rLength) % 3)) {
            midDelimTotal += rLength;
            continue;
          }
        }
        delimTotal -= rLength;
        if (delimTotal > 0)
          continue;
        rLength = Math.min(rLength, rLength + delimTotal + midDelimTotal);
        const raw = src.slice(0, lLength + match.index + (match[0].length - rDelim.length) + rLength);
        if (Math.min(lLength, rLength) % 2) {
          const text2 = raw.slice(1, -1);
          return {
            type: "em",
            raw,
            text: text2,
            tokens: this.lexer.inlineTokens(text2)
          };
        }
        const text = raw.slice(2, -2);
        return {
          type: "strong",
          raw,
          text,
          tokens: this.lexer.inlineTokens(text)
        };
      }
    }
  }
  codespan(src) {
    const cap = this.rules.inline.code.exec(src);
    if (cap) {
      let text = cap[2].replace(/\n/g, " ");
      const hasNonSpaceChars = /[^ ]/.test(text);
      const hasSpaceCharsOnBothEnds = /^ /.test(text) && / $/.test(text);
      if (hasNonSpaceChars && hasSpaceCharsOnBothEnds) {
        text = text.substring(1, text.length - 1);
      }
      text = escape(text, true);
      return {
        type: "codespan",
        raw: cap[0],
        text
      };
    }
  }
  br(src) {
    const cap = this.rules.inline.br.exec(src);
    if (cap) {
      return {
        type: "br",
        raw: cap[0]
      };
    }
  }
  del(src) {
    const cap = this.rules.inline.del.exec(src);
    if (cap) {
      return {
        type: "del",
        raw: cap[0],
        text: cap[2],
        tokens: this.lexer.inlineTokens(cap[2])
      };
    }
  }
  autolink(src, mangle2) {
    const cap = this.rules.inline.autolink.exec(src);
    if (cap) {
      let text, href;
      if (cap[2] === "@") {
        text = escape(this.options.mangle ? mangle2(cap[1]) : cap[1]);
        href = "mailto:" + text;
      } else {
        text = escape(cap[1]);
        href = text;
      }
      return {
        type: "link",
        raw: cap[0],
        text,
        href,
        tokens: [
          {
            type: "text",
            raw: text,
            text
          }
        ]
      };
    }
  }
  url(src, mangle2) {
    let cap;
    if (cap = this.rules.inline.url.exec(src)) {
      let text, href;
      if (cap[2] === "@") {
        text = escape(this.options.mangle ? mangle2(cap[0]) : cap[0]);
        href = "mailto:" + text;
      } else {
        let prevCapZero;
        do {
          prevCapZero = cap[0];
          cap[0] = this.rules.inline._backpedal.exec(cap[0])[0];
        } while (prevCapZero !== cap[0]);
        text = escape(cap[0]);
        if (cap[1] === "www.") {
          href = "http://" + cap[0];
        } else {
          href = cap[0];
        }
      }
      return {
        type: "link",
        raw: cap[0],
        text,
        href,
        tokens: [
          {
            type: "text",
            raw: text,
            text
          }
        ]
      };
    }
  }
  inlineText(src, smartypants2) {
    const cap = this.rules.inline.text.exec(src);
    if (cap) {
      let text;
      if (this.lexer.state.inRawBlock) {
        text = this.options.sanitize ? this.options.sanitizer ? this.options.sanitizer(cap[0]) : escape(cap[0]) : cap[0];
      } else {
        text = escape(this.options.smartypants ? smartypants2(cap[0]) : cap[0]);
      }
      return {
        type: "text",
        raw: cap[0],
        text
      };
    }
  }
};
var block = {
  newline: /^(?: *(?:\n|$))+/,
  code: /^( {4}[^\n]+(?:\n(?: *(?:\n|$))*)?)+/,
  fences: /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,
  hr: /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,
  heading: /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,
  blockquote: /^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/,
  list: /^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/,
  html: "^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n *)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$))",
  def: /^ {0,3}\[(label)\]: *(?:\n *)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n *)?| *\n *)(title))? *(?:\n+|$)/,
  table: noopTest,
  lheading: /^((?:.|\n(?!\n))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
  // regex template, placeholders will be replaced according to different paragraph
  // interruption rules of commonmark and the original markdown spec:
  _paragraph: /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,
  text: /^[^\n]+/
};
block._label = /(?!\s*\])(?:\\.|[^\[\]\\])+/;
block._title = /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/;
block.def = edit(block.def).replace("label", block._label).replace("title", block._title).getRegex();
block.bullet = /(?:[*+-]|\d{1,9}[.)])/;
block.listItemStart = edit(/^( *)(bull) */).replace("bull", block.bullet).getRegex();
block.list = edit(block.list).replace(/bull/g, block.bullet).replace("hr", "\\n+(?=\\1?(?:(?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$))").replace("def", "\\n+(?=" + block.def.source + ")").getRegex();
block._tag = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul";
block._comment = /<!--(?!-?>)[\s\S]*?(?:-->|$)/;
block.html = edit(block.html, "i").replace("comment", block._comment).replace("tag", block._tag).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex();
block.paragraph = edit(block._paragraph).replace("hr", block.hr).replace("heading", " {0,3}#{1,6} ").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", block._tag).getRegex();
block.blockquote = edit(block.blockquote).replace("paragraph", block.paragraph).getRegex();
block.normal = { ...block };
block.gfm = {
  ...block.normal,
  table: "^ *([^\\n ].*\\|.*)\\n {0,3}(?:\\| *)?(:?-+:? *(?:\\| *:?-+:? *)*)(?:\\| *)?(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)"
  // Cells
};
block.gfm.table = edit(block.gfm.table).replace("hr", block.hr).replace("heading", " {0,3}#{1,6} ").replace("blockquote", " {0,3}>").replace("code", " {4}[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", block._tag).getRegex();
block.gfm.paragraph = edit(block._paragraph).replace("hr", block.hr).replace("heading", " {0,3}#{1,6} ").replace("|lheading", "").replace("table", block.gfm.table).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", block._tag).getRegex();
block.pedantic = {
  ...block.normal,
  html: edit(
    `^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`
  ).replace("comment", block._comment).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),
  def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
  heading: /^(#{1,6})(.*)(?:\n+|$)/,
  fences: noopTest,
  // fences not supported
  lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
  paragraph: edit(block.normal._paragraph).replace("hr", block.hr).replace("heading", " *#{1,6} *[^\n]").replace("lheading", block.lheading).replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").getRegex()
};
var inline = {
  escape: /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,
  autolink: /^<(scheme:[^\s\x00-\x1f<>]*|email)>/,
  url: noopTest,
  tag: "^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>",
  // CDATA section
  link: /^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/,
  reflink: /^!?\[(label)\]\[(ref)\]/,
  nolink: /^!?\[(ref)\](?:\[\])?/,
  reflinkSearch: "reflink|nolink(?!\\()",
  emStrong: {
    lDelim: /^(?:\*+(?:([punct_])|[^\s*]))|^_+(?:([punct*])|([^\s_]))/,
    //        (1) and (2) can only be a Right Delimiter. (3) and (4) can only be Left.  (5) and (6) can be either Left or Right.
    //          () Skip orphan inside strong                                      () Consume to delim     (1) #***                (2) a***#, a***                             (3) #***a, ***a                 (4) ***#              (5) #***#                 (6) a***a
    rDelimAst: /^(?:[^_*\\]|\\.)*?\_\_(?:[^_*\\]|\\.)*?\*(?:[^_*\\]|\\.)*?(?=\_\_)|(?:[^*\\]|\\.)+(?=[^*])|[punct_](\*+)(?=[\s]|$)|(?:[^punct*_\s\\]|\\.)(\*+)(?=[punct_\s]|$)|[punct_\s](\*+)(?=[^punct*_\s])|[\s](\*+)(?=[punct_])|[punct_](\*+)(?=[punct_])|(?:[^punct*_\s\\]|\\.)(\*+)(?=[^punct*_\s])/,
    rDelimUnd: /^(?:[^_*\\]|\\.)*?\*\*(?:[^_*\\]|\\.)*?\_(?:[^_*\\]|\\.)*?(?=\*\*)|(?:[^_\\]|\\.)+(?=[^_])|[punct*](\_+)(?=[\s]|$)|(?:[^punct*_\s\\]|\\.)(\_+)(?=[punct*\s]|$)|[punct*\s](\_+)(?=[^punct*_\s])|[\s](\_+)(?=[punct*])|[punct*](\_+)(?=[punct*])/
    // ^- Not allowed for _
  },
  code: /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,
  br: /^( {2,}|\\)\n(?!\s*$)/,
  del: noopTest,
  text: /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,
  punctuation: /^([\spunctuation])/
};
inline._punctuation = "!\"#$%&'()+\\-.,/:;<=>?@\\[\\]`^{|}~";
inline.punctuation = edit(inline.punctuation).replace(/punctuation/g, inline._punctuation).getRegex();
inline.blockSkip = /\[[^\]]*?\]\([^\)]*?\)|`[^`]*?`|<[^>]*?>/g;
inline.escapedEmSt = /(?:^|[^\\])(?:\\\\)*\\[*_]/g;
inline._comment = edit(block._comment).replace("(?:-->|$)", "-->").getRegex();
inline.emStrong.lDelim = edit(inline.emStrong.lDelim).replace(/punct/g, inline._punctuation).getRegex();
inline.emStrong.rDelimAst = edit(inline.emStrong.rDelimAst, "g").replace(/punct/g, inline._punctuation).getRegex();
inline.emStrong.rDelimUnd = edit(inline.emStrong.rDelimUnd, "g").replace(/punct/g, inline._punctuation).getRegex();
inline._escapes = /\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/g;
inline._scheme = /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/;
inline._email = /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/;
inline.autolink = edit(inline.autolink).replace("scheme", inline._scheme).replace("email", inline._email).getRegex();
inline._attribute = /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/;
inline.tag = edit(inline.tag).replace("comment", inline._comment).replace("attribute", inline._attribute).getRegex();
inline._label = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/;
inline._href = /<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/;
inline._title = /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/;
inline.link = edit(inline.link).replace("label", inline._label).replace("href", inline._href).replace("title", inline._title).getRegex();
inline.reflink = edit(inline.reflink).replace("label", inline._label).replace("ref", block._label).getRegex();
inline.nolink = edit(inline.nolink).replace("ref", block._label).getRegex();
inline.reflinkSearch = edit(inline.reflinkSearch, "g").replace("reflink", inline.reflink).replace("nolink", inline.nolink).getRegex();
inline.normal = { ...inline };
inline.pedantic = {
  ...inline.normal,
  strong: {
    start: /^__|\*\*/,
    middle: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
    endAst: /\*\*(?!\*)/g,
    endUnd: /__(?!_)/g
  },
  em: {
    start: /^_|\*/,
    middle: /^()\*(?=\S)([\s\S]*?\S)\*(?!\*)|^_(?=\S)([\s\S]*?\S)_(?!_)/,
    endAst: /\*(?!\*)/g,
    endUnd: /_(?!_)/g
  },
  link: edit(/^!?\[(label)\]\((.*?)\)/).replace("label", inline._label).getRegex(),
  reflink: edit(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", inline._label).getRegex()
};
inline.gfm = {
  ...inline.normal,
  escape: edit(inline.escape).replace("])", "~|])").getRegex(),
  _extended_email: /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/,
  url: /^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,
  _backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,
  del: /^(~~?)(?=[^\s~])([\s\S]*?[^\s~])\1(?=[^~]|$)/,
  text: /^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/
};
inline.gfm.url = edit(inline.gfm.url, "i").replace("email", inline.gfm._extended_email).getRegex();
inline.breaks = {
  ...inline.gfm,
  br: edit(inline.br).replace("{2,}", "*").getRegex(),
  text: edit(inline.gfm.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex()
};
function smartypants(text) {
  return text.replace(/---/g, "—").replace(/--/g, "–").replace(/(^|[-\u2014/(\[{"\s])'/g, "$1‘").replace(/'/g, "’").replace(/(^|[-\u2014/(\[{\u2018\s])"/g, "$1“").replace(/"/g, "”").replace(/\.{3}/g, "…");
}
function mangle(text) {
  let out = "", i, ch;
  const l = text.length;
  for (i = 0; i < l; i++) {
    ch = text.charCodeAt(i);
    if (Math.random() > 0.5) {
      ch = "x" + ch.toString(16);
    }
    out += "&#" + ch + ";";
  }
  return out;
}
var Lexer = class _Lexer {
  constructor(options2) {
    this.tokens = [];
    this.tokens.links = /* @__PURE__ */ Object.create(null);
    this.options = options2 || defaults;
    this.options.tokenizer = this.options.tokenizer || new Tokenizer();
    this.tokenizer = this.options.tokenizer;
    this.tokenizer.options = this.options;
    this.tokenizer.lexer = this;
    this.inlineQueue = [];
    this.state = {
      inLink: false,
      inRawBlock: false,
      top: true
    };
    const rules = {
      block: block.normal,
      inline: inline.normal
    };
    if (this.options.pedantic) {
      rules.block = block.pedantic;
      rules.inline = inline.pedantic;
    } else if (this.options.gfm) {
      rules.block = block.gfm;
      if (this.options.breaks) {
        rules.inline = inline.breaks;
      } else {
        rules.inline = inline.gfm;
      }
    }
    this.tokenizer.rules = rules;
  }
  /**
   * Expose Rules
   */
  static get rules() {
    return {
      block,
      inline
    };
  }
  /**
   * Static Lex Method
   */
  static lex(src, options2) {
    const lexer2 = new _Lexer(options2);
    return lexer2.lex(src);
  }
  /**
   * Static Lex Inline Method
   */
  static lexInline(src, options2) {
    const lexer2 = new _Lexer(options2);
    return lexer2.inlineTokens(src);
  }
  /**
   * Preprocessing
   */
  lex(src) {
    src = src.replace(/\r\n|\r/g, "\n");
    this.blockTokens(src, this.tokens);
    let next;
    while (next = this.inlineQueue.shift()) {
      this.inlineTokens(next.src, next.tokens);
    }
    return this.tokens;
  }
  /**
   * Lexing
   */
  blockTokens(src, tokens = []) {
    if (this.options.pedantic) {
      src = src.replace(/\t/g, "    ").replace(/^ +$/gm, "");
    } else {
      src = src.replace(/^( *)(\t+)/gm, (_, leading, tabs) => {
        return leading + "    ".repeat(tabs.length);
      });
    }
    let token, lastToken, cutSrc, lastParagraphClipped;
    while (src) {
      if (this.options.extensions && this.options.extensions.block && this.options.extensions.block.some((extTokenizer) => {
        if (token = extTokenizer.call({ lexer: this }, src, tokens)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          return true;
        }
        return false;
      })) {
        continue;
      }
      if (token = this.tokenizer.space(src)) {
        src = src.substring(token.raw.length);
        if (token.raw.length === 1 && tokens.length > 0) {
          tokens[tokens.length - 1].raw += "\n";
        } else {
          tokens.push(token);
        }
        continue;
      }
      if (token = this.tokenizer.code(src)) {
        src = src.substring(token.raw.length);
        lastToken = tokens[tokens.length - 1];
        if (lastToken && (lastToken.type === "paragraph" || lastToken.type === "text")) {
          lastToken.raw += "\n" + token.raw;
          lastToken.text += "\n" + token.text;
          this.inlineQueue[this.inlineQueue.length - 1].src = lastToken.text;
        } else {
          tokens.push(token);
        }
        continue;
      }
      if (token = this.tokenizer.fences(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.heading(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.hr(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.blockquote(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.list(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.html(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.def(src)) {
        src = src.substring(token.raw.length);
        lastToken = tokens[tokens.length - 1];
        if (lastToken && (lastToken.type === "paragraph" || lastToken.type === "text")) {
          lastToken.raw += "\n" + token.raw;
          lastToken.text += "\n" + token.raw;
          this.inlineQueue[this.inlineQueue.length - 1].src = lastToken.text;
        } else if (!this.tokens.links[token.tag]) {
          this.tokens.links[token.tag] = {
            href: token.href,
            title: token.title
          };
        }
        continue;
      }
      if (token = this.tokenizer.table(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.lheading(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      cutSrc = src;
      if (this.options.extensions && this.options.extensions.startBlock) {
        let startIndex = Infinity;
        const tempSrc = src.slice(1);
        let tempStart;
        this.options.extensions.startBlock.forEach(function(getStartIndex) {
          tempStart = getStartIndex.call({ lexer: this }, tempSrc);
          if (typeof tempStart === "number" && tempStart >= 0) {
            startIndex = Math.min(startIndex, tempStart);
          }
        });
        if (startIndex < Infinity && startIndex >= 0) {
          cutSrc = src.substring(0, startIndex + 1);
        }
      }
      if (this.state.top && (token = this.tokenizer.paragraph(cutSrc))) {
        lastToken = tokens[tokens.length - 1];
        if (lastParagraphClipped && lastToken.type === "paragraph") {
          lastToken.raw += "\n" + token.raw;
          lastToken.text += "\n" + token.text;
          this.inlineQueue.pop();
          this.inlineQueue[this.inlineQueue.length - 1].src = lastToken.text;
        } else {
          tokens.push(token);
        }
        lastParagraphClipped = cutSrc.length !== src.length;
        src = src.substring(token.raw.length);
        continue;
      }
      if (token = this.tokenizer.text(src)) {
        src = src.substring(token.raw.length);
        lastToken = tokens[tokens.length - 1];
        if (lastToken && lastToken.type === "text") {
          lastToken.raw += "\n" + token.raw;
          lastToken.text += "\n" + token.text;
          this.inlineQueue.pop();
          this.inlineQueue[this.inlineQueue.length - 1].src = lastToken.text;
        } else {
          tokens.push(token);
        }
        continue;
      }
      if (src) {
        const errMsg = "Infinite loop on byte: " + src.charCodeAt(0);
        if (this.options.silent) {
          console.error(errMsg);
          break;
        } else {
          throw new Error(errMsg);
        }
      }
    }
    this.state.top = true;
    return tokens;
  }
  inline(src, tokens = []) {
    this.inlineQueue.push({ src, tokens });
    return tokens;
  }
  /**
   * Lexing/Compiling
   */
  inlineTokens(src, tokens = []) {
    let token, lastToken, cutSrc;
    let maskedSrc = src;
    let match;
    let keepPrevChar, prevChar;
    if (this.tokens.links) {
      const links = Object.keys(this.tokens.links);
      if (links.length > 0) {
        while ((match = this.tokenizer.rules.inline.reflinkSearch.exec(maskedSrc)) != null) {
          if (links.includes(match[0].slice(match[0].lastIndexOf("[") + 1, -1))) {
            maskedSrc = maskedSrc.slice(0, match.index) + "[" + repeatString("a", match[0].length - 2) + "]" + maskedSrc.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex);
          }
        }
      }
    }
    while ((match = this.tokenizer.rules.inline.blockSkip.exec(maskedSrc)) != null) {
      maskedSrc = maskedSrc.slice(0, match.index) + "[" + repeatString("a", match[0].length - 2) + "]" + maskedSrc.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
    }
    while ((match = this.tokenizer.rules.inline.escapedEmSt.exec(maskedSrc)) != null) {
      maskedSrc = maskedSrc.slice(0, match.index + match[0].length - 2) + "++" + maskedSrc.slice(this.tokenizer.rules.inline.escapedEmSt.lastIndex);
      this.tokenizer.rules.inline.escapedEmSt.lastIndex--;
    }
    while (src) {
      if (!keepPrevChar) {
        prevChar = "";
      }
      keepPrevChar = false;
      if (this.options.extensions && this.options.extensions.inline && this.options.extensions.inline.some((extTokenizer) => {
        if (token = extTokenizer.call({ lexer: this }, src, tokens)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          return true;
        }
        return false;
      })) {
        continue;
      }
      if (token = this.tokenizer.escape(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.tag(src)) {
        src = src.substring(token.raw.length);
        lastToken = tokens[tokens.length - 1];
        if (lastToken && token.type === "text" && lastToken.type === "text") {
          lastToken.raw += token.raw;
          lastToken.text += token.text;
        } else {
          tokens.push(token);
        }
        continue;
      }
      if (token = this.tokenizer.link(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.reflink(src, this.tokens.links)) {
        src = src.substring(token.raw.length);
        lastToken = tokens[tokens.length - 1];
        if (lastToken && token.type === "text" && lastToken.type === "text") {
          lastToken.raw += token.raw;
          lastToken.text += token.text;
        } else {
          tokens.push(token);
        }
        continue;
      }
      if (token = this.tokenizer.emStrong(src, maskedSrc, prevChar)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.codespan(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.br(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.del(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.autolink(src, mangle)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (!this.state.inLink && (token = this.tokenizer.url(src, mangle))) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      cutSrc = src;
      if (this.options.extensions && this.options.extensions.startInline) {
        let startIndex = Infinity;
        const tempSrc = src.slice(1);
        let tempStart;
        this.options.extensions.startInline.forEach(function(getStartIndex) {
          tempStart = getStartIndex.call({ lexer: this }, tempSrc);
          if (typeof tempStart === "number" && tempStart >= 0) {
            startIndex = Math.min(startIndex, tempStart);
          }
        });
        if (startIndex < Infinity && startIndex >= 0) {
          cutSrc = src.substring(0, startIndex + 1);
        }
      }
      if (token = this.tokenizer.inlineText(cutSrc, smartypants)) {
        src = src.substring(token.raw.length);
        if (token.raw.slice(-1) !== "_") {
          prevChar = token.raw.slice(-1);
        }
        keepPrevChar = true;
        lastToken = tokens[tokens.length - 1];
        if (lastToken && lastToken.type === "text") {
          lastToken.raw += token.raw;
          lastToken.text += token.text;
        } else {
          tokens.push(token);
        }
        continue;
      }
      if (src) {
        const errMsg = "Infinite loop on byte: " + src.charCodeAt(0);
        if (this.options.silent) {
          console.error(errMsg);
          break;
        } else {
          throw new Error(errMsg);
        }
      }
    }
    return tokens;
  }
};
var Renderer = class {
  constructor(options2) {
    this.options = options2 || defaults;
  }
  code(code, infostring, escaped) {
    const lang = (infostring || "").match(/\S*/)[0];
    if (this.options.highlight) {
      const out = this.options.highlight(code, lang);
      if (out != null && out !== code) {
        escaped = true;
        code = out;
      }
    }
    code = code.replace(/\n$/, "") + "\n";
    if (!lang) {
      return "<pre><code>" + (escaped ? code : escape(code, true)) + "</code></pre>\n";
    }
    return '<pre><code class="' + this.options.langPrefix + escape(lang) + '">' + (escaped ? code : escape(code, true)) + "</code></pre>\n";
  }
  /**
   * @param {string} quote
   */
  blockquote(quote) {
    return `<blockquote>
${quote}</blockquote>
`;
  }
  html(html) {
    return html;
  }
  /**
   * @param {string} text
   * @param {string} level
   * @param {string} raw
   * @param {any} slugger
   */
  heading(text, level, raw, slugger) {
    if (this.options.headerIds) {
      const id = this.options.headerPrefix + slugger.slug(raw);
      return `<h${level} id="${id}">${text}</h${level}>
`;
    }
    return `<h${level}>${text}</h${level}>
`;
  }
  hr() {
    return this.options.xhtml ? "<hr/>\n" : "<hr>\n";
  }
  list(body, ordered, start) {
    const type = ordered ? "ol" : "ul", startatt = ordered && start !== 1 ? ' start="' + start + '"' : "";
    return "<" + type + startatt + ">\n" + body + "</" + type + ">\n";
  }
  /**
   * @param {string} text
   */
  listitem(text) {
    return `<li>${text}</li>
`;
  }
  checkbox(checked) {
    return "<input " + (checked ? 'checked="" ' : "") + 'disabled="" type="checkbox"' + (this.options.xhtml ? " /" : "") + "> ";
  }
  /**
   * @param {string} text
   */
  paragraph(text) {
    return `<p>${text}</p>
`;
  }
  /**
   * @param {string} header
   * @param {string} body
   */
  table(header, body) {
    if (body)
      body = `<tbody>${body}</tbody>`;
    return "<table>\n<thead>\n" + header + "</thead>\n" + body + "</table>\n";
  }
  /**
   * @param {string} content
   */
  tablerow(content) {
    return `<tr>
${content}</tr>
`;
  }
  tablecell(content, flags) {
    const type = flags.header ? "th" : "td";
    const tag = flags.align ? `<${type} align="${flags.align}">` : `<${type}>`;
    return tag + content + `</${type}>
`;
  }
  /**
   * span level renderer
   * @param {string} text
   */
  strong(text) {
    return `<strong>${text}</strong>`;
  }
  /**
   * @param {string} text
   */
  em(text) {
    return `<em>${text}</em>`;
  }
  /**
   * @param {string} text
   */
  codespan(text) {
    return `<code>${text}</code>`;
  }
  br() {
    return this.options.xhtml ? "<br/>" : "<br>";
  }
  /**
   * @param {string} text
   */
  del(text) {
    return `<del>${text}</del>`;
  }
  /**
   * @param {string} href
   * @param {string} title
   * @param {string} text
   */
  link(href, title, text) {
    href = cleanUrl(this.options.sanitize, this.options.baseUrl, href);
    if (href === null) {
      return text;
    }
    let out = '<a href="' + href + '"';
    if (title) {
      out += ' title="' + title + '"';
    }
    out += ">" + text + "</a>";
    return out;
  }
  /**
   * @param {string} href
   * @param {string} title
   * @param {string} text
   */
  image(href, title, text) {
    href = cleanUrl(this.options.sanitize, this.options.baseUrl, href);
    if (href === null) {
      return text;
    }
    let out = `<img src="${href}" alt="${text}"`;
    if (title) {
      out += ` title="${title}"`;
    }
    out += this.options.xhtml ? "/>" : ">";
    return out;
  }
  text(text) {
    return text;
  }
};
var TextRenderer = class {
  // no need for block level renderers
  strong(text) {
    return text;
  }
  em(text) {
    return text;
  }
  codespan(text) {
    return text;
  }
  del(text) {
    return text;
  }
  html(text) {
    return text;
  }
  text(text) {
    return text;
  }
  link(href, title, text) {
    return "" + text;
  }
  image(href, title, text) {
    return "" + text;
  }
  br() {
    return "";
  }
};
var Slugger = class {
  constructor() {
    this.seen = {};
  }
  /**
   * @param {string} value
   */
  serialize(value) {
    return value.toLowerCase().trim().replace(/<[!\/a-z].*?>/ig, "").replace(/[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g, "").replace(/\s/g, "-");
  }
  /**
   * Finds the next safe (unique) slug to use
   * @param {string} originalSlug
   * @param {boolean} isDryRun
   */
  getNextSafeSlug(originalSlug, isDryRun) {
    let slug = originalSlug;
    let occurenceAccumulator = 0;
    if (this.seen.hasOwnProperty(slug)) {
      occurenceAccumulator = this.seen[originalSlug];
      do {
        occurenceAccumulator++;
        slug = originalSlug + "-" + occurenceAccumulator;
      } while (this.seen.hasOwnProperty(slug));
    }
    if (!isDryRun) {
      this.seen[originalSlug] = occurenceAccumulator;
      this.seen[slug] = 0;
    }
    return slug;
  }
  /**
   * Convert string to unique id
   * @param {object} [options]
   * @param {boolean} [options.dryrun] Generates the next unique slug without
   * updating the internal accumulator.
   */
  slug(value, options2 = {}) {
    const slug = this.serialize(value);
    return this.getNextSafeSlug(slug, options2.dryrun);
  }
};
var Parser = class _Parser {
  constructor(options2) {
    this.options = options2 || defaults;
    this.options.renderer = this.options.renderer || new Renderer();
    this.renderer = this.options.renderer;
    this.renderer.options = this.options;
    this.textRenderer = new TextRenderer();
    this.slugger = new Slugger();
  }
  /**
   * Static Parse Method
   */
  static parse(tokens, options2) {
    const parser2 = new _Parser(options2);
    return parser2.parse(tokens);
  }
  /**
   * Static Parse Inline Method
   */
  static parseInline(tokens, options2) {
    const parser2 = new _Parser(options2);
    return parser2.parseInline(tokens);
  }
  /**
   * Parse Loop
   */
  parse(tokens, top = true) {
    let out = "", i, j, k, l2, l3, row, cell, header, body, token, ordered, start, loose, itemBody, item, checked, task, checkbox, ret;
    const l = tokens.length;
    for (i = 0; i < l; i++) {
      token = tokens[i];
      if (this.options.extensions && this.options.extensions.renderers && this.options.extensions.renderers[token.type]) {
        ret = this.options.extensions.renderers[token.type].call({ parser: this }, token);
        if (ret !== false || !["space", "hr", "heading", "code", "table", "blockquote", "list", "html", "paragraph", "text"].includes(token.type)) {
          out += ret || "";
          continue;
        }
      }
      switch (token.type) {
        case "space": {
          continue;
        }
        case "hr": {
          out += this.renderer.hr();
          continue;
        }
        case "heading": {
          out += this.renderer.heading(
            this.parseInline(token.tokens),
            token.depth,
            unescape(this.parseInline(token.tokens, this.textRenderer)),
            this.slugger
          );
          continue;
        }
        case "code": {
          out += this.renderer.code(
            token.text,
            token.lang,
            token.escaped
          );
          continue;
        }
        case "table": {
          header = "";
          cell = "";
          l2 = token.header.length;
          for (j = 0; j < l2; j++) {
            cell += this.renderer.tablecell(
              this.parseInline(token.header[j].tokens),
              { header: true, align: token.align[j] }
            );
          }
          header += this.renderer.tablerow(cell);
          body = "";
          l2 = token.rows.length;
          for (j = 0; j < l2; j++) {
            row = token.rows[j];
            cell = "";
            l3 = row.length;
            for (k = 0; k < l3; k++) {
              cell += this.renderer.tablecell(
                this.parseInline(row[k].tokens),
                { header: false, align: token.align[k] }
              );
            }
            body += this.renderer.tablerow(cell);
          }
          out += this.renderer.table(header, body);
          continue;
        }
        case "blockquote": {
          body = this.parse(token.tokens);
          out += this.renderer.blockquote(body);
          continue;
        }
        case "list": {
          ordered = token.ordered;
          start = token.start;
          loose = token.loose;
          l2 = token.items.length;
          body = "";
          for (j = 0; j < l2; j++) {
            item = token.items[j];
            checked = item.checked;
            task = item.task;
            itemBody = "";
            if (item.task) {
              checkbox = this.renderer.checkbox(checked);
              if (loose) {
                if (item.tokens.length > 0 && item.tokens[0].type === "paragraph") {
                  item.tokens[0].text = checkbox + " " + item.tokens[0].text;
                  if (item.tokens[0].tokens && item.tokens[0].tokens.length > 0 && item.tokens[0].tokens[0].type === "text") {
                    item.tokens[0].tokens[0].text = checkbox + " " + item.tokens[0].tokens[0].text;
                  }
                } else {
                  item.tokens.unshift({
                    type: "text",
                    text: checkbox
                  });
                }
              } else {
                itemBody += checkbox;
              }
            }
            itemBody += this.parse(item.tokens, loose);
            body += this.renderer.listitem(itemBody, task, checked);
          }
          out += this.renderer.list(body, ordered, start);
          continue;
        }
        case "html": {
          out += this.renderer.html(token.text);
          continue;
        }
        case "paragraph": {
          out += this.renderer.paragraph(this.parseInline(token.tokens));
          continue;
        }
        case "text": {
          body = token.tokens ? this.parseInline(token.tokens) : token.text;
          while (i + 1 < l && tokens[i + 1].type === "text") {
            token = tokens[++i];
            body += "\n" + (token.tokens ? this.parseInline(token.tokens) : token.text);
          }
          out += top ? this.renderer.paragraph(body) : body;
          continue;
        }
        default: {
          const errMsg = 'Token with "' + token.type + '" type was not found.';
          if (this.options.silent) {
            console.error(errMsg);
            return;
          } else {
            throw new Error(errMsg);
          }
        }
      }
    }
    return out;
  }
  /**
   * Parse Inline Tokens
   */
  parseInline(tokens, renderer) {
    renderer = renderer || this.renderer;
    let out = "", i, token, ret;
    const l = tokens.length;
    for (i = 0; i < l; i++) {
      token = tokens[i];
      if (this.options.extensions && this.options.extensions.renderers && this.options.extensions.renderers[token.type]) {
        ret = this.options.extensions.renderers[token.type].call({ parser: this }, token);
        if (ret !== false || !["escape", "html", "link", "image", "strong", "em", "codespan", "br", "del", "text"].includes(token.type)) {
          out += ret || "";
          continue;
        }
      }
      switch (token.type) {
        case "escape": {
          out += renderer.text(token.text);
          break;
        }
        case "html": {
          out += renderer.html(token.text);
          break;
        }
        case "link": {
          out += renderer.link(token.href, token.title, this.parseInline(token.tokens, renderer));
          break;
        }
        case "image": {
          out += renderer.image(token.href, token.title, token.text);
          break;
        }
        case "strong": {
          out += renderer.strong(this.parseInline(token.tokens, renderer));
          break;
        }
        case "em": {
          out += renderer.em(this.parseInline(token.tokens, renderer));
          break;
        }
        case "codespan": {
          out += renderer.codespan(token.text);
          break;
        }
        case "br": {
          out += renderer.br();
          break;
        }
        case "del": {
          out += renderer.del(this.parseInline(token.tokens, renderer));
          break;
        }
        case "text": {
          out += renderer.text(token.text);
          break;
        }
        default: {
          const errMsg = 'Token with "' + token.type + '" type was not found.';
          if (this.options.silent) {
            console.error(errMsg);
            return;
          } else {
            throw new Error(errMsg);
          }
        }
      }
    }
    return out;
  }
};
var Hooks = class {
  constructor(options2) {
    this.options = options2 || defaults;
  }
  /**
   * Process markdown before marked
   */
  preprocess(markdown) {
    return markdown;
  }
  /**
   * Process HTML after marked is finished
   */
  postprocess(html) {
    return html;
  }
};
__publicField(Hooks, "passThroughHooks", /* @__PURE__ */ new Set([
  "preprocess",
  "postprocess"
]));
function onError(silent, async, callback) {
  return (e2) => {
    e2.message += "\nPlease report this to https://github.com/markedjs/marked.";
    if (silent) {
      const msg = "<p>An error occurred:</p><pre>" + escape(e2.message + "", true) + "</pre>";
      if (async) {
        return Promise.resolve(msg);
      }
      if (callback) {
        callback(null, msg);
        return;
      }
      return msg;
    }
    if (async) {
      return Promise.reject(e2);
    }
    if (callback) {
      callback(e2);
      return;
    }
    throw e2;
  };
}
function parseMarkdown(lexer2, parser2) {
  return (src, opt, callback) => {
    if (typeof opt === "function") {
      callback = opt;
      opt = null;
    }
    const origOpt = { ...opt };
    opt = { ...marked.defaults, ...origOpt };
    const throwError = onError(opt.silent, opt.async, callback);
    if (typeof src === "undefined" || src === null) {
      return throwError(new Error("marked(): input parameter is undefined or null"));
    }
    if (typeof src !== "string") {
      return throwError(new Error("marked(): input parameter is of type " + Object.prototype.toString.call(src) + ", string expected"));
    }
    checkSanitizeDeprecation(opt);
    if (opt.hooks) {
      opt.hooks.options = opt;
    }
    if (callback) {
      const highlight = opt.highlight;
      let tokens;
      try {
        if (opt.hooks) {
          src = opt.hooks.preprocess(src);
        }
        tokens = lexer2(src, opt);
      } catch (e2) {
        return throwError(e2);
      }
      const done = function(err) {
        let out;
        if (!err) {
          try {
            if (opt.walkTokens) {
              marked.walkTokens(tokens, opt.walkTokens);
            }
            out = parser2(tokens, opt);
            if (opt.hooks) {
              out = opt.hooks.postprocess(out);
            }
          } catch (e2) {
            err = e2;
          }
        }
        opt.highlight = highlight;
        return err ? throwError(err) : callback(null, out);
      };
      if (!highlight || highlight.length < 3) {
        return done();
      }
      delete opt.highlight;
      if (!tokens.length)
        return done();
      let pending = 0;
      marked.walkTokens(tokens, function(token) {
        if (token.type === "code") {
          pending++;
          setTimeout(() => {
            highlight(token.text, token.lang, function(err, code) {
              if (err) {
                return done(err);
              }
              if (code != null && code !== token.text) {
                token.text = code;
                token.escaped = true;
              }
              pending--;
              if (pending === 0) {
                done();
              }
            });
          }, 0);
        }
      });
      if (pending === 0) {
        done();
      }
      return;
    }
    if (opt.async) {
      return Promise.resolve(opt.hooks ? opt.hooks.preprocess(src) : src).then((src2) => lexer2(src2, opt)).then((tokens) => opt.walkTokens ? Promise.all(marked.walkTokens(tokens, opt.walkTokens)).then(() => tokens) : tokens).then((tokens) => parser2(tokens, opt)).then((html) => opt.hooks ? opt.hooks.postprocess(html) : html).catch(throwError);
    }
    try {
      if (opt.hooks) {
        src = opt.hooks.preprocess(src);
      }
      const tokens = lexer2(src, opt);
      if (opt.walkTokens) {
        marked.walkTokens(tokens, opt.walkTokens);
      }
      let html = parser2(tokens, opt);
      if (opt.hooks) {
        html = opt.hooks.postprocess(html);
      }
      return html;
    } catch (e2) {
      return throwError(e2);
    }
  };
}
function marked(src, opt, callback) {
  return parseMarkdown(Lexer.lex, Parser.parse)(src, opt, callback);
}
marked.options = marked.setOptions = function(opt) {
  marked.defaults = { ...marked.defaults, ...opt };
  changeDefaults(marked.defaults);
  return marked;
};
marked.getDefaults = getDefaults;
marked.defaults = defaults;
marked.use = function(...args) {
  const extensions = marked.defaults.extensions || { renderers: {}, childTokens: {} };
  args.forEach((pack) => {
    const opts = { ...pack };
    opts.async = marked.defaults.async || opts.async || false;
    if (pack.extensions) {
      pack.extensions.forEach((ext) => {
        if (!ext.name) {
          throw new Error("extension name required");
        }
        if (ext.renderer) {
          const prevRenderer = extensions.renderers[ext.name];
          if (prevRenderer) {
            extensions.renderers[ext.name] = function(...args2) {
              let ret = ext.renderer.apply(this, args2);
              if (ret === false) {
                ret = prevRenderer.apply(this, args2);
              }
              return ret;
            };
          } else {
            extensions.renderers[ext.name] = ext.renderer;
          }
        }
        if (ext.tokenizer) {
          if (!ext.level || ext.level !== "block" && ext.level !== "inline") {
            throw new Error("extension level must be 'block' or 'inline'");
          }
          if (extensions[ext.level]) {
            extensions[ext.level].unshift(ext.tokenizer);
          } else {
            extensions[ext.level] = [ext.tokenizer];
          }
          if (ext.start) {
            if (ext.level === "block") {
              if (extensions.startBlock) {
                extensions.startBlock.push(ext.start);
              } else {
                extensions.startBlock = [ext.start];
              }
            } else if (ext.level === "inline") {
              if (extensions.startInline) {
                extensions.startInline.push(ext.start);
              } else {
                extensions.startInline = [ext.start];
              }
            }
          }
        }
        if (ext.childTokens) {
          extensions.childTokens[ext.name] = ext.childTokens;
        }
      });
      opts.extensions = extensions;
    }
    if (pack.renderer) {
      const renderer = marked.defaults.renderer || new Renderer();
      for (const prop in pack.renderer) {
        const prevRenderer = renderer[prop];
        renderer[prop] = (...args2) => {
          let ret = pack.renderer[prop].apply(renderer, args2);
          if (ret === false) {
            ret = prevRenderer.apply(renderer, args2);
          }
          return ret;
        };
      }
      opts.renderer = renderer;
    }
    if (pack.tokenizer) {
      const tokenizer = marked.defaults.tokenizer || new Tokenizer();
      for (const prop in pack.tokenizer) {
        const prevTokenizer = tokenizer[prop];
        tokenizer[prop] = (...args2) => {
          let ret = pack.tokenizer[prop].apply(tokenizer, args2);
          if (ret === false) {
            ret = prevTokenizer.apply(tokenizer, args2);
          }
          return ret;
        };
      }
      opts.tokenizer = tokenizer;
    }
    if (pack.hooks) {
      const hooks = marked.defaults.hooks || new Hooks();
      for (const prop in pack.hooks) {
        const prevHook = hooks[prop];
        if (Hooks.passThroughHooks.has(prop)) {
          hooks[prop] = (arg) => {
            if (marked.defaults.async) {
              return Promise.resolve(pack.hooks[prop].call(hooks, arg)).then((ret2) => {
                return prevHook.call(hooks, ret2);
              });
            }
            const ret = pack.hooks[prop].call(hooks, arg);
            return prevHook.call(hooks, ret);
          };
        } else {
          hooks[prop] = (...args2) => {
            let ret = pack.hooks[prop].apply(hooks, args2);
            if (ret === false) {
              ret = prevHook.apply(hooks, args2);
            }
            return ret;
          };
        }
      }
      opts.hooks = hooks;
    }
    if (pack.walkTokens) {
      const walkTokens2 = marked.defaults.walkTokens;
      opts.walkTokens = function(token) {
        let values = [];
        values.push(pack.walkTokens.call(this, token));
        if (walkTokens2) {
          values = values.concat(walkTokens2.call(this, token));
        }
        return values;
      };
    }
    marked.setOptions(opts);
  });
};
marked.walkTokens = function(tokens, callback) {
  let values = [];
  for (const token of tokens) {
    values = values.concat(callback.call(marked, token));
    switch (token.type) {
      case "table": {
        for (const cell of token.header) {
          values = values.concat(marked.walkTokens(cell.tokens, callback));
        }
        for (const row of token.rows) {
          for (const cell of row) {
            values = values.concat(marked.walkTokens(cell.tokens, callback));
          }
        }
        break;
      }
      case "list": {
        values = values.concat(marked.walkTokens(token.items, callback));
        break;
      }
      default: {
        if (marked.defaults.extensions && marked.defaults.extensions.childTokens && marked.defaults.extensions.childTokens[token.type]) {
          marked.defaults.extensions.childTokens[token.type].forEach(function(childTokens) {
            values = values.concat(marked.walkTokens(token[childTokens], callback));
          });
        } else if (token.tokens) {
          values = values.concat(marked.walkTokens(token.tokens, callback));
        }
      }
    }
  }
  return values;
};
marked.parseInline = parseMarkdown(Lexer.lexInline, Parser.parseInline);
marked.Parser = Parser;
marked.parser = Parser.parse;
marked.Renderer = Renderer;
marked.TextRenderer = TextRenderer;
marked.Lexer = Lexer;
marked.lexer = Lexer.lex;
marked.Tokenizer = Tokenizer;
marked.Slugger = Slugger;
marked.Hooks = Hooks;
marked.parse = marked;
var options = marked.options;
var setOptions = marked.setOptions;
var use = marked.use;
var walkTokens = marked.walkTokens;
var parseInline = marked.parseInline;
var parser = Parser.parse;
var lexer = Lexer.lex;

// node_modules/.pnpm/@waline+client@2.15.8/node_modules/@waline/client/dist/component.mjs
var O = ({ size: t2 }) => h("svg", { class: "wl-close-icon", viewBox: "0 0 1024 1024", width: t2, height: t2 }, [h("path", { d: "M697.173 85.333h-369.92c-144.64 0-241.92 101.547-241.92 252.587v348.587c0 150.613 97.28 252.16 241.92 252.16h369.92c144.64 0 241.494-101.547 241.494-252.16V337.92c0-151.04-96.854-252.587-241.494-252.587z", fill: "currentColor" }), h("path", { d: "m640.683 587.52-75.947-75.861 75.904-75.862a37.29 37.29 0 0 0 0-52.778 37.205 37.205 0 0 0-52.779 0l-75.946 75.818-75.862-75.946a37.419 37.419 0 0 0-52.821 0 37.419 37.419 0 0 0 0 52.821l75.947 75.947-75.776 75.733a37.29 37.29 0 1 0 52.778 52.821l75.776-75.776 75.947 75.947a37.376 37.376 0 0 0 52.779-52.821z", fill: "#888" })]);
var V = () => h("svg", { viewBox: "0 0 1024 1024", width: "24", height: "24" }, h("path", { d: "m341.013 394.667 27.755 393.45h271.83l27.733-393.45h64.106l-28.01 397.952a64 64 0 0 1-63.83 59.498H368.768a64 64 0 0 1-63.83-59.52l-28.053-397.93h64.128zm139.307 19.818v298.667h-64V414.485h64zm117.013 0v298.667h-64V414.485h64zM181.333 288h640v64h-640v-64zm453.483-106.667v64h-256v-64h256z", fill: "red" }));
var T = () => h("svg", { viewBox: "0 0 1024 1024", width: "24", height: "24" }, h("path", { d: "M563.2 463.3 677 540c1.7 1.2 3.7 1.8 5.8 1.8.7 0 1.4-.1 2-.2 2.7-.5 5.1-2.1 6.6-4.4l25.3-37.8c1.5-2.3 2.1-5.1 1.6-7.8s-2.1-5.1-4.4-6.6l-73.6-49.1 73.6-49.1c2.3-1.5 3.9-3.9 4.4-6.6.5-2.7 0-5.5-1.6-7.8l-25.3-37.8a10.1 10.1 0 0 0-6.6-4.4c-.7-.1-1.3-.2-2-.2-2.1 0-4.1.6-5.8 1.8l-113.8 76.6c-9.2 6.2-14.7 16.4-14.7 27.5.1 11 5.5 21.3 14.7 27.4zM387 348.8h-45.5c-5.7 0-10.4 4.7-10.4 10.4v153.3c0 5.7 4.7 10.4 10.4 10.4H387c5.7 0 10.4-4.7 10.4-10.4V359.2c0-5.7-4.7-10.4-10.4-10.4zm333.8 241.3-41-20a10.3 10.3 0 0 0-8.1-.5c-2.6.9-4.8 2.9-5.9 5.4-30.1 64.9-93.1 109.1-164.4 115.2-5.7.5-9.9 5.5-9.5 11.2l3.9 45.5c.5 5.3 5 9.5 10.3 9.5h.9c94.8-8 178.5-66.5 218.6-152.7 2.4-5 .3-11.2-4.8-13.6zm186-186.1c-11.9-42-30.5-81.4-55.2-117.1-24.1-34.9-53.5-65.6-87.5-91.2-33.9-25.6-71.5-45.5-111.6-59.2-41.2-14-84.1-21.1-127.8-21.1h-1.2c-75.4 0-148.8 21.4-212.5 61.7-63.7 40.3-114.3 97.6-146.5 165.8-32.2 68.1-44.3 143.6-35.1 218.4 9.3 74.8 39.4 145 87.3 203.3.1.2.3.3.4.5l36.2 38.4c1.1 1.2 2.5 2.1 3.9 2.6 73.3 66.7 168.2 103.5 267.5 103.5 73.3 0 145.2-20.3 207.7-58.7 37.3-22.9 70.3-51.5 98.1-85 27.1-32.7 48.7-69.5 64.2-109.1 15.5-39.7 24.4-81.3 26.6-123.8 2.4-43.6-2.5-87-14.5-129zm-60.5 181.1c-8.3 37-22.8 72-43 104-19.7 31.1-44.3 58.6-73.1 81.7-28.8 23.1-61 41-95.7 53.4-35.6 12.7-72.9 19.1-110.9 19.1-82.6 0-161.7-30.6-222.8-86.2l-34.1-35.8c-23.9-29.3-42.4-62.2-55.1-97.7-12.4-34.7-18.8-71-19.2-107.9-.4-36.9 5.4-73.3 17.1-108.2 12-35.8 30-69.2 53.4-99.1 31.7-40.4 71.1-72 117.2-94.1 44.5-21.3 94-32.6 143.4-32.6 49.3 0 97 10.8 141.8 32 34.3 16.3 65.3 38.1 92 64.8 26.1 26 47.5 56 63.6 89.2 16.2 33.2 26.6 68.5 31 105.1 4.6 37.5 2.7 75.3-5.6 112.3z", fill: "currentColor" }));
var D = () => h("svg", { viewBox: "0 0 1024 1024", width: "24", height: "24" }, [h("path", { d: "M784 112H240c-88 0-160 72-160 160v480c0 88 72 160 160 160h544c88 0 160-72 160-160V272c0-88-72-160-160-160zm96 640c0 52.8-43.2 96-96 96H240c-52.8 0-96-43.2-96-96V272c0-52.8 43.2-96 96-96h544c52.8 0 96 43.2 96 96v480z", fill: "currentColor" }), h("path", { d: "M352 480c52.8 0 96-43.2 96-96s-43.2-96-96-96-96 43.2-96 96 43.2 96 96 96zm0-128c17.6 0 32 14.4 32 32s-14.4 32-32 32-32-14.4-32-32 14.4-32 32-32zm462.4 379.2-3.2-3.2-177.6-177.6c-25.6-25.6-65.6-25.6-91.2 0l-80 80-36.8-36.8c-25.6-25.6-65.6-25.6-91.2 0L200 728c-4.8 6.4-8 14.4-8 24 0 17.6 14.4 32 32 32 9.6 0 16-3.2 22.4-9.6L380.8 640l134.4 134.4c6.4 6.4 14.4 9.6 24 9.6 17.6 0 32-14.4 32-32 0-9.6-4.8-17.6-9.6-24l-52.8-52.8 80-80L769.6 776c6.4 4.8 12.8 8 20.8 8 17.6 0 32-14.4 32-32 0-8-3.2-16-8-20.8z", fill: "currentColor" })]);
var N = ({ active: t2 = false }) => h("svg", { viewBox: "0 0 1024 1024", width: "24", height: "24" }, [h("path", { d: "M850.654 323.804c-11.042-25.625-26.862-48.532-46.885-68.225-20.022-19.61-43.258-34.936-69.213-45.73-26.78-11.124-55.124-16.727-84.375-16.727-40.622 0-80.256 11.123-114.698 32.135A214.79 214.79 0 0 0 512 241.819a214.79 214.79 0 0 0-23.483-16.562c-34.442-21.012-74.076-32.135-114.698-32.135-29.25 0-57.595 5.603-84.375 16.727-25.872 10.711-49.19 26.12-69.213 45.73-20.105 19.693-35.843 42.6-46.885 68.225-11.453 26.615-17.303 54.877-17.303 83.963 0 27.439 5.603 56.03 16.727 85.117 9.31 24.307 22.659 49.52 39.715 74.981 27.027 40.293 64.188 82.316 110.33 124.915 76.465 70.615 152.189 119.394 155.402 121.371l19.528 12.525c8.652 5.52 19.776 5.52 28.427 0l19.529-12.525c3.213-2.06 78.854-50.756 155.401-121.371 46.143-42.6 83.304-84.622 110.33-124.915 17.057-25.46 30.487-50.674 39.716-74.981 11.124-29.087 16.727-57.678 16.727-85.117.082-29.086-5.768-57.348-17.221-83.963z" + (t2 ? "" : "M512 761.5S218.665 573.55 218.665 407.767c0-83.963 69.461-152.023 155.154-152.023 60.233 0 112.473 33.618 138.181 82.727 25.708-49.109 77.948-82.727 138.18-82.727 85.694 0 155.155 68.06 155.155 152.023C805.335 573.551 512 761.5 512 761.5z"), fill: t2 ? "red" : "currentColor" })]);
var B = () => h("svg", { viewBox: "0 0 1024 1024", width: "24", height: "24" }, [h("path", { d: "M710.816 654.301c70.323-96.639 61.084-230.578-23.705-314.843-46.098-46.098-107.183-71.109-172.28-71.109-65.008 0-126.092 25.444-172.28 71.109-45.227 46.098-70.756 107.183-70.756 172.106 0 64.923 25.444 126.007 71.194 172.106 46.099 46.098 107.184 71.109 172.28 71.109 51.414 0 100.648-16.212 142.824-47.404l126.53 126.006c7.058 7.06 16.297 10.979 26.406 10.979 10.105 0 19.343-3.919 26.402-10.979 14.467-14.467 14.467-38.172 0-52.723L710.816 654.301zm-315.107-23.265c-65.88-65.88-65.88-172.54 0-238.42 32.069-32.07 74.245-49.149 119.471-49.149 45.227 0 87.407 17.603 119.472 49.149 65.88 65.879 65.88 172.539 0 238.42-63.612 63.178-175.242 63.178-238.943 0zm0 0", fill: "currentColor" }), h("path", { d: "M703.319 121.603H321.03c-109.8 0-199.469 89.146-199.469 199.38v382.034c0 109.796 89.236 199.38 199.469 199.38h207.397c20.653 0 37.384-16.645 37.384-37.299 0-20.649-16.731-37.296-37.384-37.296H321.03c-68.582 0-124.352-55.77-124.352-124.267V321.421c0-68.496 55.77-124.267 124.352-124.267h382.289c68.582 0 124.352 55.771 124.352 124.267V524.72c0 20.654 16.736 37.299 37.385 37.299 20.654 0 37.384-16.645 37.384-37.299V320.549c-.085-109.8-89.321-198.946-199.121-198.946zm0 0", fill: "currentColor" })]);
var W = () => h("svg", { width: "16", height: "16", ariaHidden: "true" }, h("path", { d: "M14.85 3H1.15C.52 3 0 3.52 0 4.15v7.69C0 12.48.52 13 1.15 13h13.69c.64 0 1.15-.52 1.15-1.15v-7.7C16 3.52 15.48 3 14.85 3zM9 11H7V8L5.5 9.92 4 8v3H2V5h2l1.5 2L7 5h2v6zm2.99.5L9.5 8H11V5h2v3h1.5l-2.51 3.5z", fill: "currentColor" }));
var F = () => h("svg", { viewBox: "0 0 1024 1024", width: "24", height: "24" }, h("path", { d: "M810.667 213.333a64 64 0 0 1 64 64V704a64 64 0 0 1-64 64H478.336l-146.645 96.107a21.333 21.333 0 0 1-33.024-17.856V768h-85.334a64 64 0 0 1-64-64V277.333a64 64 0 0 1 64-64h597.334zm0 64H213.333V704h149.334v63.296L459.243 704h351.424V277.333zm-271.36 213.334v64h-176.64v-64h176.64zm122.026-128v64H362.667v-64h298.666z", fill: "currentColor" }));
var K = () => h("svg", { viewBox: "0 0 1024 1024", width: "24", height: "24" }, h("path", { d: "M813.039 318.772L480.53 651.278H360.718V531.463L693.227 198.961C697.904 194.284 704.027 192 710.157 192C716.302 192 722.436 194.284 727.114 198.961L813.039 284.88C817.72 289.561 820 295.684 820 301.825C820 307.95 817.72 314.093 813.039 318.772ZM710.172 261.888L420.624 551.431V591.376H460.561L750.109 301.825L710.172 261.888ZM490.517 291.845H240.906V771.09H720.156V521.479C720.156 504.947 733.559 491.529 750.109 491.529C766.653 491.529 780.063 504.947 780.063 521.479V791.059C780.063 813.118 762.18 831 740.125 831H220.937C198.882 831 181 813.118 181 791.059V271.872C181 249.817 198.882 231.935 220.937 231.935H490.517C507.06 231.935 520.47 245.352 520.47 261.888C520.47 278.424 507.06 291.845 490.517 291.845Z", fill: "currentColor" }));
var q = () => h("svg", { class: "verified-icon", viewBox: "0 0 1024 1024", width: "14", height: "14" }, h("path", { d: "m894.4 461.56-54.4-63.2c-10.4-12-18.8-34.4-18.8-50.4v-68c0-42.4-34.8-77.2-77.2-77.2h-68c-15.6 0-38.4-8.4-50.4-18.8l-63.2-54.4c-27.6-23.6-72.8-23.6-100.8 0l-62.8 54.8c-12 10-34.8 18.4-50.4 18.4h-69.2c-42.4 0-77.2 34.8-77.2 77.2v68.4c0 15.6-8.4 38-18.4 50l-54 63.6c-23.2 27.6-23.2 72.4 0 100l54 63.6c10 12 18.4 34.4 18.4 50v68.4c0 42.4 34.8 77.2 77.2 77.2h69.2c15.6 0 38.4 8.4 50.4 18.8l63.2 54.4c27.6 23.6 72.8 23.6 100.8 0l63.2-54.4c12-10.4 34.4-18.8 50.4-18.8h68c42.4 0 77.2-34.8 77.2-77.2v-68c0-15.6 8.4-38.4 18.8-50.4l54.4-63.2c23.2-27.6 23.2-73.2-.4-100.8zm-216-25.2-193.2 193.2a30 30 0 0 1-42.4 0l-96.8-96.8a30.16 30.16 0 0 1 0-42.4c11.6-11.6 30.8-11.6 42.4 0l75.6 75.6 172-172c11.6-11.6 30.8-11.6 42.4 0 11.6 11.6 11.6 30.8 0 42.4z", fill: "#27ae60" }));
var G = ({ size: t2 = 100 }) => h("svg", { width: t2, height: t2, viewBox: "0 0 100 100", preserveAspectRatio: "xMidYMid" }, h("circle", { cx: 50, cy: 50, fill: "none", stroke: "currentColor", strokeWidth: "4", r: "40", "stroke-dasharray": "85 30" }, h("animateTransform", { attributeName: "transform", type: "rotate", repeatCount: "indefinite", dur: "1s", values: "0 50 50;360 50 50", keyTimes: "0;1" })));
var Z = () => h("svg", { width: 24, height: 24, fill: "currentcolor", viewBox: "0 0 24 24" }, [h("path", { style: "transform: translateY(0.5px)", d: "M18.968 10.5H15.968V11.484H17.984V12.984H15.968V15H14.468V9H18.968V10.5V10.5ZM8.984 9C9.26533 9 9.49967 9.09367 9.687 9.281C9.87433 9.46833 9.968 9.70267 9.968 9.984V10.5H6.499V13.5H8.468V12H9.968V14.016C9.968 14.2973 9.87433 14.5317 9.687 14.719C9.49967 14.9063 9.26533 15 8.984 15H5.984C5.70267 15 5.46833 14.9063 5.281 14.719C5.09367 14.5317 5 14.2973 5 14.016V9.985C5 9.70367 5.09367 9.46933 5.281 9.282C5.46833 9.09467 5.70267 9.001 5.984 9.001H8.984V9ZM11.468 9H12.968V15H11.468V9V9Z" }), h("path", { d: "M18.5 3H5.75C3.6875 3 2 4.6875 2 6.75V18C2 20.0625 3.6875 21.75 5.75 21.75H18.5C20.5625 21.75 22.25 20.0625 22.25 18V6.75C22.25 4.6875 20.5625 3 18.5 3ZM20.75 18C20.75 19.2375 19.7375 20.25 18.5 20.25H5.75C4.5125 20.25 3.5 19.2375 3.5 18V6.75C3.5 5.5125 4.5125 4.5 5.75 4.5H18.5C19.7375 4.5 20.75 5.5125 20.75 6.75V18Z" })]);
var J = { "Content-Type": "application/json" };
var Y = (e2, t2 = "") => {
  if ("object" == typeof e2 && e2.errno)
    throw new TypeError(`${t2} failed with ${e2.errno}: ${e2.errmsg}`);
  return e2;
};
var X = ({ serverURL: e2, lang: t2, path: a, type: n2, action: l }) => fetch(`${e2}/article?lang=${t2}`, { method: "POST", headers: J, body: JSON.stringify({ path: a, type: n2, action: l }) }).then((e3) => e3.json());
var Q = ({ serverURL: e2, lang: t2, token: a, objectId: n2, comment: l }) => fetch(`${e2}/comment/${n2}?lang=${t2}`, { method: "PUT", headers: { ...J, Authorization: `Bearer ${a}` }, body: JSON.stringify(l) }).then((e3) => e3.json()).then((e3) => Y(e3, "Update comment"));
var ee = null;
var te = () => ee || (ee = useStorage("WALINE_LIKE", []));
var ae = null;
var ne = () => ae ?? (ae = useStorage("WALINE_REACTION", {}));
var le = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {};
var ie = {};
var oe = {};
var re = {};
var se = le && le.__awaiter || function(e2, t2, a, n2) {
  return new (a || (a = Promise))(function(l, i) {
    function o2(e3) {
      try {
        s(n2.next(e3));
      } catch (e4) {
        i(e4);
      }
    }
    function r2(e3) {
      try {
        s(n2.throw(e3));
      } catch (e4) {
        i(e4);
      }
    }
    function s(e3) {
      var t3;
      e3.done ? l(e3.value) : (t3 = e3.value, t3 instanceof a ? t3 : new a(function(e4) {
        e4(t3);
      })).then(o2, r2);
    }
    s((n2 = n2.apply(e2, t2 || [])).next());
  });
};
var ce = le && le.__generator || function(e2, t2) {
  var a, n2, l, i, o2 = { label: 0, sent: function() {
    if (1 & l[0])
      throw l[1];
    return l[1];
  }, trys: [], ops: [] };
  return i = { next: r2(0), throw: r2(1), return: r2(2) }, "function" == typeof Symbol && (i[Symbol.iterator] = function() {
    return this;
  }), i;
  function r2(i2) {
    return function(r3) {
      return function(i3) {
        if (a)
          throw new TypeError("Generator is already executing.");
        for (; o2; )
          try {
            if (a = 1, n2 && (l = 2 & i3[0] ? n2.return : i3[0] ? n2.throw || ((l = n2.return) && l.call(n2), 0) : n2.next) && !(l = l.call(n2, i3[1])).done)
              return l;
            switch (n2 = 0, l && (i3 = [2 & i3[0], l.value]), i3[0]) {
              case 0:
              case 1:
                l = i3;
                break;
              case 4:
                return o2.label++, { value: i3[1], done: false };
              case 5:
                o2.label++, n2 = i3[1], i3 = [0];
                continue;
              case 7:
                i3 = o2.ops.pop(), o2.trys.pop();
                continue;
              default:
                if (!(l = o2.trys, (l = l.length > 0 && l[l.length - 1]) || 6 !== i3[0] && 2 !== i3[0])) {
                  o2 = 0;
                  continue;
                }
                if (3 === i3[0] && (!l || i3[1] > l[0] && i3[1] < l[3])) {
                  o2.label = i3[1];
                  break;
                }
                if (6 === i3[0] && o2.label < l[1]) {
                  o2.label = l[1], l = i3;
                  break;
                }
                if (l && o2.label < l[2]) {
                  o2.label = l[2], o2.ops.push(i3);
                  break;
                }
                l[2] && o2.ops.pop(), o2.trys.pop();
                continue;
            }
            i3 = t2.call(e2, o2);
          } catch (e3) {
            i3 = [6, e3], n2 = 0;
          } finally {
            a = l = 0;
          }
        if (5 & i3[0])
          throw i3[1];
        return { value: i3[0] ? i3[1] : void 0, done: true };
      }([i2, r3]);
    };
  }
};
Object.defineProperty(re, "__esModule", { value: true }), re.ReCaptchaInstance = void 0;
var ue = function() {
  function e2(e3, t2, a) {
    this.siteKey = e3, this.recaptchaID = t2, this.recaptcha = a, this.styleContainer = null;
  }
  return e2.prototype.execute = function(e3) {
    return se(this, void 0, void 0, function() {
      return ce(this, function(t2) {
        return [2, this.recaptcha.enterprise ? this.recaptcha.enterprise.execute(this.recaptchaID, { action: e3 }) : this.recaptcha.execute(this.recaptchaID, { action: e3 })];
      });
    });
  }, e2.prototype.getSiteKey = function() {
    return this.siteKey;
  }, e2.prototype.hideBadge = function() {
    null === this.styleContainer && (this.styleContainer = document.createElement("style"), this.styleContainer.innerHTML = ".grecaptcha-badge{visibility:hidden !important;}", document.head.appendChild(this.styleContainer));
  }, e2.prototype.showBadge = function() {
    null !== this.styleContainer && (document.head.removeChild(this.styleContainer), this.styleContainer = null);
  }, e2;
}();
re.ReCaptchaInstance = ue, Object.defineProperty(oe, "__esModule", { value: true }), oe.getInstance = oe.load = void 0;
var de;
var ve = re;
!function(e2) {
  e2[e2.NOT_LOADED = 0] = "NOT_LOADED", e2[e2.LOADING = 1] = "LOADING", e2[e2.LOADED = 2] = "LOADED";
}(de || (de = {}));
var me = function() {
  function e2() {
  }
  return e2.load = function(t2, a) {
    if (void 0 === a && (a = {}), "undefined" == typeof document)
      return Promise.reject(new Error("This is a library for the browser!"));
    if (e2.getLoadingState() === de.LOADED)
      return e2.instance.getSiteKey() === t2 ? Promise.resolve(e2.instance) : Promise.reject(new Error("reCAPTCHA already loaded with different site key!"));
    if (e2.getLoadingState() === de.LOADING)
      return t2 !== e2.instanceSiteKey ? Promise.reject(new Error("reCAPTCHA already loaded with different site key!")) : new Promise(function(t3, a2) {
        e2.successfulLoadingConsumers.push(function(e3) {
          return t3(e3);
        }), e2.errorLoadingRunnable.push(function(e3) {
          return a2(e3);
        });
      });
    e2.instanceSiteKey = t2, e2.setLoadingState(de.LOADING);
    var n2 = new e2();
    return new Promise(function(l, i) {
      n2.loadScript(t2, a.useRecaptchaNet || false, a.useEnterprise || false, a.renderParameters ? a.renderParameters : {}, a.customUrl).then(function() {
        e2.setLoadingState(de.LOADED);
        var i2 = n2.doExplicitRender(grecaptcha, t2, a.explicitRenderParameters ? a.explicitRenderParameters : {}, a.useEnterprise || false), o2 = new ve.ReCaptchaInstance(t2, i2, grecaptcha);
        e2.successfulLoadingConsumers.forEach(function(e3) {
          return e3(o2);
        }), e2.successfulLoadingConsumers = [], a.autoHideBadge && o2.hideBadge(), e2.instance = o2, l(o2);
      }).catch(function(t3) {
        e2.errorLoadingRunnable.forEach(function(e3) {
          return e3(t3);
        }), e2.errorLoadingRunnable = [], i(t3);
      });
    });
  }, e2.getInstance = function() {
    return e2.instance;
  }, e2.setLoadingState = function(t2) {
    e2.loadingState = t2;
  }, e2.getLoadingState = function() {
    return null === e2.loadingState ? de.NOT_LOADED : e2.loadingState;
  }, e2.prototype.loadScript = function(t2, a, n2, l, i) {
    var o2 = this;
    void 0 === a && (a = false), void 0 === n2 && (n2 = false), void 0 === l && (l = {}), void 0 === i && (i = "");
    var r2 = document.createElement("script");
    r2.setAttribute("recaptcha-v3-script", "");
    var s = "https://www.google.com/recaptcha/api.js";
    a && (s = n2 ? "https://recaptcha.net/recaptcha/enterprise.js" : "https://recaptcha.net/recaptcha/api.js"), n2 && (s = "https://www.google.com/recaptcha/enterprise.js"), i && (s = i), l.render && (l.render = void 0);
    var c = this.buildQueryString(l);
    return r2.src = s + "?render=explicit" + c, new Promise(function(t3, a2) {
      r2.addEventListener("load", o2.waitForScriptToLoad(function() {
        t3(r2);
      }, n2), false), r2.onerror = function(t4) {
        e2.setLoadingState(de.NOT_LOADED), a2(t4);
      }, document.head.appendChild(r2);
    });
  }, e2.prototype.buildQueryString = function(e3) {
    return Object.keys(e3).length < 1 ? "" : "&" + Object.keys(e3).filter(function(t2) {
      return !!e3[t2];
    }).map(function(t2) {
      return t2 + "=" + e3[t2];
    }).join("&");
  }, e2.prototype.waitForScriptToLoad = function(t2, a) {
    var n2 = this;
    return function() {
      void 0 === window.grecaptcha ? setTimeout(function() {
        n2.waitForScriptToLoad(t2, a);
      }, e2.SCRIPT_LOAD_DELAY) : a ? window.grecaptcha.enterprise.ready(function() {
        t2();
      }) : window.grecaptcha.ready(function() {
        t2();
      });
    };
  }, e2.prototype.doExplicitRender = function(e3, t2, a, n2) {
    var l = { sitekey: t2, badge: a.badge, size: a.size, tabindex: a.tabindex };
    return a.container ? n2 ? e3.enterprise.render(a.container, l) : e3.render(a.container, l) : n2 ? e3.enterprise.render(l) : e3.render(l);
  }, e2.loadingState = null, e2.instance = null, e2.instanceSiteKey = null, e2.successfulLoadingConsumers = [], e2.errorLoadingRunnable = [], e2.SCRIPT_LOAD_DELAY = 25, e2;
}();
oe.load = me.load, oe.getInstance = me.getInstance, function(e2) {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.ReCaptchaInstance = e2.getInstance = e2.load = void 0;
  var t2 = oe;
  Object.defineProperty(e2, "load", { enumerable: true, get: function() {
    return t2.load;
  } }), Object.defineProperty(e2, "getInstance", { enumerable: true, get: function() {
    return t2.getInstance;
  } });
  var a = re;
  Object.defineProperty(e2, "ReCaptchaInstance", { enumerable: true, get: function() {
    return a.ReCaptchaInstance;
  } });
}(ie);
var pe = {};
var he = null;
var ge = () => he ?? (he = useStorage("WALINE_USER", {}));
var fe = { key: 0, class: "wl-reaction" };
var ye = ["textContent"];
var we = { class: "wl-reaction-list" };
var be = ["onClick"];
var ke = { class: "wl-reaction-img" };
var Ce = ["src", "alt"];
var $e = ["textContent"];
var Le = ["textContent"];
var xe = defineComponent({ __name: "ArticleReaction", setup(e2, { expose: t2 }) {
  t2();
  const y = ne(), w = inject("config"), b = ref(-1), k = ref([]), C = computed(() => w.value.locale), $ = computed(() => w.value.reaction.length > 0), L = computed(() => {
    const { reaction: e3, path: t3 } = w.value;
    return e3.map((e4, a) => ({ icon: e4, desc: C.value[`reaction${a}`], active: y.value[t3] === a }));
  });
  let x;
  const I = async () => {
    if ($.value) {
      const { serverURL: e3, lang: t3, path: a, reaction: n2 } = w.value, l = new AbortController();
      x = l.abort.bind(l);
      const i = await (({ serverURL: e4, lang: t4, paths: a2, type: n3, signal: l2 }) => fetch(`${e4}/article?path=${encodeURIComponent(a2.join(","))}&type=${encodeURIComponent(n3.join(","))}&lang=${t4}`, { signal: l2 }).then((e5) => e5.json()))({ serverURL: e3, lang: t3, paths: [a], type: n2.map((e4, t4) => `reaction${t4}`), signal: l.signal });
      if (Array.isArray(i) || "number" == typeof i)
        return;
      k.value = n2.map((e4, t4) => i[`reaction${t4}`]);
    }
  };
  return onMounted(() => {
    watch(() => [w.value.serverURL, w.value.path], () => {
      I();
    }, { immediate: true });
  }), onUnmounted(() => x == null ? void 0 : x()), (e3, t3) => L.value.length ? (openBlock(), createElementBlock("div", fe, [createBaseVNode("div", { class: "wl-reaction-title", textContent: toDisplayString(C.value.reactionTitle) }, null, 8, ye), createBaseVNode("ul", we, [(openBlock(true), createElementBlock(Fragment, null, renderList(L.value, ({ active: e4, icon: t4, desc: a }, n2) => (openBlock(), createElementBlock("li", { key: n2, class: normalizeClass(["wl-reaction-item", { active: e4 }]), onClick: (e5) => (async (e6) => {
    if (-1 === b.value) {
      const { serverURL: t5, lang: a2, path: n3 } = w.value, l = y.value[n3];
      b.value = e6, void 0 !== l && (await X({ serverURL: t5, lang: a2, path: n3, type: `reaction${l}`, action: "desc" }), k.value[l] = Math.max(k.value[l] - 1, 0)), l !== e6 && (await X({ serverURL: t5, lang: a2, path: n3, type: `reaction${e6}` }), k.value[e6] = (k.value[e6] || 0) + 1), l === e6 ? delete y.value[n3] : y.value[n3] = e6, b.value = -1;
    }
  })(n2) }, [createBaseVNode("div", ke, [createBaseVNode("img", { src: t4, alt: a }, null, 8, Ce), b.value === n2 ? (openBlock(), createBlock(unref(G), { key: 0, class: "wl-reaction-loading" })) : (openBlock(), createElementBlock("div", { key: 1, class: "wl-reaction-votes", textContent: toDisplayString(k.value[n2] || 0) }, null, 8, $e))]), createBaseVNode("div", { class: "wl-reaction-text", textContent: toDisplayString(a) }, null, 8, Le)], 10, be))), 128))])])) : createCommentVNode("v-if", true);
} });
var Ie = (e2, t2) => {
  const a = e2.__vccOpts || e2;
  for (const [e3, n2] of t2)
    a[e3] = n2;
  return a;
};
var Re = Ie(xe, [["__file", "ArticleReaction.vue"]]);
var Ee = ["data-index"];
var je = ["src", "title", "onClick"];
var Se = Ie(defineComponent({ __name: "ImageWall", props: { items: { default: () => [] }, columnWidth: { default: 300 }, gap: { default: 0 } }, emits: ["insert"], setup(e2, { expose: t2 }) {
  const a = e2;
  t2();
  let l = null;
  const r2 = ref(null), d = ref({}), p = ref([]), k = () => {
    const e3 = Math.floor((r2.value.getBoundingClientRect().width + a.gap) / (a.columnWidth + a.gap));
    return e3 > 0 ? e3 : 1;
  }, C = async (e3) => {
    var _a2;
    if (e3 >= a.items.length)
      return;
    await nextTick();
    const t3 = Array.from(((_a2 = r2.value) == null ? void 0 : _a2.children) || []).reduce((e4, t4) => t4.getBoundingClientRect().height < e4.getBoundingClientRect().height ? t4 : e4);
    p.value[Number(t3.dataset.index)].push(e3), await C(e3 + 1);
  }, $ = async (e3 = false) => {
    if (p.value.length === k() && !e3)
      return;
    var t3;
    p.value = (t3 = k(), new Array(t3).fill(null).map(() => []));
    const a2 = window.scrollY;
    await C(0), window.scrollTo({ top: a2 });
  }, L = (e3) => {
    d.value[e3.target.src] = true;
  };
  return onMounted(() => {
    $(true), l = new ResizeObserver(() => {
      $();
    }), l.observe(r2.value), watch(() => [a.items], () => {
      d.value = {}, $(true);
    }), watch(() => [a.columnWidth, a.gap], () => {
      $();
    });
  }), onBeforeUnmount(() => l.unobserve(r2.value)), (e3, t3) => (openBlock(), createElementBlock("div", { ref_key: "wall", ref: r2, class: "wl-gallery", style: normalizeStyle({ gap: `${e3.gap}px` }) }, [(openBlock(true), createElementBlock(Fragment, null, renderList(p.value, (t4, a2) => (openBlock(), createElementBlock("div", { key: a2, class: "wl-gallery-column", "data-index": a2, style: normalizeStyle({ gap: `${e3.gap}px` }) }, [(openBlock(true), createElementBlock(Fragment, null, renderList(t4, (t5) => (openBlock(), createElementBlock(Fragment, { key: t5 }, [d.value[e3.items[t5].src] ? createCommentVNode("v-if", true) : (openBlock(), createBlock(unref(G), { key: 0, size: 36, style: { margin: "20px auto" } })), createBaseVNode("img", { class: "wl-gallery-item", src: e3.items[t5].src, title: e3.items[t5].title, loading: "lazy", onLoad: L, onClick: (a3) => e3.$emit("insert", `![](${e3.items[t5].src})`) }, null, 40, je)], 64))), 128))], 12, Ee))), 128))], 4));
} }), [["__file", "ImageWall.vue"]]);
var Ae = (e2) => {
  try {
    e2 = decodeURI(e2);
  } catch (e3) {
  }
  return e2;
};
var _e = (e2 = "") => e2.replace(/\/$/u, "");
var ze = (e2) => /^(https?:)?\/\//.test(e2);
var Ue = ["nick", "mail", "link"];
var Me = (e2) => e2.filter((e3) => Ue.includes(e3));
var He = ["//unpkg.com/@waline/emojis@1.1.0/weibo"];
var Pe = ["//unpkg.com/@waline/emojis/tieba/tieba_agree.png", "//unpkg.com/@waline/emojis/tieba/tieba_look_down.png", "//unpkg.com/@waline/emojis/tieba/tieba_sunglasses.png", "//unpkg.com/@waline/emojis/tieba/tieba_pick_nose.png", "//unpkg.com/@waline/emojis/tieba/tieba_awkward.png", "//unpkg.com/@waline/emojis/tieba/tieba_sleep.png"];
var Oe = (e2) => new Promise((t2, a) => {
  if (e2.size > 128e3)
    return a(new Error("File too large! File size limit 128KB"));
  const n2 = new FileReader();
  n2.readAsDataURL(e2), n2.onload = () => {
    var _a2;
    return t2(((_a2 = n2.result) == null ? void 0 : _a2.toString()) || "");
  }, n2.onerror = a;
});
var Ve = (e2) => true === e2 ? '<p class="wl-tex">TeX is not available in preview</p>' : '<span class="wl-tex">TeX is not available in preview</span>';
var Te = (e2) => {
  const t2 = async (t3, a = {}) => fetch(`https://api.giphy.com/v1/gifs/${t3}?${new URLSearchParams({ lang: e2, limit: "20", rating: "g", api_key: "6CIMLkNMMOhRcXPoMCPkFy4Ybk2XUiMp", ...a }).toString()}`).then((e3) => e3.json()).then(({ data: e3 }) => e3.map((e4) => ({ title: e4.title, src: e4.images.downsized_medium.url })));
  return { search: (e3) => t2("search", { q: e3, offset: "0" }), default: () => t2("trending", {}), more: (e3, a = 0) => t2("search", { q: e3, offset: a.toString() }) };
};
var De = new RegExp(`(${/[\u4E00-\u9FFF\u3400-\u4dbf\uf900-\ufaff\u3040-\u309f\uac00-\ud7af\u0400-\u04FF]+|\w+/.source}|${/</.source})|((?:${/(?:^|\s)\/\/(.+?)$/gm.source})|(?:${/\/\*([\S\s]*?)\*\//gm.source}))`, "gmi");
var Ne = ["23AC69", "91C132", "F19726", "E8552D", "1AAB8E", "E1147F", "2980C1", "1BA1E6", "9FA0A0", "F19726", "E30B20", "E30B20", "A3338B"];
var Be = {};
var We = (e2) => {
  let t2 = 0;
  return e2.replace(De, (e3, a, n2) => {
    if (n2)
      return `<span style="color: slategray">${n2}</span>`;
    if ("<" === a)
      return "&lt;";
    let l;
    Be[a] ? l = Be[a] : (l = Ne[t2], Be[a] = l);
    const i = `<span style="color: #${l}">${a}</span>`;
    return t2 = ++t2 % Ne.length, i;
  });
};
var Fe = ["nick", "nickError", "mail", "mailError", "link", "optional", "placeholder", "sofa", "submit", "like", "cancelLike", "reply", "cancelReply", "comment", "refresh", "more", "preview", "emoji", "uploadImage", "seconds", "minutes", "hours", "days", "now", "uploading", "login", "logout", "admin", "sticky", "word", "wordHint", "anonymous", "level0", "level1", "level2", "level3", "level4", "level5", "gif", "gifSearchPlaceholder", "profile", "approved", "waiting", "spam", "unsticky", "oldest", "latest", "hottest", "reactionTitle"];
var Ke = (e2) => Object.fromEntries(e2.map((e3, t2) => [Fe[t2], e3]));
var qe = Ke(["NickName", "NickName cannot be less than 3 bytes.", "E-Mail", "Please confirm your email address.", "Website", "Optional", "Comment here...", "No comment yet.", "Submit", "Like", "Cancel like", "Reply", "Cancel reply", "Comments", "Refresh", "Load More...", "Preview", "Emoji", "Upload Image", "seconds ago", "minutes ago", "hours ago", "days ago", "just now", "Uploading", "Login", "logout", "Admin", "Sticky", "Words", "Please input comments between $0 and $1 words!\n Current word number: $2", "Anonymous", "Dwarves", "Hobbits", "Ents", "Wizards", "Elves", "Maiar", "GIF", "Search GIF", "Profile", "Approved", "Waiting", "Spam", "Unsticky", "Oldest", "Latest", "Hottest", "What do you think?"]);
var Ge = Ke(["ニックネーム", "3バイト以上のニックネームをご入力ください.", "メールアドレス", "メールアドレスをご確認ください.", "サイト", "オプション", "ここにコメント", "コメントしましょう~", "提出する", "Like", "Cancel like", "返信する", "キャンセル", "コメント", "更新", "さらに読み込む", "プレビュー", "絵文字", "画像をアップロード", "秒前", "分前", "時間前", "日前", "たっだ今", "アップロード", "ログインする", "ログアウト", "管理者", "トップに置く", "ワード", "コメントは $0 から $1 ワードの間でなければなりません!\n 現在の単語番号: $2", "匿名", "うえにん", "なかにん", "しもおし", "特にしもおし", "かげ", "なぬし", "GIF", "探す GIF", "個人情報", "承認済み", "待っている", "スパム", "べたつかない", "逆順", "正順", "人気順", "どう思いますか？"]);
var Ze = Ke(["Apelido", "Apelido não pode ser menor que 3 bytes.", "E-Mail", "Por favor, confirme seu endereço de e-mail.", "Website", "Opcional", "Comente aqui...", "Nenhum comentário, ainda.", "Enviar", "Like", "Cancel like", "Responder", "Cancelar resposta", "Comentários", "Refrescar", "Carregar Mais...", "Visualizar", "Emoji", "Enviar Imagem", "segundos atrás", "minutos atrás", "horas atrás", "dias atrás", "agora mesmo", "Enviando", "Entrar", "Sair", "Admin", "Sticky", "Palavras", "Favor enviar comentário com $0 a $1 palavras!\n Número de palavras atuais: $2", "Anônimo", "Dwarves", "Hobbits", "Ents", "Wizards", "Elves", "Maiar", "GIF", "Pesquisar GIF", "informação pessoal", "Aprovado", "Espera", "Spam", "Unsticky", "Mais velho", "Mais recentes", "Mais quente", "O que você acha?"]);
var Je = Ke(["Псевдоним", "Никнейм не может быть меньше 3 байт.", "Эл. адрес", "Пожалуйста, подтвердите адрес вашей электронной почты.", "Веб-сайт", "Необязательный", "Комментарий здесь...", "Пока нет комментариев.", "Отправить", "Like", "Cancel like", "Отвечать", "Отменить ответ", "Комментарии", "Обновить", "Загрузи больше...", "Превью", "эмодзи", "Загрузить изображение", "секунд назад", "несколько минут назад", "несколько часов назад", "дней назад", "прямо сейчас", "Загрузка", "Авторизоваться", "Выход из системы", "Админ", "Липкий", "Слова", "Пожалуйста, введите комментарии от $0 до $1 слов!\nНомер текущего слова: $2", "Анонимный", "Dwarves", "Hobbits", "Ents", "Wizards", "Elves", "Maiar", "GIF", "Поиск GIF", "Персональные данные", "Одобренный", "Ожидающий", "Спам", "Нелипкий", "самый старый", "последний", "самый горячий", "Что вы думаете?"]);
var Ye = Ke(["昵称", "昵称不能少于3个字符", "邮箱", "请填写正确的邮件地址", "网址", "可选", "欢迎评论", "来发评论吧~", "提交", "喜欢", "取消喜欢", "回复", "取消回复", "评论", "刷新", "加载更多...", "预览", "表情", "上传图片", "秒前", "分钟前", "小时前", "天前", "刚刚", "正在上传", "登录", "退出", "博主", "置顶", "字", "评论字数应在 $0 到 $1 字之间！\n当前字数：$2", "匿名", "潜水", "冒泡", "吐槽", "活跃", "话痨", "传说", "表情包", "搜索表情包", "个人资料", "通过", "待审核", "垃圾", "取消置顶", "按倒序", "按正序", "按热度", "你认为这篇文章怎么样？"]);
var Xe = Ke(["暱稱", "暱稱不能少於3個字元", "郵箱", "請填寫正確的郵件地址", "網址", "可選", "歡迎留言", "來發留言吧~", "送出", "喜歡", "取消喜歡", "回覆", "取消回覆", "留言", "重整", "載入更多...", "預覽", "表情", "上傳圖片", "秒前", "分鐘前", "小時前", "天前", "剛剛", "正在上傳", "登入", "登出", "管理者", "置頂", "字", "留言字數應在 $0 到 $1 字之間！\n目前字數：$2", "匿名", "潛水", "冒泡", "吐槽", "活躍", "多話", "傳說", "表情包", "搜尋表情包", "個人資料", "通過", "待審核", "垃圾", "取消置頂", "最早", "最新", "熱門", "你認為這篇文章怎麼樣？"]);
var Qe = { zh: Ye, "zh-cn": Ye, "zh-CN": Ye, "zh-tw": Xe, "zh-TW": Xe, en: qe, "en-US": qe, "en-us": qe, jp: Ge, ja: Ge, "jp-jp": Ge, "jp-JP": Ge, "pt-br": Ze, "pt-BR": Ze, ru: Je, "ru-ru": Je, "ru-RU": Je };
var et = (e2) => {
  const t2 = _e(e2);
  return ze(t2) ? t2 : `https://${t2}`;
};
var tt = (e2) => Array.isArray(e2) ? e2 : !!e2 && [0, e2];
var at = (e2, t2) => "function" == typeof e2 ? e2 : false !== e2 && t2;
var nt = "{--waline-white:#000;--waline-light-grey:#666;--waline-dark-grey:#999;--waline-color:#888;--waline-bgcolor:#1e1e1e;--waline-bgcolor-light:#272727;--waline-bgcolor-hover: #444;--waline-border-color:#333;--waline-disable-bgcolor:#444;--waline-disable-color:#272727;--waline-bq-color:#272727;--waline-info-bgcolor:#272727;--waline-info-color:#666}";
var lt = (e2, t2) => {
  let a = e2.toString();
  for (; a.length < t2; )
    a = "0" + a;
  return a;
};
var it = (e2, t2, a) => {
  if (!e2)
    return "";
  const n2 = "string" == typeof e2 ? new Date(-1 !== e2.indexOf(" ") ? e2.replace(/-/g, "/") : e2) : e2, l = t2.getTime() - n2.getTime(), i = Math.floor(l / 864e5);
  if (0 === i) {
    const e3 = l % 864e5, t3 = Math.floor(e3 / 36e5);
    if (0 === t3) {
      const t4 = e3 % 36e5, n3 = Math.floor(t4 / 6e4);
      if (0 === n3) {
        const e4 = t4 % 6e4;
        return `${Math.round(e4 / 1e3)} ${a.seconds}`;
      }
      return `${n3} ${a.minutes}`;
    }
    return `${t3} ${a.hours}`;
  }
  return i < 0 ? a.now : i < 8 ? `${i} ${a.days}` : ((e3) => {
    const t3 = lt(e3.getDate(), 2), a2 = lt(e3.getMonth() + 1, 2);
    return `${lt(e3.getFullYear(), 2)}-${a2}-${t3}`;
  })(n2);
};
var ot = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
var rt = (e2) => {
  const t2 = useStorage("WALINE_EMOJI", {}), a = Boolean(/@[0-9]+\.[0-9]+\.[0-9]+/.test(e2));
  if (a) {
    const a2 = t2.value[e2];
    if (a2)
      return Promise.resolve(a2);
  }
  return fetch(`${e2}/info.json`).then((e3) => e3.json()).then((n2) => {
    const l = { folder: e2, ...n2 };
    return a && (t2.value[e2] = l), l;
  });
};
var st = (e2, t2 = "", a = "", n2 = "") => `${t2 ? `${t2}/` : ""}${a}${e2}${n2 ? `.${n2}` : ""}`;
var ct = (e2) => e2.type.includes("image");
var ut = (e2) => {
  const t2 = Array.from(e2).find(ct);
  return t2 ? t2.getAsFile() : null;
};
var dt = /\$.*?\$/;
var vt = /^\$(.*?)\$/;
var mt = /^(?:\s{0,3})\$\$((?:[^\n]|\n[^\n])+?)\n{0,1}\$\$/;
var pt = (e2 = "", t2 = {}) => e2.replace(/:(.+?):/g, (e3, a) => t2[a] ? `<img class="wl-emoji" src="${t2[a]}" alt="${a}">` : e3);
var ht = (e2, { emojiMap: t2, highlighter: a, texRenderer: n2 }) => {
  if (marked.setOptions({ highlight: a || void 0, breaks: true, smartLists: true, smartypants: true }), n2) {
    const e3 = /* @__PURE__ */ ((e4) => [{ name: "blockMath", level: "block", tokenizer(t3) {
      const a2 = mt.exec(t3);
      if (null !== a2)
        return { type: "html", raw: a2[0], text: e4(true, a2[1]) };
    } }, { name: "inlineMath", level: "inline", start(e5) {
      const t3 = e5.search(dt);
      return -1 !== t3 ? t3 : e5.length;
    }, tokenizer(t3) {
      const a2 = vt.exec(t3);
      if (null !== a2)
        return { type: "html", raw: a2[0], text: e4(false, a2[1]) };
    } }])(n2);
    marked.use({ extensions: e3 });
  }
  return marked.parse(pt(e2, t2));
};
var gt = { class: "wl-comment" };
var ft = { key: 0, class: "wl-login-info" };
var yt = { class: "wl-avatar" };
var wt = ["title"];
var bt = ["title"];
var kt = ["src"];
var Ct = ["title", "textContent"];
var $t = { class: "wl-panel" };
var Lt = ["for", "textContent"];
var xt = ["id", "onUpdate:modelValue", "name", "type"];
var It = ["placeholder"];
var Rt = { class: "wl-preview" };
var Et = createBaseVNode("hr", null, null, -1);
var jt = ["innerHTML"];
var St = { class: "wl-footer" };
var At = { class: "wl-actions" };
var _t = { href: "https://guides.github.com/features/mastering-markdown/", title: "Markdown Guide", "aria-label": "Markdown is supported", class: "wl-action", target: "_blank", rel: "noopener noreferrer" };
var zt = ["title"];
var Ut = ["title"];
var Mt = ["title"];
var Ht = ["title"];
var Pt = { class: "wl-info" };
var Ot = createBaseVNode("div", { class: "wl-captcha-container" }, null, -1);
var Vt = { class: "wl-text-number" };
var Tt = { key: 0 };
var Dt = ["textContent"];
var Nt = ["textContent"];
var Bt = ["disabled"];
var Wt = ["placeholder"];
var Ft = { key: 1, class: "wl-loading" };
var Kt = { key: 0, class: "wl-tab-wrapper" };
var qt = ["title", "onClick"];
var Gt = ["src", "alt"];
var Zt = { key: 0, class: "wl-tabs" };
var Jt = ["onClick"];
var Yt = ["src", "alt", "title"];
var Xt = ["title"];
var Qt = defineComponent({ __name: "CommentBox", props: { edit: { default: null }, rootId: { default: "" }, replyId: { default: "" }, replyUser: { default: "" } }, emits: ["log", "cancelEdit", "cancelReply", "submit"], setup(e2, { expose: t2, emit: y }) {
  const w = e2;
  t2();
  const b = inject("config"), j = useStorage("WALINE_COMMENT_BOX_EDITOR", ""), S = useStorage("WALINE_USER_META", { nick: "", mail: "", link: "" }), U = ge(), M = ref({}), P = ref(null), V2 = ref(null), N2 = ref(null), F2 = ref(null), K2 = ref(null), q2 = ref(null), J2 = ref(null), Y2 = ref({ tabs: [], map: {} }), X2 = ref(0), ee2 = ref(false), te2 = ref(false), ae2 = ref(false), ne2 = ref(""), le2 = ref(0), oe2 = reactive({ loading: true, list: [] }), re2 = ref(0), se2 = ref(false), ce2 = ref(""), ue2 = ref(false), de2 = ref(false), ve2 = computed(() => b.value.locale), me2 = computed(() => {
    var _a2;
    return Boolean((_a2 = U.value) == null ? void 0 : _a2.token);
  }), he2 = computed(() => false !== b.value.imageUploader), fe2 = (e3) => {
    const t3 = P.value, a = t3.selectionStart, n2 = t3.selectionEnd || 0, l = t3.scrollTop;
    j.value = t3.value.substring(0, a) + e3 + t3.value.substring(n2, t3.value.length), t3.focus(), t3.selectionStart = a + e3.length, t3.selectionEnd = a + e3.length, t3.scrollTop = l;
  }, ye2 = (e3) => {
    const t3 = e3.key;
    (e3.ctrlKey || e3.metaKey) && "Enter" === t3 && $e2();
  }, we2 = (e3) => {
    const t3 = `![${b.value.locale.uploading} ${e3.name}]()`;
    return fe2(t3), ue2.value = true, Promise.resolve().then(() => b.value.imageUploader(e3)).then((a) => {
      j.value = j.value.replace(t3, `\r
![${e3.name}](${a})`);
    }).catch((e4) => {
      alert(e4.message), j.value = j.value.replace(t3, "");
    }).then(() => {
      ue2.value = false;
    });
  }, be2 = (e3) => {
    var _a2;
    if ((_a2 = e3.dataTransfer) == null ? void 0 : _a2.items) {
      const t3 = ut(e3.dataTransfer.items);
      t3 && he2.value && (we2(t3), e3.preventDefault());
    }
  }, ke2 = (e3) => {
    if (e3.clipboardData) {
      const t3 = ut(e3.clipboardData.items);
      t3 && he2.value && we2(t3);
    }
  }, Ce2 = () => {
    const e3 = V2.value;
    e3.files && he2.value && we2(e3.files[0]).then(() => {
      e3.value = "";
    });
  }, $e2 = async () => {
    var _a2, _b, _c, _d, _e2, _f;
    const { serverURL: e3, lang: t3, login: a, wordLimit: n2, requiredMeta: l, recaptchaV3Key: i, turnstileKey: o2 } = b.value, r2 = await (async () => {
      if (!navigator)
        return "";
      const { userAgentData: e4 } = navigator;
      let t4 = navigator.userAgent;
      if (!e4 || "Windows" !== e4.platform)
        return t4;
      const { platformVersion: a2 } = await e4.getHighEntropyValues(["platformVersion"]);
      return a2 ? (parseInt(a2.split(".")[0]) >= 13 && (t4 = t4.replace("Windows NT 10.0", "Windows NT 11.0")), t4) : t4;
    })(), s = { comment: ce2.value, nick: S.value.nick, mail: S.value.mail, link: S.value.link, url: b.value.path, ua: r2 };
    if ((_a2 = U.value) == null ? void 0 : _a2.token)
      s.nick = U.value.display_name, s.mail = U.value.email, s.link = U.value.url;
    else {
      if ("force" === a)
        return;
      if (l.indexOf("nick") > -1 && !s.nick)
        return (_b = M.value.nick) == null ? void 0 : _b.focus(), alert(ve2.value.nickError);
      if (l.indexOf("mail") > -1 && !s.mail || s.mail && (c = s.mail, !ot.test(c)))
        return (_c = M.value.mail) == null ? void 0 : _c.focus(), alert(ve2.value.mailError);
      s.nick || (s.nick = ve2.value.anonymous);
    }
    var c;
    if (s.comment) {
      if (!se2.value)
        return alert(ve2.value.wordHint.replace("$0", n2[0].toString()).replace("$1", n2[1].toString()).replace("$2", le2.value.toString()));
      s.comment = pt(s.comment, Y2.value.map), w.replyId && w.rootId && (s.pid = w.replyId, s.rid = w.rootId, s.at = w.replyUser), ue2.value = true;
      try {
        i && (s.recaptchaV3 = await ((e4) => {
          const t4 = pe[e4] ?? (pe[e4] = ie.load(e4, { useRecaptchaNet: true, autoHideBadge: true }));
          return { execute: (e5) => t4.then((t5) => t5.execute(e5)) };
        })(i).execute("social")), o2 && (s.turnstile = await (u = o2, { execute: async (e4) => {
          const { load: t4 } = useScriptTag("https://challenges.cloudflare.com/turnstile/v0/api.js", void 0, { async: false });
          await t4();
          const a3 = window == null ? void 0 : window.turnstile;
          return new Promise((t5) => {
            a3 == null ? void 0 : a3.ready(() => {
              a3 == null ? void 0 : a3.render(".wl-captcha-container", { sitekey: u, action: e4, size: "compact", callback: t5 });
            });
          });
        } }).execute("social"));
        const a2 = { serverURL: e3, lang: t3, token: (_d = U.value) == null ? void 0 : _d.token, comment: s }, n3 = await (w.edit ? Q({ objectId: w.edit.objectId, ...a2 }) : (({ serverURL: e4, lang: t4, token: a3, comment: n4 }) => {
          const l2 = { "Content-Type": "application/json" };
          return a3 && (l2.Authorization = `Bearer ${a3}`), fetch(`${e4}/comment?lang=${t4}`, { method: "POST", headers: l2, body: JSON.stringify(n4) }).then((e5) => e5.json());
        })(a2));
        if (ue2.value = false, n3.errmsg)
          return alert(n3.errmsg);
        y("submit", n3.data), j.value = "", ne2.value = "", w.replyId && y("cancelReply"), ((_e2 = w.edit) == null ? void 0 : _e2.objectId) && y("cancelEdit");
      } catch (e4) {
        ue2.value = false, alert(e4.message);
      }
      var u;
    } else
      (_f = P.value) == null ? void 0 : _f.focus();
  }, Le2 = (e3) => {
    e3.preventDefault();
    const { lang: t3, serverURL: a } = b.value;
    (({ lang: e4, serverURL: t4 }) => {
      const a2 = (window.innerWidth - 450) / 2, n2 = (window.innerHeight - 450) / 2, l = window.open(`${t4}/ui/login?lng=${encodeURIComponent(e4)}`, "_blank", `width=450,height=450,left=${a2},top=${n2},scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no`);
      return l == null ? void 0 : l.postMessage({ type: "TOKEN", data: null }, "*"), new Promise((e5) => {
        const t5 = ({ data: a3 }) => {
          a3 && "object" == typeof a3 && "userInfo" === a3.type && a3.data.token && (l == null ? void 0 : l.close(), window.removeEventListener("message", t5), e5(a3.data));
        };
        window.addEventListener("message", t5);
      });
    })({ serverURL: a, lang: t3 }).then((e4) => {
      U.value = e4, (e4.remember ? localStorage : sessionStorage).setItem("WALINE_USER", JSON.stringify(e4)), y("log");
    });
  }, xe2 = () => {
    U.value = {}, localStorage.setItem("WALINE_USER", "null"), sessionStorage.setItem("WALINE_USER", "null"), y("log");
  }, Ie2 = (e3) => {
    e3.preventDefault();
    const { lang: t3, serverURL: a } = b.value, n2 = (window.innerWidth - 800) / 2, l = (window.innerHeight - 800) / 2, i = new URLSearchParams({ lng: t3, token: U.value.token }), o2 = window.open(`${a}/ui/profile?${i.toString()}`, "_blank", `width=800,height=800,left=${n2},top=${l},scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no`);
    o2 == null ? void 0 : o2.postMessage({ type: "TOKEN", data: U.value.token }, "*");
  }, Re2 = (e3) => {
    var _a2, _b, _c, _d;
    ((_a2 = N2.value) == null ? void 0 : _a2.contains(e3.target)) || ((_b = F2.value) == null ? void 0 : _b.contains(e3.target)) || (ee2.value = false), ((_c = K2.value) == null ? void 0 : _c.contains(e3.target)) || ((_d = q2.value) == null ? void 0 : _d.contains(e3.target)) || (te2.value = false);
  }, Ee2 = async (e3) => {
    var _a2;
    const { scrollTop: t3, clientHeight: a, scrollHeight: n2 } = e3.target, l = (a + t3) / n2, i = b.value.search, o2 = ((_a2 = J2.value) == null ? void 0 : _a2.value) || "";
    if (l < 0.9 || oe2.loading || de2.value)
      return;
    oe2.loading = true;
    (i.more && oe2.list.length ? await i.more(o2, oe2.list.length) : await i.search(o2)).length ? oe2.list = [...oe2.list, ...i.more && oe2.list.length ? await i.more(o2, oe2.list.length) : await i.search(o2)] : de2.value = true, oe2.loading = false, setTimeout(() => {
      e3.target.scrollTop = t3;
    }, 50);
  }, je2 = useDebounceFn((e3) => {
    oe2.list = [], de2.value = false, Ee2(e3);
  }, 300);
  watch([b, le2], ([e3, t3]) => {
    const { wordLimit: a } = e3;
    a ? t3 < a[0] && 0 !== a[0] ? (re2.value = a[0], se2.value = false) : t3 > a[1] ? (re2.value = a[1], se2.value = false) : (re2.value = a[1], se2.value = true) : (re2.value = 0, se2.value = true);
  }, { immediate: true });
  const Ae2 = ({ data: e3 }) => {
    e3 && "profile" === e3.type && (U.value = { ...U.value, ...e3.data }, [localStorage, sessionStorage].filter((e4) => e4.getItem("WALINE_USER")).forEach((e4) => e4.setItem("WALINE_USER", JSON.stringify(U))));
  };
  return onMounted(() => {
    var _a2;
    document.body.addEventListener("click", Re2), window.addEventListener("message", Ae2), ((_a2 = w.edit) == null ? void 0 : _a2.objectId) && (j.value = w.edit.orig), watch(te2, async (e3) => {
      if (!e3)
        return;
      const t3 = b.value.search;
      J2.value && (J2.value.value = ""), oe2.loading = true, oe2.list = t3.default ? await t3.default() : await t3.search(""), oe2.loading = false;
    }), watch(() => j.value, (e3) => {
      const { highlighter: t3, texRenderer: a } = b.value;
      ce2.value = e3, ne2.value = ht(e3, { emojiMap: Y2.value.map, highlighter: t3, texRenderer: a }), le2.value = ((e4) => {
        var _a3, _b;
        return (((_a3 = ((e5) => e5.match(/[\w\d\s,.\u00C0-\u024F\u0400-\u04FF]+/giu))(e4)) == null ? void 0 : _a3.reduce((e5, t4) => e5 + ("" === t4.trim() ? 0 : t4.trim().split(/\s+/u).length), 0)) || 0) + (((_b = ((e5) => e5.match(/[\u4E00-\u9FD5]/gu))(e4)) == null ? void 0 : _b.length) || 0);
      })(e3), e3 ? autosize_esm_default(P.value) : autosize_esm_default.destroy(P.value);
    }, { immediate: true }), watch(() => b.value.emoji, (e3) => {
      return (t3 = e3, Promise.all(t3.map((e4) => "string" == typeof e4 ? rt(_e(e4)) : Promise.resolve(e4))).then((e4) => {
        const t4 = { tabs: [], map: {} };
        return e4.forEach((e5) => {
          const { name: a, folder: n2, icon: l, prefix: i, type: o2, items: r2 } = e5;
          t4.tabs.push({ name: a, icon: st(l, n2, i, o2), items: r2.map((e6) => {
            const a2 = `${i || ""}${e6}`;
            return t4.map[a2] = st(e6, n2, i, o2), a2;
          }) });
        }), t4;
      })).then((e4) => {
        Y2.value = e4;
      });
      var t3;
    }, { immediate: true });
  }), onUnmounted(() => {
    document.body.removeEventListener("click", Re2), window.removeEventListener("message", Ae2);
  }), (e3, t3) => {
    var _a2, _b;
    return openBlock(), createElementBlock("div", gt, ["disable" !== unref(b).login && me2.value && !((_a2 = e3.edit) == null ? void 0 : _a2.objectId) ? (openBlock(), createElementBlock("div", ft, [createBaseVNode("div", yt, [createBaseVNode("button", { type: "submit", class: "wl-logout-btn", title: ve2.value.logout, onClick: xe2 }, [createVNode(unref(O), { size: 14 })], 8, wt), createBaseVNode("a", { href: "#", class: "wl-login-nick", "aria-label": "Profile", title: ve2.value.profile, onClick: Ie2 }, [createBaseVNode("img", { src: unref(U).avatar, alt: "avatar" }, null, 8, kt)], 8, bt)]), createBaseVNode("a", { href: "#", class: "wl-login-nick", "aria-label": "Profile", title: ve2.value.profile, onClick: Ie2, textContent: toDisplayString(unref(U).display_name) }, null, 8, Ct)])) : createCommentVNode("v-if", true), createBaseVNode("div", $t, ["force" !== unref(b).login && unref(b).meta.length && !me2.value ? (openBlock(), createElementBlock("div", { key: 0, class: normalizeClass(["wl-header", `item${unref(b).meta.length}`]) }, [(openBlock(true), createElementBlock(Fragment, null, renderList(unref(b).meta, (e4) => (openBlock(), createElementBlock("div", { key: e4, class: "wl-header-item" }, [createBaseVNode("label", { for: `wl-${e4}`, textContent: toDisplayString(ve2.value[e4] + (unref(b).requiredMeta.includes(e4) || !unref(b).requiredMeta.length ? "" : `(${ve2.value.optional})`)) }, null, 8, Lt), withDirectives(createBaseVNode("input", { id: `wl-${e4}`, ref_for: true, ref: (t4) => {
      t4 && (M.value[e4] = t4);
    }, "onUpdate:modelValue": (t4) => unref(S)[e4] = t4, class: normalizeClass(["wl-input", `wl-${e4}`]), name: e4, type: "mail" === e4 ? "email" : "text" }, null, 10, xt), [[vModelDynamic, unref(S)[e4]]])]))), 128))], 2)) : createCommentVNode("v-if", true), withDirectives(createBaseVNode("textarea", { id: "wl-edit", ref_key: "editorRef", ref: P, "onUpdate:modelValue": t3[0] || (t3[0] = (e4) => isRef(j) ? j.value = e4 : null), class: "wl-editor", placeholder: e3.replyUser ? `@${e3.replyUser}` : ve2.value.placeholder, onKeydown: ye2, onDrop: be2, onPaste: ke2 }, null, 40, It), [[vModelText, unref(j)]]), withDirectives(createBaseVNode("div", Rt, [Et, createBaseVNode("h4", null, toDisplayString(ve2.value.preview) + ":", 1), createBaseVNode("div", { class: "wl-content", innerHTML: ne2.value }, null, 8, jt)], 512), [[vShow, ae2.value]]), createBaseVNode("div", St, [createBaseVNode("div", At, [createBaseVNode("a", _t, [createVNode(unref(W))]), withDirectives(createBaseVNode("button", { ref_key: "emojiButtonRef", ref: N2, type: "button", class: normalizeClass(["wl-action", { active: ee2.value }]), title: ve2.value.emoji, onClick: t3[1] || (t3[1] = (e4) => ee2.value = !ee2.value) }, [createVNode(unref(T))], 10, zt), [[vShow, Y2.value.tabs.length]]), unref(b).search ? (openBlock(), createElementBlock("button", { key: 0, ref_key: "gifButtonRef", ref: K2, type: "button", class: normalizeClass(["wl-action", { active: te2.value }]), title: ve2.value.gif, onClick: t3[2] || (t3[2] = (e4) => te2.value = !te2.value) }, [createVNode(unref(Z))], 10, Ut)) : createCommentVNode("v-if", true), createBaseVNode("input", { id: "wl-image-upload", ref_key: "imageUploadRef", ref: V2, class: "upload", type: "file", accept: ".png,.jpg,.jpeg,.webp,.bmp,.gif", onChange: Ce2 }, null, 544), he2.value ? (openBlock(), createElementBlock("label", { key: 1, for: "wl-image-upload", class: "wl-action", title: ve2.value.uploadImage }, [createVNode(unref(D))], 8, Mt)) : createCommentVNode("v-if", true), createBaseVNode("button", { type: "button", class: normalizeClass(["wl-action", { active: ae2.value }]), title: ve2.value.preview, onClick: t3[3] || (t3[3] = (e4) => ae2.value = !ae2.value) }, [createVNode(unref(B))], 10, Ht)]), createBaseVNode("div", Pt, [Ot, createBaseVNode("div", Vt, [createTextVNode(toDisplayString(le2.value) + " ", 1), unref(b).wordLimit ? (openBlock(), createElementBlock("span", Tt, [createTextVNode("  /  "), createBaseVNode("span", { class: normalizeClass({ illegal: !se2.value }), textContent: toDisplayString(re2.value) }, null, 10, Dt)])) : createCommentVNode("v-if", true), createTextVNode("  " + toDisplayString(ve2.value.word), 1)]), "disable" === unref(b).login || me2.value ? createCommentVNode("v-if", true) : (openBlock(), createElementBlock("button", { key: 0, type: "button", class: "wl-btn", onClick: Le2, textContent: toDisplayString(ve2.value.login) }, null, 8, Nt)), "force" !== unref(b).login || me2.value ? (openBlock(), createElementBlock("button", { key: 1, type: "submit", class: "primary wl-btn", title: "Cmd|Ctrl + Enter", disabled: ue2.value, onClick: $e2 }, [ue2.value ? (openBlock(), createBlock(unref(G), { key: 0, size: 16 })) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [createTextVNode(toDisplayString(ve2.value.submit), 1)], 64))], 8, Bt)) : createCommentVNode("v-if", true)]), createBaseVNode("div", { ref_key: "gifPopupRef", ref: q2, class: normalizeClass(["wl-gif-popup", { display: te2.value }]) }, [createBaseVNode("input", { ref_key: "gifSearchInputRef", ref: J2, type: "text", placeholder: ve2.value.gifSearchPlaceholder, onInput: t3[4] || (t3[4] = (...e4) => unref(je2) && unref(je2)(...e4)) }, null, 40, Wt), oe2.list.length ? (openBlock(), createBlock(Se, { key: 0, items: oe2.list, "column-width": 200, gap: 6, onInsert: t3[5] || (t3[5] = (e4) => fe2(e4)), onScroll: Ee2 }, null, 8, ["items"])) : createCommentVNode("v-if", true), oe2.loading ? (openBlock(), createElementBlock("div", Ft, [createVNode(unref(G), { size: 30 })])) : createCommentVNode("v-if", true)], 2), createBaseVNode("div", { ref_key: "emojiPopupRef", ref: F2, class: normalizeClass(["wl-emoji-popup", { display: ee2.value }]) }, [(openBlock(true), createElementBlock(Fragment, null, renderList(Y2.value.tabs, (e4, t4) => (openBlock(), createElementBlock(Fragment, { key: e4.name }, [t4 === X2.value ? (openBlock(), createElementBlock("div", Kt, [(openBlock(true), createElementBlock(Fragment, null, renderList(e4.items, (e5) => (openBlock(), createElementBlock("button", { key: e5, type: "button", title: e5, onClick: (t5) => fe2(`:${e5}:`) }, [ee2.value ? (openBlock(), createElementBlock("img", { key: 0, class: "wl-emoji", src: Y2.value.map[e5], alt: e5, loading: "lazy", referrerPolicy: "no-referrer" }, null, 8, Gt)) : createCommentVNode("v-if", true)], 8, qt))), 128))])) : createCommentVNode("v-if", true)], 64))), 128)), Y2.value.tabs.length > 1 ? (openBlock(), createElementBlock("div", Zt, [(openBlock(true), createElementBlock(Fragment, null, renderList(Y2.value.tabs, (e4, t4) => (openBlock(), createElementBlock("button", { key: e4.name, type: "button", class: normalizeClass(["wl-tab", { active: X2.value === t4 }]), onClick: (e5) => X2.value = t4 }, [createBaseVNode("img", { class: "wl-emoji", src: e4.icon, alt: e4.name, title: e4.name, loading: "lazy", referrerPolicy: "no-referrer" }, null, 8, Yt)], 10, Jt))), 128))])) : createCommentVNode("v-if", true)], 2)])]), e3.replyId || ((_b = e3.edit) == null ? void 0 : _b.objectId) ? (openBlock(), createElementBlock("button", { key: 1, type: "button", class: "wl-close", title: ve2.value.cancelReply, onClick: t3[6] || (t3[6] = (t4) => e3.$emit(e3.replyId ? "cancelReply" : "cancelEdit")) }, [createVNode(unref(O), { size: 24 })], 8, Xt)) : createCommentVNode("v-if", true)]);
  };
} });
var ea = Ie(Qt, [["__file", "CommentBox.vue"]]);
var ta = ["id"];
var aa = { class: "wl-user", "aria-hidden": "true" };
var na = ["src"];
var la = { class: "wl-card" };
var ia = { class: "wl-head" };
var oa = ["href"];
var ra = { key: 1, class: "wl-nick" };
var sa = ["textContent"];
var ca = ["textContent"];
var ua = ["textContent"];
var da = ["textContent"];
var va = ["textContent"];
var ma = { class: "wl-comment-actions" };
var pa = ["title"];
var ha = ["textContent"];
var ga = ["title"];
var fa = { class: "wl-meta", "aria-hidden": "true" };
var ya = ["data-value", "textContent"];
var wa = ["data-value", "textContent"];
var ba = ["data-value", "textContent"];
var ka = ["innerHTML"];
var Ca = { key: 1, class: "wl-admin-actions" };
var $a = { class: "wl-comment-status" };
var La = ["disabled", "onClick", "textContent"];
var xa = { key: 3, class: "wl-quote" };
var Ia = Ie(defineComponent({ __name: "CommentCard", props: { comment: {}, edit: { default: null }, rootId: {}, reply: { default: null } }, emits: ["log", "submit", "delete", "edit", "like", "status", "sticky", "reply"], setup(e2) {
  const t2 = e2, n2 = ["approved", "waiting", "spam"], i = inject("config"), o2 = te(), r2 = useNow(), y = ge(), w = computed(() => i.value.locale), b = computed(() => {
    const { link: e3 } = t2.comment;
    return e3 ? ze(e3) ? e3 : `https://${e3}` : "";
  }), k = computed(() => o2.value.includes(t2.comment.objectId)), $ = computed(() => it(t2.comment.insertedAt, r2.value, w.value)), L = computed(() => "administrator" === y.value.type), x = computed(() => t2.comment.user_id && y.value.objectId === t2.comment.user_id), I = computed(() => {
    var _a2;
    return t2.comment.objectId === ((_a2 = t2.reply) == null ? void 0 : _a2.objectId);
  }), R = computed(() => {
    var _a2;
    return t2.comment.objectId === ((_a2 = t2.edit) == null ? void 0 : _a2.objectId);
  });
  return (e3, t3) => {
    var _a2;
    const a = resolveComponent("CommentCard", true);
    return openBlock(), createElementBlock("div", { id: e3.comment.objectId, class: "wl-card-item" }, [createBaseVNode("div", aa, [e3.comment.avatar ? (openBlock(), createElementBlock("img", { key: 0, src: e3.comment.avatar }, null, 8, na)) : createCommentVNode("v-if", true), e3.comment.type ? (openBlock(), createBlock(unref(q), { key: 1 })) : createCommentVNode("v-if", true)]), createBaseVNode("div", la, [createBaseVNode("div", ia, [b.value ? (openBlock(), createElementBlock("a", { key: 0, class: "wl-nick", href: b.value, target: "_blank", rel: "nofollow noopener noreferrer" }, toDisplayString(e3.comment.nick), 9, oa)) : (openBlock(), createElementBlock("span", ra, toDisplayString(e3.comment.nick), 1)), "administrator" === e3.comment.type ? (openBlock(), createElementBlock("span", { key: 2, class: "wl-badge", textContent: toDisplayString(w.value.admin) }, null, 8, sa)) : createCommentVNode("v-if", true), e3.comment.label ? (openBlock(), createElementBlock("span", { key: 3, class: "wl-badge", textContent: toDisplayString(e3.comment.label) }, null, 8, ca)) : createCommentVNode("v-if", true), e3.comment.sticky ? (openBlock(), createElementBlock("span", { key: 4, class: "wl-badge", textContent: toDisplayString(w.value.sticky) }, null, 8, ua)) : createCommentVNode("v-if", true), void 0 !== e3.comment.level && e3.comment.level >= 0 ? (openBlock(), createElementBlock("span", { key: 5, class: normalizeClass(`wl-badge level${e3.comment.level}`), textContent: toDisplayString(w.value[`level${e3.comment.level}`] || `Level ${e3.comment.level}`) }, null, 10, da)) : createCommentVNode("v-if", true), createBaseVNode("span", { class: "wl-time", textContent: toDisplayString($.value) }, null, 8, va), createBaseVNode("div", ma, [L.value || x.value ? (openBlock(), createElementBlock("button", { key: 0, type: "button", class: "wl-edit", onClick: t3[0] || (t3[0] = () => e3.$emit("edit", e3.comment)) }, [createVNode(unref(K))])) : createCommentVNode("v-if", true), L.value || x.value ? (openBlock(), createElementBlock("button", { key: 1, type: "button", class: "wl-delete", onClick: t3[1] || (t3[1] = (t4) => e3.$emit("delete", e3.comment)) }, [createVNode(unref(V))])) : createCommentVNode("v-if", true), createBaseVNode("button", { type: "button", class: "wl-like", title: k.value ? w.value.cancelLike : w.value.like, onClick: t3[2] || (t3[2] = (t4) => e3.$emit("like", e3.comment)) }, [createVNode(unref(N), { active: k.value }, null, 8, ["active"]), "like" in e3.comment ? (openBlock(), createElementBlock("span", { key: 0, textContent: toDisplayString(e3.comment.like) }, null, 8, ha)) : createCommentVNode("v-if", true)], 8, pa), createBaseVNode("button", { type: "button", class: normalizeClass(["wl-reply", { active: I.value }]), title: I.value ? w.value.cancelReply : w.value.reply, onClick: t3[3] || (t3[3] = (t4) => e3.$emit("reply", I.value ? null : e3.comment)) }, [createVNode(unref(F))], 10, ga)])]), createBaseVNode("div", fa, [e3.comment.addr ? (openBlock(), createElementBlock("span", { key: 0, class: "wl-addr", "data-value": e3.comment.addr, textContent: toDisplayString(e3.comment.addr) }, null, 8, ya)) : createCommentVNode("v-if", true), e3.comment.browser ? (openBlock(), createElementBlock("span", { key: 1, class: "wl-browser", "data-value": e3.comment.browser, textContent: toDisplayString(e3.comment.browser) }, null, 8, wa)) : createCommentVNode("v-if", true), e3.comment.os ? (openBlock(), createElementBlock("span", { key: 2, class: "wl-os", "data-value": e3.comment.os, textContent: toDisplayString(e3.comment.os) }, null, 8, ba)) : createCommentVNode("v-if", true)]), R.value ? createCommentVNode("v-if", true) : (openBlock(), createElementBlock("div", { key: 0, class: "wl-content", innerHTML: e3.comment.comment }, null, 8, ka)), L.value && !R.value ? (openBlock(), createElementBlock("div", Ca, [createBaseVNode("span", $a, [(openBlock(), createElementBlock(Fragment, null, renderList(n2, (t4) => createBaseVNode("button", { key: t4, type: "submit", class: normalizeClass(`wl-btn wl-${t4}`), disabled: e3.comment.status === t4, onClick: (a2) => e3.$emit("status", { status: t4, comment: e3.comment }), textContent: toDisplayString(w.value[t4]) }, null, 10, La)), 64))]), L.value && !e3.comment.rid ? (openBlock(), createElementBlock("button", { key: 0, type: "submit", class: "wl-btn wl-sticky", onClick: t3[4] || (t3[4] = (t4) => e3.$emit("sticky", e3.comment)) }, toDisplayString(e3.comment.sticky ? w.value.unsticky : w.value.sticky), 1)) : createCommentVNode("v-if", true)])) : createCommentVNode("v-if", true), I.value || R.value ? (openBlock(), createElementBlock("div", { key: 2, class: normalizeClass({ "wl-reply-wrapper": I.value, "wl-edit-wrapper": R.value }) }, [createVNode(ea, { edit: e3.edit, "reply-id": (_a2 = e3.reply) == null ? void 0 : _a2.objectId, "reply-user": e3.comment.nick, "root-id": e3.rootId, onLog: t3[5] || (t3[5] = (t4) => e3.$emit("log")), onCancelReply: t3[6] || (t3[6] = (t4) => e3.$emit("reply", null)), onCancelEdit: t3[7] || (t3[7] = (t4) => e3.$emit("edit", null)), onSubmit: t3[8] || (t3[8] = (t4) => e3.$emit("submit", t4)) }, null, 8, ["edit", "reply-id", "reply-user", "root-id"])], 2)) : createCommentVNode("v-if", true), e3.comment.children ? (openBlock(), createElementBlock("div", xa, [(openBlock(true), createElementBlock(Fragment, null, renderList(e3.comment.children, (n3) => (openBlock(), createBlock(a, { key: n3.objectId, comment: n3, reply: e3.reply, edit: e3.edit, "root-id": e3.rootId, onLog: t3[9] || (t3[9] = (t4) => e3.$emit("log")), onDelete: t3[10] || (t3[10] = (t4) => e3.$emit("delete", t4)), onEdit: t3[11] || (t3[11] = (t4) => e3.$emit("edit", t4)), onLike: t3[12] || (t3[12] = (t4) => e3.$emit("like", t4)), onReply: t3[13] || (t3[13] = (t4) => e3.$emit("reply", t4)), onStatus: t3[14] || (t3[14] = (t4) => e3.$emit("status", t4)), onSticky: t3[15] || (t3[15] = (t4) => e3.$emit("sticky", t4)), onSubmit: t3[16] || (t3[16] = (t4) => e3.$emit("submit", t4)) }, null, 8, ["comment", "reply", "edit", "root-id"]))), 128))])) : createCommentVNode("v-if", true)])], 8, ta);
  };
} }), [["__file", "CommentCard.vue"]]);
var Ra = "2.15.8";
var Ea = { "data-waline": "" };
var ja = { class: "wl-meta-head" };
var Sa = { class: "wl-count" };
var Aa = ["textContent"];
var _a = { class: "wl-sort" };
var za = ["onClick"];
var Ua = { class: "wl-cards" };
var Ma = { key: 1, class: "wl-operation" };
var Ha = ["textContent"];
var Pa = { key: 0, class: "wl-loading" };
var Oa = ["textContent"];
var Va = { key: 2, class: "wl-operation" };
var Ta = ["textContent"];
var Da = { key: 3, class: "wl-power" };
var Na = createBaseVNode("a", { href: "https://github.com/walinejs/waline", target: "_blank", rel: "noopener noreferrer" }, " Waline ", -1);
var Ba = defineComponent({ __name: "WalineComment", props: ["serverURL", "path", "meta", "requiredMeta", "dark", "commentSorting", "lang", "locale", "pageSize", "wordLimit", "emoji", "login", "highlighter", "texRenderer", "imageUploader", "search", "copyright", "recaptchaV3Key", "turnstileKey", "reaction"], setup(e2) {
  const t2 = e2, a = { latest: "insertedAt_desc", oldest: "insertedAt_asc", hottest: "like_desc" }, y = Object.keys(a), w = ge(), b = te(), k = ref("loading"), $ = ref(0), L = ref(1), x = ref(0), I = computed(() => (({ serverURL: e3, path: t3 = location.pathname, lang: a2 = "undefined" == typeof navigator ? "en-US" : navigator.language, locale: n2, emoji: l = He, meta: i = ["nick", "mail", "link"], requiredMeta: o2 = [], dark: r2 = false, pageSize: s = 10, wordLimit: c, imageUploader: u, highlighter: d, texRenderer: v, copyright: m = true, login: p = "enable", search: h2, reaction: g, recaptchaV3Key: f = "", turnstileKey: y2 = "", commentSorting: w2 = "latest", ...b2 }) => ({ serverURL: et(e3), path: Ae(t3), locale: { ...Qe[a2] || Qe["en-US"], ..."object" == typeof n2 ? n2 : {} }, wordLimit: tt(c), meta: Me(i), requiredMeta: Me(o2), imageUploader: at(u, Oe), highlighter: at(d, We), texRenderer: at(v, Ve), lang: Object.keys(Qe).includes(a2) ? a2 : "en-US", dark: r2, emoji: "boolean" == typeof l ? l ? He : [] : l, pageSize: s, login: p, copyright: m, search: false !== h2 && ("object" == typeof h2 ? h2 : Te(a2)), recaptchaV3Key: f, turnstileKey: y2, reaction: Array.isArray(g) ? g : true === g ? Pe : [], commentSorting: w2, ...b2 }))(t2)), R = ref(I.value.commentSorting), j = ref([]), A = ref(null), _ = ref(null), z = computed(() => {
    return "string" == typeof (e3 = I.value.dark) ? "auto" === e3 ? `@media(prefers-color-scheme:dark){body${nt}}` : `${e3}${nt}` : true === e3 ? `:root${nt}` : "";
    var e3;
  }), U = computed(() => I.value.locale);
  let H;
  useStyleTag(z, { id: "waline-darkmode" });
  const P = (e3) => {
    var _a2;
    const { serverURL: t3, path: n2, pageSize: l } = I.value, i = new AbortController();
    k.value = "loading", H == null ? void 0 : H(), (({ serverURL: e4, lang: t4, path: a2, page: n3, pageSize: l2, sortBy: i2, signal: o2, token: r2 }) => {
      const s = {};
      return r2 && (s.Authorization = `Bearer ${r2}`), fetch(`${e4}/comment?path=${encodeURIComponent(a2)}&pageSize=${l2}&page=${n3}&lang=${t4}&sortBy=${i2}`, { signal: o2, headers: s }).then((e5) => e5.json()).then((e5) => Y(e5, "Get comment data"));
    })({ serverURL: t3, lang: I.value.lang, path: n2, pageSize: l, sortBy: a[R.value], page: e3, signal: i.signal, token: (_a2 = w.value) == null ? void 0 : _a2.token }).then((t4) => {
      k.value = "success", $.value = t4.count, j.value.push(...t4.data), L.value = e3, x.value = t4.totalPages;
    }).catch((e4) => {
      "AbortError" !== e4.name && (console.error(e4.message), k.value = "error");
    }), H = i.abort.bind(i);
  }, O2 = () => P(L.value + 1), V2 = () => {
    $.value = 0, j.value = [], P(1);
  }, T2 = (e3) => {
    A.value = e3;
  }, D2 = (e3) => {
    _.value = e3;
  }, N2 = (e3) => {
    if (_.value)
      _.value.comment = e3.comment, _.value.orig = e3.orig;
    else if (e3.rid) {
      const t3 = j.value.find(({ objectId: t4 }) => t4 === e3.rid);
      if (!t3)
        return;
      Array.isArray(t3.children) || (t3.children = []), t3.children.push(e3);
    } else
      j.value.unshift(e3), $.value += 1;
  }, B2 = async ({ comment: e3, status: t3 }) => {
    var _a2;
    if (e3.status === t3)
      return;
    const { serverURL: a2, lang: n2 } = I.value;
    await Q({ serverURL: a2, lang: n2, token: (_a2 = w.value) == null ? void 0 : _a2.token, objectId: e3.objectId, comment: { status: t3 } }), e3.status = t3;
  }, W2 = async (e3) => {
    var _a2;
    if (e3.rid)
      return;
    const { serverURL: t3, lang: a2 } = I.value;
    await Q({ serverURL: t3, lang: a2, token: (_a2 = w.value) == null ? void 0 : _a2.token, objectId: e3.objectId, comment: { sticky: e3.sticky ? 0 : 1 } }), e3.sticky = !e3.sticky;
  }, F2 = async ({ objectId: e3 }) => {
    var _a2;
    if (!confirm("Are you sure you want to delete this comment?"))
      return;
    const { serverURL: t3, lang: a2 } = I.value;
    await (({ serverURL: e4, lang: t4, token: a3, objectId: n2 }) => fetch(`${e4}/comment/${n2}?lang=${t4}`, { method: "DELETE", headers: { Authorization: `Bearer ${a3}` } }).then((e5) => e5.json()).then((e5) => Y(e5, "Delete comment")))({ serverURL: t3, lang: a2, token: (_a2 = w.value) == null ? void 0 : _a2.token, objectId: e3 }), j.value.some((t4, a3) => t4.objectId === e3 ? (j.value = j.value.filter((e4, t5) => t5 !== a3), true) : t4.children.some((n2, l) => n2.objectId === e3 && (j.value[a3].children = t4.children.filter((e4, t5) => t5 !== l), true)));
  }, K2 = async (e3) => {
    var _a2;
    const { serverURL: t3, lang: a2 } = I.value, { objectId: n2 } = e3, l = b.value.includes(n2);
    await Q({ serverURL: t3, lang: a2, objectId: n2, token: (_a2 = w.value) == null ? void 0 : _a2.token, comment: { like: !l } }), l ? b.value = b.value.filter((e4) => e4 !== n2) : (b.value = [...b.value, n2], b.value.length > 50 && (b.value = b.value.slice(-50))), e3.like = (e3.like || 0) + (l ? -1 : 1);
  };
  return provide("config", I), onMounted(() => {
    watch(() => [t2.serverURL, t2.path], () => V2(), { immediate: true });
  }), onUnmounted(() => H == null ? void 0 : H()), (e3, t3) => (openBlock(), createElementBlock("div", Ea, [createVNode(Re), A.value ? createCommentVNode("v-if", true) : (openBlock(), createBlock(ea, { key: 0, onLog: V2, onSubmit: N2 })), createBaseVNode("div", ja, [createBaseVNode("div", Sa, [$.value ? (openBlock(), createElementBlock("span", { key: 0, class: "wl-num", textContent: toDisplayString($.value) }, null, 8, Aa)) : createCommentVNode("v-if", true), createTextVNode(" " + toDisplayString(U.value.comment), 1)]), createBaseVNode("ul", _a, [(openBlock(true), createElementBlock(Fragment, null, renderList(unref(y), (e4) => (openBlock(), createElementBlock("li", { key: e4, class: normalizeClass([e4 === R.value ? "active" : ""]), onClick: (t4) => ((e5) => {
    R.value !== e5 && (R.value = e5, V2());
  })(e4) }, toDisplayString(U.value[e4]), 11, za))), 128))])]), createBaseVNode("div", Ua, [(openBlock(true), createElementBlock(Fragment, null, renderList(j.value, (e4) => (openBlock(), createBlock(Ia, { key: e4.objectId, "root-id": e4.objectId, comment: e4, reply: A.value, edit: _.value, onLog: V2, onReply: T2, onEdit: D2, onSubmit: N2, onStatus: B2, onDelete: F2, onSticky: W2, onLike: K2 }, null, 8, ["root-id", "comment", "reply", "edit"]))), 128))]), "error" === k.value ? (openBlock(), createElementBlock("div", Ma, [createBaseVNode("button", { type: "button", class: "wl-btn", onClick: V2, textContent: toDisplayString(U.value.refresh) }, null, 8, Ha)])) : (openBlock(), createElementBlock(Fragment, { key: 2 }, ["loading" === k.value ? (openBlock(), createElementBlock("div", Pa, [createVNode(unref(G), { size: 30 })])) : j.value.length ? L.value < x.value ? (openBlock(), createElementBlock("div", Va, [createBaseVNode("button", { type: "button", class: "wl-btn", onClick: O2, textContent: toDisplayString(U.value.more) }, null, 8, Ta)])) : createCommentVNode("v-if", true) : (openBlock(), createElementBlock("div", { key: 1, class: "wl-empty", textContent: toDisplayString(U.value.sofa) }, null, 8, Oa))], 64)), I.value.copyright ? (openBlock(), createElementBlock("div", Da, [createTextVNode(" Powered by "), Na, createTextVNode(" v" + toDisplayString(unref(Ra)), 1)])) : createCommentVNode("v-if", true)]));
} });
var Wa = Ie(Ba, [["__file", "WalineComment.vue"]]);
export {
  Wa as Waline,
  Ra as version
};
//# sourceMappingURL=@waline_client_component.js.map
