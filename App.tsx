// Chinezelum Okadigbo

import 'react-native-gesture-handler';

import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Text} from 'react-native-elements';
import { enableScreens } from 'react-native-screens';
enableScreens();

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import LoginPage from './src/LoginPage';
import RegistrationPage from './src/RegistrationPage'
import LastPage from './src/LastPage';

const Stack = createStackNavigator();

const AppStack = () => { 
    return(
        <Stack.Navigator 
            initialRouteName='LoginScreen'
            mode='card'
            headerMode='screen'
            keyboardHandlingEnabled={true}
            screenOptions={{
                headerStyle: {
                    backgroundColor: 'lightgreen',
                    height: 120
                },
                headerTintColor:'black',
                headerTitleStyle: {
                    fontWeight: 'bold',
                    paddingTop:60,
                    paddingBottom: 10
                },
                headerRight: () => (
                    <Image style={styles.logo}
                        source={require('./src/img/cac-logo.png')}
                    />
                ),
                headerTitleAlign:'left',
                headerRightContainerStyle: {
                    paddingBottom: 33
                }
            }}
        >
            
            <Stack.Screen name="LoginScreen" component={LoginPage} options={{title: 'Login Page'}}/>
            <Stack.Screen name="RegistrationScreen" component={RegistrationPage} options={{title: ''}}/> 
            <Stack.Screen name="LastScreen" component={LastPage} options={{title: ''}}/> 
        </Stack.Navigator>
    )
}

const App: React.FC = () => {  

    

    return(
        <NavigationContainer>
            <AppStack/>

            <View style={{paddingBottom: 20, paddingTop: 10, alignItems: "center"}}>
                <Text style={{fontSize: 15, fontStyle: "italic"}}>Copyright: Chinezelum Okadigbo</Text>
            </View>
        </NavigationContainer>

    );
}

const styles = StyleSheet.create({
    logo: {
        width: 210,
        height: 60,
        paddingBottom: 10
    }
});

export default App;

/** 
import { StatusBar } from 'expo-status-bar';
  import React from 'react';
  import { StyleSheet, Text, View } from 'react-native';

  export default function App() {
    return (
      <View style={styles.container}>
        <Text>Open up App.tsx to start working on your app!</Text>
        <StatusBar style="auto" />
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
*/


// import { StatusBar } from 'expo-status-bar';
// import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.tsx to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
