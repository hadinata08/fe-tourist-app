import { Col, Row } from "antd";
import { Controller, useForm } from "react-hook-form";
import { AddTourismsPayload } from "../../../types/AddTourismsPayload";
import { DataTourisms } from "../../../types/DataTourims";

import Button from "../../atoms/Button";
import Input from "../../atoms/Input";

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: DataTourisms | any;
};

const EditTourismsForm = (props: Props) => {
  const { onSubmit, data } = props;

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<AddTourismsPayload>({
    defaultValues: {
      tourist_name: data?.tourist_name,
    },
  });

  return (
    <div className="m-10 p-10 rounded-md bg-white">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <Row>
          <Col span={10}>
            <Controller
              control={control}
              name="tourist_name"
              rules={{ required: true }}
              defaultValue={data?.tourist_name}
              render={({ field: { onChange, value = data?.tourist_name } }) => (
                <Input
                  placeholder="Name"
                  onChange={onChange}
                  value={value}
                  status={errors.tourist_name ? "error" : undefined}
                />
              )}
            />
            {errors?.tourist_name && (
              <p className=" text-red-600 text-xs mt-1">Harus Diisi</p>
            )}
          </Col>
        </Row>
        <Row>
          <Col span={10}>
            <Controller
              control={control}
              name="tourist_location"
              rules={{ required: true }}
              defaultValue={data?.tourist_location}
              render={({
                field: { onChange, value = data?.tourist_location },
              }) => (
                <Input
                  placeholder="Location"
                  onChange={onChange}
                  value={value}
                  status={errors.tourist_location ? "error" : undefined}
                />
              )}
            />
            {errors?.tourist_location && (
              <p className=" text-red-600 text-xs mt-1">Harus Diisi</p>
            )}
          </Col>
        </Row>
        <Row>
          <Col span={10}>
            <Controller
              control={control}
              name="tourist_email"
              rules={{ required: true }}
              defaultValue={data?.tourist_email}
              render={({
                field: { onChange, value = data?.tourist_email },
              }) => (
                <Input
                  placeholder="Email"
                  onChange={onChange}
                  value={value}
                  status={errors.tourist_email ? "error" : undefined}
                />
              )}
            />
            {errors?.tourist_email && (
              <p className=" text-red-600 text-xs mt-1">Harus Diisi</p>
            )}
          </Col>
        </Row>
        <Button children="Edit Tourism" className="mt-20" />
      </form>
    </div>
  );
};

export default EditTourismsForm;
