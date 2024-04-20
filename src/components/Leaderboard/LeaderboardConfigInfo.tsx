import { List, ListItem } from "@mui/material";

import { formatNumber } from "../../i18n/formatFunctions";
import { RoleReward } from "../../repository/types/leaderboard";
import CollapsedInfoBox from "../common/CollapsedInfoBox";
import RoleMention from "../common/RoleMention";

interface LeaderboardConfigInfoProps {
  xpType: string,
  xpRate: number,
  xpDecay: number,
  roleRewards: RoleReward[] | undefined,
}

export default function LeaderboardConfigInfo({ xpType, xpRate, xpDecay, roleRewards }: LeaderboardConfigInfoProps) {
  const useLocalLeaderboard = xpType !== "global";
  const hasRoleRewards = roleRewards && roleRewards.length > 0;
  return (
    <CollapsedInfoBox title="Server configuration">
      <List
        dense
        sx = {{
          listStyleType: "disc",
          pl: 4,
          color: "lightgray",
          "& .MuiListItem-root": {
            display: "list-item",
          },
        }}>
        <ListItem>
          <XpTypeInfo xpType={xpType} />
        </ListItem>
        {useLocalLeaderboard && (
          <>
            <ListItem>
              <XpRateInfo xpType={xpType} xpRate={xpRate} />
            </ListItem>
            {xpDecay !== 0 && (
              <ListItem>
                <XpDecayInfo xpDecay={xpDecay} />
              </ListItem>
            )}
          </>
        )}
        {hasRoleRewards && (
          <ListItem>
            <RoleRewardsInfo roleRewards={roleRewards} />
          </ListItem>
        )}
      </List>
    </CollapsedInfoBox>
  );
}

function XpTypeInfo({ xpType }: {xpType: LeaderboardConfigInfoProps["xpType"]}) {
  switch (xpType) {
  case "global":
    return <>This server uses the <b>global leaderboard</b>. Members can get XP from any other server that also uses the global leaderboard.</>;
  case "local":
    return <>This server uses the <b>local leaderboard</b>. Members can only get XP from this server, based on their chat activity.</>;
  case "mee6-like":
    return <>This server use the <b>mee6-like leaderboard</b>. Members can only get their XP from this server, based on the number of messages they send.</>;
  default:
    return <>This server use the <b>{xpType}</b> leaderboard.</>;
  }
}

function XpRateInfo({ xpType, xpRate }: {xpType: LeaderboardConfigInfoProps["xpType"], xpRate: LeaderboardConfigInfoProps["xpRate"]}) {
  const formatedRate = formatNumber(xpRate);
  if (xpType === "mee6-like") {
    const minValue = formatNumber(xpRate * 15);
    const maxValue = formatNumber(xpRate * 25);
    return <>The XP rate is <b>x{formatedRate}</b>: each message sent will randomly reward between {minValue} and {maxValue} XP.</>;
  } else if (xpType === "local") {
    if (xpRate > 1) {
      return <>The XP rate is <b>x{formatedRate}</b>: each message will reward more XP than the default value, based on its length.</>;
    } else {
      return <>The XP rate is <b>x{formatedRate}</b>: each message will reward less XP than the default value, based on its length</>;
    }
  }
}

function XpDecayInfo({ xpDecay }: {xpDecay: LeaderboardConfigInfoProps["xpDecay"]}) {
  if (xpDecay === 0) {
    return <>The XP decay is <b>disabled</b>: members will not lose XP over time.</>;
  }
  const formatedValue = formatNumber(xpDecay);
  return <>The XP decay is set to <b>{formatedValue} XP</b>: each member will lose {formatedValue} XP every day, no matter their activity.</>;
}

function RoleRewardsInfo({ roleRewards }: {roleRewards: RoleReward[]}) {
  const sortedRoleRewars = roleRewards.toSorted((a, b) => ((a.level < b.level) ? -1 : ((a.level > b.level) ? 1 : 0)));
  return (
    <>
      This server uses the following <b>role rewards</b>:
      <List dense sx={{ listStyleType: "circle", py: 0 }}>
        {sortedRoleRewars.map((roleReward) => (
          <ListItem key={roleReward.roleId} sx={{ py: 0.2 }}>
            <RoleMention name={roleReward.role?.name ?? roleReward.roleId} color={roleReward.role?.color} /> at level {formatNumber(roleReward.level)}
          </ListItem>
        ))}
      </List>
    </>
  );
}