import React, {Component} from 'react';
import Aux from "../../hoc/Auxiliary/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from '../../axios-orders'

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7

};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
  };

  updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients).map((ingredient) => {
      return ingredients[ingredient];
    }).reduce((sum, el) => {
      return sum + el;
    }, 0);

    this.setState({purchasable: sum > 0})
  };

  addIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({ingredients: updatedIngredients, totalPrice: newPrice});
    this.updatePurchaseState(updatedIngredients);
  };

  removeIngredientHandler = type => {
    const updatedIngredients = {
      ...this.state.ingredients
    };
    const oldCount = updatedIngredients[type];
    if (oldCount <= 0)
      return;
    const newCount = oldCount - 1;
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - INGREDIENT_PRICES[type];
    updatedIngredients[type] = newCount;
    this.setState({ingredients: updatedIngredients, totalPrice: newPrice})
    this.updatePurchaseState(updatedIngredients);
  };

  purchaseHandler = () => {
    this.setState({purchasing: true});
  };

  purchaseCancelHandler = () => {
    this.setState({purchasing: false});
  };

  purchaseContinueHandler = () => {
    //alert('You continued!');
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: 'jose',
        address: {
          street: 'test',
          zipCode: '4123',
          country: 'Venezuela'
        },
        email: 'jose@gmail.com'
      },
      deliveryMethod: 'fastest'
    };
    axios.post('/orders.json', order).then(r => {
      console.log(r)
    }).catch(error => console.log(error))
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }

    return (
      <Aux>
        <Modal show={this.state.purchasing}
               clicked={this.purchaseCancelHandler}
        >
          <OrderSummary
            price={this.state.totalPrice}
            purchaseCanceled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}
            ingredients={this.state.ingredients}
          />
        </Modal>
        <Burger ingredients={this.state.ingredients}/>
        <BuildControls
          price={this.state.totalPrice}
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          ordered={this.purchaseHandler}
          purchasable={!this.state.purchasable}
          disabled={disabledInfo}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;
