function myfunctionaaa(){window.alert('hello')}
function validRegister(){
	var data1 = document.getElementsByTagName("input");
	window.alert(data1)

	if(data1[2]!=data1[3]){
		var element = document.getElementById('error_occur');
		element.innerHTML = 'Unmatched password!'
		return false;
	}
	else{
		return true;
	}

}



function validSign(){
	return true
}