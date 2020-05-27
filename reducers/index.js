 import 
 { RECEIVE_DECKS ,
 ADD_DECK ,
 ADD_CARD } from '../actions';

export default function decks (state={},action) {
    switch (action.type) {

    case RECEIVE_DECKS:
        return {
            ...action.decks
        }

    case ADD_DECK:
        return {
            ...state,
            [action.deck.id]:action.deck
        }
        
    case ADD_CARD:
        const {id,card} = action
        let cards = state[id].cards
        cards=cards.concat(card)
       return {
                ...state,
                [id]: { ...state[id] , cards   }
       }

    }
}
