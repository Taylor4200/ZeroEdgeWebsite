import { NextRequest, NextResponse } from 'next/server'
import { resolveRequiredAge } from './src/lib/age-geo'

// Run on the Edge
export const config = {
  matcher: ['/((?!_next|favicon.ico|robots.txt|sitemap.xml|api).*)'],
}

export function middleware(req: NextRequest) {
  // Dev bypass helper: /?age=dev  → set age 18 and accept gate
  const url = new URL(req.url)
  if (process.env.NODE_ENV === 'development' && url.searchParams.get('age') === 'dev') {
    const res = NextResponse.next()
    res.cookies.set('ze_required_age', '18', { path: '/', sameSite: 'lax' })
    res.cookies.set('ze_age_ok', '1', { path: '/', sameSite: 'lax' })
    res.cookies.set('ze_region', 'DEV', { path: '/', sameSite: 'lax' })
    return res
  }

  // Vercel provides geo in request; also allow header overrides for local testing
  const country =
    req.geo?.country ||
    req.headers.get('x-vercel-ip-country') || // manual override
    ''

  // Subdivision/region (e.g., US-CA). Vercel puts the subdivision code in req.geo?.region.
  // We'll compose "CC-REG" if both are present.
  const subdivision = req.geo?.region || req.headers.get('x-vercel-ip-country-region') || ''
  const regionCode = country && subdivision ? `${country}-${subdivision}` : ''

  const requiredAge = resolveRequiredAge(country, regionCode)

  const res = NextResponse.next()

  // Only refresh cookies if missing or changed
  const ageCookie = req.cookies.get('ze_required_age')?.value
  const regionCookie = req.cookies.get('ze_region')?.value

  if (ageCookie !== String(requiredAge)) {
    res.cookies.set('ze_required_age', String(requiredAge), {
      path: '/',
      sameSite: 'lax',
      // Short TTL to allow quick legal updates; UI confirmation has its own cookie
      maxAge: 60 * 60 * 24 * 14, // 14 days
    })
  }
  if (regionCookie !== (regionCode || country)) {
    res.cookies.set('ze_region', regionCode || country, {
      path: '/',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 14,
    })
  }

  return res
}
