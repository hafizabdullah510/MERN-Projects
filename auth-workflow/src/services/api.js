import axios from "axios";

const url = "/api/v1/auth";

export const verifyEmail = async (verificationToken, email) => {
  try {
    return await axios.post(`${url}/verify-email`, {
      verificationToken,
      email,
    });
  } catch (err) {
    console.log(err);
  }
};
