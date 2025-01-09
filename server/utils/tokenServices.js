import jwt from "jsonwebtoken";

const generateToken = (userId) => {
  const payload = {
    sub: userId,
  };

  const options = {
    expiresIn: "1day",
    audience: "App users",
  };

  //! CHANGE THIS TO AN ENV SECRET
  const secretKey = "some very complicated password";

  const token = jwt.sign(payload, secretKey, options);
  return token;
};

export { generateToken };
