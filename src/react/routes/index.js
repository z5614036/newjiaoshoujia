import App from "../../react/components/Home"
if (typeof require.ensure !== "function") require.ensure = function (d, c) {
    c(require)
};
// ===========================================================
const routes = {
    path:"/",
    component:App,
    indexRoute:{
       getComponents(location, callback){
            require.ensure([], function (require) {
                callback(null, {
                        main:require("../pages/login").default
                });
            }, 'home.comp');
        }
    },
    childRoutes:[
        {
            path: 'main',
            indexRoute: {
                getComponents(location, callback){
                    require.ensure([], function (require) {
                        callback(null, {
                            main: require('../components/Picture').default
                        });
                    }, 'main.comp');
                }
            } 
        },
        {
            path: '*',
            indexRoute: {
                getComponents(location, callback){
                    require.ensure([], function (require) {
                        callback(null, {
                            main: require('../components/ErrorPage').default
                        });
                    }, '404.comp');
                }
            }
        }
    ]

};

export default routes;
