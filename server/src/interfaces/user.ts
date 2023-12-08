import mongoose from 'mongoose';

export interface IUserDTO{
    fullName: string;
    email: string;
    password: string;
    role: 'ANALYST' | 'ADMIN' | 'USER';
    favoriteTeamID?: number;
    goatID?: number;
    followers?: string[];
    followings?: string[];
}

export interface IUser extends mongoose.Document, IUserDTO{
}