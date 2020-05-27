import * as React from 'react';
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import AddCard from './components/AddCard';
import Dashboard from './components/Dashboard';
import AddDeck from './components/AddDeck';
import DeckView from './components/DeckView';
import Quiz from './components/Quiz';
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers";
import  {setLocalNotification} from './utils/notify';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function Tabs()
{
  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      tabBarOptions={ {
      activeTintColor: 'black',
      tintColor:'white',
      style: {
      height: 56,
      backgroundColor: 'white' ,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }}
    >
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => <Ionicons name='ios-bookmarks' size={30} color={color} />,
        }}
      />
      <Tab.Screen
        name="Add Deck"
        component={AddDeck}
        options={{
          tabBarLabel: 'Add Deck',
          tabBarIcon: ({ color }) => <FontAwesome name='plus-square' size={30} color={ color } />,
        }}
      />
    </Tab.Navigator>
  )
}

function Stacks ()
{
  return (
    <Stack.Navigator  >
        <Stack.Screen name="Home" component={Tabs} options={{headerShown:false}}/>
        <Stack.Screen name="Deck" component={DeckView} 
        options={({ route }) => ({ title: route.params.title ,headerStyle: {
          height: 70
        }})} />
        <Stack.Screen name="AddCard" component={AddCard} 
        options={() => ({ title: 'Add Card' ,headerStyle: {
          height: 70
        }})} />
         <Stack.Screen name="Quiz" component={Quiz} 
        options={() => ({ title: 'Quiz' ,headerStyle: {
          height: 70
        }})} />
      </Stack.Navigator>
  )
} 

const store = createStore(reducer);


 class App extends React.Component {

  componentDidMount()
  {
    setLocalNotification()
  }
   render()
   {   
  return (
    <Provider store={store}>
    <View style={{ flex: 1 }}>
    <NavigationContainer>
     <Stacks />
    </NavigationContainer>
  </View>
  </Provider>
  );
}
 }
export default App 