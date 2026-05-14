import { useState } from 'react'
import { useStore } from './store'
import MatrixTab from './MatrixTab'
import GrowthTab from './GrowthTab'
import StatsTab from './StatsTab'
import CalendarTab from './CalendarTab'

const TABS = [
  { id: 'matrix', label: '매트릭스', icon: '⊞' },
  { id: 'growth', label: '성장',    icon: '🎾' },
  { id: 'stats',  label: '통계',    icon: '📊' },
  { id: 'calendar', label: '캘린더', icon: '📅' },
]

export default function App() {
  const [tab, setTab] = useState('matrix')
  const { items, todayItems, rate, addItem, toggleItem, deleteItem, moveItem, weeklyStats } = useStore()

  const TAB_LABELS = { matrix: '매트릭스', growth: '성장', stats: '통계', calendar: '캘린더' }

  return (
    <div style={{
      display: 'flex', flexDirection: 'column',
      height: '100dvh', background: 'var(--bg)', color: 'var(--text)',
      maxWidth: 430, margin: '0 auto', position: 'relative'
    }}>
      {/* 타이틀 바 */}
      <div style={{
        background: 'var(--surface)', padding: '12px 16px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexShrink: 0, borderBottom: '1px solid var(--surface2)'
      }}>
        <span style={{ fontSize: 11, color: 'var(--text2)', fontWeight: 500, letterSpacing: 1 }}>
          MATRIX TODO
        </span>
        <span style={{ color: 'var(--pink)', fontWeight: 700, fontSize: 14 }}>
          {TAB_LABELS[tab]}
        </span>
        <span style={{ fontSize: 11, color: 'var(--text2)' }}>
          {new Date().toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' })}
        </span>
      </div>

      {/* 탭 콘텐츠 */}
      <div style={{ flex: 1, overflow: 'hidden' }}>
        {tab === 'matrix' && (
          <MatrixTab
            todayItems={todayItems} rate={rate}
            addItem={addItem} toggleItem={toggleItem} deleteItem={deleteItem} moveItem={moveItem}
          />
        )}
        {tab === 'growth' && <GrowthTab rate={rate} />}
        {tab === 'stats' && (
          <StatsTab todayItems={todayItems} rate={rate} weeklyStats={weeklyStats} />
        )}
        {tab === 'calendar' && <CalendarTab items={items} />}
      </div>

      {/* 하단 탭 바 */}
      <div style={{
        background: 'var(--surface)', display: 'flex',
        borderTop: '1px solid var(--surface2)',
        paddingBottom: 'var(--safe-bottom)', flexShrink: 0
      }}>
        {TABS.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            style={{
              flex: 1, padding: '10px 0', display: 'flex',
              flexDirection: 'column', alignItems: 'center', gap: 3
            }}
          >
            <span style={{ fontSize: 20, lineHeight: 1 }}>{t.icon}</span>
            <span style={{
              fontSize: 10, fontWeight: 600,
              color: tab === t.id ? 'var(--pink)' : 'var(--text2)'
            }}>{t.label}</span>
            {tab === t.id && (
              <div style={{
                width: 16, height: 2, borderRadius: 1,
                background: 'var(--pink)', marginTop: 1
              }}/>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
