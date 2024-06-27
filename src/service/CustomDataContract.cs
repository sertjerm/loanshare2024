using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Web;
using System.Text;

namespace loanShare.CustomDataContract
{
    #region JWT
    //========================NewUserREsponse=============+>
    [DataContract]
    public class UserData
    {
        [DataMember]
        public LOANSHARE_V_USER user { get; set; }
        [DataMember]
        public LOANSHARE_V_MEMBER member { get; set; }
    }

    [DataContract]
    public class UserResponse2
    {
        [DataMember]
        public string status { get; set; }
        [DataMember]
        public string message { get; set; }
        //[DataMember]
        //public string token { get; set; }
        [DataMember]
        public UserData data { get; set; }
        //[DataMember]
        //public LOANSHARE_V_MEMBER member { get; set; }
    }

    ////========================NewUserREsponse=============+>

    [DataContract]
    public class UserResponse
    {
        [DataMember]
        public string status { get; set; }
        [DataMember]
        public string message { get; set; }
        //[DataMember]
        //public string token { get; set; }
        [DataMember]
        public LOANSHARE_V_USER data{ get; set; }
        //[DataMember]
        //public string headers { get; set; }
    }
    [DataContract]
    public class LoanRequestResponse
    {
        [DataMember]
        public string status { get; set; }
        [DataMember]
        public string message { get; set; }
        [DataMember]
        public string token { get; set; }
        [DataMember]
        public List<LOANSHARE_V_REQUEST> data { get; set; }
        [DataMember]
        public LOANSHARE_V_REQUEST saved_req { get; set; }

    }
    [DataContract]
    public class NewLoanResponse
    {
        [DataMember]
        public string status { get; set; }
        [DataMember]
        public string message { get; set; }

        [DataMember]
        public LOANSHARE_V_NEWLOAN data { get; set; }

    }
    [DataContract]
    public class LoanExistResponse
    {
        [DataMember]
        public string status { get; set; }
        [DataMember]
        public string message { get; set; }

        [DataMember]
        public List<LOANSHARE_V_EXIST> data { get; set; }

    }
    [DataContract]
    public class MemberResponse
    {
        [DataMember]
        public string status { get; set; }
        [DataMember]
        public string message { get; set; }
 
        [DataMember]
        public LOANSHARE_V_MEMBER data { get; set; }


    }
    [DataContract]
    public class CreateBatchResponse
    {
        [DataMember]
        public string status { get; set; }
        [DataMember]
        public string message { get; set; }
        [DataMember]
        public List<LOANSHARE_V_REQUEST> data { get; set; }
    }
    [DataContract]
    public class MakeRealResponse
    {
        [DataMember]
        public string status { get; set; }
        [DataMember]
        public string message { get; set; }
        [DataMember]
        public List<REQU_DETL_TEST> data { get; set; }

        [DataMember]
        public List<LOANSHARE_V_REQUEST> batch_data { get; set; }
    }
    #endregion
    #region LoanService2024

    [DataContract]
    public class login_contract
    {
        [DataMember] public string username { get; set; }
        [DataMember] public string password { get; set; }
    }

  
    #endregion LoanService2024
     

}