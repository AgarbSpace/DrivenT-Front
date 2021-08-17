import { Route, Redirect } from "react-router-dom";

export default function ConditionalRoute({ check=() => [], ...props  }) {
  const validations = check();

  for (const condition of validations) {
    if (!condition.check()) {
      return (
        <Redirect to={condition.to} />
      );
    }
  }

  return <Route {...props} />
}
