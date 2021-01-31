export const UpdateCollection = (collectionName, data) => {
    localStorage.setItem(collectionName, JSON.stringify(data));
};

export const GetCollection = (collectionName) => {
    return JSON.parse(localStorage.getItem(collectionName));
};



