import React from "react";
import Translate from "@docusaurus/Translate";

export const OnboardingProviderSetup = () => {
  return (
    <>
      <ul>
        <li>
          <strong>
            <Translate id="onboarding.quickSetup.label">Quick Setup with API Key</Translate>
          </strong>
          {" — "}
          <Translate id="onboarding.quickSetup.body">
            goose will automatically configure your provider based on your API key
          </Translate>
        </li>
        <li>
          <strong>
            <a href="https://chatgpt.com/codex">ChatGPT Subscription</a>
          </strong>
          {" — "}
          <Translate id="onboarding.chatgpt.body">
            Sign in with your ChatGPT Plus/Pro credentials to access GPT-5 Codex models
          </Translate>
        </li>
        <li>
          <strong>
            <a href="https://tetrate.io/products/tetrate-agent-router-service">Agent Router by Tetrate</a>
          </strong>
          {" — "}
          <Translate id="onboarding.tetrate.body">
            Access multiple AI models with automatic setup
          </Translate>
        </li>
        <li>
          <strong>
            <a href="https://openrouter.ai/">OpenRouter</a>
          </strong>
          {" — "}
          <Translate id="onboarding.openrouter.body">
            Access 200+ models with one API using pay-per-use pricing
          </Translate>
        </li>
        <li>
          <strong>
            <Translate id="onboarding.other.label">Other Providers</Translate>
          </strong>
          {" — "}
          <Translate id="onboarding.other.body">
            Manually configure additional providers through settings
          </Translate>
        </li>
      </ul>
    </>
  );
};
