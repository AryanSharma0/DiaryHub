import React, { useEffect, useState } from "react";

function DateSection() {
  const [time, setTime] = useState(getCurrentTime());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(getCurrentTime());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  function getCurrentTime() {
    const now = new Date();
    return {
      date: now.getHours(),
      month: now.getMonth(),
      year: now.getFullYear(),
      hour: now.getHours(),
      sec: now.getSeconds(),
      min: now.getMinutes(),
    };
  }
  return (
    <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
      <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
        <span className="countdown font-mono text-4xl">
          <span>{time.hour}</span>
        </span>
        Hours
      </div>
      <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
        <span className="countdown font-mono text-4xl">
          <span>{time.min}</span>
        </span>
        Minutes
      </div>
      <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
        <span className="countdown font-mono text-4xl">
          <span>{time.sec}</span>
        </span>
        Second
      </div>
    </div>
  );
}

export default DateSection;
