import React from 'react';
import {View,Text,TouchableOpacity,StyleSheet,TextInput } from 'react-native';
import { connect } from 'react-redux';
import {addCard} from '../actions';
import { addNewCard } from '../utils/api';

class AddCard extends React.Component
{
    state= 
    {
        question:'',
        answer:'',
        queserror:'',
        anserror:''
    }

    AddCardToDeck =() =>
    {
      const {question,answer,queserror,anserror} = this.state

      if(question.length < 1)
      {
        this.setState({
            queserror:'Add this field'
        })
      }

      else if(answer.length < 1)
      {
        this.setState({
            anserror:'Add this field'
        })
      }

      else
      {
        const {dispatch,navigation} = this.props; 

        const key =  this.props.route.params.DeckId;

        const card = {
            question : question,
            answer: answer     
        }

        addNewCard({ key ,card})
        .then(() => {
            dispatch(addCard(key ,card)) 
        })
        
        this.setState({
            question:'',
            answer:'',
            queserror:'',
            anserror:''
        })
        navigation.goBack()
      }
    }

    onQuestionChange =(question) =>
    {
        let queserror=''
        if(question.length < 1)
        { 
            queserror='Add this field'
        }

        this.setState({question,queserror})
    }
    onAnswerChange =(answer) =>
    {
        let anserror=''
        if(answer.length < 1)
        { 
            anserror='Add this field'
        }

        this.setState({answer,anserror})
    }



    render()
    {
        const {question,answer,queserror,anserror} = this.state
        return(
            <View style={styles.container}>
                 <Text style={styles.heading}> {this.props.route.params.title}</Text>
                <Text style={styles.heading}>Question</Text>
                <TextInput 
                 style={styles.input}
                 onChangeText={text => this.onQuestionChange(text)}
                 value={question}
                placeholder="Place your Question"/> 
                <Text style={styles.error}>{queserror}</Text>

                <Text style={styles.heading}>Answer</Text>
                <TextInput 
                 style={styles.input}
                 onChangeText={text => this.onAnswerChange(text)}
                 value={answer}
                placeholder="Place your Answer"/> 

                <Text style={styles.error}>{anserror}</Text>


            <TouchableOpacity onPress={() => this.AddCardToDeck()} style={styles.btn}>
                  <Text style={{color:'white',fontSize:20}}>Add To Deck</Text>
              </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
       flex:1,
       justifyContent:'flex-start'
    },
    heading:{
        textAlign:'center',
        fontSize:30,
        padding:20,
        margin:10
    },
    input:{
        height: 40,
        borderColor: 'gray',
        borderWidth: 2 ,
        marginRight:20,
        marginLeft:20,
        borderRadius:8,
        padding:10,
        color:'black'
    },
    btn:{
        margin:10,
        justifyContent:'center',
        backgroundColor:'black',
        alignSelf:'center',
        padding:10,
        borderRadius:8,
        margin:20
    },
    error :{
       color:'red',
       margin:5,
       textAlign:'center'
    }
})

export default connect()(AddCard);