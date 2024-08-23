import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Main = () => {
  const navigate = useNavigate();

  const verifyUser = () => {
    const token = localStorage.getItem("authToken");
    if (!token) return navigate("/login");

    navigate("/home");
  };

  useEffect(() => {
    verifyUser();
  }, []);

  return <div className="flex items-center justify-center">Loading...</div>;
};
