import { memo } from 'react'
import JinaeYo from './JinaeYo'
import { LEVELS, getLevel } from './store'

const MemoJinaeYo = memo(JinaeYo)

export default function GrowthTab({ rate }) {
  const currentLevel = getLevel(rate)

  return (
    <div style={{ overflowY: 'auto', height: '100%', padding: '16px 16px calc(16px + var(--safe-bottom))' }}>

      {/* 캐릭터 카드 */}
      <div style={{
        background: 'var(--surface)', borderRadius: 20, padding: 20,
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
        marginBottom: 16, boxShadow: '0 0 30px #ff69b440'
      }}>
        <MemoJinaeYo level={currentLevel.lv} size={180}/>
        <p style={{ color: 'var(--pink)', fontWeight: 700, fontSize: 20 }}>
          Lv.{currentLevel.lv} {currentLevel.name}
        </p>
        <p style={{ color: 'var(--text2)', fontSize: 14 }}>
          오늘 이행률 {Math.round(rate * 100)}%
        </p>

        {/* 진행 바 */}
        <div style={{ width: '100%' }}>
          <div style={{ height: 10, background: 'var(--surface2)', borderRadius: 5, overflow: 'hidden' }}>
            <div style={{
              height: '100%', borderRadius: 5,
              background: 'linear-gradient(to right, var(--pink), #a855f7)',
              width: `${rate * 100}%`, transition: 'width 0.6s ease'
            }}/>
          </div>
          {/* 레벨 마커 */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
            {LEVELS.map(lv => (
              <div key={lv.lv} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                <div style={{
                  width: 8, height: 8, borderRadius: '50%',
                  background: lv.lv <= currentLevel.lv ? 'var(--pink)' : 'var(--surface2)'
                }}/>
                <span style={{ fontSize: 9, color: 'var(--text2)' }}>Lv{lv.lv}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 레벨 맵 */}
      <div style={{ background: 'var(--surface)', borderRadius: 16, padding: 16 }}>
        <p style={{ color: 'var(--text2)', fontSize: 12, marginBottom: 12 }}>레벨 맵</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {LEVELS.map(lv => {
            const unlocked = lv.lv <= currentLevel.lv
            const isCurrent = lv.lv === currentLevel.lv
            return (
              <div key={lv.lv} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: 10, borderRadius: 12,
                background: isCurrent ? '#ff69b420' : 'var(--surface2)'
              }}>
                <div style={{ opacity: unlocked ? 1 : 0.3 }}>
                  <MemoJinaeYo level={lv.lv} size={44}/>
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{
                    fontWeight: 600, fontSize: 14,
                    color: unlocked ? 'var(--text)' : 'var(--text2)'
                  }}>Lv.{lv.lv} {lv.name}</p>
                  <p style={{ fontSize: 11, color: 'var(--text2)' }}>
                    이행률 {Math.round(lv.min * 100)}% 이상
                  </p>
                </div>
                {isCurrent
                  ? <span style={{
                      background: '#ff69b422', color: 'var(--pink)',
                      fontSize: 11, fontWeight: 700,
                      padding: '3px 8px', borderRadius: 20
                    }}>현재</span>
                  : unlocked
                    ? <span style={{ fontSize: 18 }}>✅</span>
                    : <span style={{ color: 'var(--text2)', fontSize: 16 }}>🔒</span>
                }
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
