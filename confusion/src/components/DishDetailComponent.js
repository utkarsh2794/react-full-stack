import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem,Button,Row,Col,Label,Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from "react-redux-form";

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component{
    constructor(props) {
        super(props);
    
        this.state = {
            isModalOpen: false
        };
        this.toggleModal = this.toggleModal.bind(this);
      }

      toggleModal() {
            this.setState({
                isModalOpen: !this.state.isModalOpen
            });
        }

        render() {
            return (<div>
                <Button outline onClick={this.toggleModal}>
                 <span className="fa fa-pencil" /> Submit Comment
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={this.handleSubmit}>
                            
                            <Button type="submit" value="submit" color="primary">Submit</Button>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>);
        }
}


    function RenderDish({dish}) {
        if (dish != null)
            return(
                    <div>   
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
                 <div>   
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
                    <CommentForm />
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
                    <Breadcrumb>

                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>                
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish} />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderComments comments={props.comments} />
                    </div>
                </div>
                </div>
            );
       else
            return(
                <div></div>
            );        
    }

export default DishDetail;