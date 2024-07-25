import typia from "typia";

import { LeaderboardImport } from "../../leaderboard";

export const isLeaderboardImport = typia.createIs<LeaderboardImport>();
export const parseLeaderboardImport = typia.json.createAssertParse<LeaderboardImport>();
