import { icons } from "../../assets";

const Home = () => {
  return (
    <div className=" flex flex-col flex-1">
      <div className=" relative">
        <img
          src={icons.bgHome}
          alt="bg-home"
          className="bg-fix w-full"
          style={{ filter: "blur(2px)" }}
        />
        <p
          className=" font-extrabold text-white absolute w-[800px] text-5xl ml-20 ease-in-out"
          style={{ top: "40%" }}
        >
          Requires 100% Commitment To Your Holiday
        </p>
      </div>
    </div>
  );
};

export default Home;
