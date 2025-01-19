import { Skeleton } from "@mui/material";
import { Stack, SystemStyleObject } from "@mui/system";

import { useGuildConfigEditionContext } from "../../repository/context/GuildConfigEditionContext";
import { useFetchGuildRolesQuery } from "../../repository/redux/api/api";
import DeleteCircleButton from "./DeleteCircleButton";

interface RoleMentionProps {
  name: string;
  color: number | undefined;
  disabled?: boolean;
  onDelete?: (event: unknown) => void;
  sx?: SystemStyleObject;
}

export default function RoleMention({ name, color, disabled, onDelete, sx }: RoleMentionProps) {
  const mentionColor = color || 0x99aab5;
  const mentionColorAsHex = `#${mentionColor.toString(16).padStart(6, "0")}`;
  const backgroundColorAsRGBA = `rgba(${(mentionColor >> 16) & 255}, ${(mentionColor >> 8) & 255}, ${mentionColor & 255}, 0.1)`;

  return (
    <Stack
      display="inline-flex"
      direction="row"
      spacing={0.5}
      sx={{
        color: mentionColorAsHex,
        backgroundColor: backgroundColorAsRGBA,
        borderRadius: "5px",
        alignItems: "center",
        padding: onDelete ? "2px 4px" : "0 2px",
        mx: onDelete ? 0.5 : 0,
        ...sx,
      }}
    >
      @{name}
      {onDelete && !disabled && <DeleteCircleButton onClick={onDelete} />}
    </Stack>
  );
}

interface RoleMentionFromIdProps {
  id: string;
  sx?: SystemStyleObject;
}
export function RoleMentionFromId({ id, sx }: RoleMentionFromIdProps) {
  const { guildId } = useGuildConfigEditionContext();
  const { data: roles } = useFetchGuildRolesQuery({ guildId });

  if (roles === undefined) {
    return <Skeleton variant="text" width="5rem" sx={{ display: "inline-block", ...sx }} />;
  }

  const role = roles.find((r) => r.id === id);

  return <RoleMention name={role?.name ?? id} color={role?.color} sx={sx} />;
}
