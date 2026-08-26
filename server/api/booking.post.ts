import { formatPhone, validateBooking } from '~/lib/booking'

/** Telegram's HTML parse mode only requires these three to be escaped. */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function kyivTimestamp(): string {
  return new Intl.DateTimeFormat('uk-UA', {
    timeZone: 'Europe/Kyiv',
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(new Date())
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event).catch(() => null)

  if (!body || typeof body !== 'object') {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      message: 'Не вдалося прочитати заявку.',
    })
  }

  const result = validateBooking(body as Record<string, unknown>)
  if (!result.ok) {
    // The honeypot is answered with the same 400 a human typo gets, so a bot
    // learns nothing about why it failed.
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      message: result.message,
      data: { field: result.field },
    })
  }

  const { telegramBotToken, telegramChatId } = useRuntimeConfig(event)
  if (!telegramBotToken || !telegramChatId) {
    console.error('[booking] TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID are not configured')
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
      message: 'Форма тимчасово недоступна. Напишіть, будь ласка, у месенджер.',
    })
  }

  const { name, phone } = result.data
  const text = [
    '🌸 <b>Нова заявка на курс</b>',
    '',
    `<b>Ім'я:</b> ${escapeHtml(name)}`,
    `<b>Телефон:</b> <a href="tel:${phone}">${escapeHtml(formatPhone(phone))}</a>`,
    `<b>Час:</b> ${escapeHtml(kyivTimestamp())}`,
  ].join('\n')

  try {
    await $fetch(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
      method: 'POST',
      body: {
        chat_id: telegramChatId,
        text,
        parse_mode: 'HTML',
        disable_web_page_preview: true,
      },
    })
  }
  catch (error) {
    console.error('[booking] Telegram sendMessage failed', error)
    throw createError({
      statusCode: 502,
      statusMessage: 'Bad Gateway',
      message: 'Не вдалося надіслати заявку. Спробуйте ще раз або напишіть у месенджер.',
    })
  }

  return { ok: true }
})
