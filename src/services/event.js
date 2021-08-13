import useApi from "../hooks/useApi";

export function getInfo() {
  return useApi({
    method: "get",
    url: "/event"
  });
}
