import DecryptedText from './DecryptedText'

export default function AnimatedHeading({
  text,
  as: Tag = 'h2',
  size = 'text-5xl',
  className = ''
}) {
  return (
    <Tag>
      <DecryptedText
        text={text}
        animateOn="view"
        sequential
        speed={40}
        revealDirection="start"
        className={`${size} font-semibold tracking-tight`}
        encryptedClassName={`${size} font-semibold tracking-tight text-white/30`}
        parentClassName={className}
      />
    </Tag>
  )
}
