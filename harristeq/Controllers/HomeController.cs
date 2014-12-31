using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

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

        public ActionResult GetGarminData(DateObj dateObj)
        {

            using (var context = new harristeqEntities())
            {
                context.Database.Connection.Open();
                var rtn = context.TrainingCenterFiles.Where(t => t.FileCreateDate > dateObj.StartDate && t.FileCreateDate < dateObj.EndDate).Take(10).Select(f => new
                {
                    workouts = new
                    {
                        rawJson = f.ConvertedJson,
                        date = f.FileCreateDate
                    }
                }).ToList();
                return new JsonResult { Data = rtn, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
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
