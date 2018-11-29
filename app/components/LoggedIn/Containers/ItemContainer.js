import React, { Component } from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import Item from "../Presentational/Item";
import { Icon, Container, Content, Text, Card } from "native-base";
import { StackActions, NavigationActions } from "react-navigation";

const Key = "OvTrWbUT";
const dealsURL = "https://api.discountapi.com/v2/deals";

//  example Api Call - query, location (latitude, longitude), results per page and page number
// https://api.discountapi.com/v2/deals?query=adult&location=39.151958,-84.477405&per_page=30&page=1

//memory leak
// const resetAction = StackActions.reset({
//   index: 0,
//   actions: [
//     NavigationActions.navigate({
//       routeName: "Home"
//     })
//   ]
// });
// this.props.navigation.dispatch(resetAction);
export default class ItemContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      items: null
    };
  }
  componentDidMount() {
    fetch(dealsURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        api_key: Key
      }
    })
      .then(res => res.json())
      .then(data => this.setState({ items: data.deals, isLoading: false }));
  }

  queryFetch = query => {
    fetch(dealsURL + `?query=${query}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        api_key: Key
      }
    })
      .then(res => res.json())
      .then(data => {
        this.setState({ items: data.deals });
      });
  };
  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.Activity}>
          <ActivityIndicator size="large" />
        </View>
      );
    } else if (this.props.query) {
      {
        this.queryFetch(this.props.query);
      }
      return (
        <Container>
          <Content>
            {this.state.items.map(deal => {
              return (
                <Item
                  handleFavorite={this.props.handleFavorite}
                  handleUnFavorite={this.props.handleUnFavorite}
                  id={deal.deal.id}
                  deal={deal.deal}
                  navigation={this.props.navigation}
                  itemsFavorited={this.props.itemsFavorited}
                  user_info={this.props.user_info}
                />
              );
            })}
          </Content>
        </Container>
      );
    } else {
      return (
        <Container>
          <Content>
            {this.state.items.map(deal => {
              return (
                <Item
                  handleFavorite={this.props.handleFavorite}
                  handleUnFavorite={this.props.handleUnFavorite}
                  id={deal.deal.id}
                  deal={deal.deal}
                  navigation={this.props.navigation}
                  itemsFavorited={this.props.itemsFavorited}
                  user_info={this.props.user_info}
                />
              );
            })}
          </Content>
        </Container>
      );
    }
  }
}

const styles = StyleSheet.create({
  Activity: {
    flex: 1,
    justifyContent: "center"
  }
});
