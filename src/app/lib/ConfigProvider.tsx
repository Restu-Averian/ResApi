"use client";

import {
  ConfigProvider as ConfigProviderAntd,
  ConfigProviderProps,
  theme,
} from "antd";

const ConfigProvider = ({ ...props }: ConfigProviderProps) => {
  return (
    <ConfigProviderAntd
      theme={{
        // algorithm: theme?.darkAlgorithm,
        algorithm: theme?.defaultAlgorithm,
        token: {
          colorPrimary: "#69a4fe",
          fontSize: 20,
        },
      }}
    >
      {props?.children}
    </ConfigProviderAntd>
  );
};
export default ConfigProvider;
