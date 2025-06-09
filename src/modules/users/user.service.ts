import { handleCatch, handleCustomError, handleSuccess } from "../../common/error-handlers";
import UsersModel from "../../models/users.models";
import { ISignupDTO, ILoginDto } from "../../interfaces/users.interface";
import { comparePassword,generateToken } from "../../common/helper";

export class UserService {
    private static options = { lean: true, sort: { _id: -1 } }

    static async signup(body: ISignupDTO) {
        try {
            let { email, password, full_name } = body;
            let query = { email: email?.toLowerCase() }
            let isUser = await UsersModel.findOne(query, {}, this.options);
            if (isUser) handleCustomError("email_already_exists");
            let data_to_save = {
                email: email?.toLowerCase(),
                password,
                full_name,
                created_at: Date.now(),
            }
            let response = (await UsersModel.create(data_to_save)).toJSON();
            delete response?.password
            let result = { message: "Signup successfully", data: response }
            return result
        } catch (error) {
            throw error
        }
    }

    static async login(body: ILoginDto) {
        try {
            let { email, password } = body;
            let query = { email: email?.toLowerCase() }
            let isUser = await UsersModel.findOne(query, {__v:0}, this.options);
            if (!isUser) handleCustomError("user_not_found");
            const user = isUser!;
            const isMatch = await comparePassword(password, user?.password!);
            if(!isMatch) handleCustomError("invalid_password");
            const access_token = await generateToken(user?._id ,user?.email);          
            delete user?.password
            user.access_token = access_token
            let result = { message: "Login successfully", data: user }
            return result
        } catch (error) {
            throw error
        }
    }
}