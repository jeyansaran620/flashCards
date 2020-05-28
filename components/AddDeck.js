import React from 'react';
import {KeyboardAvoidingView,Text,TouchableOpacity,StyleSheet,TextInput } from 'react-native';
import { connect } from 'react-redux';
import {addDeck} from '../actions';
import { submitTitle } from '../utils/api';

class AddDeck extends React.Component
{

    state= 
    {
        title:'',
        error:''
    }

    AddToDecks =() =>
    {
      const {title} = this.state
      if(title.length < 1)
      {
        this.setState({
            error:'Add this field'
        })
      }
      else
      {
        const {dispatch,navigation} = this.props; 
        
        submitTitle({title})
        .then((deck) => {
            dispatch(addDeck(deck)) 
            this.setState({title:'',error:''})
            navigation.navigate( 'Deck',{
                DeckId : deck.id , title:deck.title
                })
        })     
        
        
      }
    }

    onChange =(title) =>
    {
        let error=''
        if(title.length < 1)
        { 
              error='Add this field'
        }

        this.setState({title,error})
    }


    render()
    {
        return(
            <KeyboardAvoidingView style={styles.container}>
                <Text style={styles.heading}>Deck Title</Text>
                <TextInput 
                 style={styles.input}
                 onChangeText={text => this.onChange(text)}
                 value={this.state.title}
                placeholder="Title"/> 
                <Text style={styles.error}>{this.state.error}</Text>
            <TouchableOpacity onPress={() => this.AddToDecks()} style={styles.btn}>
                  <Text style={{color:'white',fontSize:20}}>Add Deck</Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
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
        margin:30
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

export default connect()(AddDeck);