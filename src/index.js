import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from "apollo-boost";
import pocCategorySearch from "graphql-tag";
import { ApolloProvider } from "react-apollo";

const client = new ApolloClient({
  uri: "https://803votn6w7.execute-api.us-west-2.amazonaws.com/dev/public/graphql"
});

client.query({
    query: pocCategorySearch`
    {
        poc(id: "243") {
            products(categoryId: 0, search: "") {
            productVariants{
                title
                imageUrl
                price
            }
            }
        }
    }
    `
})
.then(result => 
    console.log(
        result.data.poc.products[0].productVariants[0].title +
        ' R$ ' + result.data.poc.products[0].productVariants[0].price
    )
);
  
const App = () => (
    <ApolloProvider client={client}>
    <div>
        <h2>My first Apollo app</h2>
    </div>
    </ApolloProvider>
);


ReactDOM.render(<App />, document.getElementById('root'));
