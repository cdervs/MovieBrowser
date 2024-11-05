import { useNavigate, Link } from "react-router-dom";

const Navbar = ({ searchText, setSearchText }) => {
  const history = useNavigate();

  const updateSearchText = (e) => {
    history("/search");
    console.log(e.target.value);
    setSearchText(e.target.value);
  };

  const SubmitSearch = (e) => {
    e.preventDefault();
    if (searchText.trim()) {
      history("/search");
    }
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-dark bg-gradient"
      // style={{position: "fixed", top: "0", left: "0", width: "100%", zIndex: "1000;"}}
      >
        <div className="container-fluid">
          <Link className="navbar-brand" style={{'font-family': 'Cinematic Language, sans-serif','color': 'var(--bs-warning)'}} to="/">
            ReelHunter
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarToggleExternalContent"
            aria-controls="navbarToggleExternalContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon "></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarToggleExternalContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link id="homebtn" className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/nowplaying">
                  Now Playing
                </Link>
              </li>
              <li id="soon" className="nav-item" >
                <Link className="nav-link disabled" style={{ '--bs-text-opacity': '0.5' }} to="/" aria-disabled="true">
                  Coming soon
                </Link>
              </li>
            </ul>
            <form className="d-flex" role="search" onSubmit={SubmitSearch}>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={searchText}
                onChange={updateSearchText}
              />
              <button id="searchbtn" className="btn btn-outline-warning" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
