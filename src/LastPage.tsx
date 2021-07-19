// Chinezelum Okadigbo

import React, { useCallback, useEffect, useState } from "react";
import { StackNavigationProp } from '@react-navigation/stack';
import { ImageBackground, SafeAreaView, View, Text, FlatList } from "react-native";
import { Button, ButtonGroup, Icon } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import { Connection } from "typeorm";
import EditEntry from "./components/EditEntry";
import { IState } from "./interfaces/transaction-entry.interface";
import { deleteTransactionEntry, getDbConnection, getTransactionEntries } from "./services/transaction-entry.service";

type LastScreenStackParamList = {
    LoginScreen: undefined;
    RegistrationScreen: { title: string } | undefined;
    LastScreen: { title: string } | undefined;
};

type LastScreenNavigationProp = StackNavigationProp<LastScreenStackParamList, 'LastScreen'>;

type Props = {
    navigation: LastScreenNavigationProp;
};

const LastPage: React.FC<Props> = ({ navigation }) => {

    const [state, setState] = useState<IState>({
        transactionEntries: [],
        onAddEntry: false
    })

    // create connection
    const [defaultConnection, setConnection] = useState<Connection | null>(null);

    const setupConnection = useCallback(() =>
        getDbConnection(setConnection, state, setState
        ), []);

    useEffect(() => {
        if (!defaultConnection) {
            setupConnection();
        } else {
            getTransactionEntries(state, setState);
        }
    }, []);

    const deleteEntry = (id: number) => {
        deleteTransactionEntry(id, state, setState);
    }

    // const editEntry = () => {
    //     <EditEntry />
    // }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', width: '100%', marginTop: 30 }}>
            <ImageBackground style={{ width: '100%' }} source={require('./img/wallpaper.png')}>

                <Text style={{ backgroundColor: "lightgreen", fontSize: 20, color: "black", padding: 10, alignItems: "stretch" }}>Registration Successful!</Text>

                <View>
                    <FlatList
                        style={{ width: '100%', padding: 3, backgroundColor: 'white' }}
                        data={state.transactionEntries}
                        renderItem={({ item }) => (
                            <ScrollView>
                                <View style={{ width: '100%', padding: 10 }}>
                                    <Text style={{ fontSize: 18 }}>Surname: {item.surname}</Text>
                                    <Text style={{ fontSize: 18 }}>First Name: {item.firstName}</Text>
                                    <Text style={{ fontSize: 18 }}>Other Name: {item.otherName}</Text>
                                    <Text style={{ fontSize: 18 }}>Date of Birth: {new Date(item.txnYear!, item.txnMonth!, item.txnDay!).toLocaleDateString()}</Text>
                                    <Text style={{ fontSize: 18 }}>Gender: {item.gender}</Text>
                                    <Text style={{ fontSize: 18 }}>Nationality: {item.nationality}</Text>
                                    <Text style={{ fontSize: 18 }}>Type: {item.typeOfIdentification}</Text>
                                    <Text style={{ fontSize: 18 }}>National Identification Number: {item.nationalIdentificationNumber}</Text>

                                    <ButtonGroup
                                        containerStyle={{ backgroundColor: 'white', width: '40%', borderColor: 'white' }}
                                        buttons={
                                            [<Button
                                                icon={<Icon
                                                    name="edit"
                                                    color="green"
                                                />}
                                                type="clear"
                                                title="Edit"
                                                titleStyle={{ fontSize: 15 }}
                                                onPress={() => {
                                                    // editEntry()
                                                }}
                                            />,

                                            <Button
                                                icon={<Icon
                                                    name="delete"
                                                    color="red"
                                                />}
                                                type="clear"
                                                title="Delete"
                                                titleStyle={{ fontSize: 15 }}
                                                onPress={() => {
                                                    deleteEntry(item.id!)
                                                }}
                                            />
                                            ]
                                        }
                                    />
                                </View>
                            </ScrollView>
                        )}

                        keyExtractor={(item, index) => index.toString()}
                        ItemSeparatorComponent={
                            () => {
                                return (<View style={{ backgroundColor: 'white', height: 3, width: '100%' }} />)
                            }
                        }
                    />
                    <Button
                        icon={
                            <Icon
                                reverse
                                name="sign-out"
                                type='font-awesome'
                                color="green"
                            />
                        }
                        type="solid"
                        title="Log Out"
                        onPress={() => navigation.navigate('LoginScreen')}
                    />
                </View>
            </ImageBackground>

        </SafeAreaView>
    )
}


export default LastPage;