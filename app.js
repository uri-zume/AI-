const questions=[
"生成AI利用時のリスク管理を説明してください。",
"AI出力を検証する方法を説明してください。",
"AI活用による業務改善案を提案してください。"
];
let index=0;

function startExam(){
document.getElementById('exam').classList.remove('hidden');
ask();
}

function add(type,text){
let d=document.createElement('div');
d.className='message '+(type==='AI試験官'?'ai':'user');
d.innerHTML='<b>'+type+'</b><br>'+text;
chat.appendChild(d);
}

function ask(){
add('AI試験官',questions[index]);
}

function submitAnswer(){
let a=document.getElementById('answer');
if(!a.value)return;
add('受験者',a.value);
a.value='';
index++;
if(index<questions.length){
setTimeout(ask,500);
}else{
document.getElementById('result').classList.remove('hidden');
}
}
