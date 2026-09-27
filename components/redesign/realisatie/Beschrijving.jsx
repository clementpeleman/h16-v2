import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import { company } from "../../../data/companyData";

const link =
  "text-primary underline decoration-1 underline-offset-4 hover:decoration-2 focus-ring";

// The CMS prose, set in the redesign's roles through react-markdown's
// `components` rather than the old #markdown rules in globals.css (those add
// bottom margins and a sans heading). Spacing is a top margin on the later
// element only. Headings typed in Strapi sit under the page's h2 «Over het
// project», so they are demoted to h3/h4 to keep the outline.
const drop = (Tag, className) => {
  function Element({ node, ...props }) {
    return <Tag {...props} className={className} />;
  }
  Element.displayName = `Md${Tag}`;
  return Element;
};

const COMPONENTS = {
  h1: drop(
    "h3",
    "mt-10 font-display text-h3 font-normal text-primary first:mt-0",
  ),
  h2: drop(
    "h3",
    "mt-10 font-display text-h3 font-normal text-primary first:mt-0",
  ),
  h3: drop("h4", "mt-8 text-ui text-ink first:mt-0"),
  h4: drop("h4", "mt-8 text-ui text-ink first:mt-0"),
  h5: drop("h4", "mt-8 text-ui text-ink first:mt-0"),
  h6: drop("h4", "mt-8 text-ui text-ink first:mt-0"),
  p: drop("p", "mt-4 first:mt-0"),
  ul: drop("ul", "mt-4 list-disc pl-5 first:mt-0"),
  ol: drop("ol", "mt-4 list-decimal pl-5 first:mt-0"),
  li: drop("li", "mt-1 first:mt-0"),
  strong: drop("strong", "font-strong text-ink"),
  blockquote: drop("blockquote", "mt-4 border-l border-rule pl-4 first:mt-0"),
  hr: drop("hr", "mt-8 border-rule"),
  a: drop("a", link),
};

export default function Beschrijving({ text, className = "" }) {
  return (
    <div
      className={`max-w-[62ch] text-body text-ink hyphens-auto ${className}`}
    >
      {text ? (
        <Markdown
          remarkPlugins={[remarkGfm, remarkBreaks]}
          components={COMPONENTS}
        >
          {text}
        </Markdown>
      ) : (
        <p>
          De beschrijving van dit project volgt binnenkort. Wilt u er nu al meer
          over weten?{" "}
          <a href={company.phoneHref} className={link}>
            Bel ons op {company.phone}
          </a>
          .
        </p>
      )}
    </div>
  );
}
