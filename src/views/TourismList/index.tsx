import { Spin, Table } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/atoms/Button";
import { useGetTourisms } from "../../hooks/useGetTourisms";
import { message, Space } from "antd";
import type { ColumnsType } from "antd/es/table";
import * as dayjs from "dayjs";
import { BFFServiceInstance } from "../../config/axios";
import { DataTourisms } from "../../types/DataTourims";

const TourismList = () => {
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [tourismsData, setTourismsData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tokenSession: any = localStorage.getItem("token");

  const getTourisms = useGetTourisms({
    params: {
      page: 1,
      token: tokenSession,
    },
  });

  const fetchGetTourisms = useCallback(
    async (page: number) => {
      setIsLoading(true);
      getTourisms
        ?.handleFetch({
          page: page,
          token: tokenSession,
        })
        .then((res) => setTourismsData(res?.data?.data))
        .then(() => setIsLoading(false));
      setIsLoading(false);
    },
    [getTourisms, tokenSession]
  );

  const columns: ColumnsType<DataTourisms> = [
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
      title: "Created At",
      dataIndex: "createdat",
      key: "createdat",
      render: (date) => <p>{dayjs(date).format("DD-MM-YYYY")}</p>,
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

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      fetchGetTourisms(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col flex-1 w-full bg-gray-200">
      <div className="flex justify-between mr-10 ml-5 mt-8 -mb-10  items-center">
        <p className=" text-2xl font-bold text-black p-5">List Tourisms</p>
        <Button
          size="md"
          children="Add Tourisms"
          onClick={() => navigate("/add-tourisms")}
        />
      </div>
      <div className="mt-16 mx-10">
        {getTourisms.isLoading ? (
          <Spin />
        ) : (
          <Table
            size="middle"
            columns={columns}
            dataSource={tourismsData}
            loading={isLoading}
            pagination={{
              total: getTourisms.data?.data?.total_pages,
              onChange: async (event: number) => fetchGetTourisms(event),
            }}
          />
        )}
      </div>
    </div>
  );
};

export default TourismList;
