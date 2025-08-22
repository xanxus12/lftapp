import { getCountries, getCountryCallingCode } from 'libphonenumber-js'
import countries from 'i18n-iso-countries'

// Initialize countries with English locale
countries.registerLocale(require('i18n-iso-countries/langs/en.json'))

export interface CountryCode {
  code: string
  country: string
  flag: string
  iso: string
}

// Get all available country codes with proper formatting
export function getAllCountryCodes(): CountryCode[] {
  const allCountries = getCountries()
  const countryMap = new Map<string, CountryCode>()
  
  allCountries.forEach(iso => {
    const callingCode = getCountryCallingCode(iso as any)
    const countryName = countries.getName(iso, 'en')
    
    // Generate flag emoji from ISO country code
    const flag = getFlagEmoji(iso)
    
    const countryCode: CountryCode = {
      code: `+${callingCode}`,
      country: countryName || iso,
      flag,
      iso
    }
    
    // Use a unique key that combines calling code and ISO to handle duplicates
    const uniqueKey = `${callingCode}-${iso}`
    
    // Only add if we don't have this calling code yet, or if this is a main country
    if (!countryMap.has(callingCode.toString()) || isMainCountryForCode(iso, callingCode.toString())) {
      countryMap.set(callingCode.toString(), countryCode)
    }
  })
  
  return Array.from(countryMap.values()).sort((a, b) => a.country.localeCompare(b.country))
}

// Helper function to determine if a country is the main country for a calling code
function isMainCountryForCode(iso: string, callingCode: string): boolean {
  // Define main countries for shared calling codes
  const mainCountries: Record<string, string> = {
    '1': 'US',     // US/Canada - prefer US
    '7': 'RU',     // Russia/Kazakhstan - prefer Russia
    '212': 'MA',   // Morocco/Western Sahara - prefer Morocco
    '262': 'RE',   // Réunion/Mayotte - prefer Réunion
    '290': 'SH',   // Saint Helena - prefer Saint Helena
    '358': 'FI',   // Finland/Åland Islands - prefer Finland
    '590': 'GP',   // Guadeloupe/Saint Barthélemy/Saint Martin - prefer Guadeloupe
    '596': 'MQ',   // Martinique - prefer Martinique
    '687': 'NC',   // New Caledonia - prefer New Caledonia
    '689': 'PF',   // French Polynesia - prefer French Polynesia
  }
  
  return mainCountries[callingCode] === iso.toUpperCase()
}

// Convert ISO country code to flag emoji
function getFlagEmoji(iso: string): string {
  try {
    const codePoints = iso
      .toUpperCase()
      .split('')
      .map(char => 127397 + char.charCodeAt(0))
    
    const flag = String.fromCodePoint(...codePoints)
    
    // Fallback for common countries if emoji doesn't render
    const fallbackFlags: Record<string, string> = {
      'US': '🇺🇸',
      'GB': '🇬🇧',
      'ES': '🇪🇸',
      'FR': '🇫🇷',
      'DE': '🇩🇪',
      'IT': '🇮🇹',
      'NL': '🇳🇱',
      'SE': '🇸🇪',
      'NO': '🇳🇴',
      'DK': '🇩🇰',
      'CH': '🇨🇭',
      'BE': '🇧🇪',
      'AT': '🇦🇹',
      'PL': '🇵🇱',
      'CZ': '🇨🇿',
      'HU': '🇭🇺',
      'GR': '🇬🇷',
      'PT': '🇵🇹',
      'IE': '🇮🇪',
      'FI': '🇫🇮',
      'RU': '🇷🇺',
      'UA': '🇺🇦',
      'TR': '🇹🇷',
      'JP': '🇯🇵',
      'CN': '🇨🇳',
      'IN': '🇮🇳',
      'AU': '🇦🇺',
      'NZ': '🇳🇿',
      'BR': '🇧🇷',
      'MX': '🇲🇽',
      'AR': '🇦🇷',
      'CA': '🇨🇦'
    }
    
    return fallbackFlags[iso.toUpperCase()] || flag
  } catch (error) {
    console.log('Flag generation failed for ISO:', iso, error)
    return '🏳️' // Fallback flag
  }
}

// Get user's location and suggest country code
export async function getUserLocation(): Promise<string | null> {
  try {
    // Try to get location from IP geolocation
    const response = await fetch('https://ipapi.co/json/')
    const data = await response.json()
    
    if (data.country_code) {
      return data.country_code.toLowerCase()
    }
  } catch (error) {
    console.log('Could not detect location from IP:', error)
  }
  
  try {
    // Fallback to browser geolocation (requires user permission)
    if ('geolocation' in navigator) {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          timeout: 5000,
          enableHighAccuracy: false
        })
      })
      
      // Reverse geocode coordinates to get country
      const response = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&localityLanguage=en`
      )
      const data = await response.json()
      
      if (data.countryCode) {
        return data.countryCode.toLowerCase()
      }
    }
  } catch (error) {
    console.log('Could not detect location from coordinates:', error)
  }
  
  return null
}

// Get country code by ISO
export function getCountryCodeByISO(iso: string): CountryCode | null {
  const allCodes = getAllCountryCodes()
  return allCodes.find(country => country.iso === iso) || null
}

// Get default country code (fallback to US)
export function getDefaultCountryCode(): CountryCode {
  return getCountryCodeByISO('us') || getAllCountryCodes()[0]
}
