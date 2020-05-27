import React from 'react';
import { View,Text,StyleSheet,TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

class DeckView extends React.Component
{
    render()
    {
        let { deck , navigation} = this.props 
        return(
            <View style={styles.container}>
                <View>
               <Text style={styles.heading}>
                {deck.title}
               </Text>
          <Text style={styles.cards}>
            {deck.cards.length} Cards
        </Text></View>
        <TouchableOpacity  onPress={() => navigation.navigate( 'AddCard',{
            DeckId : deck.id 
            })}  style={styles.btn}>

            <Text style={{color:'white',fontSize:30}}>
                Add Card
            </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate( 'Quiz',{ DeckId : deck.id })}  style={styles.btn}>
            <Text style={{color:'white',fontSize:30}}>
                Start Quiz
            </Text>
        </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'space-around'
    },
    heading:{
        textAlign:'center',
        fontSize:40,
        marginTop:100,
        marginBottom:40
    },
    cards:{
        textAlign:'center',
        fontSize:25
    },
    btn:{
        margin:10,
        justifyContent:'center',
        backgroundColor:'black',
        alignSelf:'center',
        padding:10,
        borderRadius:8
    }
})

function mapStateToProps (decks,{ route }) {
    const { DeckId } = route.params
    return {
      DeckId,
      deck: decks[DeckId],
    }
  }
  
export default connect(mapStateToProps)(DeckView)
