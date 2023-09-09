import { Controller, useForm } from "react-hook-form";
import { FormLoginInput } from "../../../types/FormLoginInput";
import Button from "../../atoms/Button";
import Input from "../../atoms/Input";

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: any;
};

const LoginPage = (props: Props) => {
  const { onSubmit } = props;

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormLoginInput>();

  return (
    <form
      className="mt-5 flex flex-col gap-5"
      onSubmit={handleSubmit(onSubmit)}
    >
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
      <Button type="submit" children="Login" />
    </form>
  );
};

export default LoginPage;
