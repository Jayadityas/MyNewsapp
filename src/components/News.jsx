import React, { Component } from 'react'
import NewsItem from "./NewsItem.jsx"
import Spinner from './Spinner.jsx';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';




class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

   componentDidCatch(error, info) {
    logErrorToMyService(
      error,
      // Example "componentStack":
      //   in ComponentThatThrows (created by App)
      //   in ErrorBoundary (created by App)
      //   in div (created by App)
      //   in App
      info.componentStack,
      // Warning: `captureOwnerStack` is not available in production.
      React.captureOwnerStack(),
    );
}

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return this.props.fallback;
    }

    return this.props.children;
  }
}



export class News extends Component {
static defaultProps = {
  country:"in",
  pageSize:8,
  query: "trump"
}; 
 
 static PropTypes={
  country: PropTypes.string,
  pageSize: PropTypes.number,
   query: PropTypes.string
};
  //articles is an array of json objects
  
capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

  constructor (props){
    super(props);
    this.state = {
       articles : [],
       page:1,
       totalResults:0,
       loading:false,
    //FOR NEWSDATA.IO   nextPage:null,
     //FOR NEWSDATA.IO  pageHistory: []
    };

    document.title = `${this.capitalizeFirstLetter(this.props.query)} - NewsApp`;
  }
/*FOR NEWSDATA.IO*/ 

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
  async fetchPage(pageToken = "") {
  let url = `https://newsdata.io/api/1/latest?apikey=pub_b19e064bb753406a938f5aaca918450c&country=in`;
  if (pageToken) {
    url += `&page=${pageToken}`;
  }
 let data = await fetch(url);
  let parsedData = await data.json();

  this.setState(prevState => ({
    articles: parsedData.results || [],
    nextPage: parsedData.nextPage,
    pageHistory: pageToken
      ? [...prevState.pageHistory, pageToken]
      : prevState.pageHistory
  }));

}


  async componentDidMount(){ 
this.fetchPage();
  }

  handleNext = async()=>{
if (this.state.nextPage) {
    this.fetchPage(this.state.nextPage); 
  }
  };

  handlePrev = async()=>{
/*console.log("component did mount");
    let url = "https://newsdata.io/api/1/latest?apikey=pub_b19e064bb753406a938f5aaca918450c&country=in&page=1766355722012872864";
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);  
    this.setState({articles: parsedData.results});
    this.setState({
        page: this.state.page - 1
    });
    
    const history = [...this.state.pageHistory];
  history.pop(); // remove current
  const prevToken = history.pop(); // get previous
  if (prevToken) {
    this.fetchPage(prevToken);
    this.setState({ pageHistory: history });
  }
  };
*/
 /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



async updateNews() {
  this.props.setProgress(0);
  let url = `https://newsapi.org/v2/top-headlines?q=${this.props.query}&apiKey=0a280a022fa1418c961a4b25a838b5c2&page=${this.state.page}&pageSize=${this.props.pageSize}`;
 this.setState({
    loading: true
   });
let data = await fetch(url);
 this.setState({
    loading: false
   });
let parsedData = await data.json();
  this.setState({
    page: this.state.page + 1,
articles: parsedData.articles || [],
totalResults : parsedData.totalResults
  });
this.props.setProgress(100);
}


 /*FOR newsapi*/
 async componentDidMount(){ 
/*
let url = `https://newsapi.org/v2/top-headlines?q=${this.props.query}&apiKey=0a280a022fa1418c961a4b25a838b5c2&page=${this.props.page}&pageSize=${this.props.pageSize}`;
 this.setState({
    loading: true
   });
let data = await fetch(url);
 this.setState({
    loading: false
   });
let parsedData = await data.json();
  this.setState({
    page: this.state.page + 1,
articles: parsedData.articles,
totalResults : parsedData.totalResults
  });
  */
 this.updateNews();
  }


handlePrev = async() =>{
 
/*let url = `https://newsapi.org/v2/top-headlines?q=${this.props.query}&apiKey=0a280a022fa1418c961a4b25a838b5c2&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
this.setState({
     loading: true
});
let data = await fetch(url);
this.setState({
    loading: false
});
let parsedData = await data.json();
  this.setState({
    page: this.state.page - 1,
    articles: parsedData.articles
  });*/

await this.setState({page:this.state.page-1});

 this.updateNews();

};

handleNext = async() => {
 
/*
  if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/(this.props.pageSize)))) {
  let url = `https://newsapi.org/v2/top-headlines?q=${this.props.query}&apiKey=0a280a022fa1418c961a4b25a838b5c2&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
   this.setState({
    loading: true
   });
  let data = await fetch(url);
   this.setState({
    loading: false
   });
let parsedData = await data.json();
  this.setState({
    page: this.state.page + 1,
articles: parsedData.articles
  });
  }
  */

  await this.setState({page:this.state.page+1});

  this.updateNews();

};


  fetchMoreData = async() => {
   this.setState({
    page: this.state.page + 1
   })
   let url = `https://newsapi.org/v2/top-headlines?q=${this.props.query}&apiKey=0a280a022fa1418c961a4b25a838b5c2&page=${this.state.page}&pageSize=${this.props.pageSize}`;
 //this.setState({
   // loading: true
   //});
let data = await fetch(url);
 this.setState({
    loading: false
   });
let parsedData = await data.json();
  this.setState({
    page: this.state.page + 1,
articles: this.state.articles.concat(parsedData.articles || []),
totalResults : parsedData.totalResults
  });
  };


  render() {
console.log("Inside render");

return (
  <ErrorBoundary fallback = {<h1>Something went wrong</h1>} >
      <div className = "container my-4 mx-5">
        <h2 className = "text-center" style = {{margin: '35px 0px'}}>Top {this.capitalizeFirstLetter(this.props.query)} Headlines</h2>
          <div className="text-center">
            {this.state.loading && <Spinner />}</div>

     <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
         <div className = "container">
        <div className = "row">
           {Array.isArray(this.state.articles) && this.state.articles.map((element)=>{
          return (
          <div className = "col-md-4 my-4"  key = {element.url}>
             <NewsItem 
             title = {element.title ? element.title.slice(0,40) : ""}//slice(start index,length)
             description = {element.description ? element.description.slice(0,80) : ""}
             imageurl = {element.urlToImage}
             newsUrl = {element.url}
             author = {element.author}
             dateofpublish = {element.publishedAt}
             source = {element.source.name}
             />
          </div>
          );
          })} 
         
        </div>
        </div>
        </InfiniteScroll>
       {/* <div className="container d-flex justify-content-between my-4">
        <button  disabled={this.state.page<=1}  type="button" className="btn btn-secondary"  onClick={this.handlePrev}
>&larr; Previous</button>
        <button  type="button"  className="btn btn-secondary"  onClick={this.handleNext}
 >Next &rarr;</button>
     </div>*/}
      </div>
    </ErrorBoundary>
    );
  }
}

export default News


