
import { Text, View,TouchableOpacity } from 'react-native';
import React from 'react'
import Svg, {
  Circle,
  Ellipse,
  G,
  TextPath,
  Path,
  Polygon,
  Polyline,
  Line,
  Rect,
  Use,
  Symbol,
  Defs,
  LinearGradient,
  RadialGradient,
  Stop,
  ClipPath,
  Pattern,
  Mask,
} from 'react-native-svg';
import { createStackNavigator } from "@react-navigation/stack";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs"
import {NavigationContainer} from '@react-navigation/native';
// You can import from local files
import Homebuyer from "./components/buyer/Homebuyer"
import Product from "./components/buyer/Product"
import Category from './components/buyer/Category';
import Layout from './hocs/Layout';
import Login from "./components/buyer/account/Login"
import store  from "./store"
import { Provider } from 'react-redux'
import Draggable from './components/seller/Draggable';
import Cart from './components/buyer/Cart';
import SameItem from './components/buyer/cart/SameItem';
import Dealshock from './components/buyer/cart/Dealshock';
import Promotion from './components/buyer/BundleDeal';
import Shop from './components/buyer/Shop';
import Homeaccount from './components/buyer/account/Home';
import Mail from './components/buyer/account/Mail';
import Notifycation from './components/buyer/account/Notify';
import Live from './components/livestream/Live';
import Checkout from './components/buyer/checkout/Checkout';
import ListAddress from './components/account/address/Address';
import Flashsale from './components/buyer/homepage/Flashsale';
import Homeseller from './components/seller/Homeseller';
import Newaddress from './components/account/address/Newaddress';
import Profile from './components/account/profile/Profile';
import EditBio from './components/account/profile/EditBio';
import Editname from './components/account/profile/Editname';
import Signup from './components/buyer/account/Signup';
import Editcity from './components/account/address/Editcity';
import Marketing from './components/seller/marketing/Marketing';
import Listvoucher from './components/seller/marketing/voucher/Listvoucher';
import Detailvoucher from './components/seller/marketing/voucher/Detailvoucher';
import Productoffer from './components/seller/marketing/Productoffer';
import DetailproductOffer from './components/seller/marketing/programs/DetailproductOffer';
import VariationOffers from './components/seller/marketing/programs/VariationOffer';
import Promotiontype from './components/seller/marketing/promotions/Prommotiontype';
import DetailFollowerOffer from './components/seller/marketing/follower/DetailFollowerOffer';
import Productvoucher from './components/seller/marketing/voucher/Productvoucher';
import Detailprogram from './components/seller/marketing/programs/Detailprogram';
import Gifts from './components/seller/marketing/buygift/Gifts';
import Mainproduct from './components/seller/marketing/buygift/Mainproduct';
import VariationGift from './components/seller/marketing/buygift/VariationGift';
import Detailgift from './components/seller/marketing/buygift/Detailgift';
import Listdiscountshop from './components/seller/marketing/programs/Listprogram';
import Listcomboshop from './components/seller/marketing/promotions/Listpromotion';
import Detailpromotion from './components/seller/marketing/promotions/Detailpromotion';
import Productcombo from './components/seller/marketing/promotions/Productcombo';
import ListGift from './components/seller/marketing/buygift/ListGift';
import Myproduct from './components/seller/products/Listproduct';
import Detailproduct from './components/seller/products/Detailproduct';
import Addcategory from './components/seller/products/Addcategory';
import Updatevariation from './components/seller/products/Updatevariation';
import Addvarriation from './components/seller/products/Addvariation';
import Feeship from './components/seller/products/Shipping';
import Addbuymore from './components/seller/products/Addbuymore';
import Setvariation from './components/seller/products/Setvariation';

// or any pure javascript modules available in npm
const Stack = createStackNavigator();
const Tab=createBottomTabNavigator()
function MyTabBar({ state, descriptors, navigation }) {
  return (
    <View style={{ flexDirection: 'row',backgroundColor:'#fff',padding:4 }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1,justifyContent:'center',alignItems:'center' }}
          >
            
            {route.name=='Home'?
            <Svg xmlns="http://www.w3.org/2000/svg" style={{width:24,height:24,color: isFocused ?'#ee4d2d':'#757575',stroke:isFocused ?'#ee4d2d':'#757575',fill:isFocused ?'#ee4d2d':'#757575' }}  viewBox="0 0 48 48"><Path d="M 23.951172 4 A 1.50015 1.50015 0 0 0 23.072266 4.3222656 L 8.859375 15.519531 C 7.0554772 16.941163 6 19.113506 6 21.410156 L 6 40.5 C 6 41.863594 7.1364058 43 8.5 43 L 18.5 43 C 19.863594 43 21 41.863594 21 40.5 L 21 30.5 C 21 30.204955 21.204955 30 21.5 30 L 26.5 30 C 26.795045 30 27 30.204955 27 30.5 L 27 40.5 C 27 41.863594 28.136406 43 29.5 43 L 39.5 43 C 40.863594 43 42 41.863594 42 40.5 L 42 21.410156 C 42 19.113506 40.944523 16.941163 39.140625 15.519531 L 24.927734 4.3222656 A 1.50015 1.50015 0 0 0 23.951172 4 z M 24 7.4101562 L 37.285156 17.876953 C 38.369258 18.731322 39 20.030807 39 21.410156 L 39 40 L 30 40 L 30 30.5 C 30 28.585045 28.414955 27 26.5 27 L 21.5 27 C 19.585045 27 18 28.585045 18 30.5 L 18 40 L 9 40 L 9 21.410156 C 9 20.030807 9.6307412 18.731322 10.714844 17.876953 L 24 7.4101562 z"/></Svg>
            :route.name=='Tôi'?
            <Svg style={{width:24,height:24,color: isFocused ?'#ee4d2d':'#757575',stroke:isFocused ?'#ee4d2d':'#757575',fill:isFocused ?'#ee4d2d':'#757575' }} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 60 60" enableBackground='new 0 0 60 60' xmlSpace="preserve">
              <Path d="M48.014,42.889l-9.553-4.776C37.56,37.662,37,36.756,37,35.748v-3.381c0.229-0.28,0.47-0.599,0.719-0.951  c1.239-1.75,2.232-3.698,2.954-5.799C42.084,24.97,43,23.575,43,22v-4c0-0.963-0.36-1.896-1-2.625v-5.319  c0.056-0.55,0.276-3.824-2.092-6.525C37.854,1.188,34.521,0,30,0s-7.854,1.188-9.908,3.53C17.724,6.231,17.944,9.506,18,10.056  v5.319c-0.64,0.729-1,1.662-1,2.625v4c0,1.217,0.553,2.352,1.497,3.109c0.916,3.627,2.833,6.36,3.503,7.237v3.309  c0,0.968-0.528,1.856-1.377,2.32l-8.921,4.866C8.801,44.424,7,47.458,7,50.762V54c0,4.746,15.045,6,23,6s23-1.254,23-6v-3.043  C53,47.519,51.089,44.427,48.014,42.889z"/>
            </Svg>
            :route.name=='Notification'?
            <Svg style={{width:24,height:24,color: isFocused ?'#ee4d2d':'#757575',stroke:isFocused ?'#ee4d2d':'#757575',fill:isFocused ?'#ee4d2d':'#757575' }} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><Path d="M10 15a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1h4zM8.5 0a.5.5 0 0 1 .5.5v.593a5.4 5.4 0 0 1 4.383 4.892l.54 7.015h.577a.5.5 0 1 1 0 1h-13a.5.5 0 1 1 0-1h.577l.54-7.015A5.4 5.4 0 0 1 7 1.093V.5a.5.5 0 0 1 .5-.5h1zM8 2a4.4 4.4 0 0 0-4.386 4.062L3.08 13h9.84l-.534-6.938A4.4 4.4 0 0 0 8 2z" fill-rule="evenodd"></Path></Svg>
            :route.name=='Live'?
            <Svg xmlns="http://www.w3.org/2000/svg" style={{width:24,height:24,color: isFocused ?'#ee4d2d':'#757575',stroke:isFocused ?'#ee4d2d':'#757575',fill:isFocused ?'#ee4d2d':'#757575' }} shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 512 329.79"><Path fill-rule="nonzero" d="M63.64 303.3h256.87c10.26 0 19.61-4.25 26.37-11.01 6.8-6.8 11.04-16.16 11.04-26.26V63.77c0-10.06-4.26-19.35-11.04-26.12-6.85-6.86-16.23-11.16-26.37-11.16H63.64c-10.19 0-19.61 4.25-26.42 11.06-6.78 6.77-11 16.04-11 26.22v202.26c0 10.24 4.2 19.56 10.95 26.31a37.36 37.36 0 0 0 26.47 10.96zm169.71-112.21h-59.47v-75.02h22.97v52.08h36.5v22.94zM192.07 52.31c31.07 0 59.23 12.62 79.6 32.98 20.37 20.37 32.99 48.53 32.99 79.6 0 31.07-12.62 59.23-32.99 79.6-20.37 20.37-48.53 32.99-79.6 32.99-31.07 0-59.23-12.62-79.6-32.99-20.37-20.37-32.99-48.53-32.99-79.6 0-31.07 12.62-59.23 32.99-79.6 20.37-20.36 48.53-32.98 79.6-32.98zm62.12 50.46c-15.88-15.88-37.86-25.73-62.12-25.73-24.26 0-46.23 9.85-62.12 25.73-15.88 15.89-25.73 37.86-25.73 62.12 0 24.26 9.85 46.24 25.73 62.12 15.89 15.89 37.86 25.73 62.12 25.73 24.26 0 46.24-9.84 62.12-25.73 15.88-15.88 25.73-37.86 25.73-62.12 0-24.26-9.85-46.23-25.73-62.12zm130.88-5.26v137.05l100.44 44.48V51.08L385.07 97.51zm-.93-28.7 108.31-50.06c1.88-1.02 4.02-1.59 6.3-1.59 7.31 0 13.25 5.93 13.25 13.24v268.98c-.01 1.79-.38 3.6-1.14 5.33-2.94 6.69-10.75 9.72-17.44 6.78l-109.28-48.4v2.94c0 17.37-7.22 33.39-18.82 44.99-11.53 11.54-27.4 18.77-44.81 18.77H63.64c-17.46 0-33.36-7.17-44.91-18.72C7.18 299.52 0 283.56 0 266.03V63.77c0-17.46 7.23-33.38 18.76-44.93C30.43 7.2 46.36 0 63.64 0h256.87c17.21 0 33.12 7.26 44.67 18.78l.08.09c11.6 11.61 18.88 27.56 18.88 44.9v5.04z"/></Svg>
            :<Svg xmlns="http://www.w3.org/2000/svg" style={{width:24,height:24,color: isFocused ?'#ee4d2d':'#757575',stroke:isFocused ?'#ee4d2d':'#757575',fill:isFocused ?'#ee4d2d':'#757575' }} id="Layer_1" data-name="Layer 1" viewBox="0 0 122.88 88.86"><Path d="M7.05,0H115.83a7.07,7.07,0,0,1,7,7.05V81.81a7,7,0,0,1-1.22,4,2.78,2.78,0,0,1-.66,1,2.62,2.62,0,0,1-.66.46,7,7,0,0,1-4.51,1.65H7.05a7.07,7.07,0,0,1-7-7V7.05A7.07,7.07,0,0,1,7.05,0Zm-.3,78.84L43.53,40.62,6.75,9.54v69.3ZM49.07,45.39,9.77,83.45h103L75.22,45.39l-11,9.21h0a2.7,2.7,0,0,1-3.45,0L49.07,45.39Zm31.6-4.84,35.46,38.6V9.2L80.67,40.55ZM10.21,5.41,62.39,47.7,112.27,5.41Z"/></Svg>}
            <Text style={{ textAlign:'center',fontSize:10,color: isFocused ? '#ee4d2d' : '#757575' }}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
const Homepage=()=>{
  return(
      <Tab.Navigator screenOptions={{ headerShown: false,tabBarActiveTintColor: '#ee4d2d' }} tabBar={props => <MyTabBar {...props} />}>
        <Tab.Screen name="Home" component={Homebuyer} 
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Svg xmlns="http://www.w3.org/2000/svg" style={{color:color,fill:color,stroke:color}}  viewBox="0 0 48 48" width="24px" height="24px"><Path d="M 23.951172 4 A 1.50015 1.50015 0 0 0 23.072266 4.3222656 L 8.859375 15.519531 C 7.0554772 16.941163 6 19.113506 6 21.410156 L 6 40.5 C 6 41.863594 7.1364058 43 8.5 43 L 18.5 43 C 19.863594 43 21 41.863594 21 40.5 L 21 30.5 C 21 30.204955 21.204955 30 21.5 30 L 26.5 30 C 26.795045 30 27 30.204955 27 30.5 L 27 40.5 C 27 41.863594 28.136406 43 29.5 43 L 39.5 43 C 40.863594 43 42 41.863594 42 40.5 L 42 21.410156 C 42 19.113506 40.944523 16.941163 39.140625 15.519531 L 24.927734 4.3222656 A 1.50015 1.50015 0 0 0 23.951172 4 z M 24 7.4101562 L 37.285156 17.876953 C 38.369258 18.731322 39 20.030807 39 21.410156 L 39 40 L 30 40 L 30 30.5 C 30 28.585045 28.414955 27 26.5 27 L 21.5 27 C 19.585045 27 18 28.585045 18 30.5 L 18 40 L 9 40 L 9 21.410156 C 9 20.030807 9.6307412 18.731322 10.714844 17.876953 L 24 7.4101562 z"/></Svg>
          ),
        }}
        />
        <Tab.Screen name="Mail" component={Mail}
        options={{
          tabBarLabel: 'Mail',
          tabBarIcon: ({ color, size }) => (
            <Svg xmlns="http://www.w3.org/2000/svg" style={{color:color,fill:color,stroke:color}}  viewBox="0 0 48 48" width="24px" height="24px"><Path d="M 23.951172 4 A 1.50015 1.50015 0 0 0 23.072266 4.3222656 L 8.859375 15.519531 C 7.0554772 16.941163 6 19.113506 6 21.410156 L 6 40.5 C 6 41.863594 7.1364058 43 8.5 43 L 18.5 43 C 19.863594 43 21 41.863594 21 40.5 L 21 30.5 C 21 30.204955 21.204955 30 21.5 30 L 26.5 30 C 26.795045 30 27 30.204955 27 30.5 L 27 40.5 C 27 41.863594 28.136406 43 29.5 43 L 39.5 43 C 40.863594 43 42 41.863594 42 40.5 L 42 21.410156 C 42 19.113506 40.944523 16.941163 39.140625 15.519531 L 24.927734 4.3222656 A 1.50015 1.50015 0 0 0 23.951172 4 z M 24 7.4101562 L 37.285156 17.876953 C 38.369258 18.731322 39 20.030807 39 21.410156 L 39 40 L 30 40 L 30 30.5 C 30 28.585045 28.414955 27 26.5 27 L 21.5 27 C 19.585045 27 18 28.585045 18 30.5 L 18 40 L 9 40 L 9 21.410156 C 9 20.030807 9.6307412 18.731322 10.714844 17.876953 L 24 7.4101562 z"/></Svg>
          ),
        }}
        />
        <Tab.Screen name="Live" component={Live}
        options={{
          tabBarLabel: 'Live',
          tabBarIcon: ({ color, size }) => (
            <Svg xmlns="http://www.w3.org/2000/svg" style={{color:color,fill:color,stroke:color}}  viewBox="0 0 48 48" width="24px" height="24px"><Path d="M 23.951172 4 A 1.50015 1.50015 0 0 0 23.072266 4.3222656 L 8.859375 15.519531 C 7.0554772 16.941163 6 19.113506 6 21.410156 L 6 40.5 C 6 41.863594 7.1364058 43 8.5 43 L 18.5 43 C 19.863594 43 21 41.863594 21 40.5 L 21 30.5 C 21 30.204955 21.204955 30 21.5 30 L 26.5 30 C 26.795045 30 27 30.204955 27 30.5 L 27 40.5 C 27 41.863594 28.136406 43 29.5 43 L 39.5 43 C 40.863594 43 42 41.863594 42 40.5 L 42 21.410156 C 42 19.113506 40.944523 16.941163 39.140625 15.519531 L 24.927734 4.3222656 A 1.50015 1.50015 0 0 0 23.951172 4 z M 24 7.4101562 L 37.285156 17.876953 C 38.369258 18.731322 39 20.030807 39 21.410156 L 39 40 L 30 40 L 30 30.5 C 30 28.585045 28.414955 27 26.5 27 L 21.5 27 C 19.585045 27 18 28.585045 18 30.5 L 18 40 L 9 40 L 9 21.410156 C 9 20.030807 9.6307412 18.731322 10.714844 17.876953 L 24 7.4101562 z"/></Svg>
          ),
        }}
        />
        <Tab.Screen name="Notification" component={Notifycation}
        options={{
          tabBarLabel: 'Notification',
          tabBarIcon: ({ color, size }) => (
            <Svg xmlns="http://www.w3.org/2000/svg" style={{color:color,fill:color,stroke:color}}  viewBox="0 0 48 48" width="24px" height="24px"><Path d="M 23.951172 4 A 1.50015 1.50015 0 0 0 23.072266 4.3222656 L 8.859375 15.519531 C 7.0554772 16.941163 6 19.113506 6 21.410156 L 6 40.5 C 6 41.863594 7.1364058 43 8.5 43 L 18.5 43 C 19.863594 43 21 41.863594 21 40.5 L 21 30.5 C 21 30.204955 21.204955 30 21.5 30 L 26.5 30 C 26.795045 30 27 30.204955 27 30.5 L 27 40.5 C 27 41.863594 28.136406 43 29.5 43 L 39.5 43 C 40.863594 43 42 41.863594 42 40.5 L 42 21.410156 C 42 19.113506 40.944523 16.941163 39.140625 15.519531 L 24.927734 4.3222656 A 1.50015 1.50015 0 0 0 23.951172 4 z M 24 7.4101562 L 37.285156 17.876953 C 38.369258 18.731322 39 20.030807 39 21.410156 L 39 40 L 30 40 L 30 30.5 C 30 28.585045 28.414955 27 26.5 27 L 21.5 27 C 19.585045 27 18 28.585045 18 30.5 L 18 40 L 9 40 L 9 21.410156 C 9 20.030807 9.6307412 18.731322 10.714844 17.876953 L 24 7.4101562 z"/></Svg>
          ),
        }}
        />
        <Tab.Screen name="Tôi" component={Homeaccount}
        options={{
          tabBarLabel: 'Tôi',
          tabBarIcon: ({ color, size }) => (
            <Svg xmlns="http://www.w3.org/2000/svg" style={{color:color,fill:color,stroke:color}}  viewBox="0 0 48 48" width="24px" height="24px"><Path d="M 23.951172 4 A 1.50015 1.50015 0 0 0 23.072266 4.3222656 L 8.859375 15.519531 C 7.0554772 16.941163 6 19.113506 6 21.410156 L 6 40.5 C 6 41.863594 7.1364058 43 8.5 43 L 18.5 43 C 19.863594 43 21 41.863594 21 40.5 L 21 30.5 C 21 30.204955 21.204955 30 21.5 30 L 26.5 30 C 26.795045 30 27 30.204955 27 30.5 L 27 40.5 C 27 41.863594 28.136406 43 29.5 43 L 39.5 43 C 40.863594 43 42 41.863594 42 40.5 L 42 21.410156 C 42 19.113506 40.944523 16.941163 39.140625 15.519531 L 24.927734 4.3222656 A 1.50015 1.50015 0 0 0 23.951172 4 z M 24 7.4101562 L 37.285156 17.876953 C 38.369258 18.731322 39 20.030807 39 21.410156 L 39 40 L 30 40 L 30 30.5 C 30 28.585045 28.414955 27 26.5 27 L 21.5 27 C 19.585045 27 18 28.585045 18 30.5 L 18 40 L 9 40 L 9 21.410156 C 9 20.030807 9.6307412 18.731322 10.714844 17.876953 L 24 7.4101562 z"/></Svg>
          ),
        }}
        />
      </Tab.Navigator>
  )
}

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Layout>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              }}
            >
            <Stack.Screen name="Homepage" component={Homepage} />
            {/*/auth screem*/}
            
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="Login" component={Login} />
            {/*/profile screem*/}
            <Stack.Group screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Profile" component={Profile} />
              <Stack.Screen name="Editname" component={Editname} />
              <Stack.Screen name="EditBio" component={EditBio} />
            </Stack.Group>
            {/*/address screem*/}
            <Stack.Group screenOptions={{ headerShown: false }}>
              <Stack.Screen name="ListAddress" component={ListAddress} />
              <Stack.Screen name="FormAddress" component={Editcity} />
              <Stack.Screen name="Newaddress" component={Newaddress} />
            </Stack.Group>
            <Stack.Screen name="Myproduct" component={Myproduct} />
            <Stack.Group screenOptions={{ headerShown: false }}>
              
              <Stack.Screen name="Detailproduct" component={Detailproduct} />
              <Stack.Screen name="Addcategory" component={Addcategory} />
              <Stack.Screen name="Addvariation" component={Addvarriation} />
              <Stack.Screen name="Updatevariation" component={Updatevariation} />
              <Stack.Screen name="Feeship" component={Feeship} />
              <Stack.Screen name="Addbuymore" component={Addbuymore} />
              <Stack.Screen name="Setvariation" component={Setvariation} />
            </Stack.Group>
            
            <Stack.Screen name="Product" component={Product} />
            <Stack.Screen name="SameItem" component={SameItem} />
            <Stack.Screen name="Flashsale" component={Flashsale} />
            <Stack.Screen name="Cart" component={Cart} />
            <Stack.Screen name="Checkout" component={Checkout} />
            <Stack.Screen name="Dealshock" component={Dealshock} />
            <Stack.Screen name="BundleDeal" component={Promotion} />
            <Stack.Screen name="Category" component={Category} />
            <Stack.Screen name="Shop" component={Shop} />
            {/*/seller screem*/}
            <Stack.Group screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Homeseller" component={Homeseller} />
            </Stack.Group> 
            <Stack.Screen name="Marketing" component={Marketing} />
            <Stack.Screen name="ProductOffer" component={Productoffer} />
            <Stack.Group screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Listprogram" component={Listdiscountshop} />
              <Stack.Screen name="Detailprogram" component={Detailprogram} />
              <Stack.Screen name="DetailproductOffer" component={DetailproductOffer} />
              <Stack.Screen name="VariationOffers" component={VariationOffers} />
            </Stack.Group>
            <Stack.Group screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Promotiontype" component={Promotiontype} />
              <Stack.Screen name="Productcombo" component={Productcombo} />
              <Stack.Screen name="Detailcombo" component={Detailpromotion} />
              <Stack.Screen name="Listcomboshop" component={Listcomboshop} />
            </Stack.Group>
            
            <Stack.Group screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Listvoucher" component={Listvoucher} />
              <Stack.Screen name="Detailvoucher" component={Detailvoucher} />
              <Stack.Screen name="Productvoucher" component={Productvoucher} />
            </Stack.Group>
            <Stack.Group screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Gifts" component={Gifts} />
              <Stack.Screen name="ListGift" component={ListGift} />
              <Stack.Screen name="DetailGift" component={Detailgift} />
              <Stack.Screen name="Mainproduct" component={Mainproduct} />
              <Stack.Screen name="VariationGift" component={VariationGift} />
            </Stack.Group>
            <Stack.Screen name="DetailFollowerOffer" component={DetailFollowerOffer} />
          </Stack.Navigator>
        </Layout>
      </NavigationContainer>
    </Provider>
  );
}


