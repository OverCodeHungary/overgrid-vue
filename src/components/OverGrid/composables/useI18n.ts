import i18nhu from '../i18n/hu.i18n'
import i18nen from '../i18n/en.i18n'
import i18nes from '../i18n/es.i18n'
import i18nde from '../i18n/de.i18n'
import { ref } from 'vue'
let currentLang = ref<string>('en')

interface I18n {
  [key: string]: { [key: string]: string }
}

// Custom language can be set by the user, so it is not included in the predefined languages
const possibleLanguages = ['hu', 'en', 'es', 'de']
let i18n: I18n = {
  hu: i18nhu,
  en: i18nen,
  es: i18nes,
  de: i18nde,
  custom: null as any,
}

export default function useI18n(lang?: string | Record<string, string> | undefined) {
  function storeMissingLangKeys(key: string, lang: string) {
    let cVal = localStorage.getItem('missing-lang-keys-' + lang)
    if (!cVal) {
      cVal = ''
    }

    let cArray = cVal.split(',')
    if (!cArray.includes(key)) {
      cArray.push(key)
    }
    localStorage.setItem('missing-lang-keys-' + lang, cArray.join(','))
  }

  let l = (key: string, params?: Record<string, string>): string => {
    if (!i18n[currentLang.value][key]) {
      storeMissingLangKeys(key, currentLang.value)
    }

    if (params) {
      let tempStr = i18n[currentLang.value][key]
      if (!tempStr) return key

      for (let i in params) {
        tempStr = tempStr.replace('{' + i + '}', params[i])
      }

      return tempStr
    } else {
      return i18n[currentLang.value][key] || key
    }
  }

  if (lang && lang !== currentLang.value && possibleLanguages.includes(lang as string) && typeof lang === 'string') {
    currentLang.value = lang
  }

  if (lang && typeof lang === 'object') {
    i18n['custom'] = lang
    currentLang.value = 'custom'
  }

  return {
    l,
  }
}
