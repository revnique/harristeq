using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;

namespace harristeq.Controllers
{
    public class HomeController : Controller
    {
        //
        // GET: /Home/

        public ActionResult Index()
        {
            ViewBag.ShowMe = "Potato Salad";
            return View();
        }

        public ActionResult TaskDemo()
        {
            ViewBag.ShowMe = "Potato Salad";
            return View();
        }

        public ActionResult GarminDemo()
        {
            ViewBag.ShowMe = "Potato Salad";
            return View();
        }

        public ActionResult OneMonthSpanish()
        {
            ViewBag.ShowMe = "Potato Salad";
            return View();
        }

        public JsonResult GetGarminData(DateObj dateObj)
        {

            using (var context = new harristeqEntities())
            {
                context.Database.Connection.Open();
                var rtn = context.TrainingCenterFiles.Where(t => t.FileCreateDate > dateObj.StartDate && t.FileCreateDate < dateObj.EndDate).OrderBy(t => t.FileCreateDate).ToList().Select(f => new
                {
                    trainingCenterFileId = f.TrainingCenterFileId,
                    activity = f.Activity,
                    date = f.FileCreateDate.Value.ToString("MM-dd-yyyy HH:mm:ss"),
                    fileName = f.FileName,
                    size = f.ConvertedJson.Length
                 
                });
                
                return new JsonResult { Data = rtn, JsonRequestBehavior = JsonRequestBehavior.AllowGet};
            }
        }

        public ActionResult GetGarminDetail(long trainingCenterFileId)
        {

            using (var context = new harristeqEntities())
            {
                context.Database.Connection.Open();
                var rtn = context.TrainingCenterFiles.FirstOrDefault(t => t.TrainingCenterFileId == trainingCenterFileId);




                var serializer = new JavaScriptSerializer();

                // For simplicity just use Int32's max value.
                // You could always read the value from the config section mentioned above.
                serializer.MaxJsonLength = Int32.MaxValue;

                var result = new ContentResult
                {
                    Content = serializer.Serialize(rtn.ConvertedJson),
                    ContentType = "application/json"
                };
                return result;

            }
            //var rtn = new
            //{
            //    workout = string.Format("show me potato salad => {0} => {1}", dateObj.StartDate, dateObj.EndDate)
            //};

        }

        public class DateObj
        {
            public DateTime StartDate { get; set; }
            public DateTime EndDate { get; set; }
        }
    }
}
