(() => {
  'use strict';

  const TOTAL_QUESTIONS = 10;
  const EXAM_SECONDS = 8 * 60;

  const questionBank = [
    {
      category: '基礎理解',
      title: '生成AIがもっともらしい誤情報を回答した場合、最も適切な理解はどれですか。',
      context: 'AIの仕組みを踏まえて判断してください。',
      answers: [
        { text: 'AIはインターネットを常時検索しているため、通信障害が原因である。', score: 0 },
        { text: 'AIは文章の続きを確率的に生成するため、事実と異なる内容を出すことがある。', score: 3 },
        { text: '質問文が日本語だったためであり、英語なら誤情報は発生しない。', score: 0 },
        { text: '有料版を利用すれば、誤情報は原理的に発生しない。', score: 0 }
      ]
    },
    {
      category: '基礎理解',
      title: '生成AIに向いている業務として、最も適切なものはどれですか。',
      context: '最終責任は人が負う前提です。',
      answers: [
        { text: '根拠確認なしで行う最終的な法的判断', score: 0 },
        { text: '患者情報だけから行う確定診断', score: 0 },
        { text: '会議メモから論点のたたき台を整理する作業', score: 3 },
        { text: '会社の承認なしに行う採用候補者の自動選別', score: 1 }
      ]
    },
    {
      category: '基礎理解',
      title: '同じ質問をしても回答が少し変わることがある理由として、最も適切なものはどれですか。',
      context: '生成AIの出力特性を問う問題です。',
      answers: [
        { text: '出力には確率的な要素があり、毎回完全に同一とは限らないため。', score: 3 },
        { text: 'AIが利用者の能力を試しているため。', score: 0 },
        { text: '質問履歴を必ず削除しているため。', score: 0 },
        { text: '日本語の文法には正解がないため。', score: 0 }
      ]
    },
    {
      category: '指示設計',
      title: '社内向け説明文を作る指示として、最も再現性が高いものはどれですか。',
      context: '対象読者はAIに詳しくない新入社員です。',
      answers: [
        { text: 'AIについて分かりやすく書いて。', score: 1 },
        { text: '新入社員向けに、生成AI利用時の注意点を300字以内、見出し3つ、専門用語を避けて作成して。', score: 3 },
        { text: 'とにかく最高の文章を書いて。', score: 0 },
        { text: '過去の有名な文章をまねして書いて。', score: 0 }
      ]
    },
    {
      category: '指示設計',
      title: 'AIの回答品質を改善するための追加指示として、最も有効なものはどれですか。',
      context: '最初の回答が抽象的すぎました。',
      answers: [
        { text: 'もっとちゃんとして。', score: 0 },
        { text: '先ほどの回答を、具体例を2つ追加し、実行手順を番号付きで書き直して。', score: 3 },
        { text: 'あなたはAIなのだから分かるはず。', score: 0 },
        { text: '同じ回答をもう一度出して。', score: 1 }
      ]
    },
    {
      category: '指示設計',
      title: '長い資料を要約させる前に行う準備として、最も適切なものはどれですか。',
      context: '重要な条件の脱落を減らしたい場面です。',
      answers: [
        { text: '目的、残すべき論点、対象読者、文字数を指定する。', score: 3 },
        { text: '資料名だけを伝え、内容はAIに推測させる。', score: 0 },
        { text: '要約という一語だけを入力する。', score: 0 },
        { text: '出力形式は指定せず、毎回異なる形にする。', score: 1 }
      ]
    },
    {
      category: '情報検証',
      title: 'AIが提示した統計数値をレポートに使う前に、最初に行うべきことはどれですか。',
      context: '数値には出典らしき名称も付いています。',
      answers: [
        { text: '文章が自然なので、そのまま引用する。', score: 0 },
        { text: 'AIに「本当ですか」と一度だけ聞き直す。', score: 1 },
        { text: '公的機関や原典を開き、数値・年度・定義を照合する。', score: 3 },
        { text: '複数のAIに聞き、同じ答えなら確認を終える。', score: 2 }
      ]
    },
    {
      category: '情報検証',
      title: 'AIが作った計算結果を確認する方法として、最も適切なものはどれですか。',
      context: '経費見積りに使うため、誤差を避けたい場面です。',
      answers: [
        { text: '数字が細かいほど正確と考える。', score: 0 },
        { text: '計算式と前提条件を出させ、表計算ソフト等で再計算する。', score: 3 },
        { text: '回答を別の文章表現に変えさせる。', score: 0 },
        { text: 'AIの自信度だけを確認する。', score: 1 }
      ]
    },
    {
      category: '情報検証',
      title: 'AIの回答に引用文が含まれていました。最も適切な対応はどれですか。',
      context: '重要なプレゼン資料に掲載する予定です。',
      answers: [
        { text: '引用符が付いているので正確だと判断する。', score: 0 },
        { text: '引用元の原文を確認し、文脈と表現が一致するか確かめる。', score: 3 },
        { text: '引用部分を少し言い換えれば確認は不要である。', score: 0 },
        { text: 'AIがURLを出した時点で確認済みとする。', score: 1 }
      ]
    },
    {
      category: '情報管理',
      title: '未公表の新製品情報を含む議事録を要約したい場合、最も適切な対応はどれですか。',
      context: '会社のAI利用ルールはまだ確認していません。',
      answers: [
        { text: '個人アカウントのAIにそのまま貼り付ける。', score: 0 },
        { text: '会社の規程と利用可能な環境を確認し、必要なら匿名化して承認済みツールを使う。', score: 3 },
        { text: '製品名だけ伏せれば、他の情報はすべて入力してよい。', score: 1 },
        { text: '入力後にチャット履歴を削除すれば問題ない。', score: 0 }
      ]
    },
    {
      category: '情報管理',
      title: '顧客から受け取った履歴書をAIで整理する際、最も重要な確認事項はどれですか。',
      context: '氏名、住所、連絡先、職歴が含まれています。',
      answers: [
        { text: '回答速度が速いモデルかどうか。', score: 0 },
        { text: '個人情報の取扱い、利用目的、入力先の規約、社内承認の有無。', score: 3 },
        { text: 'AIの画面デザインが見やすいかどうか。', score: 0 },
        { text: '無料で使えるかどうか。', score: 0 }
      ]
    },
    {
      category: '情報管理',
      title: '著作権のある文章をAIで扱う際の姿勢として、最も適切なものはどれですか。',
      context: '公開記事を参考に新しい解説文を作る場面です。',
      answers: [
        { text: 'AIを通せば自由に全文転載できる。', score: 0 },
        { text: '出典や利用条件を確認し、必要以上の複製を避け、独自の表現にする。', score: 3 },
        { text: '文章の語尾だけ変えれば必ず問題ない。', score: 0 },
        { text: '非営利であれば確認は一切不要である。', score: 1 }
      ]
    },
    {
      category: '実務応用',
      title: '問い合わせ対応をAIで効率化する最初の進め方として、最も適切なものはどれですか。',
      context: '誤回答による顧客トラブルを避けたい場面です。',
      answers: [
        { text: '初日から全回答をAIに任せ、人の確認をなくす。', score: 0 },
        { text: '限定した種類の問い合わせで試行し、回答基準・確認者・記録方法を決めて評価する。', score: 3 },
        { text: '最も安いAIを選び、件数だけを増やす。', score: 0 },
        { text: '過去の回答を無作為に入力し、そのまま公開する。', score: 1 }
      ]
    },
    {
      category: '実務応用',
      title: 'AIを使った業務改善の効果を測る指標として、最も適切な組合せはどれですか。',
      context: '文章作成業務への導入を評価します。',
      answers: [
        { text: '利用回数だけ。', score: 1 },
        { text: '作成時間、修正回数、誤り率、利用者の満足度。', score: 3 },
        { text: 'AIが出力した文字数だけ。', score: 0 },
        { text: '担当者の印象だけ。', score: 0 }
      ]
    },
    {
      category: '実務応用',
      title: '複数人でAIを業務利用する際、品質を安定させる方法として最も適切なものはどれですか。',
      context: '担当者ごとに出力品質が大きく異なっています。',
      answers: [
        { text: '各自が自由に使い、共有はしない。', score: 0 },
        { text: '用途別のテンプレート、確認手順、良い事例、禁止事項を共有する。', score: 3 },
        { text: '最もAIに詳しい一人だけがすべて処理する。', score: 1 },
        { text: '出力結果の修正を禁止する。', score: 0 }
      ]
    }
  ];

  const categoryAdvice = {
    '基礎理解': {
      title: 'AIの仕組みと限界を整理しましょう',
      body: '「もっともらしい誤り」「出力のばらつき」「得意・不得意」を説明できるようにすると、判断の土台が安定します。'
    },
    '指示設計': {
      title: '目的・条件・形式を分けて指示しましょう',
      body: '対象読者、前提資料、制約、出力形式、評価基準を明示する練習が有効です。'
    },
    '情報検証': {
      title: '一次情報への確認を習慣化しましょう',
      body: '数値、引用、法令、固有名詞は原典に戻り、年度・定義・文脈まで照合してください。'
    },
    '情報管理': {
      title: '入力前のリスク判断を徹底しましょう',
      body: '個人情報・機密情報・著作物について、社内規程、利用目的、サービス規約、匿名化の要否を確認しましょう。'
    },
    '実務応用': {
      title: '小さく試し、指標で改善しましょう',
      body: '限定業務で試行し、人の確認点と評価指標を決めてから対象範囲を広げると安全です。'
    }
  };

  const dialog = document.getElementById('examDialog');
  const introScreen = document.getElementById('introScreen');
  const questionScreen = document.getElementById('questionScreen');
  const resultScreen = document.getElementById('resultScreen');
  const introForm = document.getElementById('introForm');
  const closeDialog = document.getElementById('closeDialog');
  const answerList = document.getElementById('answerList');
  const nextButton = document.getElementById('nextQuestion');
  const prevButton = document.getElementById('prevQuestion');
  const menuButton = document.querySelector('.menu-button');
  const mobileNav = document.querySelector('.mobile-nav');

  let questions = [];
  let currentIndex = 0;
  let answers = [];
  let candidate = { name: '', purpose: '' };
  let secondsLeft = EXAM_SECONDS;
  let timerId = null;

  function shuffle(array) {
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function buildExam() {
    const byCategory = questionBank.reduce((acc, item) => {
      (acc[item.category] ||= []).push(item);
      return acc;
    }, {});

    const selected = [];
    Object.values(byCategory).forEach(items => selected.push(...shuffle(items).slice(0, 2)));
    questions = shuffle(selected).map(q => ({ ...q, answers: shuffle(q.answers) }));
    answers = Array(TOTAL_QUESTIONS).fill(null);
    currentIndex = 0;
  }

  function switchScreen(screen) {
    [introScreen, questionScreen, resultScreen].forEach(node => node.classList.remove('active'));
    screen.classList.add('active');
    dialog.scrollTop = 0;
  }

  function openExam() {
    if (!dialog.open) dialog.showModal();
    switchScreen(introScreen);
    stopTimer();
    introForm.reset();
  }

  function renderQuestion() {
    const q = questions[currentIndex];
    document.getElementById('questionCount').textContent = `QUESTION ${currentIndex + 1} / ${TOTAL_QUESTIONS}`;
    document.getElementById('progressBar').style.width = `${((currentIndex + 1) / TOTAL_QUESTIONS) * 100}%`;
    document.getElementById('categoryBadge').textContent = q.category;
    document.getElementById('questionText').textContent = q.title;
    document.getElementById('questionContext').textContent = q.context;

    answerList.innerHTML = '';
    q.answers.forEach((answer, index) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = `answer-option${answers[currentIndex] === index ? ' selected' : ''}`;
      button.setAttribute('aria-pressed', answers[currentIndex] === index ? 'true' : 'false');
      button.innerHTML = `<span class="answer-letter">${String.fromCharCode(65 + index)}</span><span class="answer-copy"></span>`;
      button.querySelector('.answer-copy').textContent = answer.text;
      button.addEventListener('click', () => selectAnswer(index));
      answerList.appendChild(button);
    });

    prevButton.disabled = currentIndex === 0;
    nextButton.disabled = answers[currentIndex] === null;
    nextButton.textContent = currentIndex === TOTAL_QUESTIONS - 1 ? '結果を見る' : '次の問題';
  }

  function selectAnswer(index) {
    answers[currentIndex] = index;
    [...answerList.children].forEach((node, i) => {
      node.classList.toggle('selected', i === index);
      node.setAttribute('aria-pressed', i === index ? 'true' : 'false');
    });
    nextButton.disabled = false;
  }

  function startTimer() {
    stopTimer();
    secondsLeft = EXAM_SECONDS;
    updateTimer();
    timerId = window.setInterval(() => {
      secondsLeft -= 1;
      updateTimer();
      if (secondsLeft <= 0) finishExam(true);
    }, 1000);
  }

  function stopTimer() {
    if (timerId) window.clearInterval(timerId);
    timerId = null;
  }

  function updateTimer() {
    const min = String(Math.floor(Math.max(secondsLeft, 0) / 60)).padStart(2, '0');
    const sec = String(Math.max(secondsLeft, 0) % 60).padStart(2, '0');
    const timerText = document.getElementById('timerText');
    timerText.textContent = `${min}:${sec}`;
    timerText.style.color = secondsLeft <= 60 ? '#c62828' : '';
  }

  function getResults() {
    const categories = {};
    let total = 0;
    let max = 0;

    questions.forEach((q, index) => {
      const chosenIndex = answers[index];
      const score = chosenIndex === null ? 0 : q.answers[chosenIndex].score;
      total += score;
      max += 3;
      if (!categories[q.category]) categories[q.category] = { score: 0, max: 0 };
      categories[q.category].score += score;
      categories[q.category].max += 3;
    });

    const normalized = Math.round((total / max) * 100);
    const categoryScores = Object.fromEntries(
      Object.entries(categories).map(([name, value]) => [name, Math.round((value.score / value.max) * 100)])
    );

    let level;
    let message;
    if (normalized >= 90) {
      level = 'EXPERT';
      message = '高い検証力とリスク判断を備えています。組織的なAI活用を設計する段階です。';
    } else if (normalized >= 70) {
      level = 'PROFESSIONAL';
      message = '実務でAIを使うための重要な判断力があります。弱点領域を補うことで、より安定した活用が可能です。';
    } else if (normalized >= 50) {
      level = 'BASIC';
      message = '基本的な利用力があります。安全性と検証手順を身につけると、実務での信頼性が高まります。';
    } else {
      level = 'LEARNING';
      message = 'まずはAIの限界、情報管理、回答確認の基本から学ぶことをおすすめします。';
    }

    return { normalized, categoryScores, level, message };
  }

  function finishExam(timedOut = false) {
    stopTimer();
    const result = getResults();
    const today = new Date();
    const dateText = new Intl.DateTimeFormat('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' }).format(today);
    const dateCode = `${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, '0')}${String(today.getDate()).padStart(2, '0')}`;
    const certificateId = `AILC-${dateCode}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;

    document.getElementById('resultName').textContent = candidate.name;
    document.getElementById('resultScore').textContent = result.normalized;
    document.getElementById('resultRing').style.setProperty('--score', `${result.normalized}%`);
    document.getElementById('resultLevel').textContent = result.level;
    document.getElementById('resultMessage').textContent = timedOut ? `制限時間終了時点の回答で判定しました。${result.message}` : result.message;

    const bars = document.getElementById('resultBars');
    bars.innerHTML = '';
    Object.entries(result.categoryScores).forEach(([category, score]) => {
      const row = document.createElement('div');
      row.className = 'result-bar';
      row.innerHTML = `<span></span><i style="--value:${score}%"></i><b>${score}</b>`;
      row.querySelector('span').textContent = category;
      bars.appendChild(row);
    });

    const weakest = Object.entries(result.categoryScores).sort((a, b) => a[1] - b[1])[0]?.[0] || '基礎理解';
    const advice = categoryAdvice[weakest];
    document.getElementById('recommendation').innerHTML = `<strong></strong><span></span>`;
    document.querySelector('#recommendation strong').textContent = advice.title;
    document.querySelector('#recommendation span').textContent = advice.body;

    document.getElementById('certificateName').textContent = `${candidate.name} 殿`;
    document.getElementById('certificateLevel').textContent = result.level;
    document.getElementById('certificateScore').textContent = result.normalized;
    document.getElementById('certificateDate').textContent = dateText;
    document.getElementById('certificateId').textContent = certificateId;

    try {
      localStorage.setItem('ailc-last-result', JSON.stringify({
        ...result,
        candidate,
        certificateId,
        completedAt: today.toISOString()
      }));
    } catch (error) {
      console.warn('Result could not be saved locally.', error);
    }

    switchScreen(resultScreen);
  }

  document.querySelectorAll('[data-start-test]').forEach(button => button.addEventListener('click', openExam));

  introForm.addEventListener('submit', event => {
    event.preventDefault();
    candidate = {
      name: document.getElementById('candidateName').value.trim(),
      purpose: document.getElementById('candidatePurpose').value
    };
    if (!candidate.name || !candidate.purpose) return;
    buildExam();
    switchScreen(questionScreen);
    renderQuestion();
    startTimer();
  });

  nextButton.addEventListener('click', () => {
    if (answers[currentIndex] === null) return;
    if (currentIndex < TOTAL_QUESTIONS - 1) {
      currentIndex += 1;
      renderQuestion();
    } else {
      finishExam(false);
    }
  });

  prevButton.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex -= 1;
      renderQuestion();
    }
  });

  closeDialog.addEventListener('click', () => {
    stopTimer();
    dialog.close();
  });

  dialog.addEventListener('cancel', () => stopTimer());
  document.getElementById('printCertificate').addEventListener('click', () => window.print());
  document.getElementById('retryTest').addEventListener('click', () => {
    switchScreen(introScreen);
    introForm.reset();
  });

  menuButton.addEventListener('click', () => {
    const expanded = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!expanded));
    menuButton.textContent = expanded ? '☰' : '×';
    mobileNav.hidden = expanded;
  });

  mobileNav.querySelectorAll('a, button').forEach(node => node.addEventListener('click', () => {
    mobileNav.hidden = true;
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.textContent = '☰';
  }));
})();
