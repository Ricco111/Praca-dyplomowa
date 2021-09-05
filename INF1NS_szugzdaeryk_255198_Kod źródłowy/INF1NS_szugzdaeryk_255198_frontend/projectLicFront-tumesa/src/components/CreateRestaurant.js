import React, {Component} from 'react';
import {
    RESTAURANTNAME_MAX_LENGTH,
    RESTAURANTNAME_MIN_LENGTH,
    NIP_MAX_LENGTH,
    NIP_MIN_LENGTH,
    REGON_MAX_LENGTH,
    REGON_MIN_LENGTH,
    STREET_MIN_LENGTH,
    STREET_MAX_LENGTH,
    BUILDINGNUMBER_MIN_LENGTH,
    BUILDINGNUMBER_MAX_LENGTH,
    CITY_MIN_LENGTH,
    CITY_MAX_LENGTH,
    FLATNUMBER_MIN_LENGTH,
    FLATNUMBER_MAX_LENGTH
} from '../constants';
import {GetUserFromToken, RequestApi, getCurrentUser} from "../util/APIUtils";
import Loading from '../common/Loading';
import NotFound from '../common/NotFound';
import ServerError from '../common/ServerError';
import {Button, Form, Input} from 'antd';

const FormItem = Form.Item;

class CreateRestaurant extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: GetUserFromToken().userId,
            name: {
                value: ''
            },
            city: {
                value: ''
            },
            street:{
                value: ''
            },
            buildingNumber:{
                value: ''
            },
            flatNumber:{
                value: ''
            },
            nip:{
                value: ''
            },
            regon:{
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
        const params = {
            userId: GetUserFromToken().userId,
            name: this.state.name.value,
            city: this.state.city.value,
            street: this.state.street.value,
            buildingNumber: this.state.buildingNumber.value,
            flatNumber: this.state.flatNumber.value,
            nip: this.state.nip.value,
            regon: this.state.regon.value,
        };
        RequestApi(`/restaurant`, 'POST', params)
        .then(response => {
            window.location.href = `/restaurant`
            console.log(this.state.userId);
            console.log(params)
            alert('Twoja Restauracja została pomyślnie stworzona');
        }).catch(err => {
            alert('Twoja Restauracja nie została stworzona');
        })
    }

    isFormInvalid() {
        return !(this.state.name.validateStatus === 'success' && 
            this.state.city.validateStatus === 'success' &&
            this.state.street.validateStatus === 'success' &&
            this.state.buildingNumber.validateStatus === 'success' &&
            this.state.flatNumber.validateStatus === 'success' &&
            this.state.nip.validateStatus === 'success' &&
            this.state.regon.validateStatus === 'success'
        );
    }

    loadUserProfile(userId) {
        this.setState({
            isLoading: true
        });
        getCurrentUser(userId)
            .then(response => {
                this.setState({
                    user: response,
                    isLoading: false
                });
            }).catch(error => {
            if (error.status === 404) {
                this.setState({
                    notFound: true,
                    isLoading: false
                });
            } else {
                this.setState({
                    serverError: true,
                    isLoading: false
                });
            }
        });
    }

    componentDidMount() {
        this._isMounted = true;
        const userId = this.props.match.params.userId;
        this.loadUserProfile(userId);
    }

    componentDidUpdate(nextProps) {
        if (this.props.match.params.userId !== nextProps.match.params.userId) {
            this.loadUserProfile(nextProps.match.params.userId);
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
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
                <h1 className="page-title">Dodaj Restaurację </h1>
                <div>
                    <Form onSubmit={this.handleSubmit}>
                        <FormItem 
                            validateStatus={this.state.name.validateStatus}
                            >
                            <Input 
                                required="required"
                                size="large"
                                name="name"
                                autoComplete="off"
                                placeholder='Nazwa Restauracji'
                                value={this.state.name.value} 
                                onChange={(event) => this.handleInputChange(event, this.validateName)}
                                 />    
                        </FormItem>
                        <FormItem 
                            validateStatus={this.state.city.validateStatus}
                            help={this.state.city.errorMsg}>
                            <Input 
                                required="required"
                                size="large"
                                name="city"
                                autoComplete="off"
                                placeholder="Miasto"
                                value={this.state.city.value} 
                                onChange={(event) => this.handleInputChange(event, this.validateCity)} />    
                        </FormItem>
                        <FormItem 
                            validateStatus={this.state.street.validateStatus}
                            help={this.state.street.errorMsg}>
                            <Input 
                                required="required"
                                size="large"
                                name="street"
                                autoComplete="off"
                                placeholder="Nazwa ulicy"
                                value={this.state.street.value} 
                                onChange={(event) => this.handleInputChange(event, this.validateStreet)} />    
                        </FormItem>
                        <FormItem 
                            validateStatus={this.state.buildingNumber.validateStatus}
                            help={this.state.buildingNumber.errorMsg}>
                            <Input 
                                required="required"
                                size="large"
                                name="buildingNumber"
                                autoComplete="off"
                                placeholder="Numer Budynku"
                                value={this.state.buildingNumber.value} 
                                onChange={(event) => this.handleInputChange(event, this.validateBuildingNumber)} />    
                        </FormItem>
                        <FormItem 
                            validateStatus={this.state.flatNumber.validateStatus}
                            help={this.state.flatNumber.errorMsg}>
                            <Input 
                                // required="required"
                                size="large"
                                name="flatNumber"
                                autoComplete="off"
                                placeholder="Numer salonu"
                                value={this.state.flatNumber.value} 
                                onChange={(event) => this.handleInputChange(event, this.validateFlatNumber)} />    
                        </FormItem>
                        <FormItem 
                            validateStatus={this.state.nip.validateStatus}
                            help={this.state.nip.errorMsg}>
                            <Input 
                                required="required"
                                size="large"
                                name="nip"
                                autoComplete="off"
                                placeholder="NIP"
                                value={this.state.nip.value} 
                                onChange={(event) => this.handleInputChange(event, this.validateNip)} />    
                        </FormItem>
                        <FormItem 
                            validateStatus={this.state.regon.validateStatus}
                            help={this.state.regon.errorMsg}>
                            <Input 
                                required="required"
                                size="large"
                                name="regon"
                                autoComplete="off"
                                placeholder="REGON"
                                value={this.state.regon.value} 
                                onChange={(event) => this.handleInputChange(event, this.validateRegon)} />    
                        </FormItem>
                        <FormItem>
                            <Button 
                                type="button" 
                                htmlType="submit" 
                                size="large" 
                                > 
                                Dodaj Restaurację
                            </Button>
                        </FormItem>
                    </Form>
                </div>
            </div>
        );
    }

    // Walidacje
    validateName = (name) => {
        if(name.length < RESTAURANTNAME_MIN_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Nazwa Restauracji jest za krótka (Minimum ${RESTAURANTNAME_MIN_LENGTH} znaków.)`
            }
        } else if (name.length > RESTAURANTNAME_MAX_LENGTH) {
            return {
                validationStatus: 'error',
                errorMsg: `Nazwa Restauracji jest za długa (Maximum ${RESTAURANTNAME_MAX_LENGTH} znaków.)`
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null,
              };            
        }
    }

    validateNip = (nip) => {
        if(nip.length < NIP_MIN_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `NIP jest z krótki (Minimum ${NIP_MIN_LENGTH} znaków.)`
            }
        } else if (nip.length > NIP_MAX_LENGTH) {
            return {
                validationStatus: 'error',
                errorMsg: `NIP jest za długi (Maximum ${NIP_MAX_LENGTH} znaków.)`
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null,
              };            
        }
    }

    validateBuildingNumber = (buildingNumber) => {
        if(buildingNumber.length < BUILDINGNUMBER_MIN_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Numer budynku za krótki (Minimum ${BUILDINGNUMBER_MIN_LENGTH} cyfr.)`
            }
        } else if (buildingNumber.length > BUILDINGNUMBER_MAX_LENGTH) {
            return {
                validationStatus: 'error',
                errorMsg: `Numer budynku za długi (Maximum ${BUILDINGNUMBER_MAX_LENGTH} cyfr.)`
            }
        } else {
            return {
                validateStatus: null,
                errorMsg: null
            }
        }
    }

    validateRegon = (regon) => {
        if(regon.length < REGON_MIN_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `REGON za krótki (Minimum ${REGON_MIN_LENGTH} znaków.)`
            }
        } else if (regon.length > REGON_MAX_LENGTH) {
            return {
                validationStatus: 'error',
                errorMsg: `REGON za długi (Maximum ${REGON_MAX_LENGTH} znaków.)`
            }
        } else {
            return {
                validateStatus: null,
                errorMsg: null
            }
        }
    }

    validateCity = (city) => {
        if(city.length < CITY_MIN_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Nazwa miasta za krótka (Minimum ${CITY_MIN_LENGTH} znaków.)`
            }
        } else if (city.length > CITY_MAX_LENGTH) {
            return {
                validationStatus: 'error',
                errorMsg: `Nazwa miasta za długa (Maximum ${CITY_MAX_LENGTH} znaków.)`
            }
        } else {
            return {
                validateStatus: null,
                errorMsg: null
            }
        }
    }

    validateStreet = (street) => {
        if(street.length < STREET_MIN_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Ulica za krótka(Minimum ${STREET_MIN_LENGTH} znaków.)`
            }
        } else if (street.length > STREET_MAX_LENGTH) {
            return {
                validationStatus: 'error',
                errorMsg: `Ulica za długa (Maximum ${STREET_MAX_LENGTH} znaków.)`
            }
        } else {
            return {
                validateStatus: null,
                errorMsg: null
            }
        }
    }

    validateFlatNumber = (flatNumber) => {
        if(flatNumber.length < FLATNUMBER_MIN_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Numer salonu za krótki (Minimum ${FLATNUMBER_MIN_LENGTH} cyfr.)`
            }
        } else if (flatNumber.length > FLATNUMBER_MAX_LENGTH) {
            return {
                validationStatus: 'error',
                errorMsg: `Numer salonu za długi (Maximum ${FLATNUMBER_MAX_LENGTH} cyfr.)`
            }
        } else {
            return {
                validateStatus: null,
                errorMsg: null
            }
        }
    }
}

export default  CreateRestaurant;