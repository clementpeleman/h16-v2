// Body text of the service pages: hyphenate only long compounds (≥10
// letters, 4 kept on each side), so narrow columns do not break «werel-den»
// or «ge-beurt», and no paragraph ends on a lone word.
export const BODY =
  "text-body text-ink hyphens-auto [hyphenate-limit-chars:10_4_4] [text-wrap:pretty]";
