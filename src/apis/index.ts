import axios from "axios";
import fs from 'fs';

const SEMRUSH_API_KEY =
  process.env.SEMRUSH_API_KEY || "GET KEY FROM ENV";
const SEMRUSH_BASE_URL =
  process.env.SEMRUSH_BASE_URL || "https://api.semrush.com/";

export interface CampaignConfig {
  domain?: String;
  scheduleDay?: Number;
  notify?: Boolean;
  allow?: String[];
  disallow?: String[];
  pageLimit?: Number;
  userAgentType?: Number;
  removedParameters?: String[];
  crawlSubdomains?: Boolean;
  respectCrawlDelay?: Boolean;
}

console.log("API FILE READ");

const runAudit = async (projectId: String) => {
  const baseUrl =
    SEMRUSH_BASE_URL +
    `reports/v1/projects/${projectId}/siteaudit/launch?key=${SEMRUSH_API_KEY}`;

  const response = await axios.post(baseUrl);
  return response.data;
};

const getCampaign = async (projectId: String) => {
  const baseUrl =
    SEMRUSH_BASE_URL +
    `reports/v1/projects/${projectId}/siteaudit/info?key=${SEMRUSH_API_KEY}`;

  const response = await axios.get(baseUrl);

  const data = JSON.stringify(response.data);
  fs.writeFile('../../data/getCampaign.json', data, (err) => {
    if (err) throw err;
    console.log('Data written to file');
  });

  return response.data;
};

const getDetailedIssue = async (
  projectId: String,
  snapshotId: String,
  issueId: String
) => {
  const baseUrl =
    SEMRUSH_BASE_URL +
    `https://api.semrush.com/reports/v1/projects/${projectId}/siteaudit/snapshot/${snapshotId}/issue/${issueId}?key=${SEMRUSH_API_KEY}`;
  return null;
  // const response = await axios.get()
};

module.exports = {
  runAudit,
  getCampaign
};
