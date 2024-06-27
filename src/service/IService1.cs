
using System.Collections.Generic;
using System.ServiceModel;
using System.ServiceModel.Web;

using loanShare.CustomDataContract;
namespace loanShare
{

    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the interface name "IService1" in both code and config file together.
    [ServiceContract]
    public interface IService1
    {


        #region LoanService2024
        [OperationContract]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json
         , RequestFormat = WebMessageFormat.Json
         , UriTemplate = "/JwtLogin")]
        UserResponse JwtLogin(login_contract data);
        [OperationContract]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json
        , RequestFormat = WebMessageFormat.Json
        , UriTemplate = "/JwtLogin2")]
        UserResponse2 JwtLogin2(login_contract data);

        [OperationContract]
        [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json
         , RequestFormat = WebMessageFormat.Json
         , UriTemplate = "/JwtLogout?token={token}")]
        UserResponse JwtLogout(string token);
        
        [OperationContract]
        [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json
, RequestFormat = WebMessageFormat.Json
, UriTemplate = "GetNewLoan?mb_code={mb_code}&token={token}")]
        NewLoanResponse GetNewLoan(string mb_code,string token);

//        [OperationContract]
//        [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json
//, RequestFormat = WebMessageFormat.Json
//, UriTemplate = "GetNewLoanTest?mb_code={mb_code}")]
//        NewLoanResponse GetNewLoanTest(string mb_code);

//        [OperationContract]
//        [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json
//, RequestFormat = WebMessageFormat.Json
//, UriTemplate = "GetNewLoanDebug?mb_code={mb_code}")]
//        string GetNewLoanDebug(string mb_code);


        [OperationContract]
        [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json
, RequestFormat = WebMessageFormat.Json
, UriTemplate = "GetLoanRequests?token={token}&status={status}")]
        LoanRequestResponse GetLoanRequests( string token,string status);

     

        [OperationContract]
        [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json
, RequestFormat = WebMessageFormat.Json
, UriTemplate = "GetLoanExists?mb_code={mb_code}&token={token}")]
        LoanExistResponse GetLoanExists(string mb_code, string token);
 //       [OperationContract]
 //       [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json
 //    , RequestFormat = WebMessageFormat.Json
 //, UriTemplate = "/SaveLoanRequest")]
 //       LOANSHARE_REQUEST SaveLoanRequest(LOANSHARE_REQUEST data);

        [OperationContract]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json
   , RequestFormat = WebMessageFormat.Json
, UriTemplate = "/SaveLoanRequest")]
        LoanRequestResponse SaveLoanRequest(LOANSHARE_V_NEWLOAN data);

        [OperationContract]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json
, RequestFormat = WebMessageFormat.Json
, UriTemplate = "/CreateBatchId")]
        CreateBatchResponse CreateBatchId(decimal[] data);

        [OperationContract]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json
, RequestFormat = WebMessageFormat.Json
, UriTemplate = "/MakeRealRequest")]
        MakeRealResponse MakeRealRequest(string batch_id);


        [OperationContract]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json
  , RequestFormat = WebMessageFormat.Json
, UriTemplate = "/UpdateLoanRequest")]
        LoanRequestResponse UpdateLoanRequest(LOANSHARE_REQUEST data);

        [OperationContract]
        [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json
, RequestFormat = WebMessageFormat.Json
, UriTemplate = "DeleteRequest?req_id={req_id}")]
        string DeleteRequest(int req_id);

        //        [OperationContract]
        //        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json
        //, RequestFormat = WebMessageFormat.Json
        //, UriTemplate = "/UpdateLoanRequest")]
        //        LoanRequestResponse UpdateLoanRequest(LOANSHARE_REQUEST data);

        [OperationContract]
        [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json
    , RequestFormat = WebMessageFormat.Json
    , UriTemplate = "GetMember?mb_code={mb_code}&token={token}")]
        MemberResponse GetMember(string mb_code, string token);
        #endregion LoanService2024 =======================================================================================

        #region Test
        [OperationContract]
        [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json
          , RequestFormat = WebMessageFormat.Json
          , UriTemplate = "Test")]
        string Test();

        [OperationContract]
        [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json
          , RequestFormat = WebMessageFormat.Json
          , UriTemplate = "Test2?param={param}&param2={param2}")]
        string Test2(string param,string param2);
        [OperationContract]
        [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json
        , RequestFormat = WebMessageFormat.Json
        , UriTemplate = "Test3?value1={value1}&value2={value2}")]
        string Test3(string value1, string value2);

        [OperationContract]
        [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json
    , RequestFormat = WebMessageFormat.Json
    , UriTemplate = "Test4/{value1}/{value2}")]
        string Test4(string value1, string value2);


        #endregion Test =======================================================================================
       
        #region utils

        [OperationContract]
        [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json
       , RequestFormat = WebMessageFormat.Json
       , UriTemplate = "CheckImageExistence?imageUrl={imageUrl}")]
        bool CheckImageExistence(string imageUrl);

        #endregion

    }


}
