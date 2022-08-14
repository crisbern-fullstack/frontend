import { useAuthContext } from "../hooks/useAuthContext";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const { user } = useAuthContext();

  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      {/* Brand Logo */}
      <a href="" className="brand-link elevation-4">
        <span className="brand-text font-weight-light">CMS</span>
      </a>
      {/* Sidebar */}
      <div className="sidebar">
        {/* Sidebar user (optional) */}
        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
          <div className="info">
            {user && (
              <Link to="#" className="d-block">
                {user.email}
              </Link>
            )}
          </div>
        </div>
        {/* SidebarSearch Form */}
        <div className="form-inline">
          <div className="input-group" data-widget="sidebar-search">
            <input
              className="form-control form-control-sidebar"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <div className="input-group-append">
              <button className="btn btn-sidebar">
                <i className="fas fa-search fa-fw" />
              </button>
            </div>
          </div>
        </div>
        {/* Sidebar Menu */}
        <nav className="mt-2">
          <ul
            className="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            {/* Add icons to the links using the .nav-icon class
            with font-awesome or any other icon font library */}
            <li className="nav-item">
              <Link to="/" className="nav-link">
                <i className="nav-icon fas fa-tachometer-alt" />
                <p>Dashboard</p>
              </Link>
            </li>
            {/* Companies */}
            <li className="nav-item">
              <Link to="companies" className="nav-link">
                <i className="nav-icon fas fa-tachometer-alt" />
                <p>Companies</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="#" className="nav-link">
                <i className="nav-icon fas fa-chart-pie" />
                <p>
                  Charts
                  <i className="right fas fa-angle-left" />
                </p>
              </Link>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <Link to="../charts/inline.html" className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>Inline</p>
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <Link to="employees" className="nav-link">
                <i className="nav-icon fas fa-tachometer-alt" />
                <p>Employees</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="mail" className="nav-link">
                <i className="nav-icon fas fa-tachometer-alt" />
                <p>Compose Mail</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="mail/sent" className="nav-link">
                <i className="nav-icon fas fa-tachometer-alt" />
                <p>Sent Mails</p>
              </Link>
            </li>
          </ul>
        </nav>
        {/* /.sidebar-menu */}
      </div>
      {/* /.sidebar */}
    </aside>
  );
};

export default Sidebar;
