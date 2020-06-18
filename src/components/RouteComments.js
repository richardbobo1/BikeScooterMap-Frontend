import React from 'react'
import { Button, Comment, Form, Header, Rating, Divider } from 'semantic-ui-react'


class RouteComments extends React.Component {


  constructor(){
    super();
    this.state = {
      comments: [],
      review: '',
      rating: 3
    }
  }

  componentDidMount(){

    fetch(`http://localhost:3000/reviews/${this.props.routeId}`)
    .then(resp => resp.json())
    .then(data => { 
        this.setState({ 
            comments: data
        })
        console.log("comments", data)
      })
  }


  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onClickStar = (e, data) => {
    this.setState({ rating: data.rating})
  }




  onSubmitComment = (event) => {
    event.preventDefault()

    //fetch post to create new comment
    let commentObj = {
      user_id: this.props.currentUser.id, 
      route_id: this.props.routeId,
      rating: this.state.rating, 
      comments: this.state.review
    }

    debugger 

    fetch('http://localhost:3000/reviews', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(commentObj)
          })
          .then(res => res.json())
          .then( data => { 
       

              this.setState({
                   //append new comment to comments array
                comments: [...this.state.comments, data],
                //clear comment form 
                review: '',
                rating: 3
              })
            })
    
}


  onDeleteComment = (event) => {
    event.preventDefault()
    let newArray = this.state.comments.filter(review => review.id !== parseInt(event.target.id) ) 

    fetch(`http://localhost:3000/reviews/${event.target.id}`, {
      method: "DELETE",
      headers: {'Content-Type': 'application/json'},
      })
      .then(res => res.json() )
      .then( res => {
          this.setState({
              comments: newArray
        })

  })
}




timeSince = (created) => {

  var t = created.split(/[- : T]/);
  t[5] = t[5].split(".")[0]
  var date = new Date(Date.UTC(t[0], t[1]-1, t[2], t[3], t[4], t[5]));
    
  var seconds = Math.floor((new Date() - date) / 1000);

  var interval = Math.floor(seconds / 31536000);

  if (interval > 1) {
    return interval + " years";
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return interval + " months";
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return interval + " days";
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return interval + " hours";
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + " minutes";
  }
  return Math.floor(seconds) + " seconds";
}






render(){

  return(
  


  <Comment.Group>


{ this.state.comments.map(comment => 
        <Comment id={comment.id} >
        <Comment.Avatar src={comment.user.img_url} />
        
        <Comment.Content>
          <Comment.Author as='a'>{comment.user.username}</Comment.Author>
          <Comment.Metadata>
            <div><i>{this.timeSince(comment.created_at)} ago </i> 
            
         
             </div>
          </Comment.Metadata>
          <span className="star-rating"> <Rating icon='star' defaultRating={comment.rating} maxRating={5} /></span>
          <Comment.Text>


            {comment.comments}</Comment.Text>


        {/* //hide or display delte button, so admins can delete all, and users can delete their own  */}
        { comment.user_id === this.props.userId || this.props.currentUser !== null && this.props.currentUser.admin === true ?
                    <Comment.Actions>
                    <Comment.Action id={comment.id} onClick={event => this.onDeleteComment(event)} >Delete</Comment.Action>
                  </Comment.Actions> : null
        }


        </Comment.Content>
        
        <Divider /> 
      </Comment>
     
)

}
   
<Header as='h3' dividing>
      LEAVE A REVIEW
    </Header>

    <Form reply onSubmit={(event) => this.onSubmitComment(event)} >
      <div>Rating: &nbsp; &nbsp; &nbsp;
    <Rating icon='star' name="rating" initialRating={3} maxRating={5}  onRate={(event,data) => this.onClickStar(event,data )} />
    </div>
    <br />
      <Form.TextArea 
      name="review"
        value={this.state.review}
        onChange={this.handleChange}
      />
      <Button content='Post Review' labelPosition='left' icon='edit' primary />
    </Form>
  </Comment.Group>
)
  }}

export default RouteComments