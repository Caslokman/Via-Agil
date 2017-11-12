<html>
<head>
<title>Relogio em Tempo Real</title>
</head> 
<script>
 function showTimer() {
  var time=new Date();
  var hour=time.getHours();
  var minute=time.getMinutes();
  var second=time.getSeconds();
  if(hour<10)   hour  ="0"+hour;
  if(minute<10) minute="0"+minute;
  if(second<10) second="0"+second;
  var st=hour+":"+minute+":"+second;
  document.getElementById("timer").innerHTML=st; 
 }
 function initTimer() {
  // O metodo nativo setInterval executa uma determinada funcao em um determinado tempo  
  setInterval(showTimer,1000);
 }
</script>
<body onLoad="initTimer();">
Exemplo de Rel�gio em tempo real utilizando a TAG 'span' e o m�todo setInterval.
<br><br>
<span id="timer">Rel�gio</span>
</body>

</html>