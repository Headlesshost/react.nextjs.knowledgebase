import React from "react";
import TextBlockWithHeader from "./sections/textBlockWithHeader";
import InfoBox from "./sections/infoBox";
import CodeDisplay from "./sections/codeDisplay";
import ActionBox from "./sections/actionBox";
import NavLink from "./sections/navLink";
import CmsImage from "./sections/cmsImage";
import Video from "./sections/video";
import PageHeader from "./sections/pageHeader";
import TextBlock from "./sections/textBlock";
import OrderedList from "./sections/orderedList";
import AuthorTable from "./sections/authorTable";
import StandardHeading from "./sections/standardHeading";
import ContactForm from "./sections/contactForm";

interface SectionProps {
  section: any;
  instanceId: string;
}

const sections: { [key: string]: React.FC<any> } = {
  PAGE_HEADER: PageHeader,
  CODE_BLOCK: CodeDisplay,
  TEXT_BLOCK_WITH_HEADER: TextBlockWithHeader,
  TEXT_BLOCK: TextBlock,
  INFO_BOX: InfoBox,
  ACTION_BOX: ActionBox,
  NAV_LINK: NavLink,
  IMAGE: CmsImage,
  VIDEO: Video,
  ORDERED_LIST: OrderedList,
  AUTHOR_TABLE: AuthorTable,
  STANDARD_HEADING: StandardHeading,
  CONTACT_FORM: ContactForm,
};

const Section: React.FC<SectionProps> = ({ section, instanceId }) => {
  const SectionComponent = sections[section.type];

  if (!SectionComponent) {
    return null;
  }

  return <SectionComponent section={section} instanceId={instanceId} siteId={process.env.HEADLESSHOST_SITEID} />;
};

export default Section;
