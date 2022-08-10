const CompanyCard = ({ isLoading, props_company }) => {
  return (
    <div className="card">
      <div className="card-header">
        <div className="card-title">
          {isLoading && "Loading..."}
          {!isLoading && <h2>{props_company.name}</h2>}
        </div>
      </div>
      {/* /.card-header */}
      <div className="card-body d-flex align-items-center justify-content-center">
        {isLoading && <img className="img-responsive" src="/loading.gif" />}
        {!isLoading && (
          <img
            className="img-fluid"
            src={`/${props_company.logo}`}
            alt={`${props_company.name} Logo`}
          />
        )}
      </div>
    </div>
  );
};

export default CompanyCard;
