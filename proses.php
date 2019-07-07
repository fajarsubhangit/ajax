<?php
$dbhost = "localhost";
$dbuser = "root";
$dbpass = "";
$dbname = "test1";
$link = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname);

$option = $_POST["option"];

//getall function
$ambil = $_POST["ambil"];
$nik = $_POST["nik"];

//update data
$update = $_POST["update"];
$nama   = $_POST["nama"];
$email  = $_POST["email"];
$alamat = $_POST["alamat"];

//delete
$delete = $_POST["delete"];

//tambah data
$tambah = $_POST["tambah"];
$nik2   = $_POST["nik2"];

//select NIK optionnya
if($option === "ambiloption") {
  $query  = "SELECT nik FROM datakaryawan";
  $result = mysqli_query($link,$query);
  echo "<option>-- Pilih NIK --</option>";
  while($data = mysqli_fetch_assoc($result)) {
    echo "<option value='".$data["nik"]."'>".$data["nik"]."</option>";
  }
}

//untuk proses tampilkan data kedalam inputan form
else if($ambil === "ambildata") {
  $query  = "SELECT * FROM datakaryawan WHERE nik = '$nik'";
  $result = mysqli_query($link,$query);
  while($data = mysqli_fetch_assoc($result)) {
    $json[] = $data;
  }

  $Json_file = json_encode($json,JSON_PRETTY_PRINT | JSON_FORCE_OBJECT);
  echo $Json_file;

}

//untuk proses update
else if($update === "updateData") {
  $query  = "UPDATE datakaryawan SET nama = '$nama',alamat = '$alamat',email = '$email' WHERE nik = '$nik'";
  $result = mysqli_query($link,$query);
  if($result) {
    echo "Berhasil";
  }
  else {
    echo "Error";
  }
}

//untuk proses delete
else if($delete === "deleteData"){
  $query  = "DELETE FROM datakaryawan WHERE nik = '$nik'";
  $result = mysqli_query($link,$query);
  if($result) {
    echo "Berhasil";
  }
  else {
    echo "Error";
  }
}

//untuk proses tambah datanya
else if($tambah === "tambahData") {
  $query  = "INSERT INTO datakaryawan VALUES ('$nik2','$nama','$email','$alamat')";
  $result = mysqli_query($link,$query);
  if($result) {
    echo "Berhasil";
  }
  else {
    echo "Error";
  }
}

 ?>
