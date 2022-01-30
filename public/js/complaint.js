import axios from "axios";
import { showAlert } from "./alert";


export const layComplaint = async (complaintSubject, complaint) => {
    try{
        const res = await axios({
          method: "POST",
          url: "/api/complaints",
          data: {
            complaintSubject,
            complaint
          },
        });

        if (res.data.status === "success") {
          showAlert("success", "Complaint sent successfully");
          window.setTimeout(() => {
            location.assign("/user/dashboard");
          }, 1500);
        }
    }catch(err) {
        showAlert("error", err.response.data.message);
        console.log(err.response.data.message);
    }
}