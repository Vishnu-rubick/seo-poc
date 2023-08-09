import React, { useEffect, useState } from 'react'
import { Tabs, TabsProps } from 'antd'; 
import { Navigate, useNavigate } from 'react-router-dom';
import Dashboard from '../Dashboard';
import IssuesDetails from '../../backlinks/issues-details/issues-details';
import PagesDetails from '../../backlinks/pages-details/pages-details';

import "./style.scss"

interface LandingPageProps {
    projectId: string;
}

function LandingPage({projectId}: LandingPageProps) {

    const [currentTab, setCurrentTab] = useState<string>("overview");
    const Navigate = useNavigate();

    const tabItems: TabsProps["items"] = [
        {
            key: "overview",
            label: `Overview`,
            children:(<Dashboard projectId={projectId} />)
        },
        {
            key: "Issues",
            label: `Issues`,
            children:(<IssuesDetails projectId={projectId} />)
        },
        {
            key: "audited-pages",
            label: `Audited Pages`,
            children:(<PagesDetails projectId={projectId} />)
        },
    ]

    const handleTabChange = (e: any) => {
        console.log("HOY: ", e)
        setCurrentTab(e);
    }

  return (
    <>
        <div className="landing-container">
            <div className="landing-container-header">
                <h1>Here is your website analysis report!</h1>
            </div>
            <div className="landing-container-content">
                <Tabs items={tabItems} activeKey={currentTab} onChange={handleTabChange} />
            </div>
        </div>
    </>
  )
}

export default LandingPage;