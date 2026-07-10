const questions=[
"生成AI利用時の主なリスクと対策を説明してください。",
"良いプロンプト設計で重要な要素を説明してください。",
"AIの回答を業務利用する前に確認すべきことを説明してください。"
];

let index=0;
let answers=[];

function startExam(){
document.querySelector('.hero').style.display='none';
document.getElementById('exam').classList.remove('hidden');
ask();
}

function add(type,text){
let div=document.createElement('div');
div.className='message '+(type==='AI試験官'?'ai':'user');
div.innerHTML='<b>'+type+'</b><br>'+text;
document.getElementById('chat').appendChild(div);
}

function ask(){
add('AI試験官',questions[index]);
}

function submitAnswer(){
let input=document.getElementById('answer');
if(!input.value)return;
answers.push(input.value);
add('受験者',input.value);
input.value='';
index++;
if(index<questions.length){
setTimeout(ask,500);
}else{
showResult();
}
}

function showResult(){
let score=Math.min(100,60+answers.join('').length%40);
let level=score>=85?'Expert':score>=70?'Professional':'Basic';
document.getElementById('exam').classList.add('hidden');
let r=document.getElementById('result');
r.classList.remove('hidden');
r.innerHTML='<h2>認定結果</h2><p>スコア：'+score+'点</p><p>レベル：'+level+'</p><p>評価項目：AI理解・活用・検証・安全性</p>';
}
