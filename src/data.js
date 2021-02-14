export const UpdateCollection = (collectionName, data) => {
    localStorage.setItem(collectionName, JSON.stringify(data));
};

export const GetCollection = (collectionName) => {
    return JSON.parse(localStorage.getItem(collectionName));
};

export const GetCurrentUser = () => {
    return localStorage.getItem("userName");
};

export const GetQuestion = (id) => {
    let collection = GetCollection("questions");
    return collection.find(x => x.id == id);
};

export const GetCollectionByFilter = (collectionName, filter) => {

    let collection  = JSON.parse(localStorage.getItem(collectionName));

    switch(filter) {
        case 'popular':
          return collection.filter(x=>x.answers.length > 1);
        case 'unanswered':
          return collection.filter(x=>x.answers.length === 0);
        default:
          return collection;
      }
};



