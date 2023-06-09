/**
 * The comment prefix and suffix are not rendered by GitHub.
 * They are used to identify comments that were generated by the assistant.
 * @see https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#hiding-content-with-comments
 */
const ASSISTANT_COMMENT_PREFIX = '<!-- AdaGPT -->';
const ASSISTANT_COMMENT_SUFFIX = '<!-- /AdaGPT -->';

/**
 * The comment link is rendered as a subscript by GitHub.
 */
const ASSISTANT_ACTION_URL = 'https://github.com/zirkelc/AdaGPT';
const ASSISTANT_COMMENT_LINK = `<sub>generated by [AdaGPT](${ASSISTANT_ACTION_URL})</sub>`;

/**
 * Returns true if the comment was generated by the assistant.
 * Only the prefix is checked.
 *
 * @param comment
 * @returns
 */
export const isCommentByAssistant = (comment: string): boolean => comment.startsWith(ASSISTANT_COMMENT_PREFIX);

/**
 * Adds the comment prefix and suffix to the comment and appends the comment link.
 *
 * @param comment
 * @returns
 */
export const escapeComment = (comment: string): string => {
  // line breaks are important for the markdown to be rendered correctly.
  return [ASSISTANT_COMMENT_PREFIX, comment, ASSISTANT_COMMENT_SUFFIX, ASSISTANT_COMMENT_LINK].join('\n');
};

/**
 * Removes the comment prefix and suffix from the comment.
 *
 * @param comment
 * @returns
 */
export const unescapeComment = (comment: string): string => {
  const startIndex = comment.indexOf(ASSISTANT_COMMENT_PREFIX);
  if (startIndex >= 0) comment = comment.substring(startIndex + ASSISTANT_COMMENT_PREFIX.length);

  const endIndex = comment.lastIndexOf(ASSISTANT_COMMENT_SUFFIX);
  if (endIndex >= 0) comment = comment.substring(0, endIndex);

  return comment.trim();
};

/**
 * Removes special characters from the user name.
 * @param user
 */
export const escapeUser = (user: string): string => {
  // Remove [bot] from the end of the login name.
  user = user.endsWith('[bot]') ? user.slice(0, -5) : user;
  // Remove all characters except a-z, A-Z, 0-9, _ and -.
  return user.replace('[bot]', '').replace(/[^a-zA-Z0-9_-]/g, '');
};
