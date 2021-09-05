import React from 'react';
import {
  Content,
  Header,
  HeaderContainer,
  HeaderName,
  SkipToContent
} from 'carbon-components-react';
import './App.scss';
import DisplayTable from './components/DisplayTable/DisplayTable';

const App = () => {
  return (
    <div>
      <HeaderContainer
        render={() => (
          <div className="bx--grid bx--grid--full-width landing-page">
            <Header aria-label="React Skeleton App" className="landing-page__heading">
              <SkipToContent />
              <HeaderName href="/" prefix="IBM">
                React Skeleton App
              </HeaderName>
            </Header>
            <Content id="main-content">
              <DisplayTable />
            </Content>
          </div>
        )}
      />
    </div>
  );
};

export default App;