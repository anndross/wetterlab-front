const backendBasePath =
  process.env.NODE_ENV === "production"
    ? "http://34.23.51.63/api/:path*"
    : "http://127.0.0.1:8000/api/:path*";

export default backendBasePath;
