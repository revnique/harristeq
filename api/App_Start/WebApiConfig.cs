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

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new {id = RouteParameter.Optional}
                );


            config.Routes.MapHttpBatchRoute(
                routeName: "batch",
                routeTemplate: "api/batch",
                batchHandler: batchHandler);


            config.Routes.MapHttpBatchRoute(
                routeName: "WebApiBatchJson",
                routeTemplate: "api/$batchJson",
                batchHandler: new JsonBatchHandler(GlobalConfiguration.DefaultServer));


            //    config.Routes.MapHttpBatchRoute(
            //        routeName: "WebApiBatch",
            //        routeTemplate: "api/$batch",
            //        batchHandler: new DefaultHttpBatchHandler(GlobalConfiguration.DefaultServer)
            //    );
            //}
        }
    }
}