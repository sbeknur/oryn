import swaggerJSDoc from "swagger-jsdoc";

const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
        title: "My API",
        version: "1.0.0",
        description: "This API provides functionalities for managing a catering service. It includes endpoints for user management, authentication, restaurant operations, managing places within restaurants, handling food items, and processing orders. The API is secured with JWT-based authentication and authorization.",
    },
    tags: [
        {
            name: "Auth",
            description: "Operations related to authentication"
        },
        {
            name: "Users",
            description: "Operations related to users"
        },
        {
            name: "Restaurants",
            description: "Operations related to restaurants"
        },
        {
            name: "Places",
            description: "Operations related to places within restaurants"
        },
        {
            name: "Foods",
            description: "Operations related to food items in restaurants"
        },
        {
            name: "Orders",
            description: "Operations related to orders placed by users"
        },
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT",
            },
        },
    },
    security: [
        {
            bearerAuth: [],
        },
    ],
};

const options = {
    swaggerDefinition,
    apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
