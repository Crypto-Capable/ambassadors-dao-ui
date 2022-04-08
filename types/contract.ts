import { Contract } from 'near-api-js';

export enum Action {
  VOTE_APPROVE = 'VoteApprove',
  VOTE_REJECT = 'VoteReject',
  REMOVE_PAYOUT = 'RemovePayout',
}

export enum PayoutType {
  PROPOSAL = 'proposal',
  BOUNTY = 'bounty',
  REFERRAL = 'referral',
  MISCELLANEOUS = 'miscellaneous',
}

export enum Vote {
  APPROVE = 'Approve',
  REJECT = 'Reject',
}

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
  HACKATHON_COMPLETION = 'HackathonCompletion',
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

export enum TypesOfReferrals {
  AMBASSADOR_REGISTRATION = 'AmbassadorRegistration',
  RECRUITMENT = 'Recruitment',
  NEAR_CERTIFIED_DEVELOPER = 'NearCertifiedDeveloper',
}

export type ReferralCommonBody = {
  referrer_id: string;
  referred_id: string;
};

export type AmbassadorRegistrationReferral = ReferralCommonBody;

export type RecruitmentReferral = ReferralCommonBody;

export enum NCDReferralKind {
  FORM_FILLED = 'FormFilled',
  COMPLETION = 'Completion',
}

export type NearCertifiedDeveloperReferral = ReferralCommonBody & {
  kind: NCDReferralKind;
  proof_link: string;
};

export type ReferralType =
  | {
      [TypesOfReferrals.AMBASSADOR_REGISTRATION]: AmbassadorRegistrationReferral;
    }
  | {
      [TypesOfReferrals.RECRUITMENT]: RecruitmentReferral;
    }
  | {
      [TypesOfReferrals.NEAR_CERTIFIED_DEVELOPER]: NearCertifiedDeveloperReferral;
    };

export enum TypesOfMiscellaneous {
  CONTENT_CREATION_BOUNTY = 'ContentCreationBounty',
  CAMPUS_SIGNING_MOU = 'CampusSigningMOU',
  CAMPUS_AMBASSADOR_BONUS = 'CampusAmbassadorBonus',
}

export type ContentCreationMiscellaneous = {
  links_to_content: string[];
  expected_amount: number;
  note: string;
};

export type CampusSigningMOU = {
  supporting_document: string;
};

export type CampusAmbassadorBonus = {
  links_to_payouts: string[];
};

export type MiscellaneousType =
  | {
      [TypesOfMiscellaneous.CONTENT_CREATION_BOUNTY]: ContentCreationMiscellaneous;
    }
  | {
      [TypesOfMiscellaneous.CAMPUS_SIGNING_MOU]: CampusSigningMOU;
    }
  | {
      [TypesOfMiscellaneous.CAMPUS_AMBASSADOR_BONUS]: CampusAmbassadorBonus;
    };

export type PayoutStatus =
  | 'Approved'
  | 'Rejected'
  | { Removed: string }
  | 'UnderConsideration';

export type Payout<T> = {
  id: number;
  status: PayoutStatus;
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

export type PayoutListProps = {
  contract: CustomContract;
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

export type actPayoutFnArgs = {
  id: number;
  action: Action;
  note: string | null;
};

export type actPayoutFn = (args: actPayoutFnArgs) => Promise<void>;

export type changeFunctionsType = {
  register_ambassador: (args: { token: String | null }) => Promise<boolean>;

  get_council_referral_token: (args: AccountIdArgs) => Promise<string>;
  get_ambassador_referral_token: (args: AccountIdArgs) => Promise<string>;
  get_council: () => Promise<string[]>;

  add_payout_proposal: addPayoutFn<ProposalType>;
  add_payout_bounty: addPayoutFn<BountyType>;
  add_payout_referral: addPayoutFn<ReferralType>;
  add_payout_miscellaneous: addPayoutFn<MiscellaneousType>;

  act_payout_proposal: actPayoutFn;
  act_payout_bounty: actPayoutFn;
  act_payout_referral: actPayoutFn;
  act_payout_miscellaneous: actPayoutFn;
};

export type CustomContract = Contract & viewFunctionsType & changeFunctionsType;
