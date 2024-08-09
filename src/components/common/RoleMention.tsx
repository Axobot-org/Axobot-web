import { Stack } from "@mui/system";

import DeleteCircleButton from "./DeleteCircleButton";

interface RoleMentionProps {
  name: string;
  color: number | undefined;
  onDelete?: (event: unknown) => void;
}

export default function RoleMention({ name, color, onDelete }: RoleMentionProps) {
  const mentionColor = color || 0x99aab5;
  const mentionColorAsHex = `#${mentionColor.toString(16).padStart(6, "0")}`;
  const backgroundColorAsRGBA = `rgba(${(mentionColor >> 16) & 255}, ${(mentionColor >> 8) & 255}, ${mentionColor & 255}, 0.1)`;

  return (
    <Stack
      display="inline-flex"
      direction="row"
      gap={0.5}
      sx={{
        color: mentionColorAsHex,
        backgroundColor: backgroundColorAsRGBA,
        borderRadius: "5px",
        alignItems: "center",
        padding: onDelete ? "2px 4px" : "0 2px",
        mx: onDelete ? 0.5 : 0,
      }}
    >
      @{name}
      {onDelete && <DeleteCircleButton onClick={onDelete} />}
    </Stack>
  );
}
