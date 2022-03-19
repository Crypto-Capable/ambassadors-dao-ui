import { Contract } from 'near-api-js';
import { NextPage } from 'next';
import { Layouts } from '../layouts';

export type LayoutPage<T = {}> = NextPage<T> & {
  layout: Layouts;
};

export enum Tabs {
  PROPOSALS = 'proposals',
  BOUNTIES = 'bounties',
  REFERRALS = 'referrals',
  MISCELLANEOUS = 'miscellaneous',
}

export type Vote = { Approve: 0 } | { Reject: 1 };

export type VotesCount = {
  approve_count: number;
  reject_count: number;
};

export type SubmissionInfo = {
  name: string;
  account_id: string;
  submission_link: string;
};

export type ProposalType =
  | {
      Hackathon: {
        expected_registrations: number;
        estimated_budget: string;
        supporting_document: string;
      };
    }
  | {
      MemeContest: {
        expected_registrations: number;
        estimated_budget: string;
        supporting_document: string;
      };
    }
  | {
      Open: {
        estimated_budget: string;
        supporting_document: string;
      };
    };

export type BountyType =
  | {
      HackathonCompletion: {
        num_of_registrations: number;
        num_of_submissions: number;
        winners_info: SubmissionInfo[];
      };
    }
  | {
      MemeContestCompletion: {
        num_of_submissions: number;
        winners_info: SubmissionInfo[];
      };
    }
  | {
      Webinar: {
        num_of_registrations: number;
        num_of_attendees: number;
        webinar_link: string;
      };
    }
  | {
      ContentCoordination: {
        content_links: string[];
        story: string;
        tools_used: string[];
      };
    };

export type ReferralType =
  | {
      AmbassadorRegistration: {
        referrer_id: string;
        referred_id: string;
      };
    }
  | 'Recruitment'
  | 'NearCertifiedDeveloper';

export type MiscellaneousType =
  | {
      ContentCreationBounty: {
        links_to_content: string[];
        expected_amount: string;
        note: string;
      };
    }
  | 'CampusSigningMOU'
  | {
      CampusAmbassadorBonus: {
        links_to_payout: string[];
      };
    };

export type PayoutStatusType =
  | 'Approved'
  | 'Rejected'
  | { Removed: string | null }
  | 'UnderConsideration';

export type Payout<T> = {
  id: number;
  status: PayoutStatusType;
  proposer: string;
  info: T;
  description: string;
  votes: Record<string, Vote>;
  votes_count: VotesCount;
};

export type PayoutInput<T> = {
  description: string;
  information: T;
};

export type getAllPayoutsFnArgs = {
  from_index: number;
  limit: number;
};

export type getAllPayoutsFn<T> = (
  args: getAllPayoutsFnArgs
) => Promise<Payout<T>[]>;

export type getPayoutFnArgs = { id: Number };

export type getPayoutFn<T> = (args: getPayoutFnArgs) => Promise<Payout<T>>;

export type getLastPayoutIdFn = () => Promise<Number>;

export type addPayoutFnArgs<T> = PayoutInput<T>;

export type addPayoutFn<T> = (args: addPayoutFnArgs<T>) => Promise<number>;

export type viewFunctionsType = {
  version: () => Promise<string>;
  get_config: () => Promise<any>;
  get_policy: () => Promise<any>;
  is_council_member: (args: { member_id: string }) => Promise<boolean>;

  get_all_proposals: getAllPayoutsFn<ProposalType>;
  get_proposal: getPayoutFn<ProposalType>;
  get_last_proposal_id: getLastPayoutIdFn;

  get_all_bounties: getAllPayoutsFn<BountyType>;
  get_bounty: getPayoutFn<BountyType>;
  get_last_bounty_id: getLastPayoutIdFn;

  get_all_referrals: getAllPayoutsFn<ReferralType>;
  get_referral: getPayoutFn<ReferralType>;
  get_last_referral_id: getLastPayoutIdFn;

  get_all_miscellaneous: getAllPayoutsFn<MiscellaneousType>;
  get_miscellaneous: getPayoutFn<MiscellaneousType>;
  get_last_miscellaneous_id: getLastPayoutIdFn;
};

export type changeFunctionsType = {
  add_payout_proposal: addPayoutFn<ProposalType>;
  add_payout_bounty: addPayoutFn<BountyType>;
  add_payout_referral: addPayoutFn<ReferralType>;
  add_payout_miscellaneous: addPayoutFn<MiscellaneousType>;
};

export type CustomContract = Contract & viewFunctionsType & changeFunctionsType;
