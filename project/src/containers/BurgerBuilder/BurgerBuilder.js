import React, {Component} from 'react';
import Aux from "../../hoc/Auxiliary/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from '../../axios-orders'
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actionTypes from '../../store/actions';
import {connect} from 'react-redux';

class BurgerBuilder extends Component {
    state = {
        purchasing: false,
        loading: false,
        error: false
    };

    async componentDidMount() {
        /*    try {
              const ingredient = await axios.get('https://react-my-burger-542e3.firebaseio.com/ingredients.json');
              this.setState({ingredients: ingredient.data});
            } catch (e) {
              this.setState({error: true});
            }*/
    }

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients).map((ingredient) => {
            return ingredients[ingredient];
        }).reduce((sum, el) => {
            return sum + el;
        }, 0);

        return sum > 0
    };

    purchaseHandler = () => {
        this.setState({purchasing: true});
    };

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    };

    purchaseContinueHandler = () => {
        const queryParams = [];
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push('price=' + this.props.price);
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        })
    };

    render() {
        const disabledInfo = {
            ...this.props.ings
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary = <OrderSummary
            price={this.props.price}
            purchaseCanceled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}
            ingredients={this.props.ings}
        />;

        let burgerComps = (<Aux>
            <Burger ingredients={this.props.ings}/>
            <BuildControls
                price={this.props.price}
                ingredientAdded={this.props.onIngredientAdded}
                ingredientRemoved={this.props.onIngredientRemoved}
                ordered={this.purchaseHandler}
                purchasable={this.updatePurchaseState(this.props.ings)}
                disabled={disabledInfo}/>
        </Aux>);
        let burgerArea = this.props.ings ? burgerComps : <Spinner/>;
        let summary = this.props.ings ? orderSummary : <Spinner/>;
        if (this.state.loading) {
            summary = <Spinner/>
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing}
                       clicked={this.purchaseCancelHandler}
                >
                    {summary}
                </Modal>
                {burgerArea}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
};
const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
        onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
