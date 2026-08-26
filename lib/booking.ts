/**
 * Shared booking-form rules — used by both the dialog and the API route so the
 * client and the server can never disagree about what a valid request is.
 */

export interface BookingData {
  name: string
  phone: string
}

export type BookingField = 'name' | 'phone' | 'website'

export type BookingValidation =
  | { ok: true, data: BookingData }
  | { ok: false, field: BookingField, message: string }

export const NAME_MIN = 2
export const NAME_MAX = 60

/**
 * Normalizes the formats Ukrainians actually type — `0983693213`,
 * `+38 (098) 369-32-13`, `380983693213`, `983693213` — into `+380XXXXXXXXX`.
 * Returns null when the input can't be read as a Ukrainian number.
 */
export function normalizePhone(raw: string): string | null {
  const digits = raw.replace(/\D/g, '')

  let local: string
  if (digits.length === 9)
    local = digits
  else if (digits.length === 10 && digits.startsWith('0'))
    local = digits.slice(1)
  else if (digits.length === 11 && digits.startsWith('80'))
    local = digits.slice(2)
  else if (digits.length === 12 && digits.startsWith('380'))
    local = digits.slice(3)
  else
    return null

  // Ukrainian operator and area codes all start with 3-9; 0-2 are not assigned.
  if (!/^[3-9]\d{8}$/.test(local))
    return null

  return `+380${local}`
}

/** Pretty-prints a normalized number as `+380 98 369 32 13`. */
export function formatPhone(normalized: string): string {
  const m = normalized.match(/^\+380(\d{2})(\d{3})(\d{2})(\d{2})$/)
  return m ? `+380 ${m[1]} ${m[2]} ${m[3]} ${m[4]}` : normalized
}

export function normalizeName(raw: string): string {
  return raw.trim().replace(/\s+/g, ' ')
}

/**
 * Validates one submission. `website` is the honeypot: a real person never
 * sees the field, so any value in it means a bot filled the form.
 */
export function validateBooking(input: {
  name?: unknown
  phone?: unknown
  website?: unknown
}): BookingValidation {
  if (typeof input.website === 'string' && input.website.trim() !== '')
    return { ok: false, field: 'website', message: 'Не вдалося надіслати заявку.' }

  if (typeof input.name !== 'string')
    return { ok: false, field: 'name', message: 'Вкажіть, будь ласка, ваше ім\'я.' }

  const name = normalizeName(input.name)
  if (name.length < NAME_MIN || name.length > NAME_MAX)
    return { ok: false, field: 'name', message: `Ім'я має містити від ${NAME_MIN} до ${NAME_MAX} символів.` }
  if (!/\p{L}/u.test(name))
    return { ok: false, field: 'name', message: 'Ім\'я має містити літери.' }

  if (typeof input.phone !== 'string')
    return { ok: false, field: 'phone', message: 'Вкажіть, будь ласка, номер телефону.' }

  const phone = normalizePhone(input.phone)
  if (!phone)
    return { ok: false, field: 'phone', message: 'Перевірте номер телефону — наприклад, 098 369 32 13.' }

  return { ok: true, data: { name, phone } }
}
