import { UserNotRecognisedError } from "../errors/errors";

const users = {
    1: {
        name: 'Thanos'
    },
    2: {
        name: 'Iron man'
    },
    3: {
        name: 'Spiderman'
    }
};


export const findUser = userId => {
    const user = users[userId];

    if (user) {
        return true;
    }
    throw new UserNotRecognisedError('not a recognised user');
}