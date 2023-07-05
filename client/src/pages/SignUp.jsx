import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

function SignUp() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // Handle login logic here
    console.log(data);
    navigate("/profile");
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          {/* Email */}
          <div className="flex justify-between">
            <label htmlFor="email" className="text-sm font-roboto_bold">
              Email address <br />
            </label>
            {errors.email && (
              <p className="text-sm text-red-600">Valid email required</p>
            )}
          </div>
          <input
            id="email"
            {...register("email", {
              required: "This field is required",
              pattern: /^(.+)@(.+)$/,
              onBlur: () => setValue("email", getValues("email").trim()),
            })}
            className={`w-full max-w-md rounded-lg mt-2 mb-4 p-3 border-gray-400 border-2 focus:border-black ${
              errors.email && "bg-[#FFE8E5] text-red-600"
            }`}
            type="text"
            placeholder="email@gmail.com"
          />
          {/* User Name */}
          <div className="flex justify-between">
            <label htmlFor="username" className="text-sm font-roboto_bold">
              Username <br />
            </label>
            {errors.username && (
              <p className="text-sm text-red-600">Valid username required</p>
            )}
          </div>
          <input
            id="username"
            {...register("username", {
              required: "This field is required",
              onBlur: () => setValue("username", getValues("username").trim()),
            })}
            className={`w-full max-w-md rounded-lg mt-2 mb-4 p-3 border-gray-400 border-2 focus:border-black ${
              errors.username && "bg-[#FFE8E5] text-red-600"
            }`}
            type="text"
            placeholder="Full Name"
          />
          {/* Password */}
          <div className="flex justify-between">
            <label htmlFor="password" className="text-sm font-roboto_bold">
              Password <br />
            </label>
            {errors.password && (
              <p className="text-sm text-red-600">Valid Password required</p>
            )}
          </div>
          <input
            id="password"
            type="password"
            {...register("password", {
              required: "This field is required",
              // pattern:
            })}
            className={`w-full max-w-md rounded-lg mt-2 mb-4 p-3 border-gray-400 border-2 focus:border-black ${
              errors.password && "bg-[#FFE8E5] text-red-600"
            }`}
            placeholder="password"
          />
          <input
            type="submit"
            value="Sign Up"
            className="w-full max-w-md rounded-lg bg-black hover:bg-gradient-to-r hover:from-[#FF5379] hover:to-[#FF693E] text-white text-sm p-4"
          />
        </form>
      </div>
    </div>
  );
}

export default SignUp;
