import React from 'react';
import {
  Header,
  HeaderContainer,
  HeaderName,
  SkipToContent
} from 'carbon-components-react';
import './App.scss';
import TableContainer from './containers/TableContainer';


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
            <TableContainer />
          </div>
        )}
      />
    </div>
  );
};

export default App;