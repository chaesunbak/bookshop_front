import styled from "styled-components";
import React, { ReactNode, useState, ReactElement } from "react";

interface TabProps {
  title: string;
  children: ReactNode;
}

const Tab = ({ children }: TabProps) => {
  return <>{children}</>;
};

interface TabsProps {
  children: ReactNode;
}

const Tabs = ({ children }: TabsProps) => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = React.Children.toArray(children) as ReactElement<TabProps>[];
  return (
    <StyledTabs>
      <div className="tab-header">
        {tabs.map((tab, index) => (
          <button
            onClick={() => {
              setActiveTab(index);
            }}
            className={activeTab === index ? "active" : ""}
          >
            {tab.props.title}
          </button>
        ))}
      </div>
      <div className="tab-content">{tabs[activeTab].props.children}</div>
    </StyledTabs>
  );
};

const StyledTabs = styled.div`
  .tab-header {
    display: flex;
    gap: 2px;
    border-bottom: 1px solid #ddd;

    button {
      border: none;
      background: #ddd;
      cursor: pointer;
      font-size: 1.25rem;
      font-weight: bold;
      color: ${({ theme }) => theme.colors.text};
      border-radius: ${({ theme }) => theme.borderRadius.default}
        ${({ theme }) => theme.borderRadius.default} 0 0;
      padding: 12px;

      &.active {
        color: #ddd;
        background: ${({ theme }) => theme.colors.primary};
      }
    }
  }

  .tab-content {
    padding: 24px 0;
  }
`;

export { Tab, Tabs };
