using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Services;

namespace AngularRouting
{
    /// <summary>
    /// Summary description for StudentsServices
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class StudentsServices : System.Web.Services.WebService
    {
        [WebMethod]
        public void GetAllStudents()
        {
            List<Student> listStudents = new List<Student>();
            string cs = ConfigurationManager.ConnectionStrings["DBCS"].ConnectionString;
            using (SqlConnection con = new SqlConnection(cs))
            {
                SqlCommand cmd = new SqlCommand("Select * from tblStudents",con);
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    Student _student = new Student();
                    _student.id = Convert.ToInt32(rdr["Id"]);
                    _student.name = rdr["Name"].ToString();
                    _student.gender = rdr["Gender"].ToString();
                    _student.city = rdr["City"].ToString();
                    listStudents.Add(_student);
                }
            }

            JavaScriptSerializer js = new JavaScriptSerializer();
            Context.Response.Write(js.Serialize(listStudents));
        }

    }
}
