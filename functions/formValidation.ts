export const isValidBio = (bio: string) =>
  bio && bio.length > 20 && bio.length < 500;

export const isValidPresentationLink = (link: string) => {
  const youtubePatt =
    /(?:https|http)\:\/\/(?:[\w]+\.)?youtube\.com\/(?:c\/|channel\/|user\/)?([a-zA-Z0-9\-]{1,})/;
  const twitchPatt =
    /(?:https|http)\:\/\/(?:[\w]+\.)?twitch\.tv\/(?:channel\/|user\/)?([a-zA-Z0-9\-]{1,})/;
  return link === "" || youtubePatt.test(link) || twitchPatt.test(link);
};

export const isValidFee = (fee: number) => fee >= 8 && fee < 1000;

export const isValidPassword = (password: string) => {
  const patt = /^(?=.*[a-z])(?=.*\d)[0-9a-zA-Z!@#$%^&*?]{8,}$/;
  return patt.test(password);
};
