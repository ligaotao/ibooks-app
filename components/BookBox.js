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
                <Image source={{src}} style={styles.boxImage}  />
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
        height: 100,
        marginBottom: 20,
        marginTop: 20,
        borderBottomColor: '#000',
        borderBottomWidth: 1
    },
    boxImage: {
        width: 250,
        height: 380,
    },
    title: {
        color: '#333',
        fontSize: 14,
    },
    author: {
        fontSize: 14,
        color: '#333'
    },
    meta: {
        height: 210,
        overflow: 'hidden',
        width: 650,
    },
    content: {
        paddingLeft: 20,
        flex: 1,
    }
})