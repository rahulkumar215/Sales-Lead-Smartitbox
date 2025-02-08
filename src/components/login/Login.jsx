import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Bars } from "react-loader-spinner";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const loginUser = async () => {
    setIsLoading(true);
    const url = "https://leads-management-backend.onrender.com/api/users/login";

    const loginData = {
      login: username,
      pswd: password,
    };

    try {
      const response = await axios.post(url, loginData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Login Success:", response.data);
      return response.data; // This will return the response with role and token
    } catch (error) {
      console.error(
        "Login Error:",
        error.response ? error.response.data : error.message
      );
      return null; // Return null in case of error
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  function handleUsername(e) {
    setUsername(e.target.value);
  }

  function handlePassword(e) {
    setPassword(e.target.value);
  }

  const login = async (e) => {
    e.preventDefault();
    if (username && password) {
      const userData = await loginUser(); // Await the login user response
      if (userData) {
        const { role, token, id } = userData;

        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
        localStorage.setItem("uid", id);

        if (role === "admin") {
          navigate("/users");
        } else if (role === "sales executive") {
          navigate("/sales-executive");
        } else if (role === "accounts") {
          navigate("/accounts");
        }
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 px-6 py-12 sm:mt-0 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md bg-white shadow-lg rounded-xl p-8 md:p-10">
        <div className="text-center">
          <img
            alt="Your Company"
            src="src/assets/img/logo.jpeg"
            className="mx-auto h-24"
          />
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-800">
            Welcome to Sales CRM
          </h2>
        </div>

        <div className="mt-8">
          <form onSubmit={login} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email or Username
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  value={username}
                  onChange={handleUsername}
                  required
                  className="block w-full rounded-md bg-gray-50 border border-gray-300 px-4 py-2 text-base text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm sm:text-sm"
                  placeholder="Enter your email or username"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
              </div>
              <div className="mt-2 relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={handlePassword}
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-gray-50 border border-gray-300 px-4 py-2 text-base text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm sm:text-sm"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-2 px-4 bg-indigo-600 flex items-center justify-center text-white text-lg font-semibold rounded-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-200 ${
                  isLoading && "!bg-indigo-400 cursor-not-allowed"
                }`}
              >
                {isLoading ? (
                  <Bars
                    height="25"
                    width="25"
                    color="#ffffff"
                    ariaLabel="bars-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                  />
                ) : (
                  "Log In"
                )}
              </button>
            </div>
          </form>
        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>
            Designed by{" "}
            <a
              href="https://smartitbox.in/"
              target="_blank"
              className="font-medium text-yellow-500 hover:text-yellow-400"
            >
              SMART ITBOX
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
