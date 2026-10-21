/* =========================================================
   ISOKO DIGITAL — MINI I18N  (English / Kinyarwanda / Français)
   Load AFTER appearance.js. Mark text with data-i18n="key"
   ========================================================= */
var CL_I18N = {
  en: {
    settings: 'Open settings',
    theme: 'Theme', themeBlur: 'Standard', themeLight: 'Light', themeDark: 'Dark',
    language: 'Language',
    toastTheme: '🎨 Theme: ', toastLang: '🌐 Language: ',
    welcome: '👋 Welcome to Isoko Digital',
    tagline: 'One source. One mission. One Rwanda.',
    welcomeText: 'News, bookmarks, business and community — all in one place.',
    join: 'Join Isoko Digital →',
    briefTitle: 'The Rwanda Brief', briefSub: 'Latest news & updates',
    bookmarksTitle: 'Bookmarks', bookmarksSub: 'Saved links & resources',
    advertTitle: 'Advert Hub', advertSub: 'Promote your business',
    funTitle: 'Fun Zone', funSub: 'Games, quizzes & riddles',
    statHubs: 'Hubs', statArticles: 'Articles', statMade: 'Made in Rwanda',
    about: 'About', contact: 'Contact', privacy: 'Privacy',
    built: 'Built in Kigali'
  },
  rw: {
    settings: 'Fungura igenamiterere',
    theme: 'Isura', themeBlur: 'Bisanzwe', themeLight: 'Umucyo', themeDark: 'Umwijima',
    language: 'Ururimi',
    toastTheme: '🎨 Isura: ', toastLang: '🌐 Ururimi: ',
    welcome: '👋 Murakaza neza kuri Isoko Digital',
    tagline: 'Isoko rimwe. Umuhigo umwe. U Rwanda rumwe.',
    welcomeText: 'Amakuru, ibyo wabitse, ubucuruzi n’umuryango — byose ahantu hamwe.',
    join: 'Injira muri Isoko Digital →',
    briefTitle: 'The Rwanda Brief', briefSub: 'Amakuru agezweho',
    bookmarksTitle: 'Ibyabitswe', bookmarksSub: 'Imirongo n’ibikoresho byabitswe',
    advertTitle: 'Amatangazo', advertSub: 'Menyekanisha ubucuruzi bwawe',
    funTitle: 'Imyidagaduro', funSub: 'Imikino, ibibazo n’ibisakuzo',
    statHubs: 'Ibyiciro', statArticles: 'Inkuru', statMade: 'Byakorewe mu Rwanda',
    about: 'Abo turi bo', contact: 'Twandikire', privacy: 'Ibanga ryawe',
    built: 'Byubatswe i Kigali'
  },
  fr: {
    settings: 'Ouvrir les paramètres',
    theme: 'Thème', themeBlur: 'Standard', themeLight: 'Clair', themeDark: 'Sombre',
    language: 'Langue',
    toastTheme: '🎨 Thème : ', toastLang: '🌐 Langue : ',
    welcome: '👋 Bienvenue sur Isoko Digital',
    tagline: 'Une source. Une mission. Un Rwanda.',
    welcomeText: 'Actualités, favoris, annonces et communauté — tout au même endroit.',
    join: 'Rejoindre Isoko Digital →',
    briefTitle: 'The Rwanda Brief', briefSub: 'Dernières actualités',
    bookmarksTitle: 'Favoris', bookmarksSub: 'Liens et ressources enregistrés',
    advertTitle: 'Espace annonces', advertSub: 'Promouvez votre entreprise',
    funTitle: 'Espace détente', funSub: 'Jeux, quiz et devinettes',
    statHubs: 'Espaces', statArticles: 'Articles', statMade: 'Fait au Rwanda',
    about: 'À propos', contact: 'Contact', privacy: 'Confidentialité',
    built: 'Conçu à Kigali'
  }
};

function t(key) {
  var lang = (window.CLAppearance && CLAppearance.getLang()) || 'en';
  return (CL_I18N[lang] && CL_I18N[lang][key]) || CL_I18N.en[key] || key;
}

function applyTranslations(root) {
  var scope = root || document;
  var els = scope.querySelectorAll('[data-i18n]');
  for (var i = 0; i < els.length; i++) {
    els[i].textContent = t(els[i].getAttribute('data-i18n'));
  }
  var aria = scope.querySelectorAll('[data-i18n-aria]');
  for (var j = 0; j < aria.length; j++) {
    aria[j].setAttribute('aria-label', t(aria[j].getAttribute('data-i18n-aria')));
  }
}

document.addEventListener('DOMContentLoaded', function () { applyTranslations(); });