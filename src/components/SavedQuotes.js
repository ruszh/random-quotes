import React from 'react';
import axios from 'axios';
import Quote from './Quote';

class SavedQuotes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isLoaded: false,
            error: null
        }
    }

    getQuotes() {
        axios.get('http://localhost:8000/api/quotes')
            
            .then(response => this.setState({
                data: response.data,
                isLoaded: true
            }))
            .catch(err => this.setState({
                error: err
            }))
    }
    deleteQuoteHandler(id, index) {
        axios.delete(`http://localhost:8000/api/delete/${id}`)
        .then(res => console.log(res))
        .catch(err => console.log(err));

        const quotesArr = this.state.data;
        quotesArr.splice(index, 1);
        this.setState({
            data: quotesArr
        })
        console.log(`Index of element ${index}`)
    }

    componentDidMount() {
        this.getQuotes();
        console.log(this.state.data)
    }
      
    render() {
        const loaded = this.state.isLoaded;
        return (
            <div>
                <h1>Saved Quotes</h1>
                {!loaded && 
                    <p className='loading'>Loading...</p>
                }
                
                {this.state.data.map((el, index) => 
                    <Quote 
                        delete={this.deleteQuoteHandler.bind(this, el._id, index)} 
                        key={el._id} data={el} />
                    )}
            </div>
        )
    }
}

export default SavedQuotes;