import { QUADRANTS, getLevel } from './store'

export default function StatsTab({ todayItems, rate, weeklyStats }) {
  const stats = weeklyStats()
  const level = getLevel(rate)
  const done = todayItems.filter(i => i.done).length

  return (
    <div style={{ overflowY: 'auto', height: '100%', padding: '16px 16px calc(16px + var(--safe-bottom))' }}>

      {/* 오늘 요약 */}
      <div style={{
        background: 'var(--surface)', borderRadius: 16, padding: 16,
        display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16
      }}>
        {/* 원형 게이지 */}
        <svg width={80} height={80} viewBox="0 0 80 80">
          <circle cx="40" cy="40" r="32" stroke="var(--surface2)" strokeWidth="8" fill="none"/>
          <circle cx="40" cy="40" r="32"
            stroke="var(--pink)" strokeWidth="8" fill="none"
            strokeDasharray={`${2 * Math.PI * 32 * rate} ${2 * Math.PI * 32 * (1 - rate)}`}
            strokeDashoffset={2 * Math.PI * 32 * 0.25}
            strokeLinecap="round"
            style={{ transition: 'stroke-dasharray 0.6s ease' }}
          />
          <text x="40" y="36" textAnchor="middle" fontSize="16" fontWeight="bold" fill="var(--pink)" fontFamily="sans-serif">
            {Math.round(rate * 100)}
          </text>
          <text x="40" y="50" textAnchor="middle" fontSize="10" fill="var(--text2)" fontFamily="sans-serif">%</text>
        </svg>
        <div>
          <p style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>오늘 이행률</p>
          <p style={{ color: 'var(--text2)', fontSize: 14, marginBottom: 4 }}>
            {done} / {todayItems.length} 완료
          </p>
          <p style={{ color: 'var(--pink)', fontSize: 12 }}>
            Lv.{level.lv} {level.name}
          </p>
        </div>
      </div>

      {/* 7일 바 차트 */}
      <div style={{ background: 'var(--surface)', borderRadius: 16, padding: 16, marginBottom: 16 }}>
        <p style={{ color: 'var(--text2)', fontSize: 12, marginBottom: 14 }}>최근 7일 이행률</p>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 100 }}>
          {stats.map(s => (
            <div key={s.date} style={{
              flex: 1, display: 'flex', flexDirection: 'column',
              alignItems: 'center', gap: 4, height: '100%', justifyContent: 'flex-end'
            }}>
              <span style={{ fontSize: 9, color: 'var(--text2)' }}>
                {s.total > 0 ? `${Math.round(s.rate * 100)}%` : '-'}
              </span>
              <div style={{
                width: '100%', borderRadius: 4,
                background: s.rate > 0 ? 'var(--pink)' : 'var(--surface2)',
                height: `${Math.max(4, s.rate * 72)}px`,
                transition: 'height 0.4s ease'
              }}/>
              <span style={{ fontSize: 10, color: 'var(--text2)' }}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 분면별 현황 */}
      <div style={{ background: 'var(--surface)', borderRadius: 16, padding: 16 }}>
        <p style={{ color: 'var(--text2)', fontSize: 12, marginBottom: 12 }}>분면별 완료 현황</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {QUADRANTS.map(q => {
            const qItems = todayItems.filter(i => i.quadrantId === q.id)
            const qDone = qItems.filter(i => i.done).length
            const qRate = qItems.length ? qDone / qItems.length : 0
            return (
              <div key={q.id} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 14 }}>{q.emoji}</span>
                <span style={{
                  color: q.color, fontWeight: 600, fontSize: 11, width: 68, flexShrink: 0
                }}>{q.short}</span>
                <div style={{
                  flex: 1, height: 8, background: 'var(--surface2)',
                  borderRadius: 4, overflow: 'hidden'
                }}>
                  <div style={{
                    height: '100%', borderRadius: 4,
                    background: q.color,
                    width: `${qRate * 100}%`,
                    transition: 'width 0.4s ease'
                  }}/>
                </div>
                <span style={{ fontSize: 11, color: 'var(--text2)', width: 30, textAlign: 'right' }}>
                  {qDone}/{qItems.length}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
