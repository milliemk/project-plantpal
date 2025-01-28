import jwt from "jsonwebtoken";

const generateToken = (userId) => {
  const payload = {
    sub: userId,
  };

  const options = {
    expiresIn: "1day",
    audience: "App users",
  };

  const secretKey = process.env.PASSPORT_SECRET_KEY;

  const token = jwt.sign(payload, secretKey, options);
  return token;
};

export { generateToken };
