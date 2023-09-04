import { Alert, Button, Form, Input, Select } from "antd";
import WebsiteIqIcon from "../../assets/home-module/websiteIq-icon.png";
import BacklinksIcon from "../../assets/home-module/backlinks-icon.png";
import ContenPlannerIcon from "../../assets/home-module/content-planner-icon.png";
import KeywordsIcon from "../../assets/home-module/keywords-icon.png";
import SEOMetricsIcon from "../../assets/home-module/seo-metrics-icon.png";
import TaskManagerIcon from "../../assets/home-module/task-manager-icon.png";
import AppHeader from "../../components/app-header/app-header";
import ModuleCard from "./module-card/module-card";
import "./module-details.scss";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ModuleDetails() {
  const navigate = useNavigate();

  const modules = [
    {
      id: 1,
      title: "WebsiteIQ",
      icon: WebsiteIqIcon,
      para: "Revitalize your website's performance with our comprehensive health audit tool. Uncover hidden issues, boost optimization, and achieve peak online with just a click. ",
      onClick: () => {
        axios
        .get(`${import.meta.env.VITE_API_BASE_URL}/project/config`)
        .then((configResponse: any) => {
          let config = configResponse?.data;
          let domain = config.domain;
  
          if (config?.projectId) {
            if(config?.projectId)  localStorage.setItem("projectId", config?.projectId);
            navigate("/website-iq");
          }
          else {
            axios
              .post(`${import.meta.env.VITE_API_BASE_URL}/project/setup`, {
                pageLimit: 400,
                domain: domain,
              })
              .then(() => {
  
                axios
                  .get(`${import.meta.env.VITE_API_BASE_URL}/project/config`)
                  .then((response: any) => {
                    localStorage.setItem("projectId", response?.data?.projectId);
                    navigate("/website-iq");
                  });
              })
              .catch((setUpError: any) => {
                <Alert message={setUpError} type="error" />;
              });
          }
        })
        .catch((error) => {
          console.error(error);
          <Alert message="Somthing went wrong" type="error" />;
          navigate("/");
        });
      }
    },
    {
      id: 2,
      title: "Key SEO Metrics",
      icon: SEOMetricsIcon,
      para: "Analyze, compare, and optimize key performance indicators to outperform your competition and rank higher on search engines.",
      onClick: () => {
  
      }
    },
    {
      id: 3,
      title: "Keywords",
      icon: KeywordsIcon,
      para: "Discover untapped opportunities and strategize your way to the top of search results with our keyword analysis and planning tool.",
      onClick: () => {
  
      }
    },
    {
      id: 4,
      title: "Backlinks",
      icon: BacklinksIcon,
      para: "Take your website's authority to new heights with our backlink analysis tool. Uncover valuable backlink opportunities, track competitor strategies, and craft a winning link-building plan for SEO success.",
      onClick: () => {
  
      }
    },
    {
      id: 5,
      title: "Content Planner",
      icon: ContenPlannerIcon,
      para: "Elevate your content game with our dynamic planner tool. Strategize, schedule, and create captivating content that engages your audience, boosts SEO, and drives exceptional online growth. ",
      onClick: () => {
  
      }
    },
    {
      id: 6,
      title: "Task Manager",
      icon: TaskManagerIcon,
      para: "Streamline your SEO workflow and conquer rankings with our intuitive task manager. Organize, prioritize, and execute SEO tasks seamlessly, empowering your team to achieve unparalleled online success.",
      onClick: () => {
  
      }
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
          {modules.map(({id,title,icon,para,onClick}) => (
            <ModuleCard key={id} title={title} onClick={onClick} para={para} icon={icon} />
          ))}
          
        </div>
      </div>
    </div>
  );
}

export default ModuleDetails;
