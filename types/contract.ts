import { Contract } from 'near-api-js';

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

export enum TypesOfProposals {
	HACKATHON = 'Hackathon',
	MEME_CONTEST = 'MemeContest',
	OPEN = 'Open',
}

export type HackathonProposal = {
	expected_registrations: number;
	estimated_budget: number;
	supporting_document: string;
};

export type MemeContestProposal = {
	expected_registrations: number;
	estimated_budget: number;
	supporting_document: string;
};

export type OpenProposal = {
	estimated_budget: number;
	supporting_document: string;
};

export type ProposalType =
  | {
      [TypesOfProposals.HACKATHON]: HackathonProposal;
    }
  | {
      [TypesOfProposals.MEME_CONTEST]: MemeContestProposal;
    }
  | {
      [TypesOfProposals.OPEN]: OpenProposal;
    };

export enum TypesOfBounties {
	HACKATHON_COMPLETION = 	'HackathonCompletion',
	MEME_CONTEST_COMPLETION = 'MemeContestCompletion',
	WEBINAR = 'Webinar',
	CONTENT_COORDINATION = 'ContentCoordination',
}

export type HackathonCompletionBounty = {
	num_of_registrations: number;
	num_of_submissions: number;
	winners_info: SubmissionInfo[];
};

export type MemeCompletionBounty = {
	num_of_submissions: number;
	winners_info: SubmissionInfo[];
};

export type WebinarBounty = {
	num_of_registrations: number;
	num_of_attendees: number;
	webinar_link: string;
};

export type ContentCoordintionBounty = {
	content_links: string[];
	story: string;
	tools_used: string[];
};

export type BountyType =
  | {
      [TypesOfBounties.HACKATHON_COMPLETION]: HackathonCompletionBounty;
    }
  | {
      [TypesOfBounties.MEME_CONTEST_COMPLETION]: MemeCompletionBounty;
    }
  | {
      [TypesOfBounties.WEBINAR]: WebinarBounty;
    }
  | {
      [TypesOfBounties.CONTENT_COORDINATION]: ContentCoordintionBounty;
    };

type AmbassadorRegistrationReferralType = {
	referrer_id: string;
	referred_id: string;
};

export type ReferralType =
  | {
      AmbassadorRegistration: AmbassadorRegistrationReferralType;
    }
  | 'Recruitment'
  | 'NearCertifiedDeveloper';

export type MiscellaneousType =
  | {
      ContentCreationBounty: {
        links_to_content: string[];
        expected_amount: number;
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

export type AccountIdArgs = { account_id: string };

export type viewFunctionsType = {
  version: () => Promise<string>;
  get_config: () => Promise<any>;
  get_policy: () => Promise<any>;

  is_council_member: (args: AccountIdArgs) => Promise<boolean>;
  is_registered_ambassador: (args: AccountIdArgs) => Promise<boolean>;

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

export type addPayoutFnArgs<T> = {
  payout: PayoutInput<T>;
};

export type addPayoutFn<T> = (args: addPayoutFnArgs<T>) => Promise<number>;

export type changeFunctionsType = {
  register_ambassador: (args: {
    token: String | null;
  }) => Promise<String | null>;
  get_council_referral_token: (args: AccountIdArgs) => Promise<string>;
  get_ambassador_referral_token: (args: AccountIdArgs) => Promise<string>;
  add_payout_proposal: addPayoutFn<ProposalType>;
  add_payout_bounty: addPayoutFn<BountyType>;
  add_payout_referral: addPayoutFn<ReferralType>;
  add_payout_miscellaneous: addPayoutFn<MiscellaneousType>;
};

export type CustomContract = Contract & viewFunctionsType & changeFunctionsType;