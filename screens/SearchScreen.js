import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, FlatList} from 'react-native';
import { Carousel, Flex, Icon, SearchBar } from '@ant-design/react-native';
import { getKeyWords } from '../api'
import LogoTitle  from "../components/Title";

export default class BasicCarouselExample extends React.Component {

  static navigationOptions = {
    headerLeft: null,
    headerStyle: {
      backgroundColor: '#fff',
      height: 0,
      boxShadow: 'none',
    }
  }

  state = {
    value: '',
    keyWords: [
      {'key': '1212121'}
    ],
    books: []
  }
  

  componentDidMount() {
  }

  clear () {
    this.props.navigation.goBack()
  }

  valueChange (value) {
    this.setState({
      value
    }, () => {
      console.log(value)
      getKeyWords({query:value}).then(res => {
        if (this.state.value === value) {
          let arr = []
          if (res.data.keywords.length > 0) {
            arr = res.data.keywords.map((v) => {
              return {'key': v}
            })
          }
          this.setState({
            keyWords: arr
          })
        }
      })
    })
  }

  render() {
    return (
      <View>
          <SearchBar
            value={this.state.value}
            placeholder="输入书名进行搜索"
            onCancel={this.clear.bind(this)}
            onChange={this.valueChange.bind(this)}
            showCancelButton
          />
          <ScrollView>
          <FlatList
            data={this.keyWords}
            renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
          />
          </ScrollView>
      </View>

    );
  }
}
const styles = StyleSheet.create({
  item: {
    height: 160
  }
});