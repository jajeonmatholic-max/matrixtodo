import { useState } from 'react'
import { QUADRANTS } from './store'

export default function MatrixTab({ todayItems, rate, addItem, toggleItem, deleteItem }) {
  const [adding, setAdding] = useState(null) // quadrantId
  const [title, setTitle] = useState('')

  function handleAdd(e) {
    e.preventDefault()
    if (!title.trim()) return
    addItem(adding, title.trim())
    setTitle('')
    setAdding(null)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* 이행률 헤더 */}
      <div style={{
        background: 'var(--surface)', padding: '10px 16px',
        display: 'flex', flexDirection: 'column', gap: 6, flexShrink: 0
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ color: 'var(--text2)', fontSize: 13 }}>오늘 이행률</span>
          <span style={{ color: 'var(--pink)', fontWeight: 700, fontSize: 18 }}>
            {Math.round(rate * 100)}%
          </span>
        </div>
        <div style={{ height: 6, background: 'var(--surface2)', borderRadius: 3, overflow: 'hidden' }}>
          <div style={{
            height: '100%', borderRadius: 3,
            background: 'var(--pink)',
            width: `${rate * 100}%`,
            transition: 'width 0.5s ease'
          }}/>
        </div>
      </div>

      {/* 2×2 매트릭스 */}
      <div style={{
        flex: 1, display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gridTemplateRows: '1fr 1fr',
        gap: 1, background: '#000',
        overflow: 'hidden'
      }}>
        {QUADRANTS.map(q => {
          const qItems = todayItems.filter(i => i.quadrantId === q.id)
          return (
            <QuadrantCell
              key={q.id} q={q} items={qItems}
              onAdd={() => setAdding(q.id)}
              onToggle={toggleItem}
              onDelete={deleteItem}
            />
          )
        })}
      </div>

      {/* 추가 시트 */}
      {adding && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)',
          display: 'flex', alignItems: 'flex-end', zIndex: 100
        }} onClick={() => { setAdding(null); setTitle('') }}>
          <form
            style={{
              background: 'var(--surface)', width: '100%',
              padding: '24px 20px',
              paddingBottom: 'calc(24px + var(--safe-bottom))',
              borderRadius: '20px 20px 0 0'
            }}
            onClick={e => e.stopPropagation()}
            onSubmit={handleAdd}
          >
            {(() => {
              const q = QUADRANTS.find(x => x.id === adding)
              return (
                <>
                  <p style={{ textAlign: 'center', marginBottom: 16, fontSize: 15 }}>
                    {q.emoji} <span style={{ color: q.color, fontWeight: 700 }}>{q.label}</span>
                  </p>
                  <input
                    autoFocus
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="할 일을 입력하세요"
                    style={{
                      width: '100%', background: 'var(--surface2)',
                      border: 'none', borderRadius: 12, padding: '12px 14px',
                      color: 'var(--text)', fontSize: 16, outline: 'none', marginBottom: 12
                    }}
                  />
                  <button type="submit" style={{
                    width: '100%', background: q.color, color: 'white',
                    borderRadius: 12, padding: '13px', fontWeight: 700, fontSize: 16,
                    opacity: title.trim() ? 1 : 0.4
                  }}>추가</button>
                </>
              )
            })()}
          </form>
        </div>
      )}
    </div>
  )
}

function QuadrantCell({ q, items, onAdd, onToggle, onDelete }) {
  const [swipedId, setSwipedId] = useState(null)

  return (
    <div style={{
      background: 'var(--surface)', display: 'flex',
      flexDirection: 'column', overflow: 'hidden'
    }}>
      {/* 헤더 */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 4,
        padding: '7px 10px', flexShrink: 0
      }}>
        <span style={{ fontSize: 13 }}>{q.emoji}</span>
        <span style={{ color: q.color, fontWeight: 700, fontSize: 11, flex: 1 }}>{q.short}</span>
        <button onClick={onAdd} style={{ color: q.color, fontSize: 22, lineHeight: 1 }}>＋</button>
      </div>
      <div style={{ height: 1, background: q.color, opacity: 0.25, flexShrink: 0 }}/>

      {/* 목록 */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {items.map(item => (
          <div
            key={item.id}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '6px 8px',
              background: swipedId === item.id ? '#3a0010' : 'transparent',
              transition: 'background 0.2s'
            }}
            onTouchStart={() => {}}
          >
            <button onClick={() => onToggle(item.id)} style={{ flexShrink: 0 }}>
              <span style={{ color: item.done ? 'var(--pink)' : 'var(--text2)', fontSize: 17 }}>
                {item.done ? '●' : '○'}
              </span>
            </button>
            <span style={{
              fontSize: 12, flex: 1, lineHeight: 1.3,
              color: item.done ? 'var(--text2)' : 'var(--text)',
              textDecoration: item.done ? 'line-through' : 'none'
            }}>{item.title}</span>
            <button onClick={() => onDelete(item.id)} style={{ color: 'var(--text2)', fontSize: 14 }}>✕</button>
          </div>
        ))}
      </div>
    </div>
  )
}
