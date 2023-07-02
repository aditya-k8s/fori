<?php 
 $dbhost = 'localhost';
 $dbuser = 'root';
 $dbpass = 'DbL0G!nSeCuRE!!!!#';
 $dbname = 'kerrymlm';  
 $conn = mysqli_connect($dbhost, $dbuser, $dbpass,$dbname); 
 //$conn = mysqli_connect($dbhost, $dbuser, $dbpass);
mysqli_set_charset($conn,"utf8");
 mysqli_query( $conn, 'SET NAMES "utf8" COLLATE "utf8_general_ci"' );
  if(! $conn ){
    die('Could not connect: ' . mysqli_error());
  }
  if (isset($_GET['userID']) && !empty($_GET['userID'])) {
          echo json_encode( getLevel($_GET['userID'], 0));
  }
  if (isset($_GET['user_id']) && !empty($_GET['user_id'])) {
          echo json_encode( simplearray($_GET['user_id'], 0));

  }
  if (isset($_GET['queryString']) && !empty($_GET['queryString']) && isset($_GET['loginUserID']) && !empty($_GET['loginUserID'])) {
          echo json_encode( searchUser($_GET['queryString'],$_GET['loginUserID']));
  }
  if (isset($_GET['sponsor_id']) && !empty($_GET['sponsor_id'])) {
          $res=  getIndirectUser($_GET['sponsor_id'], 0);
          $user=0;
          foreach ($res as $key => $value) {
            //print_r($value);
            if(is_array($value)){
                foreach ($value as $level1key => $level1) {
                  
                  if(is_array($level1)){
                     $user+= $level1['user'];
                     //print_r($level1);
                     foreach ($level1 as $level1key => $level2) {
                  
                        if(is_array($level2)){
                           $user+= $level2['user'];
                           //print_r($level1);
                            foreach ($level2 as $level1key => $level3) {
                  
                              if(is_array($level3)){
                                 $user+= $level3['user'];
                                 //print_r($level1);
                                foreach ($level3 as $level1key => $level4) {
                  
                                  if(is_array($level4)){
                                    $user+= $level4['user'];
                                   //print_r($level1);
                                    foreach ($level4 as $level1key => $level5) {
                
                                      if(is_array($level5)){
                                         $user+= $level5['user'];
                                         //print_r($level1);
                                        foreach ($level5 as $level1key => $level6) {
                
                                          if(is_array($level6)){
                                             $user+= $level6['user'];
                                             //print_r($level1);
                                          }
                                        }

                                      }
                                    }
                                  }
                                }
                              }
                            }
                        }
                      }
                  }
                }
            }
          }
          echo $user;
  }

  if (isset($_GET['myID']) && !empty($_GET['myID'])) {
              $myArr=array();

            $res = getMyLevelUser($_GET['myID'],0 );
            $Arr=array();
            //print_r($res);
            foreach ($res as $key => $level1) {
              $totalUsers1++;
             // $level1['level'] = 1;
              $myArr[0]= $level1;
              if(!empty($level1['user'])){
                foreach ($level1['user'] as $key => $level2) {
                 // $level2['level'] =2;
                  $myArr[1]= $level2;
                  if(!empty($level2['user'])){
                    foreach ($level2['user'] as $key => $level3) {
                      //$level3['level'] = 3;
                      $myArr[2]= $level3;
                    }
                  }
                }
              }
            }   
      echo json_encode($myArr);       
            //print_r($myArr);
  }          

  function getlevelList($userID = 78,$level=2){
    $level=$level+1;
    $children = array();
   if($userID) { 
      $dbhost = 'localhost';
      $dbuser = 'root';
 $dbpass = 'DbL0G!nSeCuRE!!!!#';
      $dbname = 'kerrymlm'; 
      $conn = mysqli_connect($dbhost, $dbuser, $dbpass,$dbname);
      mysqli_set_charset($conn,"utf8");
      mysqli_query( $conn, 'SET NAMES "utf8" COLLATE "utf8_general_ci"');
      
      $q= "Select IF(sp_users.user_id IS NULL,0,".$level.") as level, sp_users.username, sp_users.user_id, sp_users.sponsor_id from  sp_users where  sp_users.user_id = '".$userID."'  and sp_users.isPay='1'  ORDER by crdate desc";

      $results = mysqli_query($conn,$q);
      $k=0;

      while ($rows = mysqli_fetch_assoc($results))
      {    
          $children[]=$rows;
          $k++;
      }
    }
     return $children;
 }
function getMyLevelUser($user_id = false,$level=1)
{   
  if($user_id) { 
    $childrens = array();
    $users = getlevelList($user_id, $level);
    
   // print_r($users);
    //$totalUser=count($users); 
    if($users)
    { 
     $childrens=$users;
      foreach($users as $s => $v)
      {     
        if($v['user_id']  && $v['level']<3){
          

            $re =checkLeftRightedge($v['sponsor_id']);
            //print_r($re);
            if (count($re)>0 && $re[0]['parent_id']!=false) {
              //echo "--string==".$user_id;
              $affData= array();
              $affData['user_id']=$re[0]['parent_id'];
              $affData['left']=$user_id;
              $affData['right']="";
              $affData['matrix']=1;
              //print_r($affData);
              addAffilaite($affData);
            }else{
              $spon_user_id = $re[0]['user_id'];
              $left = $re[0]['left'];
              $right = $re[0]['right'];
              $affupData= array();
              $affupData['left']="";
              $affupData['right']="";
              if ($left!='') {
                $affupData['left']= $left;
                $affupData['right']= $user_id;
                $affupData['status']= '1';
              }else{
                $affupData['left']= $user_id;
                $affupData['status']= '0';
              }
              
              updateAffilaite($spon_user_id,$affupData);
              //print_r($re);
            }
            $getSuperparent=getSuperparent($v['user_id'],0);
           // echo "getSuperparent=".$getSuperparent;
            $downlineUser= downlineUser($getSuperparent,$level=0);
           // echo "downlineUser=".$downlineUser;
            if ($downlineUser==14) {

                $re =rebuyloc($getSuperparent);
               // print_r($re);

                //echo "rebuyloc=".count($downlineUser);
                foreach($re as $k => $vv){
                  if ($vv['status']==1) {
                    $left= $vv['left'];
                    $right=$vv['right'];
                    $leftres=checkLeftRightedge1($left);
                    //print_r($leftres);
                    //echo "leftres".count($leftres);
                    $rightres=checkLeftRightedge1($right);
                    if (count($leftres)==0 ) {
                      $affupData= array();
                      $affupData['left']=$getSuperparent;
                      $affupData['right']="";
                      $affupData['status']= '0';
                      $affupData['user_id']= $vv['left'];
                      $affupData['matrix']=2;
                      addAffilaite($affupData);
                       break;
                    }elseif (count($leftres)>0 && $leftres[0]['isAvbl']==false && count($rightres)==0) {
                      $affupData= array();
                      $affupData['left']=$getSuperparent;
                      $affupData['right']="";
                      $affupData['status']= '0';
                      $affupData['user_id']= $vv['right'];
                      $affupData['matrix']=3;
                      addAffilaite($affupData);
                       break;
                    }else{
                    if (count($leftres)>0 && $leftres[0]['isAvbl']==true) {
                      //echo "string01Left";
                      $leftUser1= $leftres[0]['left'];
                      $spon_user_id = $leftres[0]['user_id'];

                      $affupData= array();
                      $affupData['left']=$leftUser1;
                      $affupData['right']="";
                      if ($leftUser1!='') {
                        $affupData['right']= $getSuperparent;
                        $affupData['status']= '1';
                      }
                      updateAffilaite($spon_user_id,$affupData);
                       break;
                    }elseif (count($rightres)>0 && $rightres[0]['isAvbl']==true) {
                      //echo "string01Right";
                      $leftUser1= $rightres[0]['left'];
                      $spon_user_id = $rightres[0]['user_id'];

                      $affupData= array();
                      $affupData['left']=$leftUser1;
                      $affupData['right']="";
                      if ($leftUser1!='') {
                        $affupData['right']= $getSuperparent;
                        $affupData['status']= '1';
                      }
                      updateAffilaite($spon_user_id,$affupData);
                       break;
                    }
                  }
                    
                  }
                }
                 bonusDistribution($getSuperparent);
            }
           // $childrens[$s]['user']= getMyLevelUser($v['user_id'],$v['level']);

        }
      } 
      return $childrens;
    }
  }else { 
    return false;
  } 
}
function rebuyloc($userID=''){
  if($userID) { 
      $dbhost = 'localhost';
      $dbuser = 'root';
 $dbpass = 'DbL0G!nSeCuRE!!!!#';
      $dbname = 'kerrymlm'; 
      $conn = mysqli_connect($dbhost, $dbuser, $dbpass,$dbname);  
      $q="Select * from  sp_affiliates where  sp_affiliates.user_id = '".$userID."' ORDER by crdate desc limit 1";
      $results = mysqli_query($conn,$q);
      $k=0;
      while ($rows = mysqli_fetch_assoc($results))
      {    
           if ($rows['status']==1) {
              $left= $rows['left'];
              $right=$rows['right'];
              $leftres=checkLeftRightedge1($left);
              $rightres=checkLeftRightedge1($right);

              if (count($leftres)>0 && count($rightres)>0) {
                
                $leftUser1= $leftres[0]['left'];
                $rightUser1 = $leftres[0]['right'];

                $leftUser2 = $rightres[0]['left'];
                $rightUser2 = $rightres[0]['right'];

                $leftresLeft=checkLeftRightedge1($leftUser1);
                $leftresRight=checkLeftRightedge1($rightUser1);
                $rightresLeft=checkLeftRightedge1($leftUser2);
                $rightresRight=checkLeftRightedge1($rightUser2);

                if (count($leftresLeft)>0 && $leftresLeft[0]['isAvbl']==false) {
                   $children[]=$leftresLeft[0];
                }
                if (count($leftresRight)>0 && $leftresRight[0]['isAvbl']==false) {
                  $children[]=$leftresRight[0];
                }
                if (count($rightresLeft)>0 && $rightresLeft[0]['isAvbl']==false) {
                  $children[]=$rightresLeft[0];
                }
                if (count($rightresRight)>0 && $rightresRight[0]['isAvbl']==false) {
                  $children[]=$rightresRight[0];
                }
              }
            }
          
         $k++;
      }
    }
    
    return $children;
}

function checkLeftRightedge($userID='')
{
 
  if($userID) { 
      $dbhost = 'localhost';
      $dbuser = 'root';
 $dbpass = 'DbL0G!nSeCuRE!!!!#';
      $dbname = 'kerrymlm'; 
      $conn = mysqli_connect($dbhost, $dbuser, $dbpass,$dbname);
      mysqli_set_charset($conn,"utf8");
      mysqli_query( $conn, 'SET NAMES "utf8" COLLATE "utf8_general_ci"');
  
      $q="Select * from  sp_affiliates where  sp_affiliates.user_id = '".$userID."' ORDER by crdate desc limit 1";
      $results = mysqli_query($conn,$q);
      $k=0;
      while ($rows = mysqli_fetch_assoc($results))
      {    
           
          if ($rows['status']==1) {
              //print_r($rows);
              $left= $rows['left'];
              $right=$rows['right'];
              $leftres=checkLeftRightedge1($left);
              //print_r($leftres);
              $rightres=checkLeftRightedge1($right);
              //print_r($rightres);
              //print_r(count($rightres));
              //echo "string".count($rightres);
              if (count($leftres)>0 && $leftres[0]['isAvbl']==true) {
                $children[]=$leftres[0];
              }elseif (count($rightres)>0 && $rightres[0]['isAvbl']==true) {
                $children[]=$rightres[0];
              }elseif (count($rightres)==0 && count($leftres)>0) {
                $children[]['parent_id']=$right;
              }elseif (count($leftres)==0 && count($rightres)==0) {
                $children[]['parent_id']=$left;
              }else{
                $leftUser1= $leftres[0]['left'];
                $rightUser1 = $leftres[0]['right'];

                $leftUser2 = $rightres[0]['left'];
                $rightUser2 = $rightres[0]['right'];

                $leftresLeft=checkLeftRightedge1($leftUser1);
                $leftresRight=checkLeftRightedge1($rightUser1);
                $rightresLeft=checkLeftRightedge1($leftUser2);
                $rightresRight=checkLeftRightedge1($rightUser2);
                //print_r($leftresLeft);
                //print_r($leftresRight);
                //print_r($rightresLeft);
                //print_r($leftresLeft);
                if (count($leftresLeft)>0 && $leftresLeft[0]['isAvbl']==true) {
                   $children[]=$leftresLeft[0];
                    //echo "leftresLeft- ".$leftresLeft;
                }elseif(count($leftresLeft)==0){
                    $children[]['parent_id']=$leftUser1;
                    //echo "leftUser1- ".$leftUser1;
                }elseif (count($leftresRight)>0 && $leftresRight[0]['isAvbl']==true) {
                  $children[]=$leftresRight[0];
                  //echo "rightUser1- ".$leftresRight[0];
                }elseif(count($leftresRight)==0){
                    $children[]['parent_id']=$rightUser1;
                    //echo "rightUser1-parent_id ".$rightUser1;
                }elseif (count($rightresLeft)>0 && $rightresLeft[0]['isAvbl']==true) {
                  $children[]=$rightresLeft[0];
                }elseif(count($rightresLeft)==0){
                    $children[]['parent_id']=$leftUser2;
                }elseif (count($rightresRight)>0 && $rightresRight[0]['isAvbl']==true) {
                  $children[]=$rightresRight[0];
                }elseif(count($rightresRight)==0){
                    $children[]['parent_id']=$rightUser2;
                }else{
                  $res = getDownlineUser($userID);
                  //print_r($res);
                  if (count($res)>0) {
                    $status= $res[0]['status'];
                    $user_id= $res[0]['user_id'];
                    if ($status==1) {
                      $children[]['parent_id']=$userID;
                    }else{
                      $children[]['parent_id']=$userID;
                    }
                     //echo "userID- ".$userID;
                  }else{
                    //echo "LEft- ".$left;
                    $children[]['parent_id']=$left;
                  }
                  
                }
              }
            }elseif ($rows['status']==0) {
              $rows['parent_id']=false;
              $children[]=$rows;
            } 
          $k++;
      }
    }
    if (count($children)<=0) {
      $children[]['parent_id']=$userID;
    }
     return $children;
}

function checkLeftRightedge1($userID='')
{
  if($userID) { 
      $dbhost = 'localhost';
      $dbuser = 'root';
 $dbpass = 'DbL0G!nSeCuRE!!!!#';
      $dbname = 'kerrymlm'; 
      $conn = mysqli_connect($dbhost, $dbuser, $dbpass,$dbname);
      mysqli_set_charset($conn,"utf8");
      mysqli_query( $conn, 'SET NAMES "utf8" COLLATE "utf8_general_ci"');
  
     $q="Select * from  sp_affiliates where  sp_affiliates.user_id = '".$userID."' ORDER by crdate desc limit 1";
      $results = mysqli_query($conn,$q);
      $k=0;
      while ($rows = mysqli_fetch_assoc($results))
      {    
          
          if($rows['status']==1) {
            $rows['isAvbl']=false;
            $rows['parent_id']=false;
          }elseif ($rows['status']==0) {
            $rows['isAvbl']=true;
            $rows['parent_id']=false;
          }
          $children[]=$rows;
         // print_r($rows);
          $k++;
      }
    }
    return $children;
}
function getSuperparent($userID='',$level=0)
{
  $children=$userID ;
  if($userID) { 
      $dbhost = 'localhost';
      $dbuser = 'root';
 $dbpass = 'DbL0G!nSeCuRE!!!!#';
      $dbname = 'kerrymlm'; 
      $conn = mysqli_connect($dbhost, $dbuser, $dbpass,$dbname);
      mysqli_set_charset($conn,"utf8");
      mysqli_query( $conn, 'SET NAMES "utf8" COLLATE "utf8_general_ci"');
      $q="Select * from  sp_affiliates where  (sp_affiliates.left = '".$userID."' or sp_affiliates.right = '".$userID."')  ORDER by crdate desc limit 1";
      $results = mysqli_query($conn,$q);
      $y=0;
      while ($rows = mysqli_fetch_assoc($results))
      {    
         //echo $rows['user_id']."--y=".$level;
         //$children= $rows['user_id'];
          if ($level<3) {
            $children=getSuperparent($rows['user_id'],$level+1);
          }
          
         // $children=$userID;
      }
    }
    return $children;
}
function downlineUser($userID='',$level=0)
{ 
  $children=0;
  if($userID) { 
      $dbhost = 'localhost';
      $dbuser = 'root';
 $dbpass = 'DbL0G!nSeCuRE!!!!#';
      $dbname = 'kerrymlm'; 
      $conn = mysqli_connect($dbhost, $dbuser, $dbpass,$dbname);
      mysqli_set_charset($conn,"utf8");
      mysqli_query( $conn, 'SET NAMES "utf8" COLLATE "utf8_general_ci"');
      $q="Select * from  sp_affiliates where  user_id='".$userID."' ORDER by crdate desc limit 1";
      $results = mysqli_query($conn,$q);
      while ($rows = mysqli_fetch_assoc($results))
      {    
          $userID= $rows['user_id'];
          // if ($level<3) {
          //   getSuperparent($userID,$level+1);
          // }
          if ($rows['status']==1) {
               $children+=2;
              $left= $rows['left'];
              $right=$rows['right'];
              $leftres=checkLeftRightedge1($left);
              $rightres=checkLeftRightedge1($right);
              if (count($leftres)>0) {
                if ($leftres[0]['status']==1) {
                  $children+=2;
                }elseif ($leftres[0]['status']==0) {
                  $children+=1;
                }
              }
              if (count($rightres)>0) {
                if ($rightres[0]['status']==1) {
                  $children+=2;
                }elseif ($rightres[0]['status']==0) {
                  $children+=1;
                }
              }
              if (count($rightres)>0 || count($leftres)>0) {
                $leftUser1= $leftres[0]['left'];
                $rightUser1 = $leftres[0]['right'];

                $leftUser2 = $rightres[0]['left'];
                $rightUser2 = $rightres[0]['right'];

                $leftresLeft=checkLeftRightedge1($leftUser1);
                $leftresRight=checkLeftRightedge1($rightUser1);
                $rightresLeft=checkLeftRightedge1($leftUser2);
                $rightresRight=checkLeftRightedge1($rightUser2);
                if (count($leftresLeft)>0) {
                  if ($leftresLeft[0]['status']==1) {
                    $children+=2;
                  }elseif ($leftresLeft[0]['status']==0) {
                    $children+=1;
                  }
                }
                if (count($leftresRight)>0) {
                  if ($leftresRight[0]['status']==1) {
                     $children+=2;
                  }elseif ($leftresRight[0]['status']==0) {
                    $children+=1;
                  }
                }
                if (count($rightresLeft)>0) {
                  if ($rightresLeft[0]['status']==1) {
                    $children+=2;
                  }elseif ($rightresLeft[0]['status']==0) {
                    $children+=1;
                  }
                }
                if (count($rightresRight)>0) {
                  if ($rightresRight[0]['status']==1) {
                    $children+=2;
                  }elseif ($rightresRight[0]['status']==0) {
                    $children+=1;
                  }
                }
              }
            }elseif ($rows['status']==0) {
              $children+=1;
            } 
          
          
      }
    }
    return $children;
}
function getDownlineUser($userID='')
{
  if($userID) { 
      $dbhost = 'localhost';
      $dbuser = 'root';
 $dbpass = 'DbL0G!nSeCuRE!!!!#';
      $dbname = 'kerrymlm'; 
      $conn = mysqli_connect($dbhost, $dbuser, $dbpass,$dbname);
      mysqli_set_charset($conn,"utf8");
      mysqli_query( $conn, 'SET NAMES "utf8" COLLATE "utf8_general_ci"');
      $q="Select COALESCE((Select id from  sp_affiliates where  user_id='".$userID."' ORDER by crdate desc limit 1),0) as lastAffID, sp_affiliates.* from  sp_affiliates where  (sp_affiliates.left = '".$userID."' or sp_affiliates.right = '".$userID."') ORDER by crdate desc limit 1";
      $results = mysqli_query($conn,$q);
      while ($rows = mysqli_fetch_assoc($results))
      {    
         if ($rows['lastAffID']<$rows['id']) {
           $children[]=$rows;
         }
         
      }
    }
    return $children;
}
function addAffilaite($arg)
{
  if($arg) { 
      $dbhost = 'localhost';
      $dbuser = 'root';
 $dbpass = 'DbL0G!nSeCuRE!!!!#';
      $dbname = 'kerrymlm'; 
      $conn = mysqli_connect($dbhost, $dbuser, $dbpass,$dbname);
      mysqli_set_charset($conn,"utf8");
      mysqli_query( $conn, 'SET NAMES "utf8" COLLATE "utf8_general_ci"');
      $q= "INSERT INTO `sp_affiliates`(`user_id`, `left`, `right`,`matrix`) VALUES ('".$arg['user_id']."','".$arg['left']."','".$arg['right']."',".$arg['matrix'].")";
      $results = mysqli_query($conn,$q);
     
    }
}
function updateAffilaite($parent_id,$updateData)
{
  if($parent_id) { 
      $dbhost = 'localhost';
      $dbuser = 'root';
 $dbpass = 'DbL0G!nSeCuRE!!!!#';
      $dbname = 'kerrymlm'; 
      $conn = mysqli_connect($dbhost, $dbuser, $dbpass,$dbname);
      mysqli_set_charset($conn,"utf8");
      mysqli_query( $conn, 'SET NAMES "utf8" COLLATE "utf8_general_ci"');
      //print_r($updateData);

      $q= "update `sp_affiliates` set `left`='".$updateData['left']."', `right`='".$updateData['right']."',status='".$updateData['status']."' where user_id='".$parent_id."' ORDER by crdate desc limit 1";
      $results = mysqli_query($conn,$q);
     
    }
}

function bonusDistribution($user_id)
{
  if($user_id) { 
      $dbhost = 'localhost';
      $dbuser = 'root';
 $dbpass = 'DbL0G!nSeCuRE!!!!#';
      $dbname = 'kerrymlm'; 
      $conn = mysqli_connect($dbhost, $dbuser, $dbpass,$dbname);
      mysqli_set_charset($conn,"utf8");
      mysqli_query( $conn, 'SET NAMES "utf8" COLLATE "utf8_general_ci"');
      $q= "INSERT INTO `sp_profit_distribution`(`user_id`, `user_profit`, `reinvest`,`company_admin`, `server`, `charity`, `herbal`) VALUES ('".$user_id."',500,100,200,100,400,100)";
      $results = mysqli_query($conn,$q);
     
    }
}
 //echo 'Connected successfully';
 //mysqli_close($conn);
  function getSingleUser($userID = 78){
    $children = array();
   if($userID) { 
      $dbhost = 'localhost';
      $dbuser = 'root';
 $dbpass = 'DbL0G!nSeCuRE!!!!#';
      $dbname = 'kerrymlm';
      $conn = mysqli_connect($dbhost, $dbuser, $dbpass,$dbname);
      mysqli_set_charset($conn,"utf8");
      mysqli_query( $conn, 'SET NAMES "utf8" COLLATE "utf8_general_ci"' );
        $results = mysqli_query($conn,"Select date(u.crdate) as crdate, u.user_id as id, u.profile_pic as img, u.username as name,u.email,u.first_name,u.last_name,u.sponsor_id as pid from sp_users as u where u.user_id = '".$userID."'   limit 1" );
      
    //  $row = mysqli_fetch_array($result);
     //  print_r($row);
      $k=0;
      while ($rows = mysqli_fetch_assoc($results))
      {
            // $var = str_repeat(' ',$level).$row['id']."\n";
            //print_r($rows);
                     //echo $var  after remove comment check tree
            //$row["unilevel"]=getChildList($row['id'],$level);
                     // i call function in while loop until count all user_id 
            $children[]=$rows;
           // $level++;
            //$children[$k]['children'] = get_user_children($v['id'],$level);
            $k++;
            
           //  $count += 1+$this->display_children($row['id'], $level+1);

      }
     }
    
     return $children;
 }
 function getLastLevel($userID = 78){
    $childrens = array();
   if($userID) { 
		$dbhost = 'localhost';
		$dbuser = 'root';
		$dbpass = 'DbL0G!nSeCuRE!!!!#';
		$dbname = 'kerrymlm';
      $conn = mysqli_connect($dbhost, $dbuser, $dbpass,$dbname);
      mysqli_set_charset($conn,"utf8");
      mysqli_query( $conn, 'SET NAMES "utf8" COLLATE "utf8_general_ci"' );
      $results = mysqli_query($conn,"Select f.id,f.user_id from sp_affiliates as f where (f.left='".$userID."' or f.right='".$userID."') and f.matrix>1 order by f.id DESC limit 1" );
      
    
    	while ($rows = mysqli_fetch_assoc($results))
    	{
         
         	$childrens[]=$rows;
      	}
    }
    
    return $childrens;
 }
 function getChildList($userID = 78,$level=2,$fid=1){
  	//echo "string".$level."---".$userID."-->".$fid.'==>';
  	$children = array();
   	if($userID) { 
		$dbhost = 'localhost';
		$dbuser = 'root';
		$dbpass = 'DbL0G!nSeCuRE!!!!#';
		$dbname = 'kerrymlm';
		$conn = mysqli_connect($dbhost, $dbuser, $dbpass,$dbname);
		if($level==1){
       
             $results = mysqli_query($conn,"Select   u.user_id,f.`id` as fid,f.`status`, f.`matrix`,  (SELECT IF(sp_affiliates.left='','0%', IF(sp_affiliates.right!='','100%','50%')) as levels FROM `sp_affiliates`  WHERE sp_affiliates.user_id=u.user_id order by sp_affiliates.id LIMIT 1) as per, (SELECT s.username  FROM sp_users s WHERE s.user_id=u.sponsor_id LIMIT 1) as sponsor_name,(SELECT f.left FROM sp_affiliates f WHERE f.user_id=u.user_id order by f.id ASC LIMIT 1) as leftside,(SELECT f.right FROM sp_affiliates f WHERE f.user_id=u.user_id order by f.id ASC LIMIT 1) as rightside, IF(u.user_id IS NULL,0,1) as level, f.left,f.right, date(u.crdate) as crdate, u.user_id as id, IF(u.profile_pic IS NULL,'https://app.cbdn2020.com/assets/images/default.png',profile_pic) as img, u.username as name,u.email,u.first_name,u.last_name, IF(u.sponsor_id IS NULL,NULL,NULL)as pid,u.sponsor_id from sp_affiliates as f ,sp_users as u where f.user_id=u.user_id and u.user_id = '".$userID."'  order by u.user_id ASC  limit 1");
      /*}elseif($level==5){
          //echo "string".$level."-".$userID;

          $results = mysqli_query($conn,"Select f.`status`, f.`matrix`,(SELECT IF(sp_affiliates.left='','0%', IF(sp_affiliates.right!='','100%','50%')) as levels FROM `sp_affiliates`  WHERE sp_affiliates.user_id=u.user_id order by sp_affiliates.id LIMIT 1) as per, (SELECT s.username  FROM sp_users s WHERE s.user_id=u.sponsor_id LIMIT 1) as sponsor_name,(SELECT f.left FROM sp_affiliates f WHERE f.user_id=u.user_id order by f.id DESC LIMIT 1) as leftside,(SELECT f.right FROM sp_affiliates f WHERE f.user_id=u.user_id order by f.id DESC LIMIT 1) as rightside, IF(u.user_id IS NULL,0,".$level.") as level, f.left,f.right, date(u.crdate) as crdate,   IF((SELECT  ff.id FROM sp_affiliates ff WHERE ff.user_id=u.user_id order by ff.id DESC LIMIT 1) IS NULL,u.user_id,(SELECT  ff.id FROM sp_affiliates ff WHERE ff.user_id=u.user_id order by ff.id DESC LIMIT 1)) as id, IF(u.profile_pic IS NULL,'https://app.cbdn2020.com/profile.png',profile_pic) as img, IF(u.username IS NULL,0,u.username)  as name,u.email,u.first_name,u.last_name,(SELECT f.user_id FROM sp_affiliates f WHERE (f.right=u.user_id or f.left=u.user_id) order by f.id DESC LIMIT 1)  as pid,f.id as sponsor_id from sp_affiliates as f ,sp_users as u where (f.left=u.user_id or f.right=u.user_id) and u.user_id = '".$userID."' order by f.id DESC  limit 1");
      	}elseif($level>5 && $level==6){
          //echo "string".$level."-".$userID;
          $results = mysqli_query($conn,"Select f.`status`, f.`matrix`, (SELECT IF(sp_affiliates.left='','0%', IF(sp_affiliates.right!='','100%','50%')) as levels FROM `sp_affiliates`  WHERE sp_affiliates.user_id=u.user_id order by sp_affiliates.id LIMIT 1) as per, (SELECT s.username  FROM sp_users s WHERE s.user_id=u.sponsor_id LIMIT 1) as sponsor_name,(SELECT f.left FROM sp_affiliates f WHERE f.user_id=u.user_id order by f.id DESC LIMIT 1) as leftside,(SELECT f.right FROM sp_affiliates f WHERE f.user_id=u.user_id order by f.id DESC LIMIT 1) as rightside, IF(u.user_id IS NULL,0,".$level.") as level, f.left,f.right, date(u.crdate) as crdate, u.user_id as id, IF(u.profile_pic IS NULL,'https://app.cbdn2020.com/profile.png',profile_pic) as img, IF(u.username IS NULL,0,u.username)  as name,u.email,u.first_name,u.last_name,(SELECT f.id FROM sp_affiliates f WHERE (f.right=u.user_id or f.left=u.user_id) order by f.id DESC LIMIT 1)  as pid,f.id as sponsor_id from sp_affiliates as f ,sp_users as u where (f.left=u.user_id or f.right=u.user_id) and u.user_id = '".$userID."' order by f.id DESC  limit 1");
      }elseif($leve>6 && $level==7){
          //echo "string".$level."-".$userID;
          $results = mysqli_query($conn,"Select f.`status`, f.`matrix`,(SELECT IF(sp_affiliates.left='','0%', IF(sp_affiliates.right!='','100%','50%')) as levels FROM `sp_affiliates`  WHERE sp_affiliates.user_id=u.user_id order by sp_affiliates.id LIMIT 1) as per, (SELECT s.username  FROM sp_users s WHERE s.user_id=u.sponsor_id LIMIT 1) as sponsor_name,(SELECT f.left FROM sp_affiliates f WHERE f.user_id=u.user_id order by f.id DESC LIMIT 1) as leftside,(SELECT f.right FROM sp_affiliates f WHERE f.user_id=u.user_id order by f.id DESC LIMIT 1) as rightside, IF(u.user_id IS NULL,0,".$level.") as level, f.left,f.right, date(u.crdate) as crdate, IF(u.user_id IS NULL,0,f.id) as id, IF(u.profile_pic IS NULL,'https://app.cbdn2020.com/profile.png',profile_pic) as img, IF(u.username IS NULL,0,u.username)  as name,u.email,u.first_name,u.last_name,(SELECT f.user_id FROM sp_affiliates f WHERE (f.right=u.user_id or f.left=u.user_id) order by f.id DESC LIMIT 1)  as pid,f.id as sponsor_id from sp_affiliates as f ,sp_users as u where (f.left=u.user_id or f.right=u.user_id) and  u.user_id = '".$userID."' order by f.id DESC  limit 1");
      }elseif($level>7){
          //echo "string".$level."-".$userID;
          $results = mysqli_query($conn,"Select f.`status`, f.`matrix`,(SELECT IF(sp_affiliates.left='','0%', IF(sp_affiliates.right!='','100%','50%')) as levels FROM `sp_affiliates`  WHERE sp_affiliates.user_id=u.user_id order by sp_affiliates.id LIMIT 1) as per,  (SELECT s.username  FROM sp_users s WHERE s.user_id=u.sponsor_id LIMIT 1) as sponsor_name,(SELECT f.left FROM sp_affiliates f WHERE f.user_id=u.user_id order by f.id ASC LIMIT 1) as leftside,(SELECT f.right FROM sp_affiliates f WHERE f.user_id=u.user_id order by f.id ASC LIMIT 1) as rightside, IF(u.user_id IS NULL,0,".$level.") as level, f.left,f.right, date(u.crdate) as crdate, u.user_id as id, IF(u.profile_pic IS NULL,'https://app.cbdn2020.com/profile.png',profile_pic) as img, u.username as name,u.email,u.first_name,u.last_name,(SELECT f.user_id FROM sp_affiliates f WHERE (f.right=u.user_id or f.left=u.user_id) order by f.id DESC LIMIT 1) as pid,u.sponsor_id  from sp_affiliates as f ,sp_users as u where (f.left=u.user_id or f.right=u.user_id) and  u.user_id = '".$userID."' order by f.id ASC  limit 1");
          */
      	}else{

        	/*$includeQtr="";
			$getmatrix = getLastLevel($userID);

			if(!empty($getmatrix)){
				//$rows['pid']= $getmatrix[0]['id'];
				if ($fid>=$getmatrix[0]['id']) {
					$includeQtr= " and f.id>".$getmatrix[0]['id'];	
					$results = mysqli_query($conn,"Select f.`id` as fid,f.`status`, f.`matrix`,(SELECT IF(sp_affiliates.left='','0%', IF(sp_affiliates.right!='','100%','50%')) as levels FROM `sp_affiliates`  WHERE sp_affiliates.user_id=u.user_id order by sp_affiliates.id LIMIT 1) as per,  (SELECT s.username  FROM sp_users s WHERE s.user_id=u.sponsor_id LIMIT 1) as sponsor_name,f.left as leftside,f.right as rightside, IF(u.user_id IS NULL,0,".$level.") as level, f.left,f.right, date(u.crdate) as crdate, u.user_id as id, IF(u.profile_pic IS NULL,'https://app.cbdn2020.com/profile.png',profile_pic) as img, u.username as name,u.email,u.first_name,u.last_name,(SELECT f.user_id FROM sp_affiliates f WHERE (f.right=u.user_id or f.left=u.user_id) order by f.id DESC LIMIT 1) as pid,u.sponsor_id  from sp_affiliates as f ,sp_users as u where f.user_id=u.user_id and u.user_id = '".$userID."' ".$includeQtr." order by f.id DESC limit 1");
				}else{*/
					 $results = mysqli_query($conn,"Select  u.user_id,f.`id` as fid,f.`status`, f.`matrix`,(SELECT IF(sp_affiliates.left='','0%', IF(sp_affiliates.right!='','100%','50%')) as levels FROM `sp_affiliates`  WHERE sp_affiliates.user_id=u.user_id order by sp_affiliates.id LIMIT 1) as per,  (SELECT s.username  FROM sp_users s WHERE s.user_id=u.sponsor_id LIMIT 1) as sponsor_name,f.left as leftside,f.right as rightside, IF(u.user_id IS NULL,0,".$level.") as level, f.left,f.right, date(u.crdate) as crdate, u.user_id as id, IF(u.profile_pic IS NULL,'https://app.cbdn2020.com/assets/images/default.png',profile_pic) as img, u.username as name,u.email,u.first_name,u.last_name,(SELECT f.user_id FROM sp_affiliates f WHERE (f.right=u.user_id or f.left=u.user_id) order by f.id ASC LIMIT 1) as pid,u.sponsor_id  from sp_affiliates as f ,sp_users as u where f.user_id=u.user_id and u.user_id = '".$userID."' and f.id>".$fid." order by f.id ASC limit 1");
				//}
			/*}else{
				 $results = mysqli_query($conn,"Select f.`id` as fid,f.`status`, f.`matrix`,(SELECT IF(sp_affiliates.left='','0%', IF(sp_affiliates.right!='','100%','50%')) as levels FROM `sp_affiliates`  WHERE sp_affiliates.user_id=u.user_id order by sp_affiliates.id LIMIT 1) as per,  (SELECT s.username  FROM sp_users s WHERE s.user_id=u.sponsor_id LIMIT 1) as sponsor_name,f.left as leftside,f.right as rightside, IF(u.user_id IS NULL,0,".$level.") as level, f.left,f.right, date(u.crdate) as crdate, u.user_id as id, IF(u.profile_pic IS NULL,'https://app.cbdn2020.com/profile.png',profile_pic) as img, u.username as name,u.email,u.first_name,u.last_name,(SELECT f.user_id FROM sp_affiliates f WHERE (f.right=u.user_id or f.left=u.user_id) order by f.id DESC LIMIT 1) as pid,u.sponsor_id  from sp_affiliates as f ,sp_users as u where f.user_id=u.user_id and u.user_id = '".$userID."' order by f.id DESC limit 1");
			}*/
			
         
      }
     //  if (!$results){
     //   die('Invalid query: '.mysqli_error($conn));
     // }
    //  $row = mysqli_fetch_array($result);
      //print_r($results);
      $k=0;
      $lm=false;
      //if( $results ){
      if (mysqli_num_rows($results) <= 0) {
      		 $lm=true;
      		
      		 $results = mysqli_query($conn,"Select u.user_id,f.`id` as fid,f.`status`, f.`matrix`,(SELECT IF(sp_affiliates.left='','0%', IF(sp_affiliates.right!='','100%','50%')) as levels FROM `sp_affiliates`  WHERE sp_affiliates.user_id=u.user_id and f.id>".$fid." order by sp_affiliates.id LIMIT 1) as per, (SELECT s.username  FROM sp_users s WHERE s.user_id=f.user_id LIMIT 1) as sponsor_name,(SELECT f.left FROM sp_affiliates f WHERE f.user_id=u.user_id and f.id>".$fid." order by f.id DESC LIMIT 1) as leftside,(SELECT f.right FROM sp_affiliates f WHERE f.user_id=u.user_id and f.id>".$fid." order by f.id DESC LIMIT 1) as rightside, IF(u.user_id IS NULL,0,".$level.") as level, f.left,f.right, date(u.crdate) as crdate, u.user_id as id, IF(u.profile_pic IS NULL,'https://app.cbdn2020.com/assets/images/default.png',profile_pic) as img, IF(u.username IS NULL,0,u.username)  as name,u.email,u.first_name,u.last_name,(SELECT f.user_id FROM sp_affiliates f WHERE (f.right=u.user_id or f.left=u.user_id) order by f.id DESC LIMIT 1)  as pid,f.id as sponsor_id from sp_affiliates as f ,sp_users as u where (f.left=u.user_id or f.right=u.user_id) and u.user_id = '".$userID."'  and f.id>=".$fid." order by f.id DESC  limit 1");
      }
      while ($rows = mysqli_fetch_assoc($results))
      {
            // $var = str_repeat(' ',$level).$row['id']."\n";
           //print_r($rows);
                     //echo $var  after remove comment check tree
            //$row["unilevel"]=getChildList($row['id'],$level);
                     // i call function in while loop until count all user_id
            
			if ($rows['matrix']==2) {
				$rows['id']= $rows['fid'];
				if($lm){
					//echo $rows['fid']."HElo--".$rows['id']."==>";
					$rows['id']= $rows['fid'].'-'.$rows['user_id'];
					$rows['pid']= $rows['fid'];
					if (empty($rows['leftside']) || $rows['leftside']==NULL) {
					 	$rows['leftside']="";
					}
					if (empty($rows['rightside']) || $rows['rightside']==NULL) {
					 	$rows['rightside']="";
					} 
					$getmatrix = getLastLevel($rows['user_id,']);
					if(!empty($getmatrix) && $fid<=$getmatrix[0]['id']){
						$rows['pid']= $getmatrix[0]['id'];
					}
				}
			}else{
				$getmatrix = getLastLevel($rows['user_id,']);
				if(!empty($getmatrix) && $fid<=$getmatrix[0]['id']){
					$rows['pid']= $getmatrix[0]['id'];
				}
			} 
			if($rows){   

				$rows['name']=$rows['name']." (Sponsor: ".$rows['sponsor_name']."/ Percentage: ".$rows['per'].")";    
            	$children[]=$rows;
        	}
           // $level++;
            //$children[$k]['children'] = get_user_children($v['id'],$level);
            $k++;
            
           //  $count += 1+$this->display_children($row['id'], $level+1);

      }
     //}
     //exit($conn);
    }
     return $children;
 }
function get_user_children($user_id = false,$level=1)
{ // print_r($level);
  //print_r($user_id);die; 
  if($user_id or $user_id==0) { 
    $childrenArray = array();
    //Select IF(users.id IS NULL,0,'2') as level,profile_picture, username,first_name,last_name,id,is_login,sponsor_id from users WHERE sponsor_id = ? 
     //print_r($user_id.", ".$level);
    $res = getChildList($user_id, 1,1);
    //print_r($res);
    if($res)
    { 

      foreach($res as $s => $v)
      {       
          
          $childrenArray[] = $v;
          if($v['leftside']!=''){
            $levelOne = getChildList($v['leftside'],2,$v['fid']);
            //print_r($levelOne);
            if (count($levelOne)>0) {
              //$levelOne[0]['name']=$levelOne[0]['name']." (Sponsor: ".$levelOne[0]['sponsor_name']."/ Percentage: ".$levelOne[0]['per'].")";
              $childrenArray[] = $levelOne[0];
              if ($levelOne[0]['leftside']!='') {
                  $leveltwo= getChildList($levelOne[0]['leftside'],3,$levelOne[0]['fid']);
                  if (count($leveltwo)>0) {
                     //$leveltwo[0]['name']=$leveltwo[0]['name']." (Sponsor: ".$leveltwo[0]['sponsor_name']."/ Percentage: ".$leveltwo[0]['per'].")";
                    $childrenArray[] = $leveltwo[0];
                    if ($leveltwo[0]['leftside']!='') {
                        $levelthree = getChildList($leveltwo[0]['leftside'],4,$leveltwo[0]['fid']);
                       // $levelthree[0]['name']=$levelthree[0]['name']." (Sponsor: ".$levelthree[0]['sponsor_name']."/ Percentage: ".$levelthree[0]['per'].")";
                        $childrenArray[] = $levelthree[0];
						
                        if (count($levelthree)>0) {
                            //$childrenArray[] = $levelthree[0];
                            if ($levelthree[0]['leftside']!='') {
                                $levelfour = getChildList($levelthree[0]['leftside'],5,$levelthree[0]['fid']);
                                // print_r($levelfour);
                                //$levelfour[0]['name']=$levelfour[0]['name']." (Sponsor: ".$levelfour[0]['sponsor_name']."/ Percentage: ".$levelfour[0]['per'].")";
                                $childrenArray[] = $levelfour[0];
								
                                if (count($levelfour)>0) {
                                    //$childrenArray[] = $levelthree[0];
                                    if ($levelfour[0]['leftside']!='') {
                                        $levelfiv = getChildList($levelfour[0]['leftside'],6,$levelfour[0]['fid']);
                                       // print_r($levelfiv);
                                        //$levelfiv[0]['name']=$levelfiv[0]['name']." (Sponsor: ".$levelfiv[0]['sponsor_name']."/ Percentage: ".$levelfiv[0]['per'].")";
                                        $childrenArray[] = $levelfiv[0];
										if (count($levelfiv)>0) {
											//$childrenArray[] = $levelthree[0];
											if ($levelfiv[0]['leftside']!='') {
												$levelsix = getChildList($levelfiv[0]['leftside'],7,$levelfiv[0]['fid']);
											   // print_r($levelfiv);
												//$levelsix[0]['name']=$levelsix[0]['name']." (Sponsor: ".$levelsix[0]['sponsor_name']."/ Percentage: ".$levelsix[0]['per'].")";
												$childrenArray[] = $levelsix[0];
												if (count($levelsix)>0) {
													//$childrenArray[] = $levelthree[0];
													if ($levelsix[0]['leftside']!='') {
														$levelseven = getChildList($levelsix[0]['leftside'],8,$levelsix[0]['fid']);
													   // print_r($levelfiv);
														//$levelseven[0]['name']=$levelseven[0]['name']." (Sponsor: ".$levelseven[0]['sponsor_name']."/ Percentage: ".$levelseven[0]['per'].")";
														$childrenArray[] = $levelseven[0];
													}
													if ($levelsix[0]['rightside']!='') {
														$levelseven = getChildList($levelsix[0]['rightside'],8,$levelseven[0]['fid']);
														//$levelseven[0]['name']=$levelseven[0]['name']." (Sponsor: ".$levelseven[0]['sponsor_name']."/ Percentage: ".$levelseven[0]['per'].")";
														$childrenArray[] = $levelseven[0];
													}
												}
											}
											if ($levelfiv[0]['rightside']!='') {
												$levelsix = getChildList($levelfiv[0]['rightside'],7,$levelfiv[0]['fid']);
												//$levelsix[0]['name']=$levelsix[0]['name']." (Sponsor: ".$levelsix[0]['sponsor_name']."/ Percentage: ".$levelsix[0]['per'].")";
												$childrenArray[] = $levelsix[0];
												if (count($levelsix)>0) {
													//$childrenArray[] = $levelthree[0];
													if ($levelsix[0]['leftside']!='') {
														$levelseven = getChildList($levelsix[0]['leftside'],8,$levelseven[0]['fid']);
													   // print_r($levelfiv);
														//$levelseven[0]['name']=$levelseven[0]['name']." (Sponsor: ".$levelseven[0]['sponsor_name']."/ Percentage: ".$levelseven[0]['per'].")";
														$childrenArray[] = $levelseven[0];
													}
													if ($levelsix[0]['rightside']!='') {
														$levelseven = getChildList($levelsix[0]['rightside'],8,$levelsix[0]['fid']);
														//$levelseven[0]['name']=$levelseven[0]['name']." (Sponsor: ".$levelseven[0]['sponsor_name']."/ Percentage: ".$levelseven[0]['per'].")";
														$childrenArray[] = $levelseven[0];
													}
												}
											}
										}
                                    }
                                    if ($levelfour[0]['rightside']!='') {
                                        $levelfiv = getChildList($levelfour[0]['rightside'],6,$levelfour[0]['fid']);
                                       // $levelfiv[0]['name']=$levelfiv[0]['name']." (Sponsor: ".$levelfiv[0]['sponsor_name']."/ Percentage: ".$levelfiv[0]['per'].")";
                                        $childrenArray[] = $levelfiv[0];
										if (count($levelfiv)>0) {
											//$childrenArray[] = $levelthree[0];
											if ($levelfiv[0]['leftside']!='') {
												$levelsix = getChildList($levelfiv[0]['leftside'],7,$levelfiv[0]['fid']);
											   // print_r($levelfiv);
												//$levelsix[0]['name']=$levelsix[0]['name']." (Sponsor: ".$levelsix[0]['sponsor_name']."/ Percentage: ".$levelsix[0]['per'].")";
												$childrenArray[] = $levelsix[0];
												if (count($levelsix)>0) {
													//$childrenArray[] = $levelthree[0];
													if ($levelsix[0]['leftside']!='') {
														$levelseven = getChildList($levelsix[0]['leftside'],8,$levelseven[0]['fid']);
													   // print_r($levelfiv);
														//$levelseven[0]['name']=$levelseven[0]['name']." (Sponsor: ".$levelseven[0]['sponsor_name']."/ Percentage: ".$levelseven[0]['per'].")";
														$childrenArray[] = $levelseven[0];
													}
													if ($levelsix[0]['rightside']!='') {
														$levelseven = getChildList($levelsix[0]['rightside'],8,$levelseven[0]['fid']);
														//$levelseven[0]['name']=$levelseven[0]['name']." (Sponsor: ".$levelseven[0]['sponsor_name']."/ Percentage: ".$levelseven[0]['per'].")";
														$childrenArray[] = $levelseven[0];
													}
												}
											}
											if ($levelfiv[0]['rightside']!='') {
												$levelsix = getChildList($levelfiv[0]['rightside'],7,$levelfiv[0]['fid']);
												//$levelsix[0]['name']=$levelsix[0]['name']." (Sponsor: ".$levelsix[0]['sponsor_name']."/ Percentage: ".$levelsix[0]['per'].")";
												$childrenArray[] = $levelsix[0];
												if (count($levelsix)>0) {
													//$childrenArray[] = $levelthree[0];
													if ($levelsix[0]['leftside']!='') {
														$levelseven = getChildList($levelsix[0]['leftside'],8,$levelsix[0]['fid']);
													   // print_r($levelfiv);
														//$levelseven[0]['name']=$levelseven[0]['name']." (Sponsor: ".$levelseven[0]['sponsor_name']."/ Percentage: ".$levelseven[0]['per'].")";
														$childrenArray[] = $levelseven[0];
													}
													if ($levelsix[0]['rightside']!='') {
														$levelseven = getChildList($levelsix[0]['rightside'],8,$levelsix[0]['fid']);
														//$levelseven[0]['name']=$levelseven[0]['name']." (Sponsor: ".$levelseven[0]['sponsor_name']."/ Percentage: ".$levelseven[0]['per'].")";
														$childrenArray[] = $levelseven[0];
													}
												}
											}
										}
                                    }
                                }
                            }
                            if ($levelthree[0]['rightside']!='') {
                                $levelfour = getChildList($levelthree[0]['rightside'],5,$levelthree[0]['fid']);
                                //$levelfour[0]['name']=$levelfour[0]['name']." (Sponsor: ".$levelfour[0]['sponsor_name']."/ Percentage: ".$levelfour[0]['per'].")";
                                $childrenArray[] = $levelfour[0];
                                if (count($levelfour)>0) {
                                    //$childrenArray[] = $levelthree[0];
                                    if ($levelfour[0]['leftside']!='') {
                                        $levelfiv = getChildList($levelfour[0]['leftside'],6,$levelfour[0]['fid']);
                                        //$levelfiv[0]['name']=$levelfiv[0]['name']." (Sponsor: ".$levelfiv[0]['sponsor_name']."/ Percentage: ".$levelfiv[0]['per'].")";
                                        $childrenArray[] = $levelfiv[0];
										if (count($levelfiv)>0) {
											//$childrenArray[] = $levelthree[0];
											if ($levelfiv[0]['leftside']!='') {
												$levelsix = getChildList($levelfiv[0]['leftside'],7,$levelfiv[0]['fid']);
											   // print_r($levelfiv);
												//$levelsix[0]['name']=$levelsix[0]['name']." (Sponsor: ".$levelsix[0]['sponsor_name']."/ Percentage: ".$levelsix[0]['per'].")";
												$childrenArray[] = $levelsix[0];
												if (count($levelsix)>0) {
													//$childrenArray[] = $levelthree[0];
													if ($levelsix[0]['leftside']!='') {
														$levelseven = getChildList($levelsix[0]['leftside'],8,$levelsix[0]['fid']);
													   // print_r($levelfiv);
														//$levelseven[0]['name']=$levelseven[0]['name']." (Sponsor: ".$levelseven[0]['sponsor_name']."/ Percentage: ".$levelseven[0]['per'].")";
														$childrenArray[] = $levelseven[0];
													}
													if ($levelsix[0]['rightside']!='') {
														$levelseven = getChildList($levelsix[0]['rightside'],8,$levelsix[0]['fid']);
														//$levelseven[0]['name']=$levelseven[0]['name']." (Sponsor: ".$levelseven[0]['sponsor_name']."/ Percentage: ".$levelseven[0]['per'].")";
														$childrenArray[] = $levelseven[0];
													}
												}
											}
											if ($levelfiv[0]['rightside']!='') {
												$levelsix = getChildList($levelfiv[0]['rightside'],7,$levelfiv[0]['fid']);
												//$levelsix[0]['name']=$levelsix[0]['name']." (Sponsor: ".$levelsix[0]['sponsor_name']."/ Percentage: ".$levelsix[0]['per'].")";
												$childrenArray[] = $levelsix[0];
												if (count($levelsix)>0) {
													//$childrenArray[] = $levelthree[0];
													if ($levelsix[0]['leftside']!='') {
														$levelseven = getChildList($levelsix[0]['leftside'],8,$levelsix[0]['fid']);
													   // print_r($levelfiv);
														//$levelseven[0]['name']=$levelseven[0]['name']." (Sponsor: ".$levelseven[0]['sponsor_name']."/ Percentage: ".$levelseven[0]['per'].")";
														$childrenArray[] = $levelseven[0];
													}
													if ($levelsix[0]['rightside']!='') {
														$levelseven = getChildList($levelsix[0]['rightside'],8,$levelsix[0]['fid']);
														//$levelseven[0]['name']=$levelseven[0]['name']." (Sponsor: ".$levelseven[0]['sponsor_name']."/ Percentage: ".$levelseven[0]['per'].")";
														$childrenArray[] = $levelseven[0];
													}
												}
											}
										}
                                    }
                                    if ($levelfour[0]['rightside']!='') {
                                        $levelfiv = getChildList($levelfour[0]['rightside'],6,$levelfour[0]['fid']);
                                        //$levelfiv[0]['name']= $levelfiv[0]['name']." (Sponsor: ".$levelfiv[0]['sponsor_name']."/ Percentage: ".$levelfiv[0]['per'].")";
                                        $childrenArray[] = $levelfiv[0];
										if (count($levelfiv)>0) {
											//$childrenArray[] = $levelthree[0];
											if ($levelfiv[0]['leftside']!='') {
												$levelsix = getChildList($levelfiv[0]['leftside'],7,$levelfiv[0]['fid']);
											   // print_r($levelfiv);
												//$levelsix[0]['name']=$levelsix[0]['name']." (Sponsor: ".$levelsix[0]['sponsor_name']."/ Percentage: ".$levelsix[0]['per'].")";
												$childrenArray[] = $levelsix[0];
												if (count($levelsix)>0) {
													//$childrenArray[] = $levelthree[0];
													if ($levelsix[0]['leftside']!='') {
														$levelseven = getChildList($levelsix[0]['leftside'],8,$levelsix[0]['fid']);
													   // print_r($levelfiv);
														//$levelseven[0]['name']=$levelseven[0]['name']." (Sponsor: ".$levelseven[0]['sponsor_name']."/ Percentage: ".$levelseven[0]['per'].")";
														$childrenArray[] = $levelseven[0];
													}
													if ($levelsix[0]['rightside']!='') {
														$levelseven = getChildList($levelsix[0]['rightside'],8,$levelsix[0]['fid']);
														//$levelseven[0]['name']=$levelseven[0]['name']." (Sponsor: ".$levelseven[0]['sponsor_name']."/ Percentage: ".$levelseven[0]['per'].")";
														$childrenArray[] = $levelseven[0];
													}
												}
											}
											if ($levelfiv[0]['rightside']!='') {
												$levelsix = getChildList($levelfiv[0]['rightside'],7,$levelfiv[0]['fid']);
												//$levelsix[0]['name']=$levelsix[0]['name']." (Sponsor: ".$levelsix[0]['sponsor_name']."/ Percentage: ".$levelsix[0]['per'].")";
												$childrenArray[] = $levelsix[0];
												if (count($levelsix)>0) {
													//$childrenArray[] = $levelthree[0];
													if ($levelsix[0]['leftside']!='') {
														$levelseven = getChildList($levelsix[0]['leftside'],8,$levelsix[0]['fid']);
													   // print_r($levelfiv);
														//$levelseven[0]['name']=$levelseven[0]['name']." (Sponsor: ".$levelseven[0]['sponsor_name']."/ Percentage: ".$levelseven[0]['per'].")";
														$childrenArray[] = $levelseven[0];
													}
													if ($levelsix[0]['rightside']!='') {
														$levelseven = getChildList($levelsix[0]['rightside'],8,$levelsix[0]['fid']);
														//$levelseven[0]['name']=$levelseven[0]['name']." (Sponsor: ".$levelseven[0]['sponsor_name']."/ Percentage: ".$levelseven[0]['per'].")";
														$childrenArray[] = $levelseven[0];
													}
												}
											}
										}
                                    }
                                }
                            }
                        }
                    }
                    if ($leveltwo[0]['rightside']!='') {
                        $levelthree = getChildList($leveltwo[0]['rightside'],4,$leveltwo[0]['fid']);
                        //$levelthree[0]['name']=$levelthree[0]['name']." (Sponsor: ".$levelthree[0]['sponsor_name']."/ Percentage: ".$levelthree[0]['per'].")";
                        $childrenArray[] = $levelthree[0];
                         if (count($levelthree)>0) {
                            //$childrenArray[] = $levelthree[0];
                            if ($levelthree[0]['leftside']!='') {
                                $levelfour = getChildList($levelthree[0]['leftside'],5,$levelthree[0]['fid']);
                                //$levelfour[0]['name']=$levelfour[0]['name']." (Sponsor: ".$levelfour[0]['sponsor_name']."/ Percentage: ".$levelfour[0]['per'].")";
                                $childrenArray[] = $levelfour[0];
                                if (count($levelfour)>0) {
                                    //$childrenArray[] = $levelthree[0];
                                    if ($levelfour[0]['leftside']!='') {
                                        $levelfiv = getChildList($levelfour[0]['leftside'],6,$levelfour[0]['fid']);
                                        //$levelfiv[0]['name']=$levelfiv[0]['name']." (Sponsor: ".$levelfiv[0]['sponsor_name']."/ Percentage: ".$levelfiv[0]['per'].")";
                                        $childrenArray[] = $levelfiv[0];
										if (count($levelfiv)>0) {
											//$childrenArray[] = $levelthree[0];
											if ($levelfiv[0]['leftside']!='') {
												$levelsix = getChildList($levelfiv[0]['leftside'],7,$levelfiv[0]['fid']);
											   // print_r($levelfiv);
												//$levelsix[0]['name']=$levelsix[0]['name']." (Sponsor: ".$levelsix[0]['sponsor_name']."/ Percentage: ".$levelsix[0]['per'].")";
												$childrenArray[] = $levelsix[0];
												if (count($levelsix)>0) {
													//$childrenArray[] = $levelthree[0];
													if ($levelsix[0]['leftside']!='') {
														$levelseven = getChildList($levelsix[0]['leftside'],8,$levelsix[0]['fid']);
													   // print_r($levelfiv);
														//$levelseven[0]['name']=$levelseven[0]['name']." (Sponsor: ".$levelseven[0]['sponsor_name']."/ Percentage: ".$levelseven[0]['per'].")";
														$childrenArray[] = $levelseven[0];
													}
													if ($levelsix[0]['rightside']!='') {
														$levelseven = getChildList($levelsix[0]['rightside'],8,$levelsix[0]['fid']);
														//$levelseven[0]['name']=$levelseven[0]['name']." (Sponsor: ".$levelseven[0]['sponsor_name']."/ Percentage: ".$levelseven[0]['per'].")";
														$childrenArray[] = $levelseven[0];
													}
												}
											}
											if ($levelfiv[0]['rightside']!='') {
												$levelsix = getChildList($levelfiv[0]['rightside'],7,$levelfiv[0]['fid']);
												//$levelsix[0]['name']=$levelsix[0]['name']." (Sponsor: ".$levelsix[0]['sponsor_name']."/ Percentage: ".$levelsix[0]['per'].")";
												$childrenArray[] = $levelsix[0];
												if (count($levelsix)>0) {
													//$childrenArray[] = $levelthree[0];
													if ($levelsix[0]['leftside']!='') {
														$levelseven = getChildList($levelsix[0]['leftside'],8,$levelsix[0]['fid']);
													   // print_r($levelfiv);
														//$levelseven[0]['name']=$levelseven[0]['name']." (Sponsor: ".$levelseven[0]['sponsor_name']."/ Percentage: ".$levelseven[0]['per'].")";
														$childrenArray[] = $levelseven[0];
													}
													if ($levelsix[0]['rightside']!='') {
														$levelseven = getChildList($levelsix[0]['rightside'],8,$levelsix[0]['fid']);
														//$levelseven[0]['name']=$levelseven[0]['name']." (Sponsor: ".$levelseven[0]['sponsor_name']."/ Percentage: ".$levelseven[0]['per'].")";
														$childrenArray[] = $levelseven[0];
													}
												}
											}
										}
                                    }
                                    if ($levelfour[0]['rightside']!='') {
                                        $levelfiv = getChildList($levelfour[0]['rightside'],6,$levelfour[0]['fid']);
                                        //$levelfiv[0]['name']=$levelfiv[0]['name']." (Sponsor: ".$levelfiv[0]['sponsor_name']."/ Percentage: ".$levelfiv[0]['per'].")";
                                        $childrenArray[] = $levelfiv[0];
										if (count($levelfiv)>0) {
											//$childrenArray[] = $levelthree[0];
											if ($levelfiv[0]['leftside']!='') {
												$levelsix = getChildList($levelfiv[0]['leftside'],7,$levelfiv[0]['fid']);
											   // print_r($levelfiv);
												//$levelsix[0]['name']=$levelsix[0]['name']." (Sponsor: ".$levelsix[0]['sponsor_name']."/ Percentage: ".$levelsix[0]['per'].")";
												$childrenArray[] = $levelsix[0];
												if (count($levelsix)>0) {
													//$childrenArray[] = $levelthree[0];
													if ($levelsix[0]['leftside']!='') {
														$levelseven = getChildList($levelsix[0]['leftside'],8,$levelsix[0]['fid']);
													   // print_r($levelfiv);
														//$levelseven[0]['name']=$levelseven[0]['name']." (Sponsor: ".$levelseven[0]['sponsor_name']."/ Percentage: ".$levelseven[0]['per'].")";
														$childrenArray[] = $levelseven[0];
													}
													if ($levelsix[0]['rightside']!='') {
														$levelseven = getChildList($levelsix[0]['rightside'],8,$levelsix[0]['fid']);
														//$levelseven[0]['name']=$levelseven[0]['name']." (Sponsor: ".$levelseven[0]['sponsor_name']."/ Percentage: ".$levelseven[0]['per'].")";
														$childrenArray[] = $levelseven[0];
													}
												}
											}
											if ($levelfiv[0]['rightside']!='') {
												$levelsix = getChildList($levelfiv[0]['rightside'],7,$levelfiv[0]['fid']);
												//$levelsix[0]['name']=$levelsix[0]['name']." (Sponsor: ".$levelsix[0]['sponsor_name']."/ Percentage: ".$levelsix[0]['per'].")";
												$childrenArray[] = $levelsix[0];
												if (count($levelsix)>0) {
													//$childrenArray[] = $levelthree[0];
													if ($levelsix[0]['leftside']!='') {
														$levelseven = getChildList($levelsix[0]['leftside'],8,$levelsix[0]['fid']);
													   // print_r($levelfiv);
														//$levelseven[0]['name']=$levelseven[0]['name']." (Sponsor: ".$levelseven[0]['sponsor_name']."/ Percentage: ".$levelseven[0]['per'].")";
														$childrenArray[] = $levelseven[0];
													}
													if ($levelsix[0]['rightside']!='') {
														$levelseven = getChildList($levelsix[0]['rightside'],8,$levelsix[0]['fid']);
														//$levelseven[0]['name']=$levelseven[0]['name']." (Sponsor: ".$levelseven[0]['sponsor_name']."/ Percentage: ".$levelseven[0]['per'].")";
														$childrenArray[] = $levelseven[0];
													}
												}
											}
										}
                                    }
                                }
                            }
                            if ($levelthree[0]['rightside']!='') {
                                $levelfour = getChildList($levelthree[0]['rightside'],5,$levelthree[0]['fid']);
                                //$levelfour[0]['name']=$levelfour[0]['name']." (Sponsor: ".$levelfour[0]['sponsor_name']."/ Percentage: ".$levelfour[0]['per'].")";
                                $childrenArray[] = $levelfour[0];
                                if (count($levelfour)>0) {
                                    //$childrenArray[] = $levelthree[0];
                                    if ($levelfour[0]['leftside']!='') {
                                        $levelfiv = getChildList($levelfour[0]['leftside'],6,$levelfour[0]['fid']);
                                        //$levelfiv[0]['name']=$levelfiv[0]['name']." (Sponsor: ".$levelfiv[0]['sponsor_name']."/ Percentage: ".$levelfiv[0]['per'].")";
                                        $childrenArray[] = $levelfiv[0];
										if (count($levelfiv)>0) {
											//$childrenArray[] = $levelthree[0];
											if ($levelfiv[0]['leftside']!='') {
												$levelsix = getChildList($levelfiv[0]['leftside'],7,$levelfiv[0]['fid']);
											   // print_r($levelfiv);
												//$levelsix[0]['name']=$levelsix[0]['name']." (Sponsor: ".$levelsix[0]['sponsor_name']."/ Percentage: ".$levelsix[0]['per'].")";
												$childrenArray[] = $levelsix[0];
												if (count($levelsix)>0) {
													//$childrenArray[] = $levelthree[0];
													if ($levelsix[0]['leftside']!='') {
														$levelseven = getChildList($levelsix[0]['leftside'],8,$levelsix[0]['fid']);
													   // print_r($levelfiv);
														//$levelseven[0]['name']=$levelseven[0]['name']." (Sponsor: ".$levelseven[0]['sponsor_name']."/ Percentage: ".$levelseven[0]['per'].")";
														$childrenArray[] = $levelseven[0];
													}
													if ($levelsix[0]['rightside']!='') {
														$levelseven = getChildList($levelsix[0]['rightside'],8,$levelsix[0]['fid']);
														//$levelseven[0]['name']=$levelseven[0]['name']." (Sponsor: ".$levelseven[0]['sponsor_name']."/ Percentage: ".$levelseven[0]['per'].")";
														$childrenArray[] = $levelseven[0];
													}
												}
											}
											if ($levelfiv[0]['rightside']!='') {
												$levelsix = getChildList($levelfiv[0]['rightside'],7,$levelfiv[0]['fid']);
												//$levelsix[0]['name']=$levelsix[0]['name']." (Sponsor: ".$levelsix[0]['sponsor_name']."/ Percentage: ".$levelsix[0]['per'].")";
												$childrenArray[] = $levelsix[0];
												if (count($levelsix)>0) {
													//$childrenArray[] = $levelthree[0];
													if ($levelsix[0]['leftside']!='') {
														$levelseven = getChildList($levelsix[0]['leftside'],8,$levelsix[0]['fid']);
													   // print_r($levelfiv);
														//$levelseven[0]['name']=$levelseven[0]['name']." (Sponsor: ".$levelseven[0]['sponsor_name']."/ Percentage: ".$levelseven[0]['per'].")";
														$childrenArray[] = $levelseven[0];
													}
													if ($levelsix[0]['rightside']!='') {
														$levelseven = getChildList($levelsix[0]['rightside'],8,$levelsix[0]['fid']);
														//$levelseven[0]['name']=$levelseven[0]['name']." (Sponsor: ".$levelseven[0]['sponsor_name']."/ Percentage: ".$levelseven[0]['per'].")";
														$childrenArray[] = $levelseven[0];
													}
												}
											}
										}
                                    }
                                    if ($levelfour[0]['rightside']!='') {
                                        $levelfiv = getChildList($levelfour[0]['rightside'],6,$levelfour[0]['fid']);
                                       // $levelfiv[0]['name']=$levelfiv[0]['name']." (Sponsor: ".$levelfiv[0]['sponsor_name']."/ Percentage: ".$levelfiv[0]['per'].")";
                                        $childrenArray[] = $levelfiv[0];
										if (count($levelfiv)>0) {
											//$childrenArray[] = $levelthree[0];
											if ($levelfiv[0]['leftside']!='') {
												$levelsix = getChildList($levelfiv[0]['leftside'],7,$levelfiv[0]['fid']);
											   // print_r($levelfiv);
												//$levelsix[0]['name']=$levelsix[0]['name']." (Sponsor: ".$levelsix[0]['sponsor_name']."/ Percentage: ".$levelsix[0]['per'].")";
												$childrenArray[] = $levelsix[0];
												if (count($levelsix)>0) {
													//$childrenArray[] = $levelthree[0];
													if ($levelsix[0]['leftside']!='') {
														$levelseven = getChildList($levelsix[0]['leftside'],8,$levelsix[0]['fid']);
													   // print_r($levelfiv);
														//$levelseven[0]['name']=$levelseven[0]['name']." (Sponsor: ".$levelseven[0]['sponsor_name']."/ Percentage: ".$levelseven[0]['per'].")";
														$childrenArray[] = $levelseven[0];
													}
													if ($levelsix[0]['rightside']!='') {
														$levelseven = getChildList($levelsix[0]['rightside'],8,$levelsix[0]['fid']);
														//$levelseven[0]['name']=$levelseven[0]['name']." (Sponsor: ".$levelseven[0]['sponsor_name']."/ Percentage: ".$levelseven[0]['per'].")";
														$childrenArray[] = $levelseven[0];
													}
												}
											}
											if ($levelfiv[0]['rightside']!='') {
												$levelsix = getChildList($levelfiv[0]['rightside'],7,$levelfiv[0]['fid']);
												//$levelsix[0]['name']=$levelsix[0]['name']." (Sponsor: ".$levelsix[0]['sponsor_name']."/ Percentage: ".$levelsix[0]['per'].")";
												$childrenArray[] = $levelsix[0];
												if (count($levelsix)>0) {
													//$childrenArray[] = $levelthree[0];
													if ($levelsix[0]['leftside']!='') {
														$levelseven = getChildList($levelsix[0]['leftside'],8,$levelsix[0]['fid']);
													   // print_r($levelfiv);
														//$levelseven[0]['name']=$levelseven[0]['name']." (Sponsor: ".$levelseven[0]['sponsor_name']."/ Percentage: ".$levelseven[0]['per'].")";
														$childrenArray[] = $levelseven[0];
													}
													if ($levelsix[0]['rightside']!='') {
														$levelseven = getChildList($levelsix[0]['rightside'],8,$levelsix[0]['fid']);
														//$levelseven[0]['name']=$levelseven[0]['name']." (Sponsor: ".$levelseven[0]['sponsor_name']."/ Percentage: ".$levelseven[0]['per'].")";
														$childrenArray[] = $levelseven[0];
													}
												}
											}
										}
                                    }
                                }
                            }
                        }
                    }
                  }  
              }
              if ($levelOne[0]['rightside']!='') {
                  $leveltwo= getChildList($levelOne[0]['rightside'],3,$levelOne[0]['fid']);
                  //$leveltwo[0]['name']=$leveltwo[0]['name']." (Sponsor: ".$leveltwo[0]['sponsor_name']."/ Percentage: ".$leveltwo[0]['per'].")";

                  if (count($leveltwo)>0) {
                    $childrenArray[] = $leveltwo[0];
                    if ($leveltwo[0]['leftside']!='') {
                        $levelthree = getChildList($leveltwo[0]['leftside'],4,$leveltwo[0]['fid']);
                        //$levelthree[0]['name']=$levelthree[0]['name']." (Sponsor: ".$levelthree[0]['sponsor_name']."/ Percentage: ".$levelthree[0]['per'].")";
                        $childrenArray[] = $levelthree[0];
                         if (count($levelthree)>0) {
                            //$childrenArray[] = $levelthree[0];
                            if ($levelthree[0]['leftside']!='') {
                                $levelfour = getChildList($levelthree[0]['leftside'],5,$levelthree[0]['fid']);
                                //$levelfour[0]['name']=$levelfour[0]['name']." (Sponsor: ".$levelfour[0]['sponsor_name']."/ Percentage: ".$levelfour[0]['per'].")";
                                
                                $childrenArray[] = $levelfour[0];
                                if (count($levelfour)>0) {
                                    //$childrenArray[] = $levelthree[0];
                                    if ($levelfour[0]['leftside']!='') {
                                        $levelfiv = getChildList($levelfour[0]['leftside'],6,$levelfour[0]['fid']);
                                        // $levelfiv[0]['name']=$levelfiv[0]['name']." (Sponsor: ".$levelfiv[0]['sponsor_name']."/ Percentage: ".$levelfiv[0]['per'].")";
                                        $childrenArray[] = $levelfiv[0];
										if (count($levelfiv)>0) {
											//$childrenArray[] = $levelthree[0];
											if ($levelfiv[0]['leftside']!='') {
												$levelsix = getChildList($levelfiv[0]['leftside'],7,$levelfiv[0]['fid']);
											   // print_r($levelfiv);
												//$levelsix[0]['name']=$levelsix[0]['name']." (Sponsor: ".$levelsix[0]['sponsor_name']."/ Percentage: ".$levelsix[0]['per'].")";
												$childrenArray[] = $levelsix[0];
												if (count($levelsix)>0) {
													//$childrenArray[] = $levelthree[0];
													if ($levelsix[0]['leftside']!='') {
														$levelseven = getChildList($levelsix[0]['leftside'],8,$levelsix[0]['fid']);
													   // print_r($levelfiv);
														//$levelseven[0]['name']=$levelseven[0]['name']." (Sponsor: ".$levelseven[0]['sponsor_name']."/ Percentage: ".$levelseven[0]['per'].")";
														$childrenArray[] = $levelseven[0];
													}
													if ($levelsix[0]['rightside']!='') {
														$levelseven = getChildList($levelsix[0]['rightside'],8,$levelsix[0]['fid']);
														//$levelseven[0]['name']=$levelseven[0]['name']." (Sponsor: ".$levelseven[0]['sponsor_name']."/ Percentage: ".$levelseven[0]['per'].")";
														$childrenArray[] = $levelseven[0];
													}
												}
											}
											if ($levelfiv[0]['rightside']!='') {
												$levelsix = getChildList($levelfiv[0]['rightside'],7,$levelfiv[0]['fid']);
												//$levelsix[0]['name']=$levelsix[0]['name']." (Sponsor: ".$levelsix[0]['sponsor_name']."/ Percentage: ".$levelsix[0]['per'].")";
												$childrenArray[] = $levelsix[0];
												if (count($levelsix)>0) {
													//$childrenArray[] = $levelthree[0];
													if ($levelsix[0]['leftside']!='') {
														$levelseven = getChildList($levelsix[0]['leftside'],8,$levelsix[0]['fid']);
													   // print_r($levelfiv);
														//$levelseven[0]['name']=$levelseven[0]['name']." (Sponsor: ".$levelseven[0]['sponsor_name']."/ Percentage: ".$levelseven[0]['per'].")";
														$childrenArray[] = $levelseven[0];
													}
													if ($levelsix[0]['rightside']!='') {
														$levelseven = getChildList($levelsix[0]['rightside'],8,$levelsix[0]['fid']);
														//$levelseven[0]['name']=$levelseven[0]['name']." (Sponsor: ".$levelseven[0]['sponsor_name']."/ Percentage: ".$levelseven[0]['per'].")";
														$childrenArray[] = $levelseven[0];
													}
												}
											}
										}
                                    }
                                    if ($levelfour[0]['rightside']!='') {
                                        $levelfiv = getChildList($levelfour[0]['rightside'],6,$levelfour[0]['fid']);
                                        //$levelfiv[0]['name']= $levelfiv[0]['name']." (Sponsor: ".$levelfiv[0]['sponsor_name']."/ Percentage: ".$levelfiv[0]['per'].")";
                                        $childrenArray[] = $levelfiv[0];
										if (count($levelfiv)>0) {
											//$childrenArray[] = $levelthree[0];
											if ($levelfiv[0]['leftside']!='') {
												$levelsix = getChildList($levelfiv[0]['leftside'],7,$levelfiv[0]['fid']);
											   // print_r($levelfiv);
												//$levelsix[0]['name']=$levelsix[0]['name']." (Sponsor: ".$levelsix[0]['sponsor_name']."/ Percentage: ".$levelsix[0]['per'].")";
												$childrenArray[] = $levelsix[0];
												if (count($levelsix)>0) {
													//$childrenArray[] = $levelthree[0];
													if ($levelsix[0]['leftside']!='') {
														$levelseven = getChildList($levelsix[0]['leftside'],8,$levelsix[0]['fid']);
													   // print_r($levelfiv);
														//$levelseven[0]['name']=$levelseven[0]['name']." (Sponsor: ".$levelseven[0]['sponsor_name']."/ Percentage: ".$levelseven[0]['per'].")";
														$childrenArray[] = $levelseven[0];
													}
													if ($levelsix[0]['rightside']!='') {
														$levelseven = getChildList($levelsix[0]['rightside'],8,$levelsix[0]['fid']);
														//$levelseven[0]['name']=$levelseven[0]['name']." (Sponsor: ".$levelseven[0]['sponsor_name']."/ Percentage: ".$levelseven[0]['per'].")";
														$childrenArray[] = $levelseven[0];
													}
												}
											}
											if ($levelfiv[0]['rightside']!='') {
												$levelsix = getChildList($levelfiv[0]['rightside'],7,$levelfiv[0]['fid']);
												//$levelsix[0]['name']=$levelsix[0]['name']." (Sponsor: ".$levelsix[0]['sponsor_name']."/ Percentage: ".$levelsix[0]['per'].")";
												$childrenArray[] = $levelsix[0];
												if (count($levelsix)>0) {
													//$childrenArray[] = $levelthree[0];
													if ($levelsix[0]['leftside']!='') {
														$levelseven = getChildList($levelsix[0]['leftside'],8,$levelsix[0]['fid']);
													   // print_r($levelfiv);
														//$levelseven[0]['name']=$levelseven[0]['name']." (Sponsor: ".$levelseven[0]['sponsor_name']."/ Percentage: ".$levelseven[0]['per'].")";
														$childrenArray[] = $levelseven[0];
													}
													if ($levelsix[0]['rightside']!='') {
														$levelseven = getChildList($levelsix[0]['rightside'],8,$levelsix[0]['fid']);
														//$levelseven[0]['name']=$levelseven[0]['name']." (Sponsor: ".$levelseven[0]['sponsor_name']."/ Percentage: ".$levelseven[0]['per'].")";
														$childrenArray[] = $levelseven[0];
													}
												}
											}
										}
                                    }
                                }
                            }
                            if ($levelthree[0]['rightside']!='') {
                                $levelfour = getChildList($levelthree[0]['rightside'],5,$levelthree[0]['fid']);
                                //$levelfour[0]['name']=$levelfour[0]['name']." (Sponsor: ".$levelfour[0]['sponsor_name']."/ Percentage: ".$levelfour[0]['per'].")";
                                
                                $childrenArray[] = $levelfour[0];
                                if (count($levelfour)>0) {
                                    //$childrenArray[] = $levelthree[0];
                                    if ($levelfour[0]['leftside']!='') {
                                        $levelfiv = getChildList($levelfour[0]['leftside'],6,$levelfour[0]['fid']);
                                        //$levelfiv[0]['name']=$levelfiv[0]['name']." (Sponsor: ".$levelfiv[0]['sponsor_name']."/ Percentage: ".$levelfiv[0]['per'].")";
                                        $childrenArray[] = $levelfiv[0];
										if (count($levelfiv)>0) {
											//$childrenArray[] = $levelthree[0];
											if ($levelfiv[0]['leftside']!='') {
												$levelsix = getChildList($levelfiv[0]['leftside'],7,$levelfiv[0]['fid']);
											   // print_r($levelfiv);
												//$levelsix[0]['name']=$levelsix[0]['name']." (Sponsor: ".$levelsix[0]['sponsor_name']."/ Percentage: ".$levelsix[0]['per'].")";
												$childrenArray[] = $levelsix[0];
												if (count($levelsix)>0) {
													//$childrenArray[] = $levelthree[0];
													if ($levelsix[0]['leftside']!='') {
														$levelseven = getChildList($levelsix[0]['leftside'],8,$levelsix[0]['fid']);
													   // print_r($levelfiv);
														//$levelseven[0]['name']=$levelseven[0]['name']." (Sponsor: ".$levelseven[0]['sponsor_name']."/ Percentage: ".$levelseven[0]['per'].")";
														$childrenArray[] = $levelseven[0];
													}
													if ($levelsix[0]['rightside']!='') {
														$levelseven = getChildList($levelsix[0]['rightside'],8,$levelsix[0]['fid']);
														//$levelseven[0]['name']=$levelseven[0]['name']." (Sponsor: ".$levelseven[0]['sponsor_name']."/ Percentage: ".$levelseven[0]['per'].")";
														$childrenArray[] = $levelseven[0];
													}
												}
											}
											if ($levelfiv[0]['rightside']!='') {
												$levelsix = getChildList($levelfiv[0]['rightside'],7,$levelfiv[0]['fid']);
												//$levelsix[0]['name']=$levelsix[0]['name']." (Sponsor: ".$levelsix[0]['sponsor_name']."/ Percentage: ".$levelsix[0]['per'].")";
												$childrenArray[] = $levelsix[0];
												if (count($levelsix)>0) {
													//$childrenArray[] = $levelthree[0];
													if ($levelsix[0]['leftside']!='') {
														$levelseven = getChildList($levelsix[0]['leftside'],8,$levelsix[0]['fid']);
													   // print_r($levelfiv);
														//$levelseven[0]['name']=$levelseven[0]['name']." (Sponsor: ".$levelseven[0]['sponsor_name']."/ Percentage: ".$levelseven[0]['per'].")";
														$childrenArray[] = $levelseven[0];
													}
													if ($levelsix[0]['rightside']!='') {
														$levelseven = getChildList($levelsix[0]['rightside'],8,$levelsix[0]['fid']);
														//$levelseven[0]['name']=$levelseven[0]['name']." (Sponsor: ".$levelseven[0]['sponsor_name']."/ Percentage: ".$levelseven[0]['per'].")";
														$childrenArray[] = $levelseven[0];
													}
												}
											}
										}
                                    }
                                    if ($levelfour[0]['rightside']!='') {
                                        $levelfiv = getChildList($levelfour[0]['rightside'],6,$levelfour[0]['fid']);
                                        //$levelfiv[0]['name']=$levelfiv[0]['name']." (Sponsor: ".$levelfiv[0]['sponsor_name']."/ Percentage: ".$levelfiv[0]['per'].")";
                                        $childrenArray[] = $levelfiv[0];
										if (count($levelfiv)>0) {
											//$childrenArray[] = $levelthree[0];
											if ($levelfiv[0]['leftside']!='') {
												$levelsix = getChildList($levelfiv[0]['leftside'],7,$levelfiv[0]['fid']);
											   // print_r($levelfiv);
												//$levelsix[0]['name']=$levelsix[0]['name']." (Sponsor: ".$levelsix[0]['sponsor_name']."/ Percentage: ".$levelsix[0]['per'].")";
												$childrenArray[] = $levelsix[0];
												if (count($levelsix)>0) {
													//$childrenArray[] = $levelthree[0];
													if ($levelsix[0]['leftside']!='') {
														$levelseven = getChildList($levelsix[0]['leftside'],8,$levelsix[0]['fid']);
													   // print_r($levelfiv);
														//$levelseven[0]['name']=$levelseven[0]['name']." (Sponsor: ".$levelseven[0]['sponsor_name']."/ Percentage: ".$levelseven[0]['per'].")";
														$childrenArray[] = $levelseven[0];
													}
													if ($levelsix[0]['rightside']!='') {
														$levelseven = getChildList($levelsix[0]['rightside'],8,$levelsix[0]['fid']);
														//$levelseven[0]['name']=$levelseven[0]['name']." (Sponsor: ".$levelseven[0]['sponsor_name']."/ Percentage: ".$levelseven[0]['per'].")";
														$childrenArray[] = $levelseven[0];
													}
												}
											}
											if ($levelfiv[0]['rightside']!='') {
												$levelsix = getChildList($levelfiv[0]['rightside'],7,$levelfiv[0]['fid']);
												//$levelsix[0]['name']=$levelsix[0]['name']." (Sponsor: ".$levelsix[0]['sponsor_name']."/ Percentage: ".$levelsix[0]['per'].")";
												$childrenArray[] = $levelsix[0];
												if (count($levelsix)>0) {
													//$childrenArray[] = $levelthree[0];
													if ($levelsix[0]['leftside']!='') {
														$levelseven = getChildList($levelsix[0]['leftside'],8,$levelsix[0]['fid']);
													   // print_r($levelfiv);
														//$levelseven[0]['name']=$levelseven[0]['name']." (Sponsor: ".$levelseven[0]['sponsor_name']."/ Percentage: ".$levelseven[0]['per'].")";
														$childrenArray[] = $levelseven[0];
													}
													if ($levelsix[0]['rightside']!='') {
														$levelseven = getChildList($levelsix[0]['rightside'],8,$levelsix[0]['fid']);
														//$levelseven[0]['name']=$levelseven[0]['name']." (Sponsor: ".$levelseven[0]['sponsor_name']."/ Percentage: ".$levelseven[0]['per'].")";
														$childrenArray[] = $levelseven[0];
													}
												}
											}
										}
                                    }
                                }
                            }
                        }
                    }
                    if ($leveltwo[0]['rightside']!='') {
                        $levelthree = getChildList($leveltwo[0]['rightside'],4,$leveltwo[0]['fid']);
                        //$levelthree[0]['name']=$levelthree[0]['name']." (Sponsor: ".$levelthree[0]['sponsor_name']."/ Percentage: ".$levelthree[0]['per'].")";

                        $childrenArray[] = $levelthree[0];
                         if (count($levelthree)>0) {
                            //$childrenArray[] = $levelthree[0];
                            if ($levelthree[0]['leftside']!='') {
                                $levelfour = getChildList($levelthree[0]['leftside'],5,$levelthree[0]['fid']);
                               // $levelfour[0]['name']=$levelfour[0]['name']." (Sponsor: ".$levelfour[0]['sponsor_name']."/ Percentage: ".$levelfour[0]['per'].")";
                                $childrenArray[] = $levelfour[0];
                                if (count($levelfour)>0) {
                                    //$childrenArray[] = $levelthree[0];
                                    if ($levelfour[0]['leftside']!='') {
                                        $levelfiv = getChildList($levelfour[0]['leftside'],6,$levelfour[0]['fid']);
                                        //$levelfiv[0]['name']=$levelfiv[0]['name']."( Sponsor: ".$levelfiv[0]['sponsor_name']."/ Percentage: ".$levelfiv[0]['per'].")";
                                        $childrenArray[] = $levelfiv[0];
										if (count($levelfiv)>0) {
											//$childrenArray[] = $levelthree[0];
											if ($levelfiv[0]['leftside']!='') {
												$levelsix = getChildList($levelfiv[0]['leftside'],7,$levelfiv[0]['fid']);
											   // print_r($levelfiv);
												//$levelsix[0]['name']=$levelsix[0]['name']." (Sponsor: ".$levelsix[0]['sponsor_name']."/ Percentage: ".$levelsix[0]['per'].")";
												$childrenArray[] = $levelsix[0];
												if (count($levelsix)>0) {
													//$childrenArray[] = $levelthree[0];
													if ($levelsix[0]['leftside']!='') {
														$levelseven = getChildList($levelsix[0]['leftside'],8,$levelsix[0]['fid']);
													   // print_r($levelfiv);
														//$levelseven[0]['name']=$levelseven[0]['name']." (Sponsor: ".$levelseven[0]['sponsor_name']."/ Percentage: ".$levelseven[0]['per'].")";
														$childrenArray[] = $levelseven[0];
													}
													if ($levelsix[0]['rightside']!='') {
														$levelseven = getChildList($levelsix[0]['rightside'],8,$levelsix[0]['fid']);
														//$levelseven[0]['name']=$levelseven[0]['name']." (Sponsor: ".$levelseven[0]['sponsor_name']."/ Percentage: ".$levelseven[0]['per'].")";
														$childrenArray[] = $levelseven[0];
													}
												}
											}
											if ($levelfiv[0]['rightside']!='') {
												$levelsix = getChildList($levelfiv[0]['rightside'],7,$levelfiv[0]['fid']);
												//$levelsix[0]['name']=$levelsix[0]['name']." (Sponsor: ".$levelsix[0]['sponsor_name']."/ Percentage: ".$levelsix[0]['per'].")";
												$childrenArray[] = $levelsix[0];
												if (count($levelsix)>0) {
													//$childrenArray[] = $levelthree[0];
													if ($levelsix[0]['leftside']!='') {
														$levelseven = getChildList($levelsix[0]['leftside'],8,$levelsix[0]['fid']);
													   // print_r($levelfiv);
														//$levelseven[0]['name']=$levelseven[0]['name']." (Sponsor: ".$levelseven[0]['sponsor_name']."/ Percentage: ".$levelseven[0]['per'].")";
														$childrenArray[] = $levelseven[0];
													}
													if ($levelsix[0]['rightside']!='') {
														$levelseven = getChildList($levelsix[0]['rightside'],8,$levelsix[0]['fid']);
														//$levelseven[0]['name']=$levelseven[0]['name']." (Sponsor: ".$levelseven[0]['sponsor_name']."/ Percentage: ".$levelseven[0]['per'].")";
														$childrenArray[] = $levelseven[0];
													}
												}
											}
										}
                                    }
                                    if ($levelfour[0]['rightside']!='') {
                                        $levelfiv = getChildList($levelfour[0]['rightside'],6,$levelfour[0]['fid']);
                                        //$levelfiv[0]['name']= $levelfiv[0]['name']."( Sponsor: ".$levelfiv[0]['sponsor_name']."/ Percentage: ".$levelfiv[0]['per'].")";
                                        $childrenArray[] = $levelfiv[0];
										if (count($levelfiv)>0) {
											//$childrenArray[] = $levelthree[0];
											if ($levelfiv[0]['leftside']!='') {
												$levelsix = getChildList($levelfiv[0]['leftside'],7,$levelfiv[0]['fid']);
											   // print_r($levelfiv);
												//$levelsix[0]['name']=$levelsix[0]['name']." (Sponsor: ".$levelsix[0]['sponsor_name']."/ Percentage: ".$levelsix[0]['per'].")";
												$childrenArray[] = $levelsix[0];
												if (count($levelsix)>0) {
													//$childrenArray[] = $levelthree[0];
													if ($levelsix[0]['leftside']!='') {
														$levelseven = getChildList($levelsix[0]['leftside'],8,$levelsix[0]['fid']);
													   // print_r($levelfiv);
														//$levelseven[0]['name']=$levelseven[0]['name']." (Sponsor: ".$levelseven[0]['sponsor_name']."/ Percentage: ".$levelseven[0]['per'].")";
														$childrenArray[] = $levelseven[0];
													}
													if ($levelsix[0]['rightside']!='') {
														$levelseven = getChildList($levelsix[0]['rightside'],8,$levelsix[0]['fid']);
														//$levelseven[0]['name']=$levelseven[0]['name']." (Sponsor: ".$levelseven[0]['sponsor_name']."/ Percentage: ".$levelseven[0]['per'].")";
														$childrenArray[] = $levelseven[0];
													}
												}
											}
											if ($levelfiv[0]['rightside']!='') {
												$levelsix = getChildList($levelfiv[0]['rightside'],7,$levelfiv[0]['fid']);
												//$levelsix[0]['name']=$levelsix[0]['name']." (Sponsor: ".$levelsix[0]['sponsor_name']."/ Percentage: ".$levelsix[0]['per'].")";
												$childrenArray[] = $levelsix[0];
												if (count($levelsix)>0) {
													//$childrenArray[] = $levelthree[0];
													if ($levelsix[0]['leftside']!='') {
														$levelseven = getChildList($levelsix[0]['leftside'],8,$levelsix[0]['fid']);
													   // print_r($levelfiv);
														//$levelseven[0]['name']=$levelseven[0]['name']." (Sponsor: ".$levelseven[0]['sponsor_name']."/ Percentage: ".$levelseven[0]['per'].")";
														$childrenArray[] = $levelseven[0];
													}
													if ($levelsix[0]['rightside']!='') {
														$levelseven = getChildList($levelsix[0]['rightside'],8,$levelsix[0]['fid']);
														//$levelseven[0]['name']=$levelseven[0]['name']." (Sponsor: ".$levelseven[0]['sponsor_name']."/ Percentage: ".$levelseven[0]['per'].")";
														$childrenArray[] = $levelseven[0];
													}
												}
											}
										}
                                    }
                                }
                            }
                            if ($levelthree[0]['rightside']!='') {
                                $levelfour = getChildList($levelthree[0]['rightside'],5,$levelthree[0]['fid']);
                                //$levelfour[0]['name']=$levelfour[0]['name']." (Sponsor: ".$levelfour[0]['sponsor_name']."/ Percentage: ".$levelfour[0]['per'].")";
                                
                                $childrenArray[] = $levelfour[0];
                                if (count($levelfour)>0) {
                                    //$childrenArray[] = $levelthree[0];
                                    if ($levelfour[0]['leftside']!='') {
                                        $levelfiv = getChildList($levelfour[0]['leftside'],6,$levelfour[0]['fid']);
                                        //$levelfiv[0]['name']=$levelfiv[0]['name']."( Sponsor: ".$levelfiv[0]['sponsor_name']."/ Percentage: ".$levelfiv[0]['per'].")";
                                        $childrenArray[] = $levelfiv[0];
										if (count($levelfiv)>0) {
											//$childrenArray[] = $levelthree[0];
											if ($levelfiv[0]['leftside']!='') {
												$levelsix = getChildList($levelfiv[0]['leftside'],7,$levelfiv[0]['fid']);
											   // print_r($levelfiv);
												//$levelsix[0]['name']=$levelsix[0]['name']." (Sponsor: ".$levelsix[0]['sponsor_name']."/ Percentage: ".$levelsix[0]['per'].")";
												$childrenArray[] = $levelsix[0];
												if (count($levelsix)>0) {
													//$childrenArray[] = $levelthree[0];
													if ($levelsix[0]['leftside']!='') {
														$levelseven = getChildList($levelsix[0]['leftside'],8,$levelsix[0]['fid']);
													   // print_r($levelfiv);
														//$levelseven[0]['name']=$levelseven[0]['name']." (Sponsor: ".$levelseven[0]['sponsor_name']."/ Percentage: ".$levelseven[0]['per'].")";
														$childrenArray[] = $levelseven[0];
													}
													if ($levelsix[0]['rightside']!='') {
														$levelseven = getChildList($levelsix[0]['rightside'],8,$levelsix[0]['fid']);
														//$levelseven[0]['name']=$levelseven[0]['name']." (Sponsor: ".$levelseven[0]['sponsor_name']."/ Percentage: ".$levelseven[0]['per'].")";
														$childrenArray[] = $levelseven[0];
													}
												}
											}
											if ($levelfiv[0]['rightside']!='') {
												$levelsix = getChildList($levelfiv[0]['rightside'],7,$levelfiv[0]['fid']);
												//$levelsix[0]['name']=$levelsix[0]['name']." (Sponsor: ".$levelsix[0]['sponsor_name']."/ Percentage: ".$levelsix[0]['per'].")";
												$childrenArray[] = $levelsix[0];
												if (count($levelsix)>0) {
													//$childrenArray[] = $levelthree[0];
													if ($levelsix[0]['leftside']!='') {
														$levelseven = getChildList($levelsix[0]['leftside'],8,$levelsix[0]['fid']);
													   // print_r($levelfiv);
														//$levelseven[0]['name']=$levelseven[0]['name']." (Sponsor: ".$levelseven[0]['sponsor_name']."/ Percentage: ".$levelseven[0]['per'].")";
														$childrenArray[] = $levelseven[0];
													}
													if ($levelsix[0]['rightside']!='') {
														$levelseven = getChildList($levelsix[0]['rightside'],8,$levelsix[0]['fid']);
														//$levelseven[0]['name']=$levelseven[0]['name']." (Sponsor: ".$levelseven[0]['sponsor_name']."/ Percentage: ".$levelseven[0]['per'].")";
														$childrenArray[] = $levelseven[0];
													}
												}
											}
										}
                                    }
                                    if ($levelfour[0]['rightside']!='') {
                                        $levelfiv = getChildList($levelfour[0]['rightside'],6,$levelfour[0]['fid']);
                                        //$levelfiv[0]['name']= $levelfiv[0]['name']."( Sponsor: ".$levelfiv[0]['sponsor_name']."/ Percentage: ".$levelfiv[0]['per'].")";
                                        $childrenArray[] = $levelfiv[0];
										if (count($levelfiv)>0) {
											//$childrenArray[] = $levelthree[0];
											if ($levelfiv[0]['leftside']!='') {
												$levelsix = getChildList($levelfiv[0]['leftside'],7,$levelfiv[0]['fid']);
											   // print_r($levelfiv);
												//$levelsix[0]['name']=$levelsix[0]['name']." (Sponsor: ".$levelsix[0]['sponsor_name']."/ Percentage: ".$levelsix[0]['per'].")";
												$childrenArray[] = $levelsix[0];
												if (count($levelsix)>0) {
													//$childrenArray[] = $levelthree[0];
													if ($levelsix[0]['leftside']!='') {
														$levelseven = getChildList($levelsix[0]['leftside'],8,$levelsix[0]['fid']);
													   // print_r($levelfiv);
														//$levelseven[0]['name']=$levelseven[0]['name']." (Sponsor: ".$levelseven[0]['sponsor_name']."/ Percentage: ".$levelseven[0]['per'].")";
														$childrenArray[] = $levelseven[0];
													}
													if ($levelsix[0]['rightside']!='') {
														$levelseven = getChildList($levelsix[0]['rightside'],8,$levelsix[0]['fid']);
														//$levelseven[0]['name']=$levelseven[0]['name']." (Sponsor: ".$levelseven[0]['sponsor_name']."/ Percentage: ".$levelseven[0]['per'].")";
														$childrenArray[] = $levelseven[0];
													}
												}
											}
											if ($levelfiv[0]['rightside']!='') {
												$levelsix = getChildList($levelfiv[0]['rightside'],7,$levelfiv[0]['fid']);
												//$levelsix[0]['name']=$levelsix[0]['name']." (Sponsor: ".$levelsix[0]['sponsor_name']."/ Percentage: ".$levelsix[0]['per'].")";
												$childrenArray[] = $levelsix[0];
												if (count($levelsix)>0) {
													//$childrenArray[] = $levelthree[0];
													if ($levelsix[0]['leftside']!='') {
														$levelseven = getChildList($levelsix[0]['leftside'],8,$levelsix[0]['fid']);
													   // print_r($levelfiv);
														//$levelseven[0]['name']=$levelseven[0]['name']." (Sponsor: ".$levelseven[0]['sponsor_name']."/ Percentage: ".$levelseven[0]['per'].")";
														$childrenArray[] = $levelseven[0];
													}
													if ($levelsix[0]['rightside']!='') {
														$levelseven = getChildList($levelsix[0]['rightside'],8,$levelsix[0]['fid']);
														//$levelseven[0]['name']=$levelseven[0]['name']." (Sponsor: ".$levelseven[0]['sponsor_name']."/ Percentage: ".$levelseven[0]['per'].")";
														$childrenArray[] = $levelseven[0];
													}
												}
											}
										}
                                    }
                                }
                            }
                        }
                    }
                  }
              }
              
            }
          }
          if($v['rightside']!=''){
            $levelOne = getChildList($v['rightside'],2,$v['fid']);
           // $levelOne[0]['name']=$levelOne[0]['name']." (Sponsor: ".$levelOne[0]['sponsor_name']."/ Percentage: ".$levelOne[0]['per'].")";

            if (count($levelOne)>0) {
              $childrenArray[] = $levelOne[0];
              if ($levelOne[0]['leftside']!='') {
                  $leveltwo= getChildList($levelOne[0]['leftside'],3,$levelOne[0]['fid']);
                  //$leveltwo[0]['name']=$leveltwo[0]['name']." (Sponsor: ".$leveltwo[0]['sponsor_name']."/ Percentage: ".$leveltwo[0]['per'].")";
                  if (count($leveltwo)>0) {
                    $childrenArray[] = $leveltwo[0];
                    if ($leveltwo[0]['leftside']!='') {
                        $levelthree = getChildList($leveltwo[0]['leftside'],4,$leveltwo[0]['fid']);
                        //$levelthree[0]['name']=$levelthree[0]['name']." (Sponsor: ".$levelthree[0]['sponsor_name']."/ Percentage: ".$levelthree[0]['per'].")";
                        $childrenArray[] = $levelthree[0];
                         if (count($levelthree)>0) {
                            //$childrenArray[] = $levelthree[0];
                            if ($levelthree[0]['leftside']!='') {
                                $levelfour = getChildList($levelthree[0]['leftside'],5,$levelthree[0]['fid']);
                                //$levelfour[0]['name']=$levelfour[0]['name']." (Sponsor: ".$levelfour[0]['sponsor_name']."/ Percentage: ".$levelfour[0]['per'].")";
                                $childrenArray[] = $levelfour[0];
                                if (count($levelfour)>0) {
                                    //$childrenArray[] = $levelthree[0];
                                    if ($levelfour[0]['leftside']!='') {
                                        $levelfiv = getChildList($levelfour[0]['leftside'],6,$levelfour[0]['fid']);
                                       // $levelfiv[0]['name']=$levelfiv[0]['name']." (Sponsor: ".$levelfiv[0]['sponsor_name']."/ Percentage: ".$levelfiv[0]['per'].")";
                                        $childrenArray[] = $levelfiv[0];
										if (count($levelfiv)>0) {
											//$childrenArray[] = $levelthree[0];
											if ($levelfiv[0]['leftside']!='') {
												$levelsix = getChildList($levelfiv[0]['leftside'],7,$levelfiv[0]['fid']);
											   // print_r($levelfiv);
												//$levelsix[0]['name']=$levelsix[0]['name']." (Sponsor: ".$levelsix[0]['sponsor_name']."/ Percentage: ".$levelsix[0]['per'].")";
												$childrenArray[] = $levelsix[0];
												if (count($levelsix)>0) {
													//$childrenArray[] = $levelthree[0];
													if ($levelsix[0]['leftside']!='') {
														$levelseven = getChildList($levelsix[0]['leftside'],8,$levelsix[0]['fid']);
													   // print_r($levelfiv);
														//$levelseven[0]['name']=$levelseven[0]['name']." (Sponsor: ".$levelseven[0]['sponsor_name']."/ Percentage: ".$levelseven[0]['per'].")";
														$childrenArray[] = $levelseven[0];
													}
													if ($levelsix[0]['rightside']!='') {
														$levelseven = getChildList($levelsix[0]['rightside'],8,$levelsix[0]['fid']);
														//$levelseven[0]['name']=$levelseven[0]['name']." (Sponsor: ".$levelseven[0]['sponsor_name']."/ Percentage: ".$levelseven[0]['per'].")";
														$childrenArray[] = $levelseven[0];
													}
												}
											}
											if ($levelfiv[0]['rightside']!='') {
												$levelsix = getChildList($levelfiv[0]['rightside'],7,$levelfiv[0]['fid']);
												//$levelsix[0]['name']=$levelsix[0]['name']." (Sponsor: ".$levelsix[0]['sponsor_name']."/ Percentage: ".$levelsix[0]['per'].")";
												$childrenArray[] = $levelsix[0];
												if (count($levelsix)>0) {
													//$childrenArray[] = $levelthree[0];
													if ($levelsix[0]['leftside']!='') {
														$levelseven = getChildList($levelsix[0]['leftside'],8,$levelsix[0]['fid']);
													   // print_r($levelfiv);
														//$levelseven[0]['name']=$levelseven[0]['name']." (Sponsor: ".$levelseven[0]['sponsor_name']."/ Percentage: ".$levelseven[0]['per'].")";
														$childrenArray[] = $levelseven[0];
													}
													if ($levelsix[0]['rightside']!='') {
														$levelseven = getChildList($levelsix[0]['rightside'],8,$levelsix[0]['fid']);
														//$levelseven[0]['name']=$levelseven[0]['name']." (Sponsor: ".$levelseven[0]['sponsor_name']."/ Percentage: ".$levelseven[0]['per'].")";
														$childrenArray[] = $levelseven[0];
													}
												}
											}
										}
                                    }
                                    if ($levelfour[0]['rightside']!='') {
                                        $levelfiv = getChildList($levelfour[0]['rightside'],6,$levelfour[0]['fid']);
                                        // $levelfiv[0]['name']= $levelfiv[0]['name']."( Sponsor: ".$levelfiv[0]['sponsor_name']."/ Percentage: ".$levelfiv[0]['per'].")";
                                        $childrenArray[] = $levelfiv[0];
										if (count($levelfiv)>0) {
											//$childrenArray[] = $levelthree[0];
											if ($levelfiv[0]['leftside']!='') {
												$levelsix = getChildList($levelfiv[0]['leftside'],7,$levelfiv[0]['fid']);
											   // print_r($levelfiv);
												//$levelsix[0]['name']=$levelsix[0]['name']." (Sponsor: ".$levelsix[0]['sponsor_name']."/ Percentage: ".$levelsix[0]['per'].")";
												$childrenArray[] = $levelsix[0];
												if (count($levelsix)>0) {
													//$childrenArray[] = $levelthree[0];
													if ($levelsix[0]['leftside']!='') {
														$levelseven = getChildList($levelsix[0]['leftside'],8,$levelsix[0]['fid']);
													   // print_r($levelfiv);
														//$levelseven[0]['name']=$levelseven[0]['name']." (Sponsor: ".$levelseven[0]['sponsor_name']."/ Percentage: ".$levelseven[0]['per'].")";
														$childrenArray[] = $levelseven[0];
													}
													if ($levelsix[0]['rightside']!='') {
														$levelseven = getChildList($levelsix[0]['rightside'],8,$levelsix[0]['fid']);
														//$levelseven[0]['name']=$levelseven[0]['name']." (Sponsor: ".$levelseven[0]['sponsor_name']."/ Percentage: ".$levelseven[0]['per'].")";
														$childrenArray[] = $levelseven[0];
													}
												}
											}
											if ($levelfiv[0]['rightside']!='') {
												$levelsix = getChildList($levelfiv[0]['rightside'],7,$levelfiv[0]['fid']);
												//$levelsix[0]['name']=$levelsix[0]['name']." (Sponsor: ".$levelsix[0]['sponsor_name']."/ Percentage: ".$levelsix[0]['per'].")";
												$childrenArray[] = $levelsix[0];
												if (count($levelsix)>0) {
													//$childrenArray[] = $levelthree[0];
													if ($levelsix[0]['leftside']!='') {
														$levelseven = getChildList($levelsix[0]['leftside'],8,$levelsix[0]['fid']);
													   // print_r($levelfiv);
														//$levelseven[0]['name']=$levelseven[0]['name']." (Sponsor: ".$levelseven[0]['sponsor_name']."/ Percentage: ".$levelseven[0]['per'].")";
														$childrenArray[] = $levelseven[0];
													}
													if ($levelsix[0]['rightside']!='') {
														$levelseven = getChildList($levelsix[0]['rightside'],8,$levelsix[0]['fid']);
														//$levelseven[0]['name']=$levelseven[0]['name']." (Sponsor: ".$levelseven[0]['sponsor_name']."/ Percentage: ".$levelseven[0]['per'].")";
														$childrenArray[] = $levelseven[0];
													}
												}
											}
										}
                                    }
                                    
                                }
                            }
                            if ($levelthree[0]['rightside']!='') {
                                $levelfour = getChildList($levelthree[0]['rightside'],5,$levelthree[0]['fid']);
                               // $levelfour[0]['name']=$levelfour[0]['name']." (Sponsor: ".$levelfour[0]['sponsor_name']."/ Percentage: ".$levelfour[0]['per'].")";
                                $childrenArray[] = $levelfour[0];
                                if (count($levelfour)>0) {
                                    //$childrenArray[] = $levelthree[0];
                                    if ($levelfour[0]['leftside']!='') {
                                        $levelfiv = getChildList($levelfour[0]['leftside'],6,$levelfour[0]['fid']);
                                         //$levelfiv[0]['name']=$levelfiv[0]['name']." (Sponsor: ".$levelfiv[0]['sponsor_name']."/ Percentage: ".$levelfiv[0]['per'].")";
                                        $childrenArray[] = $levelfiv[0];
										if (count($levelfiv)>0) {
											//$childrenArray[] = $levelthree[0];
											if ($levelfiv[0]['leftside']!='') {
												$levelsix = getChildList($levelfiv[0]['leftside'],7,$levelfiv[0]['fid']);
											   // print_r($levelfiv);
												//$levelsix[0]['name']=$levelsix[0]['name']." (Sponsor: ".$levelsix[0]['sponsor_name']."/ Percentage: ".$levelsix[0]['per'].")";
												$childrenArray[] = $levelsix[0];
												if (count($levelsix)>0) {
													//$childrenArray[] = $levelthree[0];
													if ($levelsix[0]['leftside']!='') {
														$levelseven = getChildList($levelsix[0]['leftside'],8,$levelsix[0]['fid']);
													   // print_r($levelfiv);
														//$levelseven[0]['name']=$levelseven[0]['name']." (Sponsor: ".$levelseven[0]['sponsor_name']."/ Percentage: ".$levelseven[0]['per'].")";
														$childrenArray[] = $levelseven[0];
													}
													if ($levelsix[0]['rightside']!='') {
														$levelseven = getChildList($levelsix[0]['rightside'],8,$levelsix[0]['fid']);
														//$levelseven[0]['name']=$levelseven[0]['name']." (Sponsor: ".$levelseven[0]['sponsor_name']."/ Percentage: ".$levelseven[0]['per'].")";
														$childrenArray[] = $levelseven[0];
													}
												}
											}
											if ($levelfiv[0]['rightside']!='') {
												$levelsix = getChildList($levelfiv[0]['rightside'],7,$levelfiv[0]['fid']);
												//$levelsix[0]['name']=$levelsix[0]['name']." (Sponsor: ".$levelsix[0]['sponsor_name']."/ Percentage: ".$levelsix[0]['per'].")";
												$childrenArray[] = $levelsix[0];
												if (count($levelsix)>0) {
													//$childrenArray[] = $levelthree[0];
													if ($levelsix[0]['leftside']!='') {
														$levelseven = getChildList($levelsix[0]['leftside'],8,$levelsix[0]['fid']);
													   // print_r($levelfiv);
														//$levelseven[0]['name']=$levelseven[0]['name']." (Sponsor: ".$levelseven[0]['sponsor_name']."/ Percentage: ".$levelseven[0]['per'].")";
														$childrenArray[] = $levelseven[0];
													}
													if ($levelsix[0]['rightside']!='') {
														$levelseven = getChildList($levelsix[0]['rightside'],8,$levelsix[0]['fid']);
														//$levelseven[0]['name']=$levelseven[0]['name']." (Sponsor: ".$levelseven[0]['sponsor_name']."/ Percentage: ".$levelseven[0]['per'].")";
														$childrenArray[] = $levelseven[0];
													}
												}
											}
										}
                                    }
                                    if ($levelfour[0]['rightside']!='') {
                                        $levelfiv = getChildList($levelfour[0]['rightside'],6,$levelfour[0]['fid']);
                                        // $levelfiv[0]['name']= $levelfiv[0]['name']."( Sponsor: ".$levelfiv[0]['sponsor_name']."/ Percentage: ".$levelfiv[0]['per'].")";
                                        $childrenArray[] = $levelfiv[0];
										if (count($levelfiv)>0) {
											//$childrenArray[] = $levelthree[0];
											if ($levelfiv[0]['leftside']!='') {
												$levelsix = getChildList($levelfiv[0]['leftside'],7,$levelfiv[0]['fid']);
											   // print_r($levelfiv);
												//$levelsix[0]['name']=$levelsix[0]['name']." (Sponsor: ".$levelsix[0]['sponsor_name']."/ Percentage: ".$levelsix[0]['per'].")";
												$childrenArray[] = $levelsix[0];
												if (count($levelsix)>0) {
													//$childrenArray[] = $levelthree[0];
													if ($levelsix[0]['leftside']!='') {
														$levelseven = getChildList($levelsix[0]['leftside'],8,$levelsix[0]['fid']);
													   // print_r($levelfiv);
														//$levelseven[0]['name']=$levelseven[0]['name']." (Sponsor: ".$levelseven[0]['sponsor_name']."/ Percentage: ".$levelseven[0]['per'].")";
														$childrenArray[] = $levelseven[0];
													}
													if ($levelsix[0]['rightside']!='') {
														$levelseven = getChildList($levelsix[0]['rightside'],8,$levelsix[0]['fid']);
														//$levelseven[0]['name']=$levelseven[0]['name']." (Sponsor: ".$levelseven[0]['sponsor_name']."/ Percentage: ".$levelseven[0]['per'].")";
														$childrenArray[] = $levelseven[0];
													}
												}
											}
											if ($levelfiv[0]['rightside']!='') {
												$levelsix = getChildList($levelfiv[0]['rightside'],7,$levelfiv[0]['fid']);
												//$levelsix[0]['name']=$levelsix[0]['name']." (Sponsor: ".$levelsix[0]['sponsor_name']."/ Percentage: ".$levelsix[0]['per'].")";
												$childrenArray[] = $levelsix[0];
												if (count($levelsix)>0) {
													//$childrenArray[] = $levelthree[0];
													if ($levelsix[0]['leftside']!='') {
														$levelseven = getChildList($levelsix[0]['leftside'],8,$levelsix[0]['fid']);
													   // print_r($levelfiv);
														//$levelseven[0]['name']=$levelseven[0]['name']." (Sponsor: ".$levelseven[0]['sponsor_name']."/ Percentage: ".$levelseven[0]['per'].")";
														$childrenArray[] = $levelseven[0];
													}
													if ($levelsix[0]['rightside']!='') {
														$levelseven = getChildList($levelsix[0]['rightside'],8,$levelsix[0]['fid']);
														//$levelseven[0]['name']=$levelseven[0]['name']." (Sponsor: ".$levelseven[0]['sponsor_name']."/ Percentage: ".$levelseven[0]['per'].")";
														$childrenArray[] = $levelseven[0];
													}
												}
											}
										}
                                    }
                                    
                                }
                            }
                        }
                    }
                    if ($leveltwo[0]['rightside']!='') {
                        $levelthree = getChildList($leveltwo[0]['rightside'],4,$leveltwo[0]['fid']);
                        //$levelthree[0]['name']=$levelthree[0]['name']." (Sponsor: ".$levelthree[0]['sponsor_name']."/ Percentage: ".$levelthree[0]['per'].")";
                        $childrenArray[] = $levelthree[0];
                         if (count($levelthree)>0) {
                            //$childrenArray[] = $levelthree[0];
                            if ($levelthree[0]['leftside']!='') {
                                $levelfour = getChildList($levelthree[0]['leftside'],5,$levelthree[0]['fid']);
                                //$levelfour[0]['name']=$levelfour[0]['name']." (Sponsor: ".$levelfour[0]['sponsor_name']."/ Percentage: ".$levelfour[0]['per'].")";
                                $childrenArray[] = $levelfour[0];
                                if (count($levelfour)>0) {
                                    //$childrenArray[] = $levelthree[0];
                                    if ($levelfour[0]['leftside']!='') {
                                        $levelfiv = getChildList($levelfour[0]['leftside'],6,$levelfour[0]['fid']);
                                         //$levelfiv[0]['name']=$levelfiv[0]['name']." (Sponsor: ".$levelfiv[0]['sponsor_name']."/ Percentage: ".$levelfiv[0]['per'].")";
                                        $childrenArray[] = $levelfiv[0];
										if (count($levelfiv)>0) {
											//$childrenArray[] = $levelthree[0];
											if ($levelfiv[0]['leftside']!='') {
												$levelsix = getChildList($levelfiv[0]['leftside'],7,$levelfiv[0]['fid']);
											   // print_r($levelfiv);
												//$levelsix[0]['name']=$levelsix[0]['name']." (Sponsor: ".$levelsix[0]['sponsor_name']."/ Percentage: ".$levelsix[0]['per'].")";
												$childrenArray[] = $levelsix[0];
												if (count($levelsix)>0) {
													//$childrenArray[] = $levelthree[0];
													if ($levelsix[0]['leftside']!='') {
														$levelseven = getChildList($levelsix[0]['leftside'],8,$levelsix[0]['fid']);
													   // print_r($levelfiv);
														//$levelseven[0]['name']=$levelseven[0]['name']." (Sponsor: ".$levelseven[0]['sponsor_name']."/ Percentage: ".$levelseven[0]['per'].")";
														$childrenArray[] = $levelseven[0];
													}
													if ($levelsix[0]['rightside']!='') {
														$levelseven = getChildList($levelsix[0]['rightside'],8,$levelsix[0]['fid']);
														//$levelseven[0]['name']=$levelseven[0]['name']." (Sponsor: ".$levelseven[0]['sponsor_name']."/ Percentage: ".$levelseven[0]['per'].")";
														$childrenArray[] = $levelseven[0];
													}
												}
											}
											if ($levelfiv[0]['rightside']!='') {
												$levelsix = getChildList($levelfiv[0]['rightside'],7,$levelfiv[0]['fid']);
												//$levelsix[0]['name']=$levelsix[0]['name']." (Sponsor: ".$levelsix[0]['sponsor_name']."/ Percentage: ".$levelsix[0]['per'].")";
												$childrenArray[] = $levelsix[0];
												if (count($levelsix)>0) {
													//$childrenArray[] = $levelthree[0];
													if ($levelsix[0]['leftside']!='') {
														$levelseven = getChildList($levelsix[0]['leftside'],8,$levelsix[0]['fid']);
													   // print_r($levelfiv);
														//$levelseven[0]['name']=$levelseven[0]['name']." (Sponsor: ".$levelseven[0]['sponsor_name']."/ Percentage: ".$levelseven[0]['per'].")";
														$childrenArray[] = $levelseven[0];
													}
													if ($levelsix[0]['rightside']!='') {
														$levelseven = getChildList($levelsix[0]['rightside'],8,$levelsix[0]['fid']);
														//$levelseven[0]['name']=$levelseven[0]['name']." (Sponsor: ".$levelseven[0]['sponsor_name']."/ Percentage: ".$levelseven[0]['per'].")";
														$childrenArray[] = $levelseven[0];
													}
												}
											}
										}
                                    }
                                    if ($levelfour[0]['rightside']!='') {
                                        $levelfiv = getChildList($levelfour[0]['rightside'],6,$levelfour[0]['fid']);
                                         //$levelfiv[0]['name']= $levelfiv[0]['name']."( Sponsor: ".$levelfiv[0]['sponsor_name']."/ Percentage: ".$levelfiv[0]['per'].")";
                                        $childrenArray[] = $levelfiv[0];
										if (count($levelfiv)>0) {
											//$childrenArray[] = $levelthree[0];
											if ($levelfiv[0]['leftside']!='') {
												$levelsix = getChildList($levelfiv[0]['leftside'],7,$levelfiv[0]['fid']);
											   // print_r($levelfiv);
												//$levelsix[0]['name']=$levelsix[0]['name']." (Sponsor: ".$levelsix[0]['sponsor_name']."/ Percentage: ".$levelsix[0]['per'].")";
												$childrenArray[] = $levelsix[0];
												if (count($levelsix)>0) {
													//$childrenArray[] = $levelthree[0];
													if ($levelsix[0]['leftside']!='') {
														$levelseven = getChildList($levelsix[0]['leftside'],8,$levelsix[0]['fid']);
													   // print_r($levelfiv);
														//$levelseven[0]['name']=$levelseven[0]['name']." (Sponsor: ".$levelseven[0]['sponsor_name']."/ Percentage: ".$levelseven[0]['per'].")";
														$childrenArray[] = $levelseven[0];
													}
													if ($levelsix[0]['rightside']!='') {
														$levelseven = getChildList($levelsix[0]['rightside'],8,$levelsix[0]['fid']);
														//$levelseven[0]['name']=$levelseven[0]['name']." (Sponsor: ".$levelseven[0]['sponsor_name']."/ Percentage: ".$levelseven[0]['per'].")";
														$childrenArray[] = $levelseven[0];
													}
												}
											}
											if ($levelfiv[0]['rightside']!='') {
												$levelsix = getChildList($levelfiv[0]['rightside'],7,$levelfiv[0]['fid']);
												//$levelsix[0]['name']=$levelsix[0]['name']." (Sponsor: ".$levelsix[0]['sponsor_name']."/ Percentage: ".$levelsix[0]['per'].")";
												$childrenArray[] = $levelsix[0];
												if (count($levelsix)>0) {
													//$childrenArray[] = $levelthree[0];
													if ($levelsix[0]['leftside']!='') {
														$levelseven = getChildList($levelsix[0]['leftside'],8,$levelsix[0]['fid']);
													   // print_r($levelfiv);
														//$levelseven[0]['name']=$levelseven[0]['name']." (Sponsor: ".$levelseven[0]['sponsor_name']."/ Percentage: ".$levelseven[0]['per'].")";
														$childrenArray[] = $levelseven[0];
													}
													if ($levelsix[0]['rightside']!='') {
														$levelseven = getChildList($levelsix[0]['rightside'],8,$levelsix[0]['fid']);
														//$levelseven[0]['name']=$levelseven[0]['name']." (Sponsor: ".$levelseven[0]['sponsor_name']."/ Percentage: ".$levelseven[0]['per'].")";
														$childrenArray[] = $levelseven[0];
													}
												}
											}
										}
                                    }
                                    
                                }
                            }
                            if ($levelthree[0]['rightside']!='') {
                                $levelfour = getChildList($levelthree[0]['rightside'],5,$levelthree[0]['fid']);
                                //$levelfour[0]['name']= $levelfour[0]['name']." (Sponsor: ".$levelfour[0]['sponsor_name']."/ Percentage: ".$levelfour[0]['per'].")";
                                $childrenArray[] = $levelfour[0];
                                if (count($levelfour)>0) {
                                    //$childrenArray[] = $levelthree[0];
                                    if ($levelfour[0]['leftside']!='') {
                                        $levelfiv = getChildList($levelfour[0]['leftside'],6,$levelfour[0]['fid']);
                                         //$levelfiv[0]['name']=$levelfiv[0]['name']." (Sponsor: ".$levelfiv[0]['sponsor_name']."/ Percentage: ".$levelfiv[0]['per'].")";
                                        $childrenArray[] = $levelfiv[0];
										if (count($levelfiv)>0) {
											//$childrenArray[] = $levelthree[0];
											if ($levelfiv[0]['leftside']!='') {
												$levelsix = getChildList($levelfiv[0]['leftside'],7,$levelfiv[0]['fid']);
											   // print_r($levelfiv);
												//$levelsix[0]['name']=$levelsix[0]['name']." (Sponsor: ".$levelsix[0]['sponsor_name']."/ Percentage: ".$levelsix[0]['per'].")";
												$childrenArray[] = $levelsix[0];
												if (count($levelsix)>0) {
													//$childrenArray[] = $levelthree[0];
													if ($levelsix[0]['leftside']!='') {
														$levelseven = getChildList($levelsix[0]['leftside'],8,$levelsix[0]['fid']);
													   // print_r($levelfiv);
														//$levelseven[0]['name']=$levelseven[0]['name']." (Sponsor: ".$levelseven[0]['sponsor_name']."/ Percentage: ".$levelseven[0]['per'].")";
														$childrenArray[] = $levelseven[0];
													}
													if ($levelsix[0]['rightside']!='') {
														$levelseven = getChildList($levelsix[0]['rightside'],8,$levelsix[0]['fid']);
														//$levelseven[0]['name']=$levelseven[0]['name']." (Sponsor: ".$levelseven[0]['sponsor_name']."/ Percentage: ".$levelseven[0]['per'].")";
														$childrenArray[] = $levelseven[0];
													}
												}
											}
											if ($levelfiv[0]['rightside']!='') {
												$levelsix = getChildList($levelfiv[0]['rightside'],7,$levelfiv[0]['fid']);
												//$levelsix[0]['name']=$levelsix[0]['name']." (Sponsor: ".$levelsix[0]['sponsor_name']."/ Percentage: ".$levelsix[0]['per'].")";
												$childrenArray[] = $levelsix[0];
												if (count($levelsix)>0) {
													//$childrenArray[] = $levelthree[0];
													if ($levelsix[0]['leftside']!='') {
														$levelseven = getChildList($levelsix[0]['leftside'],8,$levelsix[0]['fid']);
													   // print_r($levelfiv);
														//$levelseven[0]['name']=$levelseven[0]['name']." (Sponsor: ".$levelseven[0]['sponsor_name']."/ Percentage: ".$levelseven[0]['per'].")";
														$childrenArray[] = $levelseven[0];
													}
													if ($levelsix[0]['rightside']!='') {
														$levelseven = getChildList($levelsix[0]['rightside'],8,$levelsix[0]['fid']);
														//$levelseven[0]['name']=$levelseven[0]['name']." (Sponsor: ".$levelseven[0]['sponsor_name']."/ Percentage: ".$levelseven[0]['per'].")";
														$childrenArray[] = $levelseven[0];
													}
												}
											}
										}
                                    }
                                    if ($levelfour[0]['rightside']!='') {
                                        $levelfiv = getChildList($levelfour[0]['rightside'],6,$levelfour[0]['fid']);
                                         //$levelfiv[0]['name']= $levelfiv[0]['name']."( Sponsor: ".$levelfiv[0]['sponsor_name']."/ Percentage: ".$levelfiv[0]['per'].")";
                                        $childrenArray[] = $levelfiv[0];
										if (count($levelfiv)>0) {
											//$childrenArray[] = $levelthree[0];
											if ($levelfiv[0]['leftside']!='') {
												$levelsix = getChildList($levelfiv[0]['leftside'],7,$levelfiv[0]['fid']);
											   // print_r($levelfiv);
												//$levelsix[0]['name']=$levelsix[0]['name']." (Sponsor: ".$levelsix[0]['sponsor_name']."/ Percentage: ".$levelsix[0]['per'].")";
												$childrenArray[] = $levelsix[0];
												if (count($levelsix)>0) {
													//$childrenArray[] = $levelthree[0];
													if ($levelsix[0]['leftside']!='') {
														$levelseven = getChildList($levelsix[0]['leftside'],8,$levelsix[0]['fid']);
													   // print_r($levelfiv);
														//$levelseven[0]['name']=$levelseven[0]['name']." (Sponsor: ".$levelseven[0]['sponsor_name']."/ Percentage: ".$levelseven[0]['per'].")";
														$childrenArray[] = $levelseven[0];
													}
													if ($levelsix[0]['rightside']!='') {
														$levelseven = getChildList($levelsix[0]['rightside'],8,$levelsix[0]['fid']);
														//$levelseven[0]['name']=$levelseven[0]['name']." (Sponsor: ".$levelseven[0]['sponsor_name']."/ Percentage: ".$levelseven[0]['per'].")";
														$childrenArray[] = $levelseven[0];
													}
												}
											}
											if ($levelfiv[0]['rightside']!='') {
												$levelsix = getChildList($levelfiv[0]['rightside'],7,$levelfiv[0]['fid']);
												//$levelsix[0]['name']=$levelsix[0]['name']." (Sponsor: ".$levelsix[0]['sponsor_name']."/ Percentage: ".$levelsix[0]['per'].")";
												$childrenArray[] = $levelsix[0];
												if (count($levelsix)>0) {
													//$childrenArray[] = $levelthree[0];
													if ($levelsix[0]['leftside']!='') {
														$levelseven = getChildList($levelsix[0]['leftside'],8,$levelsix[0]['fid']);
													   // print_r($levelfiv);
														//$levelseven[0]['name']=$levelseven[0]['name']." (Sponsor: ".$levelseven[0]['sponsor_name']."/ Percentage: ".$levelseven[0]['per'].")";
														$childrenArray[] = $levelseven[0];
													}
													if ($levelsix[0]['rightside']!='') {
														$levelseven = getChildList($levelsix[0]['rightside'],8,$levelsix[0]['fid']);
														//$levelseven[0]['name']=$levelseven[0]['name']." (Sponsor: ".$levelseven[0]['sponsor_name']."/ Percentage: ".$levelseven[0]['per'].")";
														$childrenArray[] = $levelseven[0];
													}
												}
											}
										}
                                    }
                                   
                                }
                            }
                        }
                    }
                  }  
              }
              if ($levelOne[0]['rightside']!='') {
                  $leveltwo= getChildList($levelOne[0]['rightside'],3,$levelOne[0]['fid']);
                  // $leveltwo[0]['name']= $leveltwo[0]['name']." (Sponsor: ".$leveltwo[0]['sponsor_name']."/ Percentage: ".$leveltwo[0]['per'].")";
                  if (count($leveltwo)>0) {
                    $childrenArray[] = $leveltwo[0];
                    if ($leveltwo[0]['leftside']!='') {
                        $levelthree = getChildList($leveltwo[0]['leftside'],4,$leveltwo[0]['fid']);
                        //$levelthree[0]['name']=$levelthree[0]['name']." (Sponsor: ".$levelthree[0]['sponsor_name']."/ Percentage: ".$levelthree[0]['per'].")";
                        $childrenArray[] = $levelthree[0];
                         if (count($levelthree)>0) {
                            //$childrenArray[] = $levelthree[0];
                            if ($levelthree[0]['leftside']!='') {
                                $levelfour = getChildList($levelthree[0]['leftside'],5,$levelthree[0]['fid']);
                                //$levelfour[0]['name']=$levelfour[0]['name']." (Sponsor: ".$levelfour[0]['sponsor_name']."/ Percentage: ".$levelfour[0]['per'].")";
                                $childrenArray[] = $levelfour[0];
                                if (count($levelfour)>0) {
                                    //$childrenArray[] = $levelthree[0];
                                    if ($levelfour[0]['leftside']!='') {
                                        $levelfiv = getChildList($levelfour[0]['leftside'],6,$levelfour[0]['fid']);
                                         //$levelfiv[0]['name']=$levelfiv[0]['name']." (Sponsor: ".$levelfiv[0]['sponsor_name']."/ Percentage: ".$levelfiv[0]['per'].")";
                                        $childrenArray[] = $levelfiv[0];
										if (count($levelfiv)>0) {
											//$childrenArray[] = $levelthree[0];
											if ($levelfiv[0]['leftside']!='') {
												$levelsix = getChildList($levelfiv[0]['leftside'],7,$levelfiv[0]['fid']);
											   // print_r($levelfiv);
												//$levelsix[0]['name']=$levelsix[0]['name']." (Sponsor: ".$levelsix[0]['sponsor_name']."/ Percentage: ".$levelsix[0]['per'].")";
												$childrenArray[] = $levelsix[0];
												if (count($levelsix)>0) {
													//$childrenArray[] = $levelthree[0];
													if ($levelsix[0]['leftside']!='') {
														$levelseven = getChildList($levelsix[0]['leftside'],8,$levelsix[0]['fid']);
													   // print_r($levelfiv);
														//$levelseven[0]['name']=$levelseven[0]['name']." (Sponsor: ".$levelseven[0]['sponsor_name']."/ Percentage: ".$levelseven[0]['per'].")";
														$childrenArray[] = $levelseven[0];
													}
													if ($levelsix[0]['rightside']!='') {
														$levelseven = getChildList($levelsix[0]['rightside'],8,$levelsix[0]['fid']);
														//$levelseven[0]['name']=$levelseven[0]['name']." (Sponsor: ".$levelseven[0]['sponsor_name']."/ Percentage: ".$levelseven[0]['per'].")";
														$childrenArray[] = $levelseven[0];
													}
												}
											}
											if ($levelfiv[0]['rightside']!='') {
												$levelsix = getChildList($levelfiv[0]['rightside'],7,$levelfiv[0]['fid']);
												//$levelsix[0]['name']=$levelsix[0]['name']." (Sponsor: ".$levelsix[0]['sponsor_name']."/ Percentage: ".$levelsix[0]['per'].")";
												$childrenArray[] = $levelsix[0];
												if (count($levelsix)>0) {
													//$childrenArray[] = $levelthree[0];
													if ($levelsix[0]['leftside']!='') {
														$levelseven = getChildList($levelsix[0]['leftside'],8,$levelsix[0]['fid']);
													   // print_r($levelfiv);
														//$levelseven[0]['name']=$levelseven[0]['name']." (Sponsor: ".$levelseven[0]['sponsor_name']."/ Percentage: ".$levelseven[0]['per'].")";
														$childrenArray[] = $levelseven[0];
													}
													if ($levelsix[0]['rightside']!='') {
														$levelseven = getChildList($levelsix[0]['rightside'],8,$levelsix[0]['fid']);
														//$levelseven[0]['name']=$levelseven[0]['name']." (Sponsor: ".$levelseven[0]['sponsor_name']."/ Percentage: ".$levelseven[0]['per'].")";
														$childrenArray[] = $levelseven[0];
													}
												}
											}
										}
                                    }
                                    if ($levelfour[0]['rightside']!='') {
                                        $levelfiv = getChildList($levelfour[0]['rightside'],6,$levelfour[0]['fid']);
                                         //$levelfiv[0]['name']= $levelfiv[0]['name']."( Sponsor: ".$levelfiv[0]['sponsor_name']."/ Percentage: ".$levelfiv[0]['per'].")";
                                        $childrenArray[] = $levelfiv[0];
										if (count($levelfiv)>0) {
											//$childrenArray[] = $levelthree[0];
											if ($levelfiv[0]['leftside']!='') {
												$levelsix = getChildList($levelfiv[0]['leftside'],7,$levelfiv[0]['fid']);
											   // print_r($levelfiv);
												//$levelsix[0]['name']=$levelsix[0]['name']." (Sponsor: ".$levelsix[0]['sponsor_name']."/ Percentage: ".$levelsix[0]['per'].")";
												$childrenArray[] = $levelsix[0];
												if (count($levelsix)>0) {
													//$childrenArray[] = $levelthree[0];
													if ($levelsix[0]['leftside']!='') {
														$levelseven = getChildList($levelsix[0]['leftside'],8,$levelsix[0]['fid']);
													   // print_r($levelfiv);
														//$levelseven[0]['name']=$levelseven[0]['name']." (Sponsor: ".$levelseven[0]['sponsor_name']."/ Percentage: ".$levelseven[0]['per'].")";
														$childrenArray[] = $levelseven[0];
													}
													if ($levelsix[0]['rightside']!='') {
														$levelseven = getChildList($levelsix[0]['rightside'],8,$levelsix[0]['fid']);
														//$levelseven[0]['name']=$levelseven[0]['name']." (Sponsor: ".$levelseven[0]['sponsor_name']."/ Percentage: ".$levelseven[0]['per'].")";
														$childrenArray[] = $levelseven[0];
													}
												}
											}
											if ($levelfiv[0]['rightside']!='') {
												$levelsix = getChildList($levelfiv[0]['rightside'],7,$levelfiv[0]['fid']);
												//$levelsix[0]['name']=$levelsix[0]['name']." (Sponsor: ".$levelsix[0]['sponsor_name']."/ Percentage: ".$levelsix[0]['per'].")";
												$childrenArray[] = $levelsix[0];
												if (count($levelsix)>0) {
													//$childrenArray[] = $levelthree[0];
													if ($levelsix[0]['leftside']!='') {
														$levelseven = getChildList($levelsix[0]['leftside'],8,$levelsix[0]['fid']);
													   // print_r($levelfiv);
														//$levelseven[0]['name']=$levelseven[0]['name']." (Sponsor: ".$levelseven[0]['sponsor_name']."/ Percentage: ".$levelseven[0]['per'].")";
														$childrenArray[] = $levelseven[0];
													}
													if ($levelsix[0]['rightside']!='') {
														$levelseven = getChildList($levelsix[0]['rightside'],8,$levelsix[0]['fid']);
														//$levelseven[0]['name']=$levelseven[0]['name']." (Sponsor: ".$levelseven[0]['sponsor_name']."/ Percentage: ".$levelseven[0]['per'].")";
														$childrenArray[] = $levelseven[0];
													}
												}
											}
										}
                                    }
                                    
                                }
                            }
                            if ($levelthree[0]['rightside']!='') {
                                $levelfour = getChildList($levelthree[0]['rightside'],5,$levelthree[0]['fid']);
                                //$levelfour[0]['name']=$levelfour[0]['name']."( Sponsor: ".$levelfour[0]['sponsor_name']."/ Percentage: ".$levelfour[0]['per'].")";
                                $childrenArray[] = $levelfour[0];
                                if (count($levelfour)>0) {
                                    //$childrenArray[] = $levelthree[0];
                                    if ($levelfour[0]['leftside']!='') {
                                        $levelfiv = getChildList($levelfour[0]['leftside'],6,$levelfour[0]['fid']);
                                         //$levelfiv[0]['name']=$levelfiv[0]['name']." (Sponsor: ".$levelfiv[0]['sponsor_name']."/ Percentage: ".$levelfiv[0]['per'].")";
                                        $childrenArray[] = $levelfiv[0];
										if (count($levelfiv)>0) {
											//$childrenArray[] = $levelthree[0];
											if ($levelfiv[0]['leftside']!='') {
												$levelsix = getChildList($levelfiv[0]['leftside'],7,$levelfiv[0]['fid']);
											   // print_r($levelfiv);
												//$levelsix[0]['name']=$levelsix[0]['name']." (Sponsor: ".$levelsix[0]['sponsor_name']."/ Percentage: ".$levelsix[0]['per'].")";
												$childrenArray[] = $levelsix[0];
												if (count($levelsix)>0) {
													//$childrenArray[] = $levelthree[0];
													if ($levelsix[0]['leftside']!='') {
														$levelseven = getChildList($levelsix[0]['leftside'],8,$levelsix[0]['fid']);
													   // print_r($levelfiv);
														//$levelseven[0]['name']=$levelseven[0]['name']." (Sponsor: ".$levelseven[0]['sponsor_name']."/ Percentage: ".$levelseven[0]['per'].")";
														$childrenArray[] = $levelseven[0];
													}
													if ($levelsix[0]['rightside']!='') {
														$levelseven = getChildList($levelsix[0]['rightside'],8,$levelsix[0]['fid']);
														//$levelseven[0]['name']=$levelseven[0]['name']." (Sponsor: ".$levelseven[0]['sponsor_name']."/ Percentage: ".$levelseven[0]['per'].")";
														$childrenArray[] = $levelseven[0];
													}
												}
											}
											if ($levelfiv[0]['rightside']!='') {
												$levelsix = getChildList($levelfiv[0]['rightside'],7,$levelfiv[0]['fid']);
												//$levelsix[0]['name']=$levelsix[0]['name']." (Sponsor: ".$levelsix[0]['sponsor_name']."/ Percentage: ".$levelsix[0]['per'].")";
												$childrenArray[] = $levelsix[0];
												if (count($levelsix)>0) {
													//$childrenArray[] = $levelthree[0];
													if ($levelsix[0]['leftside']!='') {
														$levelseven = getChildList($levelsix[0]['leftside'],8,$levelsix[0]['fid']);
													   // print_r($levelfiv);
														//$levelseven[0]['name']=$levelseven[0]['name']." (Sponsor: ".$levelseven[0]['sponsor_name']."/ Percentage: ".$levelseven[0]['per'].")";
														$childrenArray[] = $levelseven[0];
													}
													if ($levelsix[0]['rightside']!='') {
														$levelseven = getChildList($levelsix[0]['rightside'],8,$levelsix[0]['fid']);
														//$levelseven[0]['name']=$levelseven[0]['name']." (Sponsor: ".$levelseven[0]['sponsor_name']."/ Percentage: ".$levelseven[0]['per'].")";
														$childrenArray[] = $levelseven[0];
													}
												}
											}
										}
                                    }
                                    if ($levelfour[0]['rightside']!='') {
                                        $levelfiv = getChildList($levelfour[0]['rightside'],6,$levelfour[0]['fid']);
                                        // $levelfiv[0]['name']= $levelfiv[0]['name']."( Sponsor: ".$levelfiv[0]['sponsor_name']."/ Percentage: ".$levelfiv[0]['per'].")";
                                        $childrenArray[] = $levelfiv[0];
										if (count($levelfiv)>0) {
											//$childrenArray[] = $levelthree[0];
											if ($levelfiv[0]['leftside']!='') {
												$levelsix = getChildList($levelfiv[0]['leftside'],7,$levelfiv[0]['fid']);
											   // print_r($levelfiv);
												//$levelsix[0]['name']=$levelsix[0]['name']." (Sponsor: ".$levelsix[0]['sponsor_name']."/ Percentage: ".$levelsix[0]['per'].")";
												$childrenArray[] = $levelsix[0];
												if (count($levelsix)>0) {
													//$childrenArray[] = $levelthree[0];
													if ($levelsix[0]['leftside']!='') {
														$levelseven = getChildList($levelsix[0]['leftside'],8,$levelsix[0]['fid']);
													   // print_r($levelfiv);
														//$levelseven[0]['name']=$levelseven[0]['name']." (Sponsor: ".$levelseven[0]['sponsor_name']."/ Percentage: ".$levelseven[0]['per'].")";
														$childrenArray[] = $levelseven[0];
													}
													if ($levelsix[0]['rightside']!='') {
														$levelseven = getChildList($levelsix[0]['rightside'],8,$levelsix[0]['fid']);
														//$levelseven[0]['name']=$levelseven[0]['name']." (Sponsor: ".$levelseven[0]['sponsor_name']."/ Percentage: ".$levelseven[0]['per'].")";
														$childrenArray[] = $levelseven[0];
													}
												}
											}
											if ($levelfiv[0]['rightside']!='') {
												$levelsix = getChildList($levelfiv[0]['rightside'],7,$levelfiv[0]['fid']);
												//$levelsix[0]['name']=$levelsix[0]['name']." (Sponsor: ".$levelsix[0]['sponsor_name']."/ Percentage: ".$levelsix[0]['per'].")";
												$childrenArray[] = $levelsix[0];
												if (count($levelsix)>0) {
													//$childrenArray[] = $levelthree[0];
													if ($levelsix[0]['leftside']!='') {
														$levelseven = getChildList($levelsix[0]['leftside'],8,$levelsix[0]['fid']);
													   // print_r($levelfiv);
														//$levelseven[0]['name']=$levelseven[0]['name']." (Sponsor: ".$levelseven[0]['sponsor_name']."/ Percentage: ".$levelseven[0]['per'].")";
														$childrenArray[] = $levelseven[0];
													}
													if ($levelsix[0]['rightside']!='') {
														$levelseven = getChildList($levelsix[0]['rightside'],8,$levelsix[0]['fid']);
														//$levelseven[0]['name']=$levelseven[0]['name']." (Sponsor: ".$levelseven[0]['sponsor_name']."/ Percentage: ".$levelseven[0]['per'].")";
														$childrenArray[] = $levelseven[0];
													}
												}
											}
										}
                                    }
                                    
                                }
                            }
                        }
                    }
                    if ($leveltwo[0]['rightside']!='') {
                        $levelthree = getChildList($leveltwo[0]['rightside'],4,$leveltwo[0]['fid']);
                          //$levelthree[0]['name']=$levelthree[0]['name']." (Sponsor: ".$levelthree[0]['sponsor_name']."/ Percentage: ".$levelthree[0]['per'].")";
                        $childrenArray[] = $levelthree[0];
                         if (count($levelthree)>0) {
                            //$childrenArray[] = $levelthree[0];
                            if ($levelthree[0]['leftside']!='') {
                                $levelfour = getChildList($levelthree[0]['leftside'],5,$levelthree[0]['fid']);
                                 //$levelfour[0]['name']= $levelfour[0]['name']." (Sponsor: ".$levelfour[0]['sponsor_name']."/ Percentage: ".$levelfour[0]['per'].")";
                                $childrenArray[] = $levelfour[0];
                                if (count($levelfour)>0) {
                                    //$childrenArray[] = $levelthree[0];
                                    if ($levelfour[0]['leftside']!='') {
                                        $levelfiv = getChildList($levelfour[0]['leftside'],6,$levelfour[0]['fid']);
                                        //$levelfiv[0]['name']=$levelfiv[0]['name']." (Sponsor: ".$levelfiv[0]['sponsor_name']."/ Percentage: ".$levelfiv[0]['per'].")";
                                        $childrenArray[] = $levelfiv[0];
										if (count($levelfiv)>0) {
											//$childrenArray[] = $levelthree[0];
											if ($levelfiv[0]['leftside']!='') {
												$levelsix = getChildList($levelfiv[0]['leftside'],7,$levelfiv[0]['fid']);
											   // print_r($levelfiv);
												//$levelsix[0]['name']=$levelsix[0]['name']." (Sponsor: ".$levelsix[0]['sponsor_name']."/ Percentage: ".$levelsix[0]['per'].")";
												$childrenArray[] = $levelsix[0];
												if (count($levelsix)>0) {
													//$childrenArray[] = $levelthree[0];
													if ($levelsix[0]['leftside']!='') {
														$levelseven = getChildList($levelsix[0]['leftside'],8,$levelsix[0]['fid']);
													   // print_r($levelfiv);
														//$levelseven[0]['name']=$levelseven[0]['name']." (Sponsor: ".$levelseven[0]['sponsor_name']."/ Percentage: ".$levelseven[0]['per'].")";
														$childrenArray[] = $levelseven[0];
													}
													if ($levelsix[0]['rightside']!='') {
														$levelseven = getChildList($levelsix[0]['rightside'],8,$levelsix[0]['fid']);
														//$levelseven[0]['name']=$levelseven[0]['name']." (Sponsor: ".$levelseven[0]['sponsor_name']."/ Percentage: ".$levelseven[0]['per'].")";
														$childrenArray[] = $levelseven[0];
													}
												}
											}
											if ($levelfiv[0]['rightside']!='') {
												$levelsix = getChildList($levelfiv[0]['rightside'],7,$levelfiv[0]['fid']);
												//$levelsix[0]['name']=$levelsix[0]['name']." (Sponsor: ".$levelsix[0]['sponsor_name']."/ Percentage: ".$levelsix[0]['per'].")";
												$childrenArray[] = $levelsix[0];
												if (count($levelsix)>0) {
													//$childrenArray[] = $levelthree[0];
													if ($levelsix[0]['leftside']!='') {
														$levelseven = getChildList($levelsix[0]['leftside'],8,$levelsix[0]['fid']);
													   // print_r($levelfiv);
														//$levelseven[0]['name']=$levelseven[0]['name']." (Sponsor: ".$levelseven[0]['sponsor_name']."/ Percentage: ".$levelseven[0]['per'].")";
														$childrenArray[] = $levelseven[0];
													}
													if ($levelsix[0]['rightside']!='') {
														$levelseven = getChildList($levelsix[0]['rightside'],8,$levelsix[0]['fid']);
														//$levelseven[0]['name']=$levelseven[0]['name']." (Sponsor: ".$levelseven[0]['sponsor_name']."/ Percentage: ".$levelseven[0]['per'].")";
														$childrenArray[] = $levelseven[0];
													}
												}
											}
										}
                                    }
                                    if ($levelfour[0]['rightside']!='') {
                                        $levelfiv = getChildList($levelfour[0]['rightside'],6,$levelfour[0]['fid']);
                                        //$levelfiv[0]['name']= $levelfiv[0]['name']."( Sponsor: ".$levelfiv[0]['sponsor_name']."/ Percentage: ".$levelfiv[0]['per'].")";
                                        $childrenArray[] = $levelfiv[0];
										if (count($levelfiv)>0) {
											//$childrenArray[] = $levelthree[0];
											if ($levelfiv[0]['leftside']!='') {
												$levelsix = getChildList($levelfiv[0]['leftside'],7,$levelfiv[0]['fid']);
											   // print_r($levelfiv);
												//$levelsix[0]['name']=$levelsix[0]['name']." (Sponsor: ".$levelsix[0]['sponsor_name']."/ Percentage: ".$levelsix[0]['per'].")";
												$childrenArray[] = $levelsix[0];
												if (count($levelsix)>0) {
													//$childrenArray[] = $levelthree[0];
													if ($levelsix[0]['leftside']!='') {
														$levelseven = getChildList($levelsix[0]['leftside'],8,$levelsix[0]['fid']);
													   // print_r($levelfiv);
														//$levelseven[0]['name']=$levelseven[0]['name']." (Sponsor: ".$levelseven[0]['sponsor_name']."/ Percentage: ".$levelseven[0]['per'].")";
														$childrenArray[] = $levelseven[0];
													}
													if ($levelsix[0]['rightside']!='') {
														$levelseven = getChildList($levelsix[0]['rightside'],8,$levelsix[0]['fid']);
														//$levelseven[0]['name']=$levelseven[0]['name']." (Sponsor: ".$levelseven[0]['sponsor_name']."/ Percentage: ".$levelseven[0]['per'].")";
														$childrenArray[] = $levelseven[0];
													}
												}
											}
											if ($levelfiv[0]['rightside']!='') {
												$levelsix = getChildList($levelfiv[0]['rightside'],7,$levelfiv[0]['fid']);
												//$levelsix[0]['name']=$levelsix[0]['name']." (Sponsor: ".$levelsix[0]['sponsor_name']."/ Percentage: ".$levelsix[0]['per'].")";
												$childrenArray[] = $levelsix[0];
												if (count($levelsix)>0) {
													//$childrenArray[] = $levelthree[0];
													if ($levelsix[0]['leftside']!='') {
														$levelseven = getChildList($levelsix[0]['leftside'],8,$levelsix[0]['fid']);
													   // print_r($levelfiv);
														//$levelseven[0]['name']=$levelseven[0]['name']." (Sponsor: ".$levelseven[0]['sponsor_name']."/ Percentage: ".$levelseven[0]['per'].")";
														$childrenArray[] = $levelseven[0];
													}
													if ($levelsix[0]['rightside']!='') {
														$levelseven = getChildList($levelsix[0]['rightside'],8,$levelsix[0]['fid']);
														//$levelseven[0]['name']=$levelseven[0]['name']." (Sponsor: ".$levelseven[0]['sponsor_name']."/ Percentage: ".$levelseven[0]['per'].")";
														$childrenArray[] = $levelseven[0];
													}
												}
											}
										}
                                    }
                                    
                                }
                            }
                            if ($levelthree[0]['rightside']!='') {
                                $levelfour = getChildList($levelthree[0]['rightside'],5,$levelthree[0]['fid']);
                                //$levelfour[0]['name']= $levelfour[0]['name']." (Sponsor: ".$levelfour[0]['sponsor_name']."/ Percentage: ".$levelfour[0]['per'].")";
                                $childrenArray[] = $levelfour[0];
                                if (count($levelfour)>0) {
                                    //$childrenArray[] = $levelthree[0];
                                    if ($levelfour[0]['leftside']!='') {
                                        $levelfiv = getChildList($levelfour[0]['leftside'],6,$levelfour[0]['fid']);
                                        // $levelfiv[0]['name']=$levelfiv[0]['name']." (Sponsor: ".$levelfiv[0]['sponsor_name']."/ Percentage: ".$levelfiv[0]['per'].")";
                                        $childrenArray[] = $levelfiv[0];
										if (count($levelfiv)>0) {
											//$childrenArray[] = $levelthree[0];
											if ($levelfiv[0]['leftside']!='') {
												$levelsix = getChildList($levelfiv[0]['leftside'],7,$levelfiv[0]['fid']);
											   // print_r($levelfiv);
												//$levelsix[0]['name']=$levelsix[0]['name']." (Sponsor: ".$levelsix[0]['sponsor_name']."/ Percentage: ".$levelsix[0]['per'].")";
												$childrenArray[] = $levelsix[0];
												if (count($levelsix)>0) {
													//$childrenArray[] = $levelthree[0];
													if ($levelsix[0]['leftside']!='') {
														$levelseven = getChildList($levelsix[0]['leftside'],8,$levelsix[0]['fid']);
													   // print_r($levelfiv);
														//$levelseven[0]['name']=$levelseven[0]['name']." (Sponsor: ".$levelseven[0]['sponsor_name']."/ Percentage: ".$levelseven[0]['per'].")";
														$childrenArray[] = $levelseven[0];
													}
													if ($levelsix[0]['rightside']!='') {
														$levelseven = getChildList($levelsix[0]['rightside'],8,$levelsix[0]['fid']);
														//$levelseven[0]['name']=$levelseven[0]['name']." (Sponsor: ".$levelseven[0]['sponsor_name']."/ Percentage: ".$levelseven[0]['per'].")";
														$childrenArray[] = $levelseven[0];
													}
												}
											}
											if ($levelfiv[0]['rightside']!='') {
												$levelsix = getChildList($levelfiv[0]['rightside'],7,$levelfiv[0]['fid']);
												//$levelsix[0]['name']=$levelsix[0]['name']." (Sponsor: ".$levelsix[0]['sponsor_name']."/ Percentage: ".$levelsix[0]['per'].")";
												$childrenArray[] = $levelsix[0];
												if (count($levelsix)>0) {
													//$childrenArray[] = $levelthree[0];
													if ($levelsix[0]['leftside']!='') {
														$levelseven = getChildList($levelsix[0]['leftside'],8,$levelsix[0]['fid']);
													   // print_r($levelfiv);
														//$levelseven[0]['name']=$levelseven[0]['name']." (Sponsor: ".$levelseven[0]['sponsor_name']."/ Percentage: ".$levelseven[0]['per'].")";
														$childrenArray[] = $levelseven[0];
													}
													if ($levelsix[0]['rightside']!='') {
														$levelseven = getChildList($levelsix[0]['rightside'],8,$levelsix[0]['fid']);
														//$levelseven[0]['name']=$levelseven[0]['name']." (Sponsor: ".$levelseven[0]['sponsor_name']."/ Percentage: ".$levelseven[0]['per'].")";
														$childrenArray[] = $levelseven[0];
													}
												}
											}
										}
                                    }
                                    if ($levelfour[0]['rightside']!='') {
                                        $levelfiv = getChildList($levelfour[0]['rightside'],6,$levelfour[0]['fid']);
                                         //$levelfiv[0]['name']= $levelfiv[0]['name']."( Sponsor: ".$levelfiv[0]['sponsor_name']."/ Percentage: ".$levelfiv[0]['per'].")";
                                        $childrenArray[] = $levelfiv[0];
										if (count($levelfiv)>0) {
											//$childrenArray[] = $levelthree[0];
											if ($levelfiv[0]['leftside']!='') {
												$levelsix = getChildList($levelfiv[0]['leftside'],7,$levelfiv[0]['fid']);
											   // print_r($levelfiv);
												//$levelsix[0]['name']=$levelsix[0]['name']." (Sponsor: ".$levelsix[0]['sponsor_name']."/ Percentage: ".$levelsix[0]['per'].")";
												$childrenArray[] = $levelsix[0];
												if (count($levelsix)>0) {
													//$childrenArray[] = $levelthree[0];
													if ($levelsix[0]['leftside']!='') {
														$levelseven = getChildList($levelsix[0]['leftside'],8,$levelsix[0]['fid']);
													   // print_r($levelfiv);
														//$levelseven[0]['name']=$levelseven[0]['name']." (Sponsor: ".$levelseven[0]['sponsor_name']."/ Percentage: ".$levelseven[0]['per'].")";
														$childrenArray[] = $levelseven[0];
													}
													if ($levelsix[0]['rightside']!='') {
														$levelseven = getChildList($levelsix[0]['rightside'],8,$levelsix[0]['fid']);
														//$levelseven[0]['name']=$levelseven[0]['name']." (Sponsor: ".$levelseven[0]['sponsor_name']."/ Percentage: ".$levelseven[0]['per'].")";
														$childrenArray[] = $levelseven[0];
													}
												}
											}
											if ($levelfiv[0]['rightside']!='') {
												$levelsix = getChildList($levelfiv[0]['rightside'],7,$levelfiv[0]['fid']);
												//$levelsix[0]['name']=$levelsix[0]['name']." (Sponsor: ".$levelsix[0]['sponsor_name']."/ Percentage: ".$levelsix[0]['per'].")";
												$childrenArray[] = $levelsix[0];
												if (count($levelsix)>0) {
													//$childrenArray[] = $levelthree[0];
													if ($levelsix[0]['leftside']!='') {
														$levelseven = getChildList($levelsix[0]['leftside'],8,$levelsix[0]['fid']);
													   // print_r($levelfiv);
														//$levelseven[0]['name']=$levelseven[0]['name']." (Sponsor: ".$levelseven[0]['sponsor_name']."/ Percentage: ".$levelseven[0]['per'].")";
														$childrenArray[] = $levelseven[0];
													}
													if ($levelsix[0]['rightside']!='') {
														$levelseven = getChildList($levelsix[0]['rightside'],8,$levelsix[0]['fid']);
														//$levelseven[0]['name']=$levelseven[0]['name']." (Sponsor: ".$levelseven[0]['sponsor_name']."/ Percentage: ".$levelseven[0]['per'].")";
														$childrenArray[] = $levelseven[0];
													}
												}
											}
										}
                                    }
                                    
                                    
                                }
                            }
                        }
                    }
                  }
              }
            }
          }

      } 

    } 
    
    return $childrenArray;
 }else { 
    return false;
 } 

}
function get_user_children_test($user_id = false,$level=1)
{ // print_r($level);
  //print_r($user_id);die; 
  if($user_id or $user_id==0) { 
    $childrenArray = array();
    //Select IF(users.id IS NULL,0,'2') as level,profile_picture, username,first_name,last_name,id,is_login,sponsor_id from users WHERE sponsor_id = ? 
    $usersArray = getChildList($user_id, $level);
    if($usersArray)
    { 
      foreach($usersArray as $s => $v)
      {       
            $childrenArray[$s]['level']  = $v['level'];
            $childrenArray[$s]['profile_pic']  = $v['profile_pic'];
            $childrenArray[$s]['username'] = $v['username'];
            $childrenArray[$s]['first_name']= $v['first_name'];
            $childrenArray[$s]['last_name'] = $v['last_name'];
            $childrenArray[$s]['user_id'] = $v['user_id'];
            $childrenArray[$s]['bonus'] ='$0.00';
            $childrenArray[$s]['email'] = $v['email'];
            $childrenArray[$s]['sponsor_id'] = $v['sponsor_id'];
            $childrenArray[$s]['date'] = $v['date'];
            $childrenArray[$s]['req_status'] = $v['req_status'];
           if($v['user_id'] && $v['user_id']!=0 && $v['level']<=2){
              $childrenArray[$s]['children'] =get_user_children_test($v['user_id'],$v['level']);//get_user_children($v['id'],$level);
            }

      } 

    } 
    return $childrenArray;
 }else { 
    return false;
 } 

}
function getIndirectUser($user_id = false,$level=1)
{ 
    if($user_id or $user_id==0) { 
    $childrens = array();
    //Select IF(users.id IS NULL,0,'2') as level,profile_picture, username,first_name,last_name,id,is_login,sponsor_id from users WHERE sponsor_id = ? 
    
    $users = getChildList($user_id, $level);
     if($users)
    { 
      
     $childrens[]['user']= count($users);
      foreach($users as $s => $v)
      {     
         
           if($v['user_id'] && $v['user_id']!=0 && $v['level']<=3){
            
               //$childrens= getIndirectUser($v['id'],$v['level']);// get_user_children($v['id'],$level);
              $childrens[]= getIndirectUser($v['user_id'],$v['level']);
            }
         //print_r( $childrens) ;  
      } 
      return $childrens;
    } 
    
   // 
 }else { 
    return false;
 } 


}
function getLevel($user_id = false,$level=1)
{
  $myArr=array();
  $user =getSingleUser($user_id);
  $Arr['id'] = $user[0]['id'];
  $Arr['name'] = $user[0]['name'];
  $Arr['img']  =  $user[0]['img'];
  $Arr['first_name']= $user[0]['first_name'];
  $Arr['last_name'] = $user[0]['last_name'];
  $Arr['email'] = $user['email'];
  $Arr['bonus'] ='$0.00';
  $Arr['pid'] = $user[0]['pid'];
  $Arr['crdate'] = $user[0]['crdate'];
  // $myArr[] = $Arr;

  $res=get_user_children($user_id,$level);
  //print_r($res);
  foreach($res as $s => $v)
  {
    if ($v) {
      $myArr[]=$v;
    }
  }
  if(count($myArr)<=0) {
     $myArr[] = $Arr;
  }
  return $myArr;

}
function searchUser($queryString=false,$userID='')
{
   $getLevel  = getLevel($userID, 0);
   $searchResult =false;
   $found_key = array_search($queryString, array_column($getLevel, 'name'));
  if ($found_key)//in_array($queryString, array_column($getLevel, 'name')))
    {
      //echo "Match found";
      //$found_key = array_search($queryString, array_column($getLevel, 'name'));
      //$uid =  $getLevel[$found_key]['id'];
      $searchResult  = true ;//getLevel($uid, 0);
    }
  // else
  //   {
  //     echo "Match not found";
      
  //   }
 return $searchResult;
}

?>

