// Adapted from https://codesandbox.io/s/zuwji?file=/src/index.js

import React, { useRef, useCallback, useEffect, useState } from 'react'
import { useSpring, animated, config } from 'react-spring'
import { useDrag } from 'react-use-gesture'

const styles = {
  backdrop: {
    position: 'fixed',
    top: 0,
    height: '100%',
    width: '100%',
    background: 'black',
  },
  sheet: {
    position: 'fixed',
    left: '0',
    right: '0',
    margin: 'auto',
    height: 'calc(100vh + 100px)',
    width: '96vw',
    borderRadius: '12px 12px 0px',
    background: '#fff',
    touchAction: 'none',
  },
}

const transitionDuration = 500

export default function ActionSheet({ className = '', zIndex = 100, onClose = () => {}, height, open, children }) {
  const [closed, setClosed] = useState(true)

  const draggingRef = useRef(false)
  const [{ y }, set] = useSpring(() => ({
    y: height,
  }))

  const myPos = 0

  const _open = useCallback(
    ({ canceled } = {}) => {
      // when cancel is true, it means that the user passed the upwards threshold
      // so we change the spring config to create a nice wobbly effect
      set({ y: myPos, config: canceled ? config.wobbly : config.stiff })
    },
    [set, myPos],
  )

  const _close = useCallback(
    (velocity = 0) => {
      set({ y: height, config: { ...config.stiff, velocity } })
    },
    [set, height],
  )

  useEffect(() => {
    if (open) {
      setClosed(false)
      _open()
    } else {
      _close()
      setTimeout(() => {
        setClosed(true)
      }, transitionDuration)
    }
  }, [open, _open, _close])

  const display = y.to((py) => (py < height ? 'block' : 'none'))

  const bgStyle = {
    transform: y.to([0, height], ['translateY(-8%) scale(1.16)', 'translateY(0px) scale(1)']),
    opacity: y.to([0, height], [0.4, 0], 'clamp'),
    // touchAction: y.to(v => (v > 0 ? 'auto' : 'none'))
  }

  const bind = useDrag(
    ({ first, last, vxvy: [, vy], movement: [, my], cancel }) => {
      if (first) draggingRef.current = true
      // if this is not the first or last frame, it's a moving frame
      // then it means the user is dragging
      else if (last) setTimeout(() => (draggingRef.current = false), 0)

      // When user drags up passed the threshold, cancel
      // the drag so that the sheet resets to its open position.
      if (my < -75) {
        cancel()
        _open(vy)
        return
      }

      // When the user releases the sheet, we check whether it passed
      // the threshold for it to close, or if we reset it to its open position.
      if (last) {
        if (my < height * 0.75) {
          _close()
          onClose()
        }
      }
      // when the user keeps dragging, move the sheet according to
      // the cursor position
      else {
        set({ y: my, immediate: false, config: config.stiff })
      }
    },
    {
      initial: () => [0, y.get()],
      filterTaps: true,
      bounds: { top: 0 },
      rubberband: true,
    },
  )

  return (
    <>
      <animated.div
        style={{
          ...styles.backdrop,
          ...bgStyle,
          display: closed ? 'none' : 'block',
        }}
        onClick={() => {
          _close()
          onClose()
        }}
      />

      <animated.div
        {...bind()}
        className={className}
        style={{
          ...styles.sheet,
          zIndex: zIndex + 1,
          display,
          bottom: `calc(-100vh + ${height - 100}px)`,
          y,
        }}
      >
        {children}
      </animated.div>
    </>
  )
}
