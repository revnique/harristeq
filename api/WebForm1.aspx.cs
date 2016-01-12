using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace api
{
    public partial class WebForm1 : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }
        
        protected void Button1_Click(object sender, EventArgs e)
        {
            var wc = new WebClient();
            wc.Headers.Add("X-HPS", "apply");
            wc.Headers.Add("Content-Type", "application/json");
            wc.Headers.Add("DominiqueHarrisHeader", "This Is my C# Posting the first one was JS");
            var url = "http://hps-dev-prescreen.azurewebsites.net/api/v1/applicants";
            var payload = @"{""fullName"": ""dominique harris"",""email"": ""domninique.harris@alumni.upenn.edu"",""phoneNumber"": ""512.777.1682""}" ;
            var result = wc.UploadString(url, payload);
            TextBox1.Text = result;
        }
    }
}