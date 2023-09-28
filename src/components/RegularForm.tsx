
import { useForm, SubmitHandler } from "react-hook-form";
import { ChangeEvent } from 'react';

interface FormData {
  username: string;
  email: string;
  password: string;
}

function RegularForm() {
  const { register, handleSubmit, formState: { errors }, setError } = useForm<FormData>();

  const isEmailValid = (email: string) => {
    
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  }; 

  const onSubmit: SubmitHandler<FormData> = (data) => {
    
    if (!isEmailValid(data.email)) {
      setError("email", {
        type: "manual",
        message: "Invalid email format", 
      });
      return;
    }

    if (data.password.length < 8) {
      setError("password", {
        type: "manual",
        message: "Password must be at least 8 characters long", 
      });
      return;
    }

    console.log(data);
    alert("username:"+data.username+"  ema:  "+data.email+" pass:"+data.password)
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>React Hook Form</h1>
      <div>
        <input
          {...register("username", { required: true })}
          type="text"
          id="username"
          name="username"
          placeholder="Enter UserName"
        />
        {errors.username && <p>This field is required</p>}
      </div>
      <div>
        <input
          {...register("email", { required: true })}
          type="text"
          id="email"
          name="email"
          placeholder="Enter Email"
        />
        {errors.email && <p>{errors.email.message}</p>}
      </div>
      <div>
        <input
          {...register("password", { required: true })}
          type="password" 
          id="password"
          name="password"
          placeholder="Enter Password"
        />
        {errors.password && <p>{errors.password.message}</p>}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default RegularForm;
