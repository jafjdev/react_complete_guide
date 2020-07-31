import React, {Component} from 'react';
import Aux from "../../hoc/Auxiliary/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from '../../axios-orders'
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7

};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false
  };

  async componentDidMount() {
    try {
      const ingredient = await axios.get('https://react-my-burger-542e3.firebaseio.com/ingredients.json');
      this.setState({ingredients: ingredient.data});
    } catch (e) {
      this.setState({error: true});
    }
  }

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
    this.setState({ingredients: updatedIngredients, totalPrice: newPrice});
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
    this.setState({loading: true});
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
      this.setState({loading: false, purchasing: false})
    }).catch(error => this.setState({loading: false, purchasing: false}))
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }
    let orderSummary = <OrderSummary
      price={this.state.totalPrice}
      purchaseCanceled={this.purchaseCancelHandler}
      purchaseContinued={this.purchaseContinueHandler}
      ingredients={this.state.ingredients}
    />;


    let burgerComps = (<Aux>
      <Burger ingredients={this.state.ingredients}/>
      <BuildControls
        price={this.state.totalPrice}
        ingredientAdded={this.addIngredientHandler}
        ingredientRemoved={this.removeIngredientHandler}
        ordered={this.purchaseHandler}
        purchasable={!this.state.purchasable}
        disabled={disabledInfo}/>
    </Aux>);
    let burgerArea = this.state.ingredients ? burgerComps : <Spinner/>;
    let summary = this.state.ingredients ? orderSummary : <Spinner/>;
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

export default withErrorHandler(BurgerBuilder, axios);
