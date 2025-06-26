import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../store/slices/userSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [role, setRole] = useState("admin");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function validateSignUp() {
    if (!email.length) {
      toast.error("Email is required");
      return false;
    }
    if (!password.length) {
      toast.error("Password is required");
      return false;
    }
    if (password !== confirmPass) {
      toast.error("Password and confirm password must be same!!!");
      return false;
    }
    return true;
  }

  const validateLogin = () => {
    if (!email.length) {
      toast.error("Email is required");
      return false;
    }
    if (!password.length) {
      toast.error("Password is required");
      return false;
    }
    return true;
  };

  function validMail(email) {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (re.test(email)) {
      return true;
    } else {
      toast.error("Invalid email address");
      return false;
    }
  }

  async function signupfn() {
    if (validateSignUp()) {
      let valid = validMail(email);
      if (valid) {
        try {
          const res = await axios.post(
            "http://localhost:5000/api/register",
            {
              name: name,
              email: email,
              password: password,
              role: role,
            },
            { withCredentials: true }
          );
          if (res.status === 201) {
            toast.success("User registered Successfully");
            dispatch(loginUser(res.data.user));
            navigate("/home");
          }
        } catch (err) {
          toast.error("Error in Signing up");
        } finally {
          setName("");
          setEmail("");
          setPassword("");
          setRole("admin");
          setConfirmPass("");
        }
      }
    }
  }

  async function loginfn() {
    if (validMail(email) && password.length) {
      if (validateLogin()) {
        try {
          const res = await axios.post(
            "http://localhost:5000/api/login",
            {
              email: email,
              password: password,
            },
            {
              withCredentials: true,
            }
          );
          if (res.status === 200) {
            toast.success("Login Successful!!");
            dispatch(loginUser(res.data.user));
            navigate("/home");
          }
        } catch (err) {
          toast.error("Error Logging in...");
        } finally {
          setEmail("");
          setPassword("");
        }
      }
    }
  }

  return (
    <div className="min-h-screen bg-[#f8f1e4] flex items-center justify-center font-oldpaper text-[#2e2e2e] p-4">
      <div className="w-full max-w-md bg-[#fdfaf4] border border-[#d6c6a8] rounded-sm p-8 shadow-sm">
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="bg-[#8b5e3c] rounded flex">
            <TabsTrigger
              value="login"
              className="w-[305px] text-white data-[state=active]:bg-[#5a3b2a] data-[state=active]:font-semibold p-3 transition-colors duration-300 rounded-l"
            >
              Login
            </TabsTrigger>
            <TabsTrigger
              value="signup"
              className="w-1/2 text-white data-[state=active]:bg-[#5a3b2a] data-[state=active]:font-semibold p-3 transition-colors duration-300 rounded-r"
            >
              SignUp
            </TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="pt-6">
            <label htmlFor="email" className="block mb-1 font-semibold text-[#5e4b3c]">
              Email Address:
            </label>
            <Input
              id="email"
              type="text"
              value={email}
              className="mb-4"
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="password" className="block mb-1 font-semibold text-[#5e4b3c]">
              Password:
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              className="mb-6"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              className="w-full bg-[#8b5e3c] hover:bg-[#5a3b2a] text-white font-semibold"
              onClick={loginfn}
            >
              Login
            </Button>
          </TabsContent>

          <TabsContent value="signup" className="pt-6">
            <label htmlFor="name" className="block mb-1 font-semibold text-[#5e4b3c]">
              Username:
            </label>
            <Input
              id="name"
              type="text"
              value={name}
              className="mb-4"
              onChange={(e) => setName(e.target.value)}
            />

            <label htmlFor="email" className="block mb-1 font-semibold text-[#5e4b3c]">
              Email:
            </label>
            <Input
              id="email"
              type="text"
              value={email}
              className="mb-4"
              onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor="password" className="block mb-1 font-semibold text-[#5e4b3c]">
              Password:
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              className="mb-4"
              onChange={(e) => setPassword(e.target.value)}
            />

            <label htmlFor="confirmpassword" className="block mb-1 font-semibold text-[#5e4b3c]">
              Confirm Password:
            </label>
            <Input
              id="confirmpassword"
              type="password"
              value={confirmPass}
              className="mb-4"
              onChange={(e) => setConfirmPass(e.target.value)}
            />

            <RadioGroup
              value={role}
              onValueChange={(value) => setRole(value)}
              className="flex flex-row space-x-6 mb-6"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="admin" id="option-admin" />
                <Label htmlFor="option-admin">Admin</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="user" id="option-user" />
                <Label htmlFor="option-user">User</Label>
              </div>
            </RadioGroup>

            <Button
              className="w-full bg-[#8b5e3c] hover:bg-[#5a3b2a] text-white font-semibold"
              onClick={signupfn}
            >
              Register
            </Button>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Login;
