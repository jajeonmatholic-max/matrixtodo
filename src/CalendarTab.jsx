import { useState } from 'react'

export default function CalendarTab({ items }) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(null)

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  // 월의 첫 날 요일 (0=일, 6=토)
  const firstDay = new Date(year, month, 1).getDay()
  // 월의 마지막 날짜
  const lastDate = new Date(year, month + 1, 0).getDate()

  function getItemsForDate(dateStr) {
    return items.filter(i => i.dueDate === dateStr)
  }

  function getCompletionRate(dateStr) {
    const dayItems = getItemsForDate(dateStr)
    if (dayItems.length === 0) return null
    const done = dayItems.filter(i => i.done).length
    return done / dayItems.length
  }

  function getBackgroundColor(rate) {
    if (rate === null) return 'var(--surface2)'
    if (rate === 1) return 'var(--pink)'
    if (rate >= 0.5) return '#fb923c'
    if (rate > 0) return '#eab308'
    return '#888888'
  }

  const days = ['일', '월', '화', '수', '목', '금', '토']
  const dates = []
  for (let i = 0; i < firstDay; i++) dates.push(null)
  for (let i = 1; i <= lastDate; i++) dates.push(i)

  return (
    <div style={{ overflowY: 'auto', height: '100%', padding: '16px 16px calc(16px + var(--safe-bottom))' }}>
      {/* 월 선택 */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        marginBottom: 20
      }}>
        <button
          onClick={() => setCurrentDate(new Date(year, month - 1, 1))}
          style={{ background: 'none', border: 'none', color: 'var(--pink)', fontSize: 20, cursor: 'pointer' }}
        >
          ◀
        </button>
        <h2 style={{ margin: 0, color: 'var(--text)', fontSize: 18, fontWeight: 700 }}>
          {year}년 {month + 1}월
        </h2>
        <button
          onClick={() => setCurrentDate(new Date(year, month + 1, 1))}
          style={{ background: 'none', border: 'none', color: 'var(--pink)', fontSize: 20, cursor: 'pointer' }}
        >
          ▶
        </button>
      </div>

      {/* 요일 헤더 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 8, marginBottom: 12 }}>
        {days.map(day => (
          <div key={day} style={{ textAlign: 'center', color: 'var(--text2)', fontSize: 12, fontWeight: 600 }}>
            {day}
          </div>
        ))}
      </div>

      {/* 캘린더 그리드 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 8 }}>
        {dates.map((date, i) => {
          const dateStr = date ? `${year}-${String(month + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}` : null
          const rate = dateStr ? getCompletionRate(dateStr) : null
          const dayItems = dateStr ? getItemsForDate(dateStr) : []

          return (
            <div
              key={i}
              onClick={() => date && dateStr && setSelectedDate(dateStr)}
              style={{
                aspectRatio: '1',
                background: selectedDate === dateStr ? '#ff69b4' : date ? getBackgroundColor(rate) : 'transparent',
                borderRadius: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 4,
                opacity: date ? 1 : 0.3,
                cursor: date ? 'pointer' : 'default',
                transition: 'background 0.2s',
                transform: selectedDate === dateStr ? 'scale(0.95)' : 'scale(1)'
              }}
            >
              {date && (
                <>
                  <span style={{ fontSize: 12, fontWeight: 600, color: rate === null ? 'var(--text2)' : 'white' }}>
                    {date}
                  </span>
                  {dayItems.length > 0 && (
                    <span style={{ fontSize: 10, color: rate === null ? 'var(--text2)' : 'white', marginTop: 2 }}>
                      {dayItems.filter(i => i.done).length}/{dayItems.length}
                    </span>
                  )}
                </>
              )}
            </div>
          )
        })}
      </div>

      {/* 범례 */}
      <div style={{ marginTop: 24, padding: 16, background: 'var(--surface)', borderRadius: 12 }}>
        <p style={{ margin: '0 0 12px 0', fontSize: 12, fontWeight: 600, color: 'var(--text2)' }}>범례</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8, fontSize: 11 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 20, height: 20, borderRadius: 4, background: '#888888' }}></div>
            <span style={{ color: 'var(--text2)' }}>0% 완료</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 20, height: 20, borderRadius: 4, background: '#eab308' }}></div>
            <span style={{ color: 'var(--text2)' }}>1~50%</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 20, height: 20, borderRadius: 4, background: '#fb923c' }}></div>
            <span style={{ color: 'var(--text2)' }}>50~100%</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 20, height: 20, borderRadius: 4, background: 'var(--pink)' }}></div>
            <span style={{ color: 'var(--text2)' }}>100% 완료</span>
          </div>
        </div>
      </div>

      {/* 선택된 날짜 상세보기 */}
      {selectedDate && (
        <div style={{ marginTop: 24, padding: 16, background: 'var(--surface)', borderRadius: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <h3 style={{ margin: 0, color: 'var(--text)', fontSize: 14, fontWeight: 700 }}>
              📅 {selectedDate.split('-')[1]}/{selectedDate.split('-')[2]}
            </h3>
            <button
              onClick={() => setSelectedDate(null)}
              style={{
                background: 'none', border: 'none', color: 'var(--text2)',
                fontSize: 18, cursor: 'pointer', padding: 0
              }}
            >
              ✕
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {getItemsForDate(selectedDate).length > 0 ? (
              getItemsForDate(selectedDate).map(item => (
                <div
                  key={item.id}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    padding: '8px 10px', background: 'var(--surface2)', borderRadius: 8
                  }}
                >
                  <span style={{ color: item.done ? 'var(--pink)' : 'var(--text2)', fontSize: 16 }}>
                    {item.done ? '●' : '○'}
                  </span>
                  <span style={{
                    flex: 1, fontSize: 12,
                    color: item.done ? 'var(--text2)' : 'var(--text)',
                    textDecoration: item.done ? 'line-through' : 'none'
                  }}>
                    {item.title}
                  </span>
                  <span style={{
                    fontSize: 9, fontWeight: 600, padding: '2px 6px', borderRadius: 4,
                    background: item.category === 'work' ? '#2563eb' : '#a855f7',
                    color: 'white'
                  }}>
                    {item.category === 'work' ? '💼' : '👤'}
                  </span>
                </div>
              ))
            ) : (
              <p style={{ margin: 0, fontSize: 12, color: 'var(--text2)', textAlign: 'center' }}>
                이 날짜에 할 일이 없습니다
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
