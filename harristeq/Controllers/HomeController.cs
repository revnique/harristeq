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

    }
}
