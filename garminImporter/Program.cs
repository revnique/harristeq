using System;
using System.Collections.Generic;
using System.IO;
using System.Security.Cryptography.X509Certificates;
using System.Security.Policy;
using System.Xml;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace garminImporter
{
    class Program
    {
        static void Main(string[] args)
        {
            //GetFiles(@"C:\git\harristeq\garminImporter\allrides\");
        }

        private static void GetFiles(string path)
        {
            var files = Directory.EnumerateFiles(path).Where(p => p.EndsWith(".tcx"));
            //XmlToJson(path + "test.tcx");

            foreach (var file in files)
            {
                //var d = file;
                var info = XmlToJson(file);
                UpdateDatabase(info);
            }
        }

        private static TrainingCenterInfo XmlToJson(string path)
        {
            var rtn = new TrainingCenterInfo();
            var xml = string.Empty;

            using (var file = new StreamReader(path))
            {
                xml = file.ReadToEnd();
                file.Close();
            }

            
            var doc = new XmlDocument();
            doc.LoadXml(xml);

            var nm = new XmlNamespaceManager(doc.NameTable);
            nm.AddNamespace("xsi", "http://www.w3.org/2001/XMLSchema-instance");
            nm.AddNamespace("x", "http://www.garmin.com/xmlschemas/TrainingCenterDatabase/v2");
        
            var json = Newtonsoft.Json.JsonConvert.SerializeXmlNode(doc);

            var date = doc.SelectSingleNode("/x:TrainingCenterDatabase/x:Activities/x:Activity[1]/x:Id/text()", nm).Value;
            var type = doc.SelectSingleNode("/x:TrainingCenterDatabase/x:Activities/x:Activity[1]/@Sport", nm).Value;

            //Console.WriteLine("XML -> JSON: {0}", json);
            //Console.ReadLine();

            var dir = Path.GetDirectoryName(path);
            var filename = Path.GetFileNameWithoutExtension(path);
            var newPath = string.Format("{0}\\{1}.js", dir, filename);

            rtn.ActivityType = type;
            rtn.FileName = Path.GetFileName(path);
            rtn.Json = json;
            rtn.TrainingDate = Convert.ToDateTime(date);
            rtn.UserId = 1;
            rtn.Xml = xml.Replace("UTF-8", "utf-16");


            File.WriteAllText(newPath, json);


            return rtn;
        }

        private static void UpdateDatabase(TrainingCenterInfo trainingCenterInfo)
        {
            var db = new harristeqEntities();
            var user = db.Users.Where(u => u.UserId == trainingCenterInfo.UserId).FirstOrDefault();
            db.TrainingCenterFiles.Add(new TrainingCenterFile()
            {
                FileCreateDate = trainingCenterInfo.TrainingDate,
                ConvertedJson = trainingCenterInfo.Json,
                User = user,
                FileName = trainingCenterInfo.FileName,
                OriginalXml = trainingCenterInfo.Xml,
                Activity = trainingCenterInfo.ActivityType
            });

            db.SaveChanges();
        }

        public class TrainingCenterInfo
        {
            public int UserId { get; set; }
            public DateTime TrainingDate { get; set; }
            public string FileName { get; set; }
            public string ActivityType { get; set; }
            public string Xml { get; set; }
            public string Json { get; set; }
        }

    }
}
