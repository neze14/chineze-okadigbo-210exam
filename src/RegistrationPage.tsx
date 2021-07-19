// Chinezelum Okadigbo

import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, ImageBackground, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Button, ButtonGroup, Icon } from 'react-native-elements';
import { IState, ITransactionEntry } from './interfaces/transaction-entry.interface';
import { createTransactionEntry } from './services/transaction-entry.service';
import { ScrollView } from 'react-native-gesture-handler';
import AddEntry from './components/AddEntry';

type RegistrationScreenStackParamList = {
    LoginScreen: undefined;
    RegistrationScreen: { title: string } | undefined;
    LastScreen: { title: string } | undefined;
};

type RegistrationScreenNavigationProp = StackNavigationProp<RegistrationScreenStackParamList, 'RegistrationScreen'>;

type Props = {
    navigation: RegistrationScreenNavigationProp;
};

const RegistrationPage: React.FC<Props> = ({ navigation }) => {

    const [state, setState] = useState<IState>({
        transactionEntries: [],
        onAddEntry: false
        // This sets the initial view state of the AddRegistration form to false. this ensure the whne the components mounts, the form is not visible
    })

    const createEntryButton = (transactionEntryData: ITransactionEntry) => {
        createTransactionEntry(transactionEntryData, state, setState);
        navigation.navigate('LastScreen')
        // This pushes the user from the RegistrationDisplay screen to the ViewRegistration screen to view what has been submitted to the database.
    }

    const cancelCreateEntryButton = () => {
        navigation.goBack()
    }

    return (
        <SafeAreaView>
            <ImageBackground style={{ width: '100%' }} source={require('./img/wallpaper.png')}>
                <ScrollView>
                    <View style={{ flexDirection: 'row' }}>
                        {!state.onAddEntry &&
                            <Button
                                icon={
                                    <Icon
                                        reverse
                                        name="plus"
                                        type='font-awesome'
                                        color="green"
                                    />
                                }
                                title="Click to register"
                                titleStyle={{ color: 'black', fontWeight: 'bold' }}
                                type="clear"
                                onPress={() => { setState({ ...state, onAddEntry: true }) }}
                            />
                        }
                    </View>

                    {state.onAddEntry && <AddEntry createEntry={createEntryButton} cancelCreateEntry={cancelCreateEntryButton} />}


                    
                    <ButtonGroup
                        containerStyle={{ alignSelf: "center", width: '90%', borderColor: 'green' }}
                        buttons={
                            [<Button
                                icon={<Icon
                                    name="arrow-left"
                                    color="green"
                                />}
                                title="Login"
                                titleStyle={{ color: 'black', fontWeight: 'bold' }}
                                type="clear"
                                onPress={() => { navigation.navigate('LoginScreen') }} 
                            />,
    
                            <Button
                                icon={<Icon
                                    name="arrow-right"
                                    color="green"
                                />}
                                title="Register"
                                titleStyle={{ color: 'black', fontWeight: 'bold' }}
                                type="clear"
                                onPress={() => { navigation.navigate('LastScreen') }} 
                            />
                            ]
                        }
                    />

                </ScrollView>

            </ImageBackground>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        marginTop: 30
    }
});

export default RegistrationPage;