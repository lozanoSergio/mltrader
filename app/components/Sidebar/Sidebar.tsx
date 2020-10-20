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
/*eslint-disable*/
import React, {createRef} from "react";
import { Location } from 'history';
import { NavLink } from "react-router-dom";

// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";

// reactstrap components
import { Nav, NavLink as ReactstrapNavLink } from "reactstrap";

var ps: PerfectScrollbar;

type Props = {
  location: Location;
  bgColor: string;
  routes: {
    key: number
    path: string;
    name: string;
    icon: string;
    component: any;
    layout: string;
  }[];
  logo: {
    outterLink: string,
    text: string,
    imgSrc: string,
  }
  toggleSidebar: (event: React.MouseEvent<HTMLHyperlinkElementUtils>) => void;
};

interface State {
  backgroundColor: string;
}

class Sidebar extends React.Component<Props, State> {
  sidebar = React.createRef<HTMLDivElement>();

  constructor(props: Props) {
    super(props);
    this.activeRoute.bind(this);
  }
  // verifies if routeName is the one active (in browser input)
  activeRoute(routeName: string) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  }
  componentDidMount() {
    const currentSidebar = this.sidebar.current;
    if (navigator.platform.indexOf("Win") > -1 && currentSidebar) {
      ps = new PerfectScrollbar(currentSidebar, {
        suppressScrollX: true,
        suppressScrollY: false
      });
    }
  }
  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
    }
  }
  linkOnClick = () => {
    document.documentElement.classList.remove("nav-open");
  };
  render() {
    const { bgColor, routes, logo, toggleSidebar } = this.props;
    let logoImg = null;
    let logoText = null;
    if (logo !== undefined) {
      if (logo.outterLink !== undefined) {
        logoImg = (
          <a
            href={logo.outterLink}
            className="simple-text logo-mini"
            target="_blank"
            onClick={toggleSidebar}
          >
            <div className="logo-img">
              <img src={logo.imgSrc} alt="react-logo" />
            </div>
          </a>
        );
        logoText = (
          <a
            href={logo.outterLink}
            className="simple-text logo-normal"
            target="_blank"
            onClick={toggleSidebar}
          >
            {logo.text}
          </a>
        );
      }
    }
    return (
      <div className="sidebar" data-color={bgColor}>
        <div className="sidebar-wrapper" ref={this.sidebar}>
          {logoImg !== null || logoText !== null ? (
            <div className="logo">
              {logoImg}
              {logoText}
            </div>
          ) : null}
          <Nav>
            {routes.map((prop:any, key: number) => {
              if (prop.redirect) return null;
              return (
                <li
                  className={
                    this.activeRoute(prop.path) +
                    (prop.pro ? " active-pro" : "")
                  }
                  key={key}
                >
                  <NavLink
                    to={prop.layout + prop.path}
                    className="nav-link"
                    activeClassName="active"
                    onClick={toggleSidebar}
                  >
                    <i className={prop.icon} />
                    <p>{prop.name}</p>
                  </NavLink>
                </li>
              );
            })}
            <li
              className="active-pro"
            >
              <ReactstrapNavLink
                href="https://www.creative-tim.com/product/black-dashboard-pro-react?ref=bdr-user-archive-sidebar-upgrade-pro"
              >
                <i className="tim-icons icon-spaceship" />
                <p>Upgrade to PRO</p>
              </ReactstrapNavLink>
            </li>
          </Nav>
        </div>
      </div>
    );
  }
}

export default Sidebar;
