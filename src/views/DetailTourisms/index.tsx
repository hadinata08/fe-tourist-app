import { Spin } from "antd";
import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useGetDetailTourisms } from "../../hooks/useGetDetailTourisms";

const DetailTourisms = () => {
  const navigate = useNavigate();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tokenSession: any = localStorage.getItem("token");
  const url = window.location.href;
  const id = url.split("/")[4];

  const { data, isLoading } = useGetDetailTourisms({
    enabled: true,
    params: {
      token: tokenSession,
      id: id,
    },
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const dataTitle: string[] = [
    "ID",
    "Name",
    "Location",
    "Email",
    "Profile Picture",
  ];

  // eslint-disable-next-line react-hooks/exhaustive-deps, @typescript-eslint/no-explicit-any
  const dataValue: any = [
    data?.data?.id,
    data?.data?.tourist_name,
    data?.data?.tourist_location,
    data?.data?.tourist_email,
    <img src={data?.data?.tourist_profilepicture} alt="touris-pp" />,
  ];

  const mappingData = useMemo(() => {
    return dataTitle.map((item: string, index: number) => (
      <div className=" mb-8">
        <p className=" font-semibold">{item}</p>
        <p>{dataValue[index]}</p>
      </div>
    ));
  }, [dataTitle, dataValue]);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className=" flex flex-col text-black bg-gray-200">
      <div className="m-10 p-10 rounded-md bg-white">
        <p className=" font-semibold text-xl mb-8">Detail Tourist</p>
        {isLoading ? <Spin /> : mappingData}
      </div>
    </div>
  );
};

export default DetailTourisms;
