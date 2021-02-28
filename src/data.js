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
        case 'recent':
          return collection;
          case 'topic':
            let array = [];
            filter = localStorage.getItem("filterTopic");
            collection.map((item)=> {
                let s = item.topics?.filter(t=>t === filter);
                    if(s?.length > 0)
                    {
                        array.push(item);
                    }
            });
            return array;
        default:
            return collection;
      }
};



