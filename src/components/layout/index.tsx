import { Fragment } from "react/jsx-runtime";
import Header from "../header";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <Fragment>
      <Header />
      <main>
        <Outlet />
      </main>
    </Fragment>
  );
};

export default AdminLayout;
