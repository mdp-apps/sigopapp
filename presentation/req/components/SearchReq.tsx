import React from "react";
import { Href } from "expo-router";

import {
  Tab,
  ThemedTabs,
} from "@/presentation/theme/components";
import { PatentReqForm } from "./PatentReqForm";
import { CodeReqForm } from './CodeReqForm';


interface SearchReqProps {
  screenLink: Href;
  searchByPatent?: boolean;
}

export const SearchReq = ({ screenLink, searchByPatent = false }: SearchReqProps) => {
  const tabs: Tab[] = [
    {
      label: "Código Req.",
      icon: "alpha-r-box",
      component: <CodeReqForm screenLink={screenLink} />,
    },
    {
      label: "Patente",
      icon: "card-bulleted",
      component: <PatentReqForm screenLink={screenLink} />,
    },
  ];

  return searchByPatent ? (
    <ThemedTabs tabs={tabs} showTextLabel />
  ) : (
    <CodeReqForm screenLink={screenLink} />
  );
};
