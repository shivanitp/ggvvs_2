import React, { Component } from 'react'
import {
  Platform,
  StatusBar,
  FlatList,
  TouchableOpacity,
  Image,
SafeAreaView,
  ActivityIndicator
} from 'react-native'
import {
  Form,
  Item,
  Input,
  Label,
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Left,
  Body,
  Right,
  View
} from 'native-base'
import Swiper from 'react-native-swiper'
import AsyncStorage from '@react-native-community/async-storage'
import NetInfo from "@react-native-community/netinfo";
import WebView from 'react-native-webview'
import Icon from 'react-native-vector-icons/Ionicons'
import CustomeFonts from '../Theme/CustomeFonts'
import Style from '../Theme/Style'
import Colors from '../Theme/Colors'
import { pic_url } from '../Static'
import { base_url } from '../Static'
import axois from 'axios'
import Moment from 'moment'

export default class App extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Matrimony List',
      headerTitleStyle: {
        width: '100%',
        fontWeight: '200',
        fontFamily: CustomeFonts.regular
      }
    }
  }

  constructor() {
    super()
    this.state = {
      data_list: [],
      data_list2: [],
      isLoding: false,
      imageUrlMember:'',
      imageUrlKundli:''
    }
  }

  async componentWillMount() {
    const samaj_id = await AsyncStorage.getItem('member_samaj_id')
    console.log('samaj id ', samaj_id)
    this.setState({
      samaj_id: samaj_id
    })

    NetInfo.isConnected.addEventListener(
      'connectionChange',
      this._handleConnectivityChange
    )
    NetInfo.isConnected.fetch().done(isConnected => {
      if (isConnected == true) {
        this.setState({ connection_Status: true })
        this.apiCalling()
      } else {
        this.setState({ connection_Status: false })
      }
    })
  }

  _handleConnectivityChange = isConnected => {
    if (isConnected == true) {
      this.setState({ connection_Status: true })
      this.apiCalling()
    } else {
      this.setState({ connection_Status: false })
    }
  }

  async apiCalling() {
    var list = this.props.navigation.getParam('itemData')
    var list2 = this.props.navigation.getParam('mainmember')
    var imageUrlKundli = this.props.navigation.getParam('imageUrlKundli')
    var imageUrlMember = this.props.navigation.getParam('imageUrlMember')
    this.setState({
      data_list: list,
      data_list2: list2,
      imageUrlKundli:imageUrlKundli,
      imageUrlMember:imageUrlMember,
      isLoding: false
    })
    // this.setState({ isLoding: true })
    // console.log(
    //   'base url: --',
    //   base_url + 'matrimonyList/' + this.state.samaj_id
    // )
    // axois
    //   .get(base_url + 'matrimonyList/' + this.state.samaj_id)
    //   .then(res => {
    //     console.log('matrimonyList res---->', res.data.data)
    //     this.setState({ isLoding: false })
    //     if (res.data.status === true) {
    //       this.setState({
    //         data_list: res.data.data,
    //         isLoding: false
    //       })
    //     }
    //   })
    //   .catch(err => {
    //     console.log(err)
    //     this.setState({ isLoding: false })
    //   })
  }
  //   getAge(dateString) {
  //     var date=moment(dateString).format(YYYY/MM/DD)
  //     console.log("Date" ,date)
  //     var today = new Date();
  //     var birthDate = new Date(dateString);
  //     var age = today.getFullYear() - birthDate.getFullYear();
  //     var m = today.getMonth() - birthDate.getMonth();
  //     if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
  //         age--;
  //     }
  //     return age;
  // }

  categoryRendeItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          this.props.navigation.navigate('MatrimonyDetails', { itemData: item, member: 'sub' })
        }
      >
        <View
          style={[Style.cardback, (style = { flex: 1, flexDirection: 'row' })]}
        >
          <TouchableOpacity onPress={() => this.props.navigation.navigate('KundliImage', { imageURl: this.state.imageUrlMember + item.md_photo })}>
            {item.md_photo === null ? (
              <Image
                resizeMode='stretch'
                source={{
                  uri:
                    'https://pngimage.net/wp-content/uploads/2018/05/default-user-profile-image-png-2.png'
                }}
                style={{ height: 80, width: 80, alignSelf: 'center' }}
              />
            ) : (
                <Image
                  resizeMode='stretch'
                  source={{ uri: this.state.imageUrlMember + item.md_photo }}
                  style={{ height: 80, width: 80, alignSelf: 'center' }}
                />
              )}
          </TouchableOpacity>
          <View style={{ flex: 5, justifyContent: 'center', marginLeft: 10 }}>
            <Text style={Style.Textmainstyle}>{item.md_name}</Text>

            {/* <View style={{ flexDirection: 'row' }} >
                            <Text style={[Style.Textstyle,{ flex: 3 }]}>Code</Text>
                            <Text style={[Style.Textstyle,{ marginLeft: 5, flex: 7 }]}>{item.member_code}</Text>
                        </View> */}

            <View style={{ flexDirection: 'row' }}>
              <Text style={[Style.Textstyle, { flex: 3 }]}>Birth Date</Text>
              <Text style={[Style.Textstyle, { marginLeft: 5, flex: 7 }]}>
                {Moment(item.md_birth_date).format('DD-MMMM-YYYY')}
              </Text>
            </View>

            <View style={{ flexDirection: 'row' }}>
              <Text style={[Style.Textstyle, { flex: 3 }]}>Country</Text>
              <Text style={[Style.Textstyle, { marginLeft: 5, flex: 7 }]}>
                {item.country_name}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  categoryRendeItem2 = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          this.props.navigation.navigate('MatrimonyDetails', { itemData: item, member: 'main',imageUrl:this.state.imageUrlKundli })
        }
      >
        <View
          style={[Style.cardback, (style = { flex: 1, flexDirection: 'row' })]}
        >
          <TouchableOpacity onPress={() => this.props.navigation.navigate('KundliImage', { imageURl: this.state.imageUrlMember + item.member_photo })}>

            {item.member_photo === null ? (
              <Image
                resizeMode='stretch'
                source={{
                  uri:
                    'https://pngimage.net/wp-content/uploads/2018/05/default-user-profile-image-png-2.png'
                }}
                style={{ height: 80, width: 80, alignSelf: 'center' }}
              />
            ) : (
                <Image
                  resizeMode='stretch'
                  source={{ uri: this.state.imageUrlMember + item.member_photo }}
                  style={{ height: 80, width: 80, alignSelf: 'center' }}
                />
              )}
          </TouchableOpacity>
          <View style={{ flex: 5, justifyContent: 'center', marginLeft: 10 }}>
            <Text style={Style.Textmainstyle}>{item.member_name}</Text>

            <View style={{ flexDirection: 'row' }}>
              <Text style={[Style.Textstyle, { flex: 3 }]}>Code</Text>
              <Text style={[Style.Textstyle, { marginLeft: 5, flex: 7 }]}>
                {item.member_code}
              </Text>
            </View>

            <View style={{ flexDirection: 'row' }}>
              <Text style={[Style.Textstyle, { flex: 3 }]}>Birth Date</Text>
              <Text style={[Style.Textstyle, { marginLeft: 5, flex: 7 }]}>
                {Moment(item.member_birth_date).format('DD-MM-YYYY')}
              </Text>
            </View>

            <View style={{ flexDirection: 'row' }}>
              <Text style={[Style.Textstyle, { flex: 3 }]}>Country</Text>
              <Text style={[Style.Textstyle, { marginLeft: 5, flex: 7 }]}>
                {item.country_name}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <SafeAreaView style={Style.cointainer1}>
        <StatusBar
          backgroundColor={Colors.Theme_color}
          barStyle='light-content'
        />
        {this.state.isLoding ? (
          <ActivityIndicator color={Colors.Theme_color} size={'large'} />
        ) : (
            <View>
              <FlatList
                showsVerticalScrollIndicator={false}
                data={this.state.data_list}
                renderItem={item => this.categoryRendeItem(item)}
              />
              <FlatList
                showsVerticalScrollIndicator={false}
                data={this.state.data_list2}
                renderItem={item => this.categoryRendeItem2(item)}
              />
            </View>
          )}
      </SafeAreaView>
    )
  }
}
