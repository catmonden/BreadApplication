import React, {Component} from 'react';
import {Image, StyleSheet, View, ScrollView} from "react-native";
import {getReviewData, getAllReviews} from "../db/firebase";
import Review from "./Review";
import {breadColors} from "../Colors";

export default class AdminReview extends Component {

    static navigationOptions = {
        title: 'Administrative Portal',
        headerStyle: {
            backgroundColor: breadColors.breadOrange,
        },
        headerTitleStyle: {
            color: 'white'
        },
    };

    constructor (props) {
        super(props);
        this.state = {
            reviews: [],
            refreshing: false,
        };
    }

    componentDidMount() {
        let self = this;
        getAllReviews().then(response => {
            self.setState({
                reviews: getArray(response)
            })
        })
    }

    render() {
        let self = this;
        var logo = require('../assets/images/logos/texthoriz.png');

        return (
            <View style={styles.screenView}>
                <View style={styles.imageView}>
                    <Image
                        source={logo}
                        style={styles.breadLogo}
                    />
                </View>
                <View style={styles.optionView}>
                    <ScrollView style={styles.innerOption}>
                        {
                            this.state.reviews.map(function(review) {
                                if ((review != undefined) && (+getReviewData(review).flagged >= 0)  && (getReviewData(review).removed == false)) {
                                    return GetReviewFromID(review);
                                }
                                // if ((review != undefined)) {
                                //     return GetReviewFromID(review);
                                // }
                            })
                        }
                    </ScrollView>
                </View>
            </View>

        )};

}

/**
 *
 * @param data Review data to be converted into an array
 * @returns {Array} an array containing all of the keys of the reviews
 */
function getArray(data) {
    let arr = [];
    let keys = Object.keys(data);
    for (var i = 0; i < keys.length; i++) {
        arr.push(keys[i]);
    }
    return arr;
}

/**
 *
 * @param review_id An id for a review to create a review preview for
 * @returns {*} a Review object with the given id and key
 * @constructor
 */
function GetReviewFromID(review_id) {
    return (<Review id={review_id} user={"admin"} key={review_id}/>);
}


const styles = StyleSheet.create({
    screenView: {
        width: '100%',
        height: '100%',
    },
    imageView: {
        flex: 1,
        width: '100%',
    },
    breadLogo: {
        position: 'absolute',
        width: '75%',
        height: '100%',
        left: '12.5%',
    },
    optionView: {
        flex: 6,
        width: '100%',
    },
    innerOption: {
        width: '90%',
        left: '5%',
        flexGrow: 1,
        flexDirection: 'column',
    },
    title: {
        backgroundColor: '#ffab40',
        fontSize: 18,
        color: 'white',
        padding: '2%',
    },
});

