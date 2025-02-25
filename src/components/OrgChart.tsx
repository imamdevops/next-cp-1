"use client";

import React from "react";
import OrganizationChart from "@dabeng/react-orgchart";
import "./OrganizationChart.css";

const OrgChartComponent = () => {
  // Define the organizational structure with vertical hierarchy
  const orgData = {
    id: "shareholders",
    name: "General Meeting of Shareholders",
    title: "SHAREHOLDERS",
    children: [
      {
        id: "board-of-commissioners",
        name: "BOARD OF COMMISSIONERS",
        children: [
          {
            id: "commissioners-group",
            name: "",
            className: "invisible-node",
            children: [
              {
                id: "agus",
                name: "Agus Soetopo",
                title: "INDEPENDENT COMMISSIONER",
                className: "commissioner-node",
              },
              {
                id: "judiono",
                name: "Judiono Tosin",
                title: "PRESIDENT COMMISSIONER",
                className: "commissioner-node",
                children: [
                  {
                    id: "audit-committee",
                    name: "AUDIT COMMITTEE",
                    children: [
                      {
                        id: "committee-members",
                        name: "",
                        className: "invisible-node",
                        children: [
                          {
                            id: "endang-chair",
                            name: "Endang Kosasih",
                            title: "CHAIRPERSON",
                            className: "committee-node",
                          },
                          {
                            id: "joky",
                            name: "Joky Halimsaputra",
                            title: "MEMBER",
                            className: "committee-node",
                            children: [
                              {
                                id: "board-of-directors",
                                name: "BOARD OF DIRECTORS",
                                children: [
                                  {
                                    id: "directors-group",
                                    name: "",
                                    className: "invisible-node",
                                    children: [
                                      {
                                        id: "david",
                                        name: "David Jahja",
                                        title: "VICE PRESIDENT DIRECTOR",
                                        className: "director-node",
                                      },
                                      {
                                        id: "bambang",
                                        name: "Bambang Setiyono",
                                        title: "PRESIDENT DIRECTOR",
                                        className: "director-node",
                                      },
                                      {
                                        id: "yati",
                                        name: "Yati Nurhayati",
                                        title: "DIRECTOR",
                                        className: "director-node",
                                      },
                                    ],
                                  },
                                ],
                              },
                            ],
                          },
                          {
                            id: "airyn",
                            name: "Airyn Linanda",
                            title: "MEMBER",
                            className: "committee-node",
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                id: "endang-commissioner",
                name: "Endang Kosasih",
                title: "INDEPENDENT COMMISSIONER",
                className: "commissioner-node",
              },
            ],
          },
        ],
      },

      {
        id: "divisions-level",
        name: "",
        className: "invisible-node",
        children: [
          {
            id: "division-row-1",
            name: "",
            className: "invisible-node",
            children: [
              {
                id: "internal-audit",
                name: "Internal Audit",
                className: "division-node",
              },
              {
                id: "secretary",
                name: "Moch Al Hadi",
                title: "CORPORATE SECRETARY",
                className: "division-node",
              },
            ],
          },
          {
            id: "division-row-2",
            name: "",
            className: "invisible-node",
            children: [
              {
                id: "ppic",
                name: "Heo Yoo",
                title: "PPIC DIVISION",
                className: "division-node",
              },
              {
                id: "finance",
                name: "Tonny R. Armandaris",
                title: "FINANCE & ACCOUNTING DIVISION",
                className: "division-node",
              },
            ],
          },
          {
            id: "division-row-3",
            name: "",
            className: "invisible-node",
            children: [
              {
                id: "production",
                name: "Turgimanan",
                title: "PRODUCTION DIVISION",
                className: "division-node",
              },
              {
                id: "development",
                name: "Edy Kusnanto",
                title: "DEVELOPMENT & DESIGN DIVISION",
                className: "division-node",
              },
            ],
          },
          {
            id: "division-row-4",
            name: "",
            className: "invisible-node",
            children: [
              {
                id: "marketing",
                name: "Evone Susan",
                title: "MARKETING DIVISION",
                className: "division-node",
              },
              {
                id: "hrd",
                name: "HRD & GA Division",
                className: "division-node",
              },
            ],
          },
        ],
      },
    ],
  };

  return (
    <div className="org-chart-container">
      <OrganizationChart
        datasource={orgData}
        chartClass="myChart"
        // direction="t2b" // top to bottom direction
        NodeTemplate={({ nodeData }) => (
          <div className={`node ${nodeData.className || ""}`}>
            {nodeData.name && <div className="name">{nodeData.name}</div>}
            {nodeData.title && <div className="title">{nodeData.title}</div>}
          </div>
        )}
      />
    </div>
  );
};

export default OrgChartComponent;
