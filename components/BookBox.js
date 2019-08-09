import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';


class App extends React.Component {

    static propTypes = {
        book: PropTypes.object
    }

    static defaultProps = {
        book:　[]
    }

    render() {
        var self = this
        var book = self.props.book
        var src = unescape(book.cover)
        src = src.slice(7, src.length)
        return (
            <View key={book._id} style={styles.box} >
                <Image source={{uri: src}} style={styles.boxImage}  />
                <View style={styles.content}>
                <Text style={styles.title}>{book.title}</Text>
                <Text style={styles.author}>{book.author}</Text>
                <Text style={styles.meta}>
                    {book.shortIntro}
                </Text>
                </View>
            </View>
        );
    }
}

export default App;

const styles = StyleSheet.create({
    box: {
        height: 150,
        borderBottomColor: '#000',
        paddingLeft: 10,
        paddingRight: 10,
        borderBottomWidth: 1,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    boxImage: {
        width: 80,
        height: 130,
    },
    title: {
        color: '#000',
        fontSize: 14,
    },
    author: {
        fontSize: 14,
        color: '#333'
    },
    meta: {
        height: 100,
        overflow: 'hidden',
    },
    content: {
        paddingLeft: 20,
        flex: 1,
    }
})