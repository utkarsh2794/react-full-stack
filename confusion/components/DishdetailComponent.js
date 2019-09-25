import React, { Component } from 'react';
import {
  Text,View,ScrollView,FlatList,Modal,StyleSheet,Button } from "react-native";
import { Rating, Card, Input, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite } from '../redux/ActionCreators';

const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      favorites: state.favorites
    }
  }

  const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    postComment: (dishid, rating, author, comment) => dispatch(postComment(dishid, rating, author, comment)),

    })


function RenderComments(props) {

    const comments = props.comments;

    const renderCommentItem = ({item, index}) => {
        
        return (
            <View key={index} style={{margin: 10}}>
                <Text style={{fontSize: 14}}>{item.comment}</Text>
                <Text style={{fontSize: 12}}>{item.rating} Stars</Text>
                <Text style={{fontSize: 12}}>{'-- ' + item.author + ', ' + item.date} </Text>
            </View>
        );
    };
    
    return (
        <Card title='Comments' >
        <FlatList 
            data={comments}
            renderItem={renderCommentItem}
            keyExtractor={item => item.id.toString()}
            />
        </Card>
    );
}

class Dishdetail extends Component {


    constructor(props) {
        super(props);
        this.state = {
            favorites: [],
            showModal: false,
            author: "",
            comment: "",
            rating: null 
        };
    }

    resetForm() {
        this.setState({
        ratings: null,
        author: '',
        comment: '',
        showModal: false
        });
    };

    openCommentForm = () => {
        this.setState({showModal: true})
    }

    toggleModal = () => {
        this.setState({showModal: !this.state.showModal})
    }

    markFavorite(dishId) {
        this.props.postFavorite(dishId);
    }

    static navigationOptions = {
        title: 'Dish Details'
    };

    handleComment() {
        console.log(JSON.stringify(this.state));
        const author= this.state.author;
        const comment= this.state.comment;
        const rating= this.state.rating;
        const dishid = this.props.navigation.getParam("dishid", "");

        this.toggleModal();
        this.props.postComment(dishid, rating, author, comment);
    }

    ratingCompleted = rating => {
        this.setState({ rating });
    };
    

    render() {

        function RenderDish(props) {

            const dish = props.dish;
            
                if (dish != null) {
                    return(
                        <Card
                        featuredTitle={dish.name}
                        image={{uri: baseUrl + dish.image}}>
                            <Text style={{margin: 10}}>
                                {dish.description}
                            </Text>
                            <Icon
                                raised
                                reverse
                                name={ props.favorite ? 'heart' : 'heart-o'}
                                type='font-awesome'
                                color='#f50'
                                onPress={() => props.favorite ? console.log('Already favorite') : props.onPress()}
                                />
                             <Icon
                                raised
                                reverse
                                name='pencil'
                                type='font-awesome'
                                color='#0000ff'
                                onPress={() => props.openCommentForm()}
                                />   
                        </Card>
                    );
                }
                else {
                    return(<View></View>);
                }
            }

        
        const dishId = this.props.navigation.getParam('dishId','');
        return(
            <ScrollView>
                <RenderDish dish={this.props.dishes.dishes[+dishId]}
                    favorite={this.props.favorites.some(el => el === dishId)}
                    onPress={() => this.markFavorite(dishId)} 
                    openCommentForm={() => this.openCommentForm()}
                    />
                <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishid === dishId)} />
                <ScrollView>
                    <Modal
                        animationType={"slide"}
                        transparent={false}
                        visible={ this.state.showModal }
                        onDismiss={ () => this.toggleModal() }
                        onRequestClose={ () => this.toggleModal() }
                        >
                        <View style={ styles.modal }>
                            <Rating
                            imageSize={30}
                            showRating
                            fractions={1}
                            startingValue={3.3}
                            onFinishRating={this.ratingCompleted}
                            />

                            <View>
                            <Input
                                placeholder=' Author'
                                onChangeText={(value) => this.setState({ author: value })}
                                leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                            />
                            </View>

                            <View>
                            <Input
                                placeholder=' Comment'
                                onChangeText={ (value) => this.setState({ comment: value }) }
                                leftIcon={{ type: 'font-awesome', name: 'comment-o' }}
                            />
                            </View>

                            <View style={ styles.buttons }>
                            <View style={{ margin: 10 }}>
                                <Button
                                onPress={ () => {
                                    this.handleComment();
                                    this.resetForm();
                                } }
                                color="#512DA8"
                                title="Submit"
                                />
                            </View>

                            <View style={{ margin: 10 }}>
                                <Button
                                onPress={ () => {
                                    this.toggleModal();
                                    this.resetForm();
                                } }
                                color="gray"
                                title="Cancel"
                                />
                            </View>
                            </View>

                        </View>
                        </Modal>
                </ScrollView>
            </ScrollView>
        );
    }
}


const styles = StyleSheet.create({
  formRow: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row',
    margin: 20
  },
  formItem: {
    flex: 1
  },
  modal: {
    justifyContent: 'center',
    margin: 20,
  },
})


export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);