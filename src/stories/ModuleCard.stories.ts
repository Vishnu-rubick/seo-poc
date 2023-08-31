import type { Meta, StoryObj } from "@storybook/react";
import WebsiteIqIcon from "../assets/home-module/websiteIq-icon.png";
import KeywordsIcon from "../assets/home-module/keywords-icon.png";
import SEOMetricsIcon from "../assets/home-module/seo-metrics-icon.png";
import BacklinksIcon from "../assets/home-module/backlinks-icon.png";

import ModuleCard from "./ModuleCard";

const meta = {
  title: "Example/ModuleCard",
  component: ModuleCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ModuleCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WebsiteIQCard: Story = {
  args: {
    title: "WebsiteIQ",
    icon: WebsiteIqIcon,
    para: "Revitalize your website's performance with our comprehensive health audit tool. Uncover hidden issues, boost optimization, and achieve peak online with just a click. ",
    linkTo: "/website-iq",
  },
};


export const KeywordsCard: Story = {
  args: {
    title: "Keywords",
    icon: KeywordsIcon,
    para: "Discover untapped opportunities and strategize your way to the top of search results with our keyword analysis and planning tool.",
    linkTo: "",
  },
};
export const SEOMetricsCard: Story = {
  args: {
    title: "Key SEO Metrics",
    icon: SEOMetricsIcon,
    para: "Analyze, compare, and optimize key performance indicators to outperform your competition and rank higher on search engines.",
    linkTo: "",
  },
};
export const BacklinksCard: Story = {
  args: {
    title: "Backlinks",
    icon: BacklinksIcon,
    para: "Take your website's authority to new heights with our backlink analysis tool. Uncover valuable backlink opportunities, track competitor strategies, and craft a winning link-building plan for SEO success.",
    linkTo: "",
  },
};
