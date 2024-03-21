import {
  GITHUB_OAUTH_CLIENT_ID,
  GITHUB_OAUTH_CLIENT_SECRET,
} from "$env/static/private";

export const authorizationHeader =
  "Basic " + btoa(GITHUB_OAUTH_CLIENT_ID + ":" + GITHUB_OAUTH_CLIENT_SECRET);
