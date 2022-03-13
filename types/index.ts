import { Contract } from 'near-api-js';
import { NextPage } from 'next';
import { Layouts } from '../layouts';

export type LayoutPage<T> = NextPage<T> & {
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

export type getAllFnArgs = {
  startIndex: number;
  limit: number;
};

export type getAllFn<T> = (args: getAllFnArgs) => Promise<Payout<T>[]>;

export type viewFunctionsType = {
  get_all_proposals: getAllFn<ProposalType>;
  get_all_bounties: getAllFn<BountyType>;
  get_all_referrals: getAllFn<ReferralType>;
  get_all_miscellaneous: getAllFn<MiscellaneousType>;
};

export type changeFunctionsType = {};

export type CustomContract = Contract & viewFunctionsType & changeFunctionsType;
