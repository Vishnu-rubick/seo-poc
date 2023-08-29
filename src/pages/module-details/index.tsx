import WebsiteIqIcon from "../../assets/home-module/websiteIq-icon.png";
import BacklinksIcon from "../../assets/home-module/backlinks-icon.png";
import ContenPlannerIcon from "../../assets/home-module/content-planner-icon.png";
import KeywordsIcon from "../../assets/home-module/keywords-icon.png";
import SEOMetricsIcon from "../../assets/home-module/seo-metrics-icon.png";
import TaskManagerIcon from "../../assets/home-module/task-manager-icon.png";
import AppHeader from "../../components/app-header/app-header";
import ModuleCard from "./module-card/module-card";
import "./module-details.scss";

function ModuleDetails() {
  const modules = [
    {
      id: 1,
      title: "WebsiteIQ",
      icon: WebsiteIqIcon,
      para: "Revitalize your website's performance with our comprehensive health audit tool. Uncover hidden issues, boost optimization, and achieve peak online with just a click. ",
      linkTo: "/website-iq",
    },
    {
      id: 2,
      title: "Key SEO Metrics",
      icon: SEOMetricsIcon,
      para: "Analyze, compare, and optimize key performance indicators to outperform your competition and rank higher on search engines.",
      linkTo: "",
    },
    {
      id: 3,
      title: "Keywords",
      icon: KeywordsIcon,
      para: "Discover untapped opportunities and strategize your way to the top of search results with our keyword analysis and planning tool.",
      linkTo: "",
    },
    {
      id: 4,
      title: "Backlinks",
      icon: BacklinksIcon,
      para: "Take your website's authority to new heights with our backlink analysis tool. Uncover valuable backlink opportunities, track competitor strategies, and craft a winning link-building plan for SEO success.",
      linkTo: "",
    },
    {
      id: 5,
      title: "Content Planner",
      icon: ContenPlannerIcon,
      para: "Elevate your content game with our dynamic planner tool. Strategize, schedule, and create captivating content that engages your audience, boosts SEO, and drives exceptional online growth. ",
      linkTo: "",
    },
    {
      id: 6,
      title: "Task Manager",
      icon: TaskManagerIcon,
      para: "Streamline your SEO workflow and conquer rankings with our intuitive task manager. Organize, prioritize, and execute SEO tasks seamlessly, empowering your team to achieve unparalleled online success.",
      linkTo: "",
    },
  ];
  return (
    <div className="module-details-wrapper">
      <AppHeader />
      <div className="module-details-container">
        <div className="module-details-content">
          <h1>All things SEO </h1>
          <p>
            Harness the power of advanced analytics and data-driven insights to
            supercharge your website's visibility and organic traffic. Stay
            ahead in the race with real-time keyword tracking, competitor
            analysis, and smart recommendations tailored to your website's
            unique needs.
          </p>
        </div>
        <div className="cards-container">
          {modules.map(({id,title,icon,para,linkTo}) => (
            <ModuleCard key={id} title={title} linkTo={linkTo} para={para} icon={icon} />
          ))}
          
        </div>
      </div>
    </div>
  );
}

export default ModuleDetails;
