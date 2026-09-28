import React, {type ComponentProps, type ReactNode} from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import {TitleFormatterProvider} from "@docusaurus/theme-common/internal";
import {CHINESE_SITE_TITLE} from "../../../utils/site-title";

type FormatterProp = ComponentProps<typeof TitleFormatterProvider>["formatter"];

type Props = {
  children: ReactNode;
};

export default function ThemeProviderTitleFormatter({
  children,
}: Props): ReactNode {
  const {i18n} = useDocusaurusContext();
  const chinese = i18n.currentLocale === "zh-Hans";

  const formatter: FormatterProp = (params) => {
    if (!chinese) {
      return params.defaultFormatter(params);
    }
    const trimmedTitle = params.title?.trim();
    if (
      !trimmedTitle ||
      trimmedTitle === params.siteTitle ||
      trimmedTitle === CHINESE_SITE_TITLE
    ) {
      return CHINESE_SITE_TITLE;
    }
    return `${trimmedTitle} ${params.titleDelimiter} ${CHINESE_SITE_TITLE}`;
  };

  return (
    <TitleFormatterProvider formatter={formatter}>
      {children}
    </TitleFormatterProvider>
  );
}
