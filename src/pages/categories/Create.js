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

function CreatePage() {
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
          title="Create Categories"
          titleTypographyProps={{
            style: { color: "white", fontSize: "20px" },
          }}
        ></CardHeader>
        <Form method="post" encType="multipart/form-data" className="frmi">
          <label>Name</label>
          <input className="form-control" type="text" name="name" required />
          <br />
          <label>Image</label>
          <input className="form-control" type="file" name="image" />
          <br />
          <label>Type</label>
          <select className="form-control" name="type">
            <option value="">Choose</option>
            <option value="shop">shop</option>
            <option value="item">item</option>
          </select>
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
  formData.append("type", data.get("type"));
  formData.append("file", data.get("image"));

  const response = await axios.post(
    "http://140.82.53.246/api/categories-store",
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
    return redirect("/categories/Category Stored Successfully");
  }
}
