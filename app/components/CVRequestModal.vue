<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="open"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
        style="background: rgba(0,0,0,0.75); backdrop-filter: blur(4px)"
        @click.self="$emit('close')"
      >
        <div
          class="relative w-full max-w-md rounded-2xl border p-8"
          style="background: #141414; border-color: rgba(255,255,255,0.12)"
        >
          <button
            @click="$emit('close')"
            class="absolute top-4 right-4 p-1.5 rounded-lg transition-colors hover:bg-white/10"
            style="color: var(--muted)"
            :aria-label="$t('modal.close')"
          >
            <X :size="16" />
          </button>

          <div class="mb-6">
            <h3 class="text-xl font-semibold text-white">{{ $t('modal.cv_title') }}</h3>
            <p class="text-sm mt-1" style="color: var(--muted)">{{ $t('modal.cv_subtitle') }}</p>
          </div>

          <form @submit.prevent="submit" class="space-y-4" novalidate>
            <div>
              <label class="block text-xs font-medium mb-1.5" style="color: var(--muted)">{{ $t('modal.name_label') }} <span style="color: #7c5cff">*</span></label>
              <input
                v-model="form.name"
                type="text"
                placeholder="Jane Smith"
                class="w-full rounded-lg px-3 py-2.5 text-sm outline-none text-white"
                style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1)"
                :style="errors.name ? { borderColor: '#f87171' } : {}"
              />
              <p v-if="errors.name" class="text-xs mt-1" style="color: #f87171">{{ errors.name }}</p>
            </div>

            <div>
              <label class="block text-xs font-medium mb-1.5" style="color: var(--muted)">{{ $t('modal.email_label') }} <span style="color: #7c5cff">*</span></label>
              <input
                v-model="form.email"
                type="email"
                placeholder="jane@company.com"
                class="w-full rounded-lg px-3 py-2.5 text-sm outline-none text-white"
                style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1)"
                :style="errors.email ? { borderColor: '#f87171' } : {}"
              />
              <p v-if="errors.email" class="text-xs mt-1" style="color: #f87171">{{ errors.email }}</p>
            </div>

            <div>
              <label class="block text-xs font-medium mb-1.5" style="color: var(--muted)">{{ $t('modal.cv_company_label') }} <span style="color: #7c5cff">*</span></label>
              <input
                v-model="form.company"
                type="text"
                placeholder="Acme Corp"
                class="w-full rounded-lg px-3 py-2.5 text-sm outline-none text-white"
                style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1)"
                :style="errors.company ? { borderColor: '#f87171' } : {}"
              />
              <p v-if="errors.company" class="text-xs mt-1" style="color: #f87171">{{ errors.company }}</p>
            </div>

            <div>
              <label class="block text-xs font-medium mb-1.5" style="color: var(--muted)">{{ $t('modal.cv_reason_label') }} <span style="color: #7c5cff">*</span></label>
              <input
                v-model="form.reason"
                type="text"
                :placeholder="$t('modal.cv_reason_placeholder')"
                class="w-full rounded-lg px-3 py-2.5 text-sm outline-none text-white"
                style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1)"
                :style="errors.reason ? { borderColor: '#f87171' } : {}"
              />
              <p v-if="errors.reason" class="text-xs mt-1" style="color: #f87171">{{ errors.reason }}</p>
            </div>

            <div>
              <label class="block text-xs font-medium mb-1.5" style="color: var(--muted)">{{ $t('modal.message_label') }} <span class="text-xs" style="color: rgba(160,160,160,0.5)">{{ $t('modal.optional') }}</span></label>
              <textarea
                v-model="form.message"
                :placeholder="$t('modal.cv_message_placeholder')"
                rows="3"
                class="w-full rounded-lg px-3 py-2.5 text-sm outline-none resize-none text-white"
                style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1)"
              />
            </div>

            <button
              type="submit"
              :disabled="status === 'loading'"
              class="w-full py-2.5 rounded-lg text-sm font-semibold text-white transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
              style="background: white; color: black"
            >
              <span v-if="status === 'loading'">{{ $t('modal.sending') }}</span>
              <span v-else>{{ $t('modal.send') }}</span>
            </button>

            <p v-if="status === 'success'" class="text-sm text-center" style="color: #00e5a8">{{ $t('modal.success') }}</p>
            <p v-if="status === 'error'" class="text-sm text-center" style="color: #f87171">{{ $t('modal.error') }}</p>
          </form>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { X } from 'lucide-vue-next'

const { t } = useI18n()

const props = defineProps({ open: { type: Boolean, default: false } })
const emit = defineEmits(['close'])

const status = ref(null)
const form = reactive({ name: '', email: '', company: '', reason: '', message: '' })
const errors = reactive({ name: '', email: '', company: '', reason: '' })

watch(() => props.open, (val) => {
  if (val) {
    status.value = null
    Object.assign(form, { name: '', email: '', company: '', reason: '', message: '' })
    Object.assign(errors, { name: '', email: '', company: '', reason: '' })
  }
})

function validate() {
  errors.name    = form.name.trim()                               ? '' : t('modal.err_name')
  errors.email   = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) ? '' : t('modal.err_email')
  errors.company = form.company.trim()                            ? '' : t('modal.err_company')
  errors.reason  = form.reason.trim()                             ? '' : t('modal.err_reason')
  return !errors.name && !errors.email && !errors.company && !errors.reason
}

async function submit() {
  if (!validate()) return
  status.value = 'loading'
  try {
    await $fetch('/api/cv-request', {
      method: 'POST',
      body: { ...form },
    })
    status.value = 'success'
  } catch {
    status.value = 'error'
  }
}
</script>

<style scoped>
.modal-enter-active, .modal-leave-active { transition: opacity 0.2s ease; }
.modal-enter-from, .modal-leave-to { opacity: 0; }
.modal-enter-active > div, .modal-leave-active > div { transition: transform 0.2s ease; }
.modal-enter-from > div, .modal-leave-to > div { transform: scale(0.95); }
</style>
