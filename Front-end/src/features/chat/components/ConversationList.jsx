import { MessageSquare } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export default function ConversationList({ conversations, activeId, onSelect }) {
  const { t } = useTranslation()
  return <div className="conversation-section"><div className="section-label">{t('nav.recent')}</div><div className="conversation-list">{conversations.map((conversation) => <button key={conversation.id} className={`conversation-item ${activeId === conversation.id ? 'active' : ''}`} onClick={() => onSelect(conversation.id)}><span className="conversation-icon"><MessageSquare size={15} /></span><span className="conversation-title">{conversation.title}</span><span className="conversation-date">{conversation.date}</span></button>)}</div></div>
}
