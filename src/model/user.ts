import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstname: {
        type: 'string',
        required: true,
    },
    lastname: {
        type: 'string',
        required: true,
    },
    companyName: {
        type: 'string',
    },
    about: {
        type: 'string',
    },
    email: {
        type: 'string',
        required: true,
        unique: true,
    },
    password: {
        type: 'string',
        required: true,
    },
    accountBalance: {
        type: 'number',
        defaultValue: 0
    },
    totalIncome: {
        type: 'number',
        defaultValue: 0
    },
    totalExpenses: {
        type: 'number',
        defaultValue: 0
    },
    netProfit: {
        type: 'number',
        defaultValue: 0
    },
    profilePhoto: {
        type: 'string',
    }
}, { timestamps: true });

export const UserModel = mongoose.model('User', UserSchema);
