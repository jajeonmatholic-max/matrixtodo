/* JinaeYo — 라켓(1.5배) + 사진(중앙) */
export default function JinaeYo({ level = 1, size = 160 }) {
  return (
    <div style={{ position: 'relative', width: size * 3.2, height: size * 1.4 }}>
      {/* 라켓 SVG (좌측 1.5배) */}
      <svg width={size * 1.8} height={size * 1.4} viewBox="-40 -40 300 380" fill="none" xmlns="http://www.w3.org/2000/svg"
           style={{ position: 'absolute', left: '50%', top: '75%', transform: 'translate(-50%, -50%)', zIndex: 10 }}>
        <defs>
          <radialGradient id="ballGrad" cx="0.35" cy="0.35" r="0.7">
            <stop offset="0" stopColor="#f8ff7a"/>
            <stop offset="1" stopColor="#c8e000"/>
          </radialGradient>
          <linearGradient id="frameGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#ff8fcb"/>
            <stop offset="1" stopColor="#ff3d8b"/>
          </linearGradient>
        </defs>
        <RacketSection level={level} />
      </svg>

      {/* 사진 (중앙) - Image centered */}
      <img
        src="/matrixtodo/jinaeyo-photo.png"
        alt="JinaeYo"
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          height: size * 1.3,
          borderRadius: '8px',
          boxShadow: '0 4px 20px rgba(255, 105, 180, 0.4)',
          opacity: 0.7
        }}
      />

      {/* Lv 배지 (우측 하단) */}
      <div style={{
        position: 'absolute',
        right: 20,
        bottom: 20,
        background: 'rgba(0,0,0,0.55)',
        color: '#ff69b4',
        padding: '4px 12px',
        borderRadius: '20px',
        fontSize: 12,
        fontWeight: 700,
        fontFamily: 'sans-serif'
      }}>
        Lv.{level}
      </div>
    </div>
  )
}

function RacketSection({ level }) {
  const angles = { 1: -12, 2: -18, 3: 18, 4: 5, 5: 175, 6: 0 }
  const angle = angles[level] || 0
  const scale = 1.05

  return (
    <g transform={`translate(70 140) scale(${scale}) rotate(25)`}>
      {/* 손잡이 - 일정 너비, 더 길게, 10도 기울임 */}
      <defs>
        <linearGradient id="gripGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#ffffff"/>
          <stop offset="50%" stopColor="#e0e0e0"/>
          <stop offset="100%" stopColor="#ffffff"/>
        </linearGradient>
      </defs>
      {/* 손잡이 - 끝부분 둥글게 */}
      <path d="M -5 50 L -5 100 Q -5 115 -3 118 Q 0 120 3 118 Q 5 115 5 100 L 5 50 Z" fill="url(#gripGrad)" stroke="white" strokeWidth="1.5"/>
      <path d="M -4.5 50.5 L -4.5 100 Q -4.5 113 -2.5 116 Q 0 118 2.5 116 Q 4.5 113 4.5 100 L 4.5 50.5 Z" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5"/>
      <line x1="-4" y1="58" x2="4" y2="58" stroke="#c0c0a0" strokeWidth="0.6"/>
      <line x1="-4" y1="67" x2="4" y2="67" stroke="#c0c0a0" strokeWidth="0.6"/>
      <line x1="-4" y1="76" x2="4" y2="76" stroke="#c0c0a0" strokeWidth="0.6"/>

      {/* 목 - 곡선 */}
      <path d="M -3 50 Q -7 35 -8 20 M 3 50 Q 7 35 8 20" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none"/>

      {/* 헤드 회전 */}
      <g transform={`rotate(${angle})`}>
        {/* 라켓 헤드 - 검은색 배경 */}
        <ellipse cx="0" cy="0" rx="28" ry="36" stroke="white" strokeWidth="6" fill="#1a1a1a"/>
        {/* 프레임 깊이 */}
        <ellipse cx="0" cy="0" rx="27" ry="35" stroke="#333333" strokeWidth="1.2" fill="none" opacity="0.8"/>

        {/* 스트링 - 더 촘촘하고 정교하게 */}
        {[-20, -16, -12, -8, -4, 0, 4, 8, 12, 16, 20].map(xx => {
          const h = Math.sqrt(Math.max(0, 1 - (xx/28)**2)) * 36
          return <line key={`v${xx}`} x1={xx} y1={-h} x2={xx} y2={h} stroke="#fff" strokeWidth="0.8" opacity="0.95"/>
        })}
        {[-28, -22, -16, -10, -4, 0, 4, 10, 16, 22, 28].map(yy => {
          const w = Math.sqrt(Math.max(0, 1 - (yy/36)**2)) * 28
          return <line key={`h${yy}`} x1={-w} y1={yy} x2={w} y2={yy} stroke="#fff" strokeWidth="0.8" opacity="0.95"/>
        })}
      </g>

      {/* 공 - 국화꽃처럼 */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((rotate, i) => (
        <ellipse key={`petal${i}`} cx="0" cy="-8" rx="4" ry="7.5" fill="#f8ff7a" opacity="0.9" transform={`rotate(${rotate})`}/>
      ))}
      <circle cx="0" cy="0" r="9" fill="url(#ballGrad)"/>
      <circle cx="0" cy="0" r="7" fill="#f0ff80" opacity="0.6"/>
    </g>
  )
}

function PersonSection() {
  return (
    <g transform="translate(320 140) scale(3)">
      {/* 신발 */}
      <ellipse cx="-12" cy="42" rx="6" ry="3" fill="#ff69b4"/>
      <ellipse cx="12" cy="42" rx="6" ry="3" fill="#ff69b4"/>
      <line x1="-18" y1="40" x2="-6" y2="40" stroke="white" strokeWidth="0.8" opacity="0.6"/>
      <line x1="6" y1="40" x2="18" y2="40" stroke="white" strokeWidth="0.8" opacity="0.6"/>

      {/* 노란 양말 */}
      <rect x="-16" y="32" width="8" height="10" rx="2" fill="#FFD700"/>
      <rect x="8" y="32" width="8" height="10" rx="2" fill="#FFD700"/>

      {/* 다리 */}
      <rect x="-15" y="15" width="8" height="20" rx="4" fill="#f5c9a0"/>
      <rect x="7" y="15" width="8" height="20" rx="4" fill="#f5c9a0"/>

      {/* 무릎보호대 */}
      <rect x="-17" y="24" width="10" height="7" rx="2" fill="#1a3a7a" opacity="0.85"/>
      <rect x="7" y="24" width="10" height="7" rx="2" fill="#1a3a7a" opacity="0.85"/>

      {/* 반바지 */}
      <path d="M -20 10 Q -22 20 -15 25 L 15 25 Q 22 20 20 10 Z" fill="#1a1a1a"/>
      <rect x="-20" y="8" width="40" height="4" rx="2" fill="#2a2a2a"/>

      {/* 상체 */}
      <rect x="-22" y="-10" width="44" height="20" rx="6" fill="#1a1a1a"/>
      <rect x="-4" y="-10" width="4" height="20" fill="#ff69b4" opacity="0.25"/>

      {/* 팔 */}
      <rect x="-28" y="-4" width="12" height="7" rx="3" fill="#f5c9a0"/>
      <circle cx="-32" cy="-1" r="3.5" fill="#f5c9a0"/>
      <rect x="16" y="-4" width="12" height="7" rx="3" fill="#f5c9a0"/>
      <circle cx="32" cy="-1" r="3.5" fill="#f5c9a0"/>

      {/* 목 */}
      <rect x="-10" y="-16" width="12" height="8" rx="4" fill="#f5c9a0"/>

      {/* 얼굴 */}
      <ellipse cx="0" cy="-28" rx="17" ry="16" fill="#f5c9a0"/>

      {/* 볼 */}
      <ellipse cx="-10" cy="-24" rx="3" ry="2" fill="#ffb6c1" opacity="0.5"/>
      <ellipse cx="10" cy="-24" rx="3" ry="2" fill="#ffb6c1" opacity="0.5"/>

      {/* 눈썹 */}
      <path d="M -8 -32 Q -5 -34 -1 -32" stroke="#3a2010" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <path d="M 1 -32 Q 5 -34 8 -32" stroke="#3a2010" strokeWidth="1.5" strokeLinecap="round" fill="none"/>

      {/* 핑크 선글라스 */}
      <circle cx="-7" cy="-28" r="6" fill="#ff69b4" opacity="0.55"/>
      <circle cx="-7" cy="-28" r="6" stroke="#cc3380" strokeWidth="1.5" fill="none"/>
      <circle cx="7" cy="-28" r="6" fill="#ff69b4" opacity="0.55"/>
      <circle cx="7" cy="-28" r="6" stroke="#cc3380" strokeWidth="1.5" fill="none"/>
      <line x1="-1" y1="-28" x2="1" y2="-28" stroke="#cc3380" strokeWidth="1"/>
      <line x1="-13" y1="-28" x2="-18" y2="-26" stroke="#cc3380" strokeWidth="1" strokeLinecap="round"/>
      <line x1="13" y1="-28" x2="18" y2="-26" stroke="#cc3380" strokeWidth="1" strokeLinecap="round"/>
      <circle cx="-11" cy="-32" r="2" fill="white" opacity="0.3"/>
      <circle cx="9" cy="-32" r="2" fill="white" opacity="0.3"/>

      {/* 코 */}
      <ellipse cx="0" cy="-22" rx="1.5" ry="1" fill="#e8a882" opacity="0.6"/>

      {/* 입 */}
      <path d="M -6 -18 Q 0 -14 6 -18" stroke="#c0704a" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
      <path d="M -5 -17 Q 0 -13 5 -17" fill="#ff8080" opacity="0.3"/>

      {/* 흰 캡모자 */}
      <ellipse cx="0" cy="-40" rx="20" ry="4" fill="white"/>
      <rect x="-20" y="-44" width="40" height="5" rx="2" fill="white"/>
      <path d="M -18 -40 Q -18 -52 0 -52 Q 18 -52 18 -40 Z" fill="white"/>
      <path d="M -18 -40 Q 0 -42 18 -40" stroke="#e0e0e0" strokeWidth="0.6" fill="none"/>
      <circle cx="0" cy="-51" r="1.5" fill="#e0e0e0"/>
      <rect x="-10" y="-46" width="12" height="3.5" rx="1" fill="#e8e8e8" opacity="0.8"/>
      <text x="0" y="-43" textAnchor="middle" fontSize="2" fill="#666" fontFamily="sans-serif" fontWeight="bold">TENNIS</text>

      {/* 머리카락 */}
      <path d="M -18 -40 Q -22 -30 -20 -20" stroke="#1a0a00" strokeWidth="3" strokeLinecap="round" fill="none"/>
      <path d="M 18 -40 Q 22 -30 20 -20" stroke="#1a0a00" strokeWidth="3" strokeLinecap="round" fill="none"/>
    </g>
  )
}
