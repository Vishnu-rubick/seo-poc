  import axios from "axios";
// import fs from 'fs';

const SEMRUSH_API_KEY = "GET KEY FROM ENV";
const SEMRUSH_BASE_URL = "https://api.semrush.com/";

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

export interface KeyWordData {
  "Keyword": string,
  "Position": number,
  "Previous Position": number,
  "Position Difference": number,
  "Search Volume": number,
  "CPC": number,
  "Url": string,
  "Traffic (%)": number,
  "Traffic Cost (%)": number,
  "Competition": number,
  "Number of Results": number,
  "Trends": string | number,
}

export interface MergedData {
  "Keyword": string,
  "Position": number,
  "Previous Position": number,
  "Position Difference": number,
  "Search Volume": number,
  "CPC": number,
  "Url": string,
  "Traffic (%)": number,
  "Traffic Cost (%)": number,
  "Competition": number,
  "Number of Results": number,
  "Trends": string | number,
  "inTextMercato": Boolean,
  "inPepperContent": Boolean,
  "inWittyPen": Boolean,
  "textMercatoData": KeyWordData | null,
  "wittyPenData": KeyWordData | null,
  "pepperContentData": KeyWordData | null,
}

const getAllKeywords = (data: {[key: string]: MergedData}): MergedData[] => {
  let res: MergedData[] = [];

  for(let key of Object.keys(data)) {
    let obj: MergedData = data[key];

    res.push(obj);
  }

  return res;
}

const getSharedKeywords = (data: {[key: string]: MergedData}): MergedData[] => {
  let res: MergedData[] = [];

  for(let key of Object.keys(data)) {
    let obj: MergedData = data[key];

    if(obj.inTextMercato && (obj.inPepperContent || obj.inWittyPen)){
      res.push(obj);
    }
  }

  return res;
}

const getMissingKeywords = (data: {[key: string]: MergedData}): MergedData[] => {
  let res: MergedData[] = [];

  for(let key of Object.keys(data)) {
    let obj: MergedData = data[key];

    if(!obj.inTextMercato && obj.inPepperContent && obj.inWittyPen){
      res.push(obj);
    }
  }

  return res;
}

const getWeakKeywords = (data: {[key: string]: MergedData}): MergedData[] => {
  let res: MergedData[] = [];

  for(let key of Object.keys(data)) {
    let obj: MergedData = data[key];
    
    if(!obj.inTextMercato || (!obj.inPepperContent && !obj.inWittyPen))  continue;

    if(obj.inPepperContent && obj.textMercatoData?.Position !== undefined &&
      obj.pepperContentData?.Position !== undefined && obj.textMercatoData?.Position > obj.pepperContentData?.Position){
        res.push(obj)
    }
    else if(obj.inWittyPen && obj.textMercatoData?.Position !== undefined &&
      obj.wittyPenData?.Position !== undefined && obj.textMercatoData?.Position > obj.wittyPenData?.Position){
        res.push(obj)
    }
  }

  return res;
}

const getUntappedKeywords = (data: {[key: string]: MergedData}): MergedData[] => {
  let res: MergedData[] = [];

  for(let key of Object.keys(data)) {
    let obj: MergedData = data[key];

    let domainTraffic = obj?.textMercatoData?.["Traffic Cost (%)"] || 0
    let wittyPenTraffic = obj?.wittyPenData?.["Traffic Cost (%)"] || 0
    let pepperContentTraffic = obj?.pepperContentData?.["Traffic Cost (%)"] || 0

    if(wittyPenTraffic > domainTraffic || pepperContentTraffic > domainTraffic){
      res.push(obj)
    }
  }

  return res;
}

const getStrongKeywords = (data: {[key: string]: MergedData}): MergedData[] => {
  let res: MergedData[] = [];

  for(let key of Object.keys(data)) {
    let obj: MergedData = data[key];

    let domainTraffic = obj?.textMercatoData?.["Traffic Cost (%)"] || 0
    let wittyPenTraffic = obj?.wittyPenData?.["Traffic Cost (%)"] || 0
    let pepperContentTraffic = obj?.pepperContentData?.["Traffic Cost (%)"] || 0

    if(domainTraffic > wittyPenTraffic && domainTraffic > pepperContentTraffic){
      res.push(obj)
    }
  }

  return res;
}

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
  // fs.writeFile('../../data/getCampaign.json', data, (err) => {
  //   if (err) throw err;
  //   console.log('Data written to file');
  // });

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

// module.exports = {
//   runAudit,
//   getCampaign
// };

export { runAudit, getCampaign, getAllKeywords, getSharedKeywords, getMissingKeywords, getWeakKeywords, getUntappedKeywords, getStrongKeywords };