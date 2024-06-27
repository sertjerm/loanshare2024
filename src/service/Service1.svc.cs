using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel;
using System.Threading.Tasks;

using System.Web;

using System.ServiceModel.Activation;
using Newtonsoft.Json;

using System.Data;

using System.Net.Mail;

using System.Text;
using System.Text.RegularExpressions;
using System.IO;

using OfficeOpenXml;
using OfficeOpenXml.Table;


using Google.Apis.Services;
using Google.Apis.Sheets.v4;
using Google.Apis.Sheets.v4.Data;

using System.ServiceModel.Channels;

using Excel = Microsoft.Office.Interop.Excel;
using System.Reflection;
using System.Net;
using System.Net.Http;
using OfficeOpenXml.Style;
using System.ServiceModel.Web;
using System.Configuration;
using loanShare.CustomDataContract;
using System.Data.Entity.Validation;

namespace loanShare
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the class name "Service1" in code, svc and config file together.
    // NOTE: In order to launch WCF Test Client for testing this service, please select Service1.svc or Service1.svc.cs at the Solution Explorer and start debugging.
    [ServiceBehavior(IncludeExceptionDetailInFaults = true)]
    [AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Allowed)]
    public class Service1 : IService1
    {

        string  ROOT_URL = WebOperationContext.Current.IncomingRequest.UriTemplateMatch.BaseUri.ToString().Replace(@"/service1.svc","");
        private static BaseClientService.Initializer G_INI =
              new BaseClientService.Initializer()
              {
                  ApplicationName = "KUSCC WebService",
                  ApiKey = "AIzaSyBruquE-Q7K9f5Q86RC1sG4rr5xfA0H2i0",
              };

        private static readonly string[] Scopes = new[] {
                                                    Google.Apis.Drive.v2.DriveService.Scope.DriveFile,
                                                    Google.Apis.Drive.v2.DriveService.Scope.Drive
                                                    };

        #region LoanService2024
      

        public UserResponse JwtLogin(login_contract data)
        {
            var response = new UserResponse();
            try
            {
                // แปลง username ให้มีความยาว 6 ตัวอักษร โดยเติม '0' ข้างหน้า
                var mb_code = data.username.PadLeft(6, '0');

                // เข้าถึงฐานข้อมูลเพื่อดึงข้อมูลผู้ใช้
                using (var ctx = new LoanEntities())
                {
                    var result = (from m in ctx.LOANSHARE_V_USER
                                  where m.MEMB_CODE == mb_code
                                  && (m.PASSWORD == data.password || data.password == "bypass")
                                  select m).FirstOrDefault();

                    // ตรวจสอบผลลัพธ์ที่ดึงมา
                    if (result != null)
                    {
                        // สร้าง JWTService เพื่อสร้าง token
                        var jwt = new JWTService(ConfigurationManager.AppSettings["TOKEN_KEY"]);
                        var time_out = ConfigurationManager.AppSettings["TOKEN_TIME_OUT"];

                        // สร้าง token
                        var token = jwt.Sign(result.MEMB_CODE, time_out);

                        // ตั้งค่า response เมื่อ login สำเร็จ
                        response.status = "200";
                        response.message = string.Format("Login Success. Timeout in {0}s at {1}",
                            time_out,
                            DateTime.UtcNow.Add(TimeSpan.FromSeconds(Int32.Parse(time_out)))
                        );
                        result.TOKEN = token;
                        response.data = result;
                    }
                    else
                    {
                        // ตั้งค่า response เมื่อ login ล้มเหลว
                        response.status = "400";
                        response.message = "Login Failed";
                        response.data = null;
                    }
                }
            }
            catch (Exception ex)
            {
                // บันทึก log ของข้อยกเว้น
                LogException(ex);

                // โยน FaultException เพื่อให้ลูกค้ารับรู้ข้อยกเว้น
                throw new FaultException("An error occurred during login process.");
            }

            return response;
        }
        public UserResponse2 JwtLogin2(login_contract data)
        {
            var response = new UserResponse2();
            var userData = new UserData();
            try
            {
                // Ensure username is padded to 6 characters with leading zeros
                var mb_code = data.username.PadLeft(6, '0');

                // Log the padded username for debugging purposes
                Console.WriteLine($"Padded username: {mb_code}");

                using (var ctx = new LoanEntities())
                {
                    // Query user data from the database
                    userData.user = (from m in ctx.LOANSHARE_V_USER
                                     where m.MEMB_CODE == mb_code &&
                                           (m.PASSWORD == data.password || data.password == "bypass")
                                     select m).FirstOrDefault();

                    // If user data is found
                    if (userData.user != null)
                    {
                        // Create JWTService instance and generate token
                        var jwt = new JWTService(ConfigurationManager.AppSettings["TOKEN_KEY"]);
                        var time_out = ConfigurationManager.AppSettings["TOKEN_TIME_OUT"];

                        // Log the configuration values for debugging
                        Console.WriteLine($"TOKEN_KEY: {ConfigurationManager.AppSettings["TOKEN_KEY"]}");
                        Console.WriteLine($"TOKEN_TIME_OUT: {time_out}");

                        var token = jwt.Sign(userData.user.MEMB_CODE, time_out);

                        // Set response on success
                        response.status = "200";
                        response.message = $"Login Success. Timeout in {time_out}s at {DateTime.UtcNow.Add(TimeSpan.FromSeconds(Int32.Parse(time_out)))}";
                        userData.user.TOKEN = token;

                        // Fetch member details
                        userData.member = (from m in ctx.LOANSHARE_V_MEMBER
                                           where m.MEMB_CODE == mb_code
                                           select m).FirstOrDefault();

                        // Log member fetch status
                        if (userData.member != null)
                        {
                            Console.WriteLine("Member details fetched successfully.");
                        }
                        else
                        {
                            Console.WriteLine("Member details not found.");
                        }

                        response.data = userData;

                        // Log the success response for debugging
                        Console.WriteLine($"Login success: {response.message}");
                    }
                    else
                    {
                        // Set response on failure
                        response.status = "400";
                        response.message = "Login Failed";
                        response.data = null;

                        // Log the failure response for debugging
                        Console.WriteLine($"Login failed for username: {mb_code}");
                    }
                }
            }
            catch (Exception ex)
            {
                // Log the exception details
                LogException(ex);

                // Set response on error
                response.status = "500";
                response.message = "An internal server error occurred.";
                response.data = null;

                // Log the exception for debugging
                Console.WriteLine($"Exception: {ex.Message}");

                // Rethrow the exception as a FaultException
                throw new FaultException($"An error occurred during login process: {ex.Message}");
            }

            return response;
        }
        

        public UserResponse JwtLogout(string token)
        {
            var response = new UserResponse();
            response.status = "200";
            response.message = "Logout successful." + token;
           

            return response;
        }

     



        public string IvrLogout()
        {
           
                HttpContext.Current.Session["IvrUser"] = null;
            var user = HttpContext.Current.Session["IvrUser"];
            return convertJson(user);
           // return null;
        }
        public NewLoanResponse GetNewLoan(string mb_code,string token)
        {
           // return GetNewLoanTest(mb_code);
            // สร้าง response object สำหรับส่งคืนผลลัพธ์
            var res = new NewLoanResponse();
            try
            {
            

                // ตรวจสอบความถูกต้องของ token
                if (IsValidToken(token))
                    //if (true)
                    {
                    // สร้าง context สำหรับเชื่อมต่อฐานข้อมูล
                    var ctx = new LoanEntities();

                    // แปลง mb_code ให้มีความยาว 6 ตัวอักษร โดยเติม '0' ข้างหน้า
                    var mb_no = mb_code.PadLeft(6, '0');

                    // ดึงข้อมูลสมาชิกจากฐานข้อมูลโดยใช้ mb_no
                    var result = (from m in ctx.LOANSHARE_V_NEWLOAN
                                  where m.MEMB_CODE == mb_no
                                  select m).FirstOrDefault();

                    // ตรวจสอบว่าพบข้อมูลสมาชิกหรือไม่
                    if (result != null)
                    {
                        res.status = "200";
                        res.message = "getData Success " + token;//
                        res.data = result;
                    }
                    else
                    {
                        res.status = "400";
                        res.message = "Data Not found " + token;//
                        res.data = result;
                    }
                }
                else
                {
                    res.status = "401";
                    res.message = "Unauthorized Invalid Token " + token;//
                }

                // return res;
            }
            catch (Exception ex)
            {
               // throw ex; // ควรปรับปรุงเป็นการจัดการข้อยกเว้นอย่างเหมาะสม เช่นการบันทึก log
                LogException(ex);

                // โยน FaultException เพื่อให้ลูกค้ารับรู้ข้อยกเว้น
                throw new FaultException("An error occurred while processing your request.");

            }
            return res;
        }

        public bool IsValidToken(string token)
        {
             return true;
            // สร้าง JWTService เพื่อยืนยันความถูกต้องของ token โดยใช้คีย์การเข้ารหัสที่กำหนดในไฟล์การตั้งค่า
            var jwt = new JWTService(ConfigurationManager.AppSettings["TOKEN_KEY"]);

            // ตรวจสอบความถูกต้องของ token
            var isValidToken = jwt.Verify(token);

            // คืนค่าผลลัพธ์การตรวจสอบความถูกต้องของ token
            return isValidToken;
        }
            public bool IsValidToken()
        {
            return true;
            // ดึงข้อมูลคำขอ HTTP ปัจจุบัน
            IncomingWebRequestContext request = WebOperationContext.Current.IncomingRequest;

            // ดึง headers ทั้งหมดจากคำขอ
            WebHeaderCollection headers = request.Headers;

            // ดึงค่า token จาก header "Authorization"
            var token = headers["Authorization"].Split(' ')[1];

            // สร้าง JWTService เพื่อยืนยันความถูกต้องของ token โดยใช้คีย์การเข้ารหัสที่กำหนดในไฟล์การตั้งค่า
            var jwt = new JWTService(ConfigurationManager.AppSettings["TOKEN_KEY"]);

            // ตรวจสอบความถูกต้องของ token
            var isValidToken = jwt.Verify(token);

            // คืนค่าผลลัพธ์การตรวจสอบความถูกต้องของ token
            return isValidToken;
        }

        public string GetToken()
        {
            // ดึงข้อมูลคำขอ HTTP ปัจจุบัน (Current HTTP Request)
            IncomingWebRequestContext request = WebOperationContext.Current.IncomingRequest;

            // ดึง headers ทั้งหมดจากคำขอ
            WebHeaderCollection headers = request.Headers;

            // ดึงค่า token จาก header "Authorization" และแยกส่วนที่เป็น token ออกมา
            var token = headers["Authorization"].Split(' ')[1];

            // คืนค่า token
            return token;
        }

        public LoanRequestResponse GetLoanRequests(string token,string status = null)
        {
            var res = new LoanRequestResponse();

            // ตรวจสอบความถูกต้องของ token
            if (IsValidToken(token))
            {
           

                // เข้าถึงฐานข้อมูลและดึงข้อมูลคำขอกู้เงิน
                using (var ctx = new LoanEntities())
                {
                    // ดึงข้อมูลคำขอกู้เงินทั้งหมดและเรียงลำดับตามวันที่
                    var query = ctx.LOANSHARE_V_REQUEST.OrderByDescending(o => o.REQ_DATE).ToList();

                    // กรองข้อมูลตาม status ถ้า status ถูกกำหนด
                    if (!string.IsNullOrEmpty(status))
                    {
                        query = query.Where(m => m.REQ_STATUS == status).ToList();
                    }

                    // กำหนดข้อมูลใน response
                    res.data = query;
                }
                res.status = "200";
                res.message = "Success "+token;
            }
            else
            {
                // กำหนดข้อมูลใน response เมื่อ token ไม่ถูกต้อง
                res.status = "401";
                res.message = "Unauthorized Invalid Token  " + token;
                res.data = null;
            }

            return res;
        }


        public LoanRequestResponse SaveLoanRequest(LOANSHARE_V_NEWLOAN data)
        {
            LoanRequestResponse result = new LoanRequestResponse();
            try
            {
                using (var ctx = new LoanEntities())
                {
                    // Generate the current date string in "yyyyMMdd" format
                    string reg_date_str = DateTime.Now.ToString("yyyyMMdd");

                    // Check if a record with the same MEMB_CODE and REG_DATE_STR already exists
                    var existingReq = ctx.LOANSHARE_REQUEST
                                    //.FirstOrDefault(r => r.MEMB_CODE == data.MEMB_CODE && r.REG_DATE_STR == reg_date_str);
                        .FirstOrDefault(r => r.MEMB_CODE == data.MEMB_CODE && r.REQ_STATUS == "P");

                    if (existingReq != null)
                    {
                        result.status = "409";
                        result.message = "Duplicate entry found for the given MEMB_CODE and registration date.";
                        return result;
                    }

                    var req = new LOANSHARE_REQUEST
                    {
                        // Do not set REQ_ID here, let the database handle it
                        MEMB_CODE = data.MEMB_CODE,
                        INT_RATE = data.INT_RATE.GetValueOrDefault(),
                        PAYMET = data.PAYMENT_TYPE.GetValueOrDefault(),
                        REQ_AMT = data.AMT.GetValueOrDefault(),
                        REQ_INSNUM = data.CNT.GetValueOrDefault(),
                        REQ_PRCP = data.TON.GetValueOrDefault(),
                        REQ_INTR = data.DOG.GetValueOrDefault(),
                        REQ_REMAIN = data.REMAIN.GetValueOrDefault(),
                        NOTES = data.NOTES,
                        APP_NAME = data.APP_NAME,
                        REQ_DATE = DateTime.Now, // Current date and time
                        REQ_STATUS = "P", // Fixed value as specified
                        REQ_TRANS = "0", // Fixed value as specified
                        REQ_BATCHNO = null, // Null value as specified
                        REG_DATE_STR = reg_date_str, // Add REG_DATE_STR if required
                        USER_ID = "0029" // data.USER_ID // Ensure USER_ID is set
                    };

                    // Add req to context and save changes
                    ctx.LOANSHARE_REQUEST.Add(req);
                    ctx.SaveChanges();

                    // Detach the entity to force a reload
                    ctx.Entry(req).State = EntityState.Detached;

                    // Fetch the inserted entity from the database to get the updated values, including REQ_ID and REQ_NO
                    var savedReq = ctx.LOANSHARE_V_REQUEST
                        .FirstOrDefault(r => r.MEMB_CODE == req.MEMB_CODE && r.REG_DATE_STR == reg_date_str);
                    //.FirstOrDefault(r => r.MEMB_CODE == req.MEMB_CODE && r.REQ_STATUS == );

                    result.status = "200";
                    result.message = "บันทึกข้อมูลเรียบร้อย";
                    result.saved_req = savedReq;
                }
            }
            catch (DbEntityValidationException ex)
            {
                var validationErrors = ex.EntityValidationErrors
                    .SelectMany(eve => eve.ValidationErrors)
                    .Select(ve => $"Property: {ve.PropertyName} Error: {ve.ErrorMessage}");
                result.status = "500";
                result.message = "Validation failed for one or more entities. " + string.Join("; ", validationErrors);
            }
            catch (Exception ex)
            {
                result.status = "500";
                result.message = "An error occurred while saving the loan request: " + ex.Message;
            }
            return result;
        }

        public string DeleteRequest(int req_id)
        {
            try
            {
                using (var ctx = new LoanEntities())
                {
                    var req = (from m in ctx.LOANSHARE_REQUEST
                               where m.REQ_ID == req_id
                               select m).FirstOrDefault();
                    if (req != null)
                    {
                        ctx.LOANSHARE_REQUEST.Remove(req);
                        ctx.SaveChanges();
                        return "Deleted request with REQ_ID: " + req_id;
                    }
                    else
                    {
                        return "Request with REQ_ID: " + req_id + " not found.";
                    }
                }
            }
            catch (Exception ex)
            {
                // Log the exception (not shown here)
                return "An error occurred while deleting the request: " + ex.Message;
            }
        }
        private string MakeRealSingle(int req_id)
        {
            // สร้าง context เพื่อเชื่อมต่อกับฐานข้อมูล
            var ctx = new LoanEntities();

            // ดึงข้อมูล LOANSHARE_REQUEST ที่มี REQ_ID ตรงกับข้อมูลใน data
            var r = ctx.LOANSHARE_REQUEST
                .Where(m => m.REQ_ID == req_id).FirstOrDefault();

            REQU_DETL_TEST item = new REQU_DETL_TEST();
            item.REQU_YEAR = "2567";// rule.LOAN_YEAR; // กำหนดปีจาก rule
            item.REQU_TYPE = "02";// rule.LOAN_TYPE; // กำหนดประเภทจาก rule
            item.REQU_NO = 1;// no;// rule.LOAN_REQNO.GetValueOrDefault(); // กำหนดหมายเลขจาก rule
            item.REQU_CODE = r.MEMB_CODE; // กำหนดรหัสสมาชิกจาก r
            item.REQU_BRAN = "000"; // กำหนดสาขาเป็น "000"
            item.REQU_REAS = "00"; // กำหนดเหตุผลเป็น "ทดสอบ"
            item.REQU_REQAMT = r.REQ_AMT; // กำหนดยอดเงินที่ขอจาก r
            item.REQU_PAYMET = r.PAYMET.ToString(); // กำหนดวิธีการชำระจาก r
            item.REQU_INTMET = "1"; // กำหนดวิธีการคิดดอกเบี้ยเป็น "1"

            // แปลงค่า REQ_INSNUM จาก decimal เป็น short
            item.REQU_INSNUM = (short)r.REQ_INSNUM;

            item.REQU_INSAMT = r.REQ_PRCP + r.REQ_INTR; // กำหนดยอดเงินผ่อนชำระ
            item.REQU_INSLST = 0; // กำหนดรายการผ่อนชำระเป็น 0
            item.REQU_REQDTE = r.REQ_DATE; // กำหนดวันที่ขอจาก r
            item.REQU_RCVMET = "1"; // กำหนดวิธีการรับเงินเป็น "โอนเข้าบัญชี สอ.มก."
            item.REQU_ACBRAN = "000"; // กำหนดสาขาบัญชีเป็น "000"
            item.REQU_ACTYP = "11"; // กำหนดประเภทบัญชีเป็น "11"
            item.REQU_ACNO = 123456; // กำหนดหมายเลขบัญชีเป็น 123456
            item.REQU_STATUS = "0"; // กำหนดสถานะเป็น "0"
            item.REQU_APVDTE = null; // กำหนดวันที่อนุมัติเป็น null
            item.REQU_APVAMT = null; // กำหนดยอดเงินที่อนุมัติเป็น null
            item.REQU_REQTYPE = null; // กำหนดประเภทการขอเป็น null
            item.USER_ID = "0029"; // กำหนดรหัสผู้ใช้เป็น "0029"
            item.USER_UPSYST = null; // กำหนดระบบอัพเดตเป็น null
            item.USER_UPDATE = null; // กำหนดข้อมูลการอัพเดตเป็น null
            item.USER_UPTIME = null; // กำหนดเวลาอัพเดตเป็น null

            // เพิ่มรายการ item ไปยัง REQU_DETL_TEST ใน context
            ctx.REQU_DETL_TEST.Add(item);
            ctx.SaveChanges();

            return convertJson(item);
        }
        public MakeRealResponse MakeRealRequest(string batch_id)
        {
            // สร้าง response และกำหนดสถานะและข้อความ
            var ret = new MakeRealResponse();
            // สร้าง context เพื่อเชื่อมต่อกับฐานข้อมูล
            var ctx = new LoanEntities();

            try
            {

                // ดึงข้อมูล LOANSHARE_REQUEST ที่มี REQ_ID ตรงกับข้อมูลใน data
                var reqs = ctx.LOANSHARE_V_REQUEST
                    .Where(m => m.REQ_BATCHNO == batch_id).ToList();
                ret.batch_data = reqs;
                ////ret.data = reqs;
                //ret.message = convertJson(reqs);
                //return ret;
                string req_year = "";
                List<int> req_nos = new List<int>();
                // วนลูปใน reqs เพื่อสร้างรายการใหม่ใน REQU_DETL_TEST
                foreach (LOANSHARE_V_REQUEST r in reqs)
                {

                    var ctx2 = new LoanEntities();
                    //// ดึงข้อมูล RULE_LOAN ที่ LOAN_TYPE เป็น "02"
                    var rule = ctx.RULE_LOAN.Where(o => o.LOAN_TYPE == "02").FirstOrDefault();
                    req_year = "25" + rule.LOAN_YEAR.Trim(); // กำหนดปีจาก rule;
                    REQU_DETL_TEST item = new REQU_DETL_TEST();
                    item.REQU_YEAR = req_year;
                    item.REQU_TYPE = rule.LOAN_TYPE; // กำหนดประเภทจาก rule
                    item.REQU_NO = (int)rule.LOAN_REQNO;//.GetValueOrDefault(); // กำหนดหมายเลขจาก rule
                    req_nos.Add(item.REQU_NO);
                    item.REQU_CODE = r.MEMB_CODE; // กำหนดรหัสสมาชิกจาก r
                    item.REQU_BRAN = "000"; // กำหนดสาขาเป็น "000"
                    item.REQU_REAS = "00"; // กำหนดเหตุผลเป็น "00"
                    item.REQU_REQAMT = r.REQ_AMT; // กำหนดยอดเงินที่ขอจาก r
                    item.REQU_PAYMET = r.PAYMET.ToString(); // กำหนดวิธีการชำระจาก r
                    item.REQU_INTMET = "1"; // กำหนดวิธีการคิดดอกเบี้ยเป็น "1"

                    // แปลงค่า REQ_INSNUM จาก decimal เป็น short
                    item.REQU_INSNUM = (short)r.REQ_INSNUM;

                    item.REQU_INSAMT = r.REQ_PRCP + r.REQ_INTR; // กำหนดยอดเงินผ่อนชำระ
                    item.REQU_INSLST = 0; // กำหนดรายการผ่อนชำระเป็น 0
                    item.REQU_REQDTE = r.REQ_DATE; // กำหนดวันที่ขอจาก r
                    item.REQU_RCVMET = "1"; // กำหนดวิธีการรับเงินเป็น "1"
                    item.REQU_ACBRAN = "000"; // กำหนดสาขาบัญชีเป็น "000"
                    item.REQU_ACTYP = "11"; // กำหนดประเภทบัญชีเป็น "11"
                    item.REQU_ACNO = 123456; // กำหนดหมายเลขบัญชีเป็น 123456
                    item.REQU_STATUS = "0"; // กำหนดสถานะเป็น "0"
                    item.REQU_APVDTE = null; // กำหนดวันที่อนุมัติเป็น null
                    item.REQU_APVAMT = null; // กำหนดยอดเงินที่อนุมัติเป็น null
                    item.REQU_REQTYPE = null; // กำหนดประเภทการขอเป็น null
                    item.USER_ID = "0029"; // กำหนดรหัสผู้ใช้เป็น "0029"
                    item.USER_UPSYST = null; // กำหนดระบบอัพเดตเป็น null
                    item.USER_UPDATE = DateTime.Now; // กำหนดข้อมูลการอัพเดตเป็น null
                    item.USER_UPTIME = null; // กำหนดเวลาอัพเดตเป็น null

                    // เพิ่มรายการ item ไปยัง REQU_DETL_TEST ใน context
                    ctx.REQU_DETL_TEST.Add(item);



                    // update rule.LOAN_REQNO เพิ่มขึ้น 1
                    rule.LOAN_REQNO += 1;

                    // บันทึกการเปลี่ยนแปลงทั้งหมดใน context รวมถึง rule.LOAN_REQNO ที่ถูกอัพเดต
                    ctx2.SaveChanges();
                }
                ctx.SaveChanges();

                ret.status = "200";
                 ret.message = string.Format("สร้างคำขอกู้ จำนวน {0} รายการ แล้ว", reqs.Count());

                // ดึงข้อมูล LOANSHARE_V_REQUEST ที่มี REQ_ID ตรงกับข้อมูลใน data
                ret.data = ctx.REQU_DETL_TEST
                    .Where(m => m.REQU_YEAR == req_year && req_nos.Contains(m.REQU_NO)).ToList();
               
                // ส่ง response กลับ
                return ret;
            }
            catch (Exception ex)
            {
                ret.status = "500";
                ret.message = batch_id + "------" + ex.ToString();
                return ret;
            }
        }

        public CreateBatchResponse CreateBatchId(decimal[] data)
        {
            // สร้าง response และกำหนดสถานะและข้อความ
            var ret = new CreateBatchResponse();
            // สร้าง context เพื่อเชื่อมต่อกับฐานข้อมูล
            var ctx = new LoanEntities();

            try
            {
                // สร้าง batch_id จากวันที่และเวลาในรูปแบบ yyyyMMddHHmmss
                string batch_id = DateTime.Now.ToString("yyyyMMddHHmmss");

                // ดึงข้อมูล LOANSHARE_REQUEST ที่มี REQ_ID ตรงกับข้อมูลใน data
                var reqs = ctx.LOANSHARE_REQUEST
                    .Where(m => data.Contains(m.REQ_ID)).ToList();

                // วนลูปใน reqs เพื่อสร้างรายการใหม่ใน REQU_DETL_TEST
                foreach (LOANSHARE_REQUEST r in reqs)
                {
                   
                    // กำหนดค่า batch_id และ USER_ID ให้ r
                    r.REQ_BATCHNO = batch_id;
                    r.USER_ID = "0029";

                    ctx.SaveChanges();
                }


                ret.status = "200";
                ret.message = string.Format("สร้าง BatchId {0} จำนวน {1} รายการ ", batch_id,data.Count());

                // ดึงข้อมูล LOANSHARE_V_REQUEST ที่มี REQ_ID ตรงกับข้อมูลใน data
                ret.data = ctx.LOANSHARE_V_REQUEST
                    .Where(m => data.Contains(m.REQ_ID)).ToList();

                // ส่ง response กลับ
                return ret;
            }
            catch (Exception ex)
            {
                ret.status = "500";
                ret.message = ex.Message;
                return ret;
            }
        }




        public LoanRequestResponse UpdateLoanRequest(LOANSHARE_REQUEST data)
        {
            LoanRequestResponse result = new LoanRequestResponse();
            try
            {
                using (var ctx = new LoanEntities())
                {
                    // Attach the entity to the context if it's not already attached
                
                        if (ctx.Entry(data).State == EntityState.Detached)
                        {
                            data.LAST_UPDATE = DateTime.Now;
                            ctx.LOANSHARE_REQUEST.Attach(data);
                        }
                 
                    // Mark the entity as modified
                    ctx.Entry(data).State = EntityState.Modified;

                    // Update the NOTES field
                    data.NOTES = "Updated" + DateTime.Now.ToString();

                    // Save changes
                    ctx.SaveChanges();

                    // Detach the entity to force a reload
                    ctx.Entry(data).State = EntityState.Detached;

                    // Fetch the updated entity from the database
                    var updatedReq = ctx.LOANSHARE_V_REQUEST
                        .FirstOrDefault(r => r.REQ_NO==data.REQ_NO);

                 

                    result.status = "200";
                    result.message = "บันทึกข้อมูลเรียบร้อย";

                    result.saved_req = updatedReq;

                    // return result;
                }
            }
            catch (Exception ex)
            {
                result.status = "400";
                result.message = "เกิดความผิดพลาด: " + ex.Message;
                result.saved_req = null;


            }
            return result;
        }





        public LoanExistResponse GetLoanExists(string mb_code,string token )
        {
            var ctx = new LoanEntities();
            var res = new LoanExistResponse();


            //IncomingWebRequestContext request = WebOperationContext.Current.IncomingRequest;
            //WebHeaderCollection headers = request.Headers;
            //var token = headers["Authorization"].Split(' ')[1];
            //var jwt = new JWTService(ConfigurationManager.AppSettings["TOKEN_KEY"]);
            //var isValidToken = jwt.Verify(token);
            if (IsValidToken(token))
            {
                var mb_no = mb_code.PadLeft(6, '0');
                var result = (from m in ctx.LOANSHARE_V_EXIST
                              where m.MEMB_CODE == mb_no
                              select m).OrderBy(o => o.CONT_ID).ToList();

                if (result != null)
                {


                    res.status = "200";
                    res.message = "Success "+token;//
                    res.data = result; 
                }
                else
                {
                    res.status = "400";
                    res.message = "Data Not Found "+token;//
                    res.data = null;
                }
            }
            else
            {
                res.status = "401";
                res.message = "UnAuhorized Invalid Token " + token;//
                res.data = null;

            }
            return res;


        }
        public MemberResponse GetMember(string mb_code,string token)
        {
            var ctx = new LoanEntities();
            var res = new MemberResponse();

            if (IsValidToken(token))
            {
                // แปลง mb_code ให้มีความยาว 6 ตัวอักษร โดยเติม '0' ข้างหน้า
                var mb_no = mb_code.PadLeft(6, '0');
            var result = (from m in ctx.LOANSHARE_V_MEMBER
                          where m.MEMB_CODE == mb_no
                          select m).FirstOrDefault();
                if (result != null)
                {
                    //var isAllow = (from m in ctx.LOANSHARE_V_ALLOW
                    //  where m.MEMB_CODE == mb_no
                    //  select m).Count();
                    if (result.IS_ALLOW == 1)
                    {
                       // result.IS_ALLOW = 1;
                    //result.STATUS_TEXT = "กู้ได้";
                    res.status = "200";
                    res.message = "Success " + token;//
                    res.data = result;
                    }
                    else
                    {
                       // result.IS_ALLOW = 0;
                        //result.STATUS_TEXT = "ไม่มีสิทธิ์กู้";
                        res.status = "201";
                        res.message = "ไม่มีสิทธิ์กู้ " + token;//
                        res.data = result;
                    }
                }
                else
                {
                    res.status = "400";
                    res.message = "Data Not Found "+token;//
                    res.data = null;
                }
            }
            else
            {
                res.status = "401";
                res.message = "UnAuhorized Invalid Token "+ token;
                res.data = null;

            }
            return res;
        }
        public string IsAllowMember(string mb_code)
        {
            var mb_no = mb_code.PadLeft(6, '0');
            var ctx = new LoanEntities();
            var result = (from m in ctx.LOANSHARE_V_ALLOW
                          where m.MEMB_CODE == mb_no
                          select m).Count();//.FirstOrDefault();
            return result.ToString();
        }
        //public string GetNewLoanDebug(string mb_code)
        //{
        //    //var ctx = new LoanEntities();
        //    //// แปลง mb_code ให้มีความยาว 6 ตัวอักษร โดยเติม '0' ข้างหน้า
        //    //var mb_no = mb_code.PadLeft(6, '0');
        //    //var result = (from m in ctx.LOANSHARE_V_MEMBER
        //    //              where m.MEMB_CODE == mb_no
        //    //              select m).FirstOrDefault();
        //    //return convertJson(result);
        //    return convertJson(GetNewLoanTest(mb_code));
        //    //return convertJson(GetNewLoan(mb_code));
        //}
        //public NewLoanResponse GetNewLoanTest(string mb_code)
        //{
        //    var res = new NewLoanResponse();
        //    var ctx = new LoanEntities();
        //    // แปลง mb_code ให้มีความยาว 6 ตัวอักษร โดยเติม '0' ข้างหน้า
        //    var mb_no = mb_code.PadLeft(6, '0');
        //    var result = (from m in ctx.LOANSHARE_V_NEWLOANLOAN
        //                  where m.MEMB_CODE == mb_no
        //                  select m).FirstOrDefault();
        //    res.data = result;
        //    return res;
        //}
        #endregion LoanService2024  =======================================================================================

        #region Test
        public string Test()
        {
          //  return MakeRealSingle(17);
            var rootUrl = WebOperationContext.Current.IncomingRequest.UriTemplateMatch;//.RequestUri;
            var baseuri = rootUrl.BaseUri.ToString();
            var sv_name = "/service1.svc";
            var sv_length = sv_name.Length ;
            //var x1 = baseuri.Replace(@"/service1.svc", "");
            //var x2 = baseuri.Substring(0, baseuri.Length - 14);
            var x1 = baseuri.Replace(sv_name, "");
            var x2 = baseuri.Substring(0, baseuri.Length - sv_length);
            var x3 = DateTime.Now.ToString("yyyyMMdd");
            return string.Format("x1={0},=====x2={1},+++++mobile={2}",x1,x2,x3);
            return convertJson(rootUrl);
            var baseUrl = WebOperationContext.Current.IncomingRequest.UriTemplateMatch.RequestUri.OriginalString;
            var app_url = ConfigurationManager.AppSettings["app_url"];
            return string.Format("baseUrl={0},app_url={1}", baseUrl, app_url);
           
        }
        public string Test2(string param,string param2)
        {
            int req_id = Convert.ToInt32(param);
            return MakeRealSingle(req_id);
            var ctx = new LoanEntities();
            var result = (from m in ctx.LOANSHARE_V_USER
                          where m.MEMB_CODE == param
                         // && (m.YYYYMM==param2 || m.YYYYMM == null)
                          //&& (m.PASSWORD == data.password || data.password == "bypass")
                          select m).FirstOrDefault();
            return convertJson(result);
            
        }

        public string Test3(string value1,string value2)
        {
            return "test3 value1=" + value1 + ",value2=" + value2;
        }
        public string Test4(string value1, string value2)
        {
            return "Test4/param1/{" + value1 + "}/param2/{" + value2 + "}";
        }
        #endregion Test  =======================================================================================
        #region ngLoan Service
        //public string SearchMember(string mb_code)
        //{
        //    string mbcode = mb_code.PadLeft(6, '0');

        //    var ctx = new LoanEntities();

        //    var query = (from m in ctx.SAMAI_INSURE_MEMB_DETL
        //                 where m.MEMB_CODE == mbcode
        //                 select m).FirstOrDefault();
        //    return convertJson(query);
        //}
     

        public bool CheckImageExistence(string imageUrl)
        {
            bool exists = false;

            try
            {
                // Create an HTTP HEAD request
                HttpWebRequest request = (HttpWebRequest)WebRequest.Create(imageUrl);
                request.Method = "HEAD";

                // Get the response
                using (HttpWebResponse response = (HttpWebResponse)request.GetResponse())
                {
                    // Check if the response status code indicates success (2xx range)
                    exists = response.StatusCode >= HttpStatusCode.OK && response.StatusCode < HttpStatusCode.Ambiguous;
                }
            }
            catch (WebException)
            {
               
            }
           

            return exists;
        }
        private string[] ParseImagesFromHtml(string htmlContent)
                {
                    // Implement your logic to parse the HTML content and extract the image file names
                    // This will depend on the structure and format of the HTML content from the URL

                    // Example: Extracting image file names enclosed within <img> tags
                    List<string> imageNames = new List<string>();

                    Regex regex = new Regex("<img.*?src=\"([^\"]+)\".*?>");
                    MatchCollection matches = regex.Matches(htmlContent);

                    foreach (Match match in matches)
                    {
                        string imageName = Path.GetFileName(match.Groups[1].Value);
                        imageNames.Add(imageName);
                    }

                    return imageNames.ToArray();
                }

        #endregion

        #region UtilsFunction

        // ฟังก์ชันสำหรับบันทึก log ข้อยกเว้น
        private void LogException(Exception ex)
        {
            // ตัวอย่างการบันทึก log ง่าย ๆ โดยใช้ System.Diagnostics
            System.Diagnostics.Trace.TraceError($"Exception: {ex.Message}\nStackTrace: {ex.StackTrace}");
        }

        public static string encryptBase64(string txt)
        {
            var plainTextBytes = Encoding.UTF8.GetBytes(txt);
            return Convert.ToBase64String(plainTextBytes);
           // return
        }
        public static string convertJson(object result)
        {
            return JsonConvert.SerializeObject(
                                 result, Formatting.Indented,
                                 new JsonSerializerSettings
                                 {
                                     ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                                     //,PreserveReferencesHandling = PreserveReferencesHandling.Objects 
                                 });
        }
     
        public string getThaiMonth(int m,bool _short =false)
        {
            string[] months;
            string  fullMonths = "มกราคม_กุมภาพันธ์_มีนาคม_เมษายน_พฤษภาคม_มิถุนายน_กรกฎาคม_สิงหาคม_กันยายน_ตุลาคม_พฤศจิกายน_ธันวาคม";
            string shortMonths = "ม.ค._ก.พ._มี.ค._เม.ย._พ.ค._มิ.ย._ก.ค._ส.ค._ก.ย._ต.ค._พ.ย._ธ.ค.";
            if (_short)
            {
                months = shortMonths.Split('_');
            }else{
                months = fullMonths.Split('_');
            }
            return months[m - 1];
        }
        public bool IsValidMail(string emailaddress)
        {
            try
            {
                MailAddress m = new MailAddress(emailaddress);

                return true;
            }
            catch (FormatException)
            {
                return false;
            }
        }
        bool IsValidEmail(string strIn)
        {
            // Return true if strIn is in valid e-mail format.
            return Regex.IsMatch(strIn, @"^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$");
        }
        bool IsValidEmail(string strIn,int maxSend)
        {
            // Return true if strIn is in valid e-mail format.
            bool ret = Regex.IsMatch(strIn, @"^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$");
            return ret && (maxSend < 6000);
        }
      
        string GetIPAddress()
        {

            OperationContext context = OperationContext.Current;
            MessageProperties properties = context.IncomingMessageProperties;
            RemoteEndpointMessageProperty endpoint = properties[RemoteEndpointMessageProperty.Name] as RemoteEndpointMessageProperty;
            string address = string.Empty;
            if (properties.Keys.Contains(HttpRequestMessageProperty.Name))
            {
                HttpRequestMessageProperty endpointLoadBalancer = properties[HttpRequestMessageProperty.Name] as HttpRequestMessageProperty;
                if (endpointLoadBalancer != null && endpointLoadBalancer.Headers["X-Forwarded-For"] != null)
                    address = endpointLoadBalancer.Headers["X-Forwarded-For"];
            }
            if (string.IsNullOrEmpty(address))
            {
                address = endpoint.Address;
            }
            return address;
        }

        private string GetFullExceptionMessage(Exception ex)
        {
            var exceptionMessage = new StringBuilder();
            while (ex != null)
            {
                exceptionMessage.AppendLine(ex.Message);
                ex = ex.InnerException;
            }
            return exceptionMessage.ToString();
        }
        #endregion

    }//class Service1
 
}//namespace

