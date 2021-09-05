import React, { Component } from 'react';
import { login } from '../../util/APIUtils';
import './Login.css';
import { Link } from 'react-router-dom';
import { ACCESS_TOKEN } from '../../constants';
import Button from '@material-ui/core/Button';

import { Form, Input, Icon, notification } from 'antd';
const FormItem = Form.Item;

class Login extends Component {
    render() {
        const AntWrappedLoginForm = Form.create()(LoginForm)
        return (
            <div className="login-container">
                <h1 className="page-title">Zaloguj się</h1>
                <div className="login-content">
                    <AntWrappedLoginForm onLogin={this.props.onLogin} />
                </div>
            </div>
        );
    }
}

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();   
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const loginRequest = Object.assign({}, values);
                login(loginRequest)
                .then(response => {
                    localStorage.setItem(ACCESS_TOKEN, response.accessToken);
                    this.props.onLogin();
                }).catch(error => {
                    if(error.status === 401) {
                        notification.error({
                            message: 'TuMesa',
                            description: 'Twój login lub hasło są niepoprawne. Spróbuj ponownie.'
                        });                    
                    } else {
                        notification.error({
                            message: 'TuMesa',
                            description: error.message || 'Coś poszło nie tak. Spróbuj ponownie.'
                        });                                            
                    }
                });
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem>
                    {getFieldDecorator('loginOrEmail', {
                        rules: [{ required: true, message: 'Wpisz swój login lub email.' }],
                    })(
                    <Input 
                        prefix={<Icon type="user" />}
                        size="large"
                        name="loginOrEmail" 
                        placeholder="Login lub email" />    
                    )}
                </FormItem>
                <FormItem>
                {getFieldDecorator('password', {
                    rules: [{ required: true, message: 'Wpisz hasło!' }],
                })(
                    <Input 
                        prefix={<Icon type="lock" />}
                        size="large"
                        name="password" 
                        type="password" 
                        placeholder="Hasło"  />                        
                )}
                </FormItem>
                <FormItem>
                    <Button
                        style={{marginLeft: '15px'}}
                        type="submit"
                        variant="outlined"
                        size="small"
                    >Zaloguj
                    </Button> <br/>
                    <span style={{color: 'black', textDecoration: 'none'}}>Nie masz konta?</span> <Link to="/signup">Zarejestruj się!</Link>
                </FormItem>
            </Form>
        );
    }
}


export default Login;