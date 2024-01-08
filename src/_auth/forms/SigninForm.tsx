import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { signinSchema } from "@/lib/validation";
import { useState } from "react";

import { useSignInAccount } from "@/lib/react-query/queriesAndMutations";
import { useToast } from "@/components/ui/use-toast";
import { useUserContext } from "@/context/AuthContext";

const SigninForm = () => {
  const [isLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { checkAuthUser } = useUserContext();
  const { mutateAsync: signInAccount } = useSignInAccount();

  const form = useForm<z.infer<typeof signinSchema>>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof signinSchema>) {
    console.log(values);

    const session = await signInAccount({
      email: values.email,
      password: values.password,
    });
    console.log(session);
    const isLoggedIn = await checkAuthUser();

    if (isLoggedIn) {
      form.reset();
      navigate("/");
    } else {
      toast({ title: "Signup Failed" });
      return;
    }
    console.log(values);
  }

  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">
        <img src="/assets/images/logo.svg" alt="logo" />
        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">Login</h2>
        <p className="text-light-3 small-medium md:base-regular">
          To use SnapGram kindly sign in
        </p>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex-col gap-5 w-full mt-4"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" className="shad-input" {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="shad-button_primary w-240">
            {isLoading ? (
              <div className="flex-center gap-2">
                <Loader /> Loading
              </div>
            ) : (
              "Login"
            )}
          </Button>
          <p className="text-small-regular text-light-2 text-center mt-2">
            Dont have an account?{" "}
            <Link
              to={"/sign-up"}
              className="text-primary-500 text-small-semibold ml-1"
            >
              SignUp
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
};
export default SigninForm;
function checkAuthUser() {
  throw new Error("Function not implemented.");
}
