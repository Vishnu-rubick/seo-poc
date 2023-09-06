import "./module-header.scss"

interface ModuleHeaderProps {
  lastUpdatedAt: String;
  title?: String;
}

function ModuleHeader({ lastUpdatedAt, title='SEO Overview' }: ModuleHeaderProps) {
  return (
    <div className="seo-overview-header">
      <h1>{title}</h1>
      <p>
        Last Updated:
        {lastUpdatedAt}
      </p>
    </div>
  );
}

export default ModuleHeader