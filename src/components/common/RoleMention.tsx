interface RoleMentionProps {
  name: string;
  color: number | undefined;
}

export default function RoleMention({ name, color }: RoleMentionProps) {
  const mentionColor = color || 0x99aab5;
  const backgroundColor = `rgba(${(mentionColor >> 16) & 255}, ${(mentionColor >> 8) & 255}, ${mentionColor & 255}, 0.1)`;
  return (
    <span style={{
      color: `#${mentionColor.toString(16).padStart(6, "0")}`,
      backgroundColor: backgroundColor,
      borderRadius: "3px",
      padding: "0 2px",
    }}
    >
      @{name}
    </span>
  );
}