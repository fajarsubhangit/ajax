/* var nik,nik2nama,email,alamat,datanya;

$(document).ready(function() {
  $("#nik").load("proses.php","option=ambiloption");

  $("#status").html("loading....");
  $("#loading").fadeIn("slow");

  $("#nik").change(function() {
    //ambil value NIK dari select NIK
    nik = $("#nik").val();

    $.ajax({
      url:"proses.php",
      data:"ambil=ambildata&nik="+nik,
      cache: true,
      success: function(data) {
        var dataJson = JSON.parse(data);

        for(var i in dataJson) {
          $("#nama").val(dataJson[i]["nama"]);
          $("#email").val(dataJson[i]["email"]);
          $("#alamat").val(dataJson[i]["alamat"]);
        }
        //hilangkan status dan animasi loading
        $("#status").html("");
        $("#loading").fadeOut("fast");
      }
    });
  });



/* ========### TOMBOL UPDATE ###==============
//Jika tombol update di click
$("#tupdate").click(function() {
  //ambil nilai dari select NIK
  nik = $("#nik").val();
  if(nik === "-- Pilih NIK --") {
    alert("silahkan pilih nik anda terlebih dahulu");
    exit();
  }

  //tampilkan statu update data
  $("#status").html("proses update data ....");
  $("#loading").show("slow");

  //kirimkan nilai dari client ke server
   nama   = $("#nama").val();
   email  = $("#email").val();
   alamat = $("#alamat").val();
   datanya = "nik="+nik+"&nama="+nama+"&email="+email+"&alamat="+alamat;

  $.ajax({
    url: "proses.php",
    data: "up=update&"+datanya,
    cache: true,
    success: function(data) {
      if(data === "berhasil") {
        $("#status").html("data berhasil di update");
      }
      else {
        $("#status").html("ERROR");
      }

      $("#loading").hide("fast");
    }

  }); // <= close .ajax()
});// <== close #tupdate click


//delete data
$("#tdelete").click(function() {

  //ambil data NIK
  nik = $("#nik").val();
  //cek apakah nik sudah di pilih
  if(nik === "-- Pilih NIK --") {
    alert("Silahkan Pilih NIK Terlebih dahulu");
    exit();
  }

  else {

    var cek = confirm("apakah anda yakin?");
    if(cek === true) {
      //ambil data NIK
      nik = $("#nik").val();
      $("#status").html("proses delete .....");
      $("#loading").show("fast");
    //kirimkan request ke server untuk mendelete data
    $.ajax({
      url: "proses.php",
      data: "del=delete&nik="+nik,
      cache:true,
      success: function(data) {
        if(data === "berhasil") {
          $("#status").html("data berhasil di delete");
        }
        else {
          $("#status").html("ERROR!");
        }
        $("#nama").val("");
        $("#email").val("");
        $("#alamat").val("");
        $("#loading").hide("fast");
        $("#nik").load("proses.php","option=ambiloption");
      }
    });//close ajax
    } //<= dari proses cek confirm()
  } // <== else setelah sudah pilih NIK

});//<=delete click tdelete

//tambah data
$("#formtambah").click(function() {
  $("#status").html("");
  $("#loading").hide();

  $("#formnik").show();
  $("#nik2").val("");
  $("#nama").val("");
  $("#email").val("");
  $("#alamat").val("");
  $("#ttambah").show("fast");

  $("#sembunyitambah").hide("fast");
  $("#tupdate").hide("fast");
  $("#tdelete").hide("fast");
  $("#formtambah").hide("fast");

  $("#ttambah").click(function() {

     nik2    = $("#nik2").val();
     nama   = $("#nama").val();
     email  = $("#email").val();
     alamat = $("#alamat").val();

     var array = [nik2,nama,email,alamat];

     if(nik2+nama+email+alamat === "") {
       alert("silahkan isi dahulu fieldnya");
       exit();
     }
     $("#status").html("proses tambah...");
     $("#loading").show("fast");

     datanya = "nik2="+nik2+"&nama="+nama+"&email="+email+"&alamat="+alamat;

     $.ajax( {
       url: "proses.php",
       data: "tambah=tambahdata&"+datanya,
       cache: true,
       success: function(data) {
         if(data === "berhasil") {
           $("#status").html("data berhasil ditambah");
         }
         else {
           $("#status").html("gagal tambah data");
         }
         $("#loading").hide();
         $("#formtambah").show();
         $("#sembunyitambah").show("fast");
         $("#tupdate").show("fast");
         $("#tdelete").show("fast");
         $("#formnik").hide("fast");
         $("#nik").load("proses.php","option=ambiloption");
         }
     });
  })

})


});// <= close document.ready

*/




//NATIVE AJAX
var nik,nik2,data,request,nim,nama,alamat,email,datasend;
var url = "proses.php";
function getAjax() {
  if(window.XMLHttpRequest) {
    return new XMLHttpRequest();
  }
  else {
    return new ActiveXObject("Microsoft.XMLHTTP");
  }
};

//untuk menampilkan data NIK option
function nikOption() {
  request  = getAjax();

  datasend = "option=ambiloption";
  request.open("POST",url,true);
  request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
  request.send(datasend);
  request.onreadystatechange = function() {
    if(request.readyState === 4 && request.status === 200){
      data = request.responseText;
      $("#nik").append(data);
    }
  }

}

//untuk menampilkan data kedalam setiap inputan
//berdasarkan NIK dari select
function getAll() {
  nik = $("#nik").val();
  $("#status").html("");
  $("#loading").hide("fast");

  request = getAjax();
  datasend     = "ambil=ambildata&nik="+nik;
  url
  request.open("POST",url,true);
  request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
  request.send(datasend);
  request.onreadystatechange = function() {
    if(request.readyState === 4 && request.status === 200) {
      data = JSON.parse(request.responseText);
      for(var i in data) {
        $("#nama").val(data[i]["nama"]);
        $("#email").val(data[i]["email"]);
        $("#alamat").val(data[i]["alamat"]);
      }
    }
  }
}

//ketika tombol update di klik
function updateKlik() {
  //ambil nilai nik dari select dahulu
  nik = $("#nik").val();

  //jika isi dari nik bukan NIK
  if(nik === "-- Pilih NIK --") {
    alert("Silahkan pilih dahulu NIK anda");
    $("#status").html("");
    $("#loading").hide("fast");
    exit();
  }else {
    $("#status").html("proses update....");
    $("#loading").show("fast");

    //jika nik sudah di pilih
    //ambil nilai dari setiap inputan form
    nama   = $("#nama").val();
    email  = $("#email").val();
    alamat = $("#alamat").val();
    datasend = "nama="+nama+"&email="+email+"&alamat="+alamat+"&nik="+nik;
    request = getAjax();
    request.open("POST",url,true);
    request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    request.send("update=updateData&"+datasend);
    request.onreadystatechange = function() {
      if(request.readyState === 4 && request.status === 200) {
        data = request.responseText;
        if(data === "Berhasil") {

          $("#status").html("data berhasil di update");
          $("#status").html("");
          $("#status").css("color","green");

        }
        else {
          $("#status").html("ERROR");
          $("#status").css({"color":"red","font-weight":"bold"});
        }
        $("#loading").hide("fast");
      }
    }
  }
}

//ketika tombol delete di klik
function deleteKlik() {
  var cek = confirm("apakah anda yakin?");
  if(cek === true) {
    nik = $("#nik").val();
    if(nik === "-- Pilih NIK --") {
      alert("Silahkan pilih NIK terlebih dahulu");
      exit();
    }
    else {
      request = getAjax();
      request.open("POST",url,true);
      request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
      request.send("delete=deleteData&nik="+nik);
      request.onreadystatechange = function() {
        if(request.readyState === 4 && request.status === 200) {
          data = request.responseText;
          if(data === "Berhasil") {

            //data setelah berhasil di DELETE
            $("#nama").val("");
            $("#email").val("");
            $("#alamat").val("");
            //hapus NIK NYA MASIH ERROR ?
            $("#nik").html("");

            $("#nik").html(nikOption());
            $("#status").html("data berhasil di delete");
            $("#status").css("color","green");
              }
          else {
            $("#status").html("ERROR");
            $("#status").css("color","red");
          }
          $("#loading").hide();

        }
      }
    }
  }
}

//tambah data
function tambahdata() {
  $("#formnik").show();
  $("#nama").val("");
  $("#email").val("");
  $("#alamat").val("");
  $("#ttambah").show("slow");
  $("#sembunyitambah").hide("fast");
  $("#formtambah").hide("fast");
  $("#tupdate").hide("fast");
  $("#tdelete").hide("fast");
}

function insertData() {
    nik2 = $("#nik2").val();
    nama = $("#nama").val();
    email = $("#email").val();
    alamat = $("#alamat").val();
    request = getAjax();
    datasend = "nik2="+nik2+"&nama="+nama+"&email="+email+"&alamat="+alamat;
    url      = "proses.php";
    request.open("POST",url,true);
    request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    request.send("tambah=tambahData&"+datasend);
    request.onreadystatechange = function() {
      if(request.readyState === 4 && request.status === 200) {
        data = request.responseText;
        if(data === "Berhasil") {
          $("#status").html("data berhasil di tambahkan");
          $("#status").css("color","green");
          $("#loading").show("slow");
          $("#formnik").hide("fast");
          $("#sembunyitambah").show("fast");
          $("#formtambah").show("fast");
          $("#tupdate").show("fast");
          $("#tdelete").show("fast");
          $("#nik").html(nikOption());

          $("#nama").val("");
          $("#email").val("");
          $("#alamat").val("");
        }
        else {
          $("#status").html("error");
          $("#status").css("color","red");
        }
      }
    }
}

var selectNik = document.getElementById("nik");
var tombolUpdate = document.getElementById("tupdate");
var tombolDelete = document.getElementById("tdelete");
var tombolTambah = document.getElementById("formtambah");
var tambah = document.getElementById("ttambah");
//load starting browser page
window.addEventListener("load",nikOption);



//tampilkan ke setiap form inputan
selectNik.addEventListener("change",getAll);
//update klik
tombolUpdate.addEventListener("click",updateKlik);
//delete klik
tombolDelete.addEventListener("click",deleteKlik);
//tambah klik
tombolTambah.addEventListener("click",tambahdata);
//tambah data nya
tambah.addEventListener("click",insertData);
