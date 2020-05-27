# flashCards
This is a Native Aplication build for Android users to make notes of what they learn as decks of questions and they can take quiz with those decks.

  Architechture:

    Database : It consist of only only Decks Component.

    API : It is used to connect with the Database of the AsyncStorage, we can Add a new Deck or add questions to the available Decks.

    App: In the Front end we are using Redux to control the data of the App.

      Redux:
       
        Action:
          The only is maintaining the decks, with that we can Add the decks from the Database,add new Deck and add a new question to the existing deck.
        
        Reducer:
          With the we take care of the decks state of the store.
          We can receive all Decks with receiceDecks Action call.
          We can add a Deck with addDeck Action call.
          We can add a Card with addCard Action call.

      Components:
        We are creating the store at the App.js to maintain the data.
        We have a Stack Navigator at the App component having Home , Deck , addCard , Quiz Screens.
        We also have a Bottom Tab Navigator in the Home having Dashboard and AddDeck Screens.

        App.js:
          Here we create the store and render navigators to access respective routes.
          We also set Local Notification to remind the user in daily basis to take a Quiz.
        
        DashBoard.js:
          Here the Decks are rendered using the ListView and we can further navigate to individual Decks.
        
        AddDeck.js:
          It is a controlled component to add new Deck having Title as the input.
          When a Deck is added we are redirected to Dashboard.

        Deck.js:
          When the route is Deck/id we render this Component with the details of the Deck, title,number of Cards and options to Start the Quiz and to add New Card.

        AddCard.js:
          With this we can add new Card to the Specific Deck from which the component is called.
          We can add a Question and its answer to the New Card.
          When the new Card is added , we are reDirected to Deck component.

        Quiz.js:
          With this Component we Render the Questions One by one having options to select wwther he is right/wrong with his guess.
          After answering all the Questions the Result is displayed with the option to restart the quiz.
          Once a Quiz is completed the notification for that day will be cleared.

          