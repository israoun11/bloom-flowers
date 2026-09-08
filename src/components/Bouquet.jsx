// Hand-drawn inline SVG bouquets. Using vector art instead of stock photos
// means there is nothing that can fail to load, and every flower matches
// the site's palette exactly.

export const PALETTES = {
  rose: { stem: '#8AA07A', leaf: '#95A582', petalA: '#E7B7BC', petalB: '#CE8E92', petalC: '#F1D9D6', core: '#C9A868' },
  blush: { stem: '#95A582', leaf: '#B3C1A0', petalA: '#F6E3E4', petalB: '#EFC9CB', petalC: '#FBF0EE', core: '#CE8E92' },
  wild: { stem: '#5F6E4E', leaf: '#7C8E68', petalA: '#C79BC6', petalB: '#EAAF85', petalC: '#E7B7BC', core: '#5F6E4E' },
  love: { stem: '#8AA07A', leaf: '#95A582', petalA: '#D97B85', petalB: '#B5666D', petalC: '#E7B7BC', core: '#7A2E33' },
  thanks: { stem: '#8AA07A', leaf: '#A9B896', petalA: '#EAAF85', petalB: '#F3CBA6', petalC: '#FBE3CB', core: '#C9A868' },
  sorry: { stem: '#7C8E68', leaf: '#95A582', petalA: '#C6CBE0', petalB: '#AAB3D6', petalC: '#E5E8F2', core: '#6E7BA6' },
  because: { stem: '#5F6E4E', leaf: '#7C8E68', petalA: '#F1D9D6', petalB: '#C79BC6', petalC: '#F3CBA6', core: '#B5666D' },
}

function FlowerHead({ cx, cy, r, petalColor, coreColor, rotate = 0, petalCount = 6 }) {
  const petals = []
  for (let i = 0; i < petalCount; i++) {
    const angle = (360 / petalCount) * i + rotate
    petals.push(
      <ellipse
        key={i}
        cx={cx}
        cy={cy - r * 0.9}
        rx={r * 0.42}
        ry={r * 0.62}
        fill={petalColor}
        transform={`rotate(${angle} ${cx} ${cy})`}
        opacity="0.96"
      />
    )
  }
  return (
    <g>
      {petals}
      <circle cx={cx} cy={cy} r={r * 0.34} fill={coreColor} />
    </g>
  )
}

function Leaf({ x, y, w, h, rotate, fill }) {
  return <ellipse cx={x} cy={y} rx={w} ry={h} fill={fill} transform={`rotate(${rotate} ${x} ${y})`} opacity="0.9" />
}

export default function Bouquet({ palette = PALETTES.rose, width = 320, height = 340, dense = true, className }) {
  const p = palette
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 320 340"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M160 340 L150 200" stroke={p.stem} strokeWidth="3" opacity="0.5" />
      <path d="M160 340 L175 210" stroke={p.stem} strokeWidth="3" opacity="0.5" />
      <path d="M160 340 L130 220" stroke={p.stem} strokeWidth="3" opacity="0.5" />
      <path d="M160 340 L190 225" stroke={p.stem} strokeWidth="3" opacity="0.5" />

      <Leaf x={120} y={230} w={26} h={12} rotate={-30} fill={p.leaf} />
      <Leaf x={205} y={235} w={26} h={12} rotate={30} fill={p.leaf} />
      <Leaf x={165} y={215} w={22} h={10} rotate={80} fill={p.leaf} />

      <FlowerHead cx={130} cy={190} r={38} petalColor={p.petalA} coreColor={p.core} rotate={10} petalCount={7} />
      <FlowerHead cx={195} cy={180} r={44} petalColor={p.petalB} coreColor={p.core} rotate={0} petalCount={8} />
      <FlowerHead cx={162} cy={130} r={50} petalColor={p.petalA} coreColor={p.core} rotate={20} petalCount={9} />
      {dense && <FlowerHead cx={100} cy={150} r={30} petalColor={p.petalC} coreColor={p.core} rotate={5} petalCount={6} />}
      {dense && <FlowerHead cx={228} cy={140} r={32} petalColor={p.petalC} coreColor={p.core} rotate={-5} petalCount={6} />}
      {dense && <FlowerHead cx={162} cy={70} r={26} petalColor={p.petalB} coreColor={p.core} rotate={0} petalCount={5} />}
    </svg>
  )
}