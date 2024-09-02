import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "antd";
import { useHistory } from "react-router-dom";
import Empty from "../../Components/Empty";
import { Badge } from "../../Components/Badge";
import axios from "axios";
import config from "../../config";
import { Modal, notification } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
export default function Discussions({
  data,
  allData,
  getDiscussions,
  hanleUpdateData,
}) {
  const [value, setValue] = useState("");
  const [openContent, setOpenContent] = useState(false);
  const [contentData, setContentData] = useState({});
  const history = useHistory();
  const search = (e) => {
    setValue(e.target.value);
    console.log(e.target.value);
    handleSearch(e.target.value);
  };

  const handleSearch = (query) => {
    var updatedList = [...allData];
    updatedList = updatedList.filter((item) => {
      return (
        item.author?.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        item.title?.toLowerCase().indexOf(query.toLowerCase()) !== -1
       
      );
    });
    hanleUpdateData(updatedList);
  };

  const handleCancelContent = () => setOpenContent(false);


  const Status = (data) => {
    return <Badge value={data?.status} type={data?.status} />;
  };

  const Eventemp = (data) => {
    return (
      <div className="d-flex justify-content align-items-center">
        <div>
          <img
            width={30}
            style={{ borderRadius: "50%" }}
            src={
              data.image?.url
                ? data.image?.url
                : "https://res.cloudinary.com/dkfauaaqd/image/upload/v1705883046/gyzs29kp6qreb2hk2x0v.png"
            }
          />
        </div>
        <div className="pl-2">{data?.title}</div>
      </div>
    );
  };

  const Action = (data) => {
    const viewContent = (data) => {
      history.push({
        pathname: `/discussion-details/${data._id}`,
        state: data,
      });
    };
    const confirmAction = (id) => {
      Modal.confirm({
        title: `Are you sure want to delete this discussion ?`,
        icon: <ExclamationCircleOutlined />,
        okText: "Yes",
        okType: "danger",
        cancelText: "No",
        onOk() {
          remove(id);
        },
        onCancel() {
          console.log("Cancel");
        },
      });
    };

    const Notification = (type, msgType, msg) => {
      notification[type]({
        message: msgType,
        description: msg,
      });
    };

    const remove = (id) => {
      axios
        .delete(`${config.baseUrl}discussion/${id}`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            Notification(
              "success",
              "Success",
              "Discussion removed successfully"
            );
            getDiscussions();
          }
        })
        .catch((err) => {
          Notification("error", "Error", err?.response?.data?.message);
          console.log(err);
        });
    };

    return (
      <div className="d-flex align-items-center">
        <Button
          className="bg-primary text-white"
          onClick={() => {
            setContentData(data);
            setOpenContent(true);
          }}
        >
          <i className="fa fa-eye pr-2"></i> View Content
        </Button>
        <Button
          className="bg-danger ml-2 text-white"
          onClick={confirmAction.bind(this, data)}
        >
          <i className="fa fa-eye pr-2"></i> Remove
        </Button>
      </div>
    );
  };

  return (
    <div className="d-card">
       <div className="d-flex justify-content-end align-items-center">
        <div className="w-50">
          <input
            type="text"
            class="form-control"
            id="exampleFormControlInput1"
            onChange={search}
            value={value}
            placeholder="Search..."
          />
        </div>
      </div>
      <br />
      {data?.length > 0 ? (
        <DataTable
          value={data}
          tableStyle={{ minWidth: "50rem" }}
          className="table-sizee"
        >
          <Column sortable field="date" header="Date Created" />
          <Column sortable field="author" header="Author Name"></Column>
          <Column sortable field="title" header="Title"></Column>
          <Column sortable field="no_of_comments" header="No of Comments" />
          <Column sortable field="action" header="Action" body={Action} />
        </DataTable>
      ) : (
        <Empty type="Discussions" />
      )}

      <Modal
        title={" Discussion Content"}
        open={openContent}
        footer={false}
        width={800}
        onCancel={handleCancelContent}
      >
        <div className="pt-3">{contentData?.content}</div>
        <br />
        <div className="d-flex justify-content-end align-items-center">
          <Button
            color="bg-primary"
            onClick={() => {
              history.push({
                pathname: `/discussion-details/${contentData._id}`,
                state: contentData,
              });
            }}
            className="px-4 ml-3"
          >
            <i className="fa fa-eye text-white"></i>
            View Comments
          </Button>
        </div>
      </Modal>
    </div>
  );
}
