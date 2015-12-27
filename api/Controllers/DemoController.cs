using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace api.Controllers
{
    public class DemoController : ApiController
    {
        public class DummyResponse<T> 
        {
            public bool IsAuthenticated;
            public bool WasSuccessful;
            public T Results;
            public string StatusMessage;
        }

        public class DummyObj
        {
            public string ShowMe;
            public string Name;
            public DateTime CreateDate;
        }

        // GET: api/Demo
        public DummyResponse<IEnumerable<string>> Get()
        {
            return new DummyResponse<IEnumerable<string>>()
            {
                Results = new string[] { "value1", "value2" }
            }; 
        }

        // GET: api/Demo/5
        public DummyResponse<DummyObj> Get(int id)
        {
            var rtn = new DummyResponse<DummyObj>()
            {
                IsAuthenticated = true,
                Results = new DummyObj()
                {
                    ShowMe = string.Format("Potato Salad id:{0}", id),
                    Name = "D town",
                    CreateDate = DateTime.Now

                },
                StatusMessage = "saul good man",
                WasSuccessful = true
            };
            return rtn;
        }

        // POST: api/Demo
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Demo/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Demo/5
        public void Delete(int id)
        {
        }
    }
}
