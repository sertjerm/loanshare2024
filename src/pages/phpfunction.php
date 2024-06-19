<?php
 //putenv("NLS_LANG=AMERICAN_AMERICA.TH8TISASCII");
 putenv ("NLS_LANG=AMERICAN_AMERICA.AL32UTF8");
require_once 'early_json.php';


$action = $_POST['func']; 
switch($action) { 
	case 'SearchMember' : 
		SearchMember();
		break; 
	case 'ReduceShare':
		ReduceShare();
		break;
	case 'getMinShare':
		getMinShare();
		break;
	case 'ShareHist':
		ShareHist();
		break;
	case 'InsureInfo':
		InsureInfo();
		break;
}	

function InsureInfo(){
	//$sql = " select * from v_insure_info order by memb_code";
	$sql="select memb_code,memb_prefix||memb_name || ' ' || memb_surn fullname ,memb_smamt
,nvl(buddy_smamt,0) buddy,nvl(fire_smamt,0) fire
from v_insure_info order by memb_code";
	returnJSON($sql);
}

function ShareHist(){
	$sql = " select
			TO_CHAR(memb_reqdte , 'd MON yyyy', 'NLS_CALENDAR=''THAI BUDDHA'' NLS_DATE_LANGUAGE=THAI') as memb_reqdte,
				   case
					 when memb_newshr > memb_oldshr then
					  'เพิ่มหุ้น'
					 else
					  'ลดหุ้น'
				   end action_desc,
				   memb_oldshr,
				   memb_newshr
			  from memb_chng t
			 where memb_code = '".$_POST['memberid']."' 
			  and to_char(memb_reqdte, 'yyyy') =
				 (select rule_year - 543 from rule_svco)
			 order by memb_reqdte";
			 returnJSON($sql);
}



function getMinShare(){
	$sql="select get_share_rate(".$_POST['salary'].") MinShar from dual";
	returnJSON($sql);
}

function ReduceShare(){

		$mid = $_POST['memberid'];

		$sql = "select a.memb_code,
			   a.memb_prefix,
			   a.memb_name,
			   a.memb_surn,
			   a.memb_prefix||a.memb_name||'  '||a.memb_surn fullname,
			   a.memb_numshr share_num, 
			   case when a.memb_stat='1' then 0 else a.memb_reqshr end memb_reqshr,
			   a.memb_salary,
			   a.memb_curshr * b.rule_sharper share_amount, 
			   nvl(c.sum_spshare,0) share_spc_amount,
			   a.memb_curshr * b.rule_sharper - nvl(c.sum_spshare,0) share_mnt_amount 
			   ,s. loan
				  from memb_detl a, rule_svco b, v_sum_spshare c
				   ,(select sum(cont_balamt) loan from cont_detl where cont_balamt>0 and cont_code='".$mid."') s
				 where a.memb_stat <= '1'
				   and a.memb_code = c.memb_code(+)
				   and a.memb_code = '".$mid."'
				 order by a.memb_code";

//echo "สมัย เสริฐเจิม";
	returnJSON($sql);


}

function returnJSON($sql){
	// putenv("NLS_LANG=THAI_THAILAND.TH8TISASCII");
	$connection = OCILogon("CTDLOAN", "CTDLOAN123", "KUSAVCO");
	$stmt = OCIParse($connection, $sql); 
	$result = OCIExecute($stmt); 
	$json = array();
	while($data = oci_fetch_array($stmt,OCI_ASSOC))
	//while($data = oci_fetch_all($statement, 0, -1, OCI_ASSOC + OCI_FETCHSTATEMENT_BY_ROW))
	{
			  $json[] = $data;
	}

	echo json_encode($json);
}


function SearchMember(){

	$sql ="select memb_code,fullname
			from coop_memberinfo ";

	$field=$_POST['field'];

	if($field =="memb_code"){
		$sql = $sql." where memb_code ='".$_POST['memb_code']."' ";
	}else{
		$name = $_POST['str'];
		$name = str_replace(" ","%",$name);
		$sql = $sql." where fullname like '%".$name."%' ";
	}
	$sql = $sql." order by memb_code asc";
	returnJSON($sql);
}


?>