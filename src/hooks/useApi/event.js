import useApi from "./index";

export function useGetEventInfo() {
  return useApi({
    method: "get",
    url: "/event"
  });
}
