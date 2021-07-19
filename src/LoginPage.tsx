// Chinezelum Okadigbo

import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, ImageBackground, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Button, Input } from 'react-native-elements';

type LoginScreenStackParamList = {
    LoginScreen: undefined;
    RegistrationScreen: { title: string } | undefined;
    LastScreen: { title: string } | undefined;
};

type LoginScreenNavigationProp = StackNavigationProp<LoginScreenStackParamList, 'LoginScreen'>;

type Props = {
    navigation: LoginScreenNavigationProp;
};

type IState = {
    username: string;
    password: string;
}

const LoginScreen: React.FC<Props> = ({ navigation }) => {

    const [state, setState] = useState<IState>({
        username: '',
        password: '',
    })

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground style={{ width: '100%' }} source={require('./img/wallpaper.png')}>

                <View style={{ alignItems: "center" }}>

                    <View style={{ padding: 110 }}></View>

                    <View>
                        <Input
                            label=""
                            placeholder="Enter email or username"
                            multiline
                            inputContainerStyle={styles.inputContainerStyle}
                            leftIcon={{ type: 'font-awesome', name: 'user' }}
                            onChangeText={username => setState({ ...state, username })}
                        />
                    </View>

                    <View style={{ padding: 10 }}></View>

                    <View>
                        <Input
                            label=""
                            placeholder="Enter password"
                            multiline
                            inputContainerStyle={styles.inputContainerStyle}
                            onChangeText={password => setState({ ...state, password })}
                        />
                    </View>

                    <View style={{ padding: 10 }}></View>

                    <Button
                        type="solid"
                        title="Login"
                        onPress={() => navigation.navigate('RegistrationScreen')} 
                    />

                    <View style={{ padding: 10 }}></View>

                </View>
            </ImageBackground>
        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fffff2',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        marginTop: 30
    },
    inputContainerStyle: {
        width: '100%',
        padding: 10,
        backgroundColor: '#fffff2'
    }
});

export default LoginScreen;