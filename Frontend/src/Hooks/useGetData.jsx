import { useSelector } from "react-redux";

export const useGetData = (reducer, id) => {
  const { data } = useSelector((state) => state[reducer]);
  console.log(data);
  const element = data.filter((element) => element._id === id);
  return element[0];
};
