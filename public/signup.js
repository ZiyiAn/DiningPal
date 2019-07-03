


function valid_pass(){

  var data = document.getElementById('form2')
  var warn = document.getElementById('passwarn')
  var pass = data[2].value
  var pass_conf = data[3].value
  console.log(pass)
  console.log(pass_conf)
  if (pass!=pass_conf){
    warn.innerHTML = "Passwords do not match!"
    return false}
  else {warn.innerHTML = ""
  return True}

}
