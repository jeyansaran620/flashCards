import React from 'react';
import {Animated ,View ,Text,TouchableOpacity,StyleSheet} from 'react-native';

class Question extends React.Component
{
    state =
    {
        panel:'question',
        spinValue: new Animated.Value(6.3)
    }
   
    changePanel = () => 
    {
        const {spinValue} = this.state
        const panel = this.state.panel === 'question' ? 'answer' : 'question';
        Animated.sequence([
            Animated.timing(spinValue,{duration:100 , toValue:3.15}),
            Animated.spring(spinValue,{toValue:6.3})
        ]).start()
        this.setState({ panel})
    }

    render()
    {
        const {panel,spinValue} = this.state;
        const {question,answer} = this.props.question;
        const {nextQuestion,current,count} = this.props;

        return(
            <Animated.View style={[styles.container, {
                transform: [ { rotateY: spinValue } ]}]}>
                <Text style={styles.count}>{current+1}/{count}</Text>
                <Text style={styles.panel}>
                   {panel === 'question' ? question : answer}
                </Text>
                <TouchableOpacity style={styles.change} onPress={() => this.changePanel()}>
                    <Text style={{textAlign:'center',fontSize:20,color:'brown'}}>
                       see {panel === 'question' ? 'Answer' : 'Question'}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.correctBtn} onPress={() => nextQuestion('Correct')}>
                    <Text style={{color:'white',fontSize:20}}>
                        Correct
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.wrongBtn} onPress={() => nextQuestion('InCorrect')}>
                    <Text style={{color:'white',fontSize:20}}>
                        InCorrect
                    </Text>
                </TouchableOpacity>
            </Animated.View>
        )
    }
}

const styles = StyleSheet.create({
    container:{   
        backgroundColor:'rgba(0,0,0,0.4)',
        borderRadius:8,
        margin:20,
        padding:10
    },
    count:{
        fontSize:20,
        padding:10
    },
    panel:{
       fontSize:30,
       textAlign:'center',
       margin:40
    },
    change:{
       margin:60
    },
   correctBtn:{
       backgroundColor:'green',
       borderRadius:8,
       margin:25, 
       justifyContent:'center',
       alignSelf:'center',
       padding:10
   },
   wrongBtn:{
    backgroundColor:'red',
    borderRadius:8,
    margin:25, 
    justifyContent:'center',
    alignSelf:'center',
    padding:10,
    marginBottom:100
}
    
})

export default Question;