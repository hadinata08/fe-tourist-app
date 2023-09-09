import { Controller, useForm } from "react-hook-form";
import { FormRegisterInput } from "../../../types/FormRegisterInput";
import Input from "../../atoms/Input";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Props = { onSubmit: any };

const RegisterPage = (props: Props) => {
  const { onSubmit } = props;

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormRegisterInput>();

  return (
    <form
      className="mt-5 flex flex-col gap-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Controller
        control={control}
        name="name"
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <Input
            placeholder="Name"
            onChange={onChange}
            value={value}
            status={errors.name ? "error" : undefined}
          />
        )}
      />
      <Controller
        control={control}
        name="email"
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <Input
            type="email"
            placeholder="Email"
            onChange={onChange}
            value={value}
            status={errors.email ? "error" : undefined}
          />
        )}
      />
      <Controller
        control={control}
        name="password"
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <Input
            type="password"
            placeholder="Password"
            onChange={onChange}
            value={value}
            status={errors.password ? "error" : undefined}
          />
        )}
      />
      <button
        children="Register"
        className=" bg-red-600 text-white w-full mt-3"
      />
    </form>
  );
};

export default RegisterPage;
