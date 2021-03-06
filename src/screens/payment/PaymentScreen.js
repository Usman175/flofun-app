import React, { Component } from 'react'
import { Text, View, StatusBar, TouchableOpacity, Image } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { MaterialIcons, FontAwesome } from '@expo/vector-icons'
import { connect } from 'react-redux'
import numeral from 'numeral'

import styles from './styles/paymentScreen'
import Footer from '../../commons/Footer'
import HeaderStack from '../../commons/HeaderStack'

@connect(state => ({
  selectedFlowers: state.flowerShop.selectedFlowers,
}))
export default class PaymentScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    drawerLabel: 'Checkout',
    title: 'Checkout',
    drawerIcon: ({ tintColor }) => <MaterialIcons name="payment" size={20} color={tintColor} />,
    ...HeaderStack(navigation),
  })

  render() {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'OrderStatus' })],
    })

    const { selectedFlowers } = this.props

    const paymentButtons = (
      <View style={styles.paymentButtons}>
        <View style={styles.paymentButton}>
          <TouchableOpacity onPress={() => console.log('credit card')}>
            <MaterialIcons name="payment" size={30} color="#fff" />
          </TouchableOpacity>
        </View>
        <View style={styles.paymentButton}>
          <TouchableOpacity onPress={() => console.log('apple pay')}>
            <FontAwesome name="apple" size={30} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    )

    const sumPrice = selectedFlowers.reduce((acc, val) => acc + val.price * val.quantity, 0)
    const shipping = sumPrice * 0.02
    const taxes = (sumPrice + shipping) * 0.09
    const total = sumPrice + shipping + taxes

    return (
      <View style={styles.root}>
        <StatusBar barStyle="light-content" />
        <View style={styles.contentContainer}>
          <View style={styles.checkoutItems}>
            {selectedFlowers.map(flower =>
              <View key={flower._id} style={styles.checkoutItem}>
                <View style={styles.circle}>
                  <Image source={{ uri: flower.image }} style={styles.selectedImage} />
                </View>
                <View style={styles.itemDesc}>
                  <Text style={styles.text}>{`${flower.title} (X${flower.quantity})`} </Text>
                  <Text style={styles.text}>{`$ ${numeral(flower.price * flower.quantity).format(
                    '0,0.00',
                  )}`}</Text>
                </View>
              </View>,
            )}
          </View>
          <View style={styles.priceDetails}>
            <View style={styles.priceItem}>
              <Text style={styles.text}>Sub Total: </Text>
              <Text style={styles.text}>{`$ ${numeral(sumPrice).format('0,0.00')}`}</Text>
            </View>
            <View style={styles.priceItem}>
              <Text style={styles.text}>Shipping: </Text>
              <Text style={styles.text}>{`$ ${numeral(shipping).format('0,0.00')}`}</Text>
            </View>
            <View style={styles.priceItem}>
              <Text style={styles.text}>Taxes: </Text>
              <Text style={styles.text}>{`$ ${numeral(taxes).format('0,0.00')}`}</Text>
            </View>
            <View style={styles.priceItem}>
              <Text style={styles.text}>Order Total: </Text>
              <Text style={styles.text}>{`$ ${numeral(total).format('0,0.00')}`}</Text>
            </View>
          </View>
        </View>
        <Footer
          nextCallback={() => this.props.navigation.dispatch(resetAction)}
          leftContainer={paymentButtons}
          showArrow={false}
        />
      </View>
    )
  }
}
