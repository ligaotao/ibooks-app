import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { Carousel, Flex } from '@ant-design/react-native';
import { getRankingList } from '../api'

export default class BasicCarouselExample extends React.Component {

  state = {
    actions: [
      {url: '', icon: require('../assets/images/ico-1.png'), id: 1},
      {url: '', icon: require('../assets/images/ico-2.png'), id: 2},
      {url: '', icon: require('../assets/images/ico-3.png'), id: 3},
      {url: '', icon: require('../assets/images/ico-4.png'), id: 4},
    ],
    books: []
  }
  
  onHorizontalSelectedIndexChange(index) {
    /* tslint:disable: no-console */
    // console.log('horizontal change to', index);
  }
  onVerticalSelectedIndexChange(index) {
    /* tslint:disable: no-console */
    // console.log('vertical change to', index);
  }

  componentDidMount() {
    // simulate img loading
    setTimeout(() => {
      this.setState({
        data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
      });
    }, 100);
    this.orderBooks()
  }
  async orderBooks () {
    let result = await getRankingList('54d42d92321052167dfb75e3');
    let { books } = result.data.ranking
    this.setState({
      books: books.slice(0, 6)
    })
  }

  render() {
    return (
      <ScrollView style={styles.Box}>
        <View>
          <Carousel
            style={styles.wrapper}
            selectedIndex={2}
            autoplay
            infinite
            afterChange={this.onHorizontalSelectedIndexChange}
          >
            <View
              style={[styles.containerHorizontal, { backgroundColor: 'red' }]}
            >
              <Text>Carousel 1</Text>
            </View>
            <View
              style={[styles.containerHorizontal, { backgroundColor: 'blue' }]}
            >
              <Text>Carousel 2</Text>
            </View>
            <View
              style={[
                styles.containerHorizontal,
                { backgroundColor: 'yellow' },
              ]}
            >
              <Text>Carousel 3</Text>
            </View>
          </Carousel>
        </View>
        <View>
          <Flex align="center" justify="center" style={styles.iconsBox}>
            {this.state.actions.map(val => (
              <Flex.Item style={styles.iconsItems} key={val.id}>
                        <Image source={val.icon} style={styles.iconsImg} />
              </Flex.Item>
            ))}

          </Flex>        
        </View>
        <View>
          <View style={styles.recommendBox}>
            <View style={styles.recommend}></View>
            <View><Text style={styles.recommendTitle}>推荐小说</Text></View>
          </View>
          <View style={styles.bookList}>
            {
                this.state.books.map((k, i) => {
                  var src = unescape(k.cover)
                  src = src.slice(7, src.length)
                  return (
                    <View style={styles.bookBox} key={i}>
                      <Image source={{uri: src}} style={styles.bookImg} key={i} />
                      <Text>{k.title}</Text>
                      <Text style={styles.bookAuthor}>{k.author}</Text>
                      </View>
                  )
                })
              }
          </View>
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  Box: {
    flex: 1,
    overflow: 'scroll'
  },
  wrapper: {
    backgroundColor: '#fff',
  },
  containerHorizontal: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 150,
  },
  containerVertical: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 150,
  },
  text: {
    color: '#fff',
    fontSize: 36,
  },
  iconsBox: {
    height: 80
  },
  iconsItems: {
    textAlign: "center",
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconsImg: {
    width: 50,
    height: 50
  },
  recommendBox: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  recommend: {
    backgroundColor: '#1da57a',
    width: 4,
    height: 30,
    borderRadius: 2,
    marginLeft: 10
  },
  recommendTitle: {
    paddingLeft: 10,
    flex: 1,
    justifyContent: 'center',
  },
  bookList: {
    flex: 1,
    flexWrap: "wrap",
    flexDirection: 'row',
  },
  bookBox: {
    width: "33%",
    padding: 10
  },
  bookAuthor: {
    fontSize: 12,
    color: '#ccc',
  },
  bookImg: {
    height: 150
  }
});