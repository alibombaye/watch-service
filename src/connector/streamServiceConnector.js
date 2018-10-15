import { StreamNotRecognisedError } from "../errors/errors";

const streams = {
    1: {
        name: 'UFC 229'
    },
    2: {
        name: 'Anthony Joshua vs Tyson Fury'
    },
    3: {
        name: 'UFC 230'
    },
    4: {
        name: 'Premier League: Chelsea vs Liverpool'
    },
    5: {
        name: 'Ashes First Test day 3'
    }
};

export const findStream = streamId => {
    const stream = streams[streamId];

    if (stream) {
        return true;
    }
    throw new StreamNotRecognisedError('not a recognised stream');
};
