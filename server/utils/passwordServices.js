import bcrypt from "bcrypt";

const encryptPassword = async (rawPassword) => {
  try {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(rawPassword, salt);
    return hashedPassword;
  } catch (error) {
    console.log("error hashing password :>> ", error);
    return null;
  }
};

const isPasswordCorrect = async (rawPassword, hashedPassword) => {
  const isPasswordMatched = await bcrypt.compare(rawPassword, hashedPassword);

  if (isPasswordMatched) return true;
  if (!isPasswordMatched) return false;
};

export { encryptPassword, isPasswordCorrect };
