export interface Issue {
  id: number;
  title: string;
  title_page: string;
  url_column: string;
  info_column: string;
  category: string;
};

export interface DashboardDataType {
  totalIssues: number;
  crawlIssues: number;
  markupIssues: number;
  techIssues: number;
  brokenIssues: number;
  pagesWithIssues: number;
  healthyPages: number;
  blockedPages: number;
  crawledPages: number;
  brokenPages: number;
  redirectedPages: number;
  issuesData: Issue[];
};
