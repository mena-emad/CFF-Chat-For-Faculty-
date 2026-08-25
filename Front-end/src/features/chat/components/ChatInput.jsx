import { ArrowUp } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export default function ChatInput({ value, onChange, onSubmit, isGenerating }) {
  const { t } = useTranslation()

  function handleKeyDown(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      onSubmit()
    }
  }

  return (
    <form className="composer" onSubmit={(event) => { event.preventDefault(); onSubmit() }}>
      <label className="sr-only" htmlFor="chat-prompt">{t('chat.promptLabel')}</label>
      <div className="composer-field">
        <textarea id="chat-prompt" value={value} onChange={(event) => onChange(event.target.value)} onKeyDown={handleKeyDown} placeholder={t('chat.placeholder')} rows="1" disabled={isGenerating} />
        <button className="send-button" type="submit" disabled={!value.trim() || isGenerating} aria-label={isGenerating ? t('chat.stop') : t('chat.send')}>
          <ArrowUp size={19} strokeWidth={2.5} />
        </button>
      </div>
      <p className="composer-hint">{t('chat.responseNote')}</p>
    </form>
  )
}
