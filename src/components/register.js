import ReactTypingEffect from "react-typing-effect";
import { Container, Form, Button } from "react-bootstrap";
import axios from "axios";
import { useState } from "react";
import { Alert } from "bootstrap";

const Register = ({ title, description }) => {
  const [NIP, setNIP] = useState("");
  const [nama, setNama] = useState("");
  const [password, setPassword] = useState("");

  const handleNIP = (inputNIP) => {
    setNIP(inputNIP);
  };

  const handleNama = (inputNama) => {
    setNama(inputNama);
  };

  const handlePassword = (inputPassword) => {
    setPassword(inputPassword);
  };

  const userRegister = () => {
    console.log("user Register Ready");

    const requestingData = {
      nip: NIP,
      nama: nama,
      password: password,
    };

    axios({
      method: "POST",
      url: "http://localhost:3100/users",
      data: requestingData,
    }).then((result) => {
      console.log(result.data);
      if (result.data.registered) {
        alert("Pendaftaran Berhasil");
        window.location.replace("/login");
      } else {
        alert("Gagal mendaftar, coba dengan NIP lain");
      }
    });
  };

  return (
    <Container>
      <div className="d-flex justify-content-center fw-bold h3 my-4">
        <ReactTypingEffect
          text={[title, description]}
          speed={100}
          eraseDelay={800}
          eraseSpeed={100}
          typingDelay={100}
        />
      </div>
      <Form className="w-50 mx-auto">
        <Form.Group>
          <Form.Label className="fw-bold">NIP</Form.Label>
          <Form.Control
            type="number"
            placeholder="masukkan NIP anda"
            required
            onChange={(event) => handleNIP(event.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label className="fw-bold">Nama</Form.Label>
          <Form.Control
            type="text"
            placeholder="Masukkan Nama Anda"
            required
            onChange={(event) => handleNama(event.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label className="fw-bold">Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="*****"
            required
            onChange={(event) => handlePassword(event.target.value)}
          />
        </Form.Group>
        <Button className="mt-4 w-100" onClick={() => userRegister()}>
          Daftar Sekarang
        </Button>
      </Form>
    </Container>
  );
};

export default Register;
