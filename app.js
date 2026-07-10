let state={user:null,answers:[],score:0};

const questions=[
"生成AIを企業利用する際のリスクと対策を説明してください。",
"AIの回答を業務利用する前にどのような検証をしますか。",
"AIを活用した業務改善案を提案してください。"
];

function login(){
 state.user={name:"Demo User",id:"AIL-2026-000001"};
 render("<h2>ログイン成功</h2><p>Candidate Portalへようこそ</p>");
}

let q=0;
function startExam(){
 render(`<h2>AI Exam Engine</h2><p>${questions[q]}</p>
 <textarea id="answer"></textarea><br>
 <button onclick="submitAnswer()">回答送信</button>`);
}

function submitAnswer(){
 let a=document.getElementById("answer").value;
 state.answers.push(a);
 q++;
 if(q<questions.length){startExam();}
 else{evaluate();}
}

function evaluate(){
 let length=state.answers.join("").length;
 state.score=Math.min(100,60+Math.floor(length/10));
 let level=state.score>=85?"Expert":state.score>=70?"Professional":"Basic";
 render(`
 <h2>AI Skill Report</h2>
 <p>Score: ${state.score}</p>
 <p>Level: ${level}</p>
 <hr>
 <h3>Digital Certificate</h3>
 <p>Certificate No: ${state.user?.id||"AIL-2026-000001"}</p>
 <button onclick="pdfMock()">PDF認定証発行</button>
 `);
 localStorage.setItem("certificate",JSON.stringify(state));
}

function pdfMock(){
 alert("認定証生成処理を実行しました（本番版ではPDF API接続）");
}

function render(html){
 document.getElementById("app").innerHTML=html;
}
