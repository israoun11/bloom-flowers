function Petal({ fill, style }) {
  return (
    <svg className="petal" style={style} width="26" height="30" viewBox="0 0 26 30" fill="none">
      <path d="M13 0C20 6 26 14 20 24C17 29 9 29 6 24C0 14 6 6 13 0Z" fill={fill} opacity="0.9" />
    </svg>
  )
}

// A field of softly drifting petals used behind the hero and final CTA.
export default function PetalField({ count = 14, colors, style }) {
  const petals = Array.from({ length: count }).map((_, i) => {
    const left = Math.random() * 100
    const delay = Math.random() * 10
    const dur = 12 + Math.random() * 10
    const size = 0.5 + Math.random() * 0.7
    const rot = Math.random() * 360
    const color = colors[i % colors.length]
    return (
      <span
        key={i}
        style={{
          position: 'absolute',
          left: left + '%',
          top: '-40px',
          animationDuration: `${dur}s`,
          animationDelay: `${delay}s`,
          transform: `scale(${size}) rotate(${rot}deg)`,
        }}
      >
        <Petal fill={color} />
      </span>
    )
  })
  return (
    <div className="petal-layer" style={style}>
      {petals}
    </div>
  )
}