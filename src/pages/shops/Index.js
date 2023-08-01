/* global google */
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useRouteLoaderData, json, redirect } from "react-router-dom";
import {
  Form,
  useNavigate,
  useNavigation,
  useActionData,
} from "react-router-dom";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MUIDataTable from "mui-datatables";
import { useParams } from "react-router-dom";
const IndexPage = () => {
  const navigate = useNavigate();
  const { message } = useParams();
  const [key, setKey] = useState(0);
  const [ref, setRef] = useState(null);
  const [dataG, setDataG] = useState(null);
  const [text, setText] = useState(message);
  async function send() {
    const response = await fetch("http://140.82.53.246/api/shops", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const resData = await response.json();
    if (!response.ok) {
      throw json(
        { message: "Could not fetch events." },
        {
          status: 500,
        }
      );
    } else if (resData.status == 401) {
      console.log(resData.message);
      throw json(
        { message: "We are sorry. " + resData.message },
        {
          status: 401,
        }
      );
    } else {
      setDataG(resData.data);
      setRef(false);
      setText("");
    }
  }
  useEffect(() => {
    if (!localStorage.getItem("role")) {
      navigate("/");
    }
    send();
  }, [key]);

  const columns = [
    {
      name: "id",
      label: "ID",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "name",
      label: "NAME",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "address",
      label: "ADDRESS",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "image",
      label: "IMAGE",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "edit",
      label: "EDIT",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "delete",
      label: "DELETE",
      options: {
        filter: true,
        sort: false,
      },
    },
  ];
  /*const data1 = [
   ["Joe James", "Test Corp", "Yonkers", "NY"],
   ["John Walsh", "Test Corp", "Hartford", "CT"],
   ["Bob Herm", "Test Corp", "Tampa", "FL"],
   ["James Houston", "Test Corp", "Dallas", "TX"],
  ];*/
  async function handle(ob) {
    const result = window.confirm("Are you sure you want to proceed ?");
    if (result) {
      setRef(true);
      console.log("yes" + ob);
      const data = {
        shopId: ob,
      };
      const response = await fetch("http://140.82.53.246/api/shops-delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const resData = await response.json();
      if (!response.ok) {
        throw json(
          { message: "Could not fetch events." },
          {
            status: 500,
          }
        );
      } else if (resData.status == 401) {
        console.log(resData.message);
        throw json(
          { message: "We are sorry. " + resData.message },
          {
            status: 401,
          }
        );
      } else {
        setKey((prevKey) => prevKey + 1);
        setText("Deleted Successfully");
      }
    } else {
      console.log("no");
    }
  }
  const data1 =
    dataG !== null
      ? dataG.map((obj) => [
          obj.id,
          obj.name,
          obj.address,
          <img
            style={{ width: "50px" }}
            src={`http://140.82.53.246/shopImages/${obj.image}`}
          />,
          <Link
            to={`/shops-update/${obj.id}/${obj.name}/${obj.address}/${obj.image}/${obj.adminName}/${obj.adminEmail}/${obj.adminPassword}/${obj.categoryId}/${obj.latitude}/${obj.longitude}`}
            className="btn btn-sm btn-success"
          >
            Edit
          </Link>,
          <Button
            onClick={() => {
              handle(obj.id);
            }}
            className="btn btn-danger btn-sm"
          >
            Delete
          </Button>,
        ])
      : null;

  const options = {
    filterType: "checkbox",
    responsive: "standard",
  };

  return (
    <Container>
      <Row>
        <Col sm>
          {text && <p style={{ color: "green" }}>{text}</p>}
          <h3 className="hea">
            <Link
              to="/shops-store"
              className="btn"
              style={{ backgroundColor: "#FBAF02", color: "white" }}
            >
              Create +
            </Link>
          </h3>
          {ref && (
            <div className="spinner-container">
              <div className="loading-spinner"></div>
            </div>
          )}
          {!dataG && (
            <p>
              <div className="spinner-container">
                <div className="loading-spinner"></div>
              </div>
            </p>
          )}
          {dataG && (
            <MUIDataTable
              id="shop-table"
              styles={{
                paper: {
                  root: {
                    backgroundColor: "black",
                  },
                },
              }}
              title={"Shops List"}
              data={data1}
              columns={columns}
              options={options}
            />
          )}
        </Col>
      </Row>
    </Container>
  );
};
export default IndexPage;
