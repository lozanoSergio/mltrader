/* eslint-disable react/no-string-refs */
/*!

=========================================================
* Black Dashboard React v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Location } from 'history';
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from 'perfect-scrollbar';

// core components
import AdminNavbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import Sidebar from '../components/Sidebar/Sidebar';
// import FixedPlugin from 'components/FixedPlugin/FixedPlugin.js';

import routes from '../constants/Routes';

import logo from '../assets/img/react-logo.png';

type Props = Record<string, any>;

interface State {
  backgroundColor: string;
  sidebarOpened: boolean;
}

let ps: PerfectScrollbar;

class DashboardPage extends React.Component<Props, State> {
  mainPanel = React.createRef<HTMLDivElement>();

  constructor(props: Props) {
    super(props);

    console.log(props);

    this.state = {
      backgroundColor: 'blue',
      sidebarOpened:
        document.documentElement.className.indexOf('nav-open') !== -1,
    };
  }

  componentDidMount() {
    if (navigator.platform.indexOf('Win') > -1) {
      document.documentElement.className += ' perfect-scrollbar-on';
      document.documentElement.classList.remove('perfect-scrollbar-off');
      const mainPanel = this.mainPanel.current;
      if (mainPanel) {
        ps = new PerfectScrollbar(mainPanel, {
          suppressScrollX: true,
        });
        const tables = document.querySelectorAll('.table-responsive');
        for (let i = 0; i < tables.length; i += 1) {
          ps = new PerfectScrollbar(tables[i]);
        }
      }
    }
  }

  componentDidUpdate(e: any) {
    if (e.history.action === 'PUSH') {
      if (navigator.platform.indexOf('Win') > -1) {
        const tables = document.querySelectorAll('.table-responsive');
        for (let i = 0; i < tables.length; i += 1) {
          ps = new PerfectScrollbar(tables[i]);
        }
      }

      const perfectScroll = document.scrollingElement;
      const panel = this.mainPanel.current;

      if (perfectScroll && panel) {
        document.documentElement.scrollTop = 0;
        perfectScroll.scrollTop = 0;
        panel.scrollTop = 0;
      }
    }
  }

  componentWillUnmount() {
    if (navigator.platform.indexOf('Win') > -1) {
      ps.destroy();
      document.documentElement.className += ' perfect-scrollbar-off';
      document.documentElement.classList.remove('perfect-scrollbar-on');
    }
  }

  // this function opens and closes the sidebar on small devices
  toggleSidebar = () => {
    document.documentElement.classList.toggle('nav-open');
    this.setState((prevState) => ({ sidebarOpened: !prevState.sidebarOpened }));
  };

  getRoutes = () => {
    return routes.map((prop) => {
      if (prop.layout === '/dashboard') {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={prop.key}
          />
        );
      }
      return null;
    });
  };

  handleBgClick = (color: string) => {
    this.setState({ backgroundColor: color });
  };

  getBrandText = (location: Location) => {
    for (let i = 0; i < routes.length; i += 1) {
      if (location.pathname.indexOf(routes[i].layout + routes[i].path) !== -1) {
        return routes[i].name;
      }
    }
    return 'Brand';
  };

  render() {
    const { location } = this.props;
    const { backgroundColor, sidebarOpened } = this.state;

    return (
      <>
        <div className="wrapper">
          <Sidebar
            location={location}
            routes={routes}
            bgColor={backgroundColor}
            logo={{
              outterLink: 'https://www.creative-tim.com/',
              text: 'Creative Tim',
              imgSrc: logo,
            }}
            toggleSidebar={this.toggleSidebar}
          />
          <div
            className="main-panel"
            ref={this.mainPanel}
            data-color={backgroundColor}
          >
            <AdminNavbar
              brandText={this.getBrandText(location)}
              toggleSidebar={this.toggleSidebar}
              sidebarOpened={sidebarOpened}
            />
            <Switch>
              {this.getRoutes()}
              <Redirect from="*" to="/dashboard/overview" />
            </Switch>
            {
              // we don't want the Footer to be rendered on map page
              location?.pathname.indexOf('maps') !== -1 ? null : (
                <Footer fluid />
              )
            }
          </div>
        </div>
        {/* <FixedPlugin
          bgColor={this.state.backgroundColor}
          handleBgClick={this.handleBgClick}
        /> */}
      </>
    );
  }
}

export default DashboardPage;
