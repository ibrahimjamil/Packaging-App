const express = require('express')
const dotenv = require('dotenv')
const path = require("path")
const cors = require("cors")
const helmet = require("helmet")
const rateLimiter = require("express-rate-limit")
const connectDB = require('./config/db')
const expressGraphQL = require('express-graphql').graphqlHTTP
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLID,
    GraphQLNonNull,
    GraphQLInt
} = require('graphql')
const app = express()


//routes files 
const auth = require("./routes/auth")
const client = require("./routes/client")

const author = [
    {id:1,name:"ibrahim"},
    {id:2,name:"bari"}
]

const books = [
    {id:1,name:"RDPD",authorId:1},
    {id:3,name:"GoodBook",authorId:1},
    {id:2,name:"WOWS",authorId:2},
]

const authorType = new GraphQLObjectType({
    name:"author",
    fields:()=>({
        id:{
            type: new GraphQLNonNull(GraphQLInt) 
        },
        name:{
            type: GraphQLString
        },
        book:{
            type:new GraphQLList(bookType),
            resolve:(parent)=>{
                return books.filter((book)=>book.authorId === parent.id)
            }
        }
    })
})

const bookType = new GraphQLObjectType({
    name:"books",
    fields:()=>({
        id:{
            type: new GraphQLNonNull(GraphQLInt) 
        },
        name:{
            type: GraphQLString
        },
        authorId:{
            type: GraphQLString
        },
        author:{
            type: authorType,
            resolve:(parent)=>{
                return author.find((author)=>author.id === parent.authorId)
            }
        }
    })
})


const rootQueryType = new GraphQLObjectType ({
    name:"Query",
    description:"Root Query",
    fields:()=>({
        book:{
            type: bookType,
            args:{
                id: {
                    type: GraphQLInt
                }
            },
            resolve:(parent,args)=>{
                return books.find((book)=> book.id === args.id)
            }
        },
        books: {
            type: new GraphQLList(bookType),
            description: "list of all books",
            resolve:(parent,args)=>{
                return books
            }
        },
        authors:{
            type: new GraphQLList(authorType),
            resolve:()=>{
                return author
            } 
        }
    })
})


const rootMutation = new GraphQLObjectType ({
    name:"mutation",
    description:"Root Mutation",
    fields:()=>({
       addBook:{
           type: bookType,
           args:{
               name:{type:GraphQLString},
               authorId:{type:GraphQLString}
           },
           resolve:(parent,args)=>{
                const book = {
                    id:books.length+1,
                    name:args.name,
                    authorId: args.authorId
                } 
                books.push(book)
                return book
            }
       }
    })
})


const schema = new GraphQLSchema({
    query:rootQueryType,
    mutation:rootMutation
}) 

//  load-env-variables-in-config, connectDB ,body-parser, enabling-cors-policy-for-accessing-cross-platform-items, 
//  make-public-folder-static, express-limiter-for-restricting-api-requests
dotenv.config({path:'./config/config.env'})
connectDB(process.env.MONGO_URI)
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use('/graphql',expressGraphQL({
    schema:schema,
    graphiql:true
}))
app.use(cors())
app.use('/public/images',express.static(path.join(__dirname,"public/images")))
app.use(helmet())
app.use(express.static('uploads'))
const limiter = rateLimiter({
    windowMs: 15*60*1000 ,  // 15 min wait till next IP limit
    max: 100
})
app.use(limiter)




// all routes  
app.use('/packaging/credentials',auth)
app.use('/packaging/clientInfo', client)






const PORT = process.env.PORT || 5000
app.listen(PORT,()=>{
    console.log(`app running on ${process.env.NODE_ENV} port and on port ${PORT}`)
})

