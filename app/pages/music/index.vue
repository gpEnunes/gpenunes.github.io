<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
    <p class="text-xs font-semibold uppercase tracking-widest mb-4" style="color: rgba(255,255,255,0.4)">Sounds</p>
    <h1 class="text-5xl sm:text-6xl font-bold mb-4 leading-none bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">
      Music
    </h1>
    <p class="text-lg mb-10" style="color: var(--muted)">Albums that matter, for every state of mind.</p>

    <!-- Shelf tabs -->
    <div class="overflow-x-auto pb-1 mb-10 scrollbar-none">
      <div class="flex gap-1 p-1 rounded-xl w-fit" style="background: var(--card); border: 1px solid var(--border)">
        <button
          v-for="shelf in shelves"
          :key="shelf.id"
          @click="selectShelf(shelf.id)"
          class="px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap"
          :class="activeShelf === shelf.id ? 'bg-white text-black' : 'text-white/50 hover:text-white'"
        >
          {{ shelf.label }}
        </button>
      </div>
    </div>

    <!-- Album grid -->
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
      <button
        v-for="album in currentAlbums"
        :key="album.title"
        @click="toggleAlbum(album)"
        class="group text-left rounded-2xl overflow-hidden border transition-all duration-200"
        :style="{
          borderColor: activeAlbum?.title === album.title ? 'rgba(255,255,255,0.5)' : 'var(--border)',
          background: 'var(--card)',
        }"
      >
        <div class="aspect-square overflow-hidden">
          <img
            :src="album.cover"
            :alt="album.title"
            class="w-full h-full object-cover transition-all duration-500"
            :class="activeAlbum?.title === album.title ? 'opacity-100 scale-105' : 'opacity-70 group-hover:opacity-90 group-hover:scale-105'"
          />
        </div>
        <div class="p-3">
          <p class="text-white text-sm font-medium leading-snug line-clamp-1">{{ album.title }}</p>
          <p class="text-xs mt-0.5 line-clamp-1" style="color: var(--muted)">{{ album.artist }} · {{ album.year }}</p>
        </div>
      </button>
    </div>

    <!-- Player zone -->
    <Transition name="player">
      <div
        v-if="activeAlbum"
        class="rounded-2xl overflow-hidden border"
        style="border-color: var(--border); background: var(--card)"
      >
        <div class="p-5 flex items-start justify-between gap-4 border-b" style="border-color: var(--border)">
          <div>
            <p class="text-white font-semibold">{{ activeAlbum.title }}</p>
            <p class="text-sm mt-0.5" style="color: var(--muted)">{{ activeAlbum.artist }} · {{ activeAlbum.year }}</p>
            <p class="text-sm mt-3 leading-relaxed" style="color: rgba(255,255,255,0.45)">{{ activeAlbum.note }}</p>
          </div>
          <button
            @click="activeAlbum = null"
            class="mt-0.5 shrink-0 transition-colors"
            style="color: rgba(255,255,255,0.3)"
            @mouseenter="$event.target.style.color='rgba(255,255,255,0.7)'"
            @mouseleave="$event.target.style.color='rgba(255,255,255,0.3)'"
          >
            <X :size="18" />
          </button>
        </div>
        <div v-if="activeAlbum.spotifyId">
          <iframe
            :src="`https://open.spotify.com/embed/album/${activeAlbum.spotifyId}?utm_source=generator&theme=0`"
            width="100%"
            height="352"
            frameborder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            class="block"
          />
        </div>
        <div v-else class="p-5 flex items-center gap-3">
          <Music :size="15" style="color: var(--muted)" class="shrink-0" />
          <a
            :href="`https://open.spotify.com/search/${encodeURIComponent(activeAlbum.title + ' ' + activeAlbum.artist)}`"
            target="_blank"
            rel="noopener"
            class="text-sm underline underline-offset-4 transition-opacity hover:opacity-60"
            style="color: var(--muted)"
          >
            Search on Spotify
          </a>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { X, Music } from 'lucide-vue-next'

useSeoMeta({ title: 'Music — Emerson Nunes', description: 'Albums that matter, for every state of mind.' })

// To get a Spotify album ID: open the album on Spotify → Share → Copy link
// URL format: open.spotify.com/album/{spotifyId}
// Set spotifyId to null to show a "Search on Spotify" fallback instead of the embed

const shelves = [
  {
    id: 'deep-focus',
    label: 'Deep Focus',
    albums: [
      {
        title: 'The Dark Side of the Moon',
        artist: 'Pink Floyd',
        year: 1973,
        spotifyId: null,
        cover: 'https://images.unsplash.com/photo-1534643960519-11ad79bc19df?w=400&q=80',
        note: '48 minutes that make the world disappear.',
      },
      {
        title: 'In the Court of the Crimson King',
        artist: 'King Crimson',
        year: 1969,
        spotifyId: null,
        cover: 'https://images.unsplash.com/photo-1616356607338-fd87169ecf1a?w=400&q=80',
        note: 'The blueprint for every prog record that followed.',
      },
      {
        title: 'Dopesmoker',
        artist: 'Sleep',
        year: 2003,
        spotifyId: null,
        cover: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=400&q=80',
        note: 'One riff, 63 minutes, total dissolution.',
      },
      {
        title: 'Animals',
        artist: 'Pink Floyd',
        year: 1977,
        spotifyId: null,
        cover: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&q=80',
        note: 'Bleaker than Dark Side. Better for the right state of mind.',
      },
    ],
  },
  {
    id: 'late-night',
    label: 'Late Night',
    albums: [
      {
        title: 'Closer',
        artist: 'Joy Division',
        year: 1980,
        spotifyId: null,
        cover: 'https://images.unsplash.com/photo-1519162808019-7de1683fa2ad?w=400&q=80',
        note: 'Ian Curtis\' last record. Nothing before or since sounds like grief this pure.',
      },
      {
        title: 'Disintegration',
        artist: 'The Cure',
        year: 1989,
        spotifyId: null,
        cover: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80',
        note: 'Walls of sound, deep sadness. A masterpiece.',
      },
      {
        title: 'Pornography',
        artist: 'The Cure',
        year: 1982,
        spotifyId: null,
        cover: 'https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=400&q=80',
        note: 'Robert Smith at his most broken.',
      },
      {
        title: 'Filosofem',
        artist: 'Burzum',
        year: 1996,
        spotifyId: null,
        cover: 'https://images.unsplash.com/photo-1554189097-ffe88e998a2b?w=400&q=80',
        note: 'Droning and cold. Meant to be experienced in the dark.',
      },
    ],
  },
  {
    id: 'drive',
    label: 'Drive',
    albums: [
      {
        title: 'Physical Graffiti',
        artist: 'Led Zeppelin',
        year: 1975,
        spotifyId: null,
        cover: 'https://images.unsplash.com/photo-1544985361-b420d7a77043?w=400&q=80',
        note: 'Two records, zero filler, infinite road ahead.',
      },
      {
        title: 'Superunknown',
        artist: 'Soundgarden',
        year: 1994,
        spotifyId: null,
        cover: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=400&q=80',
        note: 'Grunge at its most cinematic.',
      },
      {
        title: 'Welcome to Sky Valley',
        artist: 'Kyuss',
        year: 1994,
        spotifyId: null,
        cover: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400&q=80',
        note: 'Desert heat in album form. Play loud, drive fast.',
      },
      {
        title: 'Powerslave',
        artist: 'Iron Maiden',
        year: 1984,
        spotifyId: null,
        cover: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400&q=80',
        note: 'The sound of driving through the night and not stopping.',
      },
    ],
  },
  {
    id: 'rage',
    label: 'Rage',
    albums: [
      {
        title: 'Master of Puppets',
        artist: 'Metallica',
        year: 1986,
        spotifyId: null,
        cover: 'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=400&q=80',
        note: 'The perfect thrash album. Still nothing comes close.',
      },
      {
        title: 'Reign in Blood',
        artist: 'Slayer',
        year: 1986,
        spotifyId: null,
        cover: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&q=80',
        note: '28 minutes of pure aggression. Not one second wasted.',
      },
      {
        title: 'The Downward Spiral',
        artist: 'Nine Inch Nails',
        year: 1994,
        spotifyId: null,
        cover: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&q=80',
        note: 'Industrial rage that somehow became art.',
      },
      {
        title: 'Rust in Peace',
        artist: 'Megadeth',
        year: 1990,
        spotifyId: null,
        cover: 'https://images.unsplash.com/photo-1519689373023-dd07c7988603?w=400&q=80',
        note: 'Technical precision at full speed.',
      },
    ],
  },
  {
    id: 'melancholy',
    label: 'Melancholy',
    albums: [
      {
        title: 'In Utero',
        artist: 'Nirvana',
        year: 1993,
        spotifyId: null,
        cover: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=400&q=80',
        note: 'Not Nevermind. This one is the real Cobain.',
      },
      {
        title: 'OK Computer',
        artist: 'Radiohead',
        year: 1997,
        spotifyId: null,
        cover: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&q=80',
        note: 'The sound of anxiety before we had a word for it.',
      },
      {
        title: 'Souvlaki',
        artist: 'Slowdive',
        year: 1994,
        spotifyId: null,
        cover: 'https://images.unsplash.com/photo-1553481187-be93c21490a9?w=400&q=80',
        note: 'Shoegaze at its most aching.',
      },
      {
        title: 'Unknown Pleasures',
        artist: 'Joy Division',
        year: 1979,
        spotifyId: null,
        cover: 'https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=400&q=80',
        note: 'Post-punk at its most profound. The pulsar on the cover says it all.',
      },
    ],
  },
  {
    id: 'party',
    label: 'Party',
    albums: [
      {
        title: 'Back in Black',
        artist: 'AC/DC',
        year: 1980,
        spotifyId: null,
        cover: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=400&q=80',
        note: 'The best party record ever made. No argument.',
      },
      {
        title: 'Is This It',
        artist: 'The Strokes',
        year: 2001,
        spotifyId: null,
        cover: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&q=80',
        note: 'New York cool. Every track works at every volume.',
      },
      {
        title: 'Appetite for Destruction',
        artist: 'Guns N\' Roses',
        year: 1987,
        spotifyId: null,
        cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&q=80',
        note: 'The last great dangerous rock record.',
      },
      {
        title: 'Highway to Hell',
        artist: 'AC/DC',
        year: 1979,
        spotifyId: null,
        cover: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=400&q=80',
        note: 'Bon Scott\'s finest. The title track alone earns its place here.',
      },
    ],
  },
  {
    id: 'classics',
    label: 'Classics',
    albums: [
      {
        title: 'Paranoid',
        artist: 'Black Sabbath',
        year: 1970,
        spotifyId: null,
        cover: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=400&q=80',
        note: 'The invention of heavy metal on a single record.',
      },
      {
        title: 'Are You Experienced',
        artist: 'Jimi Hendrix',
        year: 1967,
        spotifyId: null,
        cover: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&q=80',
        note: 'Nothing before it. Nothing quite like it after.',
      },
      {
        title: 'Led Zeppelin IV',
        artist: 'Led Zeppelin',
        year: 1971,
        spotifyId: null,
        cover: 'https://images.unsplash.com/photo-1477233534935-f5e6fe7c1159?w=400&q=80',
        note: 'Bonham\'s drums in a stairwell. Still hits harder than anything recorded since.',
      },
      {
        title: 'Nevermind',
        artist: 'Nirvana',
        year: 1991,
        spotifyId: null,
        cover: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=400&q=80',
        note: 'The record that changed everything — even if In Utero is better.',
      },
    ],
  },
]

const activeShelf = ref('deep-focus')
const activeAlbum = ref(null)

const currentAlbums = computed(() =>
  shelves.find(s => s.id === activeShelf.value)?.albums ?? []
)

function selectShelf(id) {
  activeShelf.value = id
  activeAlbum.value = null
}

function toggleAlbum(album) {
  activeAlbum.value = activeAlbum.value?.title === album.title ? null : album
}
</script>

<style scoped>
.scrollbar-none {
  scrollbar-width: none;
}
.scrollbar-none::-webkit-scrollbar {
  display: none;
}

.player-enter-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.player-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.player-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.player-leave-to {
  opacity: 0;
  transform: translateY(6px);
}
</style>
