import React from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle } from 'reactstrap';


    function RenderDish({dish}) {
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
    

   function RenderComments({comments}) {
        if(comments!= null){
			return (
                 <div  className="col-12 col-md-5 m-1">   
                     <h4>Comments</h4>
					{
                    comments.map((comment) => {
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
    

 

   const  DishDetail = (props) => { 
       if(props.dish!=null)
        return (
            <div className="container">
                <div className="row">
                        <RenderDish dish={props.dish} />
                        <RenderComments comments={props.dish.comments} />
                </div>  
            </div>
        );
       else
            return(
                <div></div>
            );        
    }

export default DishDetail;