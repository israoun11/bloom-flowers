import { useId } from 'react'

// Hand-drawn inline SVG bouquets. Petals use soft radial gradients (a satin
// highlight over the base color) instead of flat fills, plus a grounded
// ambient shadow, so the flowers read as dimensional rather than clip-art —
// with zero external image dependencies.

export const PALETTES = {
  rose: { stem: '#8AA07A', leaf: '#95A582', petalA: '#E7B7BC', petalB: '#CE8E92', petalC: '#F1D9D6', core: '#C9A868' },
  blush: { stem: '#95A582', leaf: '#B3C1A0', petalA: '#F6E3E4', petalB: '#EFC9CB', petalC: '#FBF0EE', core: '#CE8E92' },
  wild: { stem: '#5F6E4E', leaf: '#7C8E68', petalA: '#C79BC6', petalB: '#EAAF85', petalC: '#E7B7BC', core: '#5F6E4E' },
  love: { stem: '#8AA07A', leaf: '#95A582', petalA: '#D97B85', petalB: '#B5666D', petalC: '#E7B7BC', core: '#7A2E33' },
  thanks: { stem: '#8AA07A', leaf: '#A9B896', petalA: '#EAAF85', petalB: '#F3CBA6', petalC: '#FBE3CB', core: '#C9A868' },
  sorry: { stem: '#7C8E68', leaf: '#95A582', petalA: '#C6CBE0', petalB: '#AAB3D6', petalC: '#E5E8F2', core: '#6E7BA6' },
  because: { stem: '#5F6E4E', leaf: '#7C8E68', petalA: '#F1D9D6', petalB: '#C79BC6', petalC: '#F3CBA6', core: '#B5666D' },
}

function FlowerHead({ uid, cx, cy, r, gradientId, coreColor, rotate = 0, petalCount = 6 }) {
  const petals = []
  for (let i = 0; i < petalCount; i++) {
    const angle = (360 / petalCount) * i + rotate
    petals.push(
      <use
        key={i}
        href={`#${uid}-petal`}
        fill={`url(#${uid}-${gradientId})`}
        transform={`translate(${cx} ${cy}) rotate(${angle}) scale(${r / 40})`}
        opacity="0.97"
      />
    )
  }
  return (
    <g>
      {petals}
      <circle cx={cx} cy={cy} r={r * 0.32} fill={`url(#${uid}-core)`} />
    </g>
  )
}

function Leaf({ x, y, w, h, rotate, fill }) {
  return <ellipse cx={x} cy={y} rx={w} ry={h} fill={fill} transform={`rotate(${rotate} ${x} ${y})`} opacity="0.9" />
}

function Speckles({ uid, seedX, seedY, color }) {
  // A little scattered filler texture (like baby's breath) for organic density.
  const dots = [
    [seedX, seedY],
    [seedX + 14, seedY - 10],
    [seedX - 12, seedY - 6],
    [seedX + 4, seedY + 12],
  ]
  return (
    <g opacity="0.7">
      {dots.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={2.4} fill={color} />
      ))}
    </g>
  )
}

export default function Bouquet({ palette = PALETTES.rose, width = 320, height = 340, dense = true, className, style }) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '')
  const p = palette

  return (
    <svg
      className={className}
      style={{ filter: 'drop-shadow(0 20px 30px rgba(44, 38, 32, 0.16))', ...style }}
      width={width}
      height={height}
      viewBox="0 0 320 340"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Reusable organic teardrop petal, positioned via <use> + transform */}
        <path id={`${uid}-petal`} d="M0,0 C7,-9 8,-27 0,-42 C-8,-27 -7,-9 0,0 Z" />

        <radialGradient id={`${uid}-gA`} cx="35%" cy="28%" r="75%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.7" />
          <stop offset="100%" stopColor={p.petalA} stopOpacity="1" />
        </radialGradient>
        <radialGradient id={`${uid}-gB`} cx="35%" cy="28%" r="75%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.55" />
          <stop offset="100%" stopColor={p.petalB} stopOpacity="1" />
        </radialGradient>
        <radialGradient id={`${uid}-gC`} cx="35%" cy="28%" r="75%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
          <stop offset="100%" stopColor={p.petalC} stopOpacity="1" />
        </radialGradient>
        <radialGradient id={`${uid}-core`} cx="40%" cy="35%" r="70%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.6" />
          <stop offset="100%" stopColor={p.core} stopOpacity="1" />
        </radialGradient>
        <filter id={`${uid}-blur`}>
          <feGaussianBlur stdDeviation="5" />
        </filter>
      </defs>

      {/* grounded ambient shadow */}
      <ellipse cx="160" cy="332" rx="66" ry="9" fill="rgba(44,38,32,0.14)" filter={`url(#${uid}-blur)`} />

      <path d="M160 340 L150 200" stroke={p.stem} strokeWidth="3" opacity="0.5" />
      <path d="M160 340 L175 210" stroke={p.stem} strokeWidth="3" opacity="0.5" />
      <path d="M160 340 L130 220" stroke={p.stem} strokeWidth="3" opacity="0.5" />
      <path d="M160 340 L190 225" stroke={p.stem} strokeWidth="3" opacity="0.5" />

      <Leaf x={120} y={230} w={26} h={12} rotate={-30} fill={p.leaf} />
      <Leaf x={205} y={235} w={26} h={12} rotate={30} fill={p.leaf} />
      <Leaf x={165} y={215} w={22} h={10} rotate={80} fill={p.leaf} />

      {dense && <Speckles uid={uid} seedX={108} seedY={112} color={p.core} />}
      {dense && <Speckles uid={uid} seedX={222} seedY={104} color={p.core} />}

      <FlowerHead uid={uid} cx={130} cy={190} r={38} gradientId="gA" coreColor={p.core} rotate={10} petalCount={7} />
      <FlowerHead uid={uid} cx={195} cy={180} r={44} gradientId="gB" coreColor={p.core} rotate={0} petalCount={8} />
      <FlowerHead uid={uid} cx={162} cy={130} r={50} gradientId="gA" coreColor={p.core} rotate={20} petalCount={9} />
      {dense && <FlowerHead uid={uid} cx={100} cy={150} r={30} gradientId="gC" coreColor={p.core} rotate={5} petalCount={6} />}
      {dense && <FlowerHead uid={uid} cx={228} cy={140} r={32} gradientId="gC" coreColor={p.core} rotate={-5} petalCount={6} />}
      {dense && <FlowerHead uid={uid} cx={162} cy={70} r={26} gradientId="gB" coreColor={p.core} rotate={0} petalCount={5} />}
    </svg>
  )
}