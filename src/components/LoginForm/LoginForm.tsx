import { Card, Input, Button, Typography } from "@material-tailwind/react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface FormData {
  email: string;
  password: any;
}

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({});

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogin = async (/* e:any,  */ data: FormData) => {
    /* e.preventDefault(); */
    try {
      const res = await axios.post(
        "https://torre-challenge-server-production.up.railway.app/api/users/login",
        {
          email: data.email,
          password: data.password,
        }
      );
      localStorage.setItem("token", res.data.user.token);
      const user = await axios.get(
        "https://torre-challenge-server-production.up.railway.app/api/users/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      return user.data;
    } catch (error) {
      console.log(error);
    } finally {
      navigate("/");
    }
  };

  return (
    <div className="bg-black w-screen h-screen flex justify-center items-center">
      <Card
        color="transparent"
        shadow={false}
        className="border-2 border-lime-500"
      >
        <Typography variant="h4" color="blue-gray">
          Sign In
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Enter your details to log into your account.
        </Typography>
        <form
          onSubmit={handleSubmit(handleLogin)}
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
        >
          <div className="mb-4 flex flex-col gap-6">
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
            Sign In
          </Button>

          <Typography color="gray" className="mt-4 text-center font-normal">
            Need an account?{" "}
            <a href="/register" className="font-medium text-gray-900">
              Register
            </a>
          </Typography>
        </form>
      </Card>
    </div>
  );
};

export default LoginForm;
