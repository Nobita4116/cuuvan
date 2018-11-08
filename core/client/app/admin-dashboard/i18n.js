import i18n from 'i18next';
import Backend from 'i18next-xhr-backend';
import { reactI18nextModule } from 'react-i18next';

let lang = window.localStorage.getItem("town_lang") || 'en';

i18n
  .use(Backend)
  .use(reactI18nextModule)
  .init({
    lng: lang,
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json?t=1',
      resGetPath: '/locales/{{lng}}/{{ns}}.json?t=1'
    },
    fallbackLng: 'vi',
    ns: ['translations'],
    defaultNS: 'translations',
    debug: false,

    react: {
      wait: true
    }
  });


export default i18n;