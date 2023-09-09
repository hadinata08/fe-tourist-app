/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";

const DetailProfile = () => {
  const navigate = useNavigate();
  const emailSession: any = localStorage.getItem("email");
  const idSession: any = localStorage.getItem("id");
  const nameSession: any = localStorage.getItem("name");

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const dataTitle: string[] = ["ID", "Name", "Email"];

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const dataValue: string[] = [idSession, nameSession, emailSession];

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
        {mappingData}
      </div>
    </div>
  );
};

export default DetailProfile;
