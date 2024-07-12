import CancelIcon from "@mui/icons-material/Cancel";
import { Stack } from "@mui/system";

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
    <Stack direction="row" gap={0.5} sx={{
      color: mentionColorAsHex,
      backgroundColor: backgroundColorAsRGBA,
      alignItems: "center",
      borderRadius: "5px",
      padding: onDelete ? "2px 4px" : "0 2px",
      mx: onDelete ? 0.5 : 0,
    }}>
      @{name}
      {onDelete && <DeleteButton onClick={onDelete} />}
    </Stack>
  );
}

function DeleteButton({ onClick }: { onClick: (event: unknown) => void }) {
  return (
    <CancelIcon onClick={onClick} fontSize="small" htmlColor="white" sx={{
      opacity: 0.3,
      cursor: "pointer",
      "&:hover": {
        opacity: 0.5,
      },
    }}
    />
  );
}
