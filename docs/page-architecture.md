# Page Architecture

## Dependency Injection
Common dependencies are injected in the root level component, `_app.js`, and will be available to all pages. Common dependencies are provided by the following decorator: 
* @withApolloClient - Decorates each page with the `ApolloProvider` giving each page the capability to make `GraphQL` requests. 
* @withShop - Decorates each page with current shop's id, description, currency and other relevant fields. A `shop` prop with this information will be available to each page.
* @withMobX - Injects MobX stores to React's context, to make a particular store available to a page as a prop, use the `@inject("storeName")` decorator.
* @withTheme - Makes the Material UI theme available to all pages and subsequent components. To access the theme use the `@withStyles(styles, {withTheme: true })` decorator in a page or component.
* @track - Makes tracking facilities available to each page. 

## Adding A New Page
To add a new page, create a new page in the `src/pages` directory, to use a custom route add it to the `routes` file in the projects root.

## Executing GraphQL Queries
ApolloClient's [Query](https://www.apollographql.com/docs/react/essentials/queries.html#basic) component is used within a HOC to manage GraqhQL queries. The HOC is used to decorate the target component that will receive a query's respone data as props. Reference `src/containers/catalog/withCatalogItems` for a concrete example.
