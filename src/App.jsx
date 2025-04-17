import { useEffect, useState } from "react";
import { Landscape } from "../public/assets/landscape";
import Day from "./components/day";
import Night from "./components/night";

import { BsMoonStarsFill } from "react-icons/bs";
import { MdOutlineWbSunny } from "react-icons/md";

import moment from "moment";

function App() {
  const [isDay, setIsDay] = useState(true);

  // Check time on initial render and set up interval
  useEffect(() => {
    // Initial check
    const checkTime = () => {
      const currentHour = moment().hours();
      setIsDay(currentHour >= 6 && currentHour < 19); // Daytime between 6AM and 6PM
    };

    checkTime(); // Check immediately

    // Set up interval to check every minute
    const intervalId = setInterval(checkTime, 60000);

    // Clean up interval on unmount
    return () => clearInterval(intervalId);
  }, []);

  const handleTime = () => {
    setIsDay(!isDay);
  };

  useEffect(() => {
    document.body.className = isDay ? "day-theme" : "night-theme";
  }, [isDay]);
  return (
    <main>
      <div className="config">
        <div
          className={`toggle_btn cursor ${isDay ? "" : "toogle_btn__moon"}`}
          onClick={handleTime}
        >
          {isDay ? (
            <MdOutlineWbSunny className="icon_btn icon_sun" />
          ) : (
            <BsMoonStarsFill className="icon_btn" />
          )}
        </div>

        {/* <img
          src="../public/assets/clock_checked_slice.png"
          alt=""
          height={50}
          className="cursor"
        /> */}
      </div>
      <div className={`world ${isDay ? "" : "world_night"}`}>
        {isDay ? <Day /> : <Night />}
        <Landscape />
      </div>
    </main>
  );
}

export default App;
