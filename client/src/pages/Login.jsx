import { Button } from "@/components/ui/button";
import React from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import LogInBG from "../assets/login_BG.jpg";
// import LogInBG from "../assets/Login-BG.jpg";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useRegisterUserMutation,
  useLoginUserMutation,
} from "@/features/api/authApi";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [loginInput, setLoginInput] = React.useState({
    email: "",
    password: "",
  });
  const [signupInput, setSignupInput] = React.useState({
    name: "",
    email: "",
    password: "",
  });
  const [isSignupAction, setIsSignupAction] = React.useState(false);
  const [isLoginAction, setIsLoginAction] = React.useState(false);

  const [
    registerUser,
    {
      data: registerData,
      error: registerError,
      isLoading: registerIsLoading,
      isSuccess: registerIsSuccess,
    },
  ] = useRegisterUserMutation();
  const [
    loginUser,
    {
      data: loginData,
      error: loginError,
      isLoading: loginIsLoading,
      isSuccess: loginIsSuccess,
    },
  ] = useLoginUserMutation();
  const navigate = useNavigate();

  const handlerChangeInput = (e, type) => {
    const { name, value } = e.target;
    if (type === "signup") {
      setSignupInput({ ...signupInput, [name]: value });
    } else {
      setLoginInput({ ...loginInput, [name]: value });
    }
  };

  const handlerRegistration = async (type) => {
    const inputData = type === "signup" ? signupInput : loginInput;
    const action = type === "signup" ? registerUser : loginUser;
    if (type === "signup") {
      setIsSignupAction(true);
      setIsLoginAction(false);
    } else {
      setIsSignupAction(false);
      setIsLoginAction(true);
    }
    await action(inputData);
    if (type === "signup" && registerIsSuccess) {
      setSignupInput({ name: "", email: "", password: "" });
    }
  };

  React.useEffect(() => {
    if (isSignupAction && registerIsSuccess && registerData) {
      toast.success(registerData.message || "Signup Successful");
      setIsSignupAction(false); // Reset action state
    }

    if (isSignupAction && registerError) {
      toast.error(registerError.data.message || "Signup Failed");
      setIsSignupAction(false); // Reset action state
    }

    if (isLoginAction && loginIsSuccess && loginData) {
      toast.success(loginData.message || "Login Successful");
      navigate("/");
      setIsLoginAction(false); // Reset action state
    }

    if (isLoginAction && loginError) {
      toast.error(loginError.data.message || "Login Failed");
      setIsLoginAction(false); // Reset action state
    }
  }, [
    registerData,
    registerError,
    loginData,
    loginError,
    isSignupAction,
    isLoginAction,
  ]);

  return (
    <div
      className="flex flex-col items-center justify-center h-screen"
      style={{
        backgroundImage: `url(${LogInBG})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <Tabs className="w-[400px]" defaultValue="login">
        <TabsList
          className="grid w-full grid-cols-2"
          style={{
            backgroundColor: "transparent",
            backdropFilter: "blur(10px)",
            border: "1px solid white",
          }}
        >
          <TabsTrigger value="signup">Signup</TabsTrigger>
          <TabsTrigger value="login">Login</TabsTrigger>
        </TabsList>
        <TabsContent value="signup">
          <Card
            className="text-white backdrop-blur-lg"
            style={{ backgroundColor: "transparent" }}
          >
            <CardHeader>
              <CardTitle>Signup</CardTitle>
              <CardDescription className="text-white">
                If you don&lsquo;t have an account, you can create a new account
                here.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <Input
                  type="text"
                  onChange={(e) => handlerChangeInput(e, "signup")}
                  id="name"
                  name="name"
                  value={signupInput.name}
                  placeholder="Enter your name"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={signupInput.email}
                  onChange={(e) => handlerChangeInput(e, "signup")}
                  placeholder="Enter your email"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  value={signupInput.password}
                  onChange={(e) => handlerChangeInput(e, "signup")}
                  placeholder="Enter your password"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                disabled={registerIsLoading}
                onClick={() => handlerRegistration("signup")}
              >
                {registerIsLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Please
                    Wait
                  </>
                ) : (
                  "Signup"
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="login">
          <Card
            className="text-white backdrop-blur-lg"
            style={{ backgroundColor: "transparent" }}
          >
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription className="text-white">
                If you already have an account, you can log in here.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  value={loginInput.email}
                  onChange={(e) => handlerChangeInput(e, "login")}
                  placeholder="Enter your email"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  value={loginInput.password}
                  onChange={(e) => handlerChangeInput(e, "login")}
                  placeholder="Enter your password"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                disabled={loginIsLoading}
                onClick={() => handlerRegistration("login")}
              >
                {loginIsLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-3 animate-spin" /> Please
                    Wait
                  </>
                ) : (
                  "Login"
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Login;
