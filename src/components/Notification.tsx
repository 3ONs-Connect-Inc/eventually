import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Notification = () => {
  return (
    <div className="fixed bottom-0 right-0 mb-4 mr-4">
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default Notification;