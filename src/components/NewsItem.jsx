import React, { Component } from 'react'

export class NewsItem extends Component {

  render() {
    let {title,description, imageurl, newsUrl, author, dateofpublish, source} = this.props;
    return (
      <div>
    <div className="card" style={{maxWidth: "18rem"}}>
  <img
  src={imageurl || "https://static.vecteezy.com/system/resources/previews/000/681/858/non_2x/live-breaking-news-report-banner.jpg"}
  className="card-img-top"
  alt="news"
  onError={(e) => {
    e.target.onerror = null; // prevent infinite loop
    e.target.src = "https://static.vecteezy.com/system/resources/previews/000/681/858/non_2x/live-breaking-news-report-banner.jpg";
  }}
/>

   <div className="card-body">
    <h5 className="card-title">{title}...</h5>
      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{left:'88%', zIndex:'1'}}>
    {!source ? "unknown" : source}
    <span className="visually-hidden">unread messages</span>
  </span>
    <p className="card-text">{description}...</p>
     <p className="card-text"><small className="text-muted">By {!author ? "unknown" : author} on {new Date(dateofpublish).toGMTString()} </small></p>
    <a href={newsUrl} rel = "noreferrer" target = "_blank" className="btn btn-sm btn-primary">Read more</a>
  </div>
    </div>
      </div>
    )
  }
}

export default NewsItem
