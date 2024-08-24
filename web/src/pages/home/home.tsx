import { GlobalMap } from "../../components/global-map";
import Navbar from "../../components/nav-bar";

export const Home = () => {
  return (
    <div className="h-full w-full">
      <Navbar />
      <GlobalMap />
    </div>
  );
};
