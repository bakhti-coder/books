import { Fragment } from "react/jsx-runtime";
import TextField from "@mui/material/TextField";
import { useForm, SubmitHandler } from "react-hook-form";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import { toast } from "react-toastify";
import { TOKEN } from "../../constants";
import useAuth from "../../store/auth";

type Inputs = {
  username: string;
  password: string;
};

const LoginPage = () => {
  const { setIsAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const { register, handleSubmit } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const values = data;
    try {
      setLoading(true);
      const data = await axios.post(
        "https://fakestoreapi.com/auth/login",
        values
      );
      localStorage.setItem(TOKEN, data.data.token);
      toast.success("Success login");
      setIsAuthenticated(true);
      navigate("/");
    } catch (err: any) {
      toast.error(err.response.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Fragment>
      <div className="login">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="login-form w-full md:w-1/4 bg-[#fefefe] py-5 px-6 rounded-lg shadow-md"
        >
          <h1 className="text-center text-4xl font-bold pb-12">Sign up</h1>
          <div>
            <TextField
              required
              {...register("username")}
              className="w-full"
              label="Username"
            />
          </div>
          <div className="mt-5">
            <FormControl className="w-full" variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                required
                {...register("password")}
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
          </div>
          <LoadingButton
            sx={{ bgcolor: "#6200ee", width: "100%", mt: "20px" }}
            variant="contained"
            type="submit"
            loading={loading}
          >
            Submit
          </LoadingButton>

          <p className="text-center py-5 leading-5 text-sm">
            Already signed up?{" "}
            <Link to="/login" className="underline text-[#6200ee]">
              Go to sign in.
            </Link>
          </p>
        </form>
      </div>
    </Fragment>
  );
};

export default LoginPage;
