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
                description: "Dzi??kujemy! Zosta??e?? pomy??lnie zarejestrowny. Zaloguj si??, aby kontynuowa??.",
            });          
            this.props.history.push("/login");
        }).catch(error => {
            notification.error({
                message: 'TuMesa',
                description: error.message || 'Przepraszamy! Co?? posz??o nie tak. Spr??buj ponownie!'
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
                                placeholder="Imi??"
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
                                placeholder="Nazwa u??ytkownika"
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
                                placeholder="Has??o od 6 do 20 znak??w" 
                                value={this.state.password.value} 
                                onChange={(event) => this.handleInputChange(event, this.validatePassword)} />    
                        </FormItem>
                        <FormItem>
                            <Button
                                type="submit"
                                variant="outlined"
                                size="small"
                                > Zarejestruj si??!
                                </Button><br/>
                             <span style={{color: 'black', textDecoration: 'none'}}>Masz ju?? konto?</span> <Link to="/login">Zaloguj si??!</Link>
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
                errorMsg: `Imi?? jest za kr??tkie (Minimum ${FIRSTNAME_MIN_LENGTH} znak??w.)`
            }
        } else if (firstName.length > FIRSTNAME_MAX_LENGTH) {
            return {
                validationStatus: 'error',
                errorMsg: `Imi?? jest za d??ugie (Maximum ${FIRSTNAME_MAX_LENGTH} znak??w.)`
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
                errorMsg: `Nazwisko jest za kr??tkie (Minimum ${LASTNAME_MIN_LENGTH} znak??w.)`
            }
        } else if (lastName.length > LASTNAME_MAX_LENGTH) {
            return {
                validationStatus: 'error',
                errorMsg: `Nazwisko jest za d??ugie (Maximum ${LASTNAME_MAX_LENGTH} znak??w.)`
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
                errorMsg: 'Email nie mo??e by?? pusty'                
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
                errorMsg: `Email jest za d??ugi (Maximum ${EMAIL_MAX_LENGTH} znak??w)`
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
                errorMsg: `Nazwa u??ytkownika jest za kr??tka (Minimum ${LOGIN_MIN_LENGTH} znak??w.)`
            }
        } else if (login.length > LOGIN_MAX_LENGTH) {
            return {
                validationStatus: 'error',
                errorMsg: `Nazwa u??ytkownika jest za d??uga (Maximum ${LOGIN_MAX_LENGTH} znak??w.)`
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
                errorMsg: `Numer za kr??tki (Minimum ${PHONE_MIN_LENGTH} cyfr.)`
            }
        } else if (phone.length > PHONE_MAX_LENGTH) {
            return {
                validationStatus: 'error',
                errorMsg: `Numer za d??ugi (Maximum ${PHONE_MAX_LENGTH} cyfr.)`
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
                errorMsg: `Has??o jest za kr??tkie (Minimum ${PASSWORD_MIN_LENGTH} znak??w.)`
            }
        } else if (password.length > PASSWORD_MAX_LENGTH) {
            return {
                validationStatus: 'error',
                errorMsg: `Has??o za d??ugie (Maximum ${PASSWORD_MAX_LENGTH} znak??w.)`
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