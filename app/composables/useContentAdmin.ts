export function useContentAdmin(type: string) {
  const entries = ref<any[]>([])
  const saving = ref(false)

  async function load() {
    entries.value = await $fetch(`/api/content/${type}`)
  }

  async function create(meta: Record<string, any>, body: string) {
    saving.value = true
    try {
      await $fetch(`/api/content/${type}`, { method: 'POST', body: { meta, body } })
      await load()
    } finally {
      saving.value = false
    }
  }

  async function update(slug: string, meta: Record<string, any>, body: string) {
    saving.value = true
    try {
      await $fetch(`/api/content/${type}/${slug}`, { method: 'PUT', body: { meta, body } })
      await load()
    } finally {
      saving.value = false
    }
  }

  async function remove(slug: string) {
    await $fetch(`/api/content/${type}/${slug}`, { method: 'DELETE' })
    await load()
  }

  return { entries, saving, load, create, update, remove }
}
