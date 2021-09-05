import React, {Component} from 'react';
import {NUMBEROFSEATS_MAX_LENGTH, NUMBEROFSEATS_MIN_LENGTH} from '../constants';
import {GetUserFromToken, RequestApi} from "../util/APIUtils";
import Loading from '../common/Loading';
import NotFound from '../common/NotFound';
import ServerError from '../common/ServerError';
import {Button, Form, Input} from 'antd';

const FormItem = Form.Item;

class AddTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: GetUserFromToken().userId,
            restaurantId: this.props.restaurantId,
            eservationTable: [],
            seatsNumber: {
                value: ''
            },
            RestaurationsList: [],
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.isFormInvalid = this.isFormInvalid.bind(this);
    }

    getRestaurationsList() {        
        RequestApi(`/restaurant/${this.state.id}`, 'GET')
            .then(response => {
                this.setState({
                   RestaurationsList: response || [],
                });
            })
            .catch(error => this.setState(console.log("error", error)));
    }
    
    componentDidMount() {
        this.getRestaurationsList()
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
        const params = {
            restaurantId: +this.state.restaurantId,
            userId: GetUserFromToken().userId,
            seatsNumber: this.state.seatsNumber.value
        };
        RequestApi(`/restaurant/${params.restaurantId}/table`, 'POST', params).then(response => {
            window.location.href = `/restaurant/${params.restaurantId}/table`
        }).catch(err => {
            alert('Twój stolik nie został dodany');
        })
    }

    isFormInvalid() {
        return !(this.state.seatsNumber.validateStatus === 'success' );
    }

    render() {
        if (this.state.isLoading) {
            return <Loading/>;
        }

        if (this.state.notFound) {
            return <NotFound/>;
        }

        if (this.state.serverError) {
            return <ServerError/>;
        }
        return (
            <div>
                <div>
                     <h3>Dodaj Stolik do Restauracji</h3>
                    <Form onSubmit={this.handleSubmit}>
                        <FormItem 
                            validateStatus={this.state.seatsNumber.validateStatus}
                            >
                            <Input 
                                required="required"
                                size="large"
                                name="seatsNumber"
                                autoComplete="off"
                                placeholder='Ilość miejsc przy stoliku'
                                value={this.state.seatsNumber.value} 
                                onChange={(event) => this.handleInputChange(event, this.validateName)}
                                 />    
                        </FormItem>
                        <FormItem>
                            <Button 
                                type="button" 
                                htmlType="submit" 
                                size="large" 
                                > 
                                Dodaj Stolik
                            </Button>
                        </FormItem>
                    </Form>
                </div>
            </div>
        );
    }

    // Walidacja
    validateName = (seatsNumber) => {
        if(seatsNumber.length < NUMBEROFSEATS_MIN_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Minimum ${NUMBEROFSEATS_MIN_LENGTH} znaków.`
            }
        } else if (seatsNumber.length > NUMBEROFSEATS_MAX_LENGTH) {
            return {
                validationStatus: 'error',
                errorMsg: `Maximum ${NUMBEROFSEATS_MAX_LENGTH} znaków.`
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null,
              };            
        }
    }
}

export default AddTable;