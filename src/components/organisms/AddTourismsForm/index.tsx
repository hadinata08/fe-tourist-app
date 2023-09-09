import { Col, Row } from "antd";
import { Controller, useForm } from "react-hook-form";
import { AddTourismsPayload } from "../../../types/AddTourismsPayload";
import Button from "../../atoms/Button";
import Input from "../../atoms/Input";

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: any;
};

const AddTourismsForm = (props: Props) => {
  const { onSubmit } = props;

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<AddTourismsPayload>();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Row>
        <Col span={10}>
          <Controller
            control={control}
            name="tourist_name"
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
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
            render={({ field: { onChange, value } }) => (
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
            render={({ field: { onChange, value } }) => (
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
      <Button children="Add Tourism" className="mt-20" />
    </form>
  );
};

export default AddTourismsForm;
