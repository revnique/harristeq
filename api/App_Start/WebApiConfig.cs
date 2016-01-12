using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Batch;
using api.Models;

namespace api
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services

            // Web API routes
            config.MapHttpAttributeRoutes();

            HttpBatchHandler batchHandler = new DefaultHttpBatchHandler(GlobalConfiguration.DefaultServer)
            {
                ExecutionOrder = BatchExecutionOrder.NonSequential
            };

            //config.Routes.MapHttpRoute(
            //    name: "DefaultApi",
            //    routeTemplate: "api/{controller}/{id}",
            //    defaults: new {id = RouteParameter.Optional}
            //    );


            //config.Routes.MapHttpBatchRoute(
            //    routeName: "batch",
            //    routeTemplate: "api/batch",
            //    batchHandler: batchHandler);

            var server = new HttpServer(config);



            config.Routes.MapHttpBatchRoute(
                routeName: "WebApiBatchJson",
                routeTemplate: "api/$batchJson",
                batchHandler: new JsonBatchHandler(server));

            config.Routes.MapHttpBatchRoute(
                routeName: "batch",
                routeTemplate: "api/batch",
                batchHandler: new DefaultHttpBatchHandler(server));
            config.Routes.MapHttpRoute("api", "api/{controller}/{id}", new { id = RouteParameter.Optional });



            //    config.Routes.MapHttpBatchRoute(
            //        routeName: "WebApiBatch",
            //        routeTemplate: "api/$batch",
            //        batchHandler: new DefaultHttpBatchHandler(GlobalConfiguration.DefaultServer)
            //    );
            //}
        }

        //private static void Configuration(IAppBuilder builder)
        //{
        //    HttpConfiguration configuration = new HttpConfiguration();
        //    HttpServer server = new HttpServer(configuration);
        //    configuration.Routes.MapHttpBatchRoute(
        //        routeName: "batch",
        //        routeTemplate: "api/batch",
        //        batchHandler: new DefaultHttpBatchHandler(server));
        //    configuration.Routes.MapHttpRoute("api", "api/{controller}/{id}", new { id = RouteParameter.Optional });
        //    builder.UseWebApi(server);
        //}
    }
}