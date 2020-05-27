import React from 'react';
import {SafeAreaView, View, FlatList,Text,StyleSheet,TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import {receiveDecks} from '../actions';
import { fetchDecks,addCard,fetchDeck } from '../utils/api';
import {AppLoading} from 'expo';

function Deck ({deck,decks,navigation})
{
    return (
        <TouchableOpacity style={styles.deck} 
        onPress={() => navigation.navigate( 'Deck',{
            DeckId : deck , title:decks[deck].title
            })} >
        <Text style={{fontSize:20,padding:5,color:'white'}}>
            {decks[deck].title}
        </Text>
        <Text style={{fontSize:15,padding:5,color:'white'}}>
        {decks[deck].cards.length} Cards
        </Text>
    </TouchableOpacity>
    )
}

class Dashboard extends React.Component
{
    state = {
        ready:false
    }  

    componentDidMount ()
    {
        const {dispatch} = this.props; 
        fetchDecks()
       .then((decks) => {
        dispatch(receiveDecks(decks))     
       })
       .then(() =>this.setState({ready:true}))
    }


    render()
    {
      
       const {decks} = this.props
       const {ready} = this.state
       if (!ready)
       {
           return <AppLoading />
       }
    
        return(
              <View style={styles.container}>
                  <Text style={styles.heading}>Decks</Text>
                  {Object.keys(decks).length ===0 ? 
                <Text style={styles.noData}>Sorry there are no Decks Available </Text>:
                <SafeAreaView style={styles.decks}>
                     <FlatList
                        data={Object.keys(decks)}
                        keyExtractor={(item, index) => index.toString()}
                      renderItem={({item}) => <Deck deck={item} decks={decks} navigation={this.props.navigation} />}
                   />
               </SafeAreaView>
                }         
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    heading:{
        textAlign:'center',
        fontSize:30,
        padding:20
    },
     noData:
     {
         textAlign:'center',
         fontSize:20
     },
     decks:{
           padding:10,
           marginBottom:70
     },
    deck:{
        backgroundColor:'rgba(0,0,0,0.45)',
        borderRadius:8,
        alignItems:'center',
        marginRight:40,
        marginLeft:40,
        marginTop:10,
        marginBottom:10
    }
})


function mapStateToProps(decks)
{
    return {
        decks
    }
}


export default connect(mapStateToProps)(Dashboard)