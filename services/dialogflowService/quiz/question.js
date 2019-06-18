const List = require('../../../models/list');

// question intent
const question = async agent => {
    console.log("inetent triggerd: question")
    // console.log(agent.context.get('intent_oefenen'))
    // get parameters from oefening-followup context
    const listIdContext = agent.context.get('intent_oefenen');
    const vraagContext = agent.context.get("vraag-context") ? agent.context.get("vraag-context") : undefined
    const correctAnswers = vraagContext.parameters ? vraagContext.parameters.correctAnswers : 0;
    let currentQuestion= vraagContext.parameters ? vraagContext.parameters.currentQuestion : 0;
    console.log(currentQuestion)

    let listId = listIdContext ? listIdContext.parameters.listId : vraagContext.parameters.listId

    if (currentQuestion === 0) {
        agent.add(`Oke, gaan we ${listIdContext.parameters.givenListName} doen`);
    }

    //console.log(listId)

    // get questions from database by listId
    const exercise = await List.findOne({_id: listId}); // moet worden uit lijst met lijst id
    const questionsList = exercise.questions;
    //console.log(exercise.questions.length)

    if (listId) {
        // lifespan (amount of conversations) is set to a custom length, because the default is 2
        // save parameters to oefening-followup context. The context is tied to the user session.
        agent.context.set({
            name: 'vraag-context',
            lifespan: questionsList.length,
            parameters: {
                listId,
                currentQuestion,
                correctAnswers
            }
        });
    }
   // console.log(JSON.stringify(agent.context))
    // get the current question from the list of questions that was returned by the database
    const {question} = questionsList[currentQuestion];
    // ask the user the question
    
    agent.add(`Vraag ${currentQuestion + 1}. ${question} `);
};

module.exports = {
    question
};