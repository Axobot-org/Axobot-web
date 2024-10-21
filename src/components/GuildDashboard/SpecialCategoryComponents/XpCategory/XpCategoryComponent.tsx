import LaunchIcon from "@mui/icons-material/Launch";
import { Button, Divider, Link, Stack, styled, Typography } from "@mui/material";
import { Fragment } from "react/jsx-runtime";

import { useFetchGuildConfigCategory } from "../../../../repository/commands/useFetchGuildConfigCategory";
import { useGuildConfigRoleRewardsEditionContext } from "../../../../repository/context/GuildConfigEditionContext";
import { useFetchGuildConfigQuery, useFetchGuildRoleRewardsQuery } from "../../../../repository/redux/api/api";
import { ExternalRoutesURLs } from "../../../../router/router";
import AddRoleRewardButton from "./AddRoleRewardButton";
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

function LeaderboardActionsSection({ guildId }: { guildId: string }) {
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


function RolesRewardsSection({ guildId }: { guildId: string }) {
  const { data: configData } = useFetchGuildConfigQuery({ guildId: guildId, categories: ["core"] });
  const { data: rawRoleRewardsFromApi } = useFetchGuildRoleRewardsQuery({ guildId });
  const { state: editedRoleRewards, setValue, resetValue } = useGuildConfigRoleRewardsEditionContext();

  const roleRewardsFromApi = rawRoleRewardsFromApi?.map((rr) => ({ id: rr.id, roleId: rr.roleId, level: rr.level })).toSorted((a, b) => Number(a.level) - Number(b.level));

  const roleRewards = (
    editedRoleRewards?.map((rr) => ({ ...rr, id: rr.id ?? rr.roleId }))
    ?? roleRewardsFromApi?.map((rr) => ({ id: rr.id, roleId: rr.roleId, level: rr.level }))
  );
  const maxRoles = configData?.core?.rr_max_number as number | undefined;
  let title = "Role Rewards";
  if (roleRewards !== undefined) {
    if (maxRoles) {
      title = `Role Rewards (${roleRewards?.length}/${maxRoles})`;
    } else {
      title = `Role Rewards (${roleRewards.length})`;
    }
  }
  const canAddMoreRoles = maxRoles !== undefined && roleRewards !== undefined && roleRewards.length < maxRoles;

  const editRewardLevel = (roleRewardId: string, level: number) => {
    if (!roleRewards) return;
    const newRewards = roleRewards.map((rr) => (rr.id === roleRewardId ? { ...rr, level: String(level) } : rr));
    if (roleRewardsFromApi !== undefined && compareRoleRewards(newRewards, roleRewardsFromApi)) {
      resetValue();
    } else {
      setValue(roleRewards.map((rr) => (rr.id === roleRewardId ? { ...rr, level: String(level) } : rr)));
    }
  };

  const deleteRoleReward = (roleRewardId: string) => {
    if (!roleRewards) return;
    const newRewards = roleRewards.filter((rr) => rr.id !== roleRewardId);
    if (roleRewardsFromApi !== undefined && compareRoleRewards(newRewards, roleRewardsFromApi)) {
      resetValue();
    } else {
      setValue(newRewards);
    }
  };

  const addRoleReward = (roleId: string) => {
    if (!roleRewards) return;
    const newRewards = [...roleRewards, { roleId, level: findNextUnusedLevel()?.toString(), id: roleId }];
    if (roleRewardsFromApi !== undefined && compareRoleRewards(newRewards, roleRewardsFromApi)) {
      resetValue();
    } else {
      setValue(newRewards);
    }
  };

  return (
    <Fragment>
      <DividerWithMargins />
      <Stack px={2} gap={1}>
        <SectionTitle>{title}</SectionTitle>
        <Description>
          Roles rewards are roles given to your members when they reach a certain level of XP. This is a great way to encourage your members to be active!
          {" "}
          <Link href={`${ExternalRoutesURLs.documentation}/en/latest/xp.html#roles-rewards`} target="_blank" sx={{ fontStyle: "normal" }}>[Read more]</Link>
        </Description>
        <RoleRewardsList guildId={guildId} roleRewards={roleRewards ?? []} editRewardLevel={editRewardLevel} deleteReward={deleteRoleReward} />
        {canAddMoreRoles && <AddRoleRewardButton guildId={guildId} existingRoleIds={roleRewards.map((rr) => rr.roleId)} addNewReward={addRoleReward} />}
      </Stack>
    </Fragment>
  );

  function compareRoleRewards(a: { id: string; roleId: string; level: string }[], b: { id: string; roleId: string; level: string }[]) {
    if (a.length !== b.length) return false;
    if (a.some((rr) => !b.find((rr2) => rr2.roleId === rr.roleId && rr2.level === rr.level))) return false;
    if (b.some((rr) => !a.find((rr2) => rr2.roleId === rr.roleId && rr2.level === rr.level))) return false;
    return true;
  }

  function findNextUnusedLevel() {
    for (let i = 1; i <= 100; i++) {
      if (!roleRewards?.some((rr) => rr.level === String(i))) {
        return i;
      }
    }
    return 1;
  }
}

const Description = styled(Typography)(({ theme }) => ({
  fontSize: "1rem",
  fontStyle: "italic",
  color: theme.palette.text.secondary,
}));
