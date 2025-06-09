import { Types } from 'mongoose';
import { appConfig } from '../config/app.config';
import * as bcrypt from 'bcrypt';
import * as Jwt from 'jsonwebtoken';
import { defaultLimit } from './app_constant';

const bcryptPassword = (password: string) => {
    try {
        const hash = bcrypt.hashSync(password, +appConfig.saltRounds);
        return hash
    } catch (error) {
        throw error
    }
}

const comparePassword = async (password: string, hash: string) => {
    try {
        const decryt = bcrypt.compareSync(password, hash);
        return decryt
    }
    catch (err) {
        throw err;
    }
}

const generateToken = async (
    _id: Types.ObjectId | string,
    email: string) => {
    return Jwt.sign(
        { _id, email },
        appConfig.JWT_ACCESS_SECRET as string,
        {
            expiresIn: '1d'
        }
    )  as string;
}

const setOptions = (pagination?: string | number, limit?: string | number) => {
    const parsePositiveInt = (val: string | number | undefined, defaultVal: number): number => {
        if (val === undefined) return defaultVal;
        const parsed = parseInt(String(val));
        return parsed > 0 ? parsed : defaultVal;
    };

    const finalLimit = parsePositiveInt(limit, pagination !== undefined ? defaultLimit : 10);
    const finalPagination = parsePositiveInt(pagination, 0);

    return {
        lean: true,
        sort: { _id: -1 },
        limit: finalLimit,
        skip: pagination !== undefined ? finalPagination * finalLimit : 0
    };
};

export {
    bcryptPassword,
    comparePassword,
    generateToken,
    setOptions
}