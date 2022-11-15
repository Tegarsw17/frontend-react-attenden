import axios from "axios";
import { useEffect, useState } from "react";
import { Badge, Button, Container } from "react-bootstrap";
import Edit from "./edit";
import Navbar from "./navbar";

function Dashboard({ title }) {
  const [absensiList, setAbsensiList] = useState([]);
  const [absenNotif, setAbsenNotif] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("nama") && !localStorage.getItem("nip")) {
      console.log("user belum login");
      window.location.replace("/login");
    }
    axios({
      methdo: "GET",
      url: "http://localhost:3100/absensi",
    }).then((result) => setAbsensiList(result.data.absensi));
  }, [absenNotif]);

  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };

  const absen = (params) => {
    const requestingData = {
      nip: localStorage.getItem("nip"),
    };
    axios({
      method: "POST",
      url: `http://localhost:3100/absensi/${params}`,
      data: requestingData,
    }).then((result) => {
      setAbsenNotif(!absenNotif);
    });
  };

  return (
    <Container>
      <Navbar />
      <main className="col-md-9 ms-sm-auto col-lg-12 px-md-4 mb-4">
        <h2>{title}</h2>
        <div>
          <p>Hello {localStorage.getItem("nama")}!</p>
          <p>nip {localStorage.getItem("nip")} </p>
          <Button onClick={() => logout()} className="btn btn-danger">
            Logout
          </Button>
          <Edit title="Edit Profile" />
        </div>
        <div className="table-responsive">
          <table className="table table-striped table-sm">
            <thead>
              <tr>
                <th scope="col">No</th>
                <th scope="col">Nip</th>
                <th scope="col">Status</th>
                <th scope="col">Tanggal</th>
              </tr>
            </thead>
            <tbody>
              {absensiList.map((absensi, i) => {
                const { users_nip, status, createdAt } = absensi;
                return (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{users_nip}</td>
                    <td>{status}</td>
                    <td>{createdAt}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="d-flex justify-content-center gap-2">
          <Badge
            pill
            bg="primary"
            className="btn"
            onClick={() => absen("checkin")}
          >
            Checkin
          </Badge>{" "}
          <Badge
            pill
            bg="danger"
            className="btn"
            onClick={() => absen("checkout")}
          >
            Checkout
          </Badge>{" "}
        </div>
      </main>
    </Container>
  );
}

export default Dashboard;
