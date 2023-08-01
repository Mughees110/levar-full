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
import {
  GoogleMap,
  MarkerF,
  LoadScript,
  useJsApiLoader,
} from "@react-google-maps/api";
import { Row, Col } from "react-bootstrap";
const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: 37.7749,
  lng: -122.4194,
};
function CreatePage() {
  const [dataG, setDataG] = useState(null);
  console.log(dataG);
  const data = useActionData();
  console.log(data);
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const [position, setPosition] = useState(center);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyCUuJfyVEHoeUT49q-NFyBDRetC6GqSkeI",
  });

  const handleMarkerDragEnd = (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    setPosition({ lat, lng });
    console.log(lat, lng);
  };
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
              <label>Address</label>
              <input
                className="form-control"
                type="text"
                name="address"
                required
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
                required
              />
            </Col>
            <Col md={6}>
              <label>Admin Email</label>
              <input
                className="form-control"
                type="text"
                name="admin-email"
                required
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
                required
              />
            </Col>
            <Col md={6}>
              <label>Image</label>
              <input className="form-control" type="file" name="image" />
            </Col>
          </Row>
          <label>Category</label>
          <select className="form-control" name="categoryId">
            <option value="">Choose</option>
            {dataG &&
              dataG.map((dat) => <option value={dat.id}>{dat.name}</option>)}
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
  formData.append("address", data.get("address"));
  formData.append("admin-name", data.get("admin-name"));
  formData.append("admin-email", data.get("admin-email"));
  formData.append("admin-password", data.get("admin-password"));
  formData.append("file", data.get("image"));
  formData.append("categoryId", data.get("categoryId"));
  formData.append("latitude", data.get("lat"));
  formData.append("longitude", data.get("lng"));

  const response = await axios.post(
    "http://140.82.53.246/api/shops-store",
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
    return redirect("/shops/Shop Stored Successfully");
  }
}
