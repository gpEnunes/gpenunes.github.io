<template>
  <div class="max-w-3xl mx-auto px-4 sm:px-6 py-10">
    <div class="flex items-center justify-between mb-8">
      <h1 class="text-2xl font-bold text-white">Cooking</h1>
      <button @click="startNew" class="px-4 py-2 rounded-xl text-sm font-medium text-black" style="background: white">+ New Recipe</button>
    </div>

    <!-- Form -->
    <div v-if="mode !== 'list'" class="rounded-2xl border p-6 mb-8" style="border-color: var(--border); background: var(--card)">
      <div class="flex items-center justify-between mb-5">
        <h2 class="text-xs font-semibold uppercase tracking-widest" style="color: rgba(255,255,255,0.4)">
          {{ mode === 'create' ? 'New Recipe' : 'Editing: ' + selected?.slug }}
        </h2>
        <button @click="cancel" class="text-xs transition-colors hover:text-white" style="color: var(--muted)">Cancel</button>
      </div>

      <div class="space-y-4">
        <AdminField label="Title"><input v-model="f.title" type="text" v-bind="input" /></AdminField>
        <AdminField label="Description"><input v-model="f.description" type="text" v-bind="input" /></AdminField>
        <div class="grid grid-cols-3 gap-3">
          <AdminField label="Date"><input v-model="f.date" type="date" v-bind="input" /></AdminField>
          <AdminField label="Time (e.g. 30 min)"><input v-model="f.time" type="text" v-bind="input" /></AdminField>
          <AdminField label="Servings"><input v-model.number="f.servings" type="number" v-bind="input" /></AdminField>
        </div>
        <AdminField label="Image URL"><input v-model="f.image" type="text" v-bind="input" placeholder="https://..." /></AdminField>
        <AdminField label="Tags (comma-separated)"><input v-model="f.tags" type="text" v-bind="input" placeholder="Italian, Pasta, Simple" /></AdminField>
        <AdminField label="Ingredients (one per line)">
          <textarea v-model="f.ingredients" rows="6" v-bind="input" class="resize-y font-mono text-xs" placeholder="200g spaghetti&#10;6 cloves garlic" />
        </AdminField>
        <AdminField label="Instructions (one per line)">
          <textarea v-model="f.instructions" rows="6" v-bind="input" class="resize-y font-mono text-xs" placeholder="Cook pasta in salted water&#10;Heat olive oil..." />
        </AdminField>
        <AdminField label="Body (markdown)">
          <textarea v-model="f.body" rows="6" v-bind="input" class="resize-y font-mono text-xs" placeholder="Optional extra content..." />
        </AdminField>
      </div>

      <button @click="save" :disabled="!f.title || saving" class="mt-6 w-full py-3 rounded-xl text-sm font-semibold transition-all disabled:opacity-30 text-black" style="background: white">
        {{ saving ? 'Saving…' : 'Save Recipe' }}
      </button>
    </div>

    <!-- Entry list -->
    <AdminEntryList :entries="entries" @edit="startEdit" @delete="del" />
  </div>
</template>

<script setup>
definePageMeta({ layout: 'admin', middleware: 'admin' })
useSeoMeta({ title: 'Cooking Admin' })

const { entries, saving, load, create, update, remove } = useContentAdmin('cooking')
await load()

const mode = ref('list')
const selected = ref(null)

const empty = () => ({ title: '', description: '', date: today(), time: '', servings: '', image: '', tags: '', ingredients: '', instructions: '', body: '' })
const f = reactive(empty())

const input = { class: 'w-full rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/20 outline-none focus:ring-1 focus:ring-white/20', style: 'background: rgba(255,255,255,0.05); border: 1px solid var(--border)' }

function today() {
  return new Date().toISOString().split('T')[0]
}

function startNew() {
  Object.assign(f, empty())
  selected.value = null
  mode.value = 'create'
}

function startEdit(entry) {
  selected.value = entry
  const m = entry.meta
  Object.assign(f, {
    title: m.title ?? '',
    description: m.description ?? '',
    date: m.date ?? today(),
    time: m.time ?? '',
    servings: m.servings ?? '',
    image: m.image ?? '',
    tags: Array.isArray(m.tags) ? m.tags.join(', ') : (m.tags ?? ''),
    ingredients: Array.isArray(m.ingredients) ? m.ingredients.join('\n') : '',
    instructions: Array.isArray(m.instructions) ? m.instructions.join('\n') : '',
    body: entry.body ?? '',
  })
  mode.value = 'edit'
}

function cancel() {
  mode.value = 'list'
  selected.value = null
}

async function save() {
  const meta = {
    title: f.title,
    description: f.description,
    date: f.date,
    ...(f.image && { image: f.image }),
    ...(f.time && { time: f.time }),
    ...(f.servings !== '' && { servings: Number(f.servings) }),
    ...(f.tags && { tags: f.tags.split(',').map(s => s.trim()).filter(Boolean) }),
    ...(f.ingredients && { ingredients: f.ingredients.split('\n').map(s => s.trim()).filter(Boolean) }),
    ...(f.instructions && { instructions: f.instructions.split('\n').map(s => s.trim()).filter(Boolean) }),
  }

  if (mode.value === 'create') {
    await create(meta, f.body)
  } else {
    await update(selected.value.slug, meta, f.body)
  }
  cancel()
}

async function del(entry) {
  if (!confirm(`Delete "${entry.meta.title}"?`)) return
  await remove(entry.slug)
}
</script>
