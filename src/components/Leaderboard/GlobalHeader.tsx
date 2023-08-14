import PublicIcon from "@mui/icons-material/Public";

import PageTitle from "../common/PageTitle";

export default function GlobalHeader() {
  return <PageTitle text="Global Leaderboard" icon={<PublicIcon fontSize="large"/>} />;
}