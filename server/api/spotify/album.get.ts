let cachedToken = ''
let tokenExpiry = 0

export default defineEventHandler(async (event) => {
  const { spotifyClientId, spotifyClientSecret } = useRuntimeConfig()

  if (!spotifyClientId || !spotifyClientSecret) {
    throw createError({ statusCode: 500, message: 'Spotify credentials not configured. Add SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET to your .env file.' })
  }

  const raw = String(getQuery(event).id ?? '')
  const id = raw.includes('spotify.com/album/')
    ? raw.split('spotify.com/album/')[1].split('?')[0]
    : raw.trim()

  if (!id) throw createError({ statusCode: 400, message: 'Missing album id' })

  if (!cachedToken || Date.now() > tokenExpiry) {
    const res = await $fetch<{ access_token: string; expires_in: number }>(
      'https://accounts.spotify.com/api/token',
      {
        method: 'POST',
        headers: {
          Authorization: `Basic ${Buffer.from(`${spotifyClientId}:${spotifyClientSecret}`).toString('base64')}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'grant_type=client_credentials',
      },
    )
    cachedToken = res.access_token
    tokenExpiry = Date.now() + (res.expires_in - 60) * 1000
  }

  const album = await $fetch<any>(`https://api.spotify.com/v1/albums/${id}`, {
    headers: { Authorization: `Bearer ${cachedToken}` },
  })

  return {
    spotifyId: id,
    title: album.name,
    artist: album.artists.map((a: any) => a.name).join(', '),
    year: parseInt(album.release_date.split('-')[0]),
    cover: album.images[0]?.url ?? null,
  }
})
