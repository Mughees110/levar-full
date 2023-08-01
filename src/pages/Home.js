import Button from "react-bootstrap/Button";
import React, { useState, useEffect } from "react";

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

function HomePage() {
  const data = useActionData();
  console.log(data);
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="container">
      <br />
      {data && <p style={{ color: "red" }}>{data.data.message}</p>}
      <Card className="frm">
        <CardHeader
          className="pan"
          title="Login"
          titleTypographyProps={{
            style: { color: "white", fontSize: "20px" },
          }}
        ></CardHeader>
        <Form method="post" encType="multipart/form-data" className="frmi">
          <label>Email</label>
          <input className="form-control" type="text" name="email" required />
          <br />
          <label>Password</label>
          <input
            className="form-control"
            type="text"
            name="password"
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
            {isSubmitting ? "Submitting..." : "Login"}
          </button>
          <br />
        </Form>
      </Card>
    </div>
  );
}

export default HomePage;

export async function action({ request, params }) {
  const data = await request.formData();
  const formData = new FormData();
  formData.append("email", data.get("email"));
  formData.append("password", data.get("password"));

  const response = await axios.post(
    "http://140.82.53.246/api/login-super-admin",
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
    localStorage.setItem("role", "super-admin");
    return redirect("/categories/Logged In Successfully");
  }
}
