export interface Section {
  id: string;
  type: string;
}

export interface Heading {
  title: string;
  headingType: "h1" | "h2" | "h3" | "h4" | "h5" | "default" | undefined;
}

export interface NavigationLink {
  title: string;
  slug: string;
  target: string;
}

export interface LinkGroup {
  group: string;
  links: NavigationLink[];
}

export interface Globals {
  content: {
    links?: LinkGroup[];
  };
}

export interface Header {
  content: {
    smallLogo: ImageDetails;
    largeLogo: ImageDetails;
    links: NavigationLink[];
  };
}

export interface PagedResponse<T> {
  result: T[];
  total: number;
  page: number;
  pageSize: number;
}

export interface Author {
  id: string;
  cid: string;
  content: {
    name: string;
    email: string;
    role: string;
    phone: string;
    image: ImageDetails;
  };
}

export interface ImageDetails {
  url: string;
  width: number;
  height: number;
  id: string;
}

export const ProductionSlug: string = "knowledgebase";
