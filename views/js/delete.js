function eliminar(){
	if (confirm('Esta seguro que lo quiere eliminar?')) {
		return true;
	}else{
		window.location.href='/';
		return false;
	}
}