import type { ReactNode } from "react";
import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import Translate, {translate} from "@docusaurus/Translate";

import styles from "./index.module.css";
import { GooseLogo } from "../components/GooseLogo";
import {CHINESE_DOWNLOAD_URL, useChineseLocale} from "../utils/download-href";
import {CHINESE_SITE_TITLE} from "../utils/site-title";

function HeroSection() {
  return (
    <header className={styles.hero}>
      <div className={styles.heroInner}>
        <div className={styles.heroBadge}>
          <Translate id="home.hero.badge">
            Open Source · Apache 2.0 · Agentic AI Foundation
          </Translate>
        </div>
        <div className={styles.heroLogo}>
          <GooseLogo />
        </div>
        <p className={styles.heroSubtitle}>
          <Translate id="home.hero.subtitle">
            Your native open source AI agent. Desktop app, CLI, and API — for code,
            workflows, and everything in between.
          </Translate>
        </p>
        <div className={styles.heroActions}>
          <Link
            className="button button--primary button--lg"
            to="docs/getting-started/installation"
          >
            <Translate id="home.hero.install">Install goose</Translate>
          </Link>
          <Link
            className={`button button--outline button--lg ${styles.secondaryButton}`}
            to="docs/quickstart"
          >
            <Translate id="home.hero.quickstart">Quickstart</Translate>
          </Link>
        </div>
        <div className={styles.heroStats}>
          <div className={styles.stat}>
            <span className={styles.statNumber}>45k+</span>
            <span className={styles.statLabel}>
              <Translate id="home.stat.stars">GitHub stars</Translate>
            </span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.stat}>
            <span className={styles.statNumber}>500+</span>
            <span className={styles.statLabel}>
              <Translate id="home.stat.contributors">Contributors</Translate>
            </span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.stat}>
            <span className={styles.statNumber}>70+</span>
            <span className={styles.statLabel}>
              <Translate id="home.stat.extensions">MCP extensions</Translate>
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}

type FeatureCardProps = {
  title: ReactNode;
  description: ReactNode;
  icon: string;
};

function FeatureCard({ title, description, icon }: FeatureCardProps) {
  return (
    <div className={styles.featureCard}>
      <div className={styles.featureIcon}>{icon}</div>
      <h3 className={styles.featureTitle}>{title}</h3>
      <div className={styles.featureDescription}>{description}</div>
    </div>
  );
}

type SmallCardProps = {
  title: ReactNode;
  description: ReactNode;
  icon: string;
};

function SmallCard({ title, description, icon }: SmallCardProps) {
  return (
    <div className={styles.smallCard}>
      <div className={styles.smallCardIcon}>{icon}</div>
      <h3 className={styles.smallCardTitle}>{title}</h3>
      <div className={styles.smallCardDescription}>{description}</div>
    </div>
  );
}

function FeaturesSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>
          <Translate id="home.features.title">What goose does</Translate>
        </h2>
        <p className={styles.sectionSubtitle}>
          <Translate id="home.features.subtitle">
            goose is a general-purpose AI agent that runs on your machine. Not
            just for code — use it for research, writing, automation, data
            analysis, or anything you need to get done.
          </Translate>
        </p>
        <div className={styles.featuresGridTop}>
          <FeatureCard
            icon="🖥️"
            title={<Translate id="home.feature.surfaces.title">Desktop app, CLI, and API</Translate>}
            description={
              <p>
                <Translate id="home.feature.surfaces.body">
                  A native desktop app for macOS, Linux, and Windows. A full CLI
                  for terminal workflows. An API to embed it anywhere. Built
                  in Rust for performance and portability.
                </Translate>
              </p>
            }
          />
          <FeatureCard
            icon="🔌"
            title={<Translate id="home.feature.extensible.title">Extensible</Translate>}
            description={
              <p>
                <Translate id="home.feature.extensible.beforeMcp">
                  Connect to 70+ extensions — databases, APIs, browsers, GitHub, Google Drive, and more — via the
                </Translate>{" "}
                <a href="https://modelcontextprotocol.io/" target="_blank" rel="noopener">
                  <Translate id="home.feature.extensible.mcp">Model Context Protocol</Translate>
                </a>{" "}
                <Translate id="home.feature.extensible.afterMcp">open standard. Add</Translate>{" "}
                <Link to="/docs/guides/context-engineering/using-skills">
                  <Translate id="home.feature.extensible.skills">skills</Translate>
                </Link>
                <Translate id="home.feature.extensible.or">, or</Translate>{" "}
                <Link to="/docs/tutorials/custom-extensions">
                  <Translate id="home.feature.extensible.build">build your own extension</Translate>
                </Link>
                .
              </p>
            }
          />
          <FeatureCard
            icon="🤖"
            title={
              <Translate id="home.feature.llm.title">Any LLM, including your subscriptions</Translate>
            }
            description={
              <p>
                <Translate id="home.feature.llm.body">
                  Works with 15+ providers — Anthropic, OpenAI, Google, Ollama, OpenRouter, Azure, Bedrock, and more. Use API keys or your existing Claude, ChatGPT, or Gemini subscriptions via
                </Translate>{" "}
                <Link to="/docs/guides/acp-providers">ACP</Link>.
              </p>
            }
          />
        </div>
        <div className={styles.featuresGridBottom}>
          <SmallCard
            icon="📋"
            title={<Translate id="home.card.recipes.title">Recipes</Translate>}
            description={
              <p>
                <Translate id="home.card.recipes.body">
                  Capture workflows as portable YAML configs. Share with your team, run in CI, include instructions, extensions, parameters, and
                </Translate>{" "}
                <Link to="/docs/guides/recipes/session-recipes">
                  <Translate id="home.card.recipes.subrecipes">subrecipes</Translate>
                </Link>
                .
              </p>
            }
          />
          <SmallCard
            icon="🧩"
            title={<Translate id="home.card.mcpApps.title">MCP Apps</Translate>}
            description={
              <p>
                <Translate id="home.card.mcpApps.body">
                  Extensions can render interactive UIs directly inside goose Desktop — buttons, forms, visualizations. A new way to build
                </Translate>{" "}
                <Link to="/docs/tutorials/building-mcp-apps">
                  <Translate id="home.card.mcpApps.link">agent-powered tools</Translate>
                </Link>
                .
              </p>
            }
          />
          <SmallCard
            icon="🔀"
            title={<Translate id="home.card.subagents.title">Subagents</Translate>}
            description={
              <p>
                <Translate id="home.card.subagents.before">Spawn independent</Translate>{" "}
                <Link to="/docs/guides/context-engineering/subagents">
                  <Translate id="home.card.subagents.link">subagents</Translate>
                </Link>{" "}
                <Translate id="home.card.subagents.after">
                  to handle tasks in parallel — code review, research, file processing — keeping the main conversation clean.
                </Translate>
              </p>
            }
          />
          <SmallCard
            icon="🔒"
            title={<Translate id="home.card.security.title">Security</Translate>}
            description={
              <p>
                <Translate id="home.card.security.before">
                  Prompt injection detection, tool permission controls, sandbox mode, and an
                </Translate>{" "}
                <Link to="/docs/guides/security/adversary-mode">
                  <Translate id="home.card.security.link">adversary reviewer</Translate>
                </Link>{" "}
                <Translate id="home.card.security.after">that watches for unsafe actions.</Translate>
              </p>
            }
          />
        </div>
      </div>
    </section>
  );
}

function StandardsSection() {
  return (
    <section className={`${styles.section} ${styles.sectionAlt}`}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>
          <Translate id="home.standards.title">Built on open standards</Translate>
        </h2>
        <div className={styles.standardsGrid}>
          <div className={styles.standardCard}>
            <h3>
              <Translate id="home.standards.mcp.title">Model Context Protocol</Translate>
            </h3>
            <p>
              <a href="https://modelcontextprotocol.io/" target="_blank" rel="noopener">MCP</a>{" "}
              <Translate id="home.standards.mcp.body">
                is the open standard for connecting AI agents to tools and data sources. goose was one of the earliest adopters and has one of the deepest integrations in the ecosystem — with 70+ documented extensions and growing.
              </Translate>
            </p>
            <Link to="/docs/category/mcp-servers">
              <Translate id="home.standards.mcp.link">Browse MCP extensions →</Translate>
            </Link>
          </div>
          <div className={styles.standardCard}>
            <h3>
              <Translate id="home.standards.acp.title">Agent Client Protocol</Translate>
            </h3>
            <p>
              <a href="https://agentclientprotocol.com/" target="_blank" rel="noopener">ACP</a>{" "}
              <Translate id="home.standards.acp.body">
                is a standard for communicating with coding agents. goose works as an ACP server — connect from Zed, JetBrains, or VS Code — and can use ACP agents like Claude Code and Codex as providers.
              </Translate>
            </p>
            <Link to="/docs/gdk/acp">
              <Translate id="home.standards.acp.link">goose as ACP server →</Translate>
            </Link>
          </div>
          <div className={styles.standardCard}>
            <h3>
              <Translate id="home.standards.aaif.title">Agentic AI Foundation</Translate>
            </h3>
            <p>
              <Translate id="home.standards.aaif.before">goose is part of the</Translate>{" "}
              <a href="https://aaif.io/" target="_blank" rel="noopener">
                <Translate id="home.standards.aaif.name">Agentic AI Foundation</Translate>
              </a>{" "}
              <Translate id="home.standards.aaif.after">
                at the Linux Foundation — ensuring the project remains vendor-neutral, community-governed, and open for the long term.
              </Translate>
            </p>
            <a href="https://aaif.io/" target="_blank" rel="noopener">
              <Translate id="home.standards.aaif.link">Learn about AAIF →</Translate>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function CommunitySection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>
          <Translate id="home.community.title">Community</Translate>
        </h2>
        <p className={styles.sectionSubtitle}>
          <Translate id="home.community.subtitle">
            An active community of developers, contributors, and users building extensions, sharing recipes, and pushing the boundaries of what local AI agents can do.
          </Translate>
        </p>
        <div className={styles.communityGrid}>
          <a
            href="https://discord.gg/n8R5VaWDAn"
            target="_blank"
            rel="noopener"
            className={styles.communityCard}
          >
            <h3>💬 Discord</h3>
            <p>
              <Translate id="home.community.discord">
                Ask questions, share what you've built, get help from the community.
              </Translate>
            </p>
          </a>
          <a
            href="https://github.com/aaif-goose/goose"
            target="_blank"
            rel="noopener"
            className={styles.communityCard}
          >
            <h3>🐙 GitHub</h3>
            <p>
              <Translate id="home.community.github">
                Star, fork, file issues, contribute code. goose is built in the open.
              </Translate>
            </p>
          </a>
          <Link to="/extensions" className={styles.communityCard}>
            <h3>
              🧩 <Translate id="home.community.extensions.title">Extensions</Translate>
            </h3>
            <p>
              <Translate id="home.community.extensions.body">
                Browse community-built MCP extensions and add your own.
              </Translate>
            </p>
          </Link>
          <Link to="/blog" className={styles.communityCard}>
            <h3>
              📝 <Translate id="home.community.blog.title">Blog</Translate>
            </h3>
            <p>
              <Translate id="home.community.blog.body">
                Tutorials, deep dives, release notes, and community spotlights.
              </Translate>
            </p>
          </Link>
        </div>
      </div>
    </section>
  );
}

function InstallSection() {
  const chinese = useChineseLocale();
  return (
    <section className={`${styles.section} ${styles.sectionAlt}`}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>
          <Translate id="home.install.title">Get started</Translate>
        </h2>
        <div className={styles.installBlock}>
          <div className={styles.installDesktop}>
            <Link
              className="button button--primary button--lg"
              to={chinese ? CHINESE_DOWNLOAD_URL : "docs/getting-started/installation"}
            >
              <Translate id="home.install.desktop">Download the desktop app</Translate>
            </Link>
            <p className={styles.installPlatforms}>
              <Translate id="home.install.platforms">
                Available for macOS, Linux, and Windows
              </Translate>
            </p>
          </div>
          <div className={styles.installDivider}>
            <span>
              <Translate id="home.install.orCli">or install the CLI</Translate>
            </span>
          </div>
          <div className={styles.installTerminal}>
            <div className={styles.terminalBar}>
              <span className={styles.terminalDot} />
              <span className={styles.terminalDot} />
              <span className={styles.terminalDot} />
            </div>
            <pre className={styles.terminalBody}>
              <code>
                {chinese
                  ? CHINESE_DOWNLOAD_URL
                  : "curl -fsSL https://github.com/aaif-goose/goose/releases/download/stable/download_cli.sh | bash"}
              </code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}

function VideoSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>
          <Translate id="home.video.title">See goose in action</Translate>
        </h2>
        <div className={styles.videoWrapper}>
          <iframe
            src="https://www.youtube.com/embed/D-DpDunrbpo"
            className={styles.video}
            title="vibe coding with goose"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const chinese = useChineseLocale();
  return (
    <Layout
      title={chinese ? CHINESE_SITE_TITLE : undefined}
      description={translate({
        id: "home.meta.description",
        message:
          "Your native open source AI agent. Desktop app, CLI, and API — for code, workflows, and everything in between.",
      })}
    >
      <HeroSection />
      <main>
        <FeaturesSection />
        <StandardsSection />
        <CommunitySection />
        <InstallSection />
        <VideoSection />
      </main>
    </Layout>
  );
}
