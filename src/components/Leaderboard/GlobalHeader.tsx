import PublicIcon from "@mui/icons-material/Public";

import HeaderLayout from "./HeaderLayout";

export default function GlobalHeader() {
  return <HeaderLayout icon={<PublicIcon fontSize="large"/>} name="Global Leaderboard" />;
}