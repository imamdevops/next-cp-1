declare module "@dabeng/react-orgchart" {
  import { ComponentType, ReactNode } from "react";

  interface OrgChartProps {
    datasource: {
      id: string;
      name: string;
      title?: string;
      className?: string;
      children?: Array<any>;
      [key: string]: any;
    };
    pan?: boolean;
    zoom?: boolean;
    zoominLimit?: number;
    zoomoutLimit?: number;
    containerClass?: string;
    chartClass?: string;
    NodeTemplate?: ComponentType<any>;
    draggable?: boolean;
    collapsible?: boolean;
    multipleSelect?: boolean;
    onClickNode?: (node: any) => void;
    onClickChart?: () => void;
  }

  const OrgChart: ComponentType<OrgChartProps>;
  export default OrgChart;
}
