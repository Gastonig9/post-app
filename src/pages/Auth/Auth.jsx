import { useParams } from "react-router-dom";
import FormAuth from "../../components/FormAuth/FormAuth";

const Auth = () => {
  const { action } = useParams();
  return (
    <div className="auth-contain">
      {action === "login" ? <FormAuth choose={false} /> : <FormAuth choose={true} /> }
    </div>
  );
};

export default Auth;
