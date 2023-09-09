import { message } from "antd";
import { useCallback, useEffect } from "react";
import { SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import AddTourismsForm from "../../components/organisms/AddTourismsForm";
import { useAddTourisms } from "../../hooks/useAddTourisms";
import { AddTourismsPayload } from "../../types/AddTourismsPayload";

const AddTourisms = () => {
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tokenSession: any = localStorage.getItem("token");

  const storeTourisms = useAddTourisms({
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
      await storeTourisms.handleFetch({ ...data, token: tokenSession });
    },
    [storeTourisms, tokenSession]
  );

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className=" flex flex-col text-black bg-gray-200 h-screen">
      <div className="m-10 p-10 rounded-md bg-white">
        <p className=" font-bold text-3xl mb-10">Add Tourist</p>
        <AddTourismsForm onSubmit={onSubmit} />
      </div>
    </div>
  );
};

export default AddTourisms;
