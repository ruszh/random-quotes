import React from 'react';

function Quote(props) { 
    const { quoteText, quoteAuthor, quoteLink } = props.data;
      return (
        <div className='container'>
          <div className='quote'>
            <div className='row'>
              <p className='col quote-text'>{quoteText}</p>
            </div> 
            <div className='row'>
              <p className='col author'>{quoteAuthor}</p>
            </div>            
          </div>  
        </div>
      )    
}

export default Quote;