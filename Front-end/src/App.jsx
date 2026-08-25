import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Menu, Moon, Settings, Sun, X,Trash2 } from 'lucide-react'



import './i18n'
import ChatInput from './features/chat/components/ChatInput'
import MessageBubble from './features/chat/components/MessageBubble'
import getResponse from './mock/chatData'

function Sidebar({ onClose }) {
  const { t } = useTranslation()

  return (
    <aside className="sidebar">
      <div className="sidebar-top">
        <a className="brand" href="#top">
          <span className="brand-mark">C</span>

          <span>
            <strong>{t('brand.name')}</strong>
            <small>{t('brand.tagline')}</small>
          </span>
        </a>

        <button
          className="icon-button mobile-close"
          onClick={onClose}
          aria-label={t('nav.close')}
        >
          <X size={20} />
        </button>
      </div>

      <div className="sidebar-bottom">
        <button className="side-action">
          <Settings size={17} />
          <span>{t('nav.settings')}</span>
        </button>

        <div className="profile">
          <span className="profile-avatar">
            {t('profile.initials')}
          </span>

          <span className="profile-copy">
            <strong>{t('profile.name')}</strong>
            <small>{t('profile.role')}</small>
          </span>

          <span className="status-dot" />
        </div>
      </div>
    </aside>
  )
}

function App() {
  const { t, i18n } = useTranslation()

  const [chatHistory,setChatHistory] = useState(()=>{
    const savedHistory = localStorage.getItem('chatHistory')
    return savedHistory ? JSON.parse(savedHistory) : []
  })
  const [draft, setDraft] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [theme, setTheme] = useState('light')

  const hasMessages = chatHistory.length > 0

  useEffect(() => {
    document.documentElement.lang = i18n.language

    document.documentElement.dir =
      i18n.language === 'ar' ? 'rtl' : 'ltr'
  }, [i18n.language])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  async function sendMessage() {
    const content = draft.trim()
    
    if (!content || isGenerating) return
    
    const userMessage = {
        id: `user-${Date.now()}`,
        role: 'user',
      content,
      time: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    }
    const updatedHistory = [...chatHistory,userMessage]

    // Add user message immediately

    setChatHistory(updatedHistory)

    setDraft('')
    setIsGenerating(true)

    try {
      const response = await getResponse(updatedHistory)
      

      const assistantMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: response,
        time: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
      }

      // Add AI response

      setChatHistory(prev=>[...prev,assistantMessage])
    } catch (error) {
      console.error('AI response error:', error)

      const errorMessage = {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content:
          error.message ||
          t('chat.error'),
        time: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
        isError: true,
      }

      setChatHistory(prev=>[...prev,errorMessage])
    } finally {
      setIsGenerating(false)
    }
  }
  useEffect(()=>{
    localStorage.setItem('chatHistory',JSON.stringify(chatHistory))
  },[chatHistory])
  function toggleLanguage() {
    i18n.changeLanguage(
      i18n.language === 'en' ? 'ar' : 'en'
    )
  }

  function clearChatHistory(){
    setChatHistory([])
  }

  function toggleTheme() {
    setTheme((current) =>
      current === 'light' ? 'dark' : 'light'
    )
  }

  return (
    <div className="app-shell" id="top">

      <div
        className={`sidebar-overlay ${
          isSidebarOpen ? 'visible' : ''
        }`}
        onClick={() => setIsSidebarOpen(false)}
      />

      {/* <Sidebar
        onClose={() => setIsSidebarOpen(false)}
      /> */}

      <main className="main-panel">

        <header style={{position:"fixed",top:0,width:"100%",zIndex:999,backgroundColor:theme==="light"?"#f6f8f7":"#1d1d1d"}} className="topbar">

          <button
            className="icon-button menu-button"
            onClick={() => setIsSidebarOpen(true)}
            aria-label={t('nav.menu')}
          >
            <Menu size={21} />
          </button>

          <div className="mobile-brand">
            <span className="brand-mark">C</span>
            <strong>{t('brand.name')}</strong>
          </div>

          <div className="topbar-actions">
            <button
            onClick={clearChatHistory}
            disabled={!hasMessages}
            aria-label="Clear chat"
            title="Clear chat"
            style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '34px',
            height: '34px',
            padding: 0,
            color: hasMessages ? '#d95c4a' : 'var(--muted)',
            background: hasMessages
                ? 'rgba(217, 92, 74, 0.08)'
                : 'transparent',
            border: '1px solid transparent',
            borderRadius: '8px',
            cursor: hasMessages ? 'pointer' : 'not-allowed',
            opacity: hasMessages ? 1 : 0.45,
            transition:
                'color 0.2s ease, background 0.2s ease, transform 0.2s ease',
            }}
            onMouseEnter={(e) => {
            if (hasMessages) {
                e.currentTarget.style.background =
                'rgba(217, 92, 74, 0.15)'
                e.currentTarget.style.transform = 'translateY(-1px)'
            }
            }}
            onMouseLeave={(e) => {
            e.currentTarget.style.background =
                hasMessages
                ? 'rgba(217, 92, 74, 0.08)'
                : 'transparent'
            e.currentTarget.style.transform = 'translateY(0)'
            }}
        >
            <Trash2 size={17} />
        </button>
            <button
              className="language-switch"
              onClick={toggleLanguage}
              aria-label={t('controls.languageLabel')}
            >
              {t('controls.language')}
            </button>

            <button
              className="icon-button"
              onClick={toggleTheme}
              aria-label={
                theme === 'light'
                  ? t('controls.themeDark')
                  : t('controls.themeLight')
              }
              title={
                theme === 'light'
                  ? t('controls.themeDark')
                  : t('controls.themeLight')
              }
            >
              {theme === 'light' ? (
                <Moon size={18} />
              ) : (
                <Sun size={18} />
              )}
            </button>

          </div>
        </header>

        <section
          className={`chat-view ${
            hasMessages ? 'has-messages' : ''
          }`}
        >

          {hasMessages ? (
            <>
              <div style={{paddingTop:"50px"}} className="conversation-header">
                <div>
                  <span className="eyebrow">
                    {t('chat.eyebrow')}
                  </span>

                  <h1>
                    {t('chat.title')}
                  </h1>
                </div>

                <button
                  className="icon-button desktop-settings"
                  aria-label={t(
                    'nav.conversationSettings'
                  )}
                >
                  <Settings size={18} />
                </button>
              </div>

              <div className="message-list">

                {chatHistory.map((message) => (
                  <MessageBubble
                    key={message.id}
                    message={message}
                  />
                ))}

                {isGenerating && (
                  <div className="generating">
                    <span className="message-avatar assistant-avatar">
                      <span className="pulse-dot" />
                    </span>

                    <span className="typing-dots">
                      <i />
                      <i />
                      <i />
                    </span>
                  </div>
                )}

              </div>
            </>
          ) : (
            <div className="welcome">

              <span className="welcome-mark">
                <span>C</span>
              </span>

              <span className="eyebrow">
                {t('chat.eyebrow')}
              </span>

              <h1>
                {t('chat.title')}
              </h1>

              <p>
                {t('chat.description')}
              </p>

              <div className="prompt-grid">
                {t('chat.examples', {
                  returnObjects: true,
                }).map((example) => (
                  <button
                    key={example}
                    onClick={() => setDraft(example)}
                  >
                    {example}
                    <span>↗</span>
                  </button>
                ))}
              </div>

            </div>
          )}

          <ChatInput
            value={draft}
            onChange={setDraft}
            onSubmit={sendMessage}
            isGenerating={isGenerating}
          />

        </section>
      </main>
    </div>
  )
}

export default App