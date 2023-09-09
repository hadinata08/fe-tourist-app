// import { message, Space } from "antd";
import { message, Space } from "antd";
import type { ColumnsType } from "antd/es/table";
import { BFFServiceInstance } from "../config/axios";
// import * as dayjs from "dayjs";
// import { BFFServiceInstance } from "../config/axios";
import { DataTourisms } from "../types/DataTourims";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const tokenSession: any = localStorage.getItem("token");

export const columns: ColumnsType<DataTourisms> = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Name",
    dataIndex: "tourist_name",
    key: "tourist_name",
    render: (name, { id }) => <a href={`/tourism-list/${id}`}>{name}</a>,
  },
  {
    title: "Email",
    dataIndex: "tourist_email",
    key: "tourist_email",
  },
  {
    title: "Location",
    dataIndex: "tourist_location",
    key: "tourist_location",
  },
  {
    title: "Profile Picture",
    dataIndex: "tourist_profilepicture",
    key: "tourist_profilepicture",
    render: (sourceImg) => (
      <div className=" flex justify-center items-center">
        <img
          src={sourceImg}
          alt={sourceImg}
          className="w-10 h-10 flex justify-center"
        />
      </div>
    ),
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
    render: (_, { id, tourist_email, tourist_location, tourist_name }) => (
      <Space size="middle">
        <a href={`/edit-tourisms/${id}`}>Ubah</a>
        <a
          onClick={async () => {
            await BFFServiceInstance({
              method: "DELETE",
              url: `/api/Tourist/${id}`,
              data: {
                id: id,
                tourist_name: tourist_name,
                tourist_location: tourist_location,
                tourist_email: tourist_email,
              },
              headers: {
                Authorization: `Bearer ${tokenSession}`,
              },
              transformRequest: [
                (data) => {
                  const formData = new URLSearchParams();
                  for (const key in data) {
                    formData.append(key, data[key]);
                  }
                  return formData.toString();
                },
              ],
            }).then(() => {
              message.success("Data has been deleted!");
              setTimeout(() => window.location.reload(), 1500);
            });
          }}
        >
          Hapus
        </a>
      </Space>
    ),
  },
];
