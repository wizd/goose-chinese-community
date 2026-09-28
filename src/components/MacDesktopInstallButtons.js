import { useDownloadHref } from "@site/src/utils/download-href";
import Link from "@docusaurus/Link";
import Translate from "@docusaurus/Translate";
import { IconDownload } from "@site/src/components/icons/download";

const DesktopInstallButtons = () => {
  const siliconHref = useDownloadHref(
    "https://github.com/aaif-goose/goose/releases/download/stable/Goose.zip",
  );
  const intelHref = useDownloadHref(
    "https://github.com/aaif-goose/goose/releases/download/stable/Goose_intel_mac.zip",
  );
  return (
    <div>
      <p>
        <Translate id="install.mac.lead">
          Click one of the buttons below to download goose Desktop for macOS:
        </Translate>
      </p>
      <div className="pill-button" style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <Link
          className="button button--primary button--lg"
          to={siliconHref}
        >
          <IconDownload /> macOS Silicon
        </Link>
        <Link
          className="button button--primary button--lg"
          to={intelHref}
        >
          <IconDownload /> macOS Intel
        </Link>
      </div>
    </div>
  );
};

export default DesktopInstallButtons;
