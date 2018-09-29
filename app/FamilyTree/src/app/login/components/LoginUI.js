import React, { Component } from 'react';
import { View, Button, Text, TextInput, Image } from 'react-native';
import firebase from 'react-native-firebase';
import Toast from 'react-native-simple-toast';
import PhoneNumberInput from "./PhoneNumberInput";
import VerificationCodeInput from "./VerificationCodeInput";
import { basicCompStyles } from '../../../common/styles/styleSheet';

export default class LoginUI extends Component {
    constructor(props) {
        super(props);
        this.unsubscribe = null;
        let isSignOut = false;
        let redirectTo = "Details";
        this.renderMessage = this.renderMessage.bind(this)
        this.signIn = this.signIn.bind(this)
        this.signOut = this.signOut.bind(this)
        this.confirmCode = this.confirmCode.bind(this)
        this.changeNumber = this.changeNumber.bind(this)
        this.resendCode = this.resendCode.bind(this)
        this.navigate = this.navigate.bind(this)
        // const { params } = props.navigation.state;
        // if (params && params.redirectTo) {
        //     redirectTo = params.redirectTo
        // }
        // if (firebase.auth().currentUser) {
        //     console.log("has user")
            
        //     if (params && params.isSignOut) {
        //         console.log("has signing out")
        //         this.signOut(true);
        //         isSignOut = true;
        //     }
            
        // }
        this.state = {
            confirmResult: null,
            isSignOut: isSignOut,
            redirectTo: redirectTo
        };
        this.navigate(isSignOut, props.graphcoolTokenStatus)
    }

    componentDidMount() {
        this.unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                user.getIdToken(false).then(token => {
                    this.props.setPhoneNumber(user._user.phoneNumber)
                    this.props.setTokenId(token, user._user.phoneNumber);
                    this.setState({
                        isSignOut: false,
                    });
                }).catch(error => {
                    // this.renderMessage('Unable to get user details')
                    this.setState({
                        confirmResult: null,
                    });
                })
            } else {
                this.setState({
                    confirmResult: null,
                });
            }
        });

    }

    componentWillUnmount() {
        if (this.unsubscribe) this.unsubscribe();
    }

    signIn = (phoneNumber) => {
        this.renderMessage('Sending code ...')
        console.log( "ph -- " + phoneNumber)
        firebase.auth().signInWithPhoneNumber(phoneNumber)
            .then(confirmResult => {
                this.setState({
                    confirmResult,
                })
                this.props.setPhoneNumber(phoneNumber)
                this.renderMessage('Code has been sent!')
            })
            .catch(error => {
                    let msg = error.message.substr(0, error.message.indexOf('.'))
                    this.renderMessage(`Error during sign in : ${msg}`)
                }
            );
    };

    resendCode = () => {
        this.signIn(this.props.userPhoneNumber)

    }

    changeNumber = () => {
        this.setState({
            confirmResult: null,
        });
    }

    confirmCode = (codeInput) => {
        const { confirmResult } = this.state;
        if (confirmResult && codeInput.length) {
            confirmResult.confirm(codeInput)
                .then((user) => {
                    this.renderMessage('Code Confirmed!')
                })
                .catch(error => {
                    let msg = error.message.substr(0, error.message.indexOf('.'))
                    this.renderMessage(`Code Confirm Error: ${msg}`)
                });
        }
    };

    signOut = (isNotUpdateState) => {
        this.props.setPhoneNumber('')
        this.props.clearTokenId()
        firebase.auth().signOut();
        if (!isNotUpdateState) {
            this.setState({
                confirmResult: null,
            });
        }
    }

    renderMessage = (message) => {
        if (!!message) {
            Toast.show(message, Toast.LONG)
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log(this.state.isSignOut + " + " + nextProps.graphcoolTokenStatus)
        this.navigate(this.state.isSignOut, nextProps.graphcoolTokenStatus)
        if (nextProps.graphcoolTokenStatus == -1) {
            this.renderMessage('Unable to get user details')
            this.setState({
                confirmResult: null,
            });
        }
    }

    navigate = (isSignOut, tokenStatus) => {
        if(!isSignOut && tokenStatus == 2) {
            this.renderMessage('Login successfull')
            // this.props.navigation.navigate(this.state.redirectTo);
        }
    }

    render() {
        const { confirmResult, isSignOut } = this.state;
        const { children, userPhoneNumber, graphcoolTokenStatus, navigation } = this.props;    
        return (
            <View style={[basicCompStyles.fullSize, basicCompStyles.bgBaseColorLight]}>
                {(graphcoolTokenStatus != 2) && confirmResult && <PhoneNumberInput signIn={this.signIn} phoneNumber={userPhoneNumber} />}
                {(graphcoolTokenStatus != 2) && !confirmResult && <VerificationCodeInput  confirmCode={this.confirmCode} resendCode={this.resendCode} changeNumber={this.changeNumber}/>}
                {/* {!isSignOut && graphcoolTokenStatus == 2 && <LoginDetail signOut={this.signOut} navigation={this.props.navigation}></LoginDetail>} */}
            </View>
        );
    }
}

// erificationCodeInput confirmCode={this.confirmCode} resendCode={this.resendCode} changeNumber={this.changeNumber}