import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import BarChart from "../../components/Charts/BarChart/BarChart";
import PieChart from "../../components/Charts/PieChart/PieChart";
import { getTasks } from "../../features/tasks/tasksSlice";
import { useNavigate } from "react-router-dom";
import Count from "../../components/Charts/CountChart/Count";

function StatsContainer() {
  let navigate = useNavigate();
  const tasksList = useSelector(getTasks);

  const [dataPieChart, setDataPieChart] = useState([]);
  const [dataBarChart, setDataBarChart] = useState([]);
  const [data, setData] = useState({});

  useEffect(() => {
    const helperObject = {
      TODO: 0,
      IN_PROGRESS: 0,
      DONE: 0,
    };
    tasksList?.forEach((task) => {
      helperObject[task?.taskStatus] = helperObject[task?.taskStatus] + 1;
    });
    if (
      helperObject["TODO"] === 0 &&
      helperObject["IN_PROGRESS"] === 0 &&
      helperObject["DONE"] === 0
    ) {
      navigate("/");
    }
    setDataBarChart([
      { name: "Todo", status: helperObject["TODO"] },
      { name: "In progress", status: helperObject["IN_PROGRESS"] },
      { name: "Done", status: helperObject["DONE"] },
    ]);
    setDataPieChart([
      { name: "Todo", value: helperObject["TODO"] },
      { name: "In progress", value: helperObject["IN_PROGRESS"] },
      { name: "Done", value: helperObject["DONE"] },
    ]);
    setData(helperObject);
  }, [tasksList, navigate]);

  return (
    <>
      <div className="flex flex-col items-center gap-[15px] mt-[45px] mb-[120px] lg:flex-row justify-center">
        <Count label="TODO" count={data["TODO"]} />
        <Count label="In progress" count={data["IN_PROGRESS"]} />
        <Count label="Done" count={data["DONE"]} />
      </div>

      <div>
        <div className="flex flex-col truncate justify-center lg:h-[350px] lg:flex-row">
          <div className="basis-1/3">
            <BarChart data={dataBarChart} />
          </div>
          <div className="basis-1/3">
            <PieChart data={dataPieChart} />
          </div>
        </div>
      </div>
    </>
  );
}

export default StatsContainer;
