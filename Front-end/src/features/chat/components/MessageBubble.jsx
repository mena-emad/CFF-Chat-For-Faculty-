import { Bot, UserRound } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGFM from 'remark-gfm'
import { useTranslation } from 'react-i18next'

export default function MessageBubble({ message}) {
  const { t } = useTranslation()

  const isAssistant = message.role === 'assistant'
  return (
    <article className={`message-row ${isAssistant ? 'assistant-row' : 'user-row'}`}>
      <div className={`message-avatar ${isAssistant ? 'assistant-avatar' : 'user-avatar'}`} aria-hidden="true">{isAssistant ? <Bot size={17} /> : <UserRound size={16} />}</div>
      <div className="message-content">
        <div className="message-meta"><strong>{isAssistant ? t('chat.assistant') : t('chat.you')}</strong><time>{message.time}</time></div>
        {isAssistant ? <ReactMarkdown  remarkPlugins={[remarkGFM]}>{message.content}</ReactMarkdown> : <p>{message.content}</p>}
      </div>
    </article>
  )
}
