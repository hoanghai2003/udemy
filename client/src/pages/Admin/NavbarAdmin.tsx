import "./Admin.css";

function NavbarAdmin() {
  return (
    <>
      <div className="navbaradmin">
        <h3>
          <a href="">Back to Udemy</a>
        </h3>
        <img
          src="https://theme.zdassets.com/theme_assets/1073405/6ed3f4eefef20c6eceeedfef97ac699dc81cd605.png"
          alt=""
        />
        <div className="btn-admin">
          <div className="vnkey">
            English(US)<i className="fa-solid fa-angle-down"></i>
          </div>
          <button>Log out</button>
        </div>
      </div>
    </>
  );
}

export default NavbarAdmin;
