import Button from "react-bootstrap/Button";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router";

import { json, redirect } from "react-router-dom";
import {
  Form,
  useNavigate,
  useNavigation,
  useActionData,
  useRouteLoaderData,
} from "react-router-dom";
import axios from "axios";
import { Card, CardHeader } from "@mui/material";

import { Row, Col } from "react-bootstrap";
function EditPage() {
  const { riderId, name, email, password, gender, dateOfBirth } = useParams();
  const dataG2 = useRouteLoaderData("get-categories-shop2");
  console.log(dataG2);
  const [nameI, setName] = useState(name);
  const [emailI, setEmail] = useState(email);
  const [passwordI, setPassword] = useState(password);
  const [genderI, setGender] = useState(gender);
  const [dateOfBirthI, setDateOfBirth] = useState(dateOfBirth);

  const data = useActionData();
  console.log(data);

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };
  const handleDateOfBirthChange = (e) => {
    setDateOfBirth(e.target.value);
  };

  return (
    <div className="container">
      <Card className="frm2">
        <CardHeader
          className="pan"
          title="Edit Shops"
          titleTypographyProps={{
            style: { color: "white", fontSize: "20px" },
          }}
        ></CardHeader>
        <Form method="post" encType="multipart/form-data" className="frmi2">
          {data && <p style={{ color: "red" }}>{data.data.message}</p>}
          <Row>
            <Col md={6}>
              <label>Name</label>
              <input
                className="form-control"
                type="text"
                name="name"
                onChange={handleNameChange}
                value={nameI}
              />
            </Col>
            <Col md={6}>
              <label>Email</label>
              <input
                className="form-control"
                type="text"
                name="email"
                onChange={handleEmailChange}
                value={emailI}
              />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <label>Password</label>
              <input
                className="form-control"
                type="text"
                name="password"
                onChange={handlePasswordChange}
                value={passwordI}
              />
            </Col>
            <Col md={6}>
              <label>Gender</label>
              <input
                className="form-control"
                type="text"
                name="gender"
                onChange={handleGenderChange}
                value={genderI}
              />
            </Col>
          </Row>

          <label>Date Of Birth</label>
          <input
            className="form-control"
            type="text"
            name="dateOfBirth"
            onChange={handleDateOfBirthChange}
            value={dateOfBirthI}
          />

          <br />
          <input type="hidden" name="riderId" value={riderId} />
          <button
            style={{
              width: "100px",
              backgroundColor: "#FBAF02",
              color: "white",
            }}
            className="form-control btn"
            variant="primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Changing..." : "Update"}
          </button>
        </Form>
      </Card>
    </div>
  );
}

export default EditPage;

export async function action({ request, params }) {
  const data = await request.formData();
  const formData = new FormData();
  formData.append("name", data.get("name"));
  formData.append("email", data.get("email"));
  formData.append("password", data.get("password"));
  formData.append("gender", data.get("gender"));
  formData.append("dateOfBirth", data.get("dateOfBirth"));
  formData.append("riderId", data.get("riderId"));

  const response = await axios.post(
    "http://140.82.53.246/api/riders-update",
    formData,
    {
      Headers: "multipart/form-data",
    }
  );
  if (response.data.error) {
    throw json({ message: "Could not save event." }, { status: 500 });
  } else if (response.data.status === 401) {
    return response;
  } else {
    return redirect("/riders/Rider Updated Successfully");
  }
}
