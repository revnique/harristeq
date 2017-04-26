using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Batch;
using api.Models;

namespace api.Models
{
    public class JsonBatchHandler : DefaultHttpBatchHandler
    {
        public JsonBatchHandler(HttpServer server)
            : base(server)
        {
            SupportedContentTypes.Add("text/json");
            SupportedContentTypes.Add("application/json");
        }

        public  async Task<IList<HttpRequestMessage>> ParseBatchRequestsAsync(HttpRequestMessage request)
        {
            var jsonSubRequests = await request.Content.ReadAsAsync<JsonRequestMessage[]>();

            // Creating simple requests, no headers nor bodies
            var subRequests = jsonSubRequests.Select(r =>
            {
                Uri subRequestUri = new Uri(request.RequestUri, "/" + r.relative_url);
                return new HttpRequestMessage(new HttpMethod(r.method), subRequestUri);
            });
            return subRequests.ToList();
        }

        public  async Task<HttpResponseMessage> CreateResponseMessageAsync(IList<HttpResponseMessage> responses,
                                                                                   HttpRequestMessage request)
        {
            List<JsonResponseMessage> jsonResponses = new List<JsonResponseMessage>();
            foreach (var subResponse in responses)
            {
                var jsonResponse = new JsonResponseMessage
                {
                    code = (int)subResponse.StatusCode
                };
                foreach (var header in subResponse.Headers)
                {
                    jsonResponse.headers.Add(header.Key, String.Join(",", header.Value));
                }
                if (subResponse.Content != null)
                {
                    jsonResponse.body = await subResponse.Content.ReadAsStringAsync();
                    foreach (var header in subResponse.Content.Headers)
                    {
                        jsonResponse.headers.Add(header.Key, String.Join(",", header.Value));
                    }
                }
                jsonResponses.Add(jsonResponse);
            }

            return request.CreateResponse<List<JsonResponseMessage>>(HttpStatusCode.OK, jsonResponses);
        }
    }

    public class JsonResponseMessage
    {
        public JsonResponseMessage()
        {
            headers = new Dictionary<string, string>();
        }

        public int code { get; set; }

        public Dictionary<string, string> headers { get; set; }

        public string body { get; set; }
    }

    public class JsonRequestMessage
    {
        public string method { get; set; }

        public string relative_url { get; set; }
    }
}











//namespace BatchClientSample
//{
//    internal class Program
//    {
//        private static void Main(string[] args)
//        {
//            string baseAddress = "http://localhost:8080";
//            HttpClient client = new HttpClient();
//            HttpRequestMessage batchRequest = new HttpRequestMessage(HttpMethod.Post, baseAddress + "/api/$batch")
//            {
//                Content = new MultipartContent("mixed")
//                {
//                    // POST http://localhost:8080/api/values
//                    new HttpMessageContent(new HttpRequestMessage(HttpMethod.Post, baseAddress + "/api/values")
//                    {
//                        Content = new ObjectContent<string>("my value", new JsonMediaTypeFormatter())
//                    }),

//                    // GET http://localhost:8080/api/values
//                    new HttpMessageContent(new HttpRequestMessage(HttpMethod.Get, baseAddress + "/api/values"))
//                }
//            };

//            HttpResponseMessage batchResponse = client.SendAsync(batchRequest).Result;

//            MultipartStreamProvider streamProvider = batchResponse.Content.ReadAsMultipartAsync().Result;
//            foreach (var content in streamProvider.Contents)
//            {
//                HttpResponseMessage response = content.ReadAsHttpResponseMessageAsync().Result;

//                // Do something with the response messages
//            }
//        }
//    }
//}