import { Avatar, Stack, styled, Tooltip, Typography } from "@mui/material";
import { Fragment } from "react/jsx-runtime";

import { getGuildDashboardTranslations } from "../../../../i18n/i18n";
import { useFetchConfigEditionLogsQuery } from "../../../../repository/redux/api/api";
import { ConfigEditionLog } from "../../../../repository/types/api";
import { RoleMentionFromId } from "../../../common/RoleMention";
import { ErrorPage, LoadingPlaceholder } from "../../shared";

interface ConfigEditionLogsComponentProps {
  guildId: string;
}

export default function ConfigEditionLogsComponent({ guildId }: ConfigEditionLogsComponentProps) {
  const { data, isLoading, error } = useFetchConfigEditionLogsQuery({ guildId });

  if (error) {
    if (isLoading) {
      return <LoadingPlaceholder />;
    }

    console.error(error);
    return <ErrorPage title="Oops, something went wrong!" message="Sorry, an unexpected error has occurred." />;
  }

  if (data === undefined) {
    return <LoadingPlaceholder />;
  }

  const sortedData = data.toSorted((a, b) => (b.date < a.date ? -1 : 1));

  return (
    <Fragment>
      <Typography variant="h5" gutterBottom textAlign="center">Configuration edition logs</Typography>
      <Stack gap={{ xs: 3, md: 0.75 }}>
        {sortedData.map((log) => (
          <LogRow key={log.id} log={log} />
        ))}
      </Stack>
    </Fragment>
  );
}

function LogRow({ log }: { log: ConfigEditionLog }) {
  return (
    <LogRowContainer>
      <Typography variant="body2" color="textDisabled">{new Date(log.date).toLocaleString()}</Typography>
      <Stack direction="row" gap={1} alignItems="center" flexWrap="wrap">
        <LogAuthor log={log} />
        <span>
          <LogAction log={log} />
        </span>
      </Stack>
    </LogRowContainer>
  );
}

const LogRowContainer = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  gap: theme.spacing(1, 2),
  borderRadius: 10,
  padding: theme.spacing(0.75, 2),
  alignItems: "center",
  "&:hover": {
    backgroundColor: theme.palette.custom.background1,
  },

  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
}));

function LogAction({ log }: { log: ConfigEditionLog }) {
  if (logIsSconfigOptionSet(log)) {
    return (
      <Fragment>
        edited option
        <OptionName optionId={log.data.option} />
        <ActionSource log={log} />
      </Fragment>
    );
  }
  if (logIsSconfigOptionReset(log)) {
    return (
      <Fragment>
        reset option
        <OptionName optionId={log.data.option} />
        <ActionSource log={log} />
      </Fragment>
    );
  }
  if (logIsLeaderboardPut(log)) {
    return "uploaded a new leaderboard";
  }
  if (logIsRoleRewardsPut(log)) {
    if (log.data.newRewards.length === 0) {
      return "removed role rewards";
    }
    if (log.data.newRewards.length === 1) {
      return (
        <Fragment>
          set
          {" "}
          <b>role rewards</b>
          {" "}
          to role
          {" "}
          <RoleMentionFromId id={log.data.newRewards[0].roleId} />
          <ActionSource log={log} />
        </Fragment>
      );
    }
    return (
      <Fragment>
        set
        {" "}
        <b>role rewards</b>
        {" "}
        to roles
        {" "}
        <Stack display="inline-flex" direction="row" columnGap={1} flexWrap="wrap">
          {log.data.newRewards.map((reward) => (
            <RoleMentionFromId key={reward.roleId} id={reward.roleId} />
          ))}
        </Stack>
        <ActionSource log={log} />
      </Fragment>
    );
  }
  return "edited configuration";
}

function LogAuthor({ log }: { log: ConfigEditionLog }) {
  return (
    <Tooltip enterDelay={400} enterNextDelay={200} title={`ID ${log.user_id}`}>
      <Stack direction="row" gap={0.5} alignItems="center">
        <Avatar sx={{ width: 32, height: 32 }} alt={log.username ?? log.user_id} src={log.avatar + "?size=64"} />
        <Typography color="secondary">
          {log.username ?? log.user_id}
        </Typography>
      </Stack>
    </Tooltip>
  );
}

function OptionName({ optionId }: { optionId: string }) {
  const optionName = getGuildDashboardTranslations("option_name." + optionId, optionId);
  return (
    <b>'{optionName}'</b>
  );
}

function ActionSource({ log }: { log: ConfigEditionLog }) {
  if (log.origin === "bot") {
    return " from the bot";
  }
  if (log.origin === "website") {
    return " from the website";
  }
  return null;
}


interface ConfigEditionLog_SconfigOptionSet extends ConfigEditionLog {
  type: "sconfig_option_set";
  data: {
    option: string;
    value: string;
  };
}
function logIsSconfigOptionSet(log: ConfigEditionLog): log is ConfigEditionLog_SconfigOptionSet {
  return log.type === "sconfig_option_set";
}

interface ConfigEditionLog_SconfigOptionReset extends ConfigEditionLog {
  type: "sconfig_option_reset";
  data: {
    option: string;
    value: string;
  };
}
function logIsSconfigOptionReset(log: ConfigEditionLog): log is ConfigEditionLog_SconfigOptionReset {
  return log.type === "sconfig_option_reset";
}

interface ConfigEditionLog_LeaderboardPut extends ConfigEditionLog {
  type: "leaderboard_put";
  data: null;
}
function logIsLeaderboardPut(log: ConfigEditionLog): log is ConfigEditionLog_LeaderboardPut {
  return log.type === "leaderboard_put";
}

interface ConfigEditionLog_RoleRewardsPut extends ConfigEditionLog {
  type: "role_rewards_put";
  data: {
    newRewards: {
      roleId: string;
      level: string;
    }[];
  };
}
function logIsRoleRewardsPut(log: ConfigEditionLog): log is ConfigEditionLog_RoleRewardsPut {
  return log.type === "role_rewards_put";
}
