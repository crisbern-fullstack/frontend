import { useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import useFetchEmails from "../hooks/useFetchEmails";
import { Markup } from "interweave";
import { Link } from "react-router-dom";

const SentMails = () => {
  const { user } = useAuthContext();
  const { fetchEmails, emails } = useFetchEmails();

  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };

  useEffect(() => {
    fetchEmails(true);
  }, []);

  return (
    <div className="content-wrapper">
      {/* Main content */}
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Sent Mails</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <a href="#">Home</a>
                </li>
                <li className="breadcrumb-item active">Sent Email</li>
              </ol>
            </div>
          </div>
        </div>
        {/* /.container-fluid */}
      </section>

      <section className="content">
        <div className="row">
          <div className="col-md-3">
            <Link
              to={{ pathname: "/mail" }}
              className="btn btn-primary btn-block mb-3"
            >
              Compose
            </Link>
          </div>
          {/* /.col */}
          <div className="col-md-9">
            <div className="card card-primary card-outline">
              <div className="card-header">
                <h3 className="card-title">Inbox</h3>
                <div className="card-tools">
                  <div className="input-group input-group-sm">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search Mail"
                    />
                    <div className="input-group-append">
                      <div className="btn btn-primary">
                        <i className="fas fa-search" />
                      </div>
                    </div>
                  </div>
                </div>
                {/* /.card-tools */}
              </div>
              {/* /.card-header */}
              <div className="card-body p-0">
                <div className="mailbox-controls">
                  {/* Check all button */}
                  <button
                    type="button"
                    className="btn btn-default btn-sm checkbox-toggle"
                  >
                    <i className="far fa-square" />
                  </button>
                  <div className="btn-group">
                    <button type="button" className="btn btn-default btn-sm">
                      <i className="far fa-trash-alt" />
                    </button>
                    <button type="button" className="btn btn-default btn-sm">
                      <i className="fas fa-reply" />
                    </button>
                    <button type="button" className="btn btn-default btn-sm">
                      <i className="fas fa-share" />
                    </button>
                  </div>
                  {/* /.btn-group */}
                  <button type="button" className="btn btn-default btn-sm">
                    <i className="fas fa-sync-alt" />
                  </button>
                  <div className="float-right">
                    1-50/200
                    <div className="btn-group">
                      <button type="button" className="btn btn-default btn-sm">
                        <i className="fas fa-chevron-left" />
                      </button>
                      <button type="button" className="btn btn-default btn-sm">
                        <i className="fas fa-chevron-right" />
                      </button>
                    </div>
                    {/* /.btn-group */}
                  </div>
                  {/* /.float-right */}
                </div>
                <div className="table-responsive mailbox-messages">
                  <table className="table table-hover table-striped">
                    <tbody>
                      {emails &&
                        emails.map((email) => (
                          <tr>
                            <td className="mailbox-name">
                              <b>{email.subject}</b>
                            </td>
                            <td className="mailbox-subject">
                              <Markup content={truncate(email.html, 100)} />
                            </td>
                            <td className="mailbox-attachment" />
                            <td className="mailbox-date">{email.date}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                  {/* /.table */}
                </div>
                {/* /.mail-box-messages */}
              </div>
              {/* /.card-body */}
              <div className="card-footer p-0">
                <div className="mailbox-controls">
                  <div className="float-right">
                    1-50/200
                    <div className="btn-group">
                      <button type="button" className="btn btn-default btn-sm">
                        <i className="fas fa-chevron-left" />
                      </button>
                      <button type="button" className="btn btn-default btn-sm">
                        <i className="fas fa-chevron-right" />
                      </button>
                    </div>
                    {/* /.btn-group */}
                  </div>
                  {/* /.float-right */}
                </div>
              </div>
            </div>
            {/* /.card */}
          </div>
          {/* /.col */}
        </div>
        {/* /.row */}
      </section>
      {/* /.content */}
    </div>
  );
};

export default SentMails;
