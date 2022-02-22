import { accounts } from "./accounts";
import { bots } from "./bots";
import { deals } from "./deals";
import { grid_bots } from "./grid_bots";
import { loose_accounts } from "./loose_accounts";
import { marketplaces } from "./marketplaces";
import { smart_trades } from "./smart_trades";
import { users } from "./users";

export const routes = {
  ...accounts,
  ...bots,
  ...deals,
  ...grid_bots,
  ...loose_accounts,
  ...marketplaces,
  ...smart_trades,
  ...users,
  "ping": "/ver1/ping",
  "time": "/ver1/time",
} as const;
