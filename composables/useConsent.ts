export const useConsent = () => {
  const consent = useState<boolean | null>('cookie-consent', () => null)

  onMounted(() => {
    const stored = localStorage.getItem('cookie-consent')
    if (stored === 'accepted') consent.value = true
    else if (stored === 'declined') consent.value = false
  })

  const accept = () => {
    consent.value = true
    localStorage.setItem('cookie-consent', 'accepted')
  }

  const decline = () => {
    consent.value = false
    localStorage.setItem('cookie-consent', 'declined')
  }

  return { consent, accept, decline }
}
