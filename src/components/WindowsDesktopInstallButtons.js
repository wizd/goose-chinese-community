import { useDownloadHref } from "@site/src/utils/download-href";
import Link from "@docusaurus/Link";
import Translate from "@docusaurus/Translate";
import { IconDownload } from "@site/src/components/icons/download";

const WindowsDesktopInstallButtons = () => {
  const windowsHref = useDownloadHref(
    "https://github.com/aaif-goose/goose/releases/download/stable/Goose-win32-x64.zip",
  );
  return (
    <div>
      <p>
        <Translate id="install.windows.lead">
          Click one of the buttons below to download goose Desktop for Windows:
        </Translate>
      </p>
      <div className="pill-button" style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
        <Link
          className="button button--primary button--lg"
          to={windowsHref}
        >
          <IconDownload /> Windows
        </Link>
      </div>
    </div>
  );
};

export default WindowsDesktopInstallButtons;
