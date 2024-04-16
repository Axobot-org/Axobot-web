import { List, ListItem } from "@mui/material";

import CollapsedInfoBox from "../common/CollapsedInfoBox";

interface LeaderboardConfigInfoProps {
  xpType: string,
  xpRate: number,
  xpDecay: number,
}

export default function LeaderboardConfigInfo({ xpType, xpRate, xpDecay }: LeaderboardConfigInfoProps) {
  const useLocalLeaderboard = xpType !== "global";
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
            <ListItem>
              <XpDecayInfo xpDecay={xpDecay} />
            </ListItem>
          </>
        )}
      </List>
    </CollapsedInfoBox>
  );
}

function XpTypeInfo({ xpType }: {xpType: LeaderboardConfigInfoProps["xpType"]}) {
  switch (xpType) {
  case "global":
    return <>This server uses the <b>global leaderboard</b>. Members can get XP from any other server that also uses the global leaderboard</>;
  case "local":
    return <>This server uses the <b>local leaderboard</b>. Members can only get XP from this server, based on their chat activity.</>;
  case "mee6-like":
    return <>This server use the <b>mee6-like leaderboard</b>. Members can only get their XP from this server, based on the number of messages they send.</>;
  default:
    return <>This server use the <b>{xpType}</b> leaderboard.</>;
  }
}

function XpRateInfo({ xpType, xpRate }: {xpType: LeaderboardConfigInfoProps["xpType"], xpRate: LeaderboardConfigInfoProps["xpRate"]}) {
  const formatedRate = xpRate.toLocaleString("en-US");
  if (xpType === "mee6-like") {
    const minValue = (xpRate * 15).toLocaleString("en-US");
    const maxValue = (xpRate * 25).toLocaleString("en-US");
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
  const formatedValue = xpDecay.toLocaleString("en-US");
  return <>The XP decay is set to <b>{formatedValue} XP</b>: each member will lose {formatedValue} XP every day, no matter their activity.</>;
}