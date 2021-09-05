import React, { Component } from 'react';
import { signup} from '../../util/APIUtils';
import './Signup.css';
import { Link } from 'react-router-dom';
import { 
    FIRSTNAME_MIN_LENGTH, 
    FIRSTNAME_MAX_LENGTH, 
    LASTNAME_MIN_LENGTH,
    LASTNAME_MAX_LENGTH,
    LOGIN_MIN_LENGTH,
    LOGIN_MAX_LENGTH,
    PHONE_MIN_LENGTH,
    PHONE_MAX_LENGTH,
    EMAIL_MAX_LENGTH,
    PASSWORD_MIN_LENGTH, 
    PASSWORD_MAX_LENGTH
} from '../../constants';
import Button from '@material-ui/core/Button';

import { Form, Input, notification } from 'antd';
const FormItem = Form.Item;

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: {
                value: ''
            },
            lastName: {
                value: ''
            },
            email: {
                value: ''
            },
            phone:{
                value: ''
            },
            login: {
                value: ''
            },
            password: {
                value: ''
            }
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.isFormInvalid = this.isFormInvalid.bind(this);
    }

    handleInputChange(event, validationFun) {
        const target = event.target;
        const inputName = target.name;        
        const inputValue = target.value;

        this.setState({
            [inputName] : {
                value: inputValue,
                ...validationFun(inputValue)
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();
    
        const signupRequest = {
            firstName: this.state.firstName.value,
            lastName: this.state.lastName.value,
            email: this.state.email.value,
            phone: this.state.phone.value,
            login: this.state.login.value,
            password: this.state.password.value
        };
        signup(signupRequest)
        .then(response => {
            notification.success({
                message: 'TuMesa',
                description: "Dziękujemy! Zostałeś pomyślnie zarejestrowny. Zaloguj się, aby kontynuować.",
            });          
            this.props.history.push("/login");
        }).catch(error => {
            notification.error({
                message: 'TuMesa',
                description: error.message || 'Przepraszamy! Coś poszło nie tak. Spróbuj ponownie!'
            });
        });
    }

    isFormInvalid() {
        return !(this.state.firstName.validateStatus === 'success' && 
            this.state.lastName.validateStatus === 'success' &&
            this.state.email.validateStatus === 'success' &&
            this.state.phone.validateStatus === 'success' &&            
            this.state.login.validateStatus === 'success' &&
            this.state.password.validateStatus === 'success'
        );
    }

    render() {
        return (
            <div className="signup-container">
                <h1 className="page-title">Rejestracja</h1>
                <div className="signup-content">
                    <Form onSubmit={this.handleSubmit} className="signup-form">
                        <FormItem 
                            
                            validateStatus={this.state.firstName.validateStatus}
                            help={this.state.firstName.errorMsg}>
                            <Input 
                                required="required"
                                size="large"
                                name="firstName"
                                autoComplete="off"
                                placeholder="Imię"
                                value={this.state.firstName.value} 
                                onChange={(event) => this.handleInputChange(event, this.validateFirstName)}
                                 />    
                        </FormItem>
                        <FormItem 
                            
                            validateStatus={this.state.lastName.validateStatus}
                            help={this.state.lastName.errorMsg}>
                            <Input
                                required="required" 
                                size="large"
                                name="lastName"
                                autoComplete="off"
                                placeholder="Nazwisko"
                                value={this.state.lastName.value} 
                                onChange={(event) => this.handleInputChange(event, this.validateLastName)} />    
                        </FormItem>
                        <FormItem 
                            
                            hasFeedback
                            validateStatus={this.state.email.validateStatus}
                            help={this.state.email.errorMsg}>
                            <Input
                                required="required" 
                                size="large"
                                name="email" 
                                type="email" 
                                autoComplete="off"
                                placeholder="Email"
                                value={this.state.email.value} 
                                onBlur={this.validateEmailAvailability}
                                onChange={(event) => this.handleInputChange(event, this.validateEmail)} />    
                        </FormItem>
                        <FormItem 
                            validateStatus={this.state.phone.validateStatus}
                            help={this.state.phone.errorMsg}>
                            <Input
                                required="required" 
                                size="large"
                                name="phone"
                                autoComplete="off"
                                placeholder="Tel."
                                value={this.state.phone.value} 
                                onChange={(event) => this.handleInputChange(event, this.validatePhone)} />    
                        </FormItem>
                        <FormItem 
                            hasFeedback
                            validateStatus={this.state.login.validateStatus}
                            help={this.state.login.errorMsg}>
                            <Input
                                required="required" 
                                size="large"
                                name="login" 
                                autoComplete="off"
                                placeholder="Nazwa użytkownika"
                                value={this.state.login.value} 
                                onBlur={this.validateLoginAvailability}
                                onChange={(event) => this.handleInputChange(event, this.validateLogin)} />    
                        </FormItem>
                        
                        <FormItem 
                            validateStatus={this.state.password.validateStatus}
                            help={this.state.password.errorMsg}>
                            <Input
                                required="required" 
                                size="large"
                                name="password" 
                                type="password"
                                autoComplete="off"
                                placeholder="Hasło od 6 do 20 znaków" 
                                value={this.state.password.value} 
                                onChange={(event) => this.handleInputChange(event, this.validatePassword)} />    
                        </FormItem>
                        <FormItem>
                            <Button
                                type="submit"
                                variant="outlined"
                                size="small"
                                > Zarejestruj się!
                                </Button><br/>
                             <span style={{color: 'black', textDecoration: 'none'}}>Masz już konto?</span> <Link to="/login">Zaloguj się!</Link>
                        </FormItem>
                    </Form>
                </div>
            </div>
        );
    }

    // Validation Functions
    validateFirstName = (firstName) => {
        if(firstName.length < FIRSTNAME_MIN_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Imię jest za krótkie (Minimum ${FIRSTNAME_MIN_LENGTH} znaków.)`
            }
        } else if (firstName.length > FIRSTNAME_MAX_LENGTH) {
            return {
                validationStatus: 'error',
                errorMsg: `Imię jest za długie (Maximum ${FIRSTNAME_MAX_LENGTH} znaków.)`
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null,
              };            
        }
    }

    validateLastName = (lastName) => {
        if(lastName.length < LASTNAME_MIN_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Nazwisko jest za krótkie (Minimum ${LASTNAME_MIN_LENGTH} znaków.)`
            }
        } else if (lastName.length > LASTNAME_MAX_LENGTH) {
            return {
                validationStatus: 'error',
                errorMsg: `Nazwisko jest za długie (Maximum ${LASTNAME_MAX_LENGTH} znaków.)`
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null,
              };            
        }
    }

    validateEmail = (email) => {
        if(!email) {
            return {
                validateStatus: 'error',
                errorMsg: 'Email nie może być pusty'                
            }
        }

        const EMAIL_REGEX = RegExp('[^@ ]+@[^@ ]+\\.[^@ ]+');
        if(!EMAIL_REGEX.test(email)) {
            return {
                validateStatus: 'error',
                errorMsg: 'Niepoprawny email'
            }
        }

        if(email.length > EMAIL_MAX_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Email jest za długi (Maximum ${EMAIL_MAX_LENGTH} znaków)`
            }
        }

        return {
            validateStatus: null,
            errorMsg: null
        }
    }

    validateLogin = (login) => {
        if(login.length < LOGIN_MIN_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Nazwa użytkownika jest za krótka (Minimum ${LOGIN_MIN_LENGTH} znaków.)`
            }
        } else if (login.length > LOGIN_MAX_LENGTH) {
            return {
                validationStatus: 'error',
                errorMsg: `Nazwa użytkownika jest za długa (Maximum ${LOGIN_MAX_LENGTH} znaków.)`
            }
        } else {
            return {
                validateStatus: null,
                errorMsg: null
            }
        }
    }

    validatePhone = (phone) => {
        if(phone.length < PHONE_MIN_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Numer za krótki (Minimum ${PHONE_MIN_LENGTH} cyfr.)`
            }
        } else if (phone.length > PHONE_MAX_LENGTH) {
            return {
                validationStatus: 'error',
                errorMsg: `Numer za długi (Maximum ${PHONE_MAX_LENGTH} cyfr.)`
            }
        } else {
            return {
                validateStatus: null,
                errorMsg: null
            }
        }
    }

    validatePassword = (password) => {
        if(password.length < PASSWORD_MIN_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Hasło jest za krótkie (Minimum ${PASSWORD_MIN_LENGTH} znaków.)`
            }
        } else if (password.length > PASSWORD_MAX_LENGTH) {
            return {
                validationStatus: 'error',
                errorMsg: `Hasło za długie (Maximum ${PASSWORD_MAX_LENGTH} znaków.)`
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null,
            };            
        }
    }

}

export default Signup;