import { captureException } from '@sentry/nextjs';
const panickedAtRegex = new RegExp(/panicked at.*,/g);
const errorLabelRegex = new RegExp(/'\w*'/g);

export const extractPanicMessage = (error: Error) =>
  error.message
    .matchAll(panickedAtRegex)
    .next()
    .value[0].matchAll(errorLabelRegex)
    .next()
    .value[0].slice(1, -1);

export const handlePayoutCreationError = (err: unknown) => {
  let error = err as Error;
  if (!error.message.includes('panic')) {
    captureException(error);
    return 'Something went wrong, please try again later';
  }
  const message = extractPanicMessage(error);
  switch (message) {
    case 'ERR_INVALID_RESOURCE_URL':
      return "Please enter a valid URL of the format 'https://...'";
    case 'ERR_REFERRED_MEMBER_NOT_FOUND':
      return 'The referred account ID is not a registered ambassador';
    case 'REGISTRATION_REFERRAL_ALREADY_USED':
      return 'You cannot have more than one registration referral payout';
    case 'ERR_INVALID_LINKS_TO_CONTENT':
      return 'Please enter links to content created';
    case 'ERR_INVALID_LINKS_TO_PAYOUTS':
      return 'Please enter links to approved payouts';
    case 'ERR_MIN_SUBMISSION_LIMIT_NOT_SATISFIED':
      return 'Minimum number of registrations must be 20';
    case 'ERR_WINNERS_INFO_MUST_HAVE_THREE_ENTRIES':
      return 'Information of three winners is required';
    case 'ERR_MIN_ATTENDEES_LIMIT_NOT_SATISFIED':
      return 'Minimum number of attendees must be 50';
    case 'ERR_CONTENT_LINKS_CANNOT_BE_EMPTY':
      return 'Content links are required';
    case 'ERR_STORY_CANNOT_BE_EMPTY':
      return 'Story cannot be empty';
    case 'ERR_TOOLS_USED_CANNOT_BE_EMPTY':
      return 'List of tools used cannot be empty';
    default:
      return 'Something went wrong, please try again later';
  }
};
