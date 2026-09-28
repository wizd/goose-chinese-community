import React from "react";
import Admonition from "@theme/Admonition";
import Link from "@docusaurus/Link";
import Translate, { translate } from "@docusaurus/Translate";

export const RateLimits = () => {
  return (
    <Admonition type="info" title={translate({ id: "rateLimits.title", message: "Billing" })}>
      <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer">
        Google Gemini
      </a>{" "}
      <Translate id="rateLimits.freeTier">
        offers a free tier you can get started with. Otherwise, you'll need to ensure that you have credits available in your LLM Provider account to successfully make requests.
      </Translate>
      <br />
      <br />
      <Translate id="rateLimits.body">Some providers also have rate limits on API usage, which can affect your experience. Check out our</Translate>{" "}
      <Link to="/docs/guides/handling-llm-rate-limits-with-goose">
        <Translate id="rateLimits.link">Handling Rate Limits</Translate>
      </Link>{" "}
      <Translate id="rateLimits.afterLink">guide to learn how to efficiently manage these limits while using goose.</Translate>
    </Admonition>
  );
};
