import { useState } from "react";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleUsername(e) {
    setUsername(e.target.value);
  }

  function handlePassword(e) {
    setPassword(e.target.value);
  }

  function login(e) {
    e.preventDefault();
    console.log(username);
    console.log(password);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 px-6 py-12 sm:mt-0 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md bg-white shadow-lg rounded-xl p-8 md:p-10">
        <div className="text-center">
          <img
            alt="Your Company"
            src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
            className="mx-auto h-12 w-auto"
          />
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-800">
            Welcome to Sales CRM
          </h2>
          <p className="mt-2 text-lg text-gray-600">
            Manage your sales like never before. Log in to start.
          </p>
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
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={handlePassword}
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-gray-50 border border-gray-300 px-4 py-2 text-base text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm sm:text-sm"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-indigo-600 text-white text-lg font-semibold rounded-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-200"
              >
                Log In
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
              className="font-medium text-yellow-400 hover:text-yellow-300"
            >
              SMARTITBOX
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
