import { message, Spin } from "antd";
import { useCallback, useEffect } from "react";
import { SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import EditTourismsForm from "../../components/organisms/EditTourismsForm";
import { useEditTourisms } from "../../hooks/useEditTourisms";
import { useGetDetailTourisms } from "../../hooks/useGetDetailTourisms";
import { AddTourismsPayload } from "../../types/AddTourismsPayload";

const EditTourisms = () => {
  const navigate = useNavigate();
  const url = window.location.href;
  const id = url.split("/")[4];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tokenSession: any = localStorage.getItem("token");

  const { data, isLoading } = useGetDetailTourisms({
    enabled: true,
    params: {
      token: tokenSession,
      id: id,
    },
  });

  const storeTourisms = useEditTourisms({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSuccess: () => {
      message.success("Success");
      navigate("/tourism-list");
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: () => {
      message.error("Gagal");
    },
  });

  const onSubmit: SubmitHandler<AddTourismsPayload> = useCallback(
    async (data) => {
      await storeTourisms.handleFetch({ ...data, token: tokenSession, id: id });
    },
    [id, storeTourisms, tokenSession]
  );

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className=" flex flex-col text-black bg-gray-200">
      <div className="m-10 p-10 rounded-md bg-white">
        <p className=" font-bold text-3xl">Edit Tourist</p>
        {isLoading ? (
          <Spin />
        ) : (
          <EditTourismsForm onSubmit={onSubmit} data={data?.data} />
        )}
      </div>
    </div>
  );
};

export default EditTourisms;
