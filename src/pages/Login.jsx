import React from "react";
import { useNavigate } from "react-router-dom";


export default function Login() {
  const navigate = useNavigate();


  const handleLogin = (e) => {
    e.preventDefault();
    // Simulasi login sukses
    navigate("/dashboard");
  };


  return (
    <div className="min-h-screen bg-blue-500 flex items-center justify-center relative overflow-hidden">
      {/* SVG Background */}
      <svg
        width="1440"
        height="1070"
        viewBox="0 0 1440 1070"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-0 left-0 w-full h-full"
        style={{ zIndex: 0 }}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M272.5 1380.44C519.647 1380.44 720 1180.09 720 932.944C720 800.82 401.153 910.36 310.095 828.444C230.823 757.131 387.523 485.444 272.5 485.444C25.3526 485.444 -175 685.797 -175 932.944C-175 1180.09 25.3526 1380.44 272.5 1380.44Z"
          fill="#568AFF"
        />
        <path
          opacity="0.541829"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M864.469 -208.471C814.503 74.8982 1003.71 345.119 1287.08 395.085C1438.57 421.796 1377.44 34.0743 1489.77 -53.768C1587.56 -130.241 1867.38 104.351 1890.64 -27.5293C1940.6 -310.898 1751.39 -581.119 1468.02 -631.085C1184.66 -681.05 914.435 -491.84 864.469 -208.471Z"
          fill="#568AFF"
        />
        <path
          opacity="0.6"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M219.512 -233.502C-12.7303 -148.972 -132.476 107.822 -47.9461 340.065C-2.75693 464.221 259.396 252.235 372.979 298.067C471.861 337.967 417.534 646.864 525.62 607.523C757.863 522.994 877.608 266.2 793.079 33.9569C708.549 -198.286 451.755 -318.031 219.512 -233.502Z"
          fill="#568AFF"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M2006.38 1032.4C2061.52 719.665 1852.7 421.436 1539.96 366.292C1372.77 336.812 1440.24 764.72 1316.27 861.667C1208.34 946.066 899.512 687.159 873.848 832.709C818.703 1145.45 1027.53 1443.68 1340.26 1498.82C1653 1553.97 1951.23 1345.14 2006.38 1032.4Z"
          fill="#568AFF"
        />
      </svg>


      {/* Login Bubble */}
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md" style={{ zIndex: 1 }}>
        <h2 className="text-2xl font-semibold text-center mb-2">
          Login to Account
        </h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Please enter your email and password to continue
        </p>


        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              Email address:
            </label>
            <input
              type="email"
              id="email"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="ramadhan23si@mahasiswa.pcr.ac.id"
              required
            />
          </div>


          <div>
            <div className="flex justify-between items-center mb-1">
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <a href="#" className="text-sm text-blue-500 hover:underline">
                Forget Password?
              </a>
            </div>
            <input
              type="password"
              id="password"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="••••••••"
              required
            />
          </div>


          <div className="flex items-center space-x-2">
            <input type="checkbox" id="remember" className="h-4 w-4" />
            <label htmlFor="remember" className="text-sm text-gray-700">
              Remember Password
            </label>
          </div>


          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Sign In
          </button>
        </form>


        <p className="text-center text-sm text-gray-500 mt-6">
          Don’t have an account?{" "}
          <a href="#" className="text-blue-500 hover:underline">
            Create Account
          </a>
        </p>
      </div>
    </div>
  );
}
