/* =========================================================
   CL.CONNECT RWANDA — APPEARANCE + LANGUAGE (saved choices)
   Load in <head> BEFORE the CSS so the theme applies with no flash.
   appearance: 'blur' (Standard) | 'light' | 'dark'
   language:   'en' | 'rw' | 'fr'
   ========================================================= */
var CLAppearance = (function () {
  'use strict';

  var APPEARANCE_KEY = 'clconnect_appearance';
  var LANG_KEY = 'clconnect_lang';
  var MODES = ['blur', 'light', 'dark'];
  var LANGS = ['en', 'rw', 'fr'];

  function read(key, fallback) {
    try { return window.localStorage.getItem(key) || fallback; }
    catch (err) { return fallback; }
  }

  function write(key, value) {
    try { window.localStorage.setItem(key, value); } catch (err) { /* private mode */ }
  }

  function get() {
    var v = read(APPEARANCE_KEY, 'blur');
    return MODES.indexOf(v) > -1 ? v : 'blur';
  }

  function set(mode) {
    if (MODES.indexOf(mode) < 0) mode = 'blur';
    write(APPEARANCE_KEY, mode);
    document.documentElement.setAttribute('data-appearance', mode);
  }

  function getLang() {
    var v = read(LANG_KEY, 'en');
    return LANGS.indexOf(v) > -1 ? v : 'en';
  }

  function setLang(lang) {
    if (LANGS.indexOf(lang) < 0) lang = 'en';
    write(LANG_KEY, lang);
    document.documentElement.setAttribute('lang', lang);
  }

  document.documentElement.setAttribute('data-appearance', get());
  document.documentElement.setAttribute('lang', getLang());

  return { get: get, set: set, getLang: getLang, setLang: setLang };
})();