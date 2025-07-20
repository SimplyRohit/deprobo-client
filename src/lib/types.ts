interface BaseMarket {
  marketid: string;
  question: string;
  category: string;
}
export interface ActiveMarket extends BaseMarket {
  closeTime: number;
  createdAt: number;
  authority: string;
  yesPool: number;
  noPool: number;
  yesUsers: number;
  noUsers: number;
}
export interface MyBetMarket extends ActiveMarket {
  resolved: boolean;
  winningOutcome: boolean;
  userOutcome: boolean;
  amount: number;
  claimed: boolean;
}
export interface ResolvedMarket extends BaseMarket {
  resolved: boolean;
  winningOutcome: boolean;
}
export type MarketRow = ActiveMarket | MyBetMarket | ResolvedMarket;
