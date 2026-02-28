import { logger } from "../../utils/logger";
import { CreateUserDTO } from "./dto/create-user-dto";
import config from "config";
import gravatar from "gravatar";
import bcrypt from "bcryptjs";
import { User } from "./user.model";
import jwt from "jsonwebtoken";

export const registerUserService = async (data: CreateUserDTO) => {
  const { name, email, password } = data;
  try {
    let user = await User.findOne({ email });
    if (user) {
      throw {
        status: 400,
        message: "User already exist",
      };
    }
    let avatarUrl =
      data.avatar ||
      gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm",
      });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    user = new User({
      name,
      email,
      password: hashedPassword,
      avatar: avatarUrl,
    });

    await user.save();
    const payload = {
      user: {
        id: user.id,
      },
    };
    const token = jwt.sign(payload, config.get("jwtSecret") as string, {
      expiresIn: 36000,
    });
    return { token };
  } catch (err: any) {
    logger.error({
      message: "registerUserService failed",
      email,
      error: err,
    });
    throw err;
  }
};
