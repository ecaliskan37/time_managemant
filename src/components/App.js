import { useState, useEffect, useRef } from 'react'

const App = () => {
  const [sure, setSure] = useState({ minute: '00', second: '00' })
  const [start, setStart] = useState(false)
  const timerId = useRef('')
  const timerInitial = useRef({ minute: '00', second: '00' })

  const timeFm = () => {
    const test = {
      second: sure.second === '00' ? 59 : +sure.second - 1,
      minute: sure.second === '00' ? +sure.minute - 1 : sure.minute,
    }
    setSure(test)
  }

  const handle = (x) => {
    if (!sure.minute || !sure.second) {
      console.log('Hata değer giriniz')
    } else if (sure.minute > 60 || sure.second > 60) {
      console.log('Değerler büyük!')
    } else {
      switch (x) {
        case 's':
          setStart(true)
          setSure(timerInitial.current)
          return
        case 'p':
          if (start) {
            // pause
            setSure(timerInitial.current)
          }
          setStart(!start)
          return
        case 'r':
          setStart(false)
          setSure(timerInitial.current)
          return
      }
    }
  }

  useEffect(() => {
    if (start) {
      timerId.current = setInterval(timeFm, 1000)
      return () => clearInterval(timerId.current)
    }
  }, [sure, start])

  return (
    <div>
      <div>
        <label>
          <input
            required
            maxLength={2}
            min="0"
            max="60"
            type="number"
            ref={timerInitial}
            onChange={(e) => {
              if (e.target.value.length <= 2) {
                timerInitial.current = { ...sure, minute: e.target.value }
                setSure({ ...sure, minute: e.target.value })
              } else {
                timerInitial.current = {
                  ...sure,
                  minute: e.target.value.slice(0, 2),
                }
                setSure({ ...sure, minute: e.target.value.slice(0, 2) })
              }
            }}
          />
          Minutes
        </label>
      </div>
      <div>
        <label>
          <input
            required
            maxLength={2}
            min="0"
            max="60"
            type="number"
            ref={timerInitial}
            onChange={(e) => {
              if (e.target.value.length <= 2) {
                timerInitial.current = { ...sure, second: e.target.value }
                setSure({ ...sure, second: e.target.value })
              } else {
                timerInitial.current = {
                  ...sure,
                  second: e.target.value.slice(0, 2),
                }
                setSure({ ...sure, second: e.target.value.slice(0, 2) })
              }
            }}
          />
          Seconds
        </label>
      </div>
      <div>
        <button onClick={() => handle('s')}>START</button>
        <button onClick={() => handle('p')}>PAUSE/RESUME</button>
        <button onClick={() => handle('r')}>RESET</button>
      </div>
      <label>
        {` ${
          sure.minute < 10 &&
          sure.minute >= 0 &&
          sure.minute.toString().length === 1
            ? (sure.minute = '0'.concat(sure.minute))
            : sure.minute
        }:
        ${
          sure.second < 10 &&
          sure.second >= 0 &&
          sure.second.toString().length === 1
            ? (sure.second = '0'.concat(sure.second))
            : sure.second
        }`}
      </label>
    </div>
  )
}
export default App
