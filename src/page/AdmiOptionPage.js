import Admioption from "../components/admioption";
import Sidebar from "../components/sidebar";
import useAuth from "../hooks/useAuth";

const AdmiOptionPage = () => {
  const isOnListM = useAuth();

  console.log(isOnListM);
  return (
    <div>
      <Sidebar component={Admioption} />
    </div>
  );
};

export default AdmiOptionPage;
