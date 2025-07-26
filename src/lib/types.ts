import {
  About1,
  About2,
  About3,
  About4,
  Linkedin,
  Mail,
  Telegram,
  Twitter,
} from "@/components/svg";

interface BaseMarket {
  marketid: string;
  question: string;
  createdAt: number;
  yesUsers: number;
  noUsers: number;
}
export interface ActiveMarket extends BaseMarket {
  closeTime: number;
  yesPool: number;
  noPool: number;
}

export interface MyBetMarket extends BaseMarket {
  resolved: boolean;
  winningOutcome: boolean;
  userOutcome: boolean;
  claimed: boolean;
}
export interface ResolvedMarket extends BaseMarket {
  winningOutcome: boolean;
  resolved: boolean;
  authority: string;
}
export type MarketRow = ActiveMarket | MyBetMarket | ResolvedMarket;

export const About = [
  {
    icon: About1,
    title: "Secure Earnings",
    desc: "Grow your holdings securely with blockchain-backed returns.",
  },
  {
    icon: About2,
    title: "Flexible Withdrawals",
    desc: "Access your funds anytime without lock-ins or penalties.",
  },
  {
    icon: About3,
    title: "Daily Rewards",
    desc: "Receive your earnings daily with no delays.",
  },
  {
    icon: About4,
    title: "Zero Hidden Fees",
    desc: "Enjoy full transparency with no surprise charges.",
  },
];

export const stats = [
  { value: "$284.6M", label: "Total deposited" },
  { value: "$125K", label: "Spent on security audits" },
  { value: "10%", label: "Avg interest over last year" },
];

export const faqs = [
  {
    question: "What is DeProbo?",
    answer:
      "DeProbo is a decentralized prediction market platform where users can create, participate in, and resolve prediction-based questions transparently using blockchain technology.",
  },
  {
    question: "How does DeProbo ensure fairness?",
    answer:
      "DeProbo leverages smart contracts to automate market creation, bet placement, and payout distribution, ensuring that outcomes are tamper-proof and fully transparent to all participants.",
  },
  {
    question: "Is my money secure with DeProbo?",
    answer:
      "Yes. All funds are held securely within decentralized smart contracts. Users retain custody of their assets until market resolution, eliminating third-party risk.",
  },
  {
    question: "Who can create prediction markets?",
    answer:
      "Any registered user can create a prediction market on DeProbo, subject to community guidelines and smart contract rules to maintain quality and prevent misuse.",
  },
];

export const icons = [
  {
    Icon: Linkedin,
    className: "lucide-linkedin",
    link: "https://linkedin.com/in/Simply-Rohit",
  },
  {
    Icon: Twitter,
    className: "lucide-twitter",
    link: "https://twitter.com/WasATrueWarrior",
  },
  {
    Icon: Telegram,
    className: "lucide-send",
    link: "https://t.me/r0hlttt",
  },
  {
    Icon: Mail,
    className: "lucide-mail",
    link: "mailto:hello@rohitjaatjaat073.com",
  },
];

export interface QuickNodeTransaction {
  blockTime?: number;
  logs?: string[];
  programInvocations?: [];
  signature?: string;
  slot?: number;
  success?: boolean;
  meta?: {
    logMessages?: string[];
  };
}

export interface WebhookPayload {
  data?: QuickNodeTransaction[] | QuickNodeTransaction[][];
}
