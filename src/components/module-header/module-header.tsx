import "./module-header.scss"

interface ModuleHeaderProps {
  lastUpdatedAt: String;
}

function ModuleHeader({ lastUpdatedAt }: ModuleHeaderProps) {
  return (
    <div className="seo-overview-header">
      <h1>SEO Overview</h1>
      <p>
        Last Updated:
        {lastUpdatedAt}
      </p>
    </div>
  );
}

export default ModuleHeader