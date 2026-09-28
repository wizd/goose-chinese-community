import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

export const CHINESE_DOWNLOAD_URL = "https://goose-update.vcorp.ai/";

export function useChineseLocale(): boolean {
  const {i18n} = useDocusaurusContext();
  return i18n.currentLocale === "zh-Hans";
}

export function useDownloadHref(upstreamHref: string): string {
  const chinese = useChineseLocale();
  return chinese ? CHINESE_DOWNLOAD_URL : upstreamHref;
}
