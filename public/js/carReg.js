import axios from "axios";
import { showAlert } from "./alert";

export const beforePayment = async (data) => {
  console.log(data.getAll("proofOfOwnership"));
    try{

        const res = await axios({
          method: "POST",
          url: "/api/vehicles",
          data: {
            vehicleType: data.getAll("vehicleType")[0],
            plateNumber: data.getAll("plateNumber")[0],
            proofOfOwnership: data.getAll("proofOfOwnership")[0],
          },
        });

        if (res.data.status === "success") {
          showAlert("success", "Proceed to payment to complete vehicle registration");
          window.setTimeout(() => {
            location.assign("/user/payment");
          }, 1500);
        }
    }catch(err) {
        showAlert("error", err.response.data.message);
        console.log(err.response.data.message);
    }
}

export const registerVehicle = async (amount) => {
  try {
    const res = await axios({
      method: "POST",
      url: "/api/payment",
      data: {
        amount
      },
    });

    if (res.data.status === "success") {
        showAlert("success", "Vehicle registration Complete");
        window.setTimeout(() => {
          location.assign("/user/dashboard");
        }, 1500);
    }
  } catch (err) {
    showAlert("error", err.response.data.message);
    console.log(err.response.data.message);
  }
};
