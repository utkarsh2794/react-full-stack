import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody,
    CardTitle } from 'reactstrap';

class DishDetail extends Component {

    constructor(props) {
        super(props);
        
        
    }

    

    renderComments(dish){
        if(dish!= null && dish.comments!= null){
			return (
                 <div  className="col-12 col-md-5 m-1">   
                     <h4>Comments</h4>
					{
                    dish.comments.map((comment) => {
                        return (
                            <ul className ='list-unstyled' key = {comment.id}>
                                <li>
                                    <div>{comment.comment}</div>
                                    <div>{`-- ${comment.author} , 
                                        ${new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day:'2-digit'}).format()}`}</div>
                                </li>
                            </ul>
                        )
                    })					
					}
				</div>
			)
		} else
            return(
                <div></div>
            );

	}
    

    renderDish(dish) {
        if (dish != null)
            return(
                 <div  className="col-12 col-md-5 m-1">   
                    <Card>
                        <CardImg top src={dish.image} alt={dish.name} />
                        <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                </div>  

            );
        else
            return(
                <div></div>
            );
    }

    render() {

        return (
            <div className="row">
                    {this.renderDish(this.props.selectedDish)}
                    {this.renderComments(this.props.selectedDish)} 
            </div>  
        );
    }
}

export default DishDetail;