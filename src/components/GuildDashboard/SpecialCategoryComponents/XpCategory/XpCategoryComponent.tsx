import LaunchIcon from "@mui/icons-material/Launch";
import { Button, Divider, Link, Stack, styled, Typography } from "@mui/material";
import { Fragment } from "react/jsx-runtime";

import { useFetchGuildConfigCategory } from "../../../../repository/commands/useFetchGuildConfigCategory";
import { useFetchGuildConfigQuery, useFetchGuildRoleRewardsQuery } from "../../../../repository/redux/api/api";
import { ExternalRoutesURLs } from "../../../../router/router";
import DownloadLeaderboardButton from "./DownloadLeaderboardButton";
import RoleRewardsList from "./RoleRewardsList";
import UploadLeaderboardButton from "./UploadLeaderboardButton";


interface XpCategoryComponentProps {
  guildId: string;
}

export default function XpCategoryComponent({ guildId }: XpCategoryComponentProps) {
  return (
    <Fragment>
      <LeaderboardActionsSection guildId={guildId} />
      <RolesRewardsSection guildId={guildId} />
    </Fragment>
  );
}

const DividerWithMargins = styled(Divider)(({ theme }) => ({
  margin: theme.spacing(4, 0, 2),
}));

const SectionTitle = styled(Typography)({
  fontSize: "1.3rem",
  fontWeight: 500,
});

function LeaderboardActionsSection({ guildId }: {guildId: string}) {
  const { data: xpData } = useFetchGuildConfigCategory({ guildId, category: "xp" });

  const isNotGlobalXp = xpData?.["xp_type"].value !== "global";
  return (
    <Fragment>
      <DividerWithMargins />
      <Stack px={2} gap={2}>
        <SectionTitle>Leaderboard actions</SectionTitle>
        <Stack gap={2} direction={{ xs: "column", sm: "row" }}>
          <Button
            component={Link}
            target="_blank"
            variant="outlined"
            href={`/leaderboard/${guildId}`}
            endIcon={<LaunchIcon />}
          >
          View Leaderboard
          </Button>
          <DownloadLeaderboardButton guildId={guildId} />
          {isNotGlobalXp && <UploadLeaderboardButton guildId={guildId} />}
        </Stack>
      </Stack>
    </Fragment>
  );
}


function RolesRewardsSection({ guildId }: {guildId: string}) {
  const { data: configData } = useFetchGuildConfigQuery({ guildId: guildId, categories: ["core"] });
  const { data: roleRewards } = useFetchGuildRoleRewardsQuery({ guildId });

  const maxRoles = configData?.core?.rr_max_number as number | undefined;
  let title = "Role Rewards";
  if (roleRewards !== undefined) {
    if (maxRoles) {
      title = `Role Rewards (${roleRewards?.length}/${maxRoles})`;
    } else {
      title = `Role Rewards (${roleRewards.length})`;
    }
  }

  return (
    <Fragment>
      <DividerWithMargins />
      <Stack px={2} gap={1}>
        <SectionTitle>{title}</SectionTitle>
        <Description>
          Roles rewards are roles given to your members when they reach a certain level of XP. This is a great way to encourage your members to be active! <Link href={`${ExternalRoutesURLs.documentation}/en/latest/xp.html#roles-rewards`} target="_blank" sx={{ fontStyle: "normal" }}>[Read more]</Link>
        </Description>
        <RoleRewardsList guildId={guildId} roleRewards={roleRewards ?? []} />
      </Stack>
    </Fragment>
  );
}

const Description = styled(Typography)(({ theme }) => ({
  fontSize: "1rem",
  fontStyle: "italic",
  color: theme.palette.text.secondary,
}));
