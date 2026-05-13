import { useState, useEffect } from 'react'

const STORAGE_KEY = 'matrixtodo-items'

export const QUADRANTS = [
  { id: 'urgentImportant',     label: '긴급+중요',     short: 'DO',       emoji: '🔥', color: 'var(--red)' },
  { id: 'urgentNotImportant',  label: '긴급+안중요',   short: 'DELEGATE', emoji: '📞', color: 'var(--orange)' },
  { id: 'notUrgentImportant',  label: '안긴급+중요',   short: 'SCHEDULE', emoji: '🎯', color: 'var(--green)' },
  { id: 'notUrgentNotImportant', label: '안긴급+안중요', short: 'ELIMINATE', emoji: '🗑️', color: 'var(--gray)' },
]

export const LEVELS = [
  { lv: 1, name: '라켓 잡기',     min: 0    },
  { lv: 2, name: '포핸드',        min: 0.25 },
  { lv: 3, name: '백핸드',        min: 0.50 },
  { lv: 4, name: '발리',          min: 0.75 },
  { lv: 5, name: '스매시',        min: 0.90 },
  { lv: 6, name: '국화꽃 테니스볼', min: 1.00 },
]

export function getLevel(rate) {
  if (rate >= 1.0)  return LEVELS[5]
  if (rate >= 0.90) return LEVELS[4]
  if (rate >= 0.75) return LEVELS[3]
  if (rate >= 0.50) return LEVELS[2]
  if (rate >= 0.25) return LEVELS[1]
  return LEVELS[0]
}

function load() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [] } catch { return [] }
}
function save(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}

function todayStr() {
  return new Date().toISOString().slice(0, 10)
}

export function useStore() {
  const [items, setItems] = useState(load)

  useEffect(() => { save(items) }, [items])

  const todayItems = items.filter(i => i.date === todayStr())

  const rate = todayItems.length === 0 ? 0
    : todayItems.filter(i => i.done).length / todayItems.length

  function addItem(quadrantId, title, category = 'personal') {
    setItems(prev => [...prev, {
      id: crypto.randomUUID(), title, quadrantId, category,
      done: false, date: todayStr(), createdAt: Date.now()
    }])
  }

  function toggleItem(id) {
    setItems(prev => prev.map(i => i.id === id ? { ...i, done: !i.done } : i))
  }

  function deleteItem(id) {
    setItems(prev => prev.filter(i => i.id !== id))
  }

  function moveItem(id, newQuadrantId) {
    setItems(prev => prev.map(i => i.id === id ? { ...i, quadrantId: newQuadrantId } : i))
  }

  // 최근 7일 통계
  function weeklyStats() {
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date()
      d.setDate(d.getDate() - (6 - i))
      const dateStr = d.toISOString().slice(0, 10)
      const day = items.filter(it => it.date === dateStr)
      return {
        date: dateStr,
        label: ['일','월','화','수','목','금','토'][d.getDay()],
        total: day.length,
        done: day.filter(it => it.done).length,
        rate: day.length ? day.filter(it => it.done).length / day.length : 0
      }
    })
  }

  return { items, todayItems, rate, addItem, toggleItem, deleteItem, moveItem, weeklyStats }
}
