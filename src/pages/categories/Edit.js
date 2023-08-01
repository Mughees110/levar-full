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
function EditPage() {
  const { name, image, categoryId } = useParams();

  const [nameI, setName] = useState(name);

  const data = useActionData();
  console.log(data);

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  return (
    <div className="container">
      <Card className="frm">
        <CardHeader
          className="pan"
          title="Edit Categories"
          titleTypographyProps={{
            style: { color: "white", fontSize: "20px" },
          }}
        ></CardHeader>
        <Form method="post" encType="multipart/form-data" className="frmi">
          {data && <p style={{ color: "red" }}>{data.message}</p>}
          <label>Name</label>
          <input
            className="form-control"
            type="text"
            name="name"
            onChange={handleNameChange}
            value={nameI}
          />
          <br />
          {image && (
            <img
              style={{ width: "100px" }}
              src={`https://fooddelivery.techelonstudios.com/delivery2/public/categoryImages/${image}`}
            />
          )}
          <br />
          <label>Image</label>
          <input className="form-control" type="file" name="image" />
          <br />
          <input
            type="hidden"
            className="form-control"
            name="categoryId"
            value={categoryId}
          />
          <button
            style={{ backgroundColor: "#FBAF02", color: "white" }}
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
  formData.append("file", data.get("image"));
  formData.append("categoryId", data.get("categoryId"));

  const response = await axios.post(
    "http://140.82.53.246/api/categories-update",
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
    return redirect("/categories/Category Updated Successfully");
  }
}
