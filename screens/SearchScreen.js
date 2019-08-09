import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, FlatList, Dimensions} from 'react-native';
import { Carousel, Flex, Icon, SearchBar } from '@ant-design/react-native';
import { getKeyWords, getSearchBooks } from '../api'
import BookBox  from "../components/BookBox";

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
    keyWords: [],
    books: [],
  }

  clear () {
    this.props.navigation.goBack()
  }

  async liClick (key) {
    this.setState({
      value: key
    }, () => {
      this.getBooks()
    })
  }

  async getBooks () {
    let { value } = this.state
    let self = this
    try {
      let result = await getSearchBooks({query: value})
      let arr = []
      if (result.data.books.length > 0) {
          arr = result.data.books.map((v) => {
            v['key'] = v['_id']
            return v
          })
      }
      self.setState({
        books: arr,
        keyWords: []
      })
    } catch(e) {
      Toast.info('哎呀, 出错了')
    }
  }

  valueChange (value) {
    this.setState({
      value
    }, () => {
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
      <View style={styles.Box}>
          <SearchBar
            value={this.state.value}
            placeholder="输入书名进行搜索"
            onCancel={this.clear.bind(this)}
            onChange={this.valueChange.bind(this)}
            showCancelButton
          />
          <View style={[styles.Box, styles.searchBox]}>

          <ScrollView style={styles.bookList}>
              <FlatList
                data={this.state.books}
                renderItem={({item}) => <BookBox book={item}></BookBox> }
              />
            </ScrollView>

            <FlatList
              // 这个属性是用来设置点击两次才会提交的bug
              keyboardShouldPersistTaps="always"
              style={styles.keyWords}
              data={this.state.keyWords}
              renderItem={({item}) => <View style={styles.item}><Text onPress={this.liClick.bind(this, item.key)}>{item.key}</Text></View> }
            />
          </View>

      </View>

    );
  }
}
const styles = StyleSheet.create({
  item: {
    height: 40,
    paddingLeft: 20,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    flex: 1,
    justifyContent: 'center'
  },
  Box: {
    flex: 1,
    backgroundColor: '#fff'
  },
  searchBox: {
    position: 'relative'
  },
  keyWords: {
    zIndex: 99,
    width: Dimensions.get('window').width,
    position: 'absolute',
    backgroundColor: '#fff'
  },
  bookList: {
    backgroundColor: '#fff',
  }
});