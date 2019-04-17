import React, {Component} from 'react';
import {View, Image, StyleSheet} from "react-native";
import {breadColors} from "../Colors"
import {MaterialCommunityIcons} from "@expo/vector-icons";

export default class RatingDisplay extends Component {
    constructor (props) {
        super(props);
        this.state = {
            starFilled: require('../assets/images/icons/star-filled.png'),
            starHalf: require('../assets/images/icons/star-halffilled.png'),
            starEmpty: require('../assets/images/icons/star-unfilled.png'),
        }
    }

    render () {
        let starArray = [0, 0, 0, 0, 0];
        for (var i = 0; i <= 4; i++) {
            if (this.props.rating >= i + 1) {
                starArray[i] = 2;
            } else if (this.props.rating > i && this.props.rating < i + 1) {
                starArray[i] = 1;
            }
        }
        return (
            <View style = {styles.ratingBounds}>
                {starArray.map(function (val) {
                    return getStar(val);
                })}
            </View>
        );
    }
}

function getStar(val) {
    var starFilled = require('../assets/images/icons/star-filled.png');
    var starHalf = require('../assets/images/icons/star-halffilled.png');
    var starEmpty = require('../assets/images/icons/star-unfilled.png');
    if (val == 0) {
        return (<MaterialCommunityIcons name = 'star-outline' size = {24} color = {breadColors.breadYellow}/>);
    } else if (val == 1) {
        return (<MaterialCommunityIcons name = 'star-half' size = {24} color = {breadColors.breadYellow}/>);
    } else {
        return (<MaterialCommunityIcons name = 'star' size = {24} color = {breadColors.breadYellow}/>);
    }
}

const styles = StyleSheet.create({
    ratingBounds: {
        width: 120,
        height: 24,
        flexDirection: 'row',
    },
    ratingImage: {
        flex: 1,
        height: 24,
        width: 24,
    }
});