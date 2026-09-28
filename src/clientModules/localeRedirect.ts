import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";

const STORAGE_KEY = "goose-locale";
const EXPLICIT_KEY = "goose-locale-explicit";
const LOCALE_PREFIX = "/zh-Hans";

type Locale = "en" | "zh-Hans";

function localeFromPath(pathname: string): Locale {
  return pathname === LOCALE_PREFIX || pathname.startsWith(`${LOCALE_PREFIX}/`)
    ? "zh-Hans"
    : "en";
}

function baseUrl(): string {
  const href = document.querySelector("base")?.getAttribute("href") || "/";
  if (href === "/") {
    return "";
  }
  return href.replace(/\/$/, "");
}

function pathForLocale(pathname: string, target: Locale): string {
  const base = baseUrl();
  let path = pathname;
  if (base && (path === base || path.startsWith(`${base}/`))) {
    path = path.slice(base.length) || "/";
  }
  if (path === LOCALE_PREFIX || path.startsWith(`${LOCALE_PREFIX}/`)) {
    path = path.slice(LOCALE_PREFIX.length) || "/";
  }
  if (!path.startsWith("/")) {
    path = `/${path}`;
  }
  const localized = target === "zh-Hans" ? `${LOCALE_PREFIX}${path === "/" ? "/" : path}` : path;
  return `${base}${localized}`;
}

if (ExecutionEnvironment.canUseDOM && process.env.NODE_ENV === "production") {
  const current = localeFromPath(window.location.pathname);

  document.addEventListener(
    "click",
    (event) => {
      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }
      const anchor = target.closest("a[lang], a[hreflang]");
      if (!anchor) {
        return;
      }
      const lang = anchor.getAttribute("lang") || anchor.getAttribute("hreflang");
      if (lang !== "en" && lang !== "zh-Hans") {
        return;
      }
      localStorage.setItem(STORAGE_KEY, lang);
      sessionStorage.setItem(EXPLICIT_KEY, lang);
    },
    true,
  );

  const explicit = sessionStorage.getItem(EXPLICIT_KEY);
  if (explicit === "en" || explicit === "zh-Hans") {
    sessionStorage.removeItem(EXPLICIT_KEY);
    localStorage.setItem(STORAGE_KEY, explicit);
  } else {
    const stored = localStorage.getItem(STORAGE_KEY);
    const preferred: Locale =
      stored === "en" || stored === "zh-Hans"
        ? stored
        : (navigator.language || "").toLowerCase().startsWith("zh")
          ? "zh-Hans"
          : "en";
    if (stored !== preferred) {
      localStorage.setItem(STORAGE_KEY, preferred);
    }
    if (preferred !== current) {
      const next = pathForLocale(window.location.pathname, preferred);
      window.location.replace(`${next}${window.location.search}${window.location.hash}`);
    }
  }
}
