  
import { AsyncStorage } from 'react-native';

export const DECKS_STORAGE_KEY = 'flashCards:decks'


export function fetchDecks ()
{
  // AsyncStorage.setItem(DECKS_STORAGE_KEY,null)
    return AsyncStorage.getItem(DECKS_STORAGE_KEY)
     .then((data) => JSON.parse(data))
}

  export function fetchDeck(key)
{
   return AsyncStorage.getItem(DECKS_STORAGE_KEY)
  .then((data) => JSON.parse(data)[key])
}

function generateUID () {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  }


export function submitTitle ({ title }) {
  const deck ={
  id:generateUID(),
  title,
  cards:[]
  }
  return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
    [deck.id]: deck
  }))
  .then(() => deck)

}

export function addNewCard ({ card, key }) {   
   
   return AsyncStorage.getItem(DECKS_STORAGE_KEY)
   .then((results)=> {
    const decks = JSON.parse(results)
    let deck = decks[key] 
    deck.cards.push(card)
    AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
        [key]: deck
      }))
   })

  }
  