import Certificate from "../../components/Certificate";

export default function Dashboard() {
  return (
    <Certificate
      color={"#f77dae"}
      attendeeName={"Gustavo Barbosa Santos"}
      activities={["Palestra 1", "Palestra 2", "Palestra 3"]}
      startEventDate={"2021-08-20T20:30:00.000Z"}
      endEventDate={"2021-08-25T20:30:00.000Z"}
      workload={10}
      credentialNumber={"abcd-efgh-ijkl-mnop"}
    />
  );
}
