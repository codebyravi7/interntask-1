import { useParams } from "react-router-dom";
import EmployeeProfile from "../components/EmployeeProfile";

const ProfilePage = () => {
  const { id } = useParams();
  return <EmployeeProfile employeeId={id} />;
};

export default ProfilePage;
