import { Route, Redirect } from "react-router-dom";

export default function ConditionalRoute({ check=[], ...props  }) {
  for (const condition of check) {
    if (!condition.check()) {
      return (
        <Redirect to={condition.to} />
      );
    }
  }

  return <Route {...props} />
}
