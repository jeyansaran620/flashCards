import React from 'react';
import {View,Text,TouchableOpacity, StyleSheet} from 'react-native';
import Question from './Question';
import { connect } from 'react-redux';
import  {setLocalNotification,clearLocalNotification} from '../utils/notify';

class Quiz extends React.Component
{

    state = {
        count : 0,
        correct : 0,
        panel:'questions'
    }

   nextQuestion = (answer) =>
   {
       const count = this.state.count + 1
       const correct = answer === 'Correct' ? this.state.correct + 1  : this.state.correct
       const panel = count < this.props.cards.length ? 'questions' : 'result'
   
         this.setState({count ,correct,panel})

   }
   restart = () =>
   {
    this.setState({
        count : 0,
        correct : 0,
        panel:'questions'
    })
   }

    render()
    {
        const { cards,navigation} = this.props 
        const {count,panel,correct} = this.state
        if(cards.length === 0)
        {
            return (
                <View style={styles.container}>
                    <Text style={styles.message}>Sorry No cards in the Deck</Text>
                </View>
            )
        }
        if(panel === 'questions')
        {
        return(
            <View>
                <Question question={cards[count]} nextQuestion={this.nextQuestion} count={cards.length} current={count} />
           </View>
        )
    }
    else
    {
        clearLocalNotification()
      .then(setLocalNotification)
        return(
            <View style={styles.result}>

               <Text style={styles.message}>
                  Result
                </Text> 
               <Text style={styles.count}>
                  {correct}/{cards.length}
                </Text>
                <TouchableOpacity style={styles.Btn} onPress={() => this.restart()}>
                    <Text style={{color:'white',fontSize:20}}>
                        Restart Quiz
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.Btn} onPress={() => navigation.goBack()}>
                    <Text style={{color:'white',fontSize:20}}>
                        Return to Deck
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}
}


const styles = StyleSheet.create({

    container:{
        flex:1,
        justifyContent:"space-around"
    },
    message :{
        textAlign:'center',
        fontSize:30,
        alignItems:'center'
    },
    result:{   
        backgroundColor:'rgba(0,0,0,0.4)',
        borderRadius:8,
        margin:20,
        padding:10
    },
    count:{
        fontSize:25,
        margin:30,
        padding:10,
        textAlign:'center'
    },   
    Btn:{
       backgroundColor:'black',
       borderRadius:8,
       margin:25, 
       justifyContent:'center',
       alignSelf:'center',
       padding:10
   }
})

function mapStateToProps(decks, {route})
{
    const { DeckId } = route.params

    return {
        cards : decks[DeckId].cards
    }
}
export default connect(mapStateToProps)(Quiz)