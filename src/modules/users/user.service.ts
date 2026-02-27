import { logger } from "../../utils/logger";
import { CreateUserDTO } from "./dto/create-user-dto";
import { User } from "./user.model";
export const registerUserService = async (data: CreateUserDTO) => {
  const { name, email, password, avatar } = data;
  try {
    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
      throw {
        status: 400,
        message: "User already exist",
      };
    }
    const user = {
      name,
      email,
      password,
      ...(avatar ? { avatar } : {}),
    };
    return await User.create(user);
  } catch (err: any) {
    logger.error({
      message: "registerUserService failed",
      email,
      error: err,
    });
    throw err;
  }
};
