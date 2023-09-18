import { Card, Input, Button, Typography } from "@material-tailwind/react";
import axios from "axios";
import { FieldValues, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface FormData {
  name: string;
  lastname: string;
  email: string;
  password: any;
}

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({});

  const navigate = useNavigate();

  const onSubmit = (data: FieldValues) => {
    axios.post("http://localhost:8080/api/users/register", {
      name: data.name,
      lastname: data.lastname,
      email: data.email,
      password: data.password,
    })
    .then((res)=> res.data);
    navigate("/login");
  };

  return (
    <div className="bg-black w-screen h-screen flex justify-center items-center">
      <Card
        color="transparent"
        shadow={false}
        className="border-2 border-lime-500"
      >
        <Typography variant="h4" color="blue-gray">
          Sign Up
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Enter your details to register.
        </Typography>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
        >
          <div className="mb-4 flex flex-col gap-6">
            <Input
              size="lg"
              label="Name"
              {...register("name", { required: true })}
              crossOrigin="false"
            />
            {errors.name?.type === "required" && (
              <span className="text-red-500">* Name field cant be empty </span>
            )}
            <Input
              size="lg"
              label="LastName"
              {...register("lastname", { required: true })}
              crossOrigin="false"
            />
            {errors.lastname?.type === "required" && (
              <span className="text-red-500">* Last Name field cant be empty </span>
            )}
            <Input
              size="lg"
              label="Email"
              {...register("email", { required: true })}
              crossOrigin="false"
            />
            {errors.email?.type === "required" && (
              <span className="text-red-500">* Email field cant be empty </span>
            )}
            <Input
              type="password"
              size="lg"
              label="Password"
              {...register("password", { required: true })}
              crossOrigin="false"
            />
            {errors.password?.type === "minLength" && (
              <span className="text-red-500">
                * Your password must have at least 4 characters{" "}
              </span>
            )}
          </div>
          <Button className="mt-6" fullWidth type="submit">
            Register
          </Button>

          <Typography color="gray" className="mt-4 text-center font-normal">
            Already have an account?{" "}
            <a href="/login" className="font-medium text-gray-900">
              Sign In
            </a>
          </Typography>
        </form>
      </Card>
    </div>
  );
};

export default RegisterForm;
