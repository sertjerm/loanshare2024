โค้ดสร้างชุดข้อมูลโอนเงินกู้เหลือสุทธิหลังหลักให้การเงิน:

procedure TfrmIVRLoan.btnSaveTrfClick(Sender: TObject);
var
  i, cnt: Integer;
  sum: Double;
  trn_date: TDate;
  trf_time: String;

var
  batchID: String;
begin
  //
  if (frmBatchDlg.ShowModal = mrCancel) or (frmBatchDlg.cbBatchID.ItemIndex = 0) then
    Exit;

  batchID := frmBatchDlg.cbBatchID.Text;
  
  if MessageDlg('ต้องการโอนเงินเข้ารายการฝากพิเศษของระบบเงินฝากเดี๋ยวนี้ ใช่หรือไม่', mtWarning, [mbYes, mbNo], 0) = mrNo then Exit;

  trn_date := loanDate;// deDateBegin.Date;//frmDateDlg.edDate.Date;
  trf_time := FormatDateTime('hh:nn:ss',Time);
  //batch_time := RemoveStr(trf_time, ':');

  with qrSplDep do
  begin
    Close;
    Connection := DM.SQLConnection1;
    DataSet.Params[0].Value := FormatDateTime('dd/mm/yyyy',trn_date);
    Open;
  end;

  with qrIvrLnreq do
  begin
    DisableControls;
    pnProgress.Show; pnProgress.Update;
    ProgressBar1.Max := RecordCount;
    ProgressBar1.Position := 0;
    ProgressBar1.Show;
    i := 0;
    sum := 0;
    cnt := 0;
    First;
    while not eof do
    begin
      ProgressBar1.Position := RecNo;
      ProgressBar1.Update;

      if (qrIvrLnreqBATCH_ID.AsString = batchID) and (qrIvrLnreqREQU_STATUS.AsString = 'A') then
      begin

        if (qrIvrLnreqATM_ACNO.AsString <> '')
          and (copy(qrIvrLnreqATM_ACNO.AsString,5,2) <> '21')
          and (qrIvrLnreqREQU_SVTRF.AsString = 'N')
          //and (qrIvrLnreqMEMB_CODE.AsString = '010933')
          and (qrIvrLnreqNET_PAY.AsFloat > 0) then
        begin
          inc(i);
          qrSplDep.Append;
          qrSplDep.FieldValues['SV_SP_CODE'] := qrIvrLnreqMEMB_CODE.AsString;
          qrSplDep.FieldValues['SV_SP_TYPE'] := '840';
          qrSplDep.FieldValues['SV_SP_SEQ'] := i;
          qrSplDep.FieldValues['SV_SP_BRAN'] := copy(qrIvrLnreqATM_ACNO.AsString,1,3);
          qrSplDep.FieldValues['SV_SP_TYP'] := copy(qrIvrLnreqATM_ACNO.AsString,5,2);
          qrSplDep.FieldValues['SV_SP_NUM'] := copy(qrIvrLnreqATM_ACNO.AsString,8,7);
          qrSplDep.FieldValues['SV_SP_KEYDTE'] := trn_date;
          qrSplDep.FieldValues['SV_SP_DEPDTE'] := trn_date;
          qrSplDep.FieldValues['SV_SP_DEPAMT'] := qrIvrLnreqNET_PAY.AsFloat;
          sum := sum + qrIvrLnreqNET_PAY.AsFloat;
          qrSplDep.FieldValues['SV_SP_DEPSTS'] := '0';
          qrSplDep.FieldValues['USER_ID'] := user_id;
          qrSplDep.FieldValues['USER_UPSYST'] := trn_date;
          qrSplDep.FieldValues['USER_UPDATE'] := Date;
          qrSplDep.FieldValues['USER_UPTIME'] := trf_time;// FormatDateTime('hh:nn:ss',Time);
          qrSplDep.FieldValues['BATCH_ID'] := batchID;// '001' + batch_time;  //1=bk
          qrSplDep.Post;

          //--update requ data...


          Edit;
          FieldValues['REQU_SVTRF'] := 'Y';
          Post;


          //if qrIvrLnreqMEMB_CODE.AsString = '010933' then
            //ShowMessage(FloatToStr(qrIvrLnreqNET_PAY.AsFloat));

          inc(cnt);
          if i = 5 then i := 0;
        end;
      end; //if batch..
      Next;
    end;
    qrSplDep.ApplyUpdates(-1);
    ProgressBar1.Position := 0;
    ProgressBar1.Hide;
    pnProgress.Hide;
    MessageDlg('นำข้อมูลเข้า "รายการฝากพิเศษ" ของระบบเงินฝากแล้ว...'+#13+#10+
      'จำนวนทั้งสิ้น '+FormatFloat(',0',cnt)+' รายการ'+#13+#10+
      'จำนวนเงินทั้งสิ้น '+FormatFloat(',0.00',sum)+' บาท'+#13+#10+#13+#10+
      'Batch ID: '+'001'+batch_time, mtInformation, [mbOK], 0);
    EnableControls;
  end;
end;


@พ่อพี่ทีฟา น้องทีฟอง @-M4_P🐯  
โค้ดสร้างคำขอฉุกเฉิน:

procedure TfrmIVRLoan.btnGenReqNoClick(Sender: TObject);
  //อัพเดตเลขคำขอล่าสุดให้ตาราง Rule_Loan
  procedure UpdateRuleLoan(r_no: Integer);
  begin
    with DM.qrRuleLoan do
    begin
      if Locate('LOAN_TYPE', '01', []) then
      begin
        Edit;
        FieldValues['LOAN_REQNO'] := r_no;
        Post;
        ApplyUpdates(-1);
      end;
    end;
  end;
var
  i, req_no: Integer;
  n1, n2, n3: Double; //งวดฉุกเฉินทั้ง 3 งวด
  cur_year: String;
var
  batchID: String;
begin
  //
  if (frmBatchDlg.ShowModal = mrCancel) or (frmBatchDlg.cbBatchID.ItemIndex = 0) then
    Exit;

  batchID := frmBatchDlg.cbBatchID.Text;


  { prepare var. }
  with DM.qrGlobal do
  begin
    Close;
    Connection := DM.SQLConnection1;
    DataSet.CommandText := 'SELECT B.RULE_YEAR, MAX(A.REQU_NO)' + #13#10 +
      '  FROM REQU_DETL A, RULE_SVCO B' + #13#10 +
      ' WHERE A.REQU_YEAR = B.RULE_YEAR' + #13#10 +
      '   AND A.REQU_TYPE = ''01'' GROUP BY B.RULE_YEAR';
    Open;
    cur_year := Fields[0].AsString;

    If Not Fields[1].IsNull Then
      req_no := Fields[1].AsInteger + 1
    else
      req_no := 1;

    if cur_year = '' then
    begin
      Close;
      //Connection := DM.SQLConnection1;
      DataSet.CommandText := 'SELECT RULE_YEAR FROM CTDLOAN.RULE_SVCO';
      Open;
      cur_year := Fields[0].AsString;
      req_no := 1;
    end;


  end;
  pnProgress.Show; pnProgress.Update;
  ProgressBar1.Max := qrIvrLnreq.RecordCount;
  ProgressBar1.Position := 0;
  ProgressBar1.Visible := true;

  qrIvrLnreq.First;
  qrIvrLnreq.DisableControls;
  while not qrIvrLnreq.Eof do
  begin
    ProgressBar1.Position := ProgressBar1.Position + 1;
    ProgressBar1.Update;

    if (qrIvrLnreqBATCH_ID.AsString = batchID) then
    begin

      if (qrIvrLnreqREQU_STATUS.AsString = 'A') and (qrIvrLnreqREQU_NO.AsInteger = 0) then
      begin
        { prepare var.. }
        GenLoanPrc(qrIvrLnreqREQU_AMT.AsFloat,n1,n2,n3,qrIvrLnreqCONT_NUMS.AsInteger);
        { post var }
        with qrReqDetl do
        begin
          try
            Close;
            DataSet.CommandText := 'SELECT * FROM REQU_DETL T' + #13#10 +
              ' WHERE T.REQU_YEAR   = (SELECT RULE_YEAR FROM RULE_SVCO)' + #13#10 +
              '   AND T.REQU_TYPE   = ''01''' + #13#10 +
              '   AND T.REQU_CODE   = ' + QuotedStr(qrIvrLnreq.FieldValues['MEMB_CODE']) + #13#10 +
              '   AND T.REQU_REQDTE = ' + QuotedStr(FormatDateTime('dd/mm/yyyy', loanDate)); //deDateBegin.date));
            open;

            Append;
            FieldValues['REQU_YEAR'] := cur_year;
            FieldValues['REQU_TYPE'] := '01';
            FieldValues['REQU_NO']   := req_no;
            FieldValues['REQU_CODE'] := qrIvrLnreq.FieldValues['MEMB_CODE'];
            FieldValues['REQU_BRAN'] := '001';  //bk
            FieldValues['REQU_REAS'] := '01';
            FieldValues['REQU_REQAMT'] := qrIvrLnreq.FieldValues['REQU_AMT'];
            FieldValues['REQU_PAYMET'] := '2'; 
            FieldValues['REQU_INTMET'] := '1'; //CbIntMet.Text;
            FieldValues['REQU_INSNUM'] := qrIvrLnreq.FieldValues['CONT_NUMS']; //CrPayIns.AsInteger;
            FieldValues['REQU_INSAMT'] := n1; //CrPayAmt.Value;
            FieldValues['REQU_INSLST'] := n3; //CrLstAmt.Value;
            FieldValues['REQU_REQDTE'] := loanDate; //deDateBegin.Date;
            FieldValues['REQU_RCVMET'] := '1';
            FieldValues['REQU_ACBRAN'] := copy(DelHyphen(qrIvrLnreqATM_ACNO.AsString),1,3);
            FieldValues['REQU_ACTYP']  := copy(DelHyphen(qrIvrLnreqATM_ACNO.AsString),4,2);
            FieldValues['REQU_ACNO']   := copy(DelHyphen(qrIvrLnreqATM_ACNO.AsString),6,7);
            FieldValues['REQU_STATUS'] := '2';  //ap...
            FieldValues['REQU_APVDTE'] := loanDate; //deDateBegin.Date;
            FieldValues['REQU_APVAMT'] := qrIvrLnreq.FieldValues['REQU_AMT'];
            FieldValues['REQU_REQTYPE'] := '0';
            FieldValues['USER_ID']     := user_id;
            FieldValues['USER_UPSYST'] := loanDate;// deDateBegin.Date;
            FieldValues['USER_UPDATE'] := DATE;
            FieldValues['USER_UPTIME'] := FormatDateTime('hh:nn:ss',Time);
            Post;
            ApplyUpdates(-1);
          except
            //
          end;
        end;
        
    
        //------------------------------------------------------------------------
        { update cur_reqno }
        qrIvrLnreq.Edit;
        qrIvrLnreq.FieldValues['REQU_YEAR'] := cur_year;
        qrIvrLnreq.FieldValues['REQU_NO'] := req_no;
        qrIvrLnreq.Post;
        UpdateRuleLoan(req_no);

        //update requ data ....
        qrIvrLnreq.Edit;
        qrIvrLnreqREQU_YEAR.Value := cur_year;
        qrIvrLnreqREQU_NO.Value := req_no;
        qrIvrLnreq.Post;
        inc(req_no);
      end;  //if ...
    end; //if batch
    qrIvrLnreq.next;
  end;
  qrIvrLnreq.EnableControls;
  MessageDlg('สร้างคำขอเสร็จสิ้น...', mtInformation, [mbOK], 0);
  ProgressBar1.Visible := False;
  pnProgress.Hide;

end;