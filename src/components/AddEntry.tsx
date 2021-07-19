// Chinezelum Okadigbo

import React, { useState } from 'react';
import { View, StyleSheet, Platform, KeyboardAvoidingView } from 'react-native';
import { Button, Input, Text, CheckBox } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/core';
import DropDownPicker from 'react-native-custom-dropdown';

type Props = {
    createEntry: Function,
    cancelCreateEntry: Function
}


type IState = {
    txnDay: number | null;
    txnMonth: number | null;
    txnYear: number | null;
    date: Date;
    surname: string;
    firstName: string;
    otherName: string;
    gender: string;
    nationality: string;
    typeOfIdentification: string;
    nationalIdentificationNumber: number;
}

const AddEntry: React.FC<Props> = ({ createEntry, cancelCreateEntry }) => {

    const navigation = useNavigation();

    const date = new Date(); 

    const [state, setState] = useState<IState>({
        txnDay: date.getDate(),
        txnMonth: date.getMonth(),
        txnYear: date.getFullYear(),
        date: new Date(),
        surname: '',
        firstName: '',
        otherName: '',
        gender: '',
        nationality: '',
        typeOfIdentification: '',
        nationalIdentificationNumber: 0,
    })

    const [showDatePicker, setShowDatePicker] = useState(Platform.OS === "ios" ? true : false);

    return (
        <View style={styles.container}>
            <ScrollView>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={styles.container}>

                    <Text style={{ width: '100%', fontSize: 25, textAlign: 'left' }}>Authorized Representative</Text>

                    <Input
                        label="Surname"
                        placeholder="Enter your surname here"
                        multiline
                        inputContainerStyle={styles.inputContainerStyle}
                        onChangeText={surname => setState({ ...state, surname })}
                    />
                    <Input
                        label="First Name"
                        placeholder="First Name"
                        multiline
                        inputContainerStyle={styles.inputContainerStyle}
                        onChangeText={firstName => setState({ ...state, firstName })}
                    />

                    <Input
                        label="Other Name"
                        placeholder="Other Name"
                        multiline
                        inputContainerStyle={styles.inputContainerStyle}
                        onChangeText={otherName => setState({ ...state, otherName })}
                    />

                    {/**Date of birth begins */}
                    {Platform.OS !== "ios" && <Button 
                        title="Date of Birth"
                        onPress={() => {
                            setShowDatePicker(true);
                        }}
                    />}
                    {showDatePicker && <DateTimePicker
                        style={styles.inputContainerStyle}
                        value={state.date}
                        mode={'date'}
                        //is24Hour={true}
                        display="default"
                        onChange={(_event: any, selectedDate: any) => {
                            const date: Date = selectedDate as Date;
                            setState({
                                ...state,
                                date: selectedDate,
                                txnDay: date.getDate(),
                                txnMonth: date.getMonth(),
                                txnYear: date.getFullYear()
                            })
                            setShowDatePicker(Platform.OS === "ios" ? true : false);
                        }}
                    />}
                    {/**Date of birth ends */}


                    {/** Drop down for Gender starts */}
                    {/* <DropDownPicker
                        items={[
                            {label: 'Male', value: 'Male'},
                            {label: 'Female', value: 'Gender'},
                        ]}
                        defaultValue="-Select gender-"
                        containerStyle={{height: 40}}
                        style={{backgroundColor: 'white'}}
                        itemStyle={{
                            justifyContent: 'flex-start'
                        }}
                        dropDownStyle={{backgroundColor: '#fafafa'}}
                        onChangeItem={gender => setState({...state, gender})
                        }
                    /> */}
                    {/** Drop down for Gender starts */}
                    <Input
                        label="Gender"
                        placeholder="Male or Female"
                        multiline
                        inputContainerStyle={styles.inputContainerStyle}
                        onChangeText={gender => setState({ ...state, gender })}
                    />

                    {/** Drop down for Nationality starts */}
                    {/* <DropDownPicker
                        items={[
                            {label: 'Nigeria', value: 'Nigeria'},
                            {label: 'Ghana', value: 'Ghana'},
                        ]}
                        defaultValue="-Select nationality-"
                        containerStyle={{height: 40}}
                        style={{backgroundColor: 'white'}}
                        itemStyle={{
                            justifyContent: 'flex-start'
                        }}
                        dropDownStyle={{backgroundColor: '#fafafa'}}
                        onChangeItem={nationality => setState({...state, nationality})
                        }
                    /> */}
                    {/** Drop down for Nationality starts */}

                    <Input
                        label="Nationality"
                        placeholder="e.g. Nigeria"
                        multiline
                        inputContainerStyle={styles.inputContainerStyle}
                        onChangeText={nationality => setState({ ...state, nationality })}
                    />

                    <Text style={{ width: '100%', fontSize: 25, textAlign: 'left' }}>Means of Identification</Text>

                    {/* * Drop down for Type starts */}
                    {/* <DropDownPicker
                        items={[
                            {label: 'Birth Certificate', value: 'Birth Certificate'},
                            {label: 'Passport', value: 'Passport'},
                        ]}
                        defaultValue="-Select type-"
                        containerStyle={{height: 40}}
                        style={{backgroundColor: 'white'}}
                        itemStyle={{
                            justifyContent: 'flex-start'
                        }}
                        dropDownStyle={{backgroundColor: '#fafafa'}}
                        onChangeItem={typeOfIdentification => setState({...state, typeOfIdentification})
                        }
                    /> */}
                    {/** Drop down for Type Ends */}
                    <Input
                        label="Type"
                        placeholder="Passport or Birth Cirtificate"
                        multiline
                        inputContainerStyle={styles.inputContainerStyle}
                        onChangeText={typeOfIdentification => setState({ ...state, typeOfIdentification })}
                    />

                    <Input
                        label="National Identitification Number (NIN)"
                        placeholder="Identity Number"
                        keyboardType="numeric"
                        inputContainerStyle={styles.inputContainerStyle}
                        leftIcon={{ type: 'font-awesome', name: 'id-card' }}
                        onChangeText={nationalIdentificationNumber => setState({ ...state, nationalIdentificationNumber: +nationalIdentificationNumber })}
                    />

                    <Text style={{fontSize: 15}}>NOTE: All fields are reguired!</Text>

                    <View style={{ flexDirection: 'row' }}>
                        <Button style={ {paddingRight: 1 }}
                            title="Register"
                            onPress={() => {
                                createEntry(state);
                            }}
                            buttonStyle={{ backgroundColor: 'green' }}
                        />

                        <Button style={ {paddingRight: 1 }}
                            title="Cancel"
                            onPress={() => { navigation.goBack() }}
                            buttonStyle={{ backgroundColor: 'red' }}
                        />
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'lightgrey',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    inputContainerStyle: {
        width: '100%',
        padding: 10,
        backgroundColor: 'white'
    }
});

export default AddEntry;