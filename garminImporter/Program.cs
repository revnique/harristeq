using System;
using System.Collections.Generic;
using System.IO;
using System.Security.Cryptography.X509Certificates;
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
            GetFiles(@"C:\git\harristeq\garminImporter\allrides\");
        }

        private static void GetFiles(string path)
        {
            var files = Directory.EnumerateFiles(path).Where(p => p.EndsWith(".tcx"));
            XmlToJson(path + "test.tcx");

            //foreach (var file in files)
            //{
            //    //var d = file;
            //    XmlToJson(file);
            //}
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

            //File.WriteAllText(newPath, json);


            return rtn;
        }

        public class TrainingCenterInfo
        {
            public DateTime TrainingDate { get; set; }
            public string FileName { get; set; }
            public string ActivityType { get; set; }
        }

    }
}
