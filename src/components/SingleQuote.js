import React from 'react';
import axios from 'axios';
import Quote from './Quote';


class SingleQuote extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        data: {},
        isLoaded: false,
        error: null,
        language: 'ru'
      };
      this.handleClick = this.handleClick.bind(this);
      this.changeLang = this.changeLang.bind(this);
      this.addQuote = this.addQuote.bind(this);
    }  
    
    getQuote() {
      const lang = this.state.language;
      axios.get(`http://localhost:8000/${lang}`)        
          .then(res => this.setState({
            data: res.data,
            isLoaded: true
          }))
          .catch(err => {
            this.setState({
              error: err
            })
            console.log(this.state.error)
          })
    }
  
    handleClick() {
      this.getQuote()
    }
  
    componentDidMount() {
      this.getQuote()    
    }
    
    addQuote() {
      axios.post('http://localhost:8000/api/add/', {
        quote: this.state.data
      })
      .then(res => console.log(res))
      .catch(err => console.log(err))
    }

    changeLang() {
      const lang = this.state.language;
      this.setState({
        language: lang === 'ru' ? 'en' : 'ru'
      });
      this.getQuote();
    }
  
    render() {
      const loaded = this.state.isLoaded;
      return (
        <div>           
          {!loaded && 
            <p className='loading'>Loading...</p>
          }
          { loaded &&
            <Quote data={this.state.data} />          
          } 
          <div className='control-btn'>
            <div className='container'>
              <button className='change-btn' onClick={this.changeLang}>
                {this.state.language}
              </button>
              <button className='change-btn' onClick={this.handleClick}>
                <img src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDUxLjQgNTEuNCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTEuNCA1MS40OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjMycHgiIGhlaWdodD0iMzJweCI+CjxnPgoJPHBhdGggZD0iTTEuNywyNS4yYzAuNTUzLDAsMS0wLjQ0NywxLTFjMC02LjA2NSw0LjkzNS0xMSwxMS0xMWgyNHY4Ljk2NEw1MS40LDEyLjJMMzcuNywyLjIzNlYxMS4yaC0yNGMtNy4xNjgsMC0xMyw1LjgzMi0xMywxMyAgIEMwLjcsMjQuNzUzLDEuMTQ3LDI1LjIsMS43LDI1LjJ6IiBmaWxsPSIjMDAwMDAwIi8+Cgk8cGF0aCBkPSJNNDkuNywyNi4yYy0wLjU1MywwLTEsMC40NDctMSwxYzAsNi4wNjUtNC45MzUsMTEtMTEsMTFoLTI0di04Ljk2NEwwLDM5LjJsMTMuNyw5Ljk2NFY0MC4yaDI0YzcuMTY4LDAsMTMtNS44MzIsMTMtMTMgICBDNTAuNywyNi42NDcsNTAuMjUzLDI2LjIsNDkuNywyNi4yeiIgZmlsbD0iIzAwMDAwMCIvPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=" />
              </button>
              <button onClick={this.addQuote}>
                Add Quote
              </button>
            </div>
          </div>          
        </div>
      )
    }
  
  }

  export default SingleQuote;

  