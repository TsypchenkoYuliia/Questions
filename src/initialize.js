

export const Ininialize = () => {

    let questions = JSON.parse(localStorage.getItem("questions"));

    if (questions === null || questions.length == 0) {
        questions = [];
        localStorage.setItem("questions", JSON.stringify(questions));
    }

    let topics = JSON.parse(localStorage.getItem("topics"));

    if (topics === null || topics.length == 0) {
        topics = [];       
        localStorage.setItem("topics", JSON.stringify(topics));
    }

    return Ininialize;
};