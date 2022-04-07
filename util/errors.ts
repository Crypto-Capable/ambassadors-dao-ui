const panickedAtRegex = new RegExp(/panicked at.*,/g);
const errorLabelRegex = new RegExp(/'\w*'/g);

export const extractPanicMessage = (error: Error) =>
  error.message
    .matchAll(panickedAtRegex)
    .next()
    .value[0].matchAll(errorLabelRegex)
    .next()
    .value[0].slice(1, -1);
