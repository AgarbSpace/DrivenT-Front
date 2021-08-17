import useApi from "./index";

export function useEnroll(email, password) {
  return useApi({
    method: "post",
    url: "/enrollments",
    body: {
      email,
      password
    }
  }, false);
}
