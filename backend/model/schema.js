const { buildSchema } = require('graphql');

const schema = buildSchema(`
    type User {
        _id: ID!
        name: String!
        email: String!
        password: String!
    }
    
    type Product {
        _id: ID!
        name: String
        stock: Int
        price: Float
    }
    
    type Order {
        _id: ID!
        product: [ProductLine]
        user: User
    }
    
    input ProductInput {
        name: String
        stock: Int        
        price: Float
    }
    
    type ProductLine {
        product: Product
        quantity: Int
    }
    
    input ProductLineInput {
        product: ProductInput
        quantity: Int
    }  
    
    type Query {
        users: [User]        
        products: [Product]
        ordersByCustomer(userName: String): [Order]
        productsByOrder(id: ID): [String]       
    }
    
    type Mutation {
        addUser(name: String, email: String, password: String): User
        updateUser(id: ID, name: String, email: String, password: String): User
        deleteUser(id: ID): Boolean
        addProduct(name: String, stock: Int, price: Float): Product
        updateProduct(id: ID, name: String, stock: Int, price: Float): Product
        deleteProduct(id: ID): Boolean
        newOrder(userName: String, productsLine: [ProductLineInput]): Order
        
    }  
`);

module.exports = schema;