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

function CreatePage() {
  const data = useActionData();
  console.log(data);
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="container">
      <h1 className="hea">Create Categories</h1>
      <br />
      <Form method="post" encType="multipart/form-data">
        {data && <p style={{ color: "green" }}>{data.message}</p>}
        <label style={{ fontSize: "20px" }}>Name</label>
        <input
          className="form-control"
          type="text"
          name="name"
          style={{ fontSize: "20px" }}
        />
        <br />
        <label style={{ fontSize: "20px" }}>Image</label>
        <input
          className="form-control"
          type="file"
          name="image"
          multiple
          style={{ fontSize: "20px" }}
        />
        <br />
        <label style={{ fontSize: "20px" }}>Type</label>
        <select className="form-control" name="type">
          <option value="">Choose</option>
          <option value="shop">shop</option>
          <option value="item">item</option>
        </select>
        <br />

        <button
          style={{ fontSize: "20px" }}
          className="form-control btn btn-primary"
          variant="primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Save"}
        </button>
        <br />
      </Form>
    </div>
  );
}

export default CreatePage;

export async function action({ request, params }) {
  const data = await request.formData();

  /*const eventData = {
    name: data.get('name'),
    file: data.get('image'),
    type: data.get('type')
  };*/

  const formData = new FormData();
  formData.append("name", data.get("name"));
  formData.append("type", data.get("type"));

  //for (const [key, value] of [...data.entries()]) {
  //  if (key === "image") {
  //    formData.append("files[]", value);
  //  }
  //  console.log(key, value);
  //}
  // const response = await fetch(
  //   "https://fooddelivery.techelonstudios.com/delivery2/public/api/categories-store",
  //   {
  //     method: "POST",
  //     body: formData,
  //   }
  // );
  //const response = await axios.post(
  //  "https://fooddelivery.techelonstudios.com/delivery2/public/api/upload-files",
  //  formData,
  //  {
  //    Headers: "multipart/form-data",
  //  }
  //);

   const response = await axios.post(
     "https://fooddelivery.techelonstudios.com/delivery2/public/api/categories-store",
     formData,
     {
       Headers: "multipart/form-data",
     }
   );
  // const resData = await response.json();
  if (response.data.error) {
    throw json({ message: "Could not save event." }, { status: 500 });
  } else if (response.status == 401) {
    console.log(response.message);
    return response;
  } else {
    //return resData;
    return redirect("/categories/message");
  }
}
