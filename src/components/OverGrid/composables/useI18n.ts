import i18nhu from '../i18n/hu.i18n'
import i18nen from '../i18n/en.i18n'

let currentLang = 'en'

interface I18n {
  [key: string]: { [key: string]: string }
}

let i18n: I18n = {
  hu: i18nhu,
  en: i18nen,
}

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
  if (!i18n[currentLang][key]) {
    storeMissingLangKeys(key, currentLang)
  }

  if (params) {
    let tempStr = i18n[currentLang][key]
    if (!tempStr) return key

    for (let i in params) {
      tempStr = tempStr.replace('{' + i + '}', params[i])
    }

    return tempStr
  } else {
    return i18n[currentLang][key] || key
  }
}

export default function useI18n(lang?: string | Record<string, string> | undefined) {
  if (lang && typeof lang === 'object') {
    i18n['custom'] = lang
    currentLang = 'custom'
  } else {
    currentLang = lang || 'en'
  }

  return {
    l,
  }
}
