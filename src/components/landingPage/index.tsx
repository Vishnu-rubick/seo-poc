import React, { useEffect, useState } from 'react'
import { Checkbox, Tabs, TabsProps } from 'antd'; 
import { Navigate, useNavigate } from 'react-router-dom';
import Dashboard from '../Dashboard';
import IssuesDetails from '../../backlinks/issues-details/issues-details';
import PagesDetails from '../../backlinks/pages-details/pages-details';

import "./style.scss"
import AppHeader from '../app-header/app-header';

interface LandingPageProps {
    projectId: string;
}

function SubHeaderCard({ title = "Sample Text", prefix=(<></>), suffix = "", style = {} }) {
    return (
        <>
            <div className="landing-container-sub-header-card" style={{color: '#6B6A6A', fontSize: '15px', ...style}}>
                {prefix}
                <p>{title} &nbsp; {suffix} &nbsp;</p>
            </div>
        </>
    )
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
        setCurrentTab(e);
    }

  return (
    <>
        <div className="landing-container">
            <AppHeader />
            <div className="landing-container-header">
                <h1>Here is your website analysis report!</h1>
            </div>
            <div className="landing-container-content">
                <div className="landing-container-sub-header">
                    <SubHeaderCard title='www.rubick.ai' suffix=' | ' />
                    <SubHeaderCard title='Last Updated: Fri, Aug 11, 2023' suffix=' | ' />
                    <SubHeaderCard prefix={<img width='15px' height='15px' src='src/assets/common/desktop.svg' />} title='Desktop' suffix=' | ' style={{minWidth: '105px'}} />
                    <SubHeaderCard title='Crawl Limit: 1000' suffix=' | ' />
                    <SubHeaderCard title='Crawl Frequency: 15 days once'/> 
                    <SubHeaderCard prefix={<Checkbox disabled />} title='Exculde subdomains' style={{marginLeft: 'auto', minWidth: '180px'}} /> 
                </div>
                <div className="landing-container-content-sub">
                    <Tabs items={tabItems} activeKey={currentTab} onChange={handleTabChange} />
                </div>
            </div>
        </div>
    </>
  )
}

export default LandingPage;