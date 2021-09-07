import React from 'react';
import {
  HeaderContainer,
  Header,
  HeaderName,
  HeaderGlobalBar,
  HeaderGlobalAction,
  HeaderPanel,
  Switcher,
  SwitcherItem,
  SwitcherDivider
} from 'carbon-components-react';

import { Switcher20, Close20 } from '@carbon/icons-react';

const HeaderSideNav = () => {

  return (
    <HeaderContainer
      render={({ isSideNavExpanded, onClickSideNavExpand }) => (
        <>
          <Header aria-label="JSON Data Table Display App" className="landing-page__heading">
            <HeaderName href="/" prefix="IBM">
              JSON Data Table Display
            </HeaderName>
            <HeaderGlobalBar>
              <HeaderGlobalAction
                aria-label="Route Switcher"
                isActive
                onClick={() => onClickSideNavExpand()}
                tooltipAlignment="end">
                {isSideNavExpanded ? <Close20 /> : <Switcher20 />}
              </HeaderGlobalAction>
            </HeaderGlobalBar>
            {isSideNavExpanded ?
              <HeaderPanel aria-label="Header Panel" expanded>
                <Switcher aria-label="Switcher Container">
                  <SwitcherItem onClick={() => onClickSideNavExpand()} aria-label="Landing" href="/">
                    Landing
                  </SwitcherItem>
                  <SwitcherDivider />
                  <SwitcherItem onClick={() => onClickSideNavExpand()} aria-label="Data Table Display" href="/data-table">
                    Data Table Display
                  </SwitcherItem>
                  <SwitcherDivider />
                </Switcher>
              </HeaderPanel> : null}
          </Header>
        </>
      )}
    />
  );
}

export default HeaderSideNav