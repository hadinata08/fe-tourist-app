import { Spin, Table } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/atoms/Button";
import { useGetTourisms } from "../../hooks/useGetTourisms";
import { columns } from "../../utils/utilsTable";

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
