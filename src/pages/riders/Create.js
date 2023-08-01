import Button from "react-bootstrap/Button";
import React, { useState, useEffect } from "react";
import { useRouteLoaderData } from "react-router-dom";
import { json, redirect } from "react-router-dom";
import {
  Form,
  useNavigate,
  useNavigation,
  useActionData,
  Link,
} from "react-router-dom";
import axios from "axios";
import { Card, CardHeader } from "@mui/material";

import { Row, Col } from "react-bootstrap";

function CreatePage() {
  const data = useActionData();
  console.log(data);
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <div className="container">
      <br />
      {data && <p style={{ color: "red" }}>{data.data.message}</p>}
      <Card className="frm2">
        <CardHeader
          className="pan"
          title="Create Shops"
          titleTypographyProps={{
            style: { color: "white", fontSize: "20px" },
          }}
        ></CardHeader>
        <Form method="post" encType="multipart/form-data" className="frmi2">
          <Row>
            <Col md={6}>
              <label>Name</label>
              <input
                className="form-control"
                type="text"
                name="name"
                required
              />
            </Col>

            <Col md={6}>
              <label>Email</label>
              <input
                className="form-control"
                type="text"
                name="email"
                required
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
                required
              />
            </Col>
            <Col md={6}>
              <label>Gender</label>
              <input
                className="form-control"
                type="text"
                name="gender"
                required
              />
            </Col>
          </Row>

          <label>Date Of Brith</label>
          <input
            className="form-control"
            type="date"
            name="dateOfBirth"
            required
          />

          <br />

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
            {isSubmitting ? "Submitting..." : "Save"}
          </button>
          <br />
        </Form>
      </Card>
    </div>
  );
}

export default CreatePage;

export async function action({ request, params }) {
  const data = await request.formData();
  const formData = new FormData();
  formData.append("name", data.get("name"));
  formData.append("email", data.get("email"));
  formData.append("password", data.get("password"));
  formData.append("gender", data.get("gender"));
  formData.append("dateOfBirth", data.get("dateOfBirth"));

  const response = await axios.post(
    "http://140.82.53.246/api/riders-store",
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
    return redirect("/riders/Rider Stored Successfully");
  }
}
