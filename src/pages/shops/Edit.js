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
import {
  GoogleMap,
  MarkerF,
  LoadScript,
  useJsApiLoader,
} from "@react-google-maps/api";
import { Row, Col } from "react-bootstrap";
function EditPage() {
  const {
    shopId,
    name,
    address,
    image,
    adminName,
    adminEmail,
    adminPassword,
    categoryId,
    latitude,
    longitude,
  } = useParams();
  console.log(categoryId);
  const dataG2 = useRouteLoaderData("get-categories-shop2");
  console.log(dataG2);
  const [nameI, setName] = useState(name);
  const [addressI, setAddress] = useState(address);
  const [adminNameI, setAdminName] = useState(adminName);
  const [adminEmailI, setAdminEmail] = useState(adminEmail);
  const [adminPasswordI, setAdminPassword] = useState(adminPassword);
  const [categoryIdI, setCategoryId] = useState(categoryId);
  const containerStyle = {
    width: "100%",
    height: "400px",
  };
  const data = useActionData();
  console.log(data);

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };
  const handleAdminNameChange = (e) => {
    setAdminName(e.target.value);
  };
  const handleAdminEmailChange = (e) => {
    setAdminEmail(e.target.value);
  };
  const handleAdminPasswordChange = (e) => {
    setAdminPassword(e.target.value);
  };
  const handleCategoryIdChange = (e) => {
    setCategoryId(e.target.value);
  };
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyCUuJfyVEHoeUT49q-NFyBDRetC6GqSkeI",
  });
  const center = {
    lat: parseFloat(latitude),
    lng: parseFloat(longitude),
  };
  const [position, setPosition] = useState(center);

  const handleMarkerDragEnd = (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    setPosition({ lat, lng });
    console.log(lat, lng);
  };
  const [dataG, setDataG] = useState(null);
  async function send() {
    const response = await fetch("http://140.82.53.246/api/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const resData = await response.json();
    setDataG(resData.data);
  }
  useEffect(() => {
    send();
  }, []);
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
              <label>Address</label>
              <input
                className="form-control"
                type="text"
                name="address"
                onChange={handleAddressChange}
                value={addressI}
              />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <label>Admin Name</label>
              <input
                className="form-control"
                type="text"
                name="admin-name"
                onChange={handleAdminNameChange}
                value={adminNameI}
              />
            </Col>
            <Col md={6}>
              <label>Admin Email</label>
              <input
                className="form-control"
                type="text"
                name="admin-email"
                onChange={handleAdminEmailChange}
                value={adminEmailI}
              />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <label>Admin Password</label>
              <input
                className="form-control"
                type="text"
                name="admin-password"
                onChange={handleAdminPasswordChange}
                value={adminPasswordI}
              />
            </Col>
            <Col md={6}>
              {image && (
                <img
                  style={{ width: "100px" }}
                  src={`http://140.82.53.246/api/shopImages/${image}`}
                />
              )}

              <label>Image</label>
              <input className="form-control" type="file" name="image" />
            </Col>
          </Row>
          <label>Category</label>
          <select
            className="form-control"
            name="categoryId"
            onChange={handleCategoryIdChange}
            value={categoryIdI}
          >
            <option value="">Choose</option>
            {dataG &&
              dataG.map((dat) =>
                categoryId === dat ? (
                  <option value={dat.id} selected>
                    {dat.name}
                  </option>
                ) : (
                  <option value={dat.id}>{dat.name}</option>
                )
              )}
          </select>
          <br />

          <input type="hidden" value={position.lat} name="lat"></input>
          <input type="hidden" value={position.lng} name="lng"></input>
          {isLoaded && (
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={position}
              zoom={10}
            >
              {position.lat && position.lng && (
                <MarkerF
                  position={position}
                  draggable={true}
                  onDragEnd={handleMarkerDragEnd}
                />
              )}
            </GoogleMap>
          )}
          <br />
          <input type="hidden" name="shopId" value={shopId} />
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
  formData.append("file", data.get("image"));
  formData.append("address", data.get("address"));
  formData.append("admin-name", data.get("admin-name"));
  formData.append("admin-email", data.get("admin-email"));
  formData.append("admin-password", data.get("admin-password"));
  formData.append("shopId", data.get("shopId"));
  formData.append("categoryId", data.get("categoryId"));

  const response = await axios.post(
    "http://140.82.53.246/api/shops-update",
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
    return redirect("/shops/Shop Updated Successfully");
  }
}
