/* =========================================================
   CL.CONNECT RWANDA — SETTINGS MENU (theme + language)
   Inject into any element with [data-settings-slot].
   Falls back to .site-header or .header-right if absent.
   ========================================================= */
(function () {
  'use strict';

  var THEME_LABEL_KEY = { blur: 'themeBlur', light: 'themeLight', dark: 'themeDark' };
  var LANG_NAME = { en: 'English', rw: 'Kinyarwanda', fr: 'Français' };

  var GEAR_SVG =
    '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" ' +
    'stroke="currentColor" stroke-width="2" stroke-linecap="round" ' +
    'stroke-linejoin="round" aria-hidden="true">' +
    '<circle cx="12" cy="12" r="3"></circle>' +
    '<path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path>' +
    '</svg>';

  function buildHTML() {
    return (
      '<div class="header-actions">' +
        '<button type="button" class="icon-btn" aria-label="Open settings" ' +
                'aria-expanded="false" aria-controls="settingsMenu">' +
          GEAR_SVG +
        '</button>' +
        '<div id="settingsMenu" class="settings-menu" hidden role="menu">' +
          '<div class="menu-section">' +
            '<p class="menu-label" data-i18n="theme">Theme</p>' +
            '<button type="button" class="menu-item" data-action="appearance" data-value="blur" data-i18n="themeBlur">Standard</button>' +
            '<button type="button" class="menu-item" data-action="appearance" data-value="light" data-i18n="themeLight">Light</button>' +
            '<button type="button" class="menu-item" data-action="appearance" data-value="dark" data-i18n="themeDark">Dark</button>' +
          '</div>' +
          '<div class="menu-divider" role="separator"></div>' +
          '<div class="menu-section">' +
            '<p class="menu-label" data-i18n="language">Language</p>' +
            '<button type="button" class="menu-item" data-action="lang" data-value="en" lang="en">English</button>' +
            '<button type="button" class="menu-item" data-action="lang" data-value="rw" lang="rw">Kinyarwanda</button>' +
            '<button type="button" class="menu-item" data-action="lang" data-value="fr" lang="fr">Français</button>' +
          '</div>' +
        '</div>' +
      '</div>'
    );
  }

  function init() {
    if (typeof window.CLAppearance === 'undefined') return;

    // Find where to inject
    var slot = document.querySelector('[data-settings-slot]');

    if (!slot) {
      // Fallback A: append to .site-header
      var header = document.querySelector('.site-header');
      if (header && !header.querySelector('.header-actions')) {
        slot = document.createElement('div');
        header.appendChild(slot);
      } else {
        // Fallback B: append to .header-right
        var right = document.querySelector('.header-right');
        if (right && !right.querySelector('.header-actions')) {
          slot = document.createElement('div');
          right.appendChild(slot);
        }
      }
    }

    if (!slot) return;

    slot.innerHTML = buildHTML();

    var btn  = slot.querySelector('.icon-btn');
    var menu = slot.querySelector('.settings-menu');

    function syncChecks() {
      var appearance = window.CLAppearance.get();
      var lang       = window.CLAppearance.getLang();

      menu.querySelectorAll('[data-action="appearance"]').forEach(function (b) {
        var on = b.dataset.value === appearance;
        b.classList.toggle('checked', on);
        b.setAttribute('role', 'menuitemradio');
        b.setAttribute('aria-checked', String(on));
      });
      menu.querySelectorAll('[data-action="lang"]').forEach(function (b) {
        var on = b.dataset.value === lang;
        b.classList.toggle('checked', on);
        b.setAttribute('role', 'menuitemradio');
        b.setAttribute('aria-checked', String(on));
      });
    }

    function closeMenu() {
      menu.hidden = true;
      btn.setAttribute('aria-expanded', 'false');
    }
    function openMenu() {
      menu.hidden = false;
      btn.setAttribute('aria-expanded', 'true');
      syncChecks();
    }

    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      if (menu.hidden) openMenu(); else closeMenu();
    });

    document.addEventListener('click', function (e) {
      if (!menu.hidden && !slot.contains(e.target)) closeMenu();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !menu.hidden) {
        closeMenu();
        btn.focus();
      }
    });

    menu.querySelectorAll('.menu-item').forEach(function (item) {
      item.addEventListener('click', function () {
        var action = item.dataset.action;
        var value  = item.dataset.value;

        if (action === 'appearance') {
          window.CLAppearance.set(value);
          if (typeof window.showToast === 'function' && typeof window.t === 'function') {
            window.showToast(window.t('toastTheme') + window.t(THEME_LABEL_KEY[value]));
          }
        } else if (action === 'lang') {
          window.CLAppearance.setLang(value);
          if (typeof window.applyTranslations === 'function') window.applyTranslations();
          if (typeof window.showToast === 'function' && typeof window.t === 'function') {
            window.showToast(window.t('toastLang') + LANG_NAME[value]);
          }
        }

        syncChecks();
        closeMenu();
      });
    });

    if (typeof window.applyTranslations === 'function') window.applyTranslations();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();