import React from 'react';
import SingleQuote from './SingleQuote';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import SavedQuotes from './SavedQuotes';



function App() {
    return (
        <Router>
            <div>
                <div>
                    <Link to='/'>Home</Link>
                    <Link to='/quotes'>Quotes</Link>
                </div>                
                <Route exact path='/' component={SingleQuote} />
                <Route  path='/quotes' component={SavedQuotes} />  
            </div>                      
        </Router>    
    )
}

export default App;